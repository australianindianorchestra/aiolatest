import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET /api/press
 * Proxies the latest press/blog posts from WordPress for the home page
 * PressSection component. Using an API route keeps the WP base URL
 * server-side only so the browser never tries to reach localhost directly.
 */
export async function GET() {
  const wpBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!wpBase) {
    return NextResponse.json({ posts: [] }, { status: 200 });
  }

  try {
    const res = await fetch(`${wpBase}/wp-json/aio/v1/posts?per_page=3`, {
      next: { revalidate: 300 }, // cache for 5 minutes
    });

    if (!res.ok) {
      console.error("[api/press] WP fetch failed:", res.status);
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json({ posts: data.posts ?? [] });
  } catch (err) {
    console.error("[api/press] Error:", err);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
