"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  links: string[];
  message: string;
}

interface FormStatus {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export default function NewsLetter() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    links: [""], // Starts with one empty link field
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle dynamic link input changes
  const handleLinkChange = (index: number, value: string) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index] = value;
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  // Add a new link input field
  const addLinkField = () => {
    setFormData((prev) => ({ ...prev, links: [...prev.links, ""] }));
  };

  // Remove a link input field (optional helper but good for UX)
  const removeLinkField = (index: number) => {
    if (formData.links.length === 1) return; // Keep at least one
    const updatedLinks = formData.links.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Something went wrong. Please try again.");

      setStatus({
        loading: false,
        success: "Thank you for joining our team!",
        error: null,
      });
      
      // Reset Form
      setFormData({ name: "", email: "", phone: "", location: "", links: [""], message: "" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setStatus({ loading: false, success: null, error: errorMessage });
    }
  };

  return (
    <section id="newsletter" className="my-8 sm:my-12 md:my-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[28px] sm:rounded-[30px] p-6 sm:p-10 md:p-16 shadow-2xl inset-0 border-t-4 border-t-red-600">
          <div className="max-w-4xl mx-auto 7 relative z-10">     
            <h2 className=" text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl leading-snug font-bold uppercase text-black tracking-snug">
              Join our <span className=" text-[var(--red)]">Team</span>
            </h2>

            <p className="mt-3 text-gray-500  mx-auto text-sm md:text-base 2xl:text-xl">
              Join our team and become part of a passionate community. Submit your details to hear about upcoming opportunities and ways to contribute.
            </p>
          </div>


          <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-gray-600">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="h-12 sm:h-14 px-4 sm:px-5 rounded-lg border border-gray-200 outline-none focus:border-[#D10F2F] text-sm sm:text-base 2xl:text-xl"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="h-12 sm:h-14 px-4 sm:px-5 rounded-lg border border-gray-200 outline-none focus:border-[#D10F2F] text-sm sm:text-base 2xl:text-xl"
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="h-12 sm:h-14 px-4 sm:px-5 rounded-lg border border-gray-200 outline-none focus:border-[#D10F2F] text-sm sm:text-base 2xl:text-xl"
            />

            {/* Location */}
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location (City, Country)"
              required
              className="h-12 sm:h-14 px-4 sm:px-5 rounded-lg border border-gray-200 outline-none focus:border-[#D10F2F] text-sm sm:text-base 2xl:text-xl"
            />

            {/* Dynamic Link Inputs */}
            <div className="col-span-1 sm:col-span-2 space-y-3">
              <label className="text-gray-500 text-sm font-medium block">Portfolio / Social Links</label>
              {formData.links.map((link, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    placeholder="Instagram, YouTube, Facebook or portfolio link"
                    required={index === 0}
                    className="flex-1 h-12 sm:h-14 px-4 sm:px-5 rounded-lg border border-gray-200 outline-none focus:border-[#D10F2F] text-sm sm:text-base 2xl:text-xl min-w-0"
                  />
                  {formData.links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLinkField(index)}
                      className="h-8 px-2 bg-red-600 text-white hover:bg-white hover:text-red-600 border-2 border-red-600 rounded-sm transition text-xs whitespace-nowrap"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addLinkField}
                className="text-sm font-semibold text-red-500 hover:text-[#b60e29] transition flex items-center gap-1 mt-1"
              >
                + Add More Links
              </button>
            </div>

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message, extra details etc. (optional)"
              className="h-24 col-span-1 sm:col-span-2 p-4 sm:p-5 rounded-lg border border-gray-200 outline-none focus:border-[#D10F2F] text-sm sm:text-base 2xl:text-xl"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading}
              className="col-span-1 sm:col-span-2 h-12 sm:h-14 rounded-lg bg-[#D10F2F] text-white font-semibold hover:bg-[#b60e29] transition disabled:bg-gray-500 text-sm sm:text-base 2xl:text-xl"
            >
              {status.loading ? "Submitting..." : "Join Now"}
            </button>

            {status.success && <p className="col-span-1 sm:col-span-2 text-green-400 text-center mt-2 text-sm">{status.success}</p>}
            {status.error && <p className="col-span-1 sm:col-span-2 text-red-500 text-center mt-2 text-sm">{status.error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}