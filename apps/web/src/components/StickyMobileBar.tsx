"use client";

import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck, Sparkles } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";

export function StickyMobileBar() {
  return (
    <div className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#131319]/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 p-2 sm:p-2.5 px-3 sm:px-6 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-colors pb-[max(0.6rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
        <a
          href={`tel:${SITE_DATA.brand.phoneClean}`}
          className="flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-[11px] font-bold hover:bg-neutral-200 active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-brand-red mb-0.5" />
          <span>Call DIDM</span>
        </a>

        <a
          href={SITE_DATA.brand.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800/50 active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/enquire"
          className="flex flex-col items-center justify-center py-2 px-1.5 rounded-2xl bg-brand-red text-white text-[11px] font-bold active:scale-95 shadow-md shadow-brand-red/20 transition"
        >
          <CalendarCheck className="w-4 h-4 mb-0.5" />
          <span>Book Demo</span>
        </Link>
      </div>
    </div>
  );
}
