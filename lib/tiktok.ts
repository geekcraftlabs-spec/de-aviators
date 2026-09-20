export type TikTokMeta = {
  title: string;
  author: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
};

const HANDLE = "bonnexytgmail.com1";

/**
 * Fetch TikTok oEmbed metadata.
 *
 * For photo carousels, TikTok's oEmbed often returns an EMPTY thumbnail —
 * so we try the /video/ URL as a fallback. If both fail, we return null
 * and the UI shows a designed placeholder instead of a broken image.
 */
export async function fetchTikTokMeta(
  id: string,
  isPhoto = false
): Promise<TikTokMeta | null> {
  const candidates = isPhoto
    ? [
        `https://www.tiktok.com/@${HANDLE}/photo/${id}`,
        `https://www.tiktok.com/@${HANDLE}/video/${id}`,
      ]
    : [`https://www.tiktok.com/@${HANDLE}/video/${id}`];

  for (const url of candidates) {
    try {
      const res = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) continue;

      const data = await res.json();
      const thumb = data.thumbnail_url;
      if (typeof thumb === "string" && thumb.length > 0) {
        return {
          title: data.title ?? "",
          author: data.author_name ?? "",
          thumbnail: thumb,
          thumbnailWidth: data.thumbnail_width ?? 720,
          thumbnailHeight: data.thumbnail_height ?? 1280,
        };
      }
    } catch {
      // try next candidate
    }
  }

  return null;
}