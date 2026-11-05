"use client";

import { usePathname } from "next/navigation";
import { Play, Download, FileText, ArrowUpRight, Music } from "lucide-react";
import StandaloneGallery from "./gallery-standalone";
import VideosSection from "./VideosSection";

interface VideoItem {
  title: string;
  youtubeId: string;
  description?: string;
}

interface EventShowcaseProps {
  /** Gallery category override. Falls back to the current concert route slug. */
  slug?: string;
  videos: VideoItem[];
  pdfTitle: string;
  pdfUrl: string;
  title?: string;
  subtitle?: string;
  heroImage?: string;
  
  // New dynamic text props
  featuredHeading?: string;      // Defaults to "The Live Symphony"
  programHeading?: string;       // Defaults to "Concert Program"
  programDescription?: string;   // Defaults to the descriptive paragraph
}

export default function Concert({
  slug,
  videos,
  pdfTitle,
  pdfUrl,
  title,
  subtitle,
  featuredHeading = title ?? "The Live Symphony",
  programHeading = "Concert Program",
  programDescription = "Unlock deeper insights into today's pieces. Access the full breakdown of conductors, tracking sequences, master repertoires, and individual musicians.",
}: EventShowcaseProps) {
  const pathname = usePathname();
  const routeSlug = pathname.split("/").filter(Boolean).at(-1);
  const galleryCategory = slug ?? routeSlug ?? "ar-rahman";
  return (
    <div className="bg-[#FAF9F6] text-black antialiased overflow-x-hidden">
      
      {/* SECTION II: PERFORMANCES COMPILATION */}
      <section className="relative">
        <VideosSection
          videos={videos.map((v) => ({
            title: v.title,
            description: v.description,
            embedSrc: `https://www.youtube.com/embed/${v.youtubeId}`,
          }))}
        />
      </section>

      {/* SECTION III: PHOTO GALLERY */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-8 max-w-8xl lg:px-12 mx-auto bg-[#FAF9F6]">
       
        <div className="relative z-10">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-5xl 2xl:text-6xl font-bold tracking-tight text-black uppercase">
              Captured <span className="text-[var(--red)]">Moments</span> 
            </h2>
          </div>

            <StandaloneGallery category={galleryCategory} />
        </div>
      </section>

      {/* SECTION IV: CONCERT PROGRAM TICKET DESIGN */}
      {pdfUrl && (
      <section className="relative pb-8 sm:pb-24 px-4 sm:px-8 max-w-8xl mx-auto lg:px-12">
        <div className="bg-red-100/60 rounded-[2.5rem] p-6 sm:p-12 md:p-16 relative overflow-hidden shadow-[0_40px_90px_rgba(239,68,68,0.06)] border border-red-200/50">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Info / Left Ticket Stub */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl md:text-4xl 2xl:text-6xl tracking-tight text-neutral-900 leading-snug capitalize">
                {programHeading}
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base 2xl:text-2xl leading-relaxed text-left ">
                {programDescription}
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 ">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[var(--red)] hover:bg-red-600 text-white font-medium text-sm 2xl:text-2xl px-2 sm:px-6 py-2 sm:py-3.5 rounded-sm transition-all shadow-md active:scale-95"
                >
                  <FileText className="w-4 h-4 2xl:w-8 2xl:h-8" />
                  View Program
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center gap-2 border-2 border-[var(--red)] bg-transparent text-black font-medium text-sm 2xl:text-2xl px-2 sm:px-6 py-2 sm:py-3.5 rounded-sm transition-all"
                >
                  <Download className="w-4 h-4 2xl:w-8 2xl:h-8" />
                  Download PDF
                </a>
              </div>
            </div>

            {/* Split Decorative Perforated Ticket Divider */}
            <div className="hidden lg:flex flex-col items-center justify-center lg:col-span-1 h-full py-4 relative" aria-hidden="true">
              <div className="w-[1px] h-full border-l-2 border-dashed border-black/15" />
              <div className="absolute -top-20 w-8 h-8 rounded-full bg-[#FAF9F6] border-b border-red-200/50" />
              <div className="absolute -bottom-20 w-8 h-8 rounded-full bg-[#FAF9F6] border-t border-red-200/50" />
            </div>

            {/* Simulated Interactive Document Frame */}
            <div className="lg:col-span-6 w-full max-w-md 2xl:max-w-lg mx-auto ">
              <div className="bg-white rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-neutral-200/60 pool-interactive">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-3 px-1">
                  <div className="flex items-center gap-2 text-neutral-400 min-w-0">
                    <FileText className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span className="text-xs font-mono truncate tracking-tight">{pdfTitle}</span>
                  </div>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-xs font-semibold text-black hover:text-red-400 transition-colors shrink-0"
                  >
                    Live Preview
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="aspect-[4/5] bg-neutral-50 rounded-xl overflow-hidden relative ring-1 ring-black/5">
                  <iframe
                    src={`${pdfUrl}#view=FitH&toolbar=0`}
                    title={pdfTitle}
                    className="w-full h-full border-0 rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      )}
    </div>
  );
}
