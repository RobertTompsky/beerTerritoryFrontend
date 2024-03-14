import { fetchBaseQuery, createApi, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}`,
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).auth.user?.token;
        if (token && token !== null) {
            headers.set('authorization', `Bearer ${token}`);
        }
    }
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Auth', 'Users', 'Beers', 'Images', 'Reviews'],
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
});