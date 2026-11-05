import type { Metadata } from "next";
import EventShowcase from "@/components/concert";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/banner";
import StandaloneGallery from "@/components/gallery-standalone";

export const metadata: Metadata = {
  title: "Chorus Mandala — 8-Piece Choir & Chamber Orchestra | Australian Indian Orchestra",
  description:
    "Chorus Mandala: an intimate 8-piece choir and chamber orchestra concert at the Sydney Conservatorium of Music. Indian classical fusion performed live by the Australian Indian Orchestra.",
  keywords: [
    "Chorus Mandala concert",
    "Indian choir Sydney",
    "chamber orchestra Sydney",
    "Indian classical fusion orchestra Australia",
    "Australian Indian Orchestra",
    "Indian music concert Sydney Conservatorium",
  ],
  alternates: {
    canonical: "https://aio.org.au/concert/chorus-mandala",
  },
  openGraph: {
    title: "Chorus Mandala — 8-Piece Choir & Chamber Orchestra | Australian Indian Orchestra",
    description:
      "An intimate 8-piece choir and chamber orchestra concert at Sydney Conservatorium of Music by the Australian Indian Orchestra.",
    url: "https://aio.org.au/concert/chorus-mandala",
    images: [
      {
        url: "/chorus-mandala/1.webp",
        width: 1200,
        height: 630,
        alt: "Chorus Mandala — Australian Indian Orchestra choir and chamber orchestra concert, Sydney Conservatorium of Music",
      },
    ],
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  startDate: "2025-04-13",
  eventStatus: "https://schema.org/EventCompleted",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  name: "Chorus Mandala — 8-Piece Choir & Chamber Orchestra",
  description:
    "An intimate concert featuring an 8-piece choir and chamber orchestra, performed by the Australian Indian Orchestra at the Sydney Conservatorium of Music.",
  location: {
    "@type": "Place",
    name: "Sydney Conservatorium of Music",
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
  url: "https://aio.org.au/concert/chorus-mandala",
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
            heading="8-piece choir & "
            highlight="Chorus Mandala"
            subheading="A unique concert featuring the Australian Indian Orchestra and Chorus Mandala will be held at the Sydney Conservatorium of Music on 13 April 2025.,
            creating a cultural experience unlike any other."
            image="/past-concert/banner/chorus-mandala.png"
        />
        <EventShowcase
        title="chamber orchestra "
        subtitle="Where Indian melodies meet the grandeur of a symphony orchestra."

        heroImage="/events/arrahman/hero.webp"

        featuredHeading = "8-piece choir & chamber orchestra"
        programHeading = "Chorus Mandala Concert at Sydney Conservatorium of Music"
        programDescription = "Unlock deeper insights into today's pieces. Access the full breakdown of conductors, tracking sequences, master repertoires, and individual musicians."


        videos={[
          {
            title: "Khwaja Mere Khwaja",
            youtubeId: "zYZrwMcssuo",
          },
          {
          title: "Bombay BGM Theme",
          youtubeId: "KgZigu3i_oU",
          },
          {
          title: "Tu Hi Re",
          youtubeId: "HarY54VPpks",
          },      
        ]}

        pdfTitle="Chorus Mandala Concert at Sydney Conservatorium of Music"
        pdfUrl="/pdf/Chorus-Mandala-Program.pdf"
        />
        <Footer></Footer>
    </main>
  );
}
