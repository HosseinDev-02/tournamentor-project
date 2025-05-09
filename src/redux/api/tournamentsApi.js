import { apiSlice } from "../api/apiSlice";

const tournamentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTournaments: builder.query({
            query: (currentPage) => `Tournament/Tournaments?CurrentPage=${currentPage}`
        })
    })
})


export const { useGetTournamentsQuery } = tournamentsApi