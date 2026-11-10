"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Phone, Star, ArrowRight, Train, CheckCircle2 } from "lucide-react";
import { getAllCentres } from "@/lib/content";
import type { Centre } from "@/types/content";
import { getCentreMedia } from "@/data/didm-media";

export function CenterFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const centres = useMemo(() => getAllCentres(), []);

  const regions = [
    "All",
    "Delhi",
    "Noida/UP",
    "Gurgaon/Haryana",
    "Uttarakhand",
    "Maharashtra",
    "Rajasthan",
    "Online",
  ];

  const filteredCentres = useMemo(() => {
    return centres.filter((c) => {
      const matchesRegion = selectedRegion === "All" || c.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.landmark.toLowerCase().includes(q) ||
        (c.metroStation && c.metroStation.toLowerCase().includes(q));

      return matchesRegion && matchesSearch;
    });
  }, [centres, searchQuery, selectedRegion]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search & Region Filters Header */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 sm:space-y-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by area, landmark, or city (e.g. Dwarka, Noida, Kalkaji, Jaipur)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
            />
          </div>

          {/* Result Count Indicator */}
          <div className="text-xs font-mono font-medium text-neutral-500 whitespace-nowrap self-start md:self-center">
            Showing <strong className="text-neutral-900 dark:text-white">{filteredCentres.length}</strong> of{" "}
            {centres.length} Campuses
          </div>
        </div>

        {/* Region Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 touch-scroll">
          {regions.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-brand-red text-white shadow-sm"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Centre Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredCentres.map((centre) => {
          const primaryPhone = centre.phones[0] || "918800505151";
          const cleanPhone = primaryPhone.replace(/[^0-9]/g, "");
          const centreMedia = getCentreMedia(centre.slug);

          return (
            <div
              key={centre.id}
              className="rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 flex flex-col justify-between card-hover relative group"
            >
              {centre.isHeadOffice && (
                <span className="absolute top-5 right-5 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-brand-red text-white font-bold">
                  Head Office
                </span>
              )}

              <div className="space-y-4">
                {centreMedia && (
                  <Link href={`/centres/${centre.slug}`} className="relative block aspect-[15/4] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                    <Image
                      src={centreMedia.path}
                      alt={centreMedia.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </Link>
                )}
                <div>
                  <div className="text-[11px] font-mono uppercase text-brand-red font-bold">
                    {centre.city} · {centre.region}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-brand-red transition">
                    <Link href={`/centres/${centre.slug}`}>
                      {centre.name}
                    </Link>
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{centre.rating}</span>
                  </div>
                  <span className="text-neutral-400">({centre.reviewsCount} verified reviews)</span>
                </div>

                {/* Address & Landmark */}
                <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                    <span>{centre.address}</span>
                  </div>
                  {centre.metroStation && (
                    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                      <Train className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{centre.metroStation}</span>
                    </div>
                  )}
                </div>

                {/* Batches strip */}
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800/80 text-[11px] space-y-1">
                  <div className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Upcoming Batches:
                  </div>
                  {centre.batches.map((b, i) => (
                    <div key={i} className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                <Link
                  href={`/centres/${centre.slug}`}
                  className="text-xs font-bold text-neutral-900 dark:text-white hover:text-brand-red flex items-center gap-1 transition"
                >
                  <span>Campus Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-brand-red transition"
                    title="Call Branch"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href={`/enquire?c=${centre.id}`}
                    className="btn-red text-xs py-1.5 px-3 font-semibold"
                  >
                    Book Demo
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCentres.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-[#131319] rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 p-8">
          <MapPin className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-neutral-900 dark:text-white">
            No centres found matching &quot;{searchQuery}&quot;
          </h4>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
            You can always join our Live Interactive Global Online Campus or call our central support to find the nearest upcoming batch.
          </p>
          <div className="mt-4">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("All");
              }}
              className="btn-ghost text-xs py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
