import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setSelectedGameId: (state, action) => {
            state.selectedGameId = action.payload;
        },
        clearSelectedGameId: (state) => {
            state.selectedGameId = null;
        },
    },
});

export const { setSelectedGameId, clearSelectedGameId } = gameSlice.actions;
export default gameSlice.reducer;
