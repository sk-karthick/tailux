"use client"
import { useState } from "react"
import Link from "next/link"
// import { Menu, X } from "lucide-react" // optional icons (install lucide-react)

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="text-2xl font-bold text-blue-600">
                        <Link href="/">Tailux</Link>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                        <Link href="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600">
                            {/* {isOpen ? <X size={24} /> : <Menu size={24} />} */}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden px-4 pb-4">
                    <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</Link>
                    <Link href="/about" className="block py-2 text-gray-700 hover:text-blue-600">About</Link>
                    <Link href="/services" className="block py-2 text-gray-700 hover:text-blue-600">Services</Link>
                    <Link href="/contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</Link>
                </div>
            )}
        </nav>
    )
}
