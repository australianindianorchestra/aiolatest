import type { Metadata } from "next";
import EventShowcase from "@/components/concert";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/banner";

export const metadata: Metadata = {
  title: "A Musical Welcome to Prime Minister Narendra Modi | Australian Indian Orchestra",
  description:
    "Watch the Australian Indian Orchestra's musical welcome for Prime Minister Narendra Modi, featuring Indian music and orchestra performance.",
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
    canonical: "https://aio.org.au/concert/welcome-pm-narendra-modi",
  },
  openGraph: {
    title: "A Musical Welcome to Prime Minister Narendra Modi | Australian Indian Orchestra",
    description:
      "A spectacular Bollywood symphony concert at Sydney Conservatorium of Music — Indian fusion, tabla and dance meets a full orchestra.",
    url: "https://aio.org.au/concert/welcome-pm-narendra-modi",
    images: [
      {
        url: "/past-concert/modi_ji.jpeg",
        width: 1200,
        height: 630,
        alt: "Australian Indian Orchestra Symphony of Lights concert, Sydney Conservatorium of Music, November 2023",
      },
    ],
  },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "A Musical Welcome to Prime Minister Narendra Modi",
  description:
    "A spectacular Bollywood orchestra concert featuring Indian fusion, tabla, and dance performed by the Australian Indian Orchestra at Sydney Conservatorium of Music.",
  contributor: {
    "@type": "MusicGroup",
    name: "Australian Indian Orchestra",
    url: "https://aio.org.au",
  },
  url: "https://aio.org.au/concert/welcome-pm-narendra-modi",
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
            heading="A Musical Welcome to  "
            highlight="PM Modi"
            subheading="A vibrant musical celebration to warmly welcome Hon’ble Prime Minister Shri Narendra Modi with unity, pride, and enthusiasm."
            image="/past-concert/banner/welcome-concert.png"
        />
        <section className="max-w-8xl mx-auto px-4 flex flex-col gap-8 mt-12 lg:px-12">
          {/* Prime Minister's reaction */}
          <div className="bg-white md:pr-8 relative">
              <div className="">
                <span
                  aria-hidden="true"
                  className="absolute -top-5 select-none font-serif text-7xl font-black leading-none text-[var(--red)] md:text-8xl"
                >
                  &ldquo;
                </span>
                <p className="pt-4 md:pt-8 pl-4 md:pl-8 text-sm sm:text-base 2xl:text-xl leading-relaxed text-neutral-800 ">
                  The Prime Minister praised the Australian-India Orchestra’s rendition
                  of &apos;Maa Tujhe Salaam,&apos; highlighting music’s role in
                  strengthening Australia–India people-to-people ties. He said the
                  performance beautifully showcased how music unites people and
                  celebrated the global legacy of &apos;Vande Mataram&apos; on its 150th
                  anniversary. The PM applauded the fusion of Australia’s Didgeridoo and
                  India’s Tabla, and praised local Kathak artists for promoting Indian
                  classical dance in Australia.
                </p>
              </div>
          </div>

          {/* Founders' quote */}
          <div className="bg-[#faf9f6] py-8 sm:py-12 px-4 md:px-8">
              <blockquote className="border-l-2 border-[var(--red)] pl-4">
                <p className="text-sm sm:text-base 2xl:text-xl leading-relaxed text-neutral-800">
                  &quot;Music has no borders. Performing for Prime Minister Modi on
                  Australian soil was a profound reminder of why we do what we do - to
                  celebrate our heritage and bring two great nations closer through the
                  universal language of music.&quot;
                </p>
                <footer className="mt-6 text-xs font-bold uppercase tracking-widest text-[var(--red)] 2xl:text-base">
                  — Sagar &amp; Suraj Nagaraj, Founders, Australian Indian Orchestra
                </footer>
              </blockquote>
          </div>
        </section>

        <EventShowcase
        featuredHeading = "Symphony of lights | 10.11.23"
        programHeading = "Symphony of Lights: A Spectacular Concert Event"
        programDescription = "Unlock deeper insights into today's pieces. Access the full breakdown of conductors, tracking sequences, master repertoires, and individual musicians."

        videos={[
            {
              title: "Maa Tujhe Salaam | 10-piece Orchestra | Modi Welcome Performance in Australia",
              youtubeId: "G05-v5l9bj0",
            },
            {
            title: "Narendra Modi receives our Didgeridoo & Tabla Welcome",
            youtubeId: "ilqoqOLJ23Y",
            },
        ]}

        pdfTitle=""
        pdfUrl=""
        />
        <Footer></Footer>
    </main>
  );
}
