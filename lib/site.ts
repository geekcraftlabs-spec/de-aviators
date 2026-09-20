export const site = {
  shortName: "De Aviators",
  legal: "De Aviators Renovations and Construction (PTY) LTD",
  tagline:
    "Full-house renovations, kitchens, TV backdrops and custom furniture. Pretoria & Johannesburg.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27601089337",
  phoneDisplay: "060 108 9337",
  phoneTel: "+27601089337",

  tiktok: "https://www.tiktok.com/@bonnexytgmail.com1",

  areas: ["Pretoria", "Johannesburg", "Centurion", "Midrand", "Greater Gauteng"],

  quotePolicy: {
    headline: "Free quotes, anywhere in Gauteng.",
    points: [
      "On-site quotes in Pretoria and Johannesburg are completely free.",
      "Anywhere else in Gauteng is still free — we only ask you to arrange transport for our crew (yours or hired) if you're not ready to commit yet.",
      "Ready to start? Then transport is on us.",
      "No obligation. No pressure. No deposit to see a price.",
    ],
  },
} as const;