import { useRouter } from "next/navigation";


const useFetch = () => {
  const router = useRouter();

  const login = async ({
    email,
    password,
    setLoading,
    setError,
    setIsUser
  }: {
    email: string;
    password: string;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
    setIsUser: (isUser: boolean) => void;
  }) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      setIsUser(false);
      router.push("/");
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Login failed");
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
    const res = await fetch("https://api.escuelajs.co/api/v1/auth/refresh", {
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
