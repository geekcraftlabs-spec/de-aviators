"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Images, Hammer, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const ITEMS = [
  { href: "/",       label: "Home",   Icon: Home,   exact: true },
  { href: "/work",   label: "Work",   Icon: Images },
  { href: "/custom", label: "Custom", Icon: Hammer },
  { href: "/watch",  label: "Watch",  Icon: Play },
];

export function Dock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed z-[100] border-white/10 bg-[#141417]/95 backdrop-blur-xl",
        // Mobile: full-width bar at the very bottom
        "inset-x-0 bottom-0 border-t",
        // Desktop: floating centred pill
        "sm:inset-x-auto sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2",
        "sm:rounded-full sm:border sm:p-1.5",
        "sm:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.9)]"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch justify-around sm:items-center sm:justify-center sm:gap-1">
        {/* ---------- Nav items ---------- */}
        {ITEMS.map(({ href, label, Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex h-14 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
                "sm:h-10 sm:flex-initial sm:flex-row sm:gap-2 sm:rounded-full sm:px-3 sm:text-sm",
                active
                  ? "text-bone sm:text-ink"
                  : "text-bone-dim hover:text-bone"
              )}
            >
              {active && (
                <>
                  {/* Mobile: underline */}
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-bone sm:hidden" />
                  {/* Desktop: sliding bone pill */}
                  <motion.span
                    layoutId="dock-pill"
                    className="absolute inset-0 hidden rounded-full bg-bone sm:block"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                </>
              )}
              <Icon className="relative z-10 size-[18px]" strokeWidth={2} />
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}

        {/* ---------- Divider (desktop only) ---------- */}
        <span className="mx-1 hidden h-6 w-px self-center bg-white/10 sm:block" />

        {/* ---------- Phone (desktop only) ---------- */}
        <a
          href={`tel:${site.phoneTel}`}
          aria-label={`Call ${site.phoneDisplay}`}
          title={`Call ${site.phoneDisplay}`}
          className={cn(
            "hidden shrink-0 transition-transform",
            "sm:grid sm:h-10 sm:w-10 sm:place-items-center sm:rounded-full sm:bg-[#F5F5F5]",
            "sm:hover:scale-105 sm:active:scale-95"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/phone.png"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain"
          />
        </a>

        {/* ---------- TikTok (desktop only) ---------- */}
        <a
          href={site.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          title="TikTok"
          className={cn(
            "hidden shrink-0 transition-transform",
            "sm:grid sm:h-10 sm:w-10 sm:place-items-center sm:rounded-full sm:bg-[#F5F5F5]",
            "sm:hover:scale-105 sm:active:scale-95"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tiktok.png"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain"
          />
        </a>

        {/* ---------- WhatsApp ---------- */}
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={cn(
            "flex h-14 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors",
            "bg-[#C9A227] text-ink",
            "sm:h-10 sm:w-auto sm:flex-initial sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:text-sm sm:hover:scale-[1.04] sm:active:scale-95"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/whatsapp.png"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain"
          />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}