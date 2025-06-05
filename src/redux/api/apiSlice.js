import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ['User', 'Player', 'Game', 'Team'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://brok.topshipping.co/api',
        credentials: 'include', // برای ارسال کوکی‌ها
      }),
    endpoints: () => ({}),
});
