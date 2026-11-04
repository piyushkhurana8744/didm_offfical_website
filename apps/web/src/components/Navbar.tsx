"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowUpRight, GraduationCap, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SITE_DATA } from "@/data/site-data";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Programs", href: "/programs" },
    { label: "Compare", href: "/compare" },
    { label: "Centres", href: "/centres" },
    { label: "Outcomes", href: "/outcomes" },
    { label: "Stories", href: "/stories" },
    { label: "About", href: "/about" },
    { label: "Free Learn", href: "/learn" },
    { label: "For Teams", href: "/organisations" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FBFAF7]/95 dark:bg-[#0A0A0E]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-sm font-bold text-lg group-hover:scale-105 transition-transform">
            D
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white flex items-center gap-1.5">
              DIDM
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-red-soft dark:bg-brand-red/20 text-brand-red font-semibold border border-brand-red/20">
                AI Powered
              </span>
            </span>
            <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 hidden sm:inline -mt-0.5">
              Delhi Institute of Digital Marketing
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Programs with submenu trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setProgramsDropdownOpen(true)}
            onMouseLeave={() => setProgramsDropdownOpen(false)}
          >
            <Link
              href="/programs"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                pathname.startsWith("/program")
                  ? "text-brand-red bg-brand-red/10 font-semibold"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
              }`}
            >
              Programs
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Link>

            {programsDropdownOpen && (
              <div className="absolute top-full left-0 w-72 bg-white dark:bg-surface-dark border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl p-2.5 space-y-1 animate-in fade-in-50 zoom-in-95">
                {SITE_DATA.programs.map((p) => (
                  <Link
                    key={p.id}
                    href={`/program?p=${p.id}`}
                    className="block p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white">
                      <span>{p.shortName}</span>
                      {p.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-red-soft text-brand-red font-mono font-medium">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                      {p.duration} · {p.hours}
                    </div>
                  </Link>
                ))}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <Link
                    href="/compare"
                    className="flex items-center justify-between p-2 text-xs font-semibold text-brand-red hover:underline"
                  >
                    <span>Compare All Courses side-by-side</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "text-brand-red bg-brand-red/10 font-semibold"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-brand-red hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <a
            href={`tel:${SITE_DATA.brand.phoneClean}`}
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-brand-red px-2.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 transition"
          >
            <Phone className="w-3.5 h-3.5 text-brand-red" />
            <span>088005 05151</span>
          </a>

          <Link
            href="/enquire"
            className="btn-red text-xs sm:text-sm py-2 px-3.5 sm:px-5 font-semibold"
          >
            Book Free Demo
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-[#FBFAF7] dark:bg-[#0A0A0E] z-50 p-6 flex flex-col justify-between overflow-y-auto border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
              Navigation Menu
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl font-semibold text-base text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl font-semibold text-base text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                Explore Programs
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SITE_DATA.programs.map((p) => (
                  <Link
                    key={p.id}
                    href={`/program?p=${p.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-medium hover:border-brand-red"
                  >
                    <div className="font-bold text-neutral-900 dark:text-white">{p.shortName}</div>
                    <div className="text-[11px] text-neutral-500">{p.duration}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <a
              href={`tel:${SITE_DATA.brand.phoneClean}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-neutral-300 dark:border-neutral-700 font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-brand-red" />
              Call Toll-Free: 88005 05151
            </a>
            <Link
              href="/enquire"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-red w-full text-center py-3 text-sm font-semibold"
            >
              Book 1-on-1 Free Counseling
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
