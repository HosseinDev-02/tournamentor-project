import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSelectedLoggedInUser: (state, action) => {
            state.isUserLoggedIn = action.payload
        }
    }
})

export const { setSelectedLoggedInUser } = authSlice.actions
export default authSlice.reducer