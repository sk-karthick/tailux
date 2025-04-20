// src/app/hooks/useAuthRehydrate.ts
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/store/userSlice';
import { useEffect } from 'react';

const useAuthRehydrate = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
            dispatch(setUser(JSON.parse(user)));
        }
    }, [dispatch]);
};

export default useAuthRehydrate;
