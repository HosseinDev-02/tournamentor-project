import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const statesSlice = createSlice({
    name: "states",
    initialState,
    reducers: {},
});

export default statesSlice.reducer;