import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { FilmGrid } from "@/components/VideoWall";
import {
  CATEGORY_BLURBS,
  CATEGORY_ORDER,
  films,
} from "@/lib/videos";
import { fetchTikTokMeta } from "@/lib/tiktok";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "See De Aviators on site — TV backdrops, kitchens, full renovations, and construction, straight from the work.",
};

export const revalidate = 86400;

export default async function WatchPage() {
  // Fetch all oEmbed metadata in parallel, server-side, cached 24h
  const allMeta = await Promise.all(
    films.map((f) => fetchTikTokMeta(f.id, f.isPhoto))
  );

  const metaById = new Map(films.map((f, i) => [f.id, allMeta[i]]));

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    blurb: CATEGORY_BLURBS[category],
    items: films.filter((f) => f.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-40 pt-24 sm:pt-28">
      <header className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
          {site.shortName}
        </p>
        <h1 className="display-lg mt-3">
          The work,
          <br />
          as it happens.
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed text-bone-dim">
          Short clips from real jobs — TV backdrops going up, kitchens coming
          together, ground being broken. No stock footage. No filters. Just the
          work.
        </p>
      </header>

      <div className="mt-20 space-y-24">
        {groups.map((group) => (
          <section key={group.category}>
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-ink-line pb-5">
              <h2 className="display-md">{group.category}</h2>
              <p className="max-w-md text-[13px] leading-relaxed text-bone-dim">
                {group.blurb}
              </p>
            </div>

            <FilmGrid
              films={group.items}
              metas={group.items.map((f) => metaById.get(f.id) ?? null)}
            />
          </section>
        ))}
      </div>

      <div className="mt-28 max-w-xl">
        <p className="text-[15px] leading-relaxed text-bone-dim">
          Seen something close to what you want? Send us a photo of the piece —
          we&apos;ll come back with a free quote.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/custom"
            className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
          >
            Get a free quote
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-bone hover:bg-white/5"
          >
            <MessageCircle className="size-4" strokeWidth={2} />
            WhatsApp us
          </a>
        </div>
      </div>
    </main>
  );
}