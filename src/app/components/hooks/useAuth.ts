import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
    exp: number;
}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("token");

            if (!token || token.split(".").length !== 3) {
                console.warn("Invalid or missing token");
                setIsAuthenticated(false);
                return;
            }

            try {
                const decoded = jwtDecode<DecodedToken>(token);
                const now = Date.now() / 1000;

                if (decoded.exp && decoded.exp > now) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refresh_token");
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Invalid token:", err);
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");
                setIsAuthenticated(false);
            }
        };

        checkToken();
    }, []);

    return { isAuthenticated, setIsAuthenticated };
};

export default useAuth;
