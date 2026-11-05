import type { Metadata } from "next";
import EventShowcase from "@/components/concert";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/banner";

export const metadata: Metadata = {
  title: "Indian String Sensations | Australian Indian Orchestra",
  description:
    "Indian String Sensations: a unique medley of Indian film songs arranged by Suraj Nagaraj, performed live by the Australian Indian Orchestra. Bollywood orchestra concert, Sydney, 27 November 2022.",
  keywords: [
    "Indian string sensations",
    "Bollywood orchestra Sydney",
    "Suraj Nagaraj orchestra",
    "Nagaraj brothers orchestra",
    "Indian orchestra Australia",
    "Australian Indian Orchestra",
    "Bollywood live orchestra concert",
  ],
  alternates: {
    canonical: "https://aio.org.au/concert/strings-sensations",
  },
  openGraph: {
    title: "Indian String Sensations | Australian Indian Orchestra",
    description:
      "A unique medley of Indian film songs arranged by Suraj Nagaraj — live Bollywood orchestra concert in Sydney.",
    url: "https://aio.org.au/concert/strings-sensations",
    images: [
      {
        url: "/string-sensation/6.webp",
        width: 1200,
        height: 630,
        alt: "Australian Indian Orchestra performing Indian String Sensations, Sydney, 27 November 2022",
      },
    ],
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  eventStatus: "https://schema.org/EventCompleted",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  name: "Indian String Sensations",
  description:
    "A unique medley of Indian film songs arranged for orchestra by Suraj Nagaraj, performed live by the Australian Indian Orchestra in Sydney.",
  startDate: "2022-11-27",
  location: {
    "@type": "Place",
    name: "Sydney",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
  },
  performer: {
    "@type": "PerformingGroup",
    name: "Australian Indian Orchestra",
    url: "https://aio.org.au",
  },
  organizer: {
    "@type": "Organization",
    name: "Australian Indian Orchestra",
    url: "https://aio.org.au",
  },
  url: "https://aio.org.au/concert/strings-sensations",
};

export default function ARRahmanPage() {
  return (
    <main >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
        <Navbar />
        <Banner
            heading="Indian String "
            highlight="Sensations"
            subheading=" A unique medley of Indian film songs arranged by Suraj Nagaraj."
            image="/past-concert/banner/string-sensation.png"
        />
        <EventShowcase

        featuredHeading = "indian string sensations | 27.11.22"
        programHeading = "program"
        programDescription = ""

        videos={[
          {
            title: "indian string sensations",
            youtubeId: "hE1ESDNVmi0",
          },
          {
          title: "indian string sensations",
          youtubeId: "hE1ESDNVmi0",
          },
        ]}

        pdfTitle="String Sensation"
        pdfUrl="/pdf/RCO-Program-ACTUAL-FINAL.pdf"
        />
        <Footer></Footer>
    </main>
  );
}
