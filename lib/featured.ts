import { projects } from "@/lib/projects";

export { featuredSlugs } from "@/lib/projects";

export const featured = projects
  .filter((p) => ["tv1", "kich1", "full1"].includes(p.slug))
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    suburb: p.suburb ?? "Gauteng",
    category: p.category,
    image: p.images[0],
  }));