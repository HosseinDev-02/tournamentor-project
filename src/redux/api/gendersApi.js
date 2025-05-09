import { apiSlice } from "./apiSlice";

export const gendersApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Get Genders
        getGenders: build.query({
            query() {
                return "Gender/Genders";
            },
        }),
        // Add Genders

        addGender: build.mutation({
            query(genderData) {
                return {
                    url: "Gender/Add",
                    method: "POST",
                    body: genderData,
                };
            },
        }),

        // Get Gender

        getGender: build.query({
            query(mainGenderId) {
                return `Gender/GetDetail?genderId=${mainGenderId}`;
            },
        }),

        // Update Gender

        updateGender: build.mutation({
            query(newData) {
                return {
                    url: "Gender/Edit",
                    method: "PUT",
                    body: newData,
                };
            },
        }),

        // Short Genders ---------------------------------------------------------------------

        getShortGenders: build.query({
            query() {
                return "Gender/ShortGenders";
            },
        }),
    }),
});

export const {
    useGetGendersQuery,
    useAddGenderMutation,
    useGetGenderQuery,
    useUpdateGenderMutation,
    useGetShortGendersQuery,
} = gendersApi;
