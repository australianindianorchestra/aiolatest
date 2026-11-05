import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Banner from "@/components/banner";

export const metadata: Metadata = {
  title: "Video Archive | Bollywood Orchestra Performances | Australian Indian Orchestra",
  description:
    "Watch live performances by the Australian Indian Orchestra — Bollywood hits, A.R. Rahman tributes, Indian fusion concerts, and behind-the-scenes videos from Australia's premier Indian symphony orchestra.",
  keywords: [
    "Australian Indian Orchestra videos",
    "A.R. Rahman symphony concert video",
    "Bollywood orchestra performance video",
    "Indian orchestra Australia live",
    "AIO orchestra Sydney video",
  ],
  alternates: {
    canonical: "https://aio.org.au/videos",
  },
};

export default function TourShowcase() {
 const videos = [ 
        {
            title: "Haye Rama",
            url: "https://www.youtube.com/embed/PzFlK2y_D_M?si=-Y2T5WObHZaBXyzv",
        },
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
        {
            title: "Aa Dekhen Zara",
            url: "https://www.youtube.com/embed/pEWJuHEabfY?si=jvSef9MwF56kuHHx?rel=0&showinfo=0&autoplay=0&loop=0&muted=0&controls=1"
        } 
    ];

  return (
    <main >
    < Navbar />
    {/* FEATURED VIDEO */}
    <Banner  heading="Featured"
        highlight="Videos"
        subheading=""
        image="/page-banner.png"
      />

    <section className="relative max-w-8xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 lg:px-12">
        {/* Header overlapping video */}
       <div className="relative z-10 text-center sm:text-left uppercase">
            <div className="flex flex-row sm:items-center justify-start justify-between gap-2">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-black text-wrap 2xl:text-6xl">
                Signature <span className="text-[var(--red)]">Moments</span>
                </h2>
                <a href="https://www.youtube.com/@ausindorchestra/videos" target="_blank" className="text-xs font-medium tracking-widest uppercase text-white inline-block bg-[var(--red)] px-3 py-2 sm:px-6 sm:py-4 hover:bg-red-700 transition self-center sm:self-auto align-center 2xl:text-2xl">
                View All
                </a>
            </div>  
        </div>
    </section>

    {/* VIDEO GALLERY */}
    <section className="relative pb-20 sm:pb-32 pt-8 md:pt-12 sm:pt-0">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {videos.map((video, index) => {
                    const isFirst = index === 0;
                    return (
                        <div
                            key={index}
                            className={`group relative overflow-hidden rounded-[20px] sm:rounded-[32px] border border-white/10 bg-white/[0.03] ${
                                isFirst ? "sm:col-span-2 lg:col-span-3" : ""
                            }`}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent" />
                            </div>

                            <iframe
                                src={video.url}
                                title={video.title}
                                loading="lazy"
                                className="w-full aspect-video"
                                allowFullScreen
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                                <h3 className="text-base sm:text-xl text-white">{video.title}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
    
    <section className="relative h-[600px]">
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
            backgroundImage: "url('/chorus-mandala/4.webp')",
            }}
        />
        <div className="absolute inset-0 bg-black/50" />
    </section>

    {/* CTA */}
    <section className="pb-16 sm:pb-32 -mt-40 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 2xl:max-w-7xl">
            <div className="relative overflow-hidden rounded-[32px] sm:rounded-[48px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">

                {/* Existing Red Glow */}
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bg-red-600/20 blur-[180px] rounded-full" />

                {/* Content */}
                <div className="relative text-center py-16 sm:py-24 px-4 sm:px-8">
                    <span className="text-red-500 uppercase tracking-[0.5em] text-xs 2xl:text-xl">
                    Live Orchestra </span>

                    <h2 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-bold leading-tight 2xl:text-8xl">
                    Feel Every
                    <span className="block 2xl:inline text-red-500"> Note Live
                    </span>
                    </h2>

                    <p className="max-w-2xl mx-auto mt-6 sm:mt-8 text-zinc-400 text-base sm:text-lg 2xl:text-3xl">
                    An immersive concert experience featuring iconic compositions,
                    world-class musicians, and stunning visuals.
                    </p>

                    <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-5">
                    <a
                        href="/tour"
                        className="px-8 sm:px-10 py-4 sm:py-5 bg-red-700 text-white font-medium hover:scale-105 transition text-sm sm:text-base 2xl:text-3xl"
                    >
                        Book Tickets
                    </a>

                    <a href="/contact" className="px-8 sm:px-10 py-4 sm:py-5 border border-white/10 text-white hover:bg-white/5 text-sm sm:text-base 2xl:text-3xl">
                        Contact Us
                    </a>
                    </div>
                </div>

            </div>
        </div>
    </section>

      <Footer />
    </main>
  );
}
