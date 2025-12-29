import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use default output (do not enable static export here) because some dynamic routes
  // are not prepared for static export via `generateStaticParams()`.
  // Explicitly set Turbopack root to an absolute path to silence workspace detection warnings.
  turbopack: {
    root: __dirname,
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
