"use client";

import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 px-6 ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ar-rehman/3.webp')",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.7) 100%, rgba(20, 0, 4, 0.6) 20%)",
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-46 h-46 bg-red-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-46 h-46 bg-red-600/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto lg:px-12">
        <div className="text-center">
          {/* Tag */}
          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-[0.4em] uppercase text-red-200 border border-red-400/30 bg-white/5 backdrop-blur-sm rounded-full mb-8">
            2027 World Tour
          </span>

          {/* Heading */}
          <h2 className="text-white mb-6 text-2xl md:text-5xl font-bold leading-snug tracking-tight uppercase">
            Experience The Music of
            <span className="block text-red-500 italic">
              A.R. Rahman Live
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-3xl mx-auto text-white/80 text-sm capitalize md:text-base leading-snug mb-10 sm:mb-12">
            80 world-class musicians. One unforgettable evening. Join us for the
            2027 World Tour as the Australian Indian Orchestra brings Bollywood's
            greatest scores to life on stage.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row items-center justify-center gap-5">
            <Link
              href="/tour"
              className="group inline-flex items-center gap-3 bg-[#c8102e] text-white px-3 md:px-8 py-4 font-semibold text-xs md:text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(200,16,46,0.45)] "
            >
              Get Tour Tickets

            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center px-4 md:px-8 py-4 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-medium text-xs md:text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 "
            >
              Contact Us
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}