'use client';

export default function TourCta() {
  return (
    <section className="md:py-8 px-6">
      <div className="max-w-8xl mx-auto flex flex-col items-start justify-start gap-6 border-t border-b border-slate-200 py-8 lg:px-12">
        
        <div className="">
          <h2 className="text-xl md:text-4xl 2xl:text-5xl font-bold text-slate-900 mb-2 uppercase leading-snug tracking-tight">
            Get Priority Access To<span className="text-red-500"> 2027 Tickets</span>
          </h2>
          <p className="mt-2 2xl:mt-4 text-base 2xl:text-3xl text-slate-600 ">Join the official pre-sale waitlist and be among the first to access early bird ticket offers, premium seating opportunities, and exclusive tour announcements before tickets are released to the public.</p>
        </div>

        <a href="/tour"
          className="whitespace-nowrap bg-red-700 text-xs md:text-sm 2xl:text-2xl text-white px-6 py-3 font-medium hover:bg-white hover:text-red-700 border-2 border-red-700 transition-all active:scale-95 shadow-md tracking-[0.1em] uppercase"
        >
          Join Waitlist 
        </a>
        
      </div>
    </section>
  );
};