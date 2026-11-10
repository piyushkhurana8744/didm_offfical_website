"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Award, Laptop, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { DIDM_MEDIA } from "@/data/didm-media";

const CAMPUS_SNAPS = [
  {
    title: "Noida centre community",
    location: "DIDM Noida",
    tag: "Centre experience",
    image: DIDM_MEDIA.noidaCentre,
    caption: "A verified image associated with the DIDM Noida centre.",
  },
  {
    title: "Meerut centre community",
    location: "DIDM Meerut",
    tag: "Centre experience",
    image: DIDM_MEDIA.meerutCentre,
    caption: "A verified image associated with the DIDM Meerut centre.",
  },
  {
    title: "Haldwani centre community",
    location: "DIDM Haldwani",
    tag: "Centre experience",
    image: DIDM_MEDIA.haldwaniCentre,
    caption: "A verified image associated with the DIDM Haldwani centre.",
  },
  {
    title: "Corporate learning sessions",
    location: "DIDM institutional training",
    tag: "Team learning",
    image: DIDM_MEDIA.corporateTraining,
    caption: "A verified DIDM image from its corporate training program.",
  },
];

export function CampusGallery() {
  return (
    <section className="py-20 md:py-28 bg-[#FBFAF7] dark:bg-[#0A0A0E] border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-bold uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>DIDM LEARNING CENTRE NETWORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-tight">
              State-of-the-art labs. <em>True agency culture</em>.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Explore verified centre pages, compare locations and contact the admissions team to arrange a visit before enrolling.
            </p>
          </div>

          <Link
            href="/centres"
            className="btn-ghost text-xs sm:text-sm py-3 px-5 font-bold flex items-center gap-2 shrink-0"
          >
            <span>Explore All Centres</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {CAMPUS_SNAPS.map((snap, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 group card-hover shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                <Image
                  src={snap.image.path}
                  alt={snap.image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono font-semibold">
                    {snap.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-2">
                <div className="text-xs font-mono uppercase text-brand-red font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{snap.location}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {snap.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {snap.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Want to see our classroom in person before deciding?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              Walk in for a 100% free trial class, inspect the computer stations, and meet your trainer.
            </p>
          </div>

          <Link
            href="/enquire"
            className="btn-red text-xs sm:text-sm py-3 px-6 font-bold shrink-0 shadow-lg shadow-brand-red/30"
          >
            Schedule Campus Visit
          </Link>
        </div>
      </div>
    </section>
  );
}

