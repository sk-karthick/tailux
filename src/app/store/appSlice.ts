import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    searchValue: string;
    isUser: boolean;
}

const initialState: AppState = {
    searchValue: "",
    isUser: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setIsUser: (state, action: PayloadAction<boolean>) => {
            state.isUser = action.payload;
        },
    },
});

export const { setSearchValue, setIsUser } = appSlice.actions;
export default appSlice.reducer;
