import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/banner";
import ContactForm from "@/components/contact/ContactForm";
import ContactCta from "@/components/contact/Cta";
import ContactInfo from "@/components/contact/ContactInfo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Book the Australian Indian Orchestra for Your Event",
  description: "Contact the Australian Indian Orchestra about live performances for events, venues and festivals, including corporate functions and private celebrations.",
  keywords: [
    "book Australian Indian Orchestra",
    "hire Indian orchestra Sydney",
    "Bollywood orchestra booking Australia",
    "AIO orchestra contact",
  ],
  alternates: {
    canonical: "https://aio.org.au/contact",
  },
};
export default function ContactPage() {
  return (
    <main className="bg-[#050505] text-white">
      <Navbar />

      {/* HERO */}
      <Banner
        heading="Get in"
        highlight="Touch"
        subheading="From grand concert halls to intimate celebrations, we bring world-class live music experiences that leave lasting memories."
        image="/page-banner/contact.png"
      />
      <ContactInfo />
      <ContactForm />
      <ContactCta />
      

      <Footer />
    </main>
  );
}