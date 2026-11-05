"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function FooterTourForm() {
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

  const label = "block mb-2 text-sm 2xl:text-xl font-medium text-white";
  const input =
    "w-full h-12 2xl:h-16 px-4 rounded-md bg-transparent border border-white/15 text-sm 2xl:text-xl text-white placeholder:text-white/35 outline-none transition-colors focus:border-[var(--red)]";
  const star = <span style={{ color: "var(--red)" }}>*</span>;

  return (
    <div className="pb-8 md:pb-12 grid lg:grid-cols-5 gap-8 lg:gap-8 items-center border-b border-white/5 tour-geo ">
      {/* Left: copy */}
      <div className="lg:col-span-2">
        <h3 className="text-base sm:text-2xl 2xl:text-4xl font-bold text-white leading-tight">
            GET PRIORITY ACCESS TO 2027 <span style={{ color: "var(--red)" }}>SEASON TICKETS</span>
        </h3>
        <p className="mt-3 text-xs sm:text-sm 2xl:text-2xl leading-relaxed text-white/75">
           Join our pre-sale waitlist for early bird discounts, exclusive seating, and tour updates.
        </p>
        <p className="mt-3 text-xs sm:text-sm 2xl:text-base font-medium" style={{ color: "var(--red)" }}>
            Get 15% off early bird tickets
        </p>
      </div>

      {/* Right: form */}
      <form onSubmit={handleSubmit} noValidate className="lg:col-span-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="ft-name" className="text-xs 2xl:text-base font-medium text-white block mb-2 text-white/75">
              Full Name {star}
            </label>
            <input
              id="ft-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              minLength={2}
              className={input}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="ft-email" className="text-xs 2xl:text-base font-medium text-white block mb-2 text-white/75">
              Email Address {star}
            </label>
            <input
              id="ft-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={input}
            />
          </div>

          {/* Phone */}
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="ft-phone" className="text-xs 2xl:text-base font-medium text-white block mb-2 text-white/75">
              Phone Number {star}
            </label>
            <input
              id="ft-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your Phone number"
              minLength={7}
              maxLength={20}
              className={input}
            />
          </div>
        </div>

        {/* Location Selectors */}
        <p className="mt-5 mb-3 text-xs 2xl:text-base font-medium text-white block mb-2 text-white/75">
          Select the Country, State, and City you live in {star}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Country */}
          <div>
            <label className="text-xs 2xl:text-base font-medium text-white block mb-2 text-white/75">
              Country {star}
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
            <label className="text-xs 2xl:text-base font-medium text-white block mb-2 text-white/75">
              State {star}
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
          <div className="col-span-2 sm:col-span-1">
            <label className="text-xs 2xl:text-base font-medium text-white block mb-2 text-white/75">
              City {star}
            </label>
            <CitySelect
              countryid={countryid}
              stateid={stateid}
              onChange={(e: any) => {
                setFormData({ ...formData, city: e.name });
              }}
              placeHolder="Select City"
              className="bg-transparent border border-white/15 text-sm 2xl:text-xl text-white placeholder:text-white/35 outline-none transition-colors focus:border-[var(--red)] w-full h-12 2xl:h-16 px-4 rounded-md"
            />
          </div>
        </div>

        {/* Button + message */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status.loading}
            className="group h-12 2xl:h-16 px-10 2xl:px-14 rounded-base bg-[var(--red)] text-white text-xs 2xl:text-lg font-semibold transition-colors hover:bg-[#B60E29] disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              {status.loading ? "Processing..." : "Pre Book Now"}
              {!status.loading && <span className="group-hover:translate-x-1 transition">→</span>}
            </span>
          </button>

          {status.message && (
            <p className={`text-sm 2xl:text-lg font-medium ${status.error ? "text-red-400" : "text-green-400"}`}>
              {status.message}
            </p>
          )}
        </div>
      </form>
      <style>{`
        .tour-geo .stdropdown-container {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          min-height: 48px;
          color: #fff;
          transition: border-color .2s, background .2s;
        }
        .tour-geo .stdropdown-container:focus-within,
        .tour-geo .stdropdown-container:hover {
          border-color: #D10F2F;
          background: rgba(255,255,255,0.07);
        }
        .tour-geo .stdropdown-input,
        .tour-geo .stdropdown-input input {
          color: #fff;
          background: transparent;
          font-size: 0.875rem;
        }
        .tour-geo .stdropdown-input input::placeholder { color: rgba(255,255,255,0.3); }
        .tour-geo .stdropdown-tools svg { fill: rgba(255,255,255,0.5); }
        .tour-geo .stdropdown-menu {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }
        .tour-geo .stdropdown-item { color: rgba(255,255,255,0.8); }
        .tour-geo .stdropdown-item:hover,
        .tour-geo .stdropdown-item.selected { background: rgba(209,15,47,0.25); color: #fff; }
      `}</style>

    </div>
  );
}
