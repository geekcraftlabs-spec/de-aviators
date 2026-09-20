"use client";

import { useState } from "react";
import { Play, Images as ImagesIcon } from "lucide-react";
import type { Film } from "@/lib/videos";
import type { TikTokMeta } from "@/lib/tiktok";

/**
 * A single TikTok card.
 *
 * Posters come from TikTok's CDN via oEmbed, fetched server-side.
 * Clicking mounts the iframe — one at a time, no bandwidth contention.
 * Photo carousels with no oEmbed thumbnail get a designed placeholder.
 */
function FilmCard({
  film,
  meta,
}: {
  film: Film;
  meta: TikTokMeta | null;
}) {
  const [active, setActive] = useState(false);
  const poster = meta?.thumbnail ?? null;

  return (
    <figure className="group">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-ink-soft ring-1 ring-white/5">
        {active ? (
          <iframe
            src={`https://www.tiktok.com/embed/v2/${film.id}`}
            title={film.title}
            loading="eager"
            allow="encrypted-media; fullscreen; picture-in-picture; clipboard-write; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play: ${film.title}`}
            className="absolute inset-0 block h-full w-full cursor-pointer"
          >
            {poster ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={poster}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            ) : (
              /* Designed placeholder for photo carousels with no preview */
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink-soft via-ink to-ink-soft">
                <div className="flex flex-col items-center gap-3 text-bone-dim">
                  <ImagesIcon className="size-6" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.24em]">
                    {film.isPhoto ? "Photo slideshow" : "Preview unavailable"}
                  </span>
                </div>
              </div>
            )}

            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-14 place-items-center rounded-full bg-bone/90 text-ink backdrop-blur transition-transform group-hover:scale-110">
                <Play className="ml-0.5 size-5 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>

      <figcaption className="mt-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[15px] font-medium leading-tight text-bone">
            {film.title}
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-bone-dim">
            {film.blurb}
          </p>
        </div>
        {film.isPhoto && (
          <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-bone-dim">
            Photos
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function FilmGrid({
  films,
  metas,
}: {
  films: Film[];
  metas: (TikTokMeta | null)[];
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {films.map((f, i) => (
        <FilmCard key={f.id} film={f} meta={metas[i] ?? null} />
      ))}
    </div>
  );
}