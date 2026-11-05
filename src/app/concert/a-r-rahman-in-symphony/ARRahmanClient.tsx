"use client";

import EventShowcase from "@/components/concert";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Banner from "@/components/banner";

export default function ARRahmanClient() {
  const slug = "ar-rahman";
  return (
    <main>
      <Navbar />
      <Banner
        heading="The music of A.R. Rahman in "
        highlight="Symphony"
        subheading="Where Indian melodies meet the grandeur of a symphony orchestra, creating a cultural experience unlike any other."
        image="/past-concert/banner/ar-rahman-concert.png"
      />
      <EventShowcase
        slug={slug}
        title="THE MUSIC OF A.R. RAHMAN IN SYMPHONY"
        subtitle="Where Indian melodies meet the grandeur of a symphony orchestra."
        heroImage="/events/arrahman/hero.webp"
        videos={[
          {
            title: "Ramayana",
            youtubeId: "R6kKNcgxNjw",
          },
          { title: "Airtel Theme", youtubeId: "MJ78Wj8PpoE" },
          { title: "Oruvan Oruvan", youtubeId: "MzuSW_i6vsk" },
          { title: "Taal Se Taal", youtubeId: "hEVnBbSapb4" },
          { title: "Maa Tujhe Salaam", youtubeId: "ydPGNrDP6hA" },
          { title: "Jai Ho", youtubeId: "cUQUzhOaeqI" },
          { title: "Music of Roja", youtubeId: "8u7ryhEh6qQ" },
          { title: "Khwaja Mere Khwaja", youtubeId: "zYZrwMcssuo" },
        ]}
        pdfTitle="A.R. Rahman In Symphony Program"
        pdfUrl="/pdf/ARR-CONCERT-PROGRAM.pdf"
      />
      <Footer />
    </main>
  );
}
