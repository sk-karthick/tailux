"use client";
import Navbar from "./components/layout/Navbar";
import Login from "./components/layout/Login";
import { useEffect, useState } from "react";
import ProductPage from "./components/layout/ProductPage";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import { getLikedProductsFromCookies } from "./lib/cookies";
import { setLikes } from "./store/likedSlice";
import { useDispatch } from "react-redux";

export default function Home() {

  const [isUser, setIsUser] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const liked = getLikedProductsFromCookies();
    dispatch(setLikes(liked));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp > now) {
          setIsUser(false);
          router.push("/");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          setIsUser(true);
        }
      } catch (error) {
        console.log("Token is invalid or expired", error);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        setIsUser(true);
      }
    } else {
      setIsUser(true);
    }
  }, []);

  return (
    <>
      <Navbar setSearchValue={setSearchValue}/>
      {isUser && <Login setIsUser={setIsUser}/>}
      <ProductPage searchValue={searchValue}/>
    </>
  );
}
