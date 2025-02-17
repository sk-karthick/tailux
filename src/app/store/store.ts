"use client";

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface LikedState {
    likedProducts: number[];
}

const initialState: LikedState = {
    likedProducts: [],
};

// Create a slice
const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        toggleLike: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            if (state.likedProducts.includes(productId)) {
                state.likedProducts = state.likedProducts.filter((id) => id !== productId);
            } else {
                state.likedProducts.push(productId);
            }
        },
        setLikesFromDB: (state, action: PayloadAction<number[]>) => {
            state.likedProducts = action.payload;
        },
    },
});

export const { toggleLike, setLikesFromDB } = likeSlice.actions;

export const store = configureStore({
    reducer: {
        likes: likeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
