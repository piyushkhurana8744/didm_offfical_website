"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Navigation, ArrowRight, ExternalLink } from "lucide-react";
import campusesData from "@/data/didm-campuses-contact.json";
import { MotionSection, MotionHeading, StaggeredCardGrid } from "@/components/motion";

export function HomepageCentresDirectory() {
  const [filter, setFilter] = useState<"all" | "delhi" | "regional" | "online">("all");

  const filteredCampuses = campusesData.filter((c) => {
    if (filter === "online") return c.name.toLowerCase().includes("online");
    if (filter === "regional") {
      const name = c.name.toLowerCase();
      return name.includes("jaipur") || name.includes("dehradun") || name.includes("haldwani") || name.includes("varanasi") || name.includes("mumbai");
    }
    if (filter === "delhi") {
      const name = c.name.toLowerCase();
      return (
        name.includes("dwarka") ||
        name.includes("gurugram") ||
        name.includes("kalkaji") ||
        name.includes("noida") ||
        name.includes("pitampura") ||
        name.includes("preet vihar") ||
        name.includes("rajouri") ||
        name.includes("south campus") ||
        name.includes("south extension")
      );
    }
    return true;
  });

  return (
    <MotionSection id="centres" preset="editorial" className="py-14 sm:py-20 bg-neutral-50 dark:bg-[#0F1017] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Heading with Masked Reveal */}
        <MotionHeading
          eyebrow="14 Physical Branches & Live Online"
          title="Find Your Nearest DIDM Training Campus"
          description="Attend in-person classroom batches near your metro station or join interactive live online training from anywhere across India."
          align="center"
        />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All 14 Campuses" },
              { id: "delhi", label: "Delhi NCR (9)" },
              { id: "regional", label: "Regional Branches (4)" },
              { id: "online", label: "Live Online Campus (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition ${
                  filter === tab.id
                    ? "bg-brand-red text-white shadow-sm"
                    : "bg-white dark:bg-[#151620] text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-brand-red/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        {/* Campuses Grid with Staggered Cascading Motion */}
        <StaggeredCardGrid
          staggerMs={50}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCampuses.map((campus, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#151620] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg hover:border-brand-red/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-red uppercase tracking-wide font-heading">
                    DIDM Campus
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Active Branch" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-heading group-hover:text-brand-red transition">
                    {campus.name}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span>{campus.address}</span>
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                  <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                    <Phone className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span className="font-mono">{campus.call}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
                    <span className="font-semibold">Helpline:</span>
                    <span className="font-mono">{campus.helpline}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 flex items-center gap-3">
                <a
                  href={campus.directionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex-1 text-xs py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 font-bold flex items-center justify-center gap-1.5 hover:border-brand-red transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-brand-red" />
                  <span>Get Direction</span>
                </a>

                <a
                  href="#demo-enquiry"
                  className="btn-red text-xs py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1 shadow-xs transition"
                >
                  <span>Book Visit</span>
                </a>
              </div>
            </div>
          ))}
        </StaggeredCardGrid>

        {/* Bottom Contact Strip */}
        <div className="text-center pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline transition"
          >
            <span>View Full Campus Directory with Metros, Maps &amp; Visiting Timings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </MotionSection>
  );
}
