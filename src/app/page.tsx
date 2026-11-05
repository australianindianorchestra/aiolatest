import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/home/HeroBanner";

// Lazy-load all below-the-fold sections — they don't need to be in the initial bundle
const TourCta = dynamic(() => import("@/components/home/tourCta"));
const Cta = dynamic(() => import("@/components/home/Cta"));
const UpcomingEvents = dynamic(() => import("@/components/home/UpcomingEvents"));
const Videos = dynamic(() => import("@/components/home/Videos"));
const Services = dynamic(() => import("@/components/home/Services"));
const Concert = dynamic(() => import("@/components/home/PastConcerts"));
const Press = dynamic(() => import("@/components/home/pressData"));
const Footer = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
  title: "Australian Indian Orchestra | Bollywood Symphony Orchestra Sydney",
  description:
    "Experience Indian classical, Bollywood film and fusion music performed live by the Australian Indian Orchestra, a Sydney-based symphonic ensemble.",
  alternates: {
    canonical: "https://aio.org.au",
  },
  openGraph: {
    title: "Australian Indian Orchestra | Bollywood Symphony Orchestra Sydney",
    description:
      "Indian classical, Bollywood film and fusion music performed live by the Australian Indian Orchestra in Sydney.",
    url: "https://aio.org.au",
    images: [
      {
        url: "/banner-1.webp",
        width: 1200,
        height: 630,
        alt: "Australian Indian Orchestra musicians performing live on stage in Sydney",
      },
    ],
  },
};

export default function Home() {
  return (
    <main >
      <Navbar />
      <div className="overflow-x-hidden">
        <HeroBanner />
        <TourCta />
        <UpcomingEvents />
        <Videos />
        <Concert />
        <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8 mb-8 lg:px-12"> 
          <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-end sm:justify-between">
            <div className="mb-6 text-left md:mb-8">
              <h2 className="relative inline-block text-2xl font-bold uppercase leading-tight tracking-tight text-black sm:text-3xl md:text-5xl 2xl:text-6xl ">
                Our <span className="text-[var(--red)]">Services</span>
              </h2>
            </div>
          </div>
          <Services />
        </div>
        
        {/* <Cta /> */}
        {/* <Press /> */}
      </div>
      <Footer />
    </main>
  );
}
