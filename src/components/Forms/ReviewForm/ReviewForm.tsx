import {
    CustomButton,
    CustomForm,
    CustomFormField
} from '@/components/custom';
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { RATING_OPTIONS } from '@/lib/data';
import {
    handleZodErrors,
    handleServerErrors,
    handleDataChange,
    handleValidateData
} from '@/lib/utils/functions';
import { reviewSchema } from '@/lib/zodSchemas';
import {
    useAddReviewMutation,
    useDeleteReviewMutation,
    useGetBeerReviewsQuery
} from '@/services/endpoints/beers/reviewsEndpoints';
import { ReviewBody } from '@/lib/types/reviewTypes';
import React, { useState } from 'react';


interface ReviewFormProps {
    beerId: string | undefined
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ beerId, setIsFormOpen }) => {
    const userId = useAppSelector((state) => state.auth.user?.id)
    const { data: reviews } = useGetBeerReviewsQuery(beerId as string)
    const [addReview, { isLoading }] = useAddReviewMutation()
    const [deleteReview] = useDeleteReviewMutation()

    const [review, setReview] = useState<ReviewBody & { beerId: string }>({
        title: '',
        body: '',
        rating: 5,
        beerId: beerId as string
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            handleValidateData(reviewSchema, review)

            const existingUserReview = reviews?.find((review) => review.user.id === userId)
            if (existingUserReview) {
                await deleteReview({
                    reviewId: existingUserReview.id,
                    beerId: beerId as string
                })
            }
            await addReview(review)
            setIsFormOpen(false)
        } catch (error) {
            handleZodErrors(error, setErrors)
            handleServerErrors(error, setErrors)
            console.log('error', error)
        }
    }

    return (
        <CustomForm title='Новый отзыв' onSubmit={handleSubmit}>
            <CustomFormField
                fieldType='input'
                title='Вердикт'
                name='title'
                value={review.title}
                onChange={(e) => handleDataChange(e, setReview)}
                zodError={errors.title}
            />

            <CustomFormField
                fieldType='textarea'
                title='Подробное мнение'
                name='body'
                value={review.body}
                onChange={(e) => handleDataChange(e, setReview)}
                zodError={errors.body}
            />

            <CustomFormField
                fieldType='select'
                defaultOptionTitle='Выбрать оценку'
                options={RATING_OPTIONS.map((option) => ({
                    title: option,
                    value: option
                }))}
                title='Оценка'
                name='rating'
                value={review.rating}
                onChange={(e) => handleDataChange(e, setReview)}
                zodError={errors.rating}
            />

            <CustomButton
                children='Сохранить'
                variant='approve'
            />
            {isLoading &&
                <div>
                    Ожидание...
                </div>
            }
            {errors.serverErr &&
                <span>
                    {errors.serverErr}
                </span>
            }

        </CustomForm>
    );
};