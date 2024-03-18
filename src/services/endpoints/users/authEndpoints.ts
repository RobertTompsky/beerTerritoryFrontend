import { UserLoginData, UserRegistrationData, UserWithToken } from "@/lib/types/userTypes";
import { api } from "@/services/api";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<UserWithToken, UserRegistrationData>({
            query: (body) => ({
                url: '/users/sign/register',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Auth']
        }),
        login: builder.mutation<UserWithToken, UserLoginData>({
            query: (body) => ({
                url: '/users/sign/login',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Auth']
        })
    })
})

export const {useRegisterMutation, useLoginMutation} = authApi
export const {endpoints: {login, register}} = authApi