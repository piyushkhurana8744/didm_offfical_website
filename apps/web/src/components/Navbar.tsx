"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDialogFocus } from "@/components/public/useDialogFocus";
import {
  Phone,
  Menu,
  X,
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
  Play,
  Mail,
  ArrowRight,
  ShieldCheck,
  Star,
  Compass,
} from "lucide-react";
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
  const [drawerTop, setDrawerTop] = useState(100);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  useDialogFocus(drawerRef, mobileMenuOpen);
  useDialogFocus(videoRef, videoModalOpen);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const keyboardMenuRef = useRef<string | null>(null);
  const openMenuFromKeyboard = (menuId: string) => {
    keyboardMenuRef.current = menuId;
    if (activeMegaMenu === menuId) {
      document.querySelector<HTMLElement>(`#desktop-${menuId} a`)?.focus();
      keyboardMenuRef.current = null;
    } else setActiveMegaMenu(menuId);
  };
  useEffect(() => {
    if (activeMegaMenu && keyboardMenuRef.current === activeMegaMenu) {
      document.querySelector<HTMLElement>(`#desktop-${activeMegaMenu} a`)?.focus();
      keyboardMenuRef.current = null;
    } else if (!activeMegaMenu) keyboardMenuRef.current = null;
  }, [activeMegaMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const positionDrawer = () => {
      if (window.innerWidth >= 1024) { setMobileMenuOpen(false); return; }
      setDrawerTop(navRef.current?.getBoundingClientRect().bottom || 0);
    };
    positionDrawer();
    window.addEventListener("resize", positionDrawer);
    return () => window.removeEventListener("resize", positionDrawer);
  }, [mobileMenuOpen]);

  // Smooth hover handlers with grace delay
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
    }, 240);
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

  // Lock body scroll when mobile menu or video modal is open
  useEffect(() => {
    if (mobileMenuOpen || videoModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, videoModalOpen]);

  // Close menus on route change or Escape key
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeMegaMenu) document.querySelector<HTMLElement>(`[aria-controls="desktop-${activeMegaMenu}"]`)?.focus();
        setActiveMegaMenu(null);
        setMobileMenuOpen(false);
        setVideoModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMegaMenu]);

  const toggleMobileAccordion = (id: string) => {
    setMobileAccordion((prev) => (prev === id ? null : id));
  };

  const isAboutActive =
    pathname === "/about" ||
    pathname === "/trainers" ||
    pathname === "/outcomes" ||
    pathname === "/stories" ||
    pathname === "/why-choose-didm" ||
    pathname === "/life-at-didm";

  const isTrainingActive =
    pathname.startsWith("/program") ||
    pathname === "/upcoming-batches" ||
    pathname === "/compare";

  const isCentresActive =
    pathname.startsWith("/centre") || pathname === "/centres";

  const isResourcesActive =
    pathname === "/certifications" ||
    pathname === "/media-coverage" ||
    pathname === "/news-and-events" ||
    pathname === "/gallery" ||
    pathname === "/corporate-training-program" ||
    pathname === "/colleges-and-university-session" ||
    pathname === "/faqs";

  return (
    <>
      {/* ========================================================= */}
      {/* 1. TOP UTILITY BAR (Official DIDM Signature Crimson Red) */}
      {/* ========================================================= */}
      <div className="bg-[#b52828] text-white text-[12px] font-medium py-1.5 sm:py-2 select-none z-50 relative border-b border-[#9e1c1c]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Desktop Left: Quick Utility Links */}
          <div className="hidden md:flex items-center gap-3 text-white/90">
            {UTILITY_NAVIGATION.map((item, idx) => (
              <span key={item.id} className="inline-flex items-center gap-3">
                {idx > 0 && <span className="text-white/30 text-[10px]">|</span>}
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-150 inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </div>

          {/* Mobile Left: Announcement / Admissions tag */}
          <div className="flex md:hidden items-center gap-2 text-white/95 text-[11px] font-medium truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="truncate">Admissions Open 2026–27 · 10+ Years</span>
          </div>

          {/* Right: Contact & Helpline */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-white/90 text-[11px] sm:text-[12px]">
            <a
              href="mailto:info@didm.in"
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 opacity-80" />
              <span>info@didm.in</span>
            </a>
            <span className="hidden lg:inline text-white/30 text-[10px]">|</span>
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="flex items-center gap-1.5 font-bold text-white hover:text-white/90 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>+91 8800505151</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN NAVBAR & DROPDOWNS                                */}
      {/* ========================================================= */}
      <header
        ref={navRef}
        data-dialog-open={mobileMenuOpen}
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-white/98 dark:bg-[#101016]/98 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border-b border-neutral-100 dark:border-neutral-800"
            : "bg-white dark:bg-[#101016] border-b border-neutral-100 dark:border-neutral-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] sm:h-[74px] lg:h-[76px] flex items-center justify-between gap-4">
          {/* Left: Official DIDM Logo + Iconic Red Video Tour Play Circle */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <Link
              href="/"
              className="flex items-center py-1 group"
              aria-label="DIDM — Delhi Institute of Digital Marketing Home"
            >
              <Image
                src={DIDM_MEDIA.officialLogo.path}
                alt={DIDM_MEDIA.officialLogo.alt}
                width={DIDM_MEDIA.officialLogo.width}
                height={DIDM_MEDIA.officialLogo.height}
                className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                priority
              />
            </Link>

            {/* Signature Video Tour Play Button (from original DIDM site) */}
            <button
              onClick={() => setVideoModalOpen(true)}
              aria-label="Watch DIDM Campus Tour Video"
              title="Watch DIDM Campus Tour"
              className="hidden sm:flex relative items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#b52828] text-white shadow-sm hover:scale-110 active:scale-95 transition-transform"
            >
              <span className="absolute -inset-1 rounded-full bg-[#b52828]/25 animate-ping pointer-events-none" />
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5 relative z-10" />
            </button>
          </div>

          {/* Desktop Navigation Links — Natural, balanced, official institutional IA */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
            {/* 1. Home */}
            <Link
              href="/"
              className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg ${
                pathname === "/"
                  ? "text-[#b52828]"
                  : "text-neutral-700 dark:text-neutral-200 hover:text-[#b52828] hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
              }`}
            >
              Home
            </Link>

            {/* 2. About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/about"
                aria-expanded={activeMegaMenu === "about"}
                aria-controls="desktop-about"
                onKeyDown={event=>{if(event.key==="ArrowDown"||event.key===" "){event.preventDefault();openMenuFromKeyboard("about");}}}
                onClick={() => {
                  if (activeMegaMenu !== "about") {
                    handleMouseEnter("about");
                  }
                }}
                className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg inline-flex items-center gap-1.5 ${
                  isAboutActive || activeMegaMenu === "about"
                    ? "text-[#b52828]"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-[#b52828] hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                }`}
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "about" ? "rotate-180 text-[#b52828]" : "opacity-60"
                  }`}
                />
              </Link>

              {activeMegaMenu === "about" && (
                <div
                  id="desktop-about"
                  onMouseEnter={() => handleMouseEnter("about")}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-0 pt-2 z-50 animate-in fade-in-50 duration-150"
                >
                  <div className="w-[360px] bg-white dark:bg-[#131319] border border-neutral-200/90 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl p-3 space-y-1 relative before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#b52828] font-bold px-3 py-1.5">
                      Institute &amp; Legacy
                    </div>
                    {ABOUT_DROPDOWN.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="block px-3 py-2 rounded-xl hover:bg-red-50/60 dark:hover:bg-neutral-800/80 transition group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-[#b52828] transition">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-[#b52828] font-mono font-semibold">
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

            {/* 3. Training Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("training")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={TRAINING_MEGA_MENU.href}
                aria-expanded={activeMegaMenu === "training"}
                aria-controls="desktop-training"
                onKeyDown={event=>{if(event.key==="ArrowDown"||event.key===" "){event.preventDefault();openMenuFromKeyboard("training");}}}
                onClick={() => {
                  if (activeMegaMenu !== "training") {
                    handleMouseEnter("training");
                  }
                }}
                className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg inline-flex items-center gap-1.5 ${
                  isTrainingActive || activeMegaMenu === "training"
                    ? "text-[#b52828]"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-[#b52828] hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                }`}
              >
                <span>{TRAINING_MEGA_MENU.triggerLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "training" ? "rotate-180 text-[#b52828]" : "opacity-60"
                  }`}
                />
              </Link>

              {activeMegaMenu === "training" && (
                <div
                  id="desktop-training"
                  onMouseEnter={() => handleMouseEnter("training")}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in-50 duration-150"
                >
                  <div className="w-[820px] bg-white dark:bg-[#131319] border border-neutral-200/90 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl p-6 grid grid-cols-12 gap-6 relative before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                    {/* Columns 1 & 2: Courses */}
                    <div className="col-span-8 grid grid-cols-2 gap-6 border-r border-neutral-100 dark:border-neutral-800 pr-6">
                      {/* Column 1: Certification Programs */}
                      <div className="space-y-3">
                        <div className="text-[11px] font-mono uppercase text-[#b52828] font-bold tracking-wider flex items-center gap-1.5">
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
                                <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-[#b52828] transition">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#b52828] text-white font-mono font-semibold">
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

                      {/* Column 2: AI Diploma & Cohorts */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="text-[11px] font-mono uppercase text-[#b52828] font-bold tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Diploma Program</span>
                          </div>
                          {TRAINING_MEGA_MENU.columns[0]?.items.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              className="block p-2.5 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 hover:bg-red-100/60 dark:hover:bg-red-900/30 transition group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-[#b52828] transition">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#b52828] text-white font-mono font-semibold">
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

                        <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                          <div className="text-[11px] font-mono uppercase text-neutral-500 font-bold tracking-wider flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Admissions &amp; Batches</span>
                          </div>
                          {TRAINING_MEGA_MENU.columns[2]?.items.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              className="flex items-center justify-between p-1.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-[#b52828] hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition"
                            >
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className="text-[9px] px-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Featured Course Card */}
                    <div className="col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/80 dark:from-[#16161E] dark:to-[#1a1a24] border border-neutral-200/80 dark:border-neutral-800/80">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#b52828] bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded">
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
                        className="bg-[#b52828] hover:bg-[#9e1c1c] text-white text-xs py-2 px-3.5 font-bold text-center mt-4 flex items-center justify-center gap-1.5 rounded-xl shadow-sm transition"
                      >
                        <span>{TRAINING_MEGA_MENU.featuredCard?.ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Select Centers Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("centres")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={CENTRES_MEGA_MENU.href}
                aria-expanded={activeMegaMenu === "centres"}
                aria-controls="desktop-centres"
                onKeyDown={event=>{if(event.key==="ArrowDown"||event.key===" "){event.preventDefault();openMenuFromKeyboard("centres");}}}
                onClick={() => {
                  if (activeMegaMenu !== "centres") {
                    handleMouseEnter("centres");
                  }
                }}
                className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg inline-flex items-center gap-1.5 ${
                  isCentresActive || activeMegaMenu === "centres"
                    ? "text-[#b52828]"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-[#b52828] hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                }`}
              >
                <span>{CENTRES_MEGA_MENU.triggerLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "centres" ? "rotate-180 text-[#b52828]" : "opacity-60"
                  }`}
                />
              </Link>

              {activeMegaMenu === "centres" && (
                <div
                  id="desktop-centres"
                  onMouseEnter={() => handleMouseEnter("centres")}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in-50 duration-150"
                >
                  <div className="w-[820px] bg-white dark:bg-[#131319] border border-neutral-200/90 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl p-6 grid grid-cols-12 gap-6 relative before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                    <div className="col-span-8 grid grid-cols-2 gap-6 border-r border-neutral-100 dark:border-neutral-800 pr-6">
                      {/* Delhi NCR Campuses */}
                      <div className="space-y-3">
                        <div className="text-[11px] font-mono uppercase text-[#b52828] font-bold tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Delhi NCR Campuses</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          {CENTRES_MEGA_MENU.columns[0]?.items.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              className="flex items-center justify-between p-1.5 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-[#b52828] hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition"
                            >
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#b52828] text-white font-mono font-bold">
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
                              className="flex items-center justify-between p-1.5 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-[#b52828] hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition"
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
                    <div className="col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/80 dark:from-[#16161E] dark:to-[#1a1a24] border border-neutral-200/80 dark:border-neutral-800/80">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#b52828] bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded">
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
                        className="bg-[#b52828] hover:bg-[#9e1c1c] text-white text-xs py-2 px-3.5 font-bold text-center mt-4 flex items-center justify-center gap-1.5 rounded-xl shadow-sm transition"
                      >
                        <span>{CENTRES_MEGA_MENU.featuredCard?.ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Resources Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleToggleMenu("resources")}
                aria-expanded={activeMegaMenu === "resources"}
                aria-controls="desktop-resources"
                className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg inline-flex items-center gap-1.5 ${
                  isResourcesActive || activeMegaMenu === "resources"
                    ? "text-[#b52828]"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-[#b52828] hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                }`}
              >
                <span>{RESOURCES_MEGA_MENU.triggerLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMegaMenu === "resources" ? "rotate-180 text-[#b52828]" : "opacity-60"
                  }`}
                />
              </button>

              {activeMegaMenu === "resources" && (
                <div
                  id="desktop-resources"
                  onMouseEnter={() => handleMouseEnter("resources")}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-full -left-20 xl:-left-12 pt-2 z-50 animate-in fade-in-50 duration-150"
                >
                  <div className="w-[800px] bg-white dark:bg-[#131319] border border-neutral-200/90 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl p-6 grid grid-cols-12 gap-6 relative before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                    <div className="col-span-8 grid grid-cols-2 gap-6 border-r border-neutral-100 dark:border-neutral-800 pr-6">
                      {/* Enterprise Column */}
                      <div className="space-y-3">
                        <div className="text-[11px] font-mono uppercase text-[#b52828] font-bold tracking-wider flex items-center gap-1.5">
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
                              <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-[#b52828] transition">
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
                        <div className="text-[11px] font-mono uppercase text-neutral-500 font-bold tracking-wider flex items-center gap-1.5">
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
                                <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-[#b52828] transition">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-neutral-700 dark:text-neutral-300">
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
                    <div className="col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100/80 dark:from-[#16161E] dark:to-[#1a1a24] border border-neutral-200/80 dark:border-neutral-800/80">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#b52828] bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded">
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
                        href={RESOURCES_MEGA_MENU.featuredCard?.ctaHref || "/enquire"}
                        className="bg-[#b52828] hover:bg-[#9e1c1c] text-white text-xs py-2 px-3.5 font-bold text-center mt-4 flex items-center justify-center gap-1.5 rounded-xl shadow-sm transition"
                      >
                        <span>{RESOURCES_MEGA_MENU.featuredCard?.ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Contact */}
            <Link
              href="/contact"
              className={`px-3 py-2 text-[14px] font-semibold transition-colors duration-150 rounded-lg ${
                pathname === "/contact"
                  ? "text-[#b52828]"
                  : "text-neutral-700 dark:text-neutral-200 hover:text-[#b52828] hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Request Callback CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Desktop Request Callback Button */}
            <Link
              href="/enquire"
              className="hidden sm:inline-flex bg-[#b52828] hover:bg-[#9e1c1c] text-white text-[13.5px] font-bold py-2.5 px-5 xl:px-6 rounded-full shadow-md shadow-[#b52828]/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Request Callback</span>
            </Link>

            {/* Mobile compact call & callback */}
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="sm:hidden p-2 text-[#b52828] bg-red-50 dark:bg-red-950/30 rounded-full"
              aria-label="Call DIDM"
            >
              <Phone className="w-4 h-4 fill-current" />
            </a>

            <Link
              href="/enquire"
              className="sm:hidden bg-[#b52828] text-white text-xs font-bold py-1.5 px-3 rounded-full whitespace-nowrap"
            >
              Callback
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => { setDrawerTop(navRef.current?.getBoundingClientRect().height || 0); setMobileMenuOpen(!mobileMenuOpen); }}
              className="lg:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              aria-label="Toggle navigation drawer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. DEDICATED MOBILE DRAWER                                */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div ref={drawerRef} style={{top:drawerTop}} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="DIDM navigation" tabIndex={-1} className="lg:hidden fixed inset-x-0 top-[98px] sm:top-[106px] bottom-0 bg-white dark:bg-[#0e0e13] border-t border-neutral-200 dark:border-neutral-800 z-50 p-4 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div className="space-y-2 pb-6">
              <div className="flex items-center justify-between px-3 py-2"><span className="text-xs font-semibold uppercase tracking-widest">Explore DIDM</span><button type="button" aria-label="Close navigation" onClick={()=>setMobileMenuOpen(false)} className="rounded-lg border border-neutral-200 p-3"><X size={18} /></button></div>
              <Link href="/course-finder" onClick={()=>setMobileMenuOpen(false)} className="flex items-center justify-between rounded-xl bg-red-50 p-3.5 text-sm font-semibold text-brand-red">Find your course <ArrowRight size={17} /></Link>
              {/* Home Link */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl font-bold text-sm text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
              >
                <span>Home</span>
              </Link>

              {/* Accordion: About Us */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion("about")}
                  aria-expanded={mobileAccordion === "about"}
                  aria-controls="mobile-about"
                  className="w-full flex items-center justify-between p-3.5 text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-[#b52828]" />
                    <span>About Us</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileAccordion === "about" ? "rotate-180 text-[#b52828]" : "opacity-50"
                    }`}
                  />
                </button>
                {mobileAccordion === "about" && (
                  <div id="mobile-about" className="px-4 pb-4 pt-1 space-y-1.5 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    {ABOUT_DROPDOWN.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 font-semibold text-neutral-800 dark:text-neutral-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion: Training */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion("training")}
                  aria-expanded={mobileAccordion === "training"}
                  aria-controls="mobile-training"
                  className="w-full flex items-center justify-between p-3.5 text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#b52828]" />
                    <span>Training Programs</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileAccordion === "training" ? "rotate-180 text-[#b52828]" : "opacity-50"
                    }`}
                  />
                </button>
                {mobileAccordion === "training" && (
                  <div id="mobile-training" className="px-4 pb-4 pt-1 space-y-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    <div className="font-bold text-[#b52828] text-[10px] uppercase font-mono tracking-wider pt-1">
                      Certification Tracks
                    </div>
                    {TRAINING_MEGA_MENU.columns[1]?.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 font-semibold text-neutral-800 dark:text-neutral-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="font-bold text-[#b52828] text-[10px] uppercase font-mono tracking-wider pt-1">
                      Diploma Track
                    </div>
                    {TRAINING_MEGA_MENU.columns[0]?.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2 rounded-lg bg-red-50/60 dark:bg-red-950/20 font-bold text-[#b52828]"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/upcoming-batches"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white"
                    >
                      Upcoming Batches &amp; Timings →
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion: Select Centers */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion("centres")}
                  aria-expanded={mobileAccordion === "centres"}
                  aria-controls="mobile-centres"
                  className="w-full flex items-center justify-between p-3.5 text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#b52828]" />
                    <span>Select Centers (14 Campuses)</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileAccordion === "centres" ? "rotate-180 text-[#b52828]" : "opacity-50"
                    }`}
                  />
                </button>
                {mobileAccordion === "centres" && (
                  <div id="mobile-centres" className="px-4 pb-4 pt-1 space-y-1.5 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    <div className="font-bold text-neutral-500 text-[10px] uppercase font-mono tracking-wider pt-1">
                      Delhi NCR Campuses
                    </div>
                    {CENTRES_MEGA_MENU.columns[0]?.items.slice(0, 5).map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 font-semibold text-neutral-800 dark:text-neutral-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/centres"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center text-xs font-bold text-[#b52828] pt-2"
                    >
                      View All 14 Centres &amp; Maps →
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion: Resources */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion("resources")}
                  aria-expanded={mobileAccordion === "resources"}
                  aria-controls="mobile-resources"
                  className="w-full flex items-center justify-between p-3.5 text-left font-bold text-sm text-neutral-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#b52828]" />
                    <span>Resources &amp; Credentials</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileAccordion === "resources" ? "rotate-180 text-[#b52828]" : "opacity-50"
                    }`}
                  />
                </button>
                {mobileAccordion === "resources" && (
                  <div id="mobile-resources" className="px-4 pb-4 pt-1 space-y-1.5 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    <Link
                      href="/certifications"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      30+ Global Certifications
                    </Link>
                    <Link
                      href="/media-coverage"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      Media Coverage &amp; Awards
                    </Link>
                    <Link
                      href="/corporate-training-program"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      Corporate Training Program
                    </Link>
                    <Link
                      href="/colleges-and-university-session"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      Colleges &amp; Universities
                    </Link>
                    <Link
                      href="/faqs"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      Frequently Asked Questions
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct Quick Links */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <Link
                  href="/outcomes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-neutral-50 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 font-bold text-neutral-900 dark:text-white text-center"
                >
                  Placements &amp; Salaries
                </Link>
                <Link
                  href="/stories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-neutral-50 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 font-bold text-neutral-900 dark:text-white text-center"
                >
                  Student Reviews
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="col-span-2 p-3 rounded-xl bg-neutral-50 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 font-bold text-neutral-900 dark:text-white text-center"
                >
                  Contact &amp; Centre Directions
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 pb-2 space-y-2.5 border-t border-neutral-200 dark:border-neutral-800">
              <Link
                href="/enquire"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 text-sm font-bold block rounded-xl bg-[#b52828] text-white shadow-md shadow-[#b52828]/25"
              >
                Book a Free 1-on-1 Trial Class
              </Link>
              <a
                href={`tel:${SITE_BRAND.phoneClean}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-[#b52828]"
              >
                <Phone className="w-3.5 h-3.5 text-[#b52828]" />
                <span>Call Helpline: +91 8800505151</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 4. SIGNATURE VIDEO TOUR MODAL                             */}
      {/* ========================================================= */}
      {videoModalOpen && (
        <div ref={videoRef} role="dialog" aria-modal="true" aria-label="DIDM campus tour" tabIndex={-1} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/90 text-white border-b border-neutral-800">
              <div className="flex items-center gap-2 text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-[#b52828] animate-pulse" />
                <span>DIDM Official Campus Tour &amp; Student Overview</span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                aria-label="Close video tour"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Iframe Container */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/C-fBLt9XEY8?autoplay=1&rel=0"
                title="Delhi Institute of Digital Marketing - DIDM Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
