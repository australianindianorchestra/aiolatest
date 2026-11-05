import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/banner";

export const metadata: Metadata = {
  title: "News & Updates | Australian Indian Orchestra Blog",
  description:
    "Latest news, stories, and updates from the Australian Indian Orchestra — concert announcements, behind-the-scenes insights, and community news from Australia's premier Bollywood symphony orchestra.",
  keywords: [
    "Australian Indian Orchestra news",
    "Bollywood orchestra blog",
    "Indian orchestra Australia updates",
    "AIO orchestra announcements",
  ],
  alternates: {
    canonical: "https://aio.org.au/blog",
  },
};

const NEXT_PUBLIC_WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  date: string;
  author: { name: string };
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
}

interface ApiResponse {
  current_page: number;
  per_page: number;
  total_posts: number;
  total_pages: number;
  posts: Post[];
}

// Fetch posts server-side dynamically based on the current page param
async function getPosts(page: string | number): Promise<ApiResponse | null> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/aio/v1/posts?page=${page}&per_page=10`, {
      next: { revalidate: 300 }, // revalidate every 5 minutes
    });
    if (!res.ok) throw new Error("Failed to fetch posts");
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const data = await getPosts(currentPage);

  if (!data || !data.posts || data.posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-zinc-100 flex flex-col items-center justify-center font-sans px-4">
        <h1 className="text-3xl font-bold tracking-wider uppercase border-b-2 border-red-600 pb-2 mb-4">
          Latest News
        </h1>
        <p className="text-zinc-400">No blog posts found at the moment.</p>
      </div>
    );
  }

  const { posts, total_pages } = data;

  return (
    <main className="bg-zinc-50 min-h-screen flex flex-col justify-between"> 
    <Navbar />
    <Banner
        heading="Our "
        highlight="Blogs"
        subheading="Learn more about orchestra"
    />
    
    {/* Modern, bright editorial background wrapper (No black) */}
    <div className="flex-1 bg-gradient-to-b from-white via-zinc-50 to-zinc-100 text-zinc-900 antialiased ">

        {/* Main Grid Section */}
        <section className="max-w-8xl mx-auto py-16 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });

            // Check if the primary category exists and isn't "Uncategorized"
            const primaryCategory = post.categories?.[0];
            const shouldShowCategory = 
                primaryCategory && 
                primaryCategory.name.toLowerCase() !== "uncategorized";

            return (
                <article
                key={post.id}
                className="group flex flex-col bg-zinc-100 border border-zinc-200/80 rounded-2xl overflow-hidden transition-all duration-500 hover:border-zinc-300 hover:shadow-[0_20px_40px_-15px_rgba(24,24,27,0.08)]"
                >
                {/* Image Container with Subtle Zoom */}
                <div className="relative aspect-[4/2] w-full bg-white overflow-hidden">
                    <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                    unoptimized
                    />
                    
                    {/* Clean Light Floating Badge - Only renders if valid and not "Uncategorized" */}
                    {shouldShowCategory && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-zinc-800 border border-zinc-200 text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full shadow-sm">
                        {primaryCategory.name}
                    </span>
                    )}
                </div>

                {/* Clean Content Area */}
                <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
                    <div className="space-y-3.5">
                    {/* Metadata String */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 tracking-wider uppercase">
                        <span className="text-zinc-500">By {post.author.name}</span>
                        <span>•</span>
                        <time dateTime={post.date}>{formattedDate}</time>
                    </div>

                    {/* Heading with Premium Color Toggle */}
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 leading-snug group-hover:text-red-600 transition-colors duration-300">
                        <Link href={`/blog/${post.slug}`} className="outline-none block">
                        {post.title}
                        </Link>
                    </h2>

                    {/* High Legibility Body Copy */}
                    <p className="text-zinc-600 text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt.replace(/<[^>]*>/g, "")}
                    </p>
                    </div>

                    {/* Footer Controls */}
                    <div className="pt-5 mt-6 border-t border-zinc-100 flex items-center justify-between gap-4">
                    {/* Minimalist Light Tags */}
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {post.tags?.slice(0, 2).map((tag) => (
                        <span key={tag.id} className="text-[10px] font-medium tracking-wider text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200/60">
                            #{tag.slug}
                        </span>
                        ))}
                    </div>

                    {/* Clean Animated Read Link */}
                    <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-red-600 transition-colors duration-300 shrink-0"
                    >
                        <span>Read</span>
                        <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                    </div>
                </div>
                </article>
            );
            })}
        </div>

        {/* Modern Light Pagination UI */}
        {total_pages > 1 && (
            <nav className="flex justify-center items-center gap-4 mt-20 pt-8 border-t border-zinc-200">
            <Link
                href={`/blog?page=${currentPage - 1}`}
                className={`px-5 py-2.5 border text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                currentPage <= 1
                    ? "pointer-events-none border-zinc-200 text-zinc-300 bg-zinc-50"
                    : "border-zinc-200 text-zinc-700 bg-white hover:border-zinc-400 hover:bg-zinc-50"
                }`}
            >
                Previous
            </Link>

            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Page <strong className="text-zinc-800 font-bold">{currentPage}</strong> / {total_pages}
            </span>

            <Link
                href={`/blog?page=${currentPage + 1}`}
                className={`px-5 py-2.5 border text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                currentPage >= total_pages
                    ? "pointer-events-none border-zinc-200 text-zinc-300 bg-zinc-50"
                    : "border-zinc-200 text-zinc-700 bg-white hover:border-zinc-400 hover:bg-zinc-50"
                }`}
            >
                Next
            </Link>
            </nav>
        )}
        </section>
    </div>
    
    <Footer />
    </main>
  );
}