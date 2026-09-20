import type { Metadata } from "next";
import { QuoteStudio } from "@/components/QuoteStudio";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom furniture",
  description:
    "Send us a photo of what you have in mind. We quote custom furniture, kitchens, TV backdrops and built-ins across Pretoria and Johannesburg.",
};

export default function CustomPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-40 pt-24 sm:pt-28">
      <header>
        <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
          {site.shortName}
        </p>
        <h1 className="display-lg mt-3">
          Send us a photo.
          <br />
          Get a free quote.
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-bone-dim">
          Saw something you like — on Pinterest, in a friend&apos;s house, or
          from a shop that&apos;s out of your budget? Take a photo, add a few
          details, and we&apos;ll come back with a price.
        </p>
      </header>

      <section className="mt-14 rounded-2xl border border-ink-line bg-ink-soft p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
          How our quotes work
        </p>
        <h2 className="mt-3 text-[20px] font-semibold text-bone">
          {site.quotePolicy.headline}
        </h2>
        <ul className="mt-6 space-y-3">
          {site.quotePolicy.points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-[14px] leading-relaxed text-bone-dim"
            >
              <span className="pt-0.5 font-mono text-[11px] text-bone-dim/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16">
        <QuoteStudio />
      </div>

      <footer className="mt-24 border-t border-ink-line pt-8 text-[13px] text-bone-dim">
        Prefer to just message?{" "}
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-bone underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-bone"
        >
          WhatsApp {site.phoneDisplay}
        </a>
        .
      </footer>
    </main>
  );
}