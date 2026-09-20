"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-[13px] text-bone-dim transition-colors hover:text-bone"
    >
      <ArrowLeft className="size-4" />
      Back
    </button>
  );
}