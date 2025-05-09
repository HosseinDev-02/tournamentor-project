import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ['User', 'Player', 'Game', 'Team'],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    endpoints: () => ({}),
});
