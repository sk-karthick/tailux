// src/app/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    "password": string;
    "birthDate": string;
    "image": string;
    "bloodGroup": string;
    "height": number;
    "weight": number;
    "eyeColor": string;
    // Add other fields as needed
}

interface UserState {
    user: User | null;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const { setUser, setError } = userSlice.actions;

export default userSlice.reducer;
