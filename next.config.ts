import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rozzride.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'rozzride.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
