"use client";
import Image from "next/image";
import FooterTourForm from "./FooterTourForm";

export default function Footer() {
  return (
    <footer
      className="relative py-12 px-6 overflow-hidden"
      style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Red glow bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl opacity-20 bg-[var(--red)]"/>

      <div className="max-w-8xl mx-auto relative z-10 lg:px-12">
        <FooterTourForm />
        <div className="grid md:grid-cols-5 gap-6 sm:gap-12 my-8 sm:my-12 2xl:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2 2xl:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <a href="/">
                  <Image
                    src="/logo.webp"
                    alt="Logo"
                    width={56}
                    height={36}
                    className="object-cover w-[74px] h-[54px] 2xl:w-[100px] 2xl:h-[100px]"
                    priority
                  />
                </a>
              </div>
              <span
                className="text-[10px] sm:text-xs font-semibold uppercase leading-snug tracking-wider 2xl:text-base"
              >
                Australian<br/>Indian<br/>Orchestra
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs 2xl:text-xl" style={{ color: "var(--grey)" }}>
              An 80-piece orchestra blending Indian classical and Western symphonic music into one unforgettable performance.
            </p>
          </div>

          {/* quick links  */}
           <div>
            <h4
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 sm:mb-5 2xl:text-2xl"
              style={{ color: "var(--red)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "2027 Tour", path: "/tour" },
                { name: "Join Us", path: "/join" },
                { name: "Contact Us", path: "/contact" },
                // { name: "Blogs", path: "/blog" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-sm transition-colors text-[var(--grey)] hover:text-[var(--white)] 2xl:text-2xl"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* explore */}
          <div>
            <h4
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 sm:mb-5 2xl:text-2xl"
              style={{ color: "var(--red)" }}
            >
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Our Videos", path: "/videos" },
                { name: "Gallery", path: "/gallery" },
                { name: "About", path: "/about" },
                { name: "Blogs", path: "/blog" },
                // { name: "Concert", path: "/concert" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-sm transition-colors text-[var(--grey)] hover:text-[var(--white)] 2xl:text-2xl"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 sm:mb-5 2xl:text-2xl"
              style={{ color: "var(--red)" }}
            >
              Contact
            </h4>
            <ul className="space-y-2 text-sm 2xl:text-2xl" style={{ color: "var(--grey)" }}>
              <li><a href="mailto:ausindorchestra@gmail.com">ausindorchestra@gmail.com</a></li>
              <li>Sydney, NSW, Australia</li>
              <li>
                <a
                  href="/contact"
                  className="transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red-light)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--grey)")}
                >
                  Book for Events →
                </a>
              </li>
            </ul>

             {/* Social links */}
            <div className=" grid grid-cols-1 mt-3 ">
              <div className="text-white/80 text-xs uppercase tracking-[0.3em] mb-3 2xl:text-xl">
              Follow Us
              </div>

              <div className="flex gap-3">
              {/* Instagram */}
              <a
                  href="https://www.instagram.com/ausindorchestra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-full bg-pink-700 hover:bg-[#D10F2F] flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#D10F2F]"
              >
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5 2xl:w-8 2xl:h-8"
                  >
                  <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0120 7.75v8.5A3.75 3.75 0 0116.25 20h-8.5A3.75 3.75 0 014 16.25v-8.5A3.75 3.75 0 017.75 4zm8.75 1a1.25 1.25 0 100 2.5A1.25 1.25 0 0016.5 5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                  </svg>
              </a>

              {/* Facebook */}
              <a
                  href="https://www.facebook.com/101399399609487"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-full bg-blue-500 hover:bg-[#D10F2F] flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#D10F2F]"
              >
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5 2xl:w-8 2xl:h-8"
                  >
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H8v3h2.4v8h3.1z" />
                  </svg>
              </a>

              {/* YouTube */}
              <a
                  href="https://www.youtube.com/@ausindorchestra/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-full bg-red-500 hover:bg-[#D10F2F] flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-[#D10F2F]"
              >
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5 2xl:w-8 2xl:h-8"
                  >
                  <path d="M21.8 8.001a2.75 2.75 0 00-1.936-1.946C18.153 5.5 12 5.5 12 5.5s-6.153 0-7.864.555A2.75 2.75 0 002.2 8.001 28.98 28.98 0 001.75 12c0 1.34.153 2.676.45 3.999a2.75 2.75 0 001.936 1.946C5.847 18.5 12 18.5 12 18.5s6.153 0 7.864-.555a2.75 2.75 0 001.936-1.946c.297-1.323.45-2.659.45-3.999 0-1.34-.153-2.676-.45-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
                  </svg>
              </a>
              </div>
            </div>

          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs 2xl:text-xl"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            color: "var(--grey)",
          }}
        >
          <span>© 2026 Australian Indian Orchestra. All rights reserved.
            <div className="text-left pt-1">
              <a href="/privacy-policy" className="text-[10px] text-gray-400 underline 2xl:text-lg"> Privacy Policy</a>
              <a href="/terms-and-conditions" className="text-[10px] text-gray-400 underline 2xl:text-lg"> and T&C</a>
            </div>
          </span>
          <span className="tracking-widest">CRAFTED WITH PASSION FOR MUSIC </span>
        </div>
        
      </div>
    </footer>
  );
}
