"use client";
import Navbar from "./components/layout/Navbar";
import Login from "./components/layout/Login";
import { useEffect, useState } from "react";
import ProductPage from "./components/layout/ProductPage";
import { getLikedProductsFromCookies } from "./lib/cookies";
import { setLikes } from "./store/likedSlice";
import { useDispatch } from "react-redux";
import useAuth from "./components/hooks/useAuth";

export default function Home() {

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const liked = getLikedProductsFromCookies();
    dispatch(setLikes(liked));
  }, []);

  // if (loading) return  <div>Loading...</div>;

  return (
    <>
      <Navbar setSearchValue={setSearchValue} setIsUser={setIsAuthenticated}/>
      {!isAuthenticated && <Login setIsAuthenticated={setIsAuthenticated}/>}
      <h1>{isAuthenticated}</h1>
      <ProductPage searchValue={searchValue}/>
    </>
  );
}
