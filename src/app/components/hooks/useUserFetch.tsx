import React, { useEffect } from 'react'

interface UserType {
    name?: string;
    email?: string;
    avatar?: string;
    setUser: (user: any) => void;
}

const useUserFetch: React.FC<UserType> = (props) => {
    const { setUser } = props;
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
    }, []);
    return (
        <div>useUserFetch</div>
    )
}

export default useUserFetch