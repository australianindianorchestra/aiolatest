"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface PressItem {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  featured_image: string;
  slug: string;
}

export default function PressSection() {
  const [pressData, setPressData] = useState<PressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Check for cached data in sessionStorage first
      const cachedData = sessionStorage.getItem("aio_press_data");
      if (cachedData) {
        try {
          setPressData(JSON.parse(cachedData));
          setLoading(false);
          return;
        } catch {
          sessionStorage.removeItem("aio_press_data");
        }
      }

      try {
        // Use our own API route — the browser cannot reach http://localhost/aio directly
        const response = await fetch("/api/press");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        if (Array.isArray(data.posts)) {
          setPressData(data.posts);
          sessionStorage.setItem("aio_press_data", JSON.stringify(data.posts));
        }
      } catch (err) {
        console.error("[PressSection] fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative max-w-8xl px-5 mx-auto overflow-hidden bg-white py-12 md:py-12 lg:px-12">
     
      <div className="container  relative z-10">
        
        {/* Section Header */}
        <div className="mb-6 md:mb-12 text-left">
          <h2 className="relative inline-block uppercase text-black text-xl sm:text-2xl md:text-4xl font-bold leading-tight tracking-tight">
            AIO IN <span className="text-[var(--red)]">THE PRESS </span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative  max-w-6xl mx-auto">
          
          {/* Center Line (Desktop) */} 
          <div className="space-y-8 md:space-y-0">
            {loading ? (
              <div className="text-neutral-500 text-center py-10 font-light">Loading press articles...</div>
            ) : (
              pressData.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <a 
                    href={`/blog/${item.slug}`} 
                    key={item.id}
                    className="block group"
                  >
                    <div className={`relative flex items-center ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                      
                      {/* Timeline Node Center Dot */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 h-5 w-5 items-center justify-center rounded-full border border-black bg-white shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-black transition-transform duration-300 group-hover:scale-125" />
                      </div>

                      {/* Content Card */}
                      <div className="w-full md:w-[46%] rounded-lg border border-neutral-200 bg-white/80 backdrop-blur-xl p-6 md:p-8 shadow-sm transition-all duration-300 group-hover:border-black/30 group-hover:shadow-md">
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-6 items-start sm:items-center">
                          
                          {/* Image Thumbnail */}
                          <div className="flex-shrink-0">
                            <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl border border-neutral-100 bg-neutral-50 overflow-hidden relative shadow-inner">
                              <Image
                                src={item.featured_image || "/fallback-logo.png"} 
                                alt={item.title}
                                fill
                                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                                sizes="96px"
                                unoptimized={true} 
                              />
                            </div>
                          </div>

                          {/* Text Details */}
                          <div className="flex-1 min-w-0">
                            <p className="mb-2 text-xs font-medium text-neutral-400">
                              {new Date(item.date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                            <h3 className="mb-2 text-sm md:text-base font-medium text-neutral-900 group-hover:text-black line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="mb-2 text-xs md:text-sm text-neutral-500 line-clamp-2">
                              {item.excerpt.replace(/&hellip;/g, "...")}
                            </p>
                            <div className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-red-600 font-semibold transition-transform duration-300 group-hover:translate-x-1">
                              Read Article <span>→</span>
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>
                  </a>
                );
              })
            )}
          </div>

          {/* View All Button */}
          <div className="mt-8 text-center">
            <a 
              href="/blog" 
              className="inline-block border-2 border-red-500 bg-[var(--red)] px-6 py-4 text-xs font-semibold tracking-[0.2em] text-white transition-all duration-300 hover:bg-white shadow-sm hover:text-red-600"
            >
              View All Press
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}