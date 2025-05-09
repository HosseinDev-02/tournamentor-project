import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const avatarSlice = createSlice({
    name: "avatar",
    initialState,
    reducers: {
        setSelectedAvatarId: (state, action) => {
          state.selectedAvatarId = action.payload;
        },
        clearSelectedAvatarId: (state) => {
          state.selectedAvatarId = null;
        },
      },
});


export const { setSelectedAvatarId, clearSelectedAvatarId } = avatarSlice.actions;
export default avatarSlice.reducer;
