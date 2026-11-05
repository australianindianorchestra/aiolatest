"use client";
import Image from "next/image";
import Script from "next/script";

export default function Cta() {
  return (

      <section className="relative py-20 border border-t-gray-900">

        <Image
          src="/sydney-to-mumbai/7.webp"
          alt="Support"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-full text-left md:text-center px-6">
          <h2 className=" text-2xl sm:text-3xl md:text-4xl 2xl:text-6xl leading-snug font-bold uppercase text-white tracking-snug mb-2">
            Support The <span className=" text-[var(--red)]">Movement</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-lg mb-8 2xl:text-2xl">
            Help us unite cultures through music and inspire future
            generations of artists.
          </p>

          <div className="flex justify-center items-center">
            <Script
              src="https://js.stripe.com/v3/buy-button.js"
              strategy="lazyOnload"
            />

            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-red-900/20">
              <stripe-buy-button
                buy-button-id="buy_btn_1RD3tqRsuShRnrgoBgqYRzHh"
                publishable-key="pk_live_51RCZFDRsuShRnrgohsLl7tW7Qty5mRg1hMoQpzZ3kJzxM8K5zere2fcSs7BzXiEJIz61RLaPGqRXAWjlaBWcDO5S00u4SzTiPr"
              />
            </div>
          </div>

        </div>
      </section>
  );
}