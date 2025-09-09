import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  forceOptimisticNavigation: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ]
  },
};

export default nextConfig;
