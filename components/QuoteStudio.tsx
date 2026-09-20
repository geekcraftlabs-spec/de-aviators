"use client";

import { useState, useRef } from "react";
import {
  X,
  ImagePlus,
  Camera,
  Loader2,
  Check,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { compressImage } from "@/lib/compress";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type Shot = { id: string; file: File; url: string };

type UploadedBrief = {
  ref: string;
  briefUrl: string;
  whatsappUrl: string;
};

const PIECES = [
  "Kitchen",
  "TV backdrop / wall unit",
  "Built-in cupboards",
  "Vanity",
  "Dining table",
  "Coffee table",
  "Bed / headboard",
  "Shelving",
  "Other",
];

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    try {
      return crypto.randomUUID();
    } catch {
      // fall through
    }
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function QuoteStudio() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [piece, setPiece] = useState("");
  const [dims, setDims] = useState({ w: "", h: "", d: "" });
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<UploadedBrief | null>(null);

  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    setErr(null);
    const remaining = 4 - shots.length;
    const next = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining)
      .map((file) => ({
        id: makeId(),
        file,
        url: URL.createObjectURL(file),
      }));
    setShots((s) => [...s, ...next]);
  }

  function removeShot(id: string) {
    setShots((s) => {
      const target = s.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return s.filter((x) => x.id !== id);
    });
  }

  function reset() {
    for (const s of shots) URL.revokeObjectURL(s.url);
    setShots([]);
    setPiece("");
    setDims({ w: "", h: "", d: "" });
    setNotes("");
    setName("");
    setArea("");
    setErr(null);
    setUploaded(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!name.trim() || !area.trim() || !piece) {
      setErr("Please fill in your name, area, and what you need.");
      return;
    }

    setBusy(true);

    try {
      const fd = new FormData();

      for (const s of shots) {
        const blob = await compressImage(s.file);
        fd.append("photos", blob, `${s.id}.jpg`);
      }

      fd.append("piece", piece);
      fd.append(
        "dims",
        [dims.w, dims.h, dims.d].filter(Boolean).join(" × ") || "—"
      );
      fd.append("notes", notes);
      fd.append("name", name);
      fd.append("area", area);

      const res = await fetch("/api/quote", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Upload failed");
      }

      const { ref, briefUrl } = (await res.json()) as {
        ref: string;
        briefUrl: string;
      };

      const msg =
        `${briefUrl}\n\n` +
        `Hi De Aviators 👋 I'd like a quote for a custom piece.\n\n` +
        `*Ref:* ${ref}\n` +
        `*Piece:* ${piece}\n` +
        `*Size (mm):* ${
          [dims.w, dims.h, dims.d].filter(Boolean).join(" × ") || "—"
        }\n` +
        `*Area:* ${area}\n` +
        `*Name:* ${name}\n` +
        (notes ? `*Notes:* ${notes}\n` : "") +
        (shots.length ? `*Photos:* ${shots.length} attached above\n` : "") +
        `\nSent from ${site.url.replace(/^https?:\/\//, "")}`;

      const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
        msg
      )}`;

      setUploaded({ ref, briefUrl, whatsappUrl });
    } catch (e) {
      setErr(
        e instanceof Error
          ? e.message
          : "Upload failed — you can still message us on WhatsApp and attach the photo there."
      );
    } finally {
      setBusy(false);
    }
  }

  // ============================================================
  // SUCCESS STATE
  // ============================================================
  if (uploaded) {
    return (
      <div className="grid gap-6 sm:gap-8">
        {/* Success header */}
        <div className="flex items-start gap-4 rounded-2xl border border-brass/30 bg-brass/5 p-5 sm:p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brass text-ink">
            <Check className="size-5" strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-medium text-bone">
              Uploaded successfully
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-bone-dim">
              Reference{" "}
              <span className="font-mono text-bone">{uploaded.ref}</span>.
              Your photos and details are saved.
            </p>
          </div>
        </div>

        {/* Step 1 — Check brief */}
        <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-soft p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
            Step 1 — Check your brief
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-bone-dim">
            Open the brief to confirm your photos and details look right.
            This is the same page we&apos;ll see on our side.
          </p>

          <a
            href={uploaded.briefUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 flex items-center gap-4 overflow-hidden rounded-xl border border-ink-line bg-ink px-4 py-4 transition-colors hover:border-bone-dim sm:px-5"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] uppercase tracking-[0.18em] text-bone-dim">
                Your brief
              </span>
              <span className="mt-1 block truncate font-mono text-[13px] text-bone">
                {uploaded.briefUrl}
              </span>
            </span>
            <ExternalLink className="size-4 shrink-0 text-bone-dim transition-colors group-hover:text-bone" />
          </a>
        </div>

        {/* Step 2 — Send */}
        <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-soft p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
            Step 2 — Send to WhatsApp
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-bone-dim">
            Opens WhatsApp with your brief link at the top, followed by the
            details. Tap send, and we&apos;ll take it from there.
          </p>

          <a
            href={uploaded.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
          >
            <MessageCircle className="size-4" strokeWidth={2.4} />
            Send on WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={reset}
          className="justify-self-start text-[13px] text-bone-dim underline decoration-white/20 underline-offset-4 transition-colors hover:text-bone hover:decoration-bone"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  // ============================================================
  // FORM STATE
  // ============================================================
  return (
    <form onSubmit={submit} className="grid gap-10">
      <section>
        <label className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
          Photos {shots.length > 0 && `(${shots.length} of 4)`}
        </label>

        {shots.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {shots.map((s) => (
              <div
                key={s.id}
                className="relative aspect-square overflow-hidden rounded-xl bg-ink-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.url}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeShot(s.id)}
                  aria-label="Remove photo"
                  className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-ink/80 text-bone backdrop-blur transition-colors hover:bg-ink"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            disabled={shots.length >= 4}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2.5 text-sm text-bone transition-colors hover:border-bone-dim hover:bg-white/5",
              shots.length >= 4 && "pointer-events-none opacity-40"
            )}
          >
            <Camera className="size-4" strokeWidth={2} />
            Take a photo
          </button>
          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            disabled={shots.length >= 4}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2.5 text-sm text-bone transition-colors hover:border-bone-dim hover:bg-white/5",
              shots.length >= 4 && "pointer-events-none opacity-40"
            )}
          >
            <ImagePlus className="size-4" strokeWidth={2} />
            Choose from gallery
          </button>
        </div>

        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => addFiles(e.target.files)}
          className="hidden"
        />
        <input
          ref={galleryRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => addFiles(e.target.files)}
          className="hidden"
        />

        <p className="mt-3 text-[12px] leading-relaxed text-bone-dim">
          Up to 4 photos. They&apos;ll be compressed on your phone before
          uploading, so don&apos;t worry about data.
        </p>
      </section>

      <section className="grid gap-5">
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
            What do you need? *
          </span>
          <select
            value={piece}
            onChange={(e) => setPiece(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-ink-line bg-ink-soft px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-bone-dim"
          >
            <option value="">Select a piece…</option>
            {PIECES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
            Approximate size (mm) — optional
          </span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["w", "h", "d"] as const).map((k) => (
              <input
                key={k}
                type="number"
                inputMode="numeric"
                placeholder={
                  k === "w" ? "Width" : k === "h" ? "Height" : "Depth"
                }
                value={dims[k]}
                onChange={(e) =>
                  setDims((d) => ({ ...d, [k]: e.target.value }))
                }
                className="w-full rounded-xl border border-ink-line bg-ink-soft px-3 py-3 text-sm text-bone outline-none transition-colors placeholder:text-bone-dim/60 focus:border-bone-dim"
              />
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
            Notes — optional
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Colour, material, finish, or anything specific…"
            className="mt-2 w-full resize-none rounded-xl border border-ink-line bg-ink-soft px-4 py-3 text-sm text-bone outline-none transition-colors placeholder:text-bone-dim/60 focus:border-bone-dim"
          />
        </label>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
            Your name *
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full rounded-xl border border-ink-line bg-ink-soft px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-bone-dim"
          />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">
            Area / suburb *
          </span>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            placeholder="e.g. Waterkloof, Centurion"
            className="mt-2 w-full rounded-xl border border-ink-line bg-ink-soft px-4 py-3 text-sm text-bone outline-none transition-colors placeholder:text-bone-dim/60 focus:border-bone-dim"
          />
        </label>
      </section>

      {err && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {err}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95",
            busy && "pointer-events-none opacity-60"
          )}
        >
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Uploading…
            </>
          ) : (
            <>Upload photos</>
          )}
        </button>
        <p className="text-[12px] text-bone-dim">
          You&apos;ll see your brief before anything is sent to WhatsApp.
        </p>
      </div>
    </form>
  );
}