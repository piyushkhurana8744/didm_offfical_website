"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Target, Sparkles, Award } from "lucide-react";
import { useAdaptiveHomepage } from "@/context/AdaptiveHomepageContext";
import type { RoadmapStep } from "@/types/adaptive";

const DEFAULT_ROADMAP_STEPS: RoadmapStep[] = [
  {
    stepNumber: 1,
    title: "Foundations & Organic Search Dominance",
    duration: "Month 1 (Modules 1–15)",
    skillsCovered: ["WordPress CMS", "Technical SEO", "Keyword Intent", "Google Search Console", "Google Analytics 4"],
    practicalDeliverable: "Launch a live, fully-indexed corporate website ranking for target search terms.",
  },
  {
    stepNumber: 2,
    title: "Performance Ads & Paid Growth Engines",
    duration: "Month 2 (Modules 16–30)",
    skillsCovered: ["Google Ads 360", "Meta Ads Manager", "Audience Retargeting", "Conversion Tracking", "CRO"],
    practicalDeliverable: "Execute real ad campaigns with actual budget provided by DIDM to generate leads.",
  },
  {
    stepNumber: 3,
    title: "AI Workflows & Marketing Automation",
    duration: "Month 2.5 (Modules 31–44)",
    skillsCovered: ["Generative AI Prompting", "Midjourney & Canva Pro", "WhatsApp Automation Bots", "Email Funnels"],
    practicalDeliverable: "Build an automated multi-channel lead nurturing funnel operating 24/7.",
  },
  {
    stepNumber: 4,
    title: "Live Agency Floor Internship",
    duration: "Month 3 (Modules 45–50)",
    skillsCovered: ["Online Strikers Agency Deliverables", "Client SOWs", "Budget Allocation", "Executive Reporting"],
    practicalDeliverable: "Manage live client accounts and document verified ROAS case studies in your portfolio.",
  },
  {
    stepNumber: 5,
    title: "100% Placement Drives & Career Launch",
    duration: "Capstone & Beyond (Modules 51–52)",
    skillsCovered: ["ATS Resume Crafting", "Mock Strategy Interviews", "LinkedIn Executive Branding", "650+ Placement Drives"],
    practicalDeliverable: "Attend scheduled corporate interviews with verified agency and MNC recruiters.",
  },
];

export function AdaptiveCareerRoadmap() {
  const { adaptation, isPersonalized, openCounsellingHandoff } = useAdaptiveHomepage();

  const steps = isPersonalized && adaptation?.roadmapSteps?.length ? adaptation.roadmapSteps : DEFAULT_ROADMAP_STEPS;
  const title = isPersonalized && adaptation?.roadmapTitle ? adaptation.roadmapTitle : "Your 5-Step Practical Mastery Roadmap";

  return (
    <section className="py-14 sm:py-20 bg-neutral-50 dark:bg-[#12131A] border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#b52828]/10 text-[#b52828] dark:bg-[#b52828]/20 dark:text-red-400">
            <Target size={13} />
            Structured Learning Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Every step is designed around live projects, actual advertising budgets, and verifiable portfolio outcomes.
          </p>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="flex flex-col justify-between bg-white dark:bg-[#151722] rounded-2xl p-5 sm:p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition relative group"
            >
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#b52828] text-white text-xs font-bold shadow-md shadow-[#b52828]/20">
                    0{step.stepNumber}
                  </span>
                  <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
                  {step.title}
                </h3>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {step.skillsCovered.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Practical Deliverable Box */}
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#b52828] dark:text-red-400 mb-1 flex items-center gap-1">
                  <CheckCircle size={11} /> Practical Outcome:
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                  {step.practicalDeliverable}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#151722] border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Award className="text-[#b52828]" size={18} />
              Want to see the complete 52-Module Brochure Syllabus?
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Download the comprehensive module checklist or discuss your customized batch schedule with our mentors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openCounsellingHandoff({ prefillReason: "Requesting detailed 52-module syllabus and roadmap" })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#b52828] hover:bg-[#9c2020] text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-[#b52828]/20"
            >
              Discuss My Roadmap <ArrowRight size={15} />
            </button>
            <Link
              href="/upcoming-batches"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs sm:text-sm font-semibold transition"
            >
              View Batch Schedules
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
