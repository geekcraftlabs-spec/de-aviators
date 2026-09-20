"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Lightbox({
  images,
  title,
  startIndex = 0,
  onClose,
}: {
  images: string[];
  title: string;
  startIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const hasMultiple = images.length > 1;

  function go(i: number) {
    setIndex(((i % images.length) + images.length) % images.length);
  }
  function next() {
    go(index + 1);
  }
  function prev() {
    go(index - 1);
  }

  // Keyboard controls
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasMultiple) next();
      if (e.key === "ArrowLeft" && hasMultiple) prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, hasMultiple, onClose]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, image ${index + 1} of ${images.length}`}
    >
      {/* ---- Close ---- */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute right-3 top-3 z-30 grid size-11 place-items-center rounded-full bg-white/10 text-bone backdrop-blur transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X className="size-5" />
      </button>

      {/* ---- Prev / Next ---- */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-30 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-bone backdrop-blur transition-colors hover:bg-white/20 sm:left-6 sm:size-14"
          >
            <ChevronLeft className="size-6 sm:size-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-30 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-bone backdrop-blur transition-colors hover:bg-white/20 sm:right-6 sm:size-14"
          >
            <ChevronRight className="size-6 sm:size-7" />
          </button>
        </>
      )}

      {/* ---- Image ---- */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 pb-32 sm:p-20 sm:pb-36"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full">
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${title} — image ${index + 1} of ${images.length}`}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* ---- Caption + thumbnails ---- */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 px-4 pb-6 pt-16"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent 100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-auto flex flex-col items-center gap-1 text-center">
          <p className="text-[15px] font-medium text-bone">{title}</p>
          {hasMultiple && (
            <p className="font-mono text-[12px] text-bone-dim">
              {index + 1} / {images.length}
            </p>
          )}
        </div>

        {hasMultiple && (
          <div className="pointer-events-auto flex max-w-full gap-2 overflow-x-auto px-2 pb-1">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative size-12 shrink-0 overflow-hidden rounded-md ring-2 transition-all sm:size-14",
                  i === index
                    ? "ring-bone opacity-100"
                    : "ring-transparent opacity-50 hover:opacity-90"
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}