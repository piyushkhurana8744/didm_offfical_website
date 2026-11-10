"use client";

import { useState, useEffect, useRef } from "react";
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
  Award,
  BookOpen,
  Briefcase,
  ExternalLink,
  Users,
  Calendar,
  Building2,
  Newspaper,
  CheckCircle2,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { DIDM_MEDIA } from "@/data/didm-media";
import { SITE_BRAND } from "@/lib/content";
import {
  UTILITY_NAVIGATION,
  TRAINING_MEGA_MENU,
  CENTRES_MEGA_MENU,
  ABOUT_DROPDOWN,
  RESOURCES_MEGA_MENU,
} from "@/config/site-navigation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Mobile accordion state
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth hover handlers with grace delay & invisible bridge protection
  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMegaMenu(menuId);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 280); // 280ms grace window prevents accidental menu dismissal during cursor traversal
  };

  const handleToggleMenu = (menuId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMegaMenu((prev) => (prev === menuId ? null : menuId));
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Close menus on route change or Escape key
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMegaMenu(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMobileAccordion = (id: string) => {
    setMobileAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. TOP UTILITY BAR                                        */}
      {/* ========================================================= */}
      <div className="bg-neutral-900 text-white text-[11px] py-1.5 border-b border-neutral-800 select-none z-50 relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            <span className="font-medium text-neutral-300 truncate">
              Admissions Open 2026–27 · 10+ Years of Excellence (Since 2014)
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0 font-medium text-neutral-400">
            {/* Utility Navigation Links */}
            <div className="flex items-center gap-3">
              {UTILITY_NAVIGATION.map((item) =>
                item.external ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="hover:text-white transition flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1 rounded bg-brand-red text-white font-mono font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              )}
            </div>

            <span className="text-neutral-700">|</span>
            <span className="whitespace-nowrap">Mon–Fri 9am–9pm · Sat–Sun 9am–7pm</span>
            <span className="text-neutral-700">|</span>
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="flex items-center gap-1.5 text-neutral-200 hover:text-white transition font-semibold whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-brand-red shrink-0" />
              <span>Toll Free: 88005 05151</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN HEADER & DESKTOP MEGA-MENUS                       */}
      {/* ========================================================= */}
      <header
        ref={navRef}
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-[#FBFAF7]/95 dark:bg-[#0A0A0E]/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 dark:border-neutral-800/80"
            : "bg-[#FBFAF7] dark:bg-[#0A0A0E] border-b border-neutral-200/60 dark:border-neutral-800/60"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 h-[76px] sm:h-[82px] lg:h-[88px] flex items-center justify-between gap-4 lg:gap-6 xl:gap-8">
          {/* Logo — Bold, prominent, high-visibility branding */}
          <Link href="/" className="flex items-center shrink-0 group py-1" aria-label="DIDM Official Website Home">
            <Image
              src={DIDM_MEDIA.officialLogo.path}
              alt={DIDM_MEDIA.officialLogo.alt}
              width={DIDM_MEDIA.officialLogo.width}
              height={DIDM_MEDIA.officialLogo.height}
              className="h-12 sm:h-13 md:h-14 lg:h-[58px] xl:h-[66px] 2xl:h-[70px] w-auto object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation Links — evenly balanced & smoothly distributed */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-1 xl:gap-2 2xl:gap-3.5">
            {/* A. Training Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("training")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={TRAINING_MEGA_MENU.href}
                onClick={(e) => {
                  // Allow quick toggle if on touch or if clicking when closed
                  if (activeMegaMenu !== "training") {
                    handleMouseEnter("training");
                  }
                }}
                className={`px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-[13px] xl:text-[14px] font-semibold whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                  pathname.startsWith("/program") || activeMegaMenu === "training"
                    ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                }`}
              >
                <span>{TRAINING_MEGA_MENU.triggerLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "training" ? "rotate-180 text-brand-red" : "opacity-50"
                  }`}
                />
              </Link>

              {activeMegaMenu === "training" && (
                <div
                  onMouseEnter={() => handleMouseEnter("training")}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-0 xl:-left-6 pt-2 z-50 animate-in fade-in-50 duration-150"
                >
                  <div className="w-[840px] bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-3xl p-6 grid grid-cols-12 gap-6 relative before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                    <div className="col-span-8 grid grid-cols-2 gap-6 border-r border-neutral-100 dark:border-neutral-800 pr-6">
                    {/* Column 1: Certification Programs */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono uppercase text-brand-red font-bold tracking-wider flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Certification Programs</span>
                      </div>
                      <div className="space-y-1">
                        {TRAINING_MEGA_MENU.columns[1]?.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="block p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-red text-white font-mono font-semibold">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Diploma & Schedules */}
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <div className="text-[11px] font-mono uppercase text-ai dark:text-ai-dark font-bold tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Diploma Program</span>
                        </div>
                        {TRAINING_MEGA_MENU.columns[0]?.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="block p-2.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/40 hover:bg-purple-100/60 dark:hover:bg-purple-900/30 transition group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 transition">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-600 text-white font-mono font-semibold">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Admissions &amp; Batches</span>
                        </div>
                        {TRAINING_MEGA_MENU.columns[2]?.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="flex items-center justify-between p-1.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition"
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] px-1 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Featured Card */}
                  <div className="col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-neutral-50 dark:bg-[#16161E] border border-neutral-200/80 dark:border-neutral-800/80">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded">
                        {TRAINING_MEGA_MENU.featuredCard?.badge}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {TRAINING_MEGA_MENU.featuredCard?.title}
                      </h4>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {TRAINING_MEGA_MENU.featuredCard?.description}
                      </p>
                    </div>

                    <Link
                      href={TRAINING_MEGA_MENU.featuredCard?.ctaHref || "/programs"}
                      className="btn-red text-xs py-2 px-3 font-bold text-center mt-4 flex items-center justify-center gap-1.5"
                    >
                      <span>{TRAINING_MEGA_MENU.featuredCard?.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* B. Select Centers Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("centres")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={CENTRES_MEGA_MENU.href}
                onClick={() => {
                  if (activeMegaMenu !== "centres") {
                    handleMouseEnter("centres");
                  }
                }}
                className={`px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-[13px] xl:text-[14px] font-semibold whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                  pathname.startsWith("/centre") || activeMegaMenu === "centres"
                    ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                }`}
              >
                <span>{CENTRES_MEGA_MENU.triggerLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "centres" ? "rotate-180 text-brand-red" : "opacity-50"
                  }`}
                />
              </Link>

              {activeMegaMenu === "centres" && (
                <div
                  onMouseEnter={() => handleMouseEnter("centres")}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in-50 duration-150"
                >
                  <div className="w-[840px] bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-3xl p-6 grid grid-cols-12 gap-6 relative before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                    <div className="col-span-8 grid grid-cols-2 gap-6 border-r border-neutral-100 dark:border-neutral-800 pr-6">
                    {/* Delhi NCR Campuses */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono uppercase text-brand-red font-bold tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Delhi NCR Campuses</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {CENTRES_MEGA_MENU.columns[0]?.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="flex items-center justify-between p-1.5 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-brand-red hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition"
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-brand-red text-white font-mono font-bold">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Regional & Online */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono uppercase text-neutral-500 font-bold tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Regional &amp; Online Hubs</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {CENTRES_MEGA_MENU.columns[1]?.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="flex items-center justify-between p-1.5 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-brand-red hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition"
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-600 text-white font-mono font-bold">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Featured Campus Card */}
                  <div className="col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-neutral-50 dark:bg-[#16161E] border border-neutral-200/80 dark:border-neutral-800/80">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded">
                        {CENTRES_MEGA_MENU.featuredCard?.badge}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {CENTRES_MEGA_MENU.featuredCard?.title}
                      </h4>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {CENTRES_MEGA_MENU.featuredCard?.description}
                      </p>
                    </div>

                    <Link
                      href={CENTRES_MEGA_MENU.featuredCard?.ctaHref || "/centres"}
                      className="btn-red text-xs py-2 px-3 font-bold text-center mt-4 flex items-center justify-center gap-1.5"
                    >
                      <span>{CENTRES_MEGA_MENU.featuredCard?.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* C. About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/about"
                onClick={() => {
                  if (activeMegaMenu !== "about") {
                    handleMouseEnter("about");
                  }
                }}
                className={`px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-[13px] xl:text-[14px] font-semibold whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                  pathname === "/about" || activeMegaMenu === "about"
                    ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                }`}
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "about" ? "rotate-180 text-brand-red" : "opacity-50"
                  }`}
                />
              </Link>

              {activeMegaMenu === "about" && (
                <div
                  onMouseEnter={() => handleMouseEnter("about")}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-0 pt-2 z-50 animate-in fade-in-50 duration-150"
                >
                  <div className="w-[380px] bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-3xl p-4 space-y-1 relative before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                    <div className="text-[10px] font-mono uppercase text-brand-red font-bold px-3 py-1">
                      Institute &amp; Governance
                    </div>
                    {ABOUT_DROPDOWN.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="block p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-red-soft dark:bg-brand-red/20 text-brand-red font-mono font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* D. Outcomes & Stories Links */}
            <Link
              href="/outcomes"
              className={`px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-[13px] xl:text-[14px] font-semibold whitespace-nowrap transition-colors ${
                pathname === "/outcomes"
                  ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                  : "text-neutral-700 dark:text-neutral-200 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
              }`}
            >
              Placements
            </Link>

            <Link
              href="/stories"
              className={`px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-[13px] xl:text-[14px] font-semibold whitespace-nowrap transition-colors ${
                pathname === "/stories"
                  ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                  : "text-neutral-700 dark:text-neutral-200 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
              }`}
            >
              Reviews
            </Link>

            {/* E. Resources Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleToggleMenu("resources")}
                className={`px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-[13px] xl:text-[14px] font-semibold whitespace-nowrap transition-colors inline-flex items-center gap-1.5 ${
                  activeMegaMenu === "resources"
                    ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                }`}
              >
                <span>{RESOURCES_MEGA_MENU.triggerLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "resources" ? "rotate-180 text-brand-red" : "opacity-50"
                  }`}
                />
              </button>

              {activeMegaMenu === "resources" && (
                <div
                  onMouseEnter={() => handleMouseEnter("resources")}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full right-0 xl:-right-6 pt-2 z-50 animate-in fade-in-50 duration-150"
                >
                  <div className="w-[780px] bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-3xl p-6 grid grid-cols-12 gap-6 relative before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                    <div className="col-span-8 grid grid-cols-2 gap-6 border-r border-neutral-100 dark:border-neutral-800 pr-6">
                    {/* Enterprise Column */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono uppercase text-brand-red font-bold tracking-wider flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Corporate &amp; Colleges</span>
                      </div>
                      <div className="space-y-1">
                        {RESOURCES_MEGA_MENU.columns[0]?.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="block p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition group"
                          >
                            <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                              {item.label}
                            </span>
                            {item.description && (
                              <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Credentials & Media Column */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold tracking-wider flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        <span>Credentials &amp; Media</span>
                      </div>
                      <div className="space-y-1">
                        {RESOURCES_MEGA_MENU.columns[1]?.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="block p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-neutral-700 dark:text-neutral-300">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Featured Card */}
                  <div className="col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-neutral-50 dark:bg-[#16161E] border border-neutral-200/80 dark:border-neutral-800/80">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded">
                        {RESOURCES_MEGA_MENU.featuredCard?.badge}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {RESOURCES_MEGA_MENU.featuredCard?.title}
                      </h4>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {RESOURCES_MEGA_MENU.featuredCard?.description}
                      </p>
                    </div>

                    <Link
                      href={RESOURCES_MEGA_MENU.featuredCard?.ctaHref || "/learn"}
                      className="btn-red text-xs py-2 px-3 font-bold text-center mt-4 flex items-center justify-center gap-1.5"
                    >
                      <span>{RESOURCES_MEGA_MENU.featuredCard?.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* Direct Contact Link */}
            <Link
              href="/contact"
              className={`px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-[13px] xl:text-[14px] font-semibold whitespace-nowrap transition-colors ${
                pathname === "/contact"
                  ? "text-brand-red bg-brand-red-soft dark:bg-brand-red/10"
                  : "text-neutral-700 dark:text-neutral-200 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3 xl:gap-4 shrink-0">
            <ThemeToggle />

            <Link
              href="/enquire"
              className="hidden sm:inline-flex btn-red text-[13px] xl:text-[14px] py-2.5 px-5 xl:px-6 font-bold shadow-md shadow-brand-red/25 whitespace-nowrap items-center gap-2 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Request Callback</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile-only compact CTA */}
            <Link
              href="/enquire"
              className="sm:hidden btn-red text-xs py-2 px-3.5 font-bold rounded-lg whitespace-nowrap"
            >
              Callback
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. DEDICATED ACCESSIBLE MOBILE DRAWER                      */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[108px] sm:top-[114px] bottom-0 bg-white/95 dark:bg-[#0A0A0E]/95 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 z-50 p-4 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-3 pb-6">
              {/* Accordion 1: Training */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion("training")}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-brand-red" />
                    <span>Training Programs</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      mobileAccordion === "training" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileAccordion === "training" && (
                  <div className="px-4 pb-4 space-y-2 border-t border-neutral-100 dark:border-neutral-800/60 pt-3">
                    <div className="text-[10px] font-mono uppercase text-brand-red font-bold">Programs</div>
                    <Link
                      href="/programs/master-in-digital-marketing-course"
                      className="block p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-900 dark:text-white"
                    >
                      Master in Digital Marketing (MIDM - 52 Stops)
                    </Link>
                    <Link
                      href="/programs/digital-marketing-artificial-intelligence"
                      className="block p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-900 dark:text-white"
                    >
                      Digital Marketing Intelligence (DMI Diploma)
                    </Link>
                    <Link
                      href="/programs/advanced-digital-marketing-course"
                      className="block p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-900 dark:text-white"
                    >
                      Advanced in Digital Marketing (AIDM)
                    </Link>
                    <Link
                      href="/programs/online-digital-marketing-course"
                      className="block p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-900 dark:text-white"
                    >
                      Online Digital Marketing Course (Live 2-Way)
                    </Link>
                    <Link
                      href="/programs/gen-ai-knowledge-camp"
                      className="block p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-900 dark:text-white"
                    >
                      Gen AI Tools &amp; Prompting Camp
                    </Link>

                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-brand-red">
                      <Link href="/upcoming-batches">Upcoming Batches Schedule →</Link>
                      <Link href="/compare">Compare →</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Select Centers */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion("centres")}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-red" />
                    <span>Select Centers (14 Campuses)</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      mobileAccordion === "centres" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileAccordion === "centres" && (
                  <div className="px-4 pb-4 space-y-2 border-t border-neutral-100 dark:border-neutral-800/60 pt-3 max-h-60 overflow-y-auto touch-scroll">
                    <div className="text-[10px] font-mono uppercase text-brand-red font-bold">Delhi NCR</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CENTRES_MEGA_MENU.columns[0]?.items.map((ctr) => (
                        <Link
                          key={ctr.id}
                          href={ctr.href}
                          className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-900 dark:text-white"
                        >
                          {ctr.label.replace(" Campus", "").replace(" Hub", "")}
                        </Link>
                      ))}
                    </div>

                    <div className="text-[10px] font-mono uppercase text-neutral-400 font-bold pt-2">Regional</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CENTRES_MEGA_MENU.columns[1]?.items.map((ctr) => (
                        <Link
                          key={ctr.id}
                          href={ctr.href}
                          className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 text-xs font-semibold text-neutral-900 dark:text-white"
                        >
                          {ctr.label.replace(" Campus", "").replace(" Hub", "")}
                        </Link>
                      ))}
                    </div>

                    <Link href="/centres" className="block text-xs font-bold text-brand-red pt-2">
                      View All Campus Addresses &amp; Timings →
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 3: About Us */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion("about")}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-brand-red" />
                    <span>About DIDM</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      mobileAccordion === "about" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileAccordion === "about" && (
                  <div className="px-4 pb-4 space-y-1.5 border-t border-neutral-100 dark:border-neutral-800/60 pt-3">
                    {ABOUT_DROPDOWN.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="block p-2 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Resources */}
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion("resources")}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-brand-red" />
                    <span>Resources &amp; Media</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      mobileAccordion === "resources" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileAccordion === "resources" && (
                  <div className="px-4 pb-4 space-y-1.5 border-t border-neutral-100 dark:border-neutral-800/60 pt-3">
                    <Link
                      href="/certifications"
                      className="block p-2 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      30+ Global Certifications
                    </Link>
                    <Link
                      href="/media-coverage"
                      className="block p-2 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      Media Coverage &amp; Press
                    </Link>
                    <Link
                      href="/organisations"
                      className="block p-2 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      Corporate &amp; College Training
                    </Link>
                    <Link
                      href="/learn"
                      className="block p-2 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      Free LMS Knowledge Hub
                    </Link>
                  </div>
                )}
              </div>

              {/* Quick Utility Links Bar */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/franchise"
                  className="p-3 rounded-xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-center text-neutral-900 dark:text-white"
                >
                  Franchise
                </Link>
                <Link
                  href="/careers"
                  className="p-3 rounded-xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-center text-neutral-900 dark:text-white"
                >
                  Careers
                </Link>
                <Link
                  href="/contact"
                  className="p-3 rounded-xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-center text-neutral-900 dark:text-white"
                >
                  Contact Us
                </Link>
                <a
                  href="https://www.blog.didm.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-center text-neutral-900 dark:text-white flex items-center justify-center gap-1"
                >
                  <span>Blogs</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </div>
            </div>

            {/* Bottom Primary Action in Drawer */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <Link
                href="/enquire"
                className="w-full btn-red py-3.5 text-center text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-red/25"
              >
                <span>Request Free Callback &amp; Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
