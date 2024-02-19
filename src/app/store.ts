import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { authReducer } from "../features/authSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch