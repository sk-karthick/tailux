// redux/likedSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveLikedProductsToCookies, getLikedProductsFromCookies } from "../lib/cookies";

const initialState = {
    likedProducts: getLikedProductsFromCookies(),
};

const likedSlice = createSlice({
    name: "liked",
    initialState,
    reducers: {
        toggleLike: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const index = state.likedProducts.indexOf(productId);

            if (index === -1) {
                state.likedProducts.push(productId);
            } else {
                state.likedProducts.splice(index, 1);
            }

            saveLikedProductsToCookies(state.likedProducts);
        },

        setLikes: (state, action: PayloadAction<number[]>) => {
            state.likedProducts = action.payload;
            saveLikedProductsToCookies(action.payload);
        },
    },
});

export const { toggleLike, setLikes } = likedSlice.actions;
export default likedSlice.reducer;
