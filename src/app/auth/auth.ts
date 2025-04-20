import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";


interface LoginArgs {
    email: string;
    password: string;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
    setIsUser: Dispatch<SetStateAction<boolean>>;
}

const useFetch = () => {
  const dispatch = useDispatch();
    const login = async ({
        email,
        password,
        setLoading,
        setError,
        setIsUser,
    }: LoginArgs) => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: email, // use "username" for DummyJSON
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("refresh_token", data.refreshToken);

            console.log("Login success:", data);
            dispatch(setUser(data)); 
            setIsUser(true);
        } catch (err) {
            if (err instanceof Error) {
                console.error("Login error:", err.message);
                setError(err.message);
            } else {
                setError("Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return { login };
};


const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    return null;
  }

  try {
      const res = await fetch('https://dummyjson.com/auth/refresh', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Token refresh failed");
    }

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    return data.access_token;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Token refresh error:", err.message);
    } else {
      console.error("Token refresh error:", err);
    }
    return null;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/";
};

export { useFetch, refreshAuthToken, logout };
