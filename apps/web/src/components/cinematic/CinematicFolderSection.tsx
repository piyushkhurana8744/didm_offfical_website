"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { AdmissionFolder3D } from "./AdmissionFolder3D";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ShieldCheck, CheckCircle2, Clock, MapPin, Sparkles, Phone } from "lucide-react";

export function CinematicFolderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const progress = (windowH - rect.top) / (rect.height + windowH);
    setScrollProgress(Math.max(0, Math.min(1, progress)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      id="admission-dossier"
      className="py-16 sm:py-24 bg-gradient-to-b from-neutral-50 via-white to-[#faf8f5] dark:from-[#0d0e13] dark:via-[#111218] dark:to-[#0a0b0e] text-[#222222] dark:text-[#EAEAEA] border-t border-neutral-200 dark:border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b52828]/10 text-[#b52828] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions 2026 • 14 Delhi NCR Campuses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Your Next Chapter Starts Here
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Open your official admission dossier. Speak with a senior counsellor to secure your seat, explore flexible 0% EMI plans, and begin hands-on agency floor training.
          </p>
        </div>

        {/* 2-Column Presentation: 3D Animated Folder (Left) + Interactive Lead Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D Folder Stage */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full aspect-[4/3] sm:aspect-square max-w-md relative select-none">
              <Canvas
                shadows="soft"
                dpr={[1, typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.75) : 1]}
                camera={{ position: [0, 1.2, 4.8], fov: 38 }}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                }}
                className="w-full h-full pointer-events-none"
              >
                <ambientLight intensity={0.9} color="#fffcf5" />
                <directionalLight
                  position={[3, 5, 4]}
                  intensity={1.4}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <directionalLight position={[-3, 2, 2]} intensity={0.6} color="#f0f5fa" />
                <directionalLight position={[0, -2, -3]} intensity={0.4} color="#ffd700" />

                <AdmissionFolder3D progress={scrollProgress} />
              </Canvas>
            </div>

            {/* Admission Highlights Matrix beneath the 3D Folder */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-4">
              <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  100% Placement Guarantee
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#b52828] shrink-0" />
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  ISO 9001 &amp; MSME Certified
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Weekday &amp; Weekend Batches
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#b52828] shrink-0" />
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  14 Delhi NCR Branches
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live, Unblocked HTML Admission Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-[#14151e] p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-white/10 shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828]">
                  Official Admission Application
                </span>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
                  Book Your Seat or Request Free Counselling
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  Fill in your details below to receive the detailed fee breakdown, batch schedule, and scholarship eligibility.
                </p>
              </div>

              {/* Direct Backend-Integrated Enquiry Form */}
              <EnquiryForm />

              <div className="pt-2 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-xs text-neutral-500">
                <span>Immediate Assistance:</span>
                <a
                  href="tel:+918800505151"
                  className="font-bold text-[#b52828] hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 8800-505-151</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

