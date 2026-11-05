import Image from "next/image";
import Link from "next/link";

const concerts = [
  {
    title: "Honorable P.M. N. modi",
    // subtitle: "A Musical Celebration",
    image: "/past-concert/modi_ji.jpeg",
    href: "/concert/welcome-pm-narendra-modi",
  },
  {
    title: "A.R. Rahman in Symphony",
    // subtitle: "The Music of a Maestro",
    image: "/past-concert/ar-rehman-in-symphony.jpeg",
    href: "/concert/a-r-rahman-in-symphony",
  },
  {
    title: "Chorus Mandala",
    // subtitle: "A Celebration of Voices",
    image: "/past-concert/chorus-mandala.jpg",
    href: "/concert/chorus-mandala",
  },
  {
    title: "Symphony of Lights",
    // subtitle: "An Orchestral Experience",
    image: "/past-concert/symphony-of-lights.jpg",
    href: "/concert/symphony-of-lights",
  },
  {
    title: "Sydney to Mumbai",
    // subtitle: "Two Cultures, One Symphony",
    image: "/sydney-to-mumbai/3.webp",
    href: "/concert/sydney-to-mumbai",
  },
  {
    title: "String Sensations",
    // subtitle: "Two Cultures, One Symphony",
    image: "/past-concert/string-sensation.jpg",
    href: "/concert/strings-sensations",
  },
];

export default function PastConcerts() {
  return (
    <section className="mx-auto max-w-8xl px-6 bg-white py-0 lg:py-8 sm:px-8 mb-12 2xl:mb-16 lg:px-12">
      <div className="">
        {/* Section Heading */}
        <div className="mb-6 text-left md:mb-8">
          <h2 className="relative inline-block text-2xl font-bold uppercase leading-tight tracking-tight text-black sm:text-3xl md:text-5xl 2xl:text-6xl ">
            Past <span className="text-[var(--red)]">Concerts</span>
          </h2>
        </div>

        {/* Concert Grid: 2 cols on mobile (first card full width), 3 cols on desktop */}
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {concerts.map((concert, index) => {
            const isFirst = index === 0;
            const isLast = index === concerts.length - 1;

            return (
              <Link
                key={concert.title}
                href={concert.href}
                aria-label={`Watch ${concert.title} concert`}
                className={`group relative block overflow-hidden rounded-xl bg-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)] focus-visible:ring-offset-4 aspect-[4/5]  md:aspect-[16/9] ${
                  isFirst
                    ? "col-span-2  lg:row-span-2 lg:aspect-auto"
                    : "col-span-1 "
                }
                ${
                  isLast
                    && "col-span-2  md:col-span-1"
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
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/40" />

                {/* Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Bottom Info: always visible on mobile/tablet (no hover), hover-reveal on desktop */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 transition-all duration-300 sm:p-5 translate-y-2 p-6  group-hover:translate-y-0  group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <div className="min-w-0">
                    <h3
                      className={`truncate font-medium text-white text-base md:text-xl 2xl:text-4xl uppercase text-wrap`}
                    >
                      {concert.title}
                    </h3>               
                  </div>

                  <span className="hidden h-8 w-8 2xl:h-12 2xl:w-12 2xl:font-[900]  shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black sm:flex">
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
