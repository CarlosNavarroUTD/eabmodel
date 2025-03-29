import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add your Next.js configuration options here, such as reactStrictMode, swcMinify, etc.
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  },
  images: {
    unoptimized: true, // Desactiva la optimización para pruebas
  },
};

export default nextConfig;
