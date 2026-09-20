/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { featured } from "@/lib/featured";
import { films } from "@/lib/videos";
import { fetchTikTokMeta } from "@/lib/tiktok";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

// Longer cache — home page metadata is stable
export const revalidate = 86400;

const SERVICES = [
  {
    title: "Full-house renovations",
    blurb:
      "Layout changes, structural work, finishes — the whole house, done by one crew from start to handover.",
  },
  {
    title: "Kitchens",
    blurb:
      "Cabinetry, countertops, tiling, plumbing and lighting. Designed to the room, not bought off a shelf.",
  },
  {
    title: "TV backdrops",
    blurb:
      "Feature walls in timber, fluted panelling, stone and integrated LED. A lounge centrepiece, built in.",
  },
  {
    title: "Custom furniture",
    blurb:
      "Vanities, shelving, built-in cupboards, dining tables. If you can send us a photo, we can quote it.",
  },
];

// IDs used for the "Watch" strip — one from each category
const WATCH_IDS = [
  "7580378482870390032", // TV backdrop installation
  "7341368438457175302", // Entire home renovation
  "7583412574964780309", // Fire pit / On site
];

export default async function Home() {
  const watchFilms = WATCH_IDS.map((id) =>
    films.find((f) => f.id === id)
  ).filter((f): f is NonNullable<typeof f> => Boolean(f));

  const watchMetas = await Promise.all(
    watchFilms.map((f) => fetchTikTokMeta(f.id, f.isPhoto))
  );

  return (
    <main className="overflow-x-clip">
      {/* ============================================================ */}
      {/* 1. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative mx-auto flex min-h-[92dvh] max-w-6xl flex-col justify-end px-6 pb-24 pt-32 sm:min-h-[88dvh] sm:pb-28">
        {/* Blueprint grid — quiet, adds texture without noise */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(244,241,236,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,236,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at 30% 50%, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 30% 50%, black 40%, transparent 80%)",
          }}
        />

        <Reveal>
          <p className="relative text-[11px] uppercase tracking-[0.24em] text-bone-dim">
            Pretoria · Johannesburg · Greater Gauteng
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display-xl relative mt-6 max-w-4xl">
            We build the rooms
            <br />
            people live in.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="relative mt-8 max-w-lg text-[15px] leading-relaxed text-bone-dim">
            Full-house renovations, kitchens, TV backdrops and custom furniture.
            Designed, built, and finished by a small crew that actually cares
            about the details.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="relative mt-10 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              See the work
              <ArrowRight className="size-4" strokeWidth={2.2} />
            </Link>
            <Link
              href="/custom"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-bone transition-colors hover:border-bone hover:bg-white/5"
            >
              Get a free quote
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/* 2. SERVICES                                                  */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
            What we do
          </p>
        </Reveal>

        <div className="mt-10 divide-y divide-ink-line border-y border-ink-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-10">
                <span className="font-mono text-[11px] text-bone-dim sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-md sm:col-span-5">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-bone-dim sm:col-span-6 sm:max-w-md">
                  {s.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SELECTED WORK                                             */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
                Selected work
              </p>
              <h2 className="display-lg mt-3">Recent jobs.</h2>
            </div>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-bone"
            >
              See all 80+ projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                href="/work"
                className="group block overflow-hidden rounded-2xl bg-ink-soft ring-1 ring-white/5 transition-colors hover:ring-white/15"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  ) : (
                    // Placeholder until you drop in the real photo
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink-soft via-ink to-ink-soft">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-bone-dim/50">
                        Photo coming
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-[15px] font-medium text-bone">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-bone-dim">
                      {p.suburb}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-bone-dim">
                    {p.category}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. WATCH STRIP                                               */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
                Watch
              </p>
              <h2 className="display-lg mt-3">The work, moving.</h2>
            </div>
            <Link
              href="/watch"
              className="group inline-flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-bone"
            >
              See all clips
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-4">
          {watchFilms.map((f, i) => {
            const meta = watchMetas[i];
            const poster = meta?.thumbnail;
            return (
              <Reveal key={f.id} delay={i * 80}>
                <Link
                  href="/watch"
                  className="group block"
                  aria-label={`Watch: ${f.title}`}
                >
                  <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-ink-soft ring-1 ring-white/5">
                    {poster ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={poster}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink-soft via-ink to-ink-soft">
                        <span className="text-[10px] uppercase tracking-[0.24em] text-bone-dim/50">
                          Preview
                        </span>
                      </div>
                    )}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                      <span className="text-[12px] font-medium leading-tight text-bone">
                        {f.title}
                      </span>
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-bone/90 text-ink backdrop-blur transition-transform group-hover:scale-110">
                        <Play className="ml-0.5 size-3.5 fill-current" />
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. QUOTE POLICY                                              */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-soft p-8 sm:p-14">
            <p className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
              How our quotes work
            </p>
            <h2 className="display-lg mt-6 max-w-2xl">
              {site.quotePolicy.headline}
            </h2>

            <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {site.quotePolicy.points.map((point, i) => (
                <li key={i} className="flex gap-4">
                  <span className="pt-1 font-mono text-[11px] text-bone-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[14px] leading-relaxed text-bone-dim">
                    {point}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href="/custom"
                className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
              >
                Upload a photo for a quote
                <ArrowRight className="size-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/* 6. CONTACT                                                   */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
            Get in touch
          </p>
          <h2 className="display-lg mt-4 max-w-3xl">
            Ready to start, or just curious?
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-bone-dim">
            Message us on WhatsApp with a photo of what you have in mind. Or
            call — we pick up.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-ink-line bg-ink-soft p-5 transition-colors hover:border-brass/50 hover:bg-ink-soft/80"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#C9A227]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/whatsapp.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-bone-dim">
                  WhatsApp
                </span>
                <span className="mt-1 block text-[15px] font-medium text-bone">
                  {site.phoneDisplay}
                </span>
              </span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${site.phoneTel}`}
              className="group flex items-center gap-4 rounded-2xl border border-ink-line bg-ink-soft p-5 transition-colors hover:border-white/20 hover:bg-ink-soft/80"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#F5F5F5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/phone.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-bone-dim">
                  Call
                </span>
                <span className="mt-1 block text-[15px] font-medium text-bone">
                  {site.phoneDisplay}
                </span>
              </span>
            </a>

            {/* TikTok */}
            <a
              href={site.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-ink-line bg-ink-soft p-5 transition-colors hover:border-white/20 hover:bg-ink-soft/80"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#F5F5F5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/tiktok.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-bone-dim">
                  TikTok
                </span>
                <span className="mt-1 block truncate text-[15px] font-medium text-bone">
                  @bonnexytgmail.com1
                </span>
              </span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/* 7. FOOTER                                                    */}
      {/* ============================================================ */}
      <footer className="border-t border-ink-line px-6 pb-32 pt-16 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="text-[15px] font-medium text-bone">{site.legal}</p>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-bone-dim">
                {site.tagline}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
                Pages
              </p>
              <ul className="mt-4 space-y-2 text-[13px] text-bone-dim">
                <li>
                  <Link href="/" className="transition-colors hover:text-bone">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="transition-colors hover:text-bone"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/custom"
                    className="transition-colors hover:text-bone"
                  >
                    Custom furniture
                  </Link>
                </li>
                <li>
                  <Link
                    href="/watch"
                    className="transition-colors hover:text-bone"
                  >
                    Watch
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
                Areas
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-bone-dim">
                {site.areas.join(" · ")}
              </p>
            </div>
          </div>

          <p className="mt-14 text-[12px] text-bone-dim/60">
            © {new Date().getFullYear()} {site.legal}
          </p>
        </div>
      </footer>
    </main>
  );
}