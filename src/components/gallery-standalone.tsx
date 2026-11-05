"use client";

import Image from "next/image";
import { useGallery } from "@/hooks/useGallery";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function StandaloneGallery({ category = "ar-rahman" }) {
  const { visibleImages, loading, loadMore, hasMore } = useGallery(category);
  
  // Lightbox State
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Map your images to the format expected by the lightbox
  const slides = visibleImages.map((img) => ({
    src: img.url,
    alt: img.alt || "Gallery Image",
  }));

  if (loading) return <div className="text-white text-center py-24">Loading...</div>;

  return (
    <div>
      <div className="gallery-wall">
        {visibleImages.map((image, idx) => (
          <div 
            key={image.id} 
            className="reveal gallery-card group cursor-pointer" 
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
            style={{ opacity: 1, transform: "translateY(0px)", transition: `all .6s ease ${idx * 0.05}s` }}
          >
            <Image src={image.url} alt={image.alt || `Gallery ${idx + 1}`} width={0} height={0} sizes="100vw" className="gallery-image w-full h-auto" />
          </div>
        ))}
      </div>

      {/* Lightbox Component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
      />

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button onClick={loadMore} className="gallery-loadmore 2xl:text-lg">
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
}