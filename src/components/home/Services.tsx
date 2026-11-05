import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  GraduationCap,
  Home,
  Mail,
  Mic,
  Radio,
  type LucideIcon,
} from "lucide-react";

type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: LucideIcon;
};

/**
 * Put your images in /public/images/services/ using these file names
 * (or change the paths below).
 */
export const services: Service[] = [
  {
    slug: "film-scoring",
    title: "Film Scoring",
    description:
      "Original compositions and orchestrations written to serve your story.",
    image: "/services/film-scoring.jpeg", // hand writing on paper
    alt: "A hand writing a musical score on paper",
    icon: Clapperboard,
  },
  {
    slug: "live-recording",
    title: "Live Recording",
    description:
      "Full orchestral recording sessions with the energy of live musicians.",
    image: "/services/live-recording.jpeg", // generic film orchestra session
    alt: "A film orchestra recording session",
    icon: Mic,
  },
  {
    slug: "live-show-production",
    title: "Live Show Production",
    description:
      "End-to-end production for large-scale concerts and stage shows.",
    image: "/services/live-show-production.jpeg", // our AR Rahman concert
    alt: "Our orchestra performing at the A.R. Rahman concert",
    icon: Radio,
  },
  {
    slug: "private-concerts",
    title: "Private Concerts",
    description:
      "Intimate mehfil evenings for celebrations and gatherings at home.",
    image: "/services/private-concerts.jpeg", // home mehfil
    alt: "A mehfil music evening in a home",
    icon: Home,
  },
  {
    slug: "private-lessons",
    title: "Private Lessons",
    description: "One-on-one tuition for students of every age and level.",
    image: "/services/learning.png", // child playing violin
    alt: "A child playing the violin",
    icon: GraduationCap,
  },
];

type ServicesProps = {
  /** true on the home page: clicking a picture goes to /services */
  linkImagesToServicesPage?: boolean;
  /** true on the /services page: renders the heading as an h1 */
  isPage?: boolean;
};

export function ServicesGrid({
  linkImagesToServicesPage = false,
  isPage = false,
}: ServicesProps) {
  const Heading = isPage ? "h1" : "h2";

  return (
    <section
      aria-labelledby="services-heading"
      className="mx-auto w-full max-w-8xl px-4 sm:px-0 mb-8 2xl:mb-16 lg:px-12"
    >

      {/*
        Mobile (< sm): horizontal swipe slider with snap.
          - under 420px: 1 card + a peek of the next one
          - 420px to 639px: 2 cards at a time
        sm and up: normal grid (4 columns, 5 on md+).
      */}
      <ul
        className="
          -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-3
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-2 sm:overflow-visible sm:px-0 sm:pb-0
          md:grid-cols-5 md:gap-5
        "
      >
        {services.map(({ slug, title, description, image, alt, icon: Icon }) => {
          const picture = (
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, (min-width: 640px) 25vw, (min-width: 420px) 50vw, 75vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          );

          return (
            <li
              key={slug}
              className="
                flex w-[75%] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-neutral-200 bg-white text-left shadow-sm transition-shadow hover:shadow-md
                min-[420px]:w-[calc(50%-6px)]
                sm:w-auto sm:shrink
              "
            >
              {linkImagesToServicesPage ? (
                <Link
                  href={`/services/${slug}`}
                  aria-label={`${title}: view details`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
                >
                  {picture}
                </Link>
              ) : (
                <div className="group">{picture}</div>
              )}

              <div className="flex flex-1 flex-col p-2 md:p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 border border-[var(--red)] text-[var(--red)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm md:text-base 2xl:text-2xl  font-semibold leading-snug text-black">
                    {title}
                  </h3>
                </div>

                <Link
                  href={`/services/${slug}`}
                  className="mt-3 inline-flex w-full items-center justify-start gap-2 rounded-sm text-xs font-semibold text-[var(--red)] transition-colors 2xl:text-xl "
                >
                  Learn More
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Home page version: all services in one row, pictures link to /services */
export default function Services() {
  return <ServicesGrid linkImagesToServicesPage />;
}
