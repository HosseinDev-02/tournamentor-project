import { apiSlice } from "./apiSlice";

export const playersApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Get Players

        getPlayers: build.query({
            query({ currentPage, deBouncedUsername }) {
                return `Player/Players/?CurrentPage=${currentPage}`;
            },
            providesTags: (result = []) => (
                result
                    ? [
                          "Player",
                          ...result.response?.map((player) => ({
                              type: "Player",
                              id: player.id,
                          })),
                      ]
                    : []
            ),
        }),

        // Get Main Player 

        getPlayer: build.query({
            query(playerId) {
                return `Player/GetDetail?playerId=${playerId}`
            },
            providesTags: (arg) => [{ type: "Player", id: arg }],
        }),

        // Update Player 

        updatePlayer: build.mutation({
            query(newData) {
                return {
                    url: 'Player/Update',
                    method: 'PUT',
                    body: newData
                }
            },
            invalidatesTags: (arg) => [{ type: "Player", id: arg.id }],
        }),

        getShortPlayers: build.query({
            query(deBouncedSearchPlayerParam) {
                return `Player/ShortPlayers${deBouncedSearchPlayerParam && `?NickName=${deBouncedSearchPlayerParam}`}`
            }
        })
    }),
});

export const { useGetPlayersQuery, useGetPlayerQuery, useUpdatePlayerMutation, useGetShortPlayersQuery } = playersApi;
