import Link from "next/link";
import React, { useState } from "react";
import "./Navbar.scss";
import CartModal from "../UI/CartModal";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="nav-bar" aria-label="Main Navigation">
        <div className="nav-bar-container">
          <div className="nav-bar-logo">
            <Link href="/">Tailux</Link>
          </div>
        </div>
        <button className="cart-button nav-bar-cart" onClick={() => setIsOpen(true)}>
          <i className="pi pi-shopping-cart " />
        </button>
      </nav>
      <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
