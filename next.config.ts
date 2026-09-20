import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow your phone on the LAN to load the dev bundle
  // (Needed only in development. Has no effect in production.)
  allowedDevOrigins: ["192.168.100.46", "192.168.100.46:3000"],

  images: {
    remotePatterns: [
      // TikTok's CDN serves the oEmbed thumbnails
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.tiktokcdn-us.com" },
      { protocol: "https", hostname: "**.muscdn.com" },
      // Vercel Blob (used by /api/quote uploads in Phase 3)
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;