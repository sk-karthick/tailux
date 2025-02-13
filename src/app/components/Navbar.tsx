import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <nav className="nav-bar" aria-label="Main Navigation">
      <div className="nav-bar-container">
        <div className="nav-bar-logo">
          <Link href="/">Tailux</Link>
        </div>
        <div className="nav-bar-menu">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
