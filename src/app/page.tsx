import Image from "next/image";
import { Navbar } from "./components/layout/Navbar";
import HomePage from "./components/layout/HomePage";
import Footer from "./components/layout/Footer";
import Profile from "./components/layout/Profile";

export default function Home() {
  return (
    <div className="page-container">
      <HomePage />
      <Profile />
    </div>
  );
}
