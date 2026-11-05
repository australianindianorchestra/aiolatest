"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { imageUrl, type EventSummary } from "@/lib/events";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function UpcomingEventsCarousel({ events }: { events: EventSummary[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons, events.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 24; // matches gap-6
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="upcoming-events"
      aria-labelledby="upcoming-events-heading"
      className="bg-white py-6 text-neutral-900 sm:py-6"
    >
      <div className="mx-auto max-w-8xl px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="mb-6 text-left md:mb-12">
            <h2
              id="upcoming-events-heading"
              className="relative inline-block text-2xl font-bold uppercase leading-snug tracking-tight text-black sm:text-3xl md:text-5xl 2xl:text-6xl "
            >
              Upcoming <span className="text-[var(--red)]">Concerts</span>
            </h2>
          </div>

          {events.length > 2 && (
            <div className="hidden shrink-0 gap-3 md:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                aria-label="Previous events"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--red)] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--red)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                aria-label="Next events"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--red)] text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--red)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          )}
        </div>

        {/* Cards */}
        {events.length === 0 ? (
          <p className="border-y border-neutral-300 py-10 text-center text-neutral-600">
            New concerts will be announced soon. Please check back shortly.
          </p>
        ) : (
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {events.map((event,  index) => {
              const cover = imageUrl(event.cover_image, "large");
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  data-card
                  className="group w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-neutral-200">
                    {cover && (
                      <img
                        src={cover}
                        alt={event.cover_image?.alt || event.title}
                        loading="lazy"
                        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          index === 1 ? "object-[0%_35%]" : "object-center"
                        }`}
                      />
                    )}
                  </div>
                  <div className="min-h-[2rem] mt-5 mb-5 md:min-h-[3.5rem] 2xl:min-h-[4.1rem]">
                    <h3 className=" text-base font-bold leading-snug transition-colors group-hover:text-[var(--red)] sm:text-lg 2xl:text-3xl">
                      {event.title}
                    </h3>
                    <h3 className="text-base font-bold leading-snug transition-colors group-hover:text-[var(--red)] sm:text-base 2xl:text-2xl">
                    {event.excerpt}
                  </h3>
                  </div>
                 
                  

                  <div className="flex gap-6 justify-between border-y border-neutral-300 py-2.5 text-sm 2xl:text-xl text-neutral-700">
                    <span className="shrink-0">{event.date.label || "TBC"}</span>
                    <span className="font-medium">{event.venue.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
