import { register, login } from "@/services/endpoints/users/authEndpoints";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserWithToken } from "../types/userTypes";
import { PURGE } from "redux-persist";

interface InitialState {
    user: UserWithToken | null,
    isAuthenticated: boolean
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(register.matchFulfilled, (state, action: PayloadAction<UserWithToken>) => {
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addMatcher(login.matchFulfilled, (state, action: PayloadAction<UserWithToken>) => {
                state.user = action.payload
                state.isAuthenticated = true
            })
    }
})

export const { logOut } = authSlice.actions
export const authReducer = authSlice.reducer
