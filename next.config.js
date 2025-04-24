// next.config.js

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
    domains: ['images.pexels.com'],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dummyjson.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
