import { apiSlice } from "./apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Get Users

        getUsers: build.query({
            query({ currentPage, deBouncedUsername }) {
                return `User/Users/?CurrentPage=${currentPage}${
                    deBouncedUsername && `&UserName=${deBouncedUsername}`
                }`;
            },
            providesTags: (result = []) => (
                result
                    ? [
                          "User",
                          ...result.response?.map((user) => ({
                              type: "User",
                              id: user.id,
                          })),
                      ]
                    : []
            ),
        }),

        // Add User

        addUser: build.mutation({
            query(newData) {
                return {
                    url: "User/AddUser",
                    method: "POST",
                    body: newData,
                };
            },
            invalidatesTags: ["User"],
        }),

        // Get Main User

        getUser: build.query({
            query(mainUserId) {
                return `User/GetDetail?userId=${mainUserId}`;
            },
            providesTags: (arg) => [{ type: "User", id: arg }],
        }),

        // Update User

        updateUser: build.mutation({
            query(newData) {
                return {
                    url: "User/EditUser",
                    method: "PUT",
                    body: newData,
                };
            },
            invalidatesTags: (arg) => [{ type: "User", id: arg.id }],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useGetUserQuery,
    useUpdateUserMutation,
} = usersApi;
