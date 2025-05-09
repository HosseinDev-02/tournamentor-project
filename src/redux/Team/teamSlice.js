import { createSlice } from "@reduxjs/toolkit";


const initialState = {}

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setSelectedTeamId: (state, action) => {
            state.selectedTeamId = action.payload
        },
        clearSelectedTeamId: (state) => {
            state.selectedTeamId = null
        }
    }
})

export const { setSelectedTeamId, clearSelectedTeamId } = teamSlice.actions

export default teamSlice.reducer