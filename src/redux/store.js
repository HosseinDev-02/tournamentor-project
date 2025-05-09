import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice.js";
import genderReducer from "./Gender/genderSlice.js";
import avatarReducer from "./Avatar/avatarSlice.js";
import stateReducer from "./Types/States/statesSlice.js";
import userReducer from "./User/userSlice.js";
import gameReducer from "./Game/gameSlice.js";
import authReducer from "./Auth/authSlice.js";
import playerReducer from "./Player/playerSlice.js";
import typeAvatarsReducer from "./Types/TypeAvatars/typeAvatarsSlice.js";
import tournamentReducer from "./Tournament/tournamentSlice.js";
import teamReducer from "./Team/teamSlice.js";
const store = configureStore({
    reducer: {
        gender: genderReducer,
        avatar: avatarReducer,
        states: stateReducer,
        user: userReducer,
        typeAvatars: typeAvatarsReducer,
        player: playerReducer,
        game: gameReducer,
        auth: authReducer,
        tournament: tournamentReducer,
        team: teamReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
