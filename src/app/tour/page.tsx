import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VideosSection from "@/components/VideosSection";
import Cta from "@/components/tour/Cta";
import TourForm from "@/components/tour/TourForm";
import type { Metadata } from "next";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export const metadata: Metadata = {
  title: "Concerts and Tour Updates | Australian Indian Orchestra",
  description:
    "Find upcoming Australian Indian Orchestra concerts, register for tour updates and watch featured performances of Indian and Bollywood music in symphonic arrangements.",
  alternates: { canonical: "https://aio.org.au/tour" },
};

export default function TourShowcase() {
  const videos = [
    {
      title: "Ramayana",
      description: "World Premiere Live Performance",
      url: "https://youtube.com/embed/R6kKNcgxNjw?rel=0&showinfo=0&autoplay=0&loop=0&muted=0&controls=1",
      featured: true,
    },
    {
      title: "Airtel Theme Song",
      url: "https://youtube.com/embed/MJ78Wj8PpoE?rel=0&showinfo=0&si=HZkFeArLgTZRjFFX&autoplay=0&loop=0&muted=0&controls=1",
    },
    {
      title: "Oruvan Oruvan",
      url: "https://youtube.com/embed/MzuSW_i6vsk?rel=0&showinfo=0&autoplay=0&loop=0&muted=0&controls=1",
    },
    {
      title: "Taal Se Taal",
      url: "https://youtube.com/embed/hEVnBbSapb4?rel=0&showinfo=0&autoplay=0&loop=0&muted=0&controls=1",
      large: true,
    },
    {
      title: "Maa Tujhe Salaam",
      url: "https://youtube.com/embed/ydPGNrDP6hA?rel=0&showinfo=0&autoplay=0&loop=0&muted=0&controls=1",
    },
    {
      title: "Jai Ho",
      url: "https://youtube.com/embed/cUQUzhOaeqI?rel=0&showinfo=0&autoplay=0&loop=0&muted=0&controls=1",
    },
    {
      title: "Music of Roja",
      url: "https://youtube.com/embed/8u7ryhEh6qQ?rel=0&showinfo=0&autoplay=0&loop=0&muted=0&controls=1",
    },
    {
      title: "Khwaja Mere Khwaja",
      url: "https://youtube.com/embed/zYZrwMcssuo?rel=0&showinfo=0&autoplay=0&loop=0&muted=0&controls=1",
    },
  ];

  return (
    <main>
      <Navbar />
      <div className="sm:my-8">
        <UpcomingEvents />
      </div>
      <TourForm />

      {/* FEATURED VIDEO */}
      <section className="relative py-8 sm:py-24 overflow-hidden bg-[#0d0d0d] mb-8 sm:mb-12">
        {/* Background Glow */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02))]" />
        <div className="relative max-w-8xl mx-auto px-6 lg:px-12">
          <div className="text-left mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase leading-snug tracking-tight 2xl:text-6xl">
              Experience The Orchestra
            </h2>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <iframe
              src={videos[0].url}
              loading="lazy"
              className="w-full aspect-video"
              allowFullScreen
            />
          </div>

          <div className="text-left mt-8">
            <h3 className="text-lg md:text-3xl 2xl:text-5xl">{videos[0].title}</h3>

            <p className="text-zinc-400 mt-3 2xl:text-3xl">
              {videos[0].description}
            </p>
          </div>
        </div>
      </section>


      <Cta />

      <Footer /> 
        
    </main>
  );
}
