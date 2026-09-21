export type ProjectCategory =
  | "TV Backdrops"
  | "Kitchens"
  | "Full-house"
  | "Salon";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Optional — add later, e.g. "Waterkloof", "Centurion", "Sandton" */
  suburb?: string;
  /** First image is the cover. Rest are additional shots. */
  images: string[];
};

export const CATEGORY_ORDER: ProjectCategory[] = [
  "TV Backdrops",
  "Kitchens",
  "Full-house",
  "Salon",
];

export const CATEGORY_BLURBS: Record<ProjectCategory, string> = {
  "TV Backdrops":
    "Feature walls, fluted panelling, integrated LED. The centrepiece of a lounge.",
  Kitchens:
    "Cabinetry, countertops, tiling, lighting. Designed to the room.",
  "Full-house":
    "Whole-home renovations, from structure to finish.",
  Salon:
    "Commercial fit-out — clean lines, durable finishes.",
};

/**
 * To edit a title: change the `title` string below.
 * To add a suburb: set `suburb: "Waterkloof"`.
 * To add more shots: append paths to the `images` array.
 */
export const projects: Project[] = [
  // ============================================================
  // KITCHENS
  // ============================================================
  {
    slug: "kich1",
    title: "Kitchen remodel 01",
    category: "Kitchens",
    images: [
      "/work/kich1.jpeg",
      "/work/kich1.1.jpeg",
      "/work/kich1.2.jpeg",
      "/work/kich1.3.jpeg",
      "/work/kich1.4.jpeg",
      "/work/kich1.5.jpeg",
      "/work/kich1.6.jpeg",
      "/work/kich1.7.jpeg",
    ],
  },
  {
    slug: "kich2",
    title: "Kitchen remodel 02",
    category: "Kitchens",
    images: [
      "/work/kich2.jpeg",
      "/work/kich2.1.jpeg",
      "/work/kich2.2.jpeg",
      "/work/kich2.3.jpeg",
      "/work/kich2.4.jpeg",
    ],
  },
  {
    slug: "kich3",
    title: "Kitchen remodel 03",
    category: "Kitchens",
    images: [
      "/work/kich3.jpeg",
      "/work/kich3.1.jpeg",
      "/work/kich3.2.jpeg",
    ],
  },
  {
    slug: "kich4",
    title: "Kitchen remodel 04",
    category: "Kitchens",
    images: [
      "/work/kich4.jpeg",
      "/work/kich4.1.jpeg",
      "/work/kich4.2.jpeg",
      "/work/kich4.3.jpeg",
      "/work/kich4.4.jpeg",
      "/work/kich4.5.jpeg",
    ],
  },
  { slug: "kich5",  title: "Kitchen remodel 05",  category: "Kitchens", images: ["/work/kich5.jpeg"] },
  { slug: "kich6",  title: "Kitchen remodel 06",  category: "Kitchens", images: ["/work/kich6.jpeg"] },
  {
    slug: "kich7",
    title: "Kitchen remodel 07",
    category: "Kitchens",
    images: ["/work/kich7.jpeg", "/work/kich7.1.jpeg"],
  },
  { slug: "kich8",  title: "Kitchen remodel 08",  category: "Kitchens", images: ["/work/kich8.jpeg"] },
  { slug: "kich9",  title: "Kitchen remodel 09",  category: "Kitchens", images: ["/work/kich9.jpeg"] },
  { slug: "kich10", title: "Kitchen remodel 10",  category: "Kitchens", images: ["/work/kich10.jpeg"] },
  { slug: "kich11", title: "Kitchen remodel 11",  category: "Kitchens", images: ["/work/kich11.jpeg"] },
  { slug: "kich12", title: "Kitchen remodel 12",  category: "Kitchens", images: ["/work/kich12.jpeg"] },
  { slug: "kich13", title: "Kitchen remodel 13",  category: "Kitchens", images: ["/work/kich13.jpeg"] },

  // ============================================================
  // TV BACKDROPS
  // ============================================================
  {
    slug: "tv1",
    title: "TV backdrop 01",
    category: "TV Backdrops",
    images: [
      "/work/tv1.jpeg",
      "/work/tv1.1.jpeg",
      "/work/tv1.2.jpeg",
      "/work/tv1.3.jpeg",
      "/work/tv1.4.jpeg",
      "/work/tv1.5.jpeg",
      "/work/tv1.6.jpeg",
      "/work/tv1.7.jpeg",
      "/work/tv1.8.jpeg",
      "/work/tv1.9.jpeg",
    ],
  },
  {
    slug: "tv2",
    title: "TV backdrop 02",
    category: "TV Backdrops",
    images: ["/work/tv2.jpeg", "/work/tv2.1.jpeg"],
  },
  { slug: "tv3",  title: "TV backdrop 03",  category: "TV Backdrops", images: ["/work/tv3.jpeg"] },
  { slug: "tv4",  title: "TV backdrop 04",  category: "TV Backdrops", images: ["/work/tv4.jpeg"] },
  { slug: "tv5",  title: "TV backdrop 05",  category: "TV Backdrops", images: ["/work/tv5.jpeg"] },
  { slug: "tv6",  title: "TV backdrop 06",  category: "TV Backdrops", images: ["/work/tv6.jpeg"] },
  { slug: "tv7",  title: "TV backdrop 07",  category: "TV Backdrops", images: ["/work/tv7.jpeg"] },
  { slug: "tv8",  title: "TV backdrop 08",  category: "TV Backdrops", images: ["/work/tv8.jpeg"] },
  { slug: "tv9",  title: "TV backdrop 09",  category: "TV Backdrops", images: ["/work/tv9.jpeg"] },
  {
    slug: "tv10",
    title: "TV backdrop 10",
    category: "TV Backdrops",
    images: ["/work/tv10.jpeg", "/work/tv10.1.jpeg"],
  },
  { slug: "tv11", title: "TV backdrop 11",  category: "TV Backdrops", images: ["/work/tv11.jpeg"] },
  { slug: "tv12", title: "TV backdrop 12",  category: "TV Backdrops", images: ["/work/tv12.jpeg"] },
  { slug: "tv13", title: "TV backdrop 13",  category: "TV Backdrops", images: ["/work/tv13.jpeg"] },
  { slug: "tv14", title: "TV backdrop 14",  category: "TV Backdrops", images: ["/work/tv14.jpeg"] },
  { slug: "tv15", title: "TV backdrop 15",  category: "TV Backdrops", images: ["/work/tv15.jpeg"] },
  { slug: "tv16", title: "TV backdrop 16",  category: "TV Backdrops", images: ["/work/tv16.jpeg"] },
  { slug: "tv17", title: "TV backdrop 17",  category: "TV Backdrops", images: ["/work/tv17.jpeg"] },
  { slug: "tv18", title: "TV backdrop 18",  category: "TV Backdrops", images: ["/work/tv18.jpeg"] },
  { slug: "tv19", title: "TV backdrop 19",  category: "TV Backdrops", images: ["/work/tv19.jpeg"] },
  { slug: "tv20", title: "TV backdrop 20",  category: "TV Backdrops", images: ["/work/tv20.jpeg"] },

    // ============================================================
  // FULL-HOUSE
  // ============================================================
  {
    slug: "full1",
    title: "Full-house renovation 01",
    category: "Full-house",
    images: [
      "/work/full1.jpeg",
      "/work/full1.1.jpeg",
      "/work/full1.2.jpeg",
      "/work/full1.3.jpeg",
      "/work/full1.4.jpeg",
      "/work/full1.5.jpeg",
      "/work/full1.6.jpeg",
      "/work/full1.7.jpeg",
      "/work/full1.8.jpeg",
      "/work/full1.9.jpeg",
      "/work/full1.10.jpeg",
      "/work/full1.11.jpeg",
      "/work/full1.12.jpeg",
      "/work/full1.13.jpeg",
      "/work/full1.14.jpeg",
      "/work/full1.15.jpeg",
      "/work/full1.16.jpeg",
    ],
  },
  {
    slug: "full2",
    title: "Full-house renovation 02",
    category: "Full-house",
    images: [
      "/work/full2.jpeg",
      "/work/full2.1.jpeg",
      "/work/full2.2.jpeg",
      "/work/full2.3.jpeg",
      "/work/full2.4.jpeg",
      "/work/full2.5.jpeg",
      "/work/full2.6.jpeg",
      "/work/full2.7.jpeg",
      "/work/full2.8.jpeg",
      "/work/full2.9.jpeg",
      "/work/full2.10.jpeg",
      "/work/full2.11.jpeg",
      "/work/full2.12.jpeg",
    ],
  },

  // ============================================================
  // SALON
  // ============================================================
  {
    slug: "salon",
    title: "Salon fit-out",
    category: "Salon",
    images: ["/work/salon.jpeg"],
  },
];

/** Home page "Selected work" strip — pick 3 slugs from `projects` above */
export const featuredSlugs = ["tv1", "kich1", "full1"];