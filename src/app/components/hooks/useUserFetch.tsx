import React, { useEffect } from 'react'

interface UserType {
    name?: string;
    email?: string;
    avatar?: string;
}

interface UseFetchUserProfileProps {
    setUser: (user: any) => void;
}

const useUserFetch: React.FC<UseFetchUserProfileProps> = ({ setUser }) => {
    useEffect(() => {   
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error("Failed to fetch user profile", err);
            }
        };

        fetchUser();
    }, [setUser]);

    return (
        <div>useUserFetch</div>
    )
}

export default useUserFetch