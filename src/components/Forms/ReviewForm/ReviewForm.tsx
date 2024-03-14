import {
    CustomButton,
    CustomForm,
    CustomInput,
    CustomSelect
} from '@/components/custom';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RATING_OPTIONS } from '@/lib/data';
import { handleZodErrors, handleServerErrors } from '@/lib/utils/functions';
import { reviewSchema } from '@/lib/zodSchemas';
import {
    useAddReviewMutation,
    useDeleteReviewMutation,
    useGetBeerReviewsQuery
} from '@/services/endpoints/beers/reviewsEndpoints';
import { ReviewBody } from '@/types/reviewTypes';
import React, { useState } from 'react';


interface ReviewFormProps {
    beerId: string | undefined
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ beerId, setIsFormOpen }) => {
    const userId = useAppSelector((state) => state.auth.user?.id)
    const { data: reviews } = useGetBeerReviewsQuery(beerId as string)
    const [addReview, {isLoading}] = useAddReviewMutation()
    const [deleteReview] = useDeleteReviewMutation()

    const [review, setReview] = useState<ReviewBody & { beerId: string }>({
        title: '',
        body: '',
        rating: 5,
        beerId: beerId as string
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        const { name, value } = e.target
        const strOrNumValue = Number(value) || value;
        setReview((prevData) => ({ ...prevData, [name]: strOrNumValue }))
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
            reviewSchema.parse(review)
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
            <label htmlFor='title'>Вердикт</label>
            <CustomInput
                id='title'
                name='title'
                value={review.title}
                onChange={handleInputChange}
            />
            {errors.title && <span>{errors.title}</span>}

            <label htmlFor='body'>Подробное мнение</label>
            <CustomInput
                id='body'
                name='body'
                value={review.body}
                onChange={handleInputChange}
            />
            {errors.body && <span>{errors.body}</span>}

            <label htmlFor='rating'>Оценка</label>
            <CustomSelect
                defaultOptionTitle='Выбрать оценку'
                options={RATING_OPTIONS.map((option) => ({
                    title: option,
                    value: option
                }))}
                id='rating'
                name='rating'
                value={review.rating}
                onChange={handleInputChange}
            />
            {errors.rating && <span>{errors.rating}</span>}

            <CustomButton
                children='Сохранить'
                variant='approve'
            />
            {isLoading && <div>Ожидание...</div>}
            {errors.serverErr && <span>{errors.serverErr}</span>}
        </CustomForm>
    );
};