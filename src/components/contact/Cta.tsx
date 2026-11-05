"use client";

export default function Cta() {
    return(
        <section className="relative py-16 sm:py-32 px-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('ar-rehman/7.webp')",
          }}
        />

        <div className="absolute inset-0 bg-black/80" />

        <div className="relative max-w-5xl mx-auto">
          <div className="backdrop-blur-sm bg-black/[0.5] border border-white/10 rounded-[40px] p-4 md:p-10 text-center">          
            <h2 className="text-2xl md:text-5xl 2xl:text-6xl font-black mt-5 capitalize leading-snug tracking-tight"style={{ lineHeight: "1.3" }}>
              Ready To Create An
              <br />
              <span className="text-[#D10F2F]">
                 Unforgettable Evening?
              </span>
            </h2>

            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-sm md:text-base 2xl:text-2xl ">
              Let's bring together musicians, culture and storytelling through
              the power of live performance.
            </p>

            <button className="mt-10 bg-[#D10F2F] hover:bg-[#F2183F] px-4 md:px-10 py-4 transition text-sm md:text-base 2xl:text-2xl">
              Start Your Booking
            </button>
          </div>
        </div>
        </section>
    );
}