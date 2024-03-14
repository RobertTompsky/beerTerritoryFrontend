import { useGetBeerReviewsQuery } from '@/services/endpoints/beers/reviewsEndpoints';
import React, { useState } from 'react';

import styles from './ReviewsBlock.module.scss'

import { SingleReview } from '@/components';
import { AddReviewBlock } from '..';

interface ReviewsBLockProps {
    beerId: string | undefined
}

export const ReviewsBlock: React.FC<ReviewsBLockProps> = ({ beerId }) => {
    const { data: reviews } = useGetBeerReviewsQuery(beerId as string)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

    return (
        <div className={styles.reviewsBlock}>
            {!isFormOpen &&
                (reviews
                    ? <nav className={styles.reviewsList}>
                        {reviews?.map((review) => (
                            <SingleReview
                                key={review.id}
                                review={review}
                                beerId={beerId}
                            />
                        ))}
                    </nav>
                    : <div>
                        На это пиво пока нет обзоров
                    </div>)
            }
            <AddReviewBlock
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                beerId={beerId}
            />
        </div>
    );
};
