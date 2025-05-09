import { apiSlice } from "./apiSlice";

export const typesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Get States
        getStates: build.query({
            query() {
                return "Types/States";
            },
        }),

        // Get Types Avatar

        getTypeAvatars: build.query({
            query() {
                return "Types/TypeAvatar";
            },
        }),

        // Get Game Types

        getGameTypes: build.query({
            query() {
                return "Types/GameTypes";
            },
        }),

        // Get Transaction Types

        getTransactionTypes: build.query({
            query() {
                return `Types/FinancialTransactionType`;
            },
        }),
        // Get Transaction States
        getTransactionStates: build.query({
            query() {
                return `Types/FinancialTransactionState`;
            },
        }),
        // Get Transaction For
        getTransactionFor: build.query({
            query() {
                return `Types/FinancialTransactionFor`;
            },
        }),
    }),
});

export const {
    useGetStatesQuery,
    useGetTypeAvatarsQuery,
    useGetGameTypesQuery,
    useGetTransactionForQuery,
    useGetTransactionStatesQuery,
    useGetTransactionTypesQuery
} = typesApi;
