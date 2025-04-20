import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    ip: string;
    address: {
        address: string;
        city: string;
        state: string;
        stateCode: string;
        postalCode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
        country: string;
    };
    macAddress: string;
    university: string;
    bank: {
        cardExpire: string;
        cardNumber: string;
        cardType: string;
        currency: string;
        iban: string;
    };
    company: {
        department: string;
        name: string;
        title: string;
        address: {
            address: string;
            city: string;
            state: string;
            stateCode: string;
            postalCode: string;
            coordinates: {
                lat: number;
                lng: number;
            };
            country: string;
        };
    };
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: {
        coin: string;
        wallet: string;
        network: string;
    };
    role: string;
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
        resetUser(state) {
            state.user = null;
        },
    },
});

export const { setUser, setError, resetUser } = userSlice.actions;

export default userSlice.reducer;
