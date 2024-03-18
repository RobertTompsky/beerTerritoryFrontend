import { api } from "@/services/api";
import { Review, ReviewBody } from "@/lib/types/reviewTypes";

export const reviewsEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getBeerReviews: builder.query<Review[], string>({
            query: (beerId) => ({
                url: `beers/manage/${beerId}/reviews`,
                method: "GET"
            }),
            providesTags: ['Reviews']
        }),
        addReview: builder.mutation<Review, ReviewBody & {beerId: string}>({
            query: (body) => ({
                url: `/beers/manage/${body.beerId}/add_review`,
                method: "POST",
                body: {
                    title: body.title,
                    body: body.body,
                    rating: body.rating
                }
            }),
            invalidatesTags: ['Reviews']
        }),
        deleteReview: builder.mutation<void, {beerId: string, reviewId: string}>({
            query: ({beerId, reviewId}) => ({
                url: `/beers/manage/${beerId}/reviews/${reviewId}/delete`,
                method: "DELETE"
            }),
            invalidatesTags: ['Reviews']
        })
    })
})

export const {
    useGetBeerReviewsQuery, 
    useAddReviewMutation, 
    useDeleteReviewMutation
} = reviewsEndpoints
