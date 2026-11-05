"use client";
import { useCallback, useEffect, useState } from "react";
import { embedUrl, imageUrl, type Media } from "@/lib/events";

type Props = {
  items: Media[]; // images and uploaded videos from WordPress
  videoUrls: string[]; // YouTube / Vimeo links
  title: string;
};

export default function EventGallery({ items, videoUrls, title }: Props) {
  const images = items.filter((m) => m.type === "image");
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

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((m) => {
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

        {videoUrls.map((url) => {
          const embed = embedUrl(url);
          return embed ? (
            <div key={url} className="aspect-[4/3] overflow-hidden bg-black">
              <iframe
                src={embed}
                title={`${title} video`}
                loading="lazy"
                allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
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
