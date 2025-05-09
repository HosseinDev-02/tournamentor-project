import { apiSlice } from "./apiSlice";

export const avatarsApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        // Get Avatars

        getAvatars: build.query({
            query() {
                return "Avatar/Avatars";
            },
        }),

        // Get Main Avatar

        getAvatar: build.query({
            query(mainAvatarId) {
                return `Avatar/GetDetail?avatarId=${mainAvatarId}`;
            },
        }),

        // Add Avatar

        addAvatar: build.mutation({
            query(avatarData) {
                return {
                    url: "Avatar/Add",
                    method: "POST",
                    body: avatarData,
                };
            },
        }),

        // Update Avatar

        updateAvatar: build.mutation({
            query(newData) {
                return {
                    url: "Avatar/Update",
                    method: "PUT",
                    body: newData,
                };
            },
        }),

        // Short Avatars ---------------------------------------------------------------------

        getShortAvatars: build.query({
            query() {
                return "Avatar/ShortPlayerAvatars";
            },
        }),

        getShortTeamAvatars: build.query({
            query() {
                return "Avatar/ShortTeamAvatars";
            },
        }),
    }),
});

export const {
    useGetAvatarsQuery,
    useGetAvatarQuery,
    useAddAvatarMutation,
    useUpdateAvatarMutation,
    useGetShortAvatarsQuery,
    useGetShortTeamAvatarsQuery
} = avatarsApi;
