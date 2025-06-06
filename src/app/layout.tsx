"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "sonner";
import "./globals.css";

import Head from "next/head";
import Navbar from "./components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en" className={` font-sans`}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="UTF-8" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <title>TailUX - Modern E-commerce</title>
        </Head>
        <body className="bg-background text-foreground min-h-screen antialiased">
          <Navbar />
          {children}
          <SpeedInsights

          />
          <Toaster position="bottom-left" closeButton />
        </body>
      </html>
    </Provider>
  );
}
