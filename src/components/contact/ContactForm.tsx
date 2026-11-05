"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    venue: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", venue: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="bg-[#F7F3F0] py-10 md:py-8 px-6 overflow-hidden">
      <div className="max-w-8xl mx-auto lg:px-12">
        {/* Main Layout */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-center">
          
          {/* Hero Image */}
          <div className="relative z-10 mr-0 lg:-mr-8 h-[500px] 2xl:h-[800px] overflow-hidden rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.15)]">
            <Image
              src="/ar-rehman/3.webp"
              alt="Orchestra performance"
              fill
              className="object-cover rounded-[40px]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-10 left-10 text-white">
              <p className="uppercase tracking-[0.35em] text-red-200 text-xs mb-4">
                Australian Indian Orchestra
              </p>
              <h3 className="text-2xl md:text-3xl font-light 2xl:text-4xl">
                Bringing Music, <br /> Culture & Emotion <br /> To Every Stage
              </h3>
            </div>
 
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-lg sm:rounded-[40px] px-4 py-8 md:p-16 2xl:p-32 shadow-[0_40px_120px_rgba(0,0,0,0.12)]">
            <div className="max-w-4xl mb-8 relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-6xl leading-tight font-bold uppercase text-[var(--deep)] tracking-tight">
                We would love to hear <span className="sm:block text-[var(--red)]">from you!</span>
              </h2>

              <p className="mt-3 2xl:mt-6 text-gray-500 max-w-2xl mx-auto text-sm 2xl:text-3xl 2xl:max-w-full ">
                Tell us about your event and our team will get back with a tailored proposal.
              </p>
            </div>
              
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full bg-[#F8F8F8] border border-neutral-200 rounded-lg px-5 py-3 focus:outline-none focus:border-[#D10F2F] text-sm 2xl:text-xl"
              />
              
              <div className="grid grid-cold-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-[#F8F8F8] border border-neutral-200 rounded-lg px-5 py-3 focus:outline-none focus:border-[#D10F2F] text-sm 2xl:text-xl"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-[#F8F8F8] border border-neutral-200 rounded-lg px-5 py-3 focus:outline-none focus:border-[#D10F2F] text-sm 2xl:text-xl"
                />
              </div>

              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue / Location"
                className="w-full bg-[#F8F8F8] border border-neutral-200 rounded-lg px-5 py-3 focus:outline-none focus:border-[#D10F2F] text-sm 2xl:text-xl"
              />

              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your event..."
                required
                className="w-full bg-[#F8F8F8] border border-neutral-200 rounded-lg px-5 py-3 focus:outline-none focus:border-[#D10F2F] text-sm 2xl:text-xl resize-none"
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-[#D10F2F] text-white text-sm py-3 md:py-4 rounded-lg font-medium hover:bg-[#F2183F] transition disabled:bg-neutral-400 2xl:text-2xl 2xl:py-6"
              >
                {status === "submitting" ? "Sending..." : "Send"}
              </button>

              {/* Submission Status Feedback */}
              {status === "success" && (
                <p className="text-green-600 text-sm text-center font-medium">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm text-center font-medium">Something went wrong. Please try again.</p>
              )}

              <div className="mt-4 text-center">
                {/* <p className="text-xs md:text-sm text-neutral-500">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-700 hover:text-black underline underline-offset-2">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-700 hover:text-black underline underline-offset-2">
                    Terms of Service
                  </a>{" "}
                  apply.
                </p> */}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}