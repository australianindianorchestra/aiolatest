import Image from "next/image";
import Link from "next/link";

const concerts = [
  {
    title: "Modi",
    subtitle: "A Musical Celebration",
    image: "/modi_ji.jpeg",
    href: "/past-concerts/modi",
  },
  {
    title: "A.R. Rahman",
    subtitle: "The Music of a Maestro",
    image: "/ar-rehman/3.webp",
    href: "/concert/a-r-rahman-in-symphony",
  },
  {
    title: "Chorus Mandala",
    subtitle: "A Celebration of Voices",
    image: "/chorus-mandala/4.webp",
    href: "/concert/chorus-mandala",
  },
  {
    title: "Symphony of Lights",
    subtitle: "An Orchestral Experience",
    image: "/symphony-of-lights/10.webp",
    href: "/concert/symphony-of-lights",
  },
  {
    title: "Sydney to Mumbai",
    subtitle: "Two Cultures, One Symphony",
    image: "/sydney-to-mumbai/3.webp",
    href: "/concert/sydney-to-mumbai",
  },
  {
    title: "String Sensations",
    subtitle: "Two Cultures, One Symphony",
    image: "/string-sensation/6.webp",
    href: "/concert/strings-sensations",
  },
];

export default function PastConcerts() {
  return (
    <section className="mx-auto max-w-7xl px-6 bg-white py-0 lg:py-8 sm:px-8 mb-12">
      <div className="">
        {/* Section Heading */}
        <div className="mb-6 text-left md:mb-8">
          <h2 className="relative inline-block text-xl font-bold uppercase leading-tight tracking-tight text-black sm:text-2xl md:text-4xl">
            Past <span className="text-[var(--red)]">Concerts</span>
          </h2>
        </div>

        {/* Concert Grid: 2 cols on mobile (first card full width), 3 cols on desktop */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {concerts.map((concert, index) => {
            const isFirst = index === 0;

            return (
              <Link
                key={concert.title}
                href={concert.href}
                aria-label={`Watch ${concert.title} concert`}
                className={`group relative block overflow-hidden rounded-xl bg-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)] focus-visible:ring-offset-4 aspect-[16/9] md:aspect-[4/5] ${
                  isFirst
                    ? "col-span-2  lg:row-span-2 lg:aspect-auto"
                    : "col-span-1 "
                }`}
              >
                {/* Concert Image */}
                <Image
                  src={concert.image}
                  alt={`${concert.title} concert`}
                  fill
                  sizes={
                    isFirst
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/40" />

                {/* Center Watch Now Button - Always Visible */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-sm bg-red-700 font-semibold text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-[var(--red)] sm:gap-2 px-4 py-2 text-[9px] md:text-sm sm:px-6 sm:py-3`}
                  >
                    <svg
                      className="h-3.5 w-3.5 sm:h-[17px] sm:w-[17px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M8 5.5L19 12L8 18.5V5.5Z" fill="currentColor" />
                    </svg>
                    Watch Now
                  </span>
                </div>

                {/* Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Bottom Info: always visible on mobile/tablet (no hover), hover-reveal on desktop */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 transition-all duration-300 sm:p-5 translate-y-2 p-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <div className="min-w-0">
                    <h3
                      className={`truncate font-medium text-white text-sm `}
                    >
                      {concert.title}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-white/80 sm:mt-1">
                      {concert.subtitle}
                    </p>
                  </div>

                  <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black sm:flex">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
