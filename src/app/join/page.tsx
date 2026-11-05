import Banner from "@/components/banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/JoinUs";
import Image from "next/image";
import { Zap, Shield, Target, Users } from 'lucide-react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Australian Indian Orchestra",
  description:
    "Sign up for Australian Indian Orchestra updates about auditions, volunteer roles and opportunities to take part in upcoming projects.",
  alternates: { canonical: "https://aio.org.au/join" },
};


export default function JoinUsPage() {
  // Define an array of components to match the items
  const iconList = [Zap, Shield, Target, Users];

  const benefitItems = [
    {
      title: "Career Opportunities",
      text: "Stay informed about open positions, auditions, volunteer roles, and new opportunities to join our team."
    },
    {
      title: "Be Part of Our Mission",
      text: "Contribute your skills and passion to meaningful projects that make an impact."
    },
    {
      title: "Learn & Grow",
      text: "Gain valuable experience, collaborate with talented individuals, and develop your skills in a supportive environment."
    },
    {
      title: "Join Our Community",
      text: "Connect with like-minded people, build lasting relationships, and be part of a vibrant and creative team."
    }
  ];

  return (
    <main>
      <Navbar />
      <Banner
        heading="Join Our"
        highlight="team"
        subheading="Become part of a growing community of creators, innovators and visionaries. Receive exclusive updates, opportunities and insights directly from AIO."
        image="/page-banner/join.png"
      />

      {/* BENEFITS */}
      <section className="py-8 md:py-24 bg-[#faf7f7]">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">
          <div className="text-left mb-4 md:mb-12 relative z-10">
            <h2 className=" text-xl sm:text-2xl md:text-4xl 2xl:text-6xl leading-tight font-bold uppercase text-[var(--deep)] tracking-tight">
               More Than a <span className=" text-[var(--red)]">Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 md:gap-8 gap-2">
            {benefitItems.map((item, i) => {
              const Icon = iconList[i]; // Assign the icon based on index
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-4 md:p-8 shadow-xl shadow-red-100 hover:-translate-y-2 transition"
                >
                  <div className="flex gap-2 items-start flex-col md:items-start">
                    <div className="w-10 h-10 md:w-14 md:h-14 2xl:h-16 2xl:w-16  rounded-2xl bg-[#D10F2F]/10 flex items-center justify-center text-[#D10F2F]">
                      {/* Render the icon component */}
                      <Icon />
                    </div>

                    <h3 className=" text-sm md:text-xl 2xl:text-3xl font-bold text-[#760618]">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-gray-600 text-sm md:text-base 2xl:text-xl">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="relative overflow-hidden bg-gray-50">
        <div
          className="absolute inset-x-0 top-0 h-full bg-no-repeat opacity-10 -scale-x-100"
         style={{
          backgroundImage: `
            linear-gradient(
              rgba(118, 6, 24, 0.3),
              rgba(118, 6, 24, 0.3)
            ),
            url('/aio-section-bg.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        />
        <div className="max-w-8xl mx-auto px-6 lg:px-12 md:py-24 py-12">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative h-[500px] rounded-[40px] overflow-hidden 2xl:h-[700px]">
              <Image
                src="/banner-1.webp"
                alt="Community"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              
              <div className="max-w-4xl mx-auto text-left md:text-left relative z-10">

                <h2 className=" text-2xl md:text-5xl 2xl:text-6xl leading-snug font-bold uppercase text-[var(--deep)] tracking-snug">
                  A Network Built Around <span className=" text-[var(--red)]">Creativity</span>
                </h2>

                <p className="mt-3 text-gray-600  text-sm md:text-base 2xl:text-2xl ">
                  Join a growing community of creative individuals, innovators, and forward-thinkers who share a passion for exploring new ideas and challenging possibilities. Connect with people who value creativity, innovation, and meaningful collaboration.<br/><br/>

                  Discover opportunities to exchange knowledge, share experiences, and work together on projects that inspire positive change. Every connection brings new perspectives, fresh ideas, and the potential to create something meaningful.<br/><br/>

                  Together, we’re building an ecosystem where creativity thrives, ideas turn into action, and individuals grow through collaboration, shared experiences, and a collective drive to make a lasting impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsLetter />
	    <Footer />
    </main>
  );
}
