
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function VideoShowcase() {
  return (
    <section className="my-8 overflow-hidden bg-[#ffe5e5] py-12 md:py-16 lg:py-14 2xl:my-16">
      <div className="mx-auto grid max-w-8xl px-6 items-center gap-10 lg:grid-cols-2 lg:gap-14 lg:px-12">

        {/* Left Content */}
        <div className="order-2 lg:order-1 align-start grid gap-2 md:gap-4 lg:gap-8">
          <p className="text-xs md:text-sm 2xl:text-3xl font-semibold uppercase tracking-[0.2em] text-[var(--red)]">
            Experience the Music
          </p>

          <h2 className="max-w-xl 2xl:max-w-7xl text-3xl font-bold leading-tight text-[var(--black)] sm:text-4xl md:text-6xl 2xl:text-8xl ">
            Every Performance
            <span className="text-[var(--red)]">
              {" "}Tells a Story
            </span>
          </h2>

          <p className="text-sm leading-relaxed text-black sm:text-xl 2xl:text-4xl">
            Watch our performances, relive the highlights, and experience
            the magic of Indian music through the orchestra.
          </p>

          <Link
            href="/videos"
            className="group inline-flex items-center gap-3 text-sm font-semibold text-black transition-colors hover:text-[var(--red)] sm:text-lg 2xl:text-4xl "
          >
            Explore Our Videos

            <ArrowRight
              size={23}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Right Image */}
        <Link
          href="/videos"
          aria-label="Explore Australian Indian Orchestra videos"
          className="group relative order-1 block aspect-[4/3] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_100%,6%_100%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)] focus-visible:ring-offset-4 lg:order-2 lg:aspect-[1.3/1]"
        >
          <Image
            src="/every-performance-tells-a-story.jpeg"
            alt="Australian Indian Orchestra performing live"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/30" />
        </Link>

      </div>
    </section>
  );
}
