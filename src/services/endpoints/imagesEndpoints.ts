import { UploadResponseData } from "../../types/imageTypes";
import { api } from "../api";

export const imagesEndpoints = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation<UploadResponseData, FormData>({
            query: (body) => ({
                url: '/images',
                method: "POST",
                body
            }),
            
            invalidatesTags: ['Images']
        })
    })
})

export const {useUploadImageMutation} = imagesEndpoints
