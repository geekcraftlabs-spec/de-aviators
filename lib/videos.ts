export type FilmCategory = "TV Backdrops" | "Renovations" | "On Site";

export type Film = {
  id: string;
  title: string;
  blurb: string;
  category: FilmCategory;
  isPhoto?: boolean;
};

const HANDLE = "bonnexytgmail.com1";

/** Build the public TikTok URL from a video or photo ID */
export function tiktokUrl(id: string, isPhoto = false): string {
  const kind = isPhoto ? "photo" : "video";
  return `https://www.tiktok.com/@${HANDLE}/${kind}/${id}`;
}

export const CATEGORY_ORDER: FilmCategory[] = [
  "TV Backdrops",
  "Renovations",
  "On Site",
];

export const CATEGORY_BLURBS: Record<FilmCategory, string> = {
  "TV Backdrops":
    "Feature walls, fluted panelling, LED detail — the centrepiece of a lounge, built to fit the room.",
  Renovations:
    "Full kitchens and whole-home transformations, start to finish.",
  "On Site":
    "The work as it happens — crews, groundwork, construction, and the mess before the magic.",
};

export const films: Film[] = [
  {
    id: "7580378482870390032",
    title: "TV backdrop installation",
    blurb: "Timber-slat feature wall going up on site.",
    category: "TV Backdrops",
  },
  {
    id: "7578992265960394000",
    title: "TV backdrop — second build",
    blurb: "Clean lines, integrated shelving, wall-to-wall finish.",
    category: "TV Backdrops",
  },
  {
    id: "7552449476569386258",
    title: "TV backdrop with LED lighting",
    blurb: "Hidden LED strips and a floating shelf detail.",
    category: "TV Backdrops",
  },
  {
    id: "7341368438457175302",
    title: "Entire home renovation",
    blurb: "Before and after — the full transformation.",
    category: "Renovations",
    isPhoto: true,
  },
  {
    id: "7350415407875935493",
    title: "Full kitchen remodel",
    blurb: "Cabinetry, countertops, and finish work.",
    category: "Renovations",
    isPhoto: true,
  },
  {
    id: "7583412574964780309",
    title: "Fire pit & pavement",
    blurb: "Outdoor construction — groundwork to finished pour.",
    category: "On Site",
  },
];