import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Page Not Found | Australian Indian Orchestra",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[calc(100svh_-_80px)] items-center justify-center overflow-hidden bg-white px-6 py-20 text-center text-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,16,46,0.035),transparent_58%)]" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="text-[clamp(5rem,14vw,8rem)] font-black leading-none tracking-[-0.07em] text-black">
            404
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Page Not Found
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Oops! The page you are looking for doesn’t exist. It might have been moved or deleted.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-base bg-[#C8102E] px-10 text-sm font-bold text-white transition-colors hover:bg-[#A80D26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Return to Homepage
          </Link>
        </div>

        <div className="pointer-events-none absolute right-[9%] top-[14%] hidden h-24 w-36 rotate-[10deg] overflow-hidden rounded-md bg-[#F5E4E1] shadow-lg sm:block md:h-28 md:w-44">
          <Image
            src="/sydney-to-mumbai/3.webp"
            alt=""
            fill
            sizes="176px"
            className="object-cover opacity-80"
          />
        </div>
        <div className="pointer-events-none absolute bottom-[13%] left-[10%] hidden h-24 w-36 -rotate-[12deg] overflow-hidden rounded-md bg-[#F5E4E1] shadow-lg sm:block md:h-28 md:w-44">
          <Image
            src="/chorus-mandala/4.webp"
            alt=""
            fill
            sizes="176px"
            className="object-cover opacity-80"
          />
        </div>
      </main>
    </>
  );
}
