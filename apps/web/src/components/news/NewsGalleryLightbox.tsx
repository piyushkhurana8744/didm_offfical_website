"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { NewsMediaItem } from "@/lib/news-events";

interface Props {
  images: NewsMediaItem[];
  articleTitle: string;
}

export function NewsGalleryLightbox({ images, articleTitle }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            Official Event Photo Gallery
          </h3>
          <p className="text-xs text-neutral-500 font-mono">
            {images.length} verified ceremony photographs from the event
          </p>
        </div>
      </div>

      {/* Grid of Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left focus:outline-none focus:ring-2 focus:ring-brand-red transition-all"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.localPath || img.sourceUrl}
              alt={img.alt || `${articleTitle} Photo ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-neutral-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white shadow-lg">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
            <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono text-white">
              {idx + 1} / {images.length}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200 select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white border-b border-neutral-800 pb-3">
            <div className="space-y-0.5 max-w-xl">
              <h4 className="text-xs sm:text-sm font-bold truncate">{articleTitle}</h4>
              <p className="text-[11px] font-mono text-neutral-400">
                Photo {selectedIndex + 1} of {images.length} · Official DIDM Archive
              </p>
            </div>
            <button
              onClick={() => setSelectedIndex(null)}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Active Image */}
          <div className="flex-1 flex items-center justify-center py-4 relative">
            <button
              onClick={() =>
                setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1))
              }
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[selectedIndex]?.localPath || images[selectedIndex]?.sourceUrl}
              alt={images[selectedIndex]?.alt || articleTitle}
              className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            <button
              onClick={() =>
                setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption / Thumbnail Scroller */}
          <div className="pt-2 border-t border-neutral-800 flex items-center justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-14 h-10 rounded-md overflow-hidden shrink-0 border-2 transition ${
                  selectedIndex === idx ? "border-brand-red scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.localPath || img.sourceUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

