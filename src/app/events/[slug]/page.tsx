import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, FileDown, MapPin, Mic, Tag, Ticket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventGallery from "@/components/EventGallery";
import {
  formatBytes,
  formatPrice,
  getEvent,
  getEventSlugs,
  imageUrl,
  isPast,
  type EventDetail,
} from "@/lib/events";

export const revalidate = 300; // re-fetch from WordPress at most every 5 minutes
export const dynamicParams = true; // concerts added later are rendered on first visit

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Concert not found", robots: { index: false, follow: true } };

  const image = imageUrl(event.cover_image, "large");
  const description =
    event.excerpt || [event.date.label, event.venue.name].filter(Boolean).join(" · ");

  return {
    title: `${event.title} | Australian Indian Orchestra`,
    description,
    alternates: { canonical: `https://aio.org.au/events/${encodeURIComponent(slug)}` },
    openGraph: {
      title: event.title,
      description,
      url: `https://aio.org.au/events/${encodeURIComponent(slug)}`,
      type: "website",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Data helpers (unchanged)                                            */
/* ------------------------------------------------------------------ */

// Styling for HTML coming from the WordPress editor (light theme).
const PROSE =
  "text-[1.0625rem] leading-[1.85] text-neutral-700 " +
  "[&_a]:font-medium [&_a]:text-[var(--red)] [&_a]:underline [&_a]:underline-offset-4 " +
  "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--red)] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-neutral-600 " +
  "[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-neutral-950 " +
  "[&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-950 " +
  "[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl " +
  "[&_li]:mb-1.5 [&_li]:marker:text-[var(--red)] [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 " +
  "[&_p]:mb-5 [&_strong]:font-semibold [&_strong]:text-neutral-950 " +
  "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6";

function formatDay(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function buildJsonLd(event: EventDetail) {
  const when = (date: string | null, time: string | null) =>
    date ? (time ? `${date}T${time}` : date) : undefined;
  const cover = imageUrl(event.cover_image, "large");
  
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    url: `https://aio.org.au/events/${encodeURIComponent(event.slug)}`,
    name: event.title,
    description: event.excerpt || undefined,
    image: cover ? [cover] : undefined,
    startDate: when(event.date.start, event.time.start),
    endDate: event.date.end
      ? when(event.date.end, event.time.end)
      : when(event.date.start, event.time.end),
    location: event.venue.name
      ? {
          "@type": "Place",
          name: event.venue.name,
          address: event.venue.address || undefined,
        }
      : undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: isPast(event)
      ? "https://schema.org/EventCompleted"
      : "https://schema.org/EventScheduled",
    organizer: {
      "@type": "MusicGroup",
      name: "Australian Indian Orchestra",
      url: "https://aio.org.au",
    },
    performer: event.artists.length
      ? event.artists.map((a) => ({ "@type": "Person", name: a.name }))
      : undefined,
    offers: !isPast(event) && event.ticket_url
      ? event.prices
          .filter((p) => p.amount !== null)
          .map((p) => ({
            "@type": "Offer",
            name: p.label,
            price: p.amount,
            priceCurrency: event.currency,
            url: event.ticket_url,
          }))
      : undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const cover = imageUrl(event.cover_image, "full");
  const past = isPast(event);
  const galleryItems = event.gallery.filter((m) => m.type === "image" || m.type === "video");
  const hasGallery = galleryItems.length > 0 || event.video_urls.length > 0;

  const amounts = event.prices
    .map((p) => p.amount)
    .filter((a): a is number => a !== null && a !== undefined);
  const lowestPrice = amounts.length ? Math.min(...amounts) : null;
  const canBook = !past && !!event.ticket_url;

  const hasAside =
    !!event.venue.name || event.prices.length > 0 || event.offers.length > 0 || canBook;
  const hasAbout = !!event.description.trim();
  const hasInfo = !!event.additional_info.trim();
  const hasMain = hasAbout || hasInfo;

  return (
    <main className="bg-white antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(event)).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />

      {/* ============================ HERO ============================ */}
      <section className="relative isolate overflow-hidden bg-[var(--black)] pb:8 pt-0 sm:pb-16 sm:pt-4 text-white">
        <div className="mx-auto w-full max-w-8xl px-5 sm:px-6 border-t border-white/20 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-20 py-6 md:py-12 ">
            {/* ---- Left: image ---- */}
            <div className="relative mx-auto w-full sm:max-w-sm ">
              {cover ? (
                  <img
                    src={cover}
                    alt={event.cover_image?.alt || ""}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : ( <div/>
                )}
            </div>

            {/* ---- Right: title, details, book button ---- */}
            <div className="min-w-0">
              <div className="mb-2 md:mb-4 text-left">
                <h2 className="relative inline-block text-2xl font-bold uppercase leading-snug tracking-tight text-[var(--grey-light)] sm:text-3xl md:text-4xl">
                  {event.title}
                </h2>
              </div>

              {event.excerpt && (
                <p className="max-w-lg leading-snug text-white/80 sm:text-2xl md:text-3xl ">
                  {event.excerpt}
                </p>
              )}

              <dl className="mt-4 md:mt-8 grid gap-4 border-t border-white/10 pt-4 md:pt-8 sm:grid-cols-2">
                {/* Artists */}
                {event.artists.length > 0 && (
                  <div className="flex items-start gap-3.5 sm:col-span-2">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--red)]/15 text-[var(--red)]">
                      <Mic size={20} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-light uppercase tracking-[0.2em] text-white/50">
                        {event.artists.length > 1 ? "Artists" : "Artist"}
                      </dt>
                      <dd className="mt-1 font-light leading-snug text-sm md:text-base">
                        {event.artists.map((a) => a.name).join(", ")}
                      </dd>
                    </div>
                  </div>
                )}

                {/* Date */}
                {event.date.label && (
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--red)]/15 text-[var(--red)]">
                      <Calendar size={20} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-light uppercase tracking-[0.2em] text-white/50">
                        Date
                      </dt>
                      <dd className="mt-1 font-light leading-snug text-sm md:text-base">{event.date.label}</dd>
                    </div>
                  </div>
                )}

                {/* Time */}
                {event.time.label && (
                  <div className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--red)]/15 text-[var(--red)]">
                      <Clock size={20} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-light uppercase tracking-[0.2em] text-white/50">
                        Time
                      </dt>
                      <dd className="mt-1 font-light leading-snug text-sm md:text-base">{event.time.label}</dd>
                    </div>
                  </div>
                )}

                {/* Venue */}
                {event.venue.name && (
                  <div className="flex items-start gap-3.5 sm:col-span-2">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--red)]/15 text-[var(--red)]">
                      <MapPin size={20} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-light uppercase tracking-[0.2em] text-white/50">
                        Venue
                      </dt>
                      <dd className="mt-1 font-light leading-snug text-sm md:text-base">{event.venue.name}</dd>
                      {event.venue.address && (
                        <dd className="mt-0.5 text-sm md:text-base text-white/55">{event.venue.address}</dd>
                      )}
                    </div>
                  </div>
                )}

                {/* Ticket prices */}
                {event.prices.length > 0 && (
                  <div className="flex items-start gap-3.5 sm:col-span-2">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--red)]/15 text-[var(--red)]">
                      <Ticket size={20} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <dt className="text-xs font-light uppercase tracking-[0.2em] text-white/50 ">
                        {event.prices.length > 1 ? "Ticket prices" : "Ticket price"}
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {event.prices.map((p, i) => (
                          <span
                            key={`${p.category}-${i}`}
                            className="inline-flex items-baseline gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm"
                          >
                            <span className="text-white/70">{p.label}</span>
                            <span className="font-bold tabular-nums">
                              {formatPrice(p.amount, event.currency)}
                            </span>
                          </span>
                        ))}
                      </dd>
                    </div>
                  </div>
                )}
              </dl>

              {/* Book button */}
              <div className="mt-0 md:mt-9">
                {canBook ? (
                  <a
                    href={event.ticket_url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 group inline-flex w-full items-center justify-center gap-3 bg-[var(--red)] rounded-sm px-10 py-4 text-sm font-semibold uppercase text-white shadow-[0_10px_40px_var(--red-glow)] transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
                  >
                    Book tickets
                    <ArrowRight size={20} strokeWidth={1.75} className="transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <span className="inline-flex w-full items-center justify-center rounded-full bg-white/10 px-10 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:w-auto">
                    {past ? "This concert has ended" : "Tickets coming soon"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ ABOUT + SIDEBAR ============================ */}
      {(hasMain || hasAside) && (
        <section className="bg-white text-neutral-900 ">
          <div className="mx-auto max-w-8xl px-5 py-8 sm:px-6 sm:py-16 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Sidebar first in DOM so tickets show before long copy on mobile */}
              {hasAside && (
                <aside className="lg:order-2">
                  <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.2)] sm:p-8 lg:sticky lg:top-28">
                    {/* Venue */}
                    {event.venue.name && (
                      <div>
                        <h3 className="mb-3 text-xs md:text-base font-semibold uppercase tracking-[0.2em] text-neutral-500">
                          Venue
                        </h3>
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--red)]/10 text-[var(--red)]">
                            <MapPin size={20} strokeWidth={1.75} />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm md:text-lg font-bold leading-snug text-neutral-950">
                              {event.venue.name}
                            </p>
                            {event.venue.address && (
                              <p className="mt-0.5 text-sm md:text-base text-neutral-600">{event.venue.address}</p>
                            )}
                            {event.venue.map_url && (
                              <a
                                href={event.venue.map_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--red)] underline-offset-4 hover:underline"
                              >
                                View map <ArrowRight size={14} strokeWidth={1.75} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tickets */}
                    {event.prices.length > 0 && (
                      <div className={event.venue.name ? "border-t border-neutral-200 pt-4" : ""}>
                        <h3 className="mb-3 text-xs md:text-base font-semibold uppercase tracking-[0.2em] text-neutral-500">
                          Tickets
                        </h3>
                        <ul className="space-y-2.5">
                          {event.prices.map((p, i) => (
                            <li
                              key={`${p.category}-${i}`}
                              className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5"
                            >
                              <span className="min-w-0">
                                <span className="block font-semibold text-neutral-950 text-sm md:text-lg">
                                  {p.label}
                                </span>
                                {p.note && (
                                  <span className="block text-sm text-neutral-500">{p.note}</span>
                                )}
                              </span>
                              <span className="shrink-0 text-lg md:text-xl font-black tabular-nums text-neutral-950">
                                {formatPrice(p.amount, event.currency)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Book button */}
                    {canBook && (
                      <a
                        href={event.ticket_url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 rounded-sm bg-[var(--red)] px-6 py-2 md:py-4 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[var(--red)]/25 transition hover:-translate-y-0.5 hover:brightness-110"
                      >
                        Book tickets <ArrowRight size={20} strokeWidth={1.75} />
                      </a>
                    )}

                    {/* Past notice */}
                    {past && (
                      <p className="rounded-xl bg-neutral-100 px-4 py-3 text-center text-sm text-neutral-600">
                        This concert has ended. See{" "}
                        <Link
                          href="/upcoming-events"
                          className="font-semibold text-[var(--red)] underline"
                        >
                          upcoming concerts
                        </Link>
                        .
                      </p>
                    )}

                    {/* Offers */}
                    {event.offers.length > 0 && (
                      <div className="border-t border-neutral-200 pt-4">
                        <h3 className="mb-3 text-xs md:text-base font-semibold uppercase tracking-[0.2em] text-neutral-500">
                          Offers
                        </h3>
                        <ul className="space-y-3">
                          {event.offers.map((o, i) => (
                            <li
                              key={`${o.title}-${i}`}
                              className="rounded-2xl border border-[var(--red)]/25 bg-[var(--red)]/[0.05] p-4"
                            >
                              <p className="flex items-center gap-2 font-bold text-neutral-950">
                                <Tag size={18} strokeWidth={1.75} className="text-[var(--red)]" />
                                {o.title}
                              </p>
                              {o.description && (
                                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-neutral-700">
                                  {o.description}
                                </p>
                              )}
                              {o.code && (
                                <p className="mt-3 inline-block rounded-md border border-dashed border-[var(--red)] bg-white px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-[var(--red)]">
                                  {o.code}
                                </p>
                              )}
                              {o.valid_until && (
                                <p className="mt-2 text-xs text-neutral-500">
                                  Valid until {formatDay(o.valid_until)}
                                </p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </aside>
              )}

              {/* Main copy */}
              {hasMain && (
                <div className={`space-y-16 lg:order-1 ${hasAside ? "lg:col-span-1" : "lg:col-span-2"}`}>
                  {/* Additional info */}
                  {hasInfo && (
                    <section aria-labelledby="info-heading">
                      <div className="mb-6 text-left ">
                        <h2 className="relative inline-block text-xl font-bold uppercase leading-tight tracking-tight text-black sm:text-2xl md:text-3xl">
                          Additional <span className="text-[var(--red)]">Information</span>
                        </h2>
                         
                      </div>
                      <div
                        className={`${PROSE} rounded-lg border border-neutral-200 bg-neutral-50 p-6 sm:p-8 text-sm md:text-base [&_p:last-child]:mb-0`}
                        dangerouslySetInnerHTML={{ __html: event.additional_info }}
                      />
                    </section>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================ CONCERT GUIDE (downloads) ============================ */}
      {event.resources.length > 0 && (
        <section aria-labelledby="resources-heading" className="w-full flex justify-center px-4 sm:px-12">
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 md:gap-12 bg-neutral-50 max-w-5xl rounded-lg md:rounded-3xl border border-neutral-200  mb-8 md:mb-16 p-4 md:p-8 ">
              <div className="mb-6 text-left ">
                <h2 className="relative inline-block text-xl font-bold uppercase leading-tight tracking-tight text-black sm:text-2xl md:text-3xl mb-4">
                  Concert <span className="text-[var(--red)]">Guide</span>
                </h2>
                   <p className="text-sm text-neutral-600">
                    Explore our concert guide for upcoming live performances, artist details, event dates, venues, and ticket information to plan your next unforgettable musical experience.
                   </p>
              </div>
              <ul className="grid gap-3 grid-cols-1">
                {event.resources.map((r) => {
                  const ext = r.url.split("?")[0].split(".").pop()?.toUpperCase();
                  const size = formatBytes(r.size);
                  return (
                    <li key={r.id}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[var(--red)]/40 hover:shadow-lg"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--red)]/10 text-[var(--red)] transition group-hover:bg-[var(--red)] group-hover:text-white">
                          <FileDown size={20} strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-neutral-900">
                            {r.title || "Download"}
                          </span>
                          <span className="block text-sm text-neutral-500">
                            {[ext, size].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                        <ArrowRight
                          size={20}
                          strokeWidth={1.75}
                          className="text-neutral-400 transition group-hover:translate-x-1 group-hover:text-[var(--red)]"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
        </section>
      )}

      {/* ============================ ARTISTS ============================ */}
      {event.artists.length > 0 && (
        <section aria-labelledby="artists-heading" className="bg-neutral-50 ">
          <div className="mx-auto max-w-8xl px-5 sm:px-6 py-6 md:py-12 lg:px-12">
            <div className="mb-6 text-left ">
              <h2 className="relative inline-block text-xl font-bold uppercase leading-tight tracking-tight text-black sm:text-2xl md:text-3xl mb-4">
                Meet the <span className="text-[var(--red)]">artists</span>
              </h2> 
            </div>

            <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
              {event.artists.map((a, i) => {
                const photo = imageUrl(a.photo, "medium");
                const card = (
                  <>
                      {photo && (
                       <img
                        src={photo}
                        alt={a.photo?.alt || a.name}
                        loading="lazy"
                        className="aspect-[3/2] object-cover object-top rounded-sm transition duration-700 group-hover:scale-105"
                      />
                      ) }
                    <span className="mt-4 text-left block text-lg font-bold leading-snug text-neutral-900 transition group-hover:text-[var(--red)]">
                      {a.name}
                    </span>
                    {a.role && (
                      <span className="mt-0.5 text-left block text-sm text-neutral-500">{a.role}</span>
                    )}
                  </>
                );
                return (
                  <li key={`${a.name}-${i}`} className="text-center">
                    {a.url ? (
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        {card}
                      </a>
                    ) : (
                      <div className="group">{card}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ============================ GALLERY ============================ */}
      {hasGallery && (
        <section aria-labelledby="gallery-heading" className="bg-white">
          <div className="mx-auto max-w-8xl px-5 sm:px-6  py-12 lg:px-12">
            <div className="mb-6 text-left ">
              <h2 className="relative inline-block text-xl font-bold uppercase leading-tight tracking-tight text-black sm:text-2xl md:text-3xl mb-4">
                Concert <span className="text-[var(--red)]">Gallery</span>
              </h2>
              
            </div>
            <EventGallery items={galleryItems} videoUrls={event.video_urls} title={event.title} />
          </div>
        </section>
      )}

      {/* ============================ MOBILE STICKY BOOKING BAR ============================ */}
      {canBook && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-neutral-900">{event.title}</p>
              {lowestPrice !== null && (
                <p className="text-xs text-neutral-500">
                  From {formatPrice(lowestPrice, event.currency)}
                </p>
              )}
            </div>
            <a
              href={event.ticket_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-sm bg-[var(--red)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[var(--red)]/30"
            >
              Book now
            </a>
          </div>
        </div>
      )}

    <Footer />
    </main>
  );
}
