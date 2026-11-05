"use client";

import Image from "next/image";

export default function OrchestraEventBanner() {
  return (
    <section
      aria-label="Featured Australian Indian Orchestra events"
      className="relative isolate flex flex-col overflow-hidden bg-black text-white md:block md:min-h-[560px] 2xl:min-h-[700px]"
    >
      <div className="absolute inset-0 bg-black" />
      <div className="relative min-h-[50vh] aspect-[4/3] sm:min-h-auto w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[75%] 2xl:w-[63%]">
        {/* Mobile image */}
        <Image
          src="/page-banner/home-banner-mobile.jpeg"
          alt="Australian Indian Orchestra artists"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />

        {/* Desktop / tablet image */}
        <Image
          src="/upcoming-event-banner.png"
          alt="Australian Indian Orchestra artists"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className="hidden object-cover object-center md:block md:object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/35 md:via-transparent md:to-transparent" />
      </div>

      <div className="relative z-10 px-8 sm:px-6 py-0 md:flex md:min-h-[560px] 2xl:min-h-[700px] md:items-center md:py-10 max-w-8xl md:mx-auto lg:px-12">
        <div className="w-full -mt-4 md:mt-0 pb-6 md:pb-0">
          <h1 className="text-[28px] font-black leading-snug text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.3)] sm:text-4xl md:text-5xl 2xl:text-7xl">
            THE UNFORGETTABLES
          </h1>
          <h3 className="mt-1 md:mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white/90 2xl:text-5xl">
            Jagjit Singh Reimagined
          </h3>
          <p className="mt-1 md:mt-4 text-base md:text-xl 2xl:text-2xl font-normal text-white/90">
            Tickets releasing soon | 6 Feb 2027
          </p>

          <a
            href="https://www.trybooking.com/DRHJE" target="_blank" rel="noopener noreferrer"
            className="mt-5 inline-block bg-[var(--red)] px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-wide text-white 2xl:text-xl"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
