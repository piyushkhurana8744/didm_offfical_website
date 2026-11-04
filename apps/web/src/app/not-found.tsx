import Link from "next/link";
import { ArrowLeft, Home, Compass, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found (404) | DIDM",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="py-20 md:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
        <div className="font-serif text-7xl sm:text-9xl text-brand-red font-normal">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            The page you are looking for may have been relocated, updated, or does not exist.
            Here are four helpful routes to get you back on track:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <Link
            href="/"
            className="p-4 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 hover:border-brand-red transition flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Homepage</div>
              <div className="text-[11px] text-neutral-500">Return to the main overview</div>
            </div>
          </Link>

          <Link
            href="/programs"
            className="p-4 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 hover:border-brand-red transition flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-ai/10 text-ai flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">All Programs</div>
              <div className="text-[11px] text-neutral-500">Explore MIDM, DMI & courses</div>
            </div>
          </Link>

          <Link
            href="/centres"
            className="p-4 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 hover:border-brand-red transition flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Find a Centre</div>
              <div className="text-[11px] text-neutral-500">13 physical branch locations</div>
            </div>
          </Link>

          <Link
            href="/enquire"
            className="p-4 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 hover:border-brand-red transition flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-brand-red" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">Counseling Desk</div>
              <div className="text-[11px] text-neutral-500">Book free trial demo class</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

