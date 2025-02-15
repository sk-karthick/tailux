import Link from 'next/link'
import React from 'react'
import './Navbar.scss';

export const Navbar = () => {
  return (
    <nav className="nav-bar" aria-label="Main Navigation">
      <div className="nav-bar-container">
        <div className="nav-bar-logo">
          <Link href="/">Tailux</Link>
        </div>
      </div>
    </nav>
  )
}
