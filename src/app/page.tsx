import Image from "next/image";
import Navbar from "./components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
    <div className="bg-primary text-white p-4 rounded-lg shadow">
  Tailwind is working!
</div>
    </>

    
  );
}
