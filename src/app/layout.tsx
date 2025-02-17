"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Navbar } from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="page-container">
          <Provider store={store}>
            {children}
          </Provider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
