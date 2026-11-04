"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, Phone, Star, ArrowRight, Train, CheckCircle2 } from "lucide-react";
import { SITE_DATA, Centre } from "@/data/site-data";

export function CenterFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const regions = ["All", "Delhi", "Noida/UP", "Gurgaon/Haryana", "Punjab", "Uttarakhand", "Online"];

  const filteredCentres = useMemo(() => {
    return SITE_DATA.centres.filter((c) => {
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
  }, [searchQuery, selectedRegion]);

  return (
    <div className="space-y-8">
      {/* Search & Region Filters Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by area, metro station, or city (e.g., Dwarka, Noida, Metro)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
            />
          </div>

          {/* Result Count Indicator */}
          <div className="text-xs font-mono font-medium text-neutral-500 whitespace-nowrap self-center">
            Showing <strong className="text-neutral-900 dark:text-white">{filteredCentres.length}</strong> of{" "}
            {SITE_DATA.centres.length} Centres
          </div>
        </div>

        {/* Region Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {regions.map((region) => {
            const isSelected = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCentres.map((centre) => (
          <div
            key={centre.id}
            className="rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between card-hover relative"
          >
            {centre.isHeadOffice && (
              <span className="absolute top-5 right-5 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-brand-red text-white font-bold">
                Head Office
              </span>
            )}

            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-mono uppercase text-brand-red font-bold">
                  {centre.city} · {centre.region}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">
                  {centre.name}
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

              {/* Address */}
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
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
              <a
                href={`tel:${centre.phone.replace(/[^0-9]/g, "")}`}
                className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-brand-red flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-brand-red" />
                <span>Call Centre</span>
              </a>

              <Link
                href={`/enquire?c=${centre.id}`}
                className="btn-red text-xs py-2 px-3.5"
              >
                Book Demo
              </Link>
            </div>
          </div>
        ))}
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
