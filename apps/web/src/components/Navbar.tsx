"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Sparkles,
  MapPin,
  GraduationCap,
  MessageCircle,
  Clock,
  Award,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SITE_DATA } from "@/data/site-data";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileCentresOpen, setMobileCentresOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [centresDropdownOpen, setCentresDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const LOGO_URL =
    "https://res.cloudinary.com/dnfz4jwam/image/upload/v1793791834/didm-logo-reg_m1wbe9.png";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-neutral-900 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            <span className="font-medium truncate">
              Admissions Open for 2026 Cohorts · 100% Guaranteed Placement Drives across 650+ Partners
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0 font-medium text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Mon–Fri 9am–9pm · Sat–Sun 9am–7pm</span>
            </div>
            <span className="text-neutral-600">|</span>
            <a
              href={`tel:${SITE_DATA.brand.phoneClean}`}
              className="flex items-center gap-1.5 text-white hover:text-brand-red transition font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-brand-red" />
              <span>Toll-Free: +91 88005 05151</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Glassmorphic Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-[#FBFAF7]/95 dark:bg-[#0A0A0E]/95 backdrop-blur-md shadow-md border-b border-neutral-200/80 dark:border-neutral-800/80 py-2.5"
            : "bg-[#FBFAF7] dark:bg-[#0A0A0E] border-b border-neutral-200/60 dark:border-neutral-800/60 py-3 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Official DIDM Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative py-1 px-2 sm:px-2.5 rounded-xl bg-white/95 dark:bg-white/95 shadow-sm border border-neutral-200/80 group-hover:shadow-md transition">
              <Image
                src={LOGO_URL}
                alt="DIDM - Delhi Institute of Digital Marketing"
                width={138}
                height={44}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation Links with Mega Dropdowns */}
          <nav className="hidden xl:flex items-center gap-1">
            {/* Programs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProgramsDropdownOpen(true)}
              onMouseLeave={() => setProgramsDropdownOpen(false)}
            >
              <Link
                href="/programs"
                className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 ${
                  pathname.startsWith("/program")
                    ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
                }`}
              >
                <span>Programs</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    programsDropdownOpen ? "rotate-180 text-brand-red" : "opacity-60"
                  }`}
                />
              </Link>

              {programsDropdownOpen && (
                <div className="absolute top-full left-0 w-[540px] bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-3xl p-5 grid grid-cols-2 gap-4 animate-in fade-in-50 zoom-in-95">
                  <div className="space-y-2 border-r border-neutral-100 dark:border-neutral-800 pr-3">
                    <div className="text-[10px] font-mono uppercase text-brand-red font-bold tracking-wider">
                      Flagship Career Tracks
                    </div>
                    {SITE_DATA.programs.map((p) => (
                      <Link
                        key={p.id}
                        href={`/program?p=${p.id}`}
                        className="block p-2.5 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white">
                            {p.shortName}
                          </span>
                          {p.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-red text-white font-mono font-semibold">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
                          {p.duration} · {p.hours}
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="text-[10px] font-mono uppercase text-ai dark:text-ai-dark font-bold tracking-wider">
                      Short-Term Bootcamps
                    </div>
                    {SITE_DATA.shortCourses.map((sc) => (
                      <Link
                        key={sc.id}
                        href={`/enquire?p=${sc.id}`}
                        className="block p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition"
                      >
                        <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                          {sc.title}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">
                          {sc.duration} · {sc.tools.slice(0, 3).join(", ")}
                        </div>
                      </Link>
                    ))}

                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <Link
                        href="/compare"
                        className="flex items-center justify-between text-xs font-bold text-brand-red hover:underline p-1"
                      >
                        <span>Compare all courses side-by-side</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Centres Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCentresDropdownOpen(true)}
              onMouseLeave={() => setCentresDropdownOpen(false)}
            >
              <Link
                href="/centres"
                className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 ${
                  pathname.startsWith("/centre")
                    ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
                }`}
              >
                <span>Centres (13+)</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    centresDropdownOpen ? "rotate-180 text-brand-red" : "opacity-60"
                  }`}
                />
              </Link>

              {centresDropdownOpen && (
                <div className="absolute top-full left-0 w-[420px] bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-3xl p-5 space-y-3 animate-in fade-in-50 zoom-in-95">
                  <div className="text-[10px] font-mono uppercase text-brand-red font-bold tracking-wider">
                    Popular Campus Hubs
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Link
                      href="/centre/dwarka"
                      className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-brand-red-soft dark:hover:bg-brand-red/20 transition"
                    >
                      <strong className="block text-neutral-900 dark:text-white">Dwarka (Sec 7)</strong>
                      <span className="text-[10px] text-neutral-500">Ramphal Chowk Rd</span>
                    </Link>
                    <Link
                      href="/centres"
                      className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-brand-red-soft dark:hover:bg-brand-red/20 transition"
                    >
                      <strong className="block text-neutral-900 dark:text-white">South Extension</strong>
                      <span className="text-[10px] text-neutral-500">Pink Line Metro</span>
                    </Link>
                    <Link
                      href="/centres"
                      className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-brand-red-soft dark:hover:bg-brand-red/20 transition"
                    >
                      <strong className="block text-neutral-900 dark:text-white">Noida (Sector 18)</strong>
                      <span className="text-[10px] text-neutral-500">Wave Silver Tower</span>
                    </Link>
                    <Link
                      href="/centres"
                      className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-brand-red-soft dark:hover:bg-brand-red/20 transition"
                    >
                      <strong className="block text-neutral-900 dark:text-white">Gurgaon (DLF 2)</strong>
                      <span className="text-[10px] text-neutral-500">Cyber City Adjacent</span>
                    </Link>
                    <Link
                      href="/centres"
                      className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-brand-red-soft dark:hover:bg-brand-red/20 transition"
                    >
                      <strong className="block text-neutral-900 dark:text-white">Pitampura (NSP)</strong>
                      <span className="text-[10px] text-neutral-500">Millennium Tower</span>
                    </Link>
                    <Link
                      href="/centres"
                      className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-brand-red-soft dark:hover:bg-brand-red/20 transition"
                    >
                      <strong className="block text-neutral-900 dark:text-white">Live Online Campus</strong>
                      <span className="text-[10px] text-neutral-500">Interactive HD Zoom</span>
                    </Link>
                  </div>
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <Link
                      href="/centres"
                      className="flex items-center justify-between text-xs font-bold text-brand-red hover:underline"
                    >
                      <span>Explore all 13 branch locations across India</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/compare"
              className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/compare"
                  ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
              }`}
            >
              Compare
            </Link>

            <Link
              href="/outcomes"
              className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/outcomes"
                  ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
              }`}
            >
              Outcomes
            </Link>

            <Link
              href="/stories"
              className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/stories"
                  ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
              }`}
            >
              Stories
            </Link>

            <Link
              href="/learn"
              className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/learn"
                  ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
              }`}
            >
              Free Learn
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/about"
                  ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
              }`}
            >
              About
            </Link>

            <Link
              href="/organisations"
              className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                pathname === "/organisations"
                  ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
              }`}
            >
              For Teams
            </Link>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Direct Telephone link */}
            <a
              href={`tel:${SITE_DATA.brand.phoneClean}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-brand-red px-3 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-brand-red transition"
            >
              <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
              <span>088005 05151</span>
            </a>

            {/* Main Red Brand CTA */}
            <Link
              href="/enquire"
              className="btn-red text-xs sm:text-sm py-2 px-3.5 sm:px-5 font-bold shadow-sm whitespace-nowrap"
            >
              Book Free Demo
            </Link>

            {/* Hamburger button for mobile/tablet */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-brand-red active:scale-95 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 3. Ultra-Sleek Mobile App-Like Full Screen Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[60px] sm:top-[68px] bottom-0 bg-[#FBFAF7] dark:bg-[#0A0A0E] z-50 overflow-y-auto p-4 sm:p-6 flex flex-col justify-between border-t border-neutral-200 dark:border-neutral-800 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-4">
              {/* Quick Contact Action Bar */}
              <div className="grid grid-cols-2 gap-2 pb-2">
                <a
                  href={`tel:${SITE_DATA.brand.phoneClean}`}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 text-neutral-900 dark:text-white text-xs font-bold border border-neutral-200/80 dark:border-neutral-700"
                >
                  <Phone className="w-4 h-4 text-brand-red shrink-0" />
                  <span>Call 88005 05151</span>
                </a>
                <a
                  href={SITE_DATA.brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>

              {/* Programs Accordion for Mobile */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-brand-red" />
                    <span>Explore All Courses</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      mobileProgramsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileProgramsOpen && (
                  <div className="px-4 pb-4 pt-1 space-y-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    {SITE_DATA.programs.map((p) => (
                      <Link
                        key={p.id}
                        href={`/program?p=${p.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-brand-red-soft"
                      >
                        <div className="flex items-center justify-between font-bold text-neutral-900 dark:text-white">
                          <span>{p.shortName}</span>
                          <span className="font-mono text-brand-red font-semibold">{p.fee}</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          {p.duration} · {p.hours}
                        </div>
                      </Link>
                    ))}
                    <Link
                      href="/compare"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center text-xs font-bold text-brand-red pt-2"
                    >
                      Compare All 4 Programs Side-by-Side →
                    </Link>
                  </div>
                )}
              </div>

              {/* Centres Accordion for Mobile */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => setMobileCentresOpen(!mobileCentresOpen)}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-red" />
                    <span>13 Physical Centres</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      mobileCentresOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileCentresOpen && (
                  <div className="px-4 pb-4 pt-1 space-y-1.5 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    <Link
                      href="/centre/dwarka"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60"
                    >
                      <strong className="block text-neutral-900 dark:text-white">Dwarka Centre</strong>
                      <span className="text-[10px] text-neutral-500">Ramphal Chowk Rd, Sec 7</span>
                    </Link>
                    <Link
                      href="/centres"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60"
                    >
                      <strong className="block text-neutral-900 dark:text-white">South Extension, Pitampura, Kalkaji</strong>
                      <span className="text-[10px] text-neutral-500">Delhi branches</span>
                    </Link>
                    <Link
                      href="/centres"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60"
                    >
                      <strong className="block text-neutral-900 dark:text-white">Noida & Gurgaon</strong>
                      <span className="text-[10px] text-neutral-500">Cyber City & Sec 18</span>
                    </Link>
                    <Link
                      href="/centres"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center text-xs font-bold text-brand-red pt-2"
                    >
                      View All 13 Centres & Interactive Map →
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/outcomes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 font-bold text-neutral-900 dark:text-white text-center"
                >
                  Placements & Salaries
                </Link>
                <Link
                  href="/stories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 font-bold text-neutral-900 dark:text-white text-center"
                >
                  Student Reviews
                </Link>
                <Link
                  href="/learn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 font-bold text-neutral-900 dark:text-white text-center"
                >
                  Free AI Knowledge Hub
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 font-bold text-neutral-900 dark:text-white text-center"
                >
                  About DIDM
                </Link>
                <Link
                  href="/organisations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="col-span-2 p-3 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 font-bold text-neutral-900 dark:text-white text-center"
                >
                  Corporate Upskilling & Hire Talent
                </Link>
              </div>
            </div>

            {/* Bottom Booking Button */}
            <div className="pt-6 pb-2 space-y-2 border-t border-neutral-200 dark:border-neutral-800">
              <Link
                href="/enquire"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-red w-full text-center py-3.5 text-sm font-bold block"
              >
                Book a Free 1-on-1 Trial Class
              </Link>
              <div className="text-[11px] text-center text-neutral-500">
                100% Free · No sales pressure · In-person or Live Online
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
