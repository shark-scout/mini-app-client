import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.moralis.io",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
