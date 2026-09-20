"use client";

import { useState } from "react";
import Image from "next/image";
import { Images as ImagesIcon } from "lucide-react";
import { Lightbox } from "@/components/Lightbox";
import {
  CATEGORY_ORDER,
  type Project,
  type ProjectCategory,
} from "@/lib/projects";
import { cn } from "@/lib/cn";

type Filter = ProjectCategory | "All";

export function Gallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  // Direct filtering — no memoisation, no memo pitfalls
  const shown =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Counts per filter tab
  const counts: Record<string, number> = { All: projects.length };
  for (const cat of CATEGORY_ORDER) {
    counts[cat] = projects.filter((p) => p.category === cat).length;
  }

  const filters: Filter[] = ["All", ...CATEGORY_ORDER];

  return (
    <>
      {/* ---------- Filter tabs ---------- */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors",
                active
                  ? "border-bone bg-bone text-ink"
                  : "border-ink-line text-bone-dim hover:border-bone-dim hover:text-bone"
              )}
            >
              <span>{f}</span>
              <span
                className={cn(
                  "font-mono text-[10px]",
                  active ? "text-ink/60" : "text-bone-dim/60"
                )}
              >
                {counts[f] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- Grid ---------- */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => setOpenProject(project)}
            className="group relative block overflow-hidden rounded-2xl bg-ink-soft text-left ring-1 ring-white/5 transition-colors hover:ring-white/15"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

              {project.images.length > 1 && (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium text-bone backdrop-blur">
                  <ImagesIcon className="size-3.5" strokeWidth={2.2} />
                  {project.images.length}
                </span>
              )}
            </div>

            <div className="flex items-start justify-between gap-3 p-5">
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-medium text-bone">
                  {project.title}
                </h3>
                <p className="mt-1 text-[13px] text-bone-dim">
                  {project.suburb ?? project.category}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-widest text-bone-dim">
                {project.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ---------- Empty state (safety) ---------- */}
      {shown.length === 0 && (
        <p className="mt-10 text-center text-sm text-bone-dim">
          No projects in this category yet.
        </p>
      )}

      {/* ---------- Lightbox ---------- */}
      {openProject && (
        <Lightbox
          images={openProject.images}
          title={openProject.title}
          onClose={() => setOpenProject(null)}
        />
      )}
    </>
  );
}