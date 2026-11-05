"use client";

import Image from "next/image";
import { useState } from "react";
import { useGallery } from "@/hooks/useGallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const tabs = ["The Music of A.R. Rahman", "CHORUS MANDALA", "Symphony of Lights", "SYDNEY TO MUMBAI", "Strings Sensations"];
const tabSlugMap: Record<string, string> = {
  "The Music of A.R. Rahman": "ar-rahman",
  "CHORUS MANDALA": "chorus-mandala",
  "Symphony of Lights": "symphony-of-lights",
  "SYDNEY TO MUMBAI": "sydney-to-mumbai",
  "Strings Sensations": "strings-sensations",
};

export default function GalleryTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  
  // Lightbox State
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { visibleImages, loading, loadMore, hasMore } = useGallery(tabSlugMap[activeTab]);

  // Map images for the Lightbox
  const slides = visibleImages.map((img) => ({ src: img.url }));

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-8xl mx-auto px-5 lg:px-12">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm md:text-base font-medium transition-all duration-300 border ${
                activeTab === tab
                  ? "bg-[#D10F2F] border-[#D10F2F] text-white shadow-lg"
                  : "bg-black border-white/10 text-gray-300 hover:border-[#D10F2F] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center text-white py-10">Loading gallery...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-2">
            {visibleImages.map((image, idx) => {
              const sizes = ["row-span-2", "row-span-1", "row-span-1", "row-span-2", "md:col-span-2 row-span-2", "row-span-1", "row-span-2", "row-span-1"];
              
              return (
                <div 
                  key={image.id} 
                  className={`group relative w-full h-full overflow-hidden cursor-pointer ${sizes[idx % sizes.length]}`}
                  onClick={() => {
                    setIndex(idx);
                    setOpen(true);
                  }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || "Gallery"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Lightbox Component */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={index}
          on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
        />

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={loadMore} 
              className="px-8 py-3 bg-[#D10F2F] text-white text-sm tracking-widest uppercase hover:bg-red-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}