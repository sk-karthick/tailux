import { configureStore } from "@reduxjs/toolkit";
import likedReducer from "./likedSlice";
import userReducer from "./userSlice";
import appReducer from './appSlice'

export const store = configureStore({
    reducer: {
        liked: likedReducer,
        user: userReducer,
        app: appReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
