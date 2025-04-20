"use client";
import Navbar from "./components/layout/Navbar";
import Login from "./components/layout/Login";
import { useEffect, useState } from "react";
import ProductPage from "./components/layout/ProductPage";
import { getLikedProductsFromCookies } from "./lib/cookies";
import { setLikes } from "./store/likedSlice";
import { useDispatch } from "react-redux";
import useAuth from "./components/hooks/useAuth";
import useAuthRehydrate from "./components/hooks/useAuthRehydrate";

export default function Home() {

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  useAuthRehydrate();

  useEffect(() => {
    const liked = getLikedProductsFromCookies();
    dispatch(setLikes(liked));
  }, [dispatch]);

  return (
    <>
      <Navbar setSearchValue={setSearchValue} setIsUser={setIsAuthenticated}/>
      {!isAuthenticated && <Login setIsAuthenticated={setIsAuthenticated}/>}
      <h1>{isAuthenticated}</h1>
      <ProductPage searchValue={searchValue}/>
    </>
  );
}
