import Link from "next/link";
import { MapPin, Phone, Building2, Search } from "lucide-react";
import { CenterFinder } from "@/components/CenterFinder";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "13+ Digital Marketing Centres in Delhi NCR & North India | DIDM",
  description:
    "Find your nearest DIDM branch in Dwarka, South Ex, Noida, Gurgaon, Pitampura, Kalkaji, Preet Vihar, Chandigarh, Dehradun or join live online.",
};

export default function CentresPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
              CAMPUS NETWORK
            </div>
            <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
              13+ physical centres and a <em>global interactive campus</em>.
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              All DIDM centres feature modern computer labs, high-speed fiber internet, smart interactive
              screens, and dedicated doubt-clearing faculty desks. Walk in anytime to attend a live demo.
            </p>
          </div>
        </RevealOnScroll>

        {/* Live Search & Region Filter Component */}
        <CenterFinder />

        {/* Visit Guidelines */}
        <RevealOnScroll direction="up" delayMs={100}>
          <div className="p-8 rounded-3xl bg-neutral-100/70 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Centre Visiting Hours & Free Trial Protocol
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              All DIDM branches are open Monday through Friday from 9:00 AM to 9:00 PM, and Saturday through Sunday from 9:00 AM to 7:00 PM.
              No appointment is strictly necessary for general inquiries, but booking in advance ensures a senior academic counselor is reserved for your personalized 1-on-1 demo.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <Link href="/enquire" className="btn-red text-xs py-2.5 px-5 font-bold">
                Reserve Counseling Slot
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

