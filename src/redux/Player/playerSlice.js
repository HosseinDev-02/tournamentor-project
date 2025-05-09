import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setSelectedPlayerId: (state, action) => {
            state.selectedPlayerId = action.payload;
        },
        clearSelectedPlayerId: (state) => {
            state.selectedPlayerId = null;
        },
    },
});

export const { setSelectedPlayerId, clearSelectedPlayerId } =
    playerSlice.actions;
export default playerSlice.reducer;
