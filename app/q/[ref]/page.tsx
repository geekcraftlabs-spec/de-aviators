import { list } from "@vercel/blob";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MessageCircle, ExternalLink } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { BackButton } from "@/components/BackButton";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Brief = {
  ref: string;
  piece: string;
  dims: string;
  notes: string;
  name: string;
  area: string;
  photos: number;
  at: string;
};

export default async function BriefPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;

  if (!/^DA-[A-Z0-9]{8}$/.test(ref)) notFound();

  const { blobs } = await list({ prefix: `quotes/${ref}/` });
  if (!blobs.length) notFound();

  const briefBlob = blobs.find((b) => b.pathname.endsWith("brief.json"));
  const photos = blobs
    .filter((b) => b.pathname.endsWith(".jpg"))
    .sort((a, b) => a.pathname.localeCompare(b.pathname));

  let brief: Brief | null = null;
  if (briefBlob) {
    try {
      const res = await fetch(briefBlob.url, { cache: "no-store" });
      brief = await res.json();
    } catch {
      brief = null;
    }
  }

  // Prefilled WhatsApp message for the "Looks good" CTA
  const ctaMsg = encodeURIComponent(
    `Hi De Aviators 👋\n\n` +
      `My brief (Ref: ${ref}) looks good — please send me a quote.\n\n` +
      (brief?.piece ? `*Piece:* ${brief.piece}\n` : "") +
      (brief?.area ? `*Area:* ${brief.area}\n` : "")
  );
  const ctaUrl = `https://wa.me/${site.whatsapp}?text=${ctaMsg}`;

  return (
    <main className="mx-auto max-w-3xl px-5 pb-32 pt-20 sm:px-6 sm:pt-28">
      {/* ---- Top bar ---- */}
      <div className="flex items-center justify-between">
        <BackButton />
        <LogoMark className="h-9 w-9 text-bone" />
      </div>

      {/* ---- Header ---- */}
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
        {ref}
      </p>
      <h1 className="display-lg mt-3">Your custom brief</h1>
      <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-bone-dim">
        This is exactly what we see on our side. Check your photos and details
        below — if everything looks right, send us a message and we&apos;ll
        take it from there.
      </p>

      {/* ---- Brief details ---- */}
      {brief && (
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-ink-line py-8 text-sm">
          {(
            [
              ["Piece", brief.piece],
              ["Size (mm)", brief.dims],
              ["Area", brief.area],
              ["Name", brief.name],
              [
                "Received",
                brief.at ? new Date(brief.at).toLocaleString("en-ZA") : "—",
              ],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className="text-bone-dim">{k}</dt>
              <dd className="mt-1 break-words text-bone">{v || "—"}</dd>
            </div>
          ))}
          {brief.notes && (
            <div className="col-span-2 min-w-0">
              <dt className="text-bone-dim">Notes</dt>
              <dd className="mt-1 whitespace-pre-wrap break-words text-bone">
                {brief.notes}
              </dd>
            </div>
          )}
        </dl>
      )}

      {/* ---- Photos ---- */}
      <p className="mt-10 text-[13px] text-bone-dim">
        {photos.length} photo{photos.length === 1 ? "" : "s"} attached
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {photos.map((p) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-soft ring-1 ring-white/5 transition-colors hover:ring-white/15"
          >
            <Image
              src={p.url}
              alt=""
              fill
              sizes="(max-width:640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <span className="pointer-events-none absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-ink/70 text-bone backdrop-blur">
              <ExternalLink className="size-3.5" />
            </span>
          </a>
        ))}
      </div>

      {/* ---- CTA ---- */}
      <section className="mt-16 overflow-hidden rounded-2xl border border-brass/30 bg-brass/5 p-6 sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
          Everything look good?
        </p>
        <h2 className="mt-3 text-[22px] font-semibold leading-tight text-bone sm:text-[26px]">
          Send us a message and we&apos;ll get you a quote.
        </h2>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-bone-dim">
          Tap below to open WhatsApp with your reference already in the
          message. We&apos;ll confirm the price and next steps.
        </p>

        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
        >
          <MessageCircle className="size-4" strokeWidth={2.4} />
          Send on WhatsApp
        </a>
      </section>

      {/* ---- Small print ---- */}
      <p className="mt-10 text-[12px] leading-relaxed text-bone-dim/80">
        Need to change something? Reply to the message you came from, or{" "}
        <a
          href={`tel:${site.phoneTel}`}
          className="text-bone underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-bone"
        >
          call us on {site.phoneDisplay}
        </a>
        .
      </p>
    </main>
  );
}