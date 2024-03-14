import { api } from "@/services/api";
import { Beer } from "@/types/beerTypes";
import { QueryType } from "@/types/otherTypes";

export const beerListEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getBeers: builder.query<Beer[], QueryType>({
            query: (params) => ({
                url: '/beers/list',
                method: "GET",
                params: {
                    page: params.page,
                    per_page: params.per_page,
                    type: params.type,
                    sort: params.sort
                }
            }),
            providesTags: ['Beers']
        }),
        getBeer: builder.query<Beer, string>({
            query: (id) => ({
                url: `/beers/list/${id}`,
                method: "GET"
            }),
            providesTags: ['Beers']
        })
    })
})

export const {useGetBeersQuery, useGetBeerQuery} = beerListEndpoints