import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Australian Indian Orchestra",
  description: "Review the terms for using the Australian Indian Orchestra website, including information about events, ticketing and payments.",
  alternates: { canonical: "https://aio.org.au/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing and using this website, you agree to comply with these Terms & Conditions.",
    },
    {
      title: "Website Use",
      content:
        "You agree to use the website lawfully, provide accurate information, and refrain from activities that may compromise website security or functionality.",
    },
    {
      title: "Intellectual Property",
      content:
        "All website content including logos, graphics, text, videos, photographs, music, and design elements are owned by or licensed to Australian Indian Orchestra.",
    },
    {
      title: "Event Information",
      content:
        "Concert dates, venues, performers, schedules, and programs may change without notice. AIO reserves the right to modify, postpone, or cancel events where necessary.",
    },
    {
      title: "Ticketing & Payments",
      content:
        "Ticket purchases may be subject to the policies of third-party ticketing providers. Refund eligibility will be governed by the relevant provider's terms.",
    },
    {
      title: "Newsletter Communications",
      content:
        "Subscribers may receive event announcements, promotional communications, and organisational updates. Unsubscribe options are available in all marketing emails.",
    },
    {
      title: "Third-Party Links",
      content:
        "Our website may contain links to external websites. We are not responsible for the content, services, or privacy practices of those websites.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Australian Indian Orchestra shall not be liable for indirect, incidental, or consequential damages arising from the use of this website.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms & Conditions are governed by applicable Australian laws.",
    },
  ];

  return (
    <>
      <Header />
        <Banner
            heading="Terms & "
            highlight="Conditions"
            subheading="Terms governing your use of the Australian Indian Orchestra
              website and related services."
        />
      <main className="bg-white">
        {/* Content */}
        <section className="pb-20">
          <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="my-4 text-sm text-gray-400">
              Last Updated: July 29, 2026
            </p>
            <div className="space-y-6">
              {sections.map((section) => (
                <div
                  key={section.title}
                >
                  <h2 className="text-base uppercase font-semibold text-[var(--deep)] leading-8">
                    {section.title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}

              <div className="bg-[#F7F3F0] rounded-3xl p-8">
                <h3 className="text-base font-bold text-[var(--deep)] leading-8">
                  Contact
                </h3>

                <p className="text-gray-500 leading-relaxed text-sm">
                  If you have any questions regarding these Terms &
                  Conditions, please contact Australian Indian Orchestra
                  through our Contact page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
