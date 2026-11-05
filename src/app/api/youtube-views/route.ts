import { NextResponse } from "next/server";

// Simple in-memory cache shared across requests on the same server instance,
// so we don't hammer the YouTube API on every page load.
let cache: { key: string; data: Record<string, number>; expires: number } | null = null;
const CACHE_TTL_MS = 10 * 60_000; // 10 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get("ids");

  if (!idsParam) {
    return NextResponse.json(
      { error: "Missing 'ids' query parameter" },
      { status: 400 }
    );
  }

  // Serve from cache if it's fresh and for the same set of ids
  if (cache && cache.key === idsParam && cache.expires > Date.now()) {
    return NextResponse.json({ views: cache.data });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    console.warn("YOUTUBE_API_KEY is not set — view counts will not load.");
    return NextResponse.json({ views: {} });
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${encodeURIComponent(
        idsParam
      )}&key=${apiKey}`,
      // Also let Next's data cache dedupe/cache this fetch on the server
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`YouTube API responded with status ${res.status}`);
    }

    const data = await res.json();

    const views: Record<string, number> = {};
    for (const item of data.items ?? []) {
      views[item.id] = Number(item.statistics?.viewCount ?? 0);
    }

    cache = { key: idsParam, data: views, expires: Date.now() + CACHE_TTL_MS };

    return NextResponse.json({ views });
  } catch (err) {
    console.error("Failed to fetch YouTube view counts:", err);
    return NextResponse.json(
      { error: "Failed to fetch view counts" },
      { status: 500 }
    );
  }
}
