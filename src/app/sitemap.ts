import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { getEventSlugs } from "@/lib/events";

const BASE_URL = "https://aio.org.au";
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/$/, "");

async function getBlogSlugs(): Promise<string[]> {
  if (!WORDPRESS_API_URL) return [];
  try {
    const slugs: string[] = [];
    for (let page = 1; page <= 100; page++) {
      const res = await fetch(
        `${WORDPRESS_API_URL}/wp-json/aio/v1/posts?page=${page}&per_page=100`,
        { next: { revalidate: 3600 } },
      );
      if (!res.ok) break;
      const data = await res.json();
      const posts = Array.isArray(data) ? data : data?.posts;
      if (!Array.isArray(posts)) break;
      slugs.push(
        ...posts
          .map((post: { slug?: string }) => post.slug)
          .filter((slug: unknown): slug is string => typeof slug === "string" && !!slug),
      );
      if (posts.length < 100) break;
    }
    return slugs;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "/",
    "/about",
    "/contact",
    "/join",
    "/tour",
    "/services",
    ...SERVICES.map((service) => `/services/${service.slug}`),
    "/gallery",
    "/videos",
    "/blog",
    "/concert/a-r-rahman-in-symphony",
    "/concert/chorus-mandala",
    "/concert/strings-sensations",
    "/concert/sydney-to-mumbai",
    "/concert/symphony-of-lights",
    "/concert/welcome-pm-narendra-modi",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const [blogSlugs, eventSlugs] = await Promise.all([getBlogSlugs(), getEventSlugs()]);
  const allRoutes = [
    ...routes,
    ...blogSlugs.map((slug) => `/blog/${encodeURIComponent(slug)}`),
    ...eventSlugs.map((slug) => `/events/${encodeURIComponent(slug)}`),
  ];

  return [...new Set(allRoutes)].map((route) => ({
    url: `${BASE_URL}${route === "/" ? "" : route}`,
  }));
}
