import { api } from "@/services/api";
import { 
    Beer, 
    BeerBody, 
    EditedBeerBody 
} from "@/lib/types/beerTypes";

export const manageBeerEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        addBeer: builder.mutation<Beer, BeerBody>({
            query: (body) => ({
                url: '/beers/manage/add',
                method: "POST",
                body
            }),
            invalidatesTags: ['Beers']
        }),
        editBeer: builder.mutation<Beer, EditedBeerBody>({
            query: (body) => ({
                url: `/beers/manage/${body.id}/update`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Beers']
        }),
        deleteBeer: builder.mutation<void, string>({
            query: (beerId) => ({
                url: `/beers/manage/${beerId}/delete`,
                method: "DELETE"
            }),
            invalidatesTags: ['Beers']
        }),
        addBeerToFav: builder.mutation<void, string>({
            query: (beerId) => ({
                url: `/beers/manage/${beerId}/add_to_favorites`,
                method: 'POST'
            }),
            invalidatesTags: ['Beers']
        }),
        removeBeerFromFav: builder.mutation<void, string>({
            query: (beerId) => ({
                url: `/beers/manage/${beerId}/remove_from_favorites`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Beers']
        })
    })
})

export const {
    useAddBeerMutation, 
    useEditBeerMutation, 
    useDeleteBeerMutation,
    useAddBeerToFavMutation,
    useRemoveBeerFromFavMutation
} = manageBeerEndpoints