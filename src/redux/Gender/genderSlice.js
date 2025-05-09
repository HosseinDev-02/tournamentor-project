import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const genderSlice = createSlice({
    name: "gender",
    initialState,
    reducers: {
        setSelectedGenderId: (state, action) => {
          state.selectedGenderId = action.payload;
        },
        clearSelectedGenderId: (state) => {
          state.selectedGenderId = null;
        },
      },
});

export const { setSelectedGenderId, clearSelectedGenderId } = genderSlice.actions;
export default genderSlice.reducer;
