import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getService } from "@/lib/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceGallery from "@/components/ServiceGallery";
import Banner from "@/components/banner";

type PageProps = { params: Promise<{ slug: string }> };

// Builds one static page per service at build time
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

// Page title and social preview change per service
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found", robots: { index: false, follow: true } };

  return {
    title: `${service.title} | Australian Indian Orchestra`,
    description: service.intro,
    alternates: { canonical: `https://aio.org.au/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Australian Indian Orchestra`,
      description: service.intro,
      url: `https://aio.org.au/services/${service.slug}`,
      type: "website",
      images: [service.image.src],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const enquireHref = `/contact`;
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    serviceType: service.title,
    url: `https://aio.org.au/services/${service.slug}`,
    provider: { "@id": "https://aio.org.au/#organization" },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      {/* Hero */}
      <section
        aria-label="Featured Australian Indian Orchestra events"
        className="relative isolate flex flex-col overflow-hidden bg-black text-white md:block md:min-h-[400px] 2xl:min-h-[560px] "
      >
        <div className="absolute inset-0 bg-black" />
  
        <div className="relative aspect-[3/2] w-full overflow-hidden md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[75%]">
          <Image
            src={service.BannerImage.src}
            alt={service.BannerImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/35 md:via-transparent md:to-transparent" />
        </div>
  
        <div className="relative z-10 px-8 sm:px-6 py-0 md:flex md:min-h-[400px] md:items-center md:py-10 max-w-8xl sm:mx-auto lg:px-12">
          <div className="w-full -mt-4 md:mt-0 pb-6 md:pb-0">
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl 2xl:text-7xl uppercase">
              {service.title.split(" ").map((word, index, arr) => (
                <span
                  key={index}
                  className={index === arr.length - 1 ? "text-[var(--red)]" : ""}
                >
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="mt-2 max-w-2xl text-base 2xl:text-3xl text-white/90 sm:mt-3">
              {service.tagline}
            </p>
  
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-8xl gap-10 px-4 py-4 sm:px-6 md:py-8 lg:grid-cols-3 lg:gap-12 lg:py-8 text-black lg:px-12">
        <div className="lg:col-span-2">
          <p className="text-sm leading-relaxed text-neutral-800 sm:text-lg 2xl:text-3xl">
            {service.intro}
          </p>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-800 sm:mt-6 sm:space-y-5 sm:text-lg 2xl:text-3xl">
            {service.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-semibold uppercase 2xl:text-3xl">What&apos;s included</h2>
            <ul className="mt-4 space-y-3">
              {service.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-neutral-700">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="mt-1 h-4 w-4 shrink-0 fill-amber-600 2xl:h-8 2xl:w-8"
                  >
                    <path d="M7.6 13.4 4.2 10l-1.4 1.4 4.8 4.8L17.2 6.6 15.8 5.2z" />
                  </svg>
                  <span className="text-sm md:text-base 2xl:text-2xl">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={enquireHref}
              className="mt-8 block w-full rounded-sm bg-[var(--red)] px-6 py-3 text-center font-medium text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 2xl:text-3xl 2xl:py-6"
            >
              Enquire about {service.title}
            </Link>
          </div>
        </aside>
      </section>

       {/* Service Gallery */}
        <ServiceGallery
          gallery={service.gallery}
          title={service.title}
        />
          
      {/* Mobile / tablet sticky enquire bar */}
      <div className="fixed text-gray-600 inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="truncate text-sm font-medium">{service.title}</p>
          <Link
            href={enquireHref}
            className="shrink-0 rounded-sm bg-[var(--red)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Enquire
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
