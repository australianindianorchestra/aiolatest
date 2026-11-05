"use client";
import { useEffect, useRef, useState } from "react";

interface VideoItem {
  id?: string;
  num?: string;
  title: string;
  description?: string;
  embedSrc: string;
  tag?: string;
  size?: "small" | "large";
}

interface VideosSectionProps {
  videos?: VideoItem[];
}

const defaultVideos: VideoItem[] = [
  {
    id: "1",
    num: "01",
    title: "Ramayana",
    description:
      "The epic collaboration between A.R. Rahman and Hans Zimmer",
    embedSrc:
      "https://youtube.com/embed/R6kKNcgxNjw?rel=0&showinfo=0&si=14e5hxgxws1VhwWJ&autoplay=0&loop=0&muted=0&controls=1",
    tag: "EPIC",
    size: "large",
  },
  {
    id: "2",
    num: "02",
    title: "Airtel Theme",
    description: "The iconic tune that defined a generation",
    embedSrc:
      "https://youtube.com/embed/MJ78Wj8PpoE?rel=0&showinfo=0&si=ueiPZ7zSR_by0-1P&autoplay=0&loop=0&muted=0&controls=1",
    tag: "VIRAL",
    size: "large",
  },
  {
    id: "3",
    num: "03",
    title: "Mere Naam Tu",
    description: 'An orchestral masterpiece from the movie "Zero"',
    embedSrc:
      "https://youtube.com/embed/YZzNyCvpE0o?rel=0&showinfo=0&si=ClUqq0VFhVGjTklp&autoplay=0&loop=0&muted=0&controls=1",
    tag: "LIVE",
    size: "large",
  },
  {
    id: "4",
    num: "04",
    title: "Narendra Modi applauds Didgeridoo & Tabla Welcome",
    description:
      "A unique combination of the Australian Didgeridoo with the Indian Tabla, representing the friendship between these two great nations, welcomes the Indian prime minister Narendra Modi to Australia. ",
    embedSrc: "https://www.youtube.com/embed/ilqoqOLJ23Y?si=6FFpElMTKADMCnzP",
    tag: "Honour",
    size: "large",
  },
];

// Pull the raw 11-character YouTube video ID out of any embed URL
function extractYouTubeId(embedSrc: string): string | null {
  const match = embedSrc.match(/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toLocaleString();
}

export default function VideosSection({
  videos = defaultVideos,
}: VideosSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  const finalVideos = (videos?.length ? videos : defaultVideos).map(
    (video, index) => ({
      id: video.id ?? String(index + 1),
      num: video.num ?? String(index + 1).padStart(2, "0"),
      title: video.title,
      description: video.description ?? "",
      embedSrc: video.embedSrc,
      tag: video.tag ?? "VIDEO",
      size: video.size ?? "large",
    })
  );

  // Fetch view counts from our own server-side API route (batched into one
  // call) and refresh every minute. The YouTube API key never reaches the
  // browser — it stays server-side inside /api/youtube-views.
  useEffect(() => {
    const ids = finalVideos
      .map((v) => extractYouTubeId(v.embedSrc))
      .filter((id): id is string => Boolean(id));

    if (ids.length === 0) return;

    let cancelled = false;

    async function getViews() {
      try {
        const res = await fetch(
          `/api/youtube-views?ids=${encodeURIComponent(ids.join(","))}`
        );

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        if (!cancelled && data.views) {
          setViewCounts(data.views);
        }
      } catch (err) {
        console.error("Failed to fetch YouTube view counts:", err);
      }
    }

    getViews();
    const interval = setInterval(getViews, 10 * 60 * 1000); // refresh every 10 min
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = "1";
                (el as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="videos"
      className="relative overflow-hidden py-8 md:py-16 px-6 bg-white"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-70" />

      {/* Header */}
      <div className="max-w-8xl mx-auto text-left mb-8 relative z-10 lg:px-12">
        <h2 className=" text-2xl sm:text-3xl md:text-5xl 2xl:text-6xl leading-tight font-bold uppercase text-[var(--deep)] tracking-tight">
          Our <span className=" text-[var(--red)]">Concert Videos</span>
        </h2>
      </div>

      {/* Videos */}
      <div className="max-w-8xl mx-auto relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:px-12">
        {finalVideos.map((video, i) => {
          const ytId = extractYouTubeId(video.embedSrc);
          const views = ytId ? viewCounts[ytId] : undefined;

          return (
            <div
              key={video.id}
              className={`relative flex flex-col items-start md:gap-4 gap-4`}
            >
              {/* Video */}
              <div
                className={`relative group w-full `}
              >
             
                <div className="relative rounded-3xl shadow-2xl bg-black group-hover:-translate-y-2 transition-all duration-500">
                  <iframe
                    src={video.embedSrc}
                    allowFullScreen
                    loading="lazy"
                    className={`w-full ${
                      video.size === "small" ? "aspect-[4/3]" : "aspect-video"
                    }`}
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-28 pointer-events-none" />

                  {/* View count badge */}
                 {views !== undefined && (
                    <div
                      className="
                        absolute z-50 -bottom-4 -right-4 md:right-auto md:-left-4
                        w-fit 
                        flex items-center gap-2 
                        px-4 md:px-5 py-3 md:py-5
                        rounded-2xl
                        overflow-hidden

                        bg-[linear-gradient(135deg,#ff334b_0%,#c8102e_50%,#990c23_100%)]
                        border border-red-300/40

                        shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-10px_20px_rgba(150,0,0,0.3),0_10px_30px_rgba(200,16,46,0.3)]

                        text-white font-semibold text-sm md:text-lg
                      "
                    >
                      {/* Crystal shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent pointer-events-none" />

                      {/* Top reflection */}
                      <div className="absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 md:w-5 md:h-5 relative z-10"
                      >
                        <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 11.5A4.5 4.5 0 1 1 16.5 12 4.5 4.5 0 0 1 12 16.5z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>

                      <span className="relative z-10">{formatViews(views)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div
                className={`relative w-full`}
              >
                <h3 className={`leading-tight text-lg md:text-2xl 2xl:text-3xl text-[var(--deep)]`}>
                  {video.title}
                </h3>

                <p className="text-gray-500 leading-6 mt-1 text-sm md:text-base 2xl:text-lg">
                  {video.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
