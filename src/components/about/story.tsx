"use client";
import Image from "next/image";

export default function Story() {
  return (
      <section className="py-8 2xl:my-16">
        <div className="max-w-8xl mx-auto px-6 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 md:gap-16 items-center text-black lg:px-12">

          <div className="relative h-[500px] 2xl:h-[700px] w-full rounded-3xl overflow-hidden">
            <Image
              src="/sydney-to-mumbai/3.webp"
              alt="AIO Story"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 md:gap-8">
            <div className="max-w-4xl mx-auto text-left relative z-10 2xl:max-w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-6xl leading-snug font-bold uppercase text-[var(--deep)] tracking-snug">
                Connecting Cultures <span className="text-[var(--red)]">Through Music</span>
              </h2>
            </div>
            
            <div className="space-y-2 text-gray-500 leading-relaxed text-sm md:text-base 2xl:text-2xl text-left">
              <p>
                Founded in 2023 by brothers Sagar and Suraj Nagaraj,
                the Australian Indian Orchestra combines a Western
                symphony orchestra with Indian instruments and vocals.
              </p>

              <p>
                Our performances celebrate cultural unity through
                innovative arrangements that bring together two rich
                musical traditions.
              </p>

              <p>
                Every concert aims to inspire audiences and musicians
                alike while strengthening the connection between
                Australia and India through the universal language
                of music.
              </p>
            </div>
          </div>

        </div>
      </section>
  );
}