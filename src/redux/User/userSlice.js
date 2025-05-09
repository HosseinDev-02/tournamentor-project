import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSelectedUserId: (state, action) => {
          state.selectedUserId = action.payload;
        },
        clearSelectedUserId: (state) => {
          state.selectedUserId = null;
        },
      },
});

export const { setSelectedUserId, clearSelectedUserId } = userSlice.actions;
export default userSlice.reducer;
