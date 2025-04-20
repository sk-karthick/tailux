"use client";

import { useEffect, useState } from "react";

export default function ProfileClient({ id }: { id: string }) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            const getUserData = async (tokenToUse: string) => {
                const res = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${tokenToUse}`,
                    },
                });
                return res;
            };

            let res = await getUserData(token!);

            // Try to refresh token if expired
            if (res.status === 401 && refreshToken) {
                const refreshRes = await fetch("/api/refresh-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refreshToken }),
                });

                if (refreshRes.ok) {
                    const { accessToken: newAccessToken } = await refreshRes.json();
                    localStorage.setItem("accessToken", newAccessToken);

                    // Retry the request
                    res = await getUserData(newAccessToken);
                } else {
                    console.error("Refresh token failed");
                    return;
                }
            }

            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                console.error("Failed to fetch user");
            }
        };

        fetchUser();
    }, [id]);

    if (!user) return <p>Loading user profile...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{user.name}'s Profile</h1>
            <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full mt-4" />
        </div>
    );
}
