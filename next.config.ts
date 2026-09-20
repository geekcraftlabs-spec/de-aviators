import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only used in local dev when testing from your phone on the LAN.
  // Harmless in production — this setting has no effect there.
  allowedDevOrigins: ["192.168.100.46", "192.168.100.46:3000"],

  images: {
    remotePatterns: [
      // TikTok CDN — oEmbed thumbnails
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.tiktokcdn-us.com" },
      { protocol: "https", hostname: "**.muscdn.com" },
      // Vercel Blob — uploaded quote photos
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;