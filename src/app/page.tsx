"use client";
import Login from "./components/layout/Login";
import { useEffect } from "react";
import ProductPage from "./components/layout/ProductPage";
import { getLikedProductsFromCookies } from "./lib/cookies";
import { setLikes } from "./store/likedSlice";
import { useDispatch } from "react-redux";
import useAuth from "./components/hooks/useAuth";
import useAuthRehydrate from "./components/hooks/useAuthRehydrate";

export default function Home() {

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const dispatch = useDispatch();
  useAuthRehydrate();

  useEffect(() => {
    const liked = getLikedProductsFromCookies();
    dispatch(setLikes(liked));
  }, [dispatch]);

  return (
    <>
      {!isAuthenticated && <Login setIsAuthenticated={setIsAuthenticated}/>}
      <ProductPage />
    </>
  );
}
