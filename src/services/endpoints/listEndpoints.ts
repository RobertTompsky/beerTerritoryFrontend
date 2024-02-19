import { UserWithProfile } from "../../types/userTypes";
import { api } from "../api";

export const listEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<UserWithProfile[], void>({
            query: () => ({
                url: '/users/list',
                method: "GET"
            }),
            providesTags: ['Users']
        }),
        getUser: builder.query<UserWithProfile, string>({
            query: (id) => ({
                url: `/users/list/${id}`,
                method: "GET"
            }),
            providesTags: ['Users']
        }),
    })
})

export const {
    useGetUsersQuery,
    useGetUserQuery } = listEndpoints