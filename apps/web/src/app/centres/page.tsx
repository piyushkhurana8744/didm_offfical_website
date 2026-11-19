import Link from "next/link";
import { MapPin, Phone, Building2, Search } from "lucide-react";
import { CenterFinder } from "@/components/CenterFinder";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.didm.in/centres" },
  title: "13+ Digital Marketing Centres in Delhi NCR & North India | DIDM",
  description:
    "Find your nearest DIDM branch in Dwarka, South Ex, Noida, Gurgaon, Pitampura, Kalkaji, Preet Vihar, Chandigarh, Dehradun or join live online.",
};

export default function CentresPage() {
  return (
    <div className="creative-page creative-directory py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <MotionSection as="div" preset="editorial">
          <MotionHeading as="h1"
            eyebrow="CAMPUS NETWORK"
            title={
              <>
                13+ physical centres and a <span className="text-[#b52828]">global interactive campus</span>.
              </>
            }
            description="All DIDM centres feature modern computer labs, high-speed fiber internet, smart interactive screens, and dedicated doubt-clearing faculty desks. Walk in anytime to attend a live demo."
            align="left"
          />
        </MotionSection>

        {/* Live Search & Region Filter Component */}
        <MotionSection as="div" preset="stagger">
          <CenterFinder />
        </MotionSection>

        {/* Visit Guidelines */}
        <MotionSection as="div" preset="scale">
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
        </MotionSection>
      </div>
    </div>
  );
}

