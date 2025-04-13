import React from "react";

const useFetch = async (props) => {
  const { email, password, setLoading, setError, setIsUser, router } = props;

  try {
    setLoading(true);

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
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
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
    console.error("Token refresh error:", err.message);
    return null;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login"; 
};

export { useFetch, refreshAuthToken, logout };
