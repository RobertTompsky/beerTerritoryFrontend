import {
    EditedProfileBody,
    Profile,
    ProfileBody,
    UserWithProfile
} from "../../types/userTypes";
import { api } from "../api";

export const listEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<UserWithProfile, void>({
            query: () => ({
                url: '/users/me',
                method: "GET"
            }),
            providesTags: ['Users']
        }),
        createProfile: builder.mutation<Profile, ProfileBody>({
            query: (body) => ({
                url: '/users/me/create_profile',
                method: "POST",
                body
            }),
            invalidatesTags: ['Users']
        }),
        editProfile: builder.mutation<Profile, EditedProfileBody>({
            query: (body) => ({
                url: '/users/me/update_profile',
                method: "PATCH",
                body
            }),
            invalidatesTags: ['Users']
        }),
        deleteMe: builder.mutation<void, void>({
            query: () => ({
                url: `/users/me/delete`,
                method: "DELETE"
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useGetMeQuery,
    useCreateProfileMutation,
    useEditProfileMutation } = listEndpoints