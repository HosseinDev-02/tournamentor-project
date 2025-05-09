import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Login User

        loginUser: build.mutation({
            query(data) {
                return {
                    url: "Account/Login",
                    method: "POST",
                    body: data,
                };
            },
        }),

        // Logout User

        logOutUser: build.mutation({
            query() {
                return {
                    url: "Account/Logout",
                    method: "POST",
                };
            },
        }),

        // Check Is User Logged In

        loggedInUser: build.query({
            query() {
                return {
                    url: "Account/CheckCookies",
                    method: 'GET',
                    headers: { // جلوگیری از کش مرورگر
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    }
                }
            },
        }),
    }),
});

export const {
    useLoginUserMutation,
    useLogOutUserMutation,
    useLoggedInUserQuery,
} = authApi;
