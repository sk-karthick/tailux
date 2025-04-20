import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },

      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
    domains: ["images.pexels.com"],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dummyjson.com/:path*", 
      },
    ];
  },
};

export default withPWA(nextConfig);
