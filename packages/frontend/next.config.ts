import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración básica para Vercel
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
