import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NEXT_PUBLIC_WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

interface PostDetail {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  date: string;
  author: { name: string };
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
}

// Fetch single post details by slug
async function getPostDetail(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/aio/v1/posts/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error fetching post details for slug: ${slug}`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetail(slug);

  if (!post) {
    return {
      title: "Post Not Found | Australian Indian Orchestra",
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `${post.title} | Australian Indian Orchestra`,
    description: post.excerpt
      ? post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160)
      : `Read "${post.title}" on the Australian Indian Orchestra blog — news, updates and stories from Australia's premier Indian orchestra.`,
    alternates: {
      canonical: `https://aio.org.au/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Australian Indian Orchestra`,
      description: post.excerpt
        ? post.excerpt.replace(/<[^>]+>/g, "").slice(0, 160)
        : `Read on the Australian Indian Orchestra blog.`,
      url: `https://aio.org.au/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author?.name || "Australian Indian Orchestra"],
      images: post.featured_image
        ? [
            {
              url: post.featured_image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [{ url: "/banner-1.webp", width: 1200, height: 630, alt: "Australian Indian Orchestra" }],
    },
  };
}

export default async function SingleBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getPostDetail(resolvedParams.slug);

  // Fallback to Next.js 404 page if post doesn't exist
  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt?.replace(/<[^>]*>/g, "").trim() || undefined,
    image: post.featured_image ? [post.featured_image] : undefined,
    datePublished: post.date || undefined,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : { "@type": "Organization", name: "Australian Indian Orchestra" },
    publisher: {
      "@type": "Organization",
      name: "Australian Indian Orchestra",
      url: "https://aio.org.au",
      logo: { "@type": "ImageObject", url: "https://aio.org.au/logo.png" },
    },
    mainEntityOfPage: `https://aio.org.au/blog/${encodeURIComponent(post.slug)}`,
  };

  return (
    <main> 
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema).replace(/</g, "\\u003c") }}
        />
        <Navbar />
        <div className="min-h-screen text-black antialiased">
        {/* Back Button & Navigation context */}
        <div className="max-w-4xl mx-auto pt-12 px-4 sm:px-6">
            <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-red-500 transition-colors duration-200 group"
            >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Journal
            </Link>
        </div>

        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 pb-24">
            {/* Meta / Header Section */}
            <header className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                <span className="text-red-500 uppercase font-bold tracking-wider">
                {post.categories?.[0]?.name || "Orchestra"}
                </span>
                <span>•</span>
                <time dateTime={post.date}>{formattedDate}</time>
                <span>•</span>
                <span>By {post.author.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight capitalize leading-tight">
                {post.title}
            </h1>
            </header>

            {/* Hero Featured Image */}
            {post.featured_image && (
            <div className="relative w-full aspect-[21/9] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden mb-12 shadow-2xl">
                <Image
                src={post.featured_image}
                alt={post.title}
                fill
                priority
                className="object-contain object-center"
                sizes="(max-w-4xl) 100vw"
                unoptimized
                />
            </div>
            )}

            {/* Dynamic HTML Block Container */}
            {/* Custom class 'prose-aio' ensures WordPress HTML elements map cleanly onto your brand themes */}
            <article className="prose prose-invert max-w-none prose-zinc 
            prose-headings:text-white prose-headings:uppercase prose-headings:font-bold prose-headings:tracking-wide
            prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg
            prose-a:text-red-500 hover:prose-a:text-red-400 prose-a:no-underline prose-a:border-b prose-a:border-red-600
            prose-strong:text-white prose-img:rounded-lg prose-img:border prose-img:border-zinc-800
            mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Footer Taxonomy / Tags */}
            {post.tags && post.tags.length > 0 && (
            <footer className="pt-8 mt-12 border-t border-zinc-800 flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-zinc-500 mr-2 font-semibold">Tags:</span>
                {post.tags.map((tag) => (
                <span
                    key={tag.id}
                    className="text-xs font-medium uppercase px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded hover:border-red-600 transition-colors duration-200 cursor-default"
                >
                    #{tag.name}
                </span>
                ))}
            </footer>
            )}
        </main>
        </div>
        <Footer />
    </main>
  );
}
