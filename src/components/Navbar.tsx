"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getStoredSession, AuthSession } from "@/lib/auth";
import { FiUser, FiMenu, FiX, FiHeart, FiChevronDown } from "react-icons/fi";
import Link from 'next/link';


const menuItems = [
  { name: "2027 Season", href: "/tour" },
  {
    name: "Discover",
    href: "#",
    dropdownItems: [
      {
        name: "Past Concerts",
        href: "#",
        dropdownItems: [
          {
            name: "PM Modi Welcome Concert",
            href: "/concert/welcome-pm-narendra-modi",
          },
          {
            name: "A.R. Rahman in Symphony",
            href: "/concert/a-r-rahman-in-symphony",
          },
          {
            name: "Chorus Mandala",
            href: "/concert/chorus-mandala",
          },
          {
            name: "Symphony of Lights",
            href: "/concert/symphony-of-lights",
          },
          {
            name: "Sydney to Mumbai",
            href: "/concert/sydney-to-mumbai",
          },
          {
            name: "String Sensations",
            href: "/concert/strings-sensations",
          },
        ],
      },
    ],
  },
  { name: "Services", href: "/services" },
  { name: "Join Us", href: "/join" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  // FIXED: Track individual desktop and mobile menu states
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );
  // Keep the nested "Past Concerts" dropdown independent from "Discover".
  const [openMobileSubDropdown, setOpenMobileSubDropdown] = useState<string | null>(
    null,
  );

  // Donate dropdown (top ticker)
  const [donateOpen, setDonateOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");
  const donateRef = useRef<HTMLDivElement>(null);

  const donateValue = Number(donateAmount);
  const donateValid = donateAmount !== "" && Number.isFinite(donateValue) && donateValue > 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close all menus when path changes
  useEffect(() => {
    setMenuOpen(false);
    setOpenMobileDropdown(null);
    setOpenMobileSubDropdown(null);
    setOpenDesktopMenu(null);
    setDonateOpen(false);
  }, [pathname]);

  // Close donate dropdown on outside click / Escape
  useEffect(() => {
    if (!donateOpen) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (donateRef.current && !donateRef.current.contains(e.target as Node)) {
        setDonateOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDonateOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [donateOpen]);

  useEffect(() => {
    setSession(getStoredSession());
  }, [pathname]);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    router.push("/");
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateValid) return;
    setDonateOpen(false);
    router.push(`/donate?amount=${donateValue}`);
  };

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50 transition-all duration-500 w-full"
      style={{
        background: "rgba(0, 0, 0, 1)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,16,46,0.15)" : "none",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6)" : "none",
      }}
    >
      {/* Top ticker */}
      <div className="relative py-1.5 font-medium bg-[var(--red)]">
        <div className="max-w-8xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-4 text-[10px] md:text-xs tracking-widest text-white 2xl:text-lg lg:px-12">
          <Link href="/tour">GET 15% OFF TICKETS — 2027 SEASON </Link>

          {/* Donate tab + amount dropdown */}
          <div ref={donateRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setDonateOpen((v) => !v)}
              aria-expanded={donateOpen}
              aria-controls="donate-panel"
              className="inline-flex items-center gap-1 uppercase underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <FiHeart aria-hidden="true" />
              Donate
              <FiChevronDown
                aria-hidden="true"
                className={`transition-transform ${donateOpen ? "rotate-180" : ""}`}
              />
            </button>

            {donateOpen && (
              <div
                id="donate-panel"
                role="dialog"
                aria-label="Enter a donation amount"
                className="absolute right-0 top-full mt-3 w-72 max-w-[calc(100vw-1.5rem)] rounded p-4 text-left tracking-normal shadow-xl bg-[rgba(0,0,0,0.98)] border border-[rgba(200,16,46,0.4)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Support our music
                    </p>
                    <p className="mt-1 text-xs font-normal text-gray-400">
                      Enter any amount (AUD) you&apos;d like to give.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDonateOpen(false)}
                    aria-label="Close donation box"
                    className="p-1 text-gray-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)]"
                  >
                    <FiX aria-hidden="true" />
                  </button>
                </div>

                <form onSubmit={handleDonateSubmit} className="mt-3 flex gap-2">
                  <label htmlFor="donate-amount" className="sr-only">
                    Donation amount
                  </label>
                  <div className="relative flex-1">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      $
                    </span>
                    <input
                      id="donate-amount"
                      type="number"
                      inputMode="decimal"
                      min="1"
                      step="any"
                      placeholder="Enter amount"
                      value={donateAmount}
                      onChange={(e) => setDonateAmount(e.target.value)}
                      autoFocus
                      className="w-full rounded-[2px] border border-white/20 bg-white/10 py-2 pl-6 pr-2 text-sm text-white placeholder:text-gray-500 focus:border-[var(--red)] focus:outline-none focus:ring-1 focus:ring-[var(--red)]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!donateValid}
                    className="rounded-[2px] bg-[var(--red)] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Donate
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between lg:px-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/">
            <Image
              src="/logo.webp"
              alt="Logo"
              width={56}
              height={36}
              className="w-[60px] h-[44px] sm:w-[74px] sm:h-[54px] 2xl:w-[100px] 2xl:h-[100px] object-contain"
              priority
            />
          </a>
          <p className="text-[10px] sm:text-xs font-semibold uppercase leading-snug tracking-wider 2xl:text-base">
            Australian
            <br /> Indian
            <br /> Orchestra
          </p>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => {
            const hasDropdown = !!item.dropdownItems;
            const isDropdownOpen = openDesktopMenu === item.name;
            const isActive =
              pathname === item.href ||
              item.dropdownItems?.some((sub) => pathname === sub.href);

            if (hasDropdown) {
              return (
                <div
                  key={item.name}
                  className="relative py-2"
                  onMouseEnter={() => setOpenDesktopMenu(item.name)}
                  onMouseLeave={() => setOpenDesktopMenu(null)}
                >
                  <button className="text-sm font-medium tracking-widest uppercase transition-colors text-[var(--grey-light)] hover:text-[var(--red)] 2xl:text-xl">
                    {item.name}{" "}
                    <span
                      className={`text-[10px] transition-transform inline-block ${isDropdownOpen ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>
                 
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 min-w-[250px] py-2 flex flex-col rounded shadow-xl bg-[rgba(0,0,0,0.98)] border border-[rgba(200,16,46,0.15)]">
                      {item.dropdownItems?.map((subItem) => (
                        <div key={subItem.name} className="relative group/sub">
                          {subItem.dropdownItems ? (
                            <>
                              <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium tracking-widest uppercase text-[var(--grey-light)] hover:text-[var(--red)] transition-colors">
                                {subItem.name}
                                <span className="text-[10px]">▶</span>
                              </button>

                              <div className="absolute left-full top-0 hidden min-w-[250px] py-2 flex-col rounded shadow-xl bg-[rgba(0,0,0,0.98)] border border-[rgba(200,16,46,0.15)] group-hover/sub:flex">
                                {subItem.dropdownItems.map((concert) => (
                                  <a
                                    key={concert.href}
                                    href={concert.href}
                                    className={`px-4 py-2 text-sm font-medium tracking-widest uppercase transition-colors ${
                                      pathname === concert.href
                                        ? "text-[var(--red)]"
                                        : "text-[var(--grey-light)] hover:text-[var(--red)]"
                                    }`}
                                  >
                                    {concert.name}
                                  </a>
                                ))}
                              </div>
                            </>
                          ) : (
                            <a
                              href={subItem.href}
                              className="block px-4 py-2 text-sm font-medium tracking-widest uppercase text-[var(--grey-light)] hover:text-[var(--red)] transition-colors"
                            >
                              {subItem.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            }
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-[var(--red)] 2xl:text-xl ${isActive ? "text-[var(--red)]" : "text-[var(--grey-light)]"}`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex gap-3 sm:gap-4 items-center">
          <a
            href="https://www.eventbrite.com.au/e/the-unforgettables-jagjit-singh-ghazals-reimagined-tickets-2004854691351?aff=ebdsoporgprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 border border-[var(--red)] text-white rounded-[2px] hover:bg-[var(--red)] 2xl:text-xl"
          >
            Book tickets
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white text-2xl focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu wrapper */}
      <div
        className={`md:hidden fixed inset-x-0  z-40 overflow-y-auto transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        style={{
          top: "90px",
          background: "rgba(0, 0, 0, 0.93)",
          backdropFilter: "blur(15px)",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-2">
          {/* Mobile Menu Navigation Items */}
            {/* Mobile Menu Navigation Items */}
{menuItems.map((item) => {
  const hasDropdown = !!item.dropdownItems;
  const isMobileDropdownOpen = openMobileDropdown === item.name;

  if (hasDropdown) {
    return (
      <div
        key={item.name}
        className="flex flex-col border-b border-white/5"
      >
        {/* Main Dropdown: Discover */}
        <button
          onClick={() => {
            setOpenMobileDropdown((current) =>
              current === item.name ? null : item.name
            );
            setOpenMobileSubDropdown(null);
          }}
          className="flex items-center justify-between py-2 w-full text-left text-xs sm:text-sm font-medium tracking-widest uppercase text-[var(--grey-light)]"
        >
          {item.name}

          <span
            className={`transition-transform duration-300 text-xs ${
              isMobileDropdownOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {/* First Level: Past Concerts */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 ${
            isMobileDropdownOpen
              ? "max-h-[1000px] pb-2"
              : "max-h-0"
          }`}
        >
          {item.dropdownItems?.map((subItem) => {
            const isSubOpen =
              openMobileSubDropdown === subItem.name;

            if (subItem.dropdownItems) {
              return (
                <div key={subItem.name} className="flex flex-col">
                  <button
                    onClick={() =>
                      setOpenMobileSubDropdown((current) =>
                        current === subItem.name ? null : subItem.name
                      )
                    }
                    className="flex items-center justify-between w-full py-2.5 text-xs font-medium tracking-widest uppercase text-gray-400 hover:text-[var(--red)] transition-colors"
                  >
                    {subItem.name}

                    <span
                      className={`text-[10px] transition-transform duration-300 ${
                        isSubOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Second Level: Concert List */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 ${
                      isSubOpen
                        ? "max-h-[600px] pb-2"
                        : "max-h-0"
                    }`}
                  >
                    {subItem.dropdownItems.map((concert) => (
                      <a
                        key={concert.href}
                        href={concert.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setOpenMobileDropdown(null);
                          setOpenMobileSubDropdown(null);
                        }}
                        className={`block py-2.5 text-xs font-medium tracking-widest uppercase transition-colors ${
                          pathname === concert.href
                            ? "text-[var(--red)]"
                            : "text-gray-400 hover:text-[var(--red)]"
                        }`}
                      >
                        {concert.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={subItem.href}
                href={subItem.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-xs font-medium tracking-widest uppercase text-gray-400 hover:text-[var(--red)] transition-colors"
              >
                {subItem.name}
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <a
      key={item.href}
      href={item.href}
      className="py-3 text-xs font-medium tracking-widest uppercase border-b border-[#ffffff14] transition-colors"
      style={{
        color:
          pathname === item.href
            ? "var(--red)"
            : "var(--grey-light)",
      }}
      onClick={() => setMenuOpen(false)}
    >
      {item.name}
    </a>
  );
})}

          <a
            href="https://www.eventbrite.com.au/e/the-unforgettables-jagjit-singh-ghazals-reimagined-tickets-2004854691351?aff=ebdsoporgprofile"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex w-full items-center justify-center rounded-sm border border-[var(--red)] bg-[var(--red)] px-4 py-3 text-xs font-semibold tracking-widest uppercase text-white transition hover:bg-transparent"
          >
            Book Tickets
          </a>

          {/* Mobile Auth Actions cleanly integrated at bottom */}
          <div className="pt-6 mt-2 border-t border-white/10 flex flex-col gap-3">
            {session ? (
              <>
                <a
                  href="/dashboard/user"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-sm bg-white/5 text-xs font-semibold tracking-wider text-white"
                >
                  <FiUser className="text-lg text-[var(--red)]" /> My Account /
                  Profile
                </a>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left py-3 px-4 rounded-sm bg-red-700 text-sm font-semibold tracking-wider text-white"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
