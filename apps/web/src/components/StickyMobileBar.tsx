"use client";

import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";

export function StickyMobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#131319]/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-4 shadow-2xl transition-colors">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${SITE_DATA.brand.phoneClean}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] font-semibold hover:bg-neutral-200 active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-brand-red mb-0.5" />
          <span>Call DIDM</span>
        </a>

        <a
          href={SITE_DATA.brand.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800/50 active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/enquire"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-brand-red text-white text-[11px] font-semibold active:scale-95 shadow-sm transition"
        >
          <CalendarCheck className="w-4 h-4 mb-0.5" />
          <span>Book Demo</span>
        </Link>
      </div>
    </div>
  );
}
