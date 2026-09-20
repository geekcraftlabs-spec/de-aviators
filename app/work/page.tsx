import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Gallery } from "@/components/Gallery";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Recent kitchens, TV backdrops, full-house renovations and commercial fit-outs by De Aviators, across Pretoria and Johannesburg.",
};

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-40 pt-24 sm:pt-28">
      {/* ---------- Header ---------- */}
      <header className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
          {site.shortName}
        </p>
        <h1 className="display-lg mt-3">
          Every room
          <br />
          tells a story.
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed text-bone-dim">
          Real projects, real homes. Kitchens, TV backdrops, whole-house
          renovations and commercial fit-outs across Pretoria and Johannesburg.
        </p>
      </header>

      {/* ---------- Gallery ---------- */}
      <div className="mt-16">
        <Gallery projects={projects} />
      </div>

      {/* ---------- Bottom CTA ---------- */}
      <div className="mt-28 max-w-xl">
        <p className="text-[15px] leading-relaxed text-bone-dim">
          Don&apos;t see what you want? Send us a photo of the piece — we&apos;ll
          come back with a free quote.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/custom"
            className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
          >
            Get a free quote
            <ArrowRight className="size-4" strokeWidth={2.2} />
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-bone hover:bg-white/5"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </main>
  );
}