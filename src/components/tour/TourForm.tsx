"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Star, Percent, Bell, Ticket } from "lucide-react";

export default function Cta() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
  });

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [status, setStatus] = useState({ loading: false, message: "", error: false });

  // Handle text input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validateForm = () => {
    const { name, email, phone, country, state, city } = formData;

    if (!name.trim()) return "Please enter your full name.";

    if (!email.trim()) return "Please enter your email address.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return "Please enter a valid email address.";

    if (!phone.trim()) return "Please enter your phone number.";

    const phoneRegex = /^\+?[\d\s-]+$/;
    const phoneDigits = phone.replace(/\D/g, "");

    if (!phoneRegex.test(phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return "Please enter a valid phone number (7–15 digits).";
    }

    if (!country.trim()) return "Please select your country.";
    if (!state.trim()) return "Please select your state.";
    if (!city.trim()) return "Please select your city.";

    return "";
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setStatus({ loading: false, message: validationError, error: true });
      return;
    }

    setStatus({ loading: true, message: "Joining waitlist...", error: false });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, message: "Success! You have joined the waitlist.", error: false });
        setFormData({ name: "", email: "", phone: "", country: "", state: "", city: "" });
        setCountryid(0);
        setStateid(0);
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      setStatus({ loading: false, message: err.message, error: true });
    }
  };

  const benefits = [
    { label: "Priority Booking", icon: Ticket },
    { label: "Early Bird Discounts", icon: Percent },
    { label: "VIP Updates", icon: Star },
    { label: "Premium Seat Alerts", icon: Bell },
  ];

  return (
    <section className="relative py-6 pb-4 md:py-12 bg-[#FAEDEE]" id="waitlist">
      <div className="relative max-w-8xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-start">

          {/* LEFT CONTENT */}
          <div >
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.3em] text-zinc-400 2xl:text-xl">
              Exclusive Access
            </span>

            <h2 className="mt-2 2xl:mt-4 text-2xl md:text-4xl 2xl:text-6xl font-bold leading-relaxed text-black">
              GET PRIORITY ACCESS TO 2027 <span className="text-[var(--red)] sm:block">SEASON TICKETS</span>
            </h2>

            <p className="mt-2 md:mt-6 2xl:mt-8 text-zinc-500 text-base md:text-lg 2xl:text-3xl leading-relaxed">
              Join our official pre-sale waitlist and be the first to receive
              early bird discounts, exclusive seating opportunities, and tour
              announcements before the public release.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 md:mt-10">
              {benefits.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 py-3 px-2 sm:py-5 sm:px-4 rounded-2xl border border-red-100 bg-white shadow-sm hover:border-[#D10F2F]/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-red-50 text-[#D10F2F]">
                    <Icon className="w-3 h-3 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-gray-700 font-medium text-xs md:text-base 2xl:text-xl">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="relative max-w-2xl mx-auto 2xl:max-w-full">
            <div className="relative bg-white rounded-[8px] pt-4 pb-6 border border-red-100 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

              {/* Top Accent */}
              <div className="absolute -top-[2px] -left-[1px] -right-[1px] h-2 rounded-t-[33px] overflow-hidden border-t border-red-100/50">
                <div className="h-full bg-gradient-to-r from-[#D10F2F] via-[#ff506e] to-[#D10F2F]" />
              </div>

              <div className="p-4 md:px-10 md:py-4 relative">
                <div className="text-left md:text-center mb-8">
                  <h3 className="mt-4 text-xl md:text-3xl 2xl:text-4xl text-black">
                    Pre-Sale Waitlist
                  </h3>

                  <p className="mt-1 text-gray-500 max-w-md mx-auto text-sm 2xl:text-lg">
                    Sign Up for Exclusive Access to 15% Discount Early Bird Tickets
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-gray-700 grid">
                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      minLength={2}
                      className="w-full h-14 px-5 rounded-sm border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#D10F2F] outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full h-14 px-5 rounded-sm border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#D10F2F] outline-none transition"
                    />
                  </div>
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your Phone number"
                      minLength={7}
                      maxLength={20}
                      className="w-full h-14 px-5 rounded-sm border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#D10F2F] outline-none transition text-gray-700"
                    />
                  </div>

                  {/* Location Selectors */}
                  <p className="block mb-2 text-sm font-medium text-gray-700">
                    Select the Country, State, and City you live in *
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Country */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Country *
                      </label>
                      <CountrySelect
                        onChange={(e: any) => {
                          setCountryid(e.id);
                          setStateid(0);

                          setFormData({
                            ...formData,
                            country: e.name,
                            state: "",
                            city: "",
                          });
                        }}
                        placeHolder="Select Country"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        State *
                      </label>
                      <StateSelect
                        countryid={countryid}
                        onChange={(e: any) => {
                          setStateid(e.id);

                          setFormData({
                            ...formData,
                            state: e.name,
                            city: "",
                          });
                        }}
                        placeHolder="Select State"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        City *
                      </label>
                      <CitySelect
                        countryid={countryid}
                        stateid={stateid}
                        onChange={(e: any) => {
                          setFormData({ ...formData, city: e.name });
                        }}
                        placeHolder="Select City"
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="group w-full h-12 md:h-14 bg-[#D10F2F] rounded-lg text-white font-semibold text-sm md:text-base transition-all duration-300 hover:bg-[#B60E29] hover:shadow-[0_15px_40px_rgba(209,15,47,0.35)] disabled:opacity-50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {status.loading ? "Processing..." : "Pre Book Now"}
                      {!status.loading && (
                        <span className="group-hover:translate-x-1 transition">→</span>
                      )}
                    </span>
                  </button>

                  {status.message && (
                    <p className={`text-sm mt-4 text-center font-medium ${status.error ? "text-red-600" : "text-green-600"}`}>
                      {status.message}
                    </p>
                  )}

                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}