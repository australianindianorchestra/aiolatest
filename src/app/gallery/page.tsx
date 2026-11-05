import Banner from "@/components/banner";
import Footer from "@/components/Footer";
import Gallery from "@/components/gallery";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Indian Orchestra Sydney | Australian Indian Orchestra",
  description:
    "Browse photos from Australian Indian Orchestra concerts — A.R. Rahman in Symphony, Sydney to Mumbai, Symphony of Lights, Chorus Mandala, and more. High-quality images from Australia's premier Bollywood symphony orchestra.",
  keywords: [
    "Australian Indian Orchestra gallery",
    "Bollywood concert photos Sydney",
    "Indian orchestra Australia photos",
    "AIO orchestra Sydney gallery",
  ],
  alternates: {
    canonical: "https://aio.org.au/gallery",
  },
};

export default function GalleryPage() {
    return (
        <main>
            <Navbar />
            <Banner
            heading="Our"
            highlight="Gallery"
            subheading="Explore unforgettable performances, celebrations, and musical moments from our journey."
            />
            <Gallery />
            <Footer /> 
        </main>
    );
}