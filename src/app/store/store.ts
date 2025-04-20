import { configureStore } from "@reduxjs/toolkit";
import likedReducer from "./likedSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        liked: likedReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
