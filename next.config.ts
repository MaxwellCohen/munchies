import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    localPatterns: [
      {
        pathname: '/api/proxy',
      },
    ],
  },
};

export default nextConfig;
