import { Review } from '@/types/reviewTypes';
import React from 'react';
import styles from './SingleReview.module.scss'
import { useDeleteReviewMutation } from '@/services/endpoints/beers/reviewsEndpoints';
import { useAppSelector } from '@/hooks/reduxHooks';
import DefaultAvatar from '@/assets/default_avatar.jpg'
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/lib/config/routeConfig';
import { formatData } from '@/lib/utils/helpers';
import { CustomButton } from '../custom';
import FilledCircle from '@/assets/filledCircle.png';
import EmptyCircle from '@/assets/emptyCircle.png';
import { RATING_OPTIONS } from '@/lib/data';

interface SingleReviewProps {
    review: Review | undefined,
    beerId: string | undefined,
}

export const SingleReview: React.FC<SingleReviewProps> = ({ review, beerId }) => {
    const [deleteReview] = useDeleteReviewMutation()

    const navigate = useNavigate()

    const userId = useAppSelector((state => state.auth.user?.id))
    const userAvatar = review?.user.profile?.avatar
    const isUserReview: boolean = review?.user.id === userId

    const dateCreated = formatData(review?.createdAt as string)

    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        try {
            await deleteReview({
                beerId: beerId as string,
                reviewId: review?.id as string
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div className={styles.review}>
            <div className={styles.review_header}>
                <div
                    className={styles.review_header_userInfo}
                    onClick={() => navigate(`${RoutePath.profile}/${review?.user.id}`)}
                >
                    <img
                        src={
                            userAvatar
                                ? `${import.meta.env.VITE_API_URL}/images/${userAvatar}`
                                : DefaultAvatar
                        }
                        className={styles.review_img}
                    />
                    <p className={styles.review_header_user}>
                        {review?.user.nickName}
                    </p>
                </div>
                <p>{dateCreated}</p>
            </div>
            <hr />
            <div className={styles.review_content}>
                <h3>{review?.title}</h3>
                <p>{review?.body}</p>
                <div className={styles.review_content_bottom}>
                    <div className={styles.review_content_bottom_rating}>
                        {RATING_OPTIONS.map((_, index) => (
                            <img
                                key={index}
                                src={
                                    review && index < review?.rating
                                        ? FilledCircle
                                        : EmptyCircle
                                }
                                width={20}
                                height={20}
                            />
                        ))}
                    </div>
                    {isUserReview &&
                        <div className={styles.review_content_btnGroup}>
                            <CustomButton
                                children='Удалить'
                                variant='delete'
                                onClick={handleDelete}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
