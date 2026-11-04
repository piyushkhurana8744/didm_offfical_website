"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Briefcase, TrendingUp, Building2, Laptop, ArrowRight, CheckCircle2 } from "lucide-react";

export function CareerTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const pathways = [
    {
      id: "freshers",
      title: "College Students & Freshers",
      icon: GraduationCap,
      lead: "Graduate with verified agency experience on your resume instead of empty theory.",
      outcomes: [
        "Master in-demand skills before graduating to beat campus competition",
        "Build a live portfolio of real campaigns on Google & Meta Ads",
        "Direct interviews with 650+ hiring partner companies",
        "Expected Starting Packages: ₹4.5 LPA to ₹7.5 LPA",
      ],
      recommended: "Master in Digital Marketing (MIDM)",
      recommendedLink: "/program?p=midm",
    },
    {
      id: "switchers",
      title: "Career Switchers",
      icon: Briefcase,
      lead: "Transition smoothly from sales, teaching, back-office, or customer support into high-growth digital marketing.",
      outcomes: [
        "Structured curriculum designed for students with non-technical backgrounds",
        "Weekend & evening batches so you keep your current salary during training",
        "Career guidance & mock interviews targeting mid-level marketing roles",
        "Hands-on budget given to run live campaigns and show proven results",
      ],
      recommended: "Master in Digital Marketing (MIDM)",
      recommendedLink: "/program?p=midm",
    },
    {
      id: "professionals",
      title: "Working Professionals",
      icon: TrendingUp,
      lead: "Accelerate your career into CMO and Marketing Director brackets by mastering AI automation and CAC optimization.",
      outcomes: [
        "Master modern AI tools (Claude, ChatGPT-4o, Midjourney, Zapier agents)",
        "Optimize marketing attribution, GA4, and multi-channel performance pipelines",
        "Position yourself for leadership appraisals and senior promotions",
        "Flexible hybrid schedules matching corporate working hours",
      ],
      recommended: "DMI 1-Year Diploma or Advanced Course",
      recommendedLink: "/program?p=dmi",
    },
    {
      id: "business",
      title: "Business Owners & Founders",
      icon: Building2,
      lead: "Stop wasting money on marketing agencies that deliver zero ROI. Take control of your customer acquisition.",
      outcomes: [
        "Learn how to generate high-intent customer leads at lowest possible CAC",
        "Dominate local Google Maps search results in your city",
        "Audit agency performance reports and eliminate wasteful ad expenditure",
        "Work directly on your company's live marketing during practical labs",
      ],
      recommended: "Professional Course for Founders",
      recommendedLink: "/program?p=professional",
    },
    {
      id: "freelancers",
      title: "Freelancers & Remote Workers",
      icon: Laptop,
      lead: "Build an independent agency or earn in USD/GBP by managing international client accounts from home.",
      outcomes: [
        "Learn international client acquisition on Upwork, LinkedIn, and cold email",
        "Build recurring monthly retainer agreements worth $1,000–$3,000/month",
        "Automate client reporting and content production using AI agent workflows",
        "Complete freedom to work from anywhere in India or abroad",
      ],
      recommended: "Diploma in Digital Marketing & AI (DMI)",
      recommendedLink: "/program?p=dmi",
    },
  ];

  const current = pathways[activeTab];

  return (
    <div className="space-y-6">
      {/* Tabs navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200 dark:border-neutral-800">
        {pathways.map((pathway, idx) => {
          const Icon = pathway.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={pathway.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-brand-red text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{pathway.title}</span>
            </button>
          );
        })}
      </div>

      {/* Pathway Detail Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm animate-in fade-in">
        <div className="max-w-3xl space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
            {current.title}
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {current.lead}
          </p>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.outcomes.map((outcome, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs">
              <span className="text-neutral-500">Recommended Track: </span>
              <strong className="text-brand-red font-semibold">{current.recommended}</strong>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={current.recommendedLink}
                className="btn-primary text-xs py-2 px-4"
              >
                <span>Explore Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/enquire"
                className="btn-red text-xs py-2 px-4"
              >
                Book Counseling
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
