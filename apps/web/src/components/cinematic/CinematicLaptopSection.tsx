"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { LaptopWorkstation3D } from "./LaptopWorkstation3D";
import { Laptop, ArrowRight, TrendingUp, Search, Target, BarChart3, Bot, CheckCircle2 } from "lucide-react";

export function CinematicLaptopSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTopic, setActiveTopic] = useState("google-ads");

  const topics = [
    {
      id: "google-ads",
      icon: Target,
      title: "Paid Advertising & Performance Marketing",
      metric: "Live Ad Spend: ₹12.4 Lakhs Executed",
      desc: "Deploy live Google Search, Performance Max, and YouTube campaigns. Optimize bid strategies, Quality Scores, and remarketing funnels on actual agency budgets.",
      link: "/programs/master-in-digital-marketing-course#performance",
    },
    {
      id: "seo",
      icon: Search,
      title: "Search Engine Optimization (SEO)",
      metric: "Rank #1 for 180+ High-Intent Keywords",
      desc: "Perform end-to-end technical site audits, Core Web Vitals optimization, schema markup injection, and high-authority backlink architecture building.",
      link: "/programs/master-in-digital-marketing-course#seo",
    },
    {
      id: "meta-ads",
      icon: TrendingUp,
      title: "Social Media Strategy & Meta CAPI",
      metric: "Average ROAS: 4.85x Across Cohorts",
      desc: "Implement Meta Conversion API (CAPI) for lossless pixel tracking. Master dynamic creative testing, lookalike audiences, and high-converting hooks.",
      link: "/programs/master-in-digital-marketing-course#social",
    },
    {
      id: "analytics",
      icon: BarChart3,
      title: "Marketing Analytics & GA4 Attribution",
      metric: "100% Data-Driven Multi-Touch Models",
      desc: "Master Google Analytics 4 exploration reports, custom conversion funnels, Google Tag Manager dataLayer debugging, and Looker Studio client dashboards.",
      link: "/programs/master-in-digital-marketing-course#analytics",
    },
    {
      id: "ai-tools",
      icon: Bot,
      title: "Generative AI Campaign Automation",
      metric: "10x Content & Ad Creative Velocity",
      desc: "Harness ChatGPT-4o, Claude 3.5 Sonnet, and Midjourney to craft high-converting ad variations, persuasive sales scripts, and predictive audience segments.",
      link: "/programs/master-in-digital-marketing-course#ai",
    },
  ];

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

  const selectedTopicData = topics.find((t) => t.id === activeTopic) || topics[0];

  return (
    <section
      ref={sectionRef}
      id="digital-workspace"
      className="py-16 sm:py-24 bg-[#0d0f14] text-white border-y border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b52828]/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <Laptop className="w-3.5 h-3.5" />
            <span>From Classroom to Agency Floor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Real Workstations. Live Ad Budgets.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            At DIDM, you don&apos;t just watch video tutorials. You open live performance dashboards, manage actual client budgets, and build an agency-grade execution portfolio.
          </p>
        </div>

        {/* 3D Laptop Workspace + Surrounding Topic Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 5 Interactive Topics Selector */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Select Agency Discipline:
            </span>
            {topics.map((t) => {
              const Icon = t.icon;
              const isSelected = activeTopic === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTopic(t.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-white/10 border-[#b52828] text-white shadow-lg translate-x-1"
                      : "bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-[#b52828] text-white" : "bg-white/10 text-neutral-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">{t.title}</span>
                      <span className="text-[11px] text-neutral-400 block">{t.metric}</span>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#b52828]" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: 3D Workstation Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full aspect-[16/10] max-w-xl relative select-none">
              <Canvas
                shadows="soft"
                dpr={[1, typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.75) : 1]}
                camera={{ position: [0, 2.2, 5.2], fov: 40 }}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                }}
                className="w-full h-full pointer-events-none"
              >
                <ambientLight intensity={0.9} color="#fffcf5" />
                <directionalLight
                  position={[4, 6, 5]}
                  intensity={1.5}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <directionalLight position={[-4, 3, 2]} intensity={0.6} color="#3b82f6" />
                <directionalLight position={[0, -2, -3]} intensity={0.5} color="#ffd700" />

                <LaptopWorkstation3D progress={scrollProgress} />
              </Canvas>
            </div>

            {/* Selected Topic Focus Card beneath the 3D Laptop */}
            <div className="mt-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xl w-full space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b52828]">
                  Agency Practical Framework
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  {selectedTopicData.metric}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                {selectedTopicData.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {selectedTopicData.desc}
              </p>
              <div className="pt-2">
                <Link
                  href={selectedTopicData.link}
                  className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-white transition"
                >
                  <span>View Syllabus Modules for {selectedTopicData.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

