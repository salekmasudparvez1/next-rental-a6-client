import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export behavior (replaces `next export`)
  output: "export",
  // Explicitly set Turbopack root to avoid workspace root warnings
  turbopack: {
    root: ".",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
  },
};

export default nextConfig;
