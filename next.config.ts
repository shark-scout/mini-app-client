import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "https://backend.sharkscout.tech/:path*",
      },
    ];
  },
};

export default nextConfig;
