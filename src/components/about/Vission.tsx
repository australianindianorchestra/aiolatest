"use client";
import Image from "next/image";

export default function Vission() {
  return (
      <section className="mb-8 md:mb-16 mt-0 md:mt-16 2xl:mb-24">
        <div className="max-w-8xl mx-auto px-6 text-black lg:px-12">

          <div className="mb-3 md:mb-8">
             <h2 className=" text-2xl md:text-4xl 2xl:text-6xl leading-snug font-bold uppercase text-[var(--deep)] tracking-snug">
                What <span className=" text-[var(--red)]">Drives Us?</span>
              </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            {[
              {
                title: "Our Vision",
                img: "/about-vision.jpeg",
                desc: "To connect Australians and Indians through music."
              },
              {
                title: "Our Mission",
                img: "/string-sensation/6.webp",
                desc: "Presenting Indian music through western symphonic forms."
              },
              {
                title: "Our Artists",
                img: "/banner-1.webp",
                desc: "Uniting exceptional musicians from diverse backgrounds."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-base bg-red/[0.05] border border-black/20"
              >
                <div className="relative h-40 md:h-80 overflow-hidden 2xl:h-[500px]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="py-2 md:py-4 px-4" >
                  <h3 className="text-lg md:text-xl 2xl:text-3xl mb-1 font-semibold ">
                    {item.title}
                  </h3>

                  <p className="text-sm md:text-base 2xl:text-2xl text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

  );
}