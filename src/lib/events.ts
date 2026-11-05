// Data layer for the AIO Concerts WordPress plugin REST API.
// Set WP_URL in .env.local, e.g. WP_URL=https://your-wordpress-site.com

export type Media = {
  id: number;
  type: "image" | "video" | "file";
  mime: string;
  url: string;
  title: string;
  alt?: string;
  width?: number | null;
  height?: number | null;
  sizes?: { medium: string | false; large: string | false };
  size?: number | null; // bytes (videos / files)
};

export type PriceCategory = "regular" | "adult" | "children" | "premium" | "luxury";

export type Price = {
  category: PriceCategory;
  label: string;
  amount: number | null;
  note: string;
};

export type Offer = {
  title: string;
  description: string;
  code: string;
  valid_until: string | null;
};

export type Artist = {
  name: string;
  role: string;
  photo: Media | null;
  url: string;
};

export type EventSummary = {
  id: number;
  slug: string;
  title: string;
  link: string;
  excerpt: string;
  cover_image: Media | null;
  date: { start: string | null; end: string | null; label: string };
  time: { start: string | null; end: string | null; label: string };
  venue: { name: string; address: string; map_url: string };
  ticket_url: string;
  currency: string;
  prices: Price[];
  price_from: number | null;
};

export type EventDetail = EventSummary & {
  description: string; // HTML
  gallery: Media[];
  video_urls: string[];
  resources: Media[];
  additional_info: string; // HTML
  offers: Offer[];
  artists: Artist[];
};

const REVALIDATE_SECONDS = 300;

async function wp<T>(path: string): Promise<T | null> {
  const base = (process.env.NEXT_PUBLIC_WORDPRESS_API_URL ?? "").replace(/\/$/, "");
  if (!base) {
    return null;
  }
  try {
    const res = await fetch(`${base}/wp-json/aio/v1${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.error("[events] fetch failed:", err);
    return null;
  }
}

/** Upcoming concerts, soonest first. */
export async function getUpcomingEvents(limit = 12): Promise<EventSummary[]> {
  return (await wp<EventSummary[]>(`/concerts?per_page=${limit}`)) ?? [];
}

/** One concert with every field, or null if it does not exist. */
export async function getEvent(slug: string): Promise<EventDetail | null> {
  return wp<EventDetail>(`/concerts/${encodeURIComponent(slug)}`);
}

/** Slugs of all published concerts (past and upcoming), for static generation. */
export async function getEventSlugs(): Promise<string[]> {
  const list = await wp<EventSummary[]>(`/concerts?upcoming=0&per_page=50`);
  return (list ?? []).map((e) => e.slug);
}

/* ---------- Pure helpers (safe to use in client components) ---------- */

export function imageUrl(
  media: Media | null | undefined,
  size: "medium" | "large" | "full" = "large"
): string | null {
  if (!media) return null;
  if (size !== "full") {
    const s = media.sizes?.[size];
    if (s) return s;
  }
  return media.url || null;
}

export function formatPrice(amount: number | null, currency: string): string {
  if (amount === null) return "";
  if (amount === 0) return "Free";
  try {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

export function formatBytes(bytes: number | null | undefined): string {
  if (!bytes) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n >= 10 || i === 0 ? Math.round(n) : n.toFixed(1)} ${units[i]}`;
}

/** True once the concert's last day has passed (Sydney time). */
export function isPast(event: Pick<EventSummary, "date">): boolean {
  const last = event.date.end ?? event.date.start;
  if (!last) return false;
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });
  return last < today;
}

/** Turns a YouTube / Vimeo link into an embeddable URL, or null for anything else. */
export function embedUrl(raw: string): string | null {
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./, "");
    let id: string | null = null;

    if (host === "youtu.be") {
      id = u.pathname.slice(1);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (u.pathname.startsWith("/embed/") || u.pathname.startsWith("/shorts/")) {
        id = u.pathname.split("/")[2] ?? null;
      }
    }
    if (id && /^[\w-]{6,}$/.test(id)) {
      return `https://www.youtube-nocookie.com/embed/${id}`;
    }

    if (host === "vimeo.com") {
      const vid = u.pathname.split("/").filter(Boolean)[0];
      if (vid && /^\d+$/.test(vid)) return `https://player.vimeo.com/video/${vid}`;
    }
  } catch {
    // not a valid URL
  }
  return null;
}
