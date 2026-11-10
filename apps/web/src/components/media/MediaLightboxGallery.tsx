"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, Calendar, Award, ChevronLeft, ChevronRight } from "lucide-react";
import type { AwardGalleryItem } from "@/lib/media-coverage";

interface Props {
  items: AwardGalleryItem[];
  title?: string;
  subtitle?: string;
}

export function MediaLightboxGallery({ items, title = "Authentic Ceremony Photographs", subtitle = "Original photographs from national awards, summits, and ministerial convocations." }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [yearFilter, setYearFilter] = useState<string>("All");

  const years = ["All", ...Array.from(new Set(items.map((i) => i.year))).sort((a, b) => b - a).map(String)];

  const filteredItems = yearFilter === "All" ? items : items.filter((i) => i.year.toString() === yearFilter);

  const openLightbox = (idx: number) => {
    setSelectedIdx(idx);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
    document.body.style.overflow = "";
  };

  const nextImage = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-red uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Event Photo Archive</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Year Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 touch-scroll">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => {
                setYearFilter(y);
                setSelectedIdx(null);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                yearFilter === y
                  ? "bg-brand-red text-white shadow-sm"
                  : "bg-white dark:bg-[#131319] text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
              }`}
            >
              {y} {y === "All" ? `(${items.length})` : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800/80 aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-all"
          >
            <Image
              src={item.url}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
              <span className="self-end px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono flex items-center gap-1 backdrop-blur-sm">
                <ZoomIn className="w-3 h-3" />
                <span>View</span>
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                  {item.year}
                </span>
                <p className="text-xs text-white line-clamp-2 leading-tight mt-0.5 font-medium">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIdx !== null && filteredItems[selectedIdx] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image & Caption Container */}
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
              <Image
                src={filteredItems[selectedIdx].url}
                alt={filteredItems[selectedIdx].alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="text-center mt-4 space-y-1 max-w-2xl px-4">
              <span className="text-xs font-mono font-bold text-brand-red uppercase px-2.5 py-0.5 rounded-full bg-brand-red/10">
                {filteredItems[selectedIdx].year}
              </span>
              <p className="text-sm sm:text-base text-neutral-200 font-medium">
                {filteredItems[selectedIdx].caption}
              </p>
              <p className="text-xs text-neutral-400">
                Photo {selectedIdx + 1} of {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

