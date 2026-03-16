import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      { source: '/pid', destination: '/tools/pid', permanent: false },
    ];
  },
};

export default nextConfig;
