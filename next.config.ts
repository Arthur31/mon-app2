import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://www.themealdb.com/images/**')],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
