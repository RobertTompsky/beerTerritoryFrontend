import { store } from "@/app/store";
import { login, register } from "@/services/endpoints/users/authEndpoints";
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: register.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners()
        if (action.payload.token) {
            localStorage.setItem('user', JSON.stringify(action.payload));
            localStorage.setItem('isAuthenticated', 'true');
        }
    }
});

listenerMiddleware.startListening({
    matcher: login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners()
        if (action.payload.token) {
            const authState = store.getState().auth;
            localStorage.setItem('auth', JSON.stringify(authState))
        }
    }
})