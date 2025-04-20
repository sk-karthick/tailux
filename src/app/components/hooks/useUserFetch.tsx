import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { refreshAuthToken } from '@/app/auth/auth';
import { setUser } from '@/app/store/userSlice';

const useUserFetch = () => {
    const dispatch = useDispatch();
    const [user, setUserState] = useState();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            let token = localStorage.getItem("token");

            if (!token) {
                setError("No token found");
                return;
            }

            try {
                let res = await fetch("https://dummyjson.com/auth/me", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 401) {
                    token = await refreshAuthToken();
                    if (!token) {
                        throw new Error("Unauthorized");
                    }
                    res = await fetch("https://dummyjson.com/auth/me", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch user");
                }

                dispatch(setUser(data));
                setUserState(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message || "Failed to fetch user");
                    console.error("Fetch user error:", err);
                } else {
                    setError("An unknown error occurred");
                }
            }
        };

        fetchUser();
    }, [dispatch]);

    return { user, error };
};

export default useUserFetch;
