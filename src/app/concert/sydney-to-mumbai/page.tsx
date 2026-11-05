import type { Metadata } from "next";
import EventShowcase from "@/components/concert";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/banner";

export const metadata: Metadata = {
  title: "Sydney to Mumbai | Bollywood Concert Sydney | Australian Indian Orchestra",
  description:
    "Sydney to Mumbai: a landmark Bollywood symphony concert at Sydney Conservatorium of Music, 13 August 2023. 80+ musicians performing Bollywood and Australian fusion live on stage.",
  keywords: [
    "Sydney to Mumbai concert",
    "Bollywood concert Sydney",
    "Bollywood orchestra Sydney",
    "Indian orchestra Australia",
    "Indian music concert Sydney Conservatorium",
    "Australian Indian Orchestra",
    "best Bollywood concert Australia",
  ],
  alternates: {
    canonical: "https://aio.org.au/concert/sydney-to-mumbai",
  },
  openGraph: {
    title: "Sydney to Mumbai | Bollywood Concert Sydney | Australian Indian Orchestra",
    description:
      "A landmark Bollywood symphony concert at Sydney Conservatorium of Music — 80+ musicians bridging Australian and Indian culture live on stage.",
    url: "https://aio.org.au/concert/sydney-to-mumbai",
    images: [
      {
        url: "/sydney-to-mumbai/3.webp",
        width: 1200,
        height: 630,
        alt: "Australian Indian Orchestra Sydney to Mumbai Bollywood concert, Sydney Conservatorium of Music, August 2023",
      },
    ],
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  eventStatus: "https://schema.org/EventCompleted",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  name: "Sydney to Mumbai",
  description:
    "A landmark Bollywood symphony concert performed by the 80-piece Australian Indian Orchestra, bridging Australian and Indian musical cultures.",
  startDate: "2023-08-13",
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
  url: "https://aio.org.au/concert/sydney-to-mumbai",
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
            heading="SYDNEY TO "
            highlight="MUMBAI"
            subheading="A unique concert featuring the Australian Indian Orchestra and Symphony of Lights was held at the Sydney Conservatorium of Music on 10.11.23,
            creating a cultural experience unlike any other."
            image="/past-concert/banner/sydney-mumbai.png"
        />
        <EventShowcase

        featuredHeading = "SYDNEY TO MUMBAI | 13.08.23"
        programHeading = "Sydney to Mumbai Concert | 13.08.23"
        programDescription = "Unlock deeper insights into today's pieces. Access the full breakdown of conductors, tracking sequences, master repertoires, and individual musicians."

        videos={[
            {
              title: "Waltzing Matilda & Vande Mataram",
              youtubeId: "M6Su_OOdTSw",
            },
            {
            title: "Shree Ganeshay Dheemahi",
            youtubeId: "fRQ7imq7JOs",
            },
            {
            title: "Mere Dholna",
            youtubeId: "hxADrysvBS0",
            }, 
            { 
             title: "Mere naam tu",
            youtubeId: "YZzNyCvpE0o",
            }, 
            { 
             title: "Soja Soja",
            youtubeId: "cw6PZC6bUzk",
            }, 
             { 
             title: "Janam Janam",
            youtubeId: "ChovstN8SxQ",
            }, 
             { 
             title: "Dastaan-e-Om Shanti Om",
            youtubeId: "Y--CA8sZARQ",
            }, 
             { 
             title: "Breathless",
            youtubeId: "2J3jw3BqfDI",
            }, 
            { 
             title: "Abhi Mujh Mein Kahin",
            youtubeId: "DZBnXnk4_hw",
            }, 
            { 
             title: "O Saathi Re",
            youtubeId: "SGLNmYvpmPI",
            },
            
        ]}

        pdfTitle="Symphony of Lights: A Spectacular Concert Event"
        pdfUrl="/pdf/Sydney-to-Mumbai-Program-PRINT-3mm-Bleed.pdf"
        />
        <Footer></Footer>
    </main>
  );
}
