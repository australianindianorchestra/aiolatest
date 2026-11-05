import type { Metadata } from "next";
import ARRahmanClient from "./ARRahmanClient";

export const metadata: Metadata = {
  title: "The Music of A.R. Rahman in Symphony | Australian Indian Orchestra",
  description:
    "Experience A.R. Rahman's greatest film scores performed live by a full 80-piece symphony orchestra. Australia's premier A.R. Rahman tribute concert — Bollywood melodies meet symphonic grandeur in Sydney.",
  keywords: [
    "A.R. Rahman symphony concert",
    "A.R. Rahman orchestra Sydney",
    "A.R. Rahman tribute concert Australia",
    "A.R. Rahman live concert",
    "Bollywood orchestra Sydney",
    "Indian orchestra Australia",
    "Australian Indian Orchestra",
  ],
  alternates: {
    canonical: "https://aio.org.au/concert/a-r-rahman-in-symphony",
  },
  openGraph: {
    title: "The Music of A.R. Rahman in Symphony | Australian Indian Orchestra",
    description:
      "Experience A.R. Rahman's greatest scores performed live by a full Bollywood symphony orchestra in Sydney.",
    url: "https://aio.org.au/concert/a-r-rahman-in-symphony",
    images: [
      {
        url: "/ar-rehman/3.webp",
        width: 1200,
        height: 630,
        alt: "Australian Indian Orchestra performing The Music of A.R. Rahman in Symphony, Sydney",
      },
    ],
  },
};

// Event structured data
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "The Music of A.R. Rahman in Symphony",
  description:
    "A.R. Rahman's iconic film scores performed live by the 80-piece Australian Indian Orchestra — Bollywood melodies meet the grandeur of a full symphony orchestra.",
  contributor: {
    "@type": "MusicGroup",
    name: "Australian Indian Orchestra",
    url: "https://aio.org.au",
  },
  about: { "@type": "Person", name: "A. R. Rahman" },
  image: "https://aio.org.au/ar-rehman/3.webp",
  url: "https://aio.org.au/concert/a-r-rahman-in-symphony",
};

export default function ARRahmanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <ARRahmanClient />
    </>
  );
}
