import Banner from "@/components/banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/JoinUs";
import Story from "@/components/about/story";
import Vission from "@/components/about/Vission";
import Founders from "@/components/about/Founders";
import Cta from "@/components/about/Cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Australian Indian Orchestra | AIO",
  description:
    "Learn about the Australian Indian Orchestra, its founders Sagar and Suraj Nagaraj, and its work bringing Indian classical, Bollywood film and fusion music to the symphony stage.",
  keywords: [
    "Australian Indian Orchestra",
    "AIO orchestra Sydney",
    "Nagaraj brothers orchestra",
    "Indian orchestra Australia",
    "Bollywood symphony orchestra",
    "Sagar Nagaraj",
    "Suraj Nagaraj",
  ],
  alternates: {
    canonical: "https://aio.org.au/about",
  },
  openGraph: {
    title: "About the Australian Indian Orchestra | AIO",
    description:
      "Meet the founders and learn about the Australian Indian Orchestra's work in Indian classical, Bollywood film and symphonic music.",
    url: "https://aio.org.au/about",
    images: [
      {
        url: "/banner-1.webp",
        width: 1200,
        height: 630,
        alt: "Australian Indian Orchestra about page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About the Australian Indian Orchestra | AIO",
    description:
      "Meet the founders and learn about the Australian Indian Orchestra's work in symphonic music.",
    images: ["/banner-1.webp"],
  },
};


export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <Banner
          heading="About "
          highlight="AIO"
          subheading=" Where Indian melodies meet the grandeur of a Western Symphony,
          creating a cultural experience unlike any other."
          image="/page-banner/about.png"
      />
      <Story />
      <Vission />
      <Founders />
      <Cta />
      <NewsLetter />

      <Footer />
    </main>
  );
}
