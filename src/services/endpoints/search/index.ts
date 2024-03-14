import { api } from "@/services/api";
import { SearchBeerResult } from "@/types/beerTypes";

export const searchEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        searchBeers: builder.query<SearchBeerResult[], string>({
            query: (search) => ({
                url: '/search/beers_by_name',
                method: "GET",
                params: {
                    q: search
                }
            }),
            providesTags: ['Beers']
        })
    })
})

export const {useSearchBeersQuery} = searchEndpoints

