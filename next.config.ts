import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the dev "N" badge so it can never cover the page UI while developing.
  devIndicators: false,
  // Lets a second dev server (e.g. the Playwright run) use its own build dir.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: {
    // 828 covers the mobile hero background (native 941px wide); 1599 matches
    // the desktop hero background's native width exactly, so the manually
    // built /_next/image URLs in the hero's <picture> element neither 400
    // (arbitrary widths are rejected) nor upscale past native resolution.
    deviceSizes: [640, 750, 828, 1080, 1200, 1599, 1920, 2048, 3840],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 82, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.tacdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
