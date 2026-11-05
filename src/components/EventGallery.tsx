"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { embedUrl, imageUrl, type Media } from "@/lib/events";

type Props = {
  items?: Media[] | null; // images and uploaded videos from WordPress
  videoUrls?: unknown; // YouTube / Vimeo links (array, string, or array of objects)
  title: string;
};

/**
 * WordPress/ACF can return video links in many shapes:
 *  - ["https://youtu.be/..."]
 *  - "https://youtu.be/...\nhttps://vimeo.com/..."
 *  - [{ url: "..." }] / [{ video_url: "..." }] / [{ link: "..." }]
 *  - false / null / "" when empty
 * Normalise everything into a clean string[].
 */
function normalizeVideoUrls(input: unknown): string[] {
  const out: string[] = [];

  const push = (value: unknown) => {
    if (typeof value === "string") {
      value
        .split(/[\s,]+/)
        .map((s) => s.trim())
        .filter((s) => /^https?:\/\//i.test(s))
        .forEach((s) => out.push(s));
    } else if (Array.isArray(value)) {
      value.forEach(push);
    } else if (value && typeof value === "object") {
      const o = value as Record<string, unknown>;
      push(o.url ?? o.video_url ?? o.link ?? o.href ?? o.src);
    }
  };

  push(input);
  return Array.from(new Set(out));
}

/** Fallback embed builder in case embedUrl() from lib doesn't recognise a format. */
function fallbackEmbed(raw: string): string | null {
  try {
    const u = new URL(raw.trim());
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      const parts = u.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live", "v"].includes(parts[0]) && parts[1]) {
        return `https://www.youtube.com/embed/${parts[1]}`;
      }
    }

    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).find((p) => /^\d+$/.test(p));
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

function getEmbed(url: string): string | null {
  let fromLib: string | null | undefined = null;
  try {
    fromLib = embedUrl(url);
  } catch {
    fromLib = null;
  }
  return fromLib || fallbackEmbed(url);
}

export default function EventGallery({ items, videoUrls, title }: Props) {
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const videos = useMemo(() => normalizeVideoUrls(videoUrls), [videoUrls]);

  const images = useMemo(() => safeItems.filter((m) => m.type === "image"), [safeItems]);
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const active = open !== null ? images[open] : null;

  if (safeItems.length === 0 && videos.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {safeItems.map((m) => {
          if (m.type === "image") {
            const idx = images.findIndex((x) => x.id === m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setOpen(idx)}
                aria-label={`View image: ${m.alt || m.title || title}`}
                className="group aspect-[4/3] overflow-hidden bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--red)]"
              >
                <img
                  src={imageUrl(m, "medium") ?? m.url}
                  alt={m.alt || m.title || title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            );
          }
          if (m.type === "video") {
            return (
              <div key={m.id} className="aspect-[4/3] overflow-hidden bg-black">
                <video
                  src={m.url}
                  controls
                  preload="metadata"
                  className="h-full w-full object-contain"
                >
                  <track kind="captions" />
                </video>
              </div>
            );
          }
          return null;
        })}

        {videos.map((url) => {
          const embed = getEmbed(url);
          return embed ? (
            <div key={url} className="aspect-[4/3] overflow-hidden bg-black">
              <iframe
                src={embed}
                title={`${title} video`}
                loading="lazy"
                allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          ) : (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex aspect-[4/3] items-center justify-center bg-neutral-100 p-4 text-center text-sm font-semibold text-[var(--red)] underline"
            >
              Watch video
            </a>
          );
        })}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
          >
            &times;
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="rotate-180">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <img
            src={imageUrl(active, "full") ?? active.url}
            alt={active.alt || active.title || title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-full object-contain"
          />
        </div>
      )}
    </>
  );
}
