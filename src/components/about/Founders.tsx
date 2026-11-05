"use client";
import Image from "next/image";

export default function Founders() {
  return (
      <section className="py-12 md:py-24 bg-gradient-to-b from-black to-[#080808]">
        <div className="max-w-8xl mx-auto px-6 lg:px-12">

          <div className="mb-8 ">
            <h2 className=" text-2xl sm:text-3xl md:text-4xl 2xl:text-6xl leading-snug font-bold uppercase text-white tracking-snug">
              Meet The <span className=" text-[var(--red)]">Founders</span> 
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/founders/sagar-narang.webp"
                  alt="Sagar"
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="p-4 md:p-8 flex flex-col gap-1">
                <h3 className="text-base md:text-xl font-semibold 2xl:text-4xl">
                  Sagar Nagaraj
                </h3>

                <p className="text-sm md:text-base text-[#D10F2F] 2xl:text-2xl">
                  Co-Founder
                </p>

                <p className="text-sm text-gray-400 2xl:text-2xl">
                 Born in 1997, Sagar began violin lessons at the age of 8. Rising through the Sydney and Australian Youth Orchestras, he has performed with artists like Andrea Bocelli, Delta Goodrem, and Il Divo in concert halls throughout Australia, Europe, and Asia. In 2018 he had the incredible opportunity to tour with the Australian World Orchestra to India, where he saw the impact that orchestral music made on Indian audiences. 
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/founders/suraj-narang.webp"
                  alt="Suraj"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 md:p-8 flex flex-col gap-1">
                <h3 className="text-base md:text-xl font-semibold 2xl:text-4xl">
                  Suraj Nagaraj
                </h3>

                <p className="text-sm md:text-base text-[#D10F2F] 2xl:text-2xl">
                  Co-Founder
                </p>

                <p className="text-sm text-gray-400 2xl:text-2xl">
                  Born in 2002, Suraj began violin lessons at the age of 4 after being inspired by his brother. With a keen ear, Suraj was able to apply his expertise on western violin to Indian classical and film music. As a result he was in high-demand as the violinist for Indian community concerts. In 2023, Suraj picked up the conductor’s baton and debuted with the 60-piece Australian Indian Orchestra and Singers performing his bespoke arrangements
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

  );
}