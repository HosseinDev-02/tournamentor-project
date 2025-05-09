import { apiSlice } from "./apiSlice";

export const gamesApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getShortGames: build.query({
            query() {
                return "Game/ShortGames";
            },
        }),
        getGames: build.query({
            query(currentPage) {
                return `Game/Games?CurrentPage=${currentPage}`;
            },
            providesTags: (result = []) =>
                result
                    ? [
                          "Game",
                          ...result.response?.map((game) => ({
                              type: "Game",
                              id: game.id,
                          })),
                      ]
                    : [],
        }),
        addGame: build.mutation({
            query(newData) {
                return {
                    url: "Game/Add",
                    body: newData,
                    method: "POST",
                };
            },
            invalidatesTags: ["Game"],
        }),
        getGame: build.query({
            query(gameId) {
                return `Game/GetDetail?gameId=${gameId}`;
            },
            providesTags: (arg) => [{ type: "Game", id: arg }],
        }),
        updateGame: build.mutation({
            query(newData) {
                return {
                    url: "Game/Update",
                    body: newData,
                    method: "PUT",
                };
            },
            invalidatesTags: (arg) => [{ type: "Game", id: arg.id }],
        }),
    }),
});

export const {
    useGetShortGamesQuery,
    useGetGamesQuery,
    useAddGameMutation,
    useGetGameQuery,
    useUpdateGameMutation,
} = gamesApi;
