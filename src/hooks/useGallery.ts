import { useState, useEffect } from "react";

const CACHE_DURATION = 1000 * 60 * 60 * 24 * 30 * 6; // 6 months
const CACHE_VERSION = "v2"; // bump this to invalidate all cached gallery data
const NEXT_PUBLIC_WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
// Define the interface for the API response
interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

export const useGallery = (category: string) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const cacheKey = `gallery_cache_${CACHE_VERSION}_${category}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setImages(data);
          setVisibleImages(data.slice(0, 10));
          setLoading(false);
          return;
        }
      }

      try {
        const res = await fetch(`${NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/aio/v1/media/${category}`);

        const data = await res.json(); // Assuming this returns an array of objects
        
        localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
        setImages(data);
        setVisibleImages(data.slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  const loadMore = () => {
    const nextCount = visibleImages.length + 10;
    const nextBatch = images.slice(0, nextCount);
    setVisibleImages(nextBatch);
    setHasMore(nextCount < images.length);
  };

  return { visibleImages, loading, loadMore, hasMore };
};