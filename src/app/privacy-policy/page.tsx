import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Australian Indian Orchestra",
  description: "Read how the Australian Indian Orchestra handles information submitted through its website, forms and event registrations.",
  alternates: { canonical: "https://aio.org.au/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content:
        "We may collect information such as your name, email address, phone number, event registration details, newsletter subscriptions, and messages submitted through our contact forms.",
    },
    {
      title: "How We Use Your Information",
      content:
        "Information is used to respond to enquiries, manage event registrations, send updates about performances, improve website functionality, and provide relevant communications regarding Australian Indian Orchestra activities.",
    },
    {
      title: "Cookies & Analytics",
      content:
        "Our website may use cookies and analytics tools to improve user experience, understand visitor behaviour, and enhance website performance.",
    },
    {
      title: "Third-Party Services",
      content:
        "We may engage trusted third-party providers for ticketing, payment processing, email communications, and website analytics. These providers only receive information necessary to perform their services.",
    },
    {
      title: "Data Security",
      content:
        "We implement reasonable security measures to protect your information. However, no online transmission or storage method can be guaranteed to be completely secure.",
    },
    {
      title: "Your Rights",
      content:
        "You may request access, correction, or deletion of your personal information where permitted by applicable law.",
    },
    {
      title: "Changes To This Policy",
      content:
        "We may update this Privacy Policy from time to time. Any revisions will be posted on this page with an updated effective date.",
    },
  ];

  return (
    <>
      <Header />
        <Banner
        heading="Privacy"
        highlight="Policy"
        subheading="Learn how Australian Indian Orchestra collects, uses, stores, and protects your information."
        />
      <main className="bg-white">
        {/* Content */}
        <section className="pb-20">
          <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
            <p className="my-4 text-sm text-gray-400">
              Last Updated: July 29, 2026
            </p>
            <div className="space-y-6">
              <div>
                <h2 className="text-base uppercase font-bold text-[var(--deep)] leading-8">
                  Introduction
                </h2>

                <p className="text-gray-500 leading-relaxed text-sm">
                  Australian Indian Orchestra ("AIO", "we", "our", or "us")
                  respects your privacy and is committed to protecting
                  the personal information you provide while using our
                  website and services.
                </p>
              </div>

              {sections.map((section) => (
                <div
                  key={section.title}
                >
                  <h3 className="text-base uppercase font-semibold text-[var(--deep)] leading-8">
                    {section.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed text-sm">
                    {section.content}
                  </p>
                </div>
              ))}

              <div className="bg-[#F7F3F0] rounded-3xl p-8">
                <h3 className="text-base font-bold text-[var(--deep)] leading-8">
                  Contact Us
                </h3>

                <p className="text-gray-500 leading-relaxed text-sm">
                  If you have questions regarding this Privacy Policy,
                  please contact Australian Indian Orchestra through
                  our Contact page.
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
