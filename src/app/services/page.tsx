import Banner from "@/components/banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import ServicesList from "@/components/home/Services";

export const metadata: Metadata = {
  title: "Orchestra, Recording and Music Services | Australian Indian Orchestra",
  description:
    "Explore Australian Indian Orchestra services including film scoring, live recording, concert production, private concerts and music lessons.",
  alternates: { canonical: "https://aio.org.au/services" },
};


export default function Services() {


  return (
    <main>
      <Navbar />
      <Banner
        heading="Our"
        highlight="Services"
        subheading="Become part of a growing community of creators, innovators and visionaries. Receive exclusive updates, opportunities and insights directly from AIO."
        image="/page-banner/service.png"
      />
      <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-12 my-8 md:my-16"> 
      <ServicesList />
      </div>

	    <Footer />
    </main>
  );
}
