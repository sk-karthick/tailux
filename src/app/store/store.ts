import { configureStore } from "@reduxjs/toolkit";
import likedReducer from "./likedSlice";

export const store = configureStore({
    reducer: {
        liked: likedReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
