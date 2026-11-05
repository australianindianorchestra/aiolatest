
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import type { GalleryImage } from "@/lib/services";

type ServiceGalleryProps = {
  gallery: GalleryImage[];
  title: string;
};

export default function ServiceGallery({
  gallery,
  title,
}: ServiceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(
    null
  );

  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedImage]);

  return (
    <section
      className="mx-auto mb-8 mt-4 w-full max-w-8xl px-4 text-black sm:px-6 lg:px-12"
      aria-label={`${title} gallery`}
    >
      <h2 className="mb-4 sm:mb-8 text-xl font-semibold uppercase sm:text-2xl md:text-4xl 2xl:text-6xl">
        Gallery
      </h2>

      {/* Responsive gallery: 5 columns on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {gallery.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            aria-label={`View ${image.alt}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-md bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
      
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery image viewer`}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={26} />
          </button>

          <div
            className="relative flex max-h-[85vh] w-full max-w-6xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1600}
              height={1000}
              priority
              sizes="100vw"
              className="max-h-[85vh] w-auto max-w-full rounded-sm object-contain"
            />
          </div>

          <p className="absolute bottom-4 left-4 right-4 text-center text-sm text-white/80">
            {selectedImage.alt}
          </p>
        </div>
      )}
    </section>
  );
}
