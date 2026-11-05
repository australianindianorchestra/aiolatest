"use client";

export default function Cta() {

  return (
      <section className="pb-8 sm:pb-16 bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 ">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-pink-900/100" />

            <div className="relative px-4 py-12 sm:px-8 sm:py-20 md:px-16 text-center">
              <span className="uppercase tracking-[0.4em] text-xs text-[var(--red)] font-bold 2xl:text-lg">
                Live Experience
              </span>

              <h2 className="text-2xl md:text-4xl 2xl:text-6xl font-bold uppercase leading-snug md:mt-2">
                EXPERIENCE OUR ORCHESTRA LIVE
              </h2>

              <p className="text-zinc-400 max-w-2xl mx-auto mt-4 text-sm md:text-lg 2xl:text-2xl">
                Be part of a breathtaking live orchestra experience featuring
                timeless compositions, powerful performances, and unforgettable
                moments.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href="#waitlist" className="px-4 py-2 md:px-8 md:py-4 text-sm md:text-base 2xl:text-2xl bg-white text-black font-medium hover:scale-105 transition">
                  Join 2027 Season Waitlist
                </a>

                <button className="px-4 py-2 md:px-8 md:py-4 text-sm md:text-base 2xl:text-2xl border border-white/20 hover:bg-white/5 transition">
                  Explore Performances
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}