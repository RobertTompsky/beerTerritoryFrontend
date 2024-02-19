import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../services/endpoints/authEndpoints";
import { UserWithToken } from "../types/userTypes";

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
        logOut: () => initialState
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
