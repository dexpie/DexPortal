import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict experimental features for performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/drei",
      "react-icons",
    ],
  },

  images: {
    // Provide modern WebP/AVIF formats automatically
    formats: ["image/avif", "image/webp"],
    // Stricter sizes for better lazy loading
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co", // Spotify Album Art
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.genius.com",
      },
    ],
  },

  // Compress responses
  compress: true,

  // Powered by header removal (small security + perf)
  poweredByHeader: false,

  // Strict mode for catching bugs early
  reactStrictMode: true,
};

export default nextConfig;
