import type { Metadata } from "next";
import EventShowcase from "@/components/concert";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/banner";

export const metadata: Metadata = {
  title: "Symphony of Lights | Bollywood Orchestra Concert Sydney | Australian Indian Orchestra",
  description:
    "Symphony of Lights: a spectacular Bollywood orchestra concert held at Sydney Conservatorium of Music, 10 November 2023. Indian fusion, dance, and tabla meets a full symphony orchestra.",
  keywords: [
    "Symphony of Lights concert",
    "Bollywood concert Sydney",
    "Bollywood orchestra Sydney",
    "Indian fusion music concert Sydney",
    "Indian orchestra Sydney",
    "Indian music concert Sydney Conservatorium",
    "Australian Indian Orchestra",
  ],
  alternates: {
    canonical: "https://aio.org.au/concert/symphony-of-lights",
  },
  openGraph: {
    title: "Symphony of Lights | Bollywood Orchestra Concert Sydney | Australian Indian Orchestra",
    description:
      "A spectacular Bollywood symphony concert at Sydney Conservatorium of Music — Indian fusion, tabla and dance meets a full orchestra.",
    url: "https://aio.org.au/concert/symphony-of-lights",
    images: [
      {
        url: "/symphony-of-lights/10.webp",
        width: 1200,
        height: 630,
        alt: "Australian Indian Orchestra Symphony of Lights concert, Sydney Conservatorium of Music, November 2023",
      },
    ],
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  eventStatus: "https://schema.org/EventCompleted",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  name: "Symphony of Lights",
  description:
    "A spectacular Bollywood orchestra concert featuring Indian fusion, tabla, and dance performed by the Australian Indian Orchestra at Sydney Conservatorium of Music.",
  startDate: "2023-11-10",
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
  url: "https://aio.org.au/concert/symphony-of-lights",
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
            heading="Symphony of "
            highlight="lights"
            subheading="A unique concert featuring the Australian Indian Orchestra and Symphony of Lights was held at the Sydney Conservatorium of Music on 10.11.23,
            creating a cultural experience unlike any other."
            image="/past-concert/banner/symphony-of-lights.png"
        />
        <EventShowcase

        featuredHeading = "Symphony of lights | 10.11.23"
        programHeading = "Symphony of Lights: A Spectacular Concert Event"
        programDescription = "Unlock deeper insights into today's pieces. Access the full breakdown of conductors, tracking sequences, master repertoires, and individual musicians."

        videos={[
            {
              title: "JAI HO",
              youtubeId: "eIGwm5fOfoU",
            },
            {
            title: "Mere Dholna | Orchestra x Dance",
            youtubeId: "-RDLEGxoF8I",
            },
            {
            title: "Orchestra & Tabla Fusion | Beethoven 5",
            youtubeId: "mV2_dHyA_ls",
            }, 
            { 
             title: "I Still Call Australia Home",
            youtubeId: "c0UuQEGa2uM",
            }, 
             { 
             title: "Kal Ho Naa Ho",
            youtubeId: "s2ZXptuxtKw",
            }, 
        ]}

        pdfTitle="Symphony of Lights: A Spectacular Concert Event"
        pdfUrl="/pdf/Concert-Program.pdf"
        />
        <Footer></Footer>
    </main>
  );
}
