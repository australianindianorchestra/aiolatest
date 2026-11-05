"use client";
import Image from "next/image";

const DEFAULT_BANNER_IMAGE = "page-banner/banner.png";

interface BannerProps {
  heading: string;
  highlight?: string;
  subheading: string;
  image?: string;
  imageAlt?: string;
}

export default function Banner({
  heading,
  highlight,
  subheading,
  image,
  imageAlt = "Australian Indian Orchestra artists",
}: BannerProps) {
  const bannerSrc = image || DEFAULT_BANNER_IMAGE;

  return (
    <section
      aria-label="Featured Australian Indian Orchestra events"
      className="relative isolate flex flex-col overflow-hidden bg-black text-white md:block md:min-h-[400px] 2xl:min-h-[560px]"
    >
      <div className="absolute inset-0 bg-black" />

      <div className="relative aspect-[3/2] w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[75%]">
        <Image
          src={bannerSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/35 md:via-transparent md:to-transparent" />
      </div>

      <div className="relative z-10 px-8 sm:px-6 py-0 md:flex md:min-h-[400px] md:items-center md:py-10 max-w-8xl sm:mx-auto md:pr-[25%] lg:px-12">
        <div className="w-full -mt-4 md:mt-0 pb-6 md:pb-0">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl 2xl:text-7xl uppercase leading-snug">
            {heading}{" "}
            {highlight && (
              <span className="text-[var(--red)]">{highlight}</span>
            )}
          </h1>
          <p className="mt-2 max-w-2xl 2xl:max-w-6xl text-sm sm:text-base 2xl:text-3xl text-white/90 sm:mt-3">
            {subheading}
          </p>
        </div>
      </div>
    </section>
  );
}