import { apiSlice } from "./apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get Teams
        getTeams: builder.query({
            query: (currentPage) => `Team/Teams?CurrentPage=${currentPage}`,
            providesTags: (result = []) =>
                result
                    ? [
                          "Team",
                          ...result.response?.map((team) => ({
                              type: "Team",
                              id: team.id,
                          })),
                      ]
                    : [],
        }),
        addTeam: builder.mutation({
            query: (team) => ({
                url: `Team/CreateTeam`,
                method: "POST",
                body: team,
            }),
            invalidatesTags: ["Team"],
        }),
        getTeam: builder.query({
            query: (search) => `Team/TeamDetail?search=${search}`,
            providesTags: (arg) => [{ type: "Team", id: arg }],
        }),
        updateTeam: builder.mutation({
            query: (team) => ({
                url: `Team/UpdateTeam`,
                method: "PUT",
                body: team,
            }),
            invalidatesTags: (arg) => [{ type: "Team", id: arg.id }],
        }),
        addPlayerToTeam: builder.mutation({
            query: (player) => ({
                url: `Team/AddPlayerToTeam`,
                method: "POST",
                body: player,
            }),
            invalidatesTags: (arg) => [{ type: "Team", id: arg.id }],
        }),
        getTeamShortPlayers: builder.query({
            query: (teamId) => `Player/Players?Team=${teamId}`,
        }),
    }),
});

export const {
    useGetTeamsQuery,
    useAddTeamMutation,
    useGetTeamQuery,
    useUpdateTeamMutation,
    useAddPlayerToTeamMutation,
    useGetTeamShortPlayersQuery,
} = teamsApi;
