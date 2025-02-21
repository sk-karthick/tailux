"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Navbar } from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <html lang="en">
          <body>
            <Navbar />
            <div className="page-container">
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </PrimeReactProvider>
    </Provider>
  );
}
