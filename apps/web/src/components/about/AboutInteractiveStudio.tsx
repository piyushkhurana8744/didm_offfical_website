"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Target,
  Compass,
  HeartHandshake,
  ChevronDown,
  Search,
  Sparkles,
  Users,
  Briefcase,
  Layers,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Info,
} from "lucide-react";
import type { TeamMember, AboutFaq, AboutUsData, TimelineMilestone } from "@/lib/website";

/* ========================================================= */
/* 1. TIMELINE JOURNEY VIEWER (OUR STORY)                    */
/* ========================================================= */
interface TimelineProps {
  milestones: TimelineMilestone[];
}

export function TimelineJourneyViewer({ milestones }: TimelineProps) {
  const [selectedIdx, setSelectedIdx] = useState(milestones.length - 1);
  const current = milestones[selectedIdx] || milestones[0];

  return (
    <div className="space-y-8">
      {/* Milestone Track (Responsive Scroller) */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0" />

        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-4 md:pb-0 z-10 relative no-scrollbar">
          {milestones.map((m, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedIdx(idx)}
                className={`flex flex-col items-center gap-2 group flex-shrink-0 transition-all ${
                  isSelected ? "scale-105" : "opacity-75 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-xs transition-all border ${
                    isSelected
                      ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/30 scale-110"
                      : "bg-white dark:bg-[#15151E] text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 group-hover:border-neutral-400"
                  }`}
                >
                  {m.year.slice(0, 4)}
                </div>
                <span className={`text-[11px] font-mono whitespace-nowrap ${
                  isSelected ? "text-brand-red font-bold" : "text-neutral-500"
                }`}>
                  {m.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Detail Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-xl transition-all duration-300">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-mono font-bold">
              MILESTONE · {current.year}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono flex items-center gap-1 border ${
              current.verification_status === "historical_claim"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {current.verification_status === "historical_claim" ? "Historical Origin Record" : "Independently Verified"}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
            {current.title}
          </h3>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {current.description}
          </p>

          <div className="pt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 text-xs font-mono text-neutral-400">
            <span>Milestone {selectedIdx + 1} of {milestones.length}</span>
            <div className="flex items-center gap-2">
              <button
                disabled={selectedIdx === 0}
                onClick={() => setSelectedIdx((i) => Math.max(0, i - 1))}
                className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 disabled:opacity-40 hover:bg-neutral-200"
              >
                ← Prev
              </button>
              <button
                disabled={selectedIdx === milestones.length - 1}
                onClick={() => setSelectedIdx((i) => Math.min(milestones.length - 1, i + 1))}
                className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 disabled:opacity-40 hover:bg-neutral-200"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* 2. PILLARS TAB VIEWER (MISSION, VISION, VALUES)            */
/* ========================================================= */
interface PillarsProps {
  pillars: AboutUsData["core_pillars"];
}

export function PillarsTabViewer({ pillars }: PillarsProps) {
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">("mission");

  const tabConfig = {
    mission: {
      data: pillars.mission,
      icon: Target,
      color: "from-brand-red to-orange-600",
      accent: "text-brand-red",
      bgSoft: "bg-brand-red/10 border-brand-red/20",
    },
    vision: {
      data: pillars.vision,
      icon: Compass,
      color: "from-blue-600 to-indigo-600",
      accent: "text-blue-500",
      bgSoft: "bg-blue-500/10 border-blue-500/20",
    },
    values: {
      data: pillars.values,
      icon: HeartHandshake,
      color: "from-emerald-600 to-teal-600",
      accent: "text-emerald-500",
      bgSoft: "bg-emerald-500/10 border-emerald-500/20",
    },
  };

  const current = tabConfig[activeTab];
  const Icon = current.icon;

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {(["mission", "vision", "values"] as const).map((tabKey) => {
          const tab = tabConfig[tabKey];
          const TabIcon = tab.icon;
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 border ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-lg scale-105"
                  : "bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{tab.data.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-xl transition-all duration-300">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${current.bgSoft} ${current.accent}`}>
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-400">
                Institutional Foundation
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                {current.data.tagline}
              </h3>
            </div>
          </div>

          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {current.data.description}
          </p>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
            <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider font-semibold mb-3">
              Strategic Commitments
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {current.data.subpoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* 3. TEAM GALLERY (PEOPLE BEHIND DIDM)                       */
/* ========================================================= */
interface TeamGalleryProps {
  team: TeamMember[];
}

export function TeamGallery({ team }: TeamGalleryProps) {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const departments = ["All", ...Array.from(new Set(team.map((m) => m.department.split("|")[0].trim())))];

  const filteredTeam = selectedDept === "All"
    ? team
    : team.filter((m) => m.department.toLowerCase().includes(selectedDept.toLowerCase()));

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedDept === dept
                ? "bg-brand-red text-white shadow-md shadow-brand-red/20 font-bold"
                : "bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTeam.map((member) => {
          const hasError = imageErrors[member.id];
          return (
            <div
              key={member.id}
              className="group rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-neutral-800/60 overflow-hidden">
                {!hasError && member.original_image_url ? (
                  <Image
                    src={member.original_image_url}
                    alt={member.image_alt || member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={() => handleImageError(member.id)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 text-neutral-600 dark:text-neutral-300">
                    <span className="text-3xl font-mono font-bold tracking-wider">{member.avatar_initials}</span>
                    <span className="text-[11px] font-mono text-neutral-400 mt-2">DIDM Faculty</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-mono font-semibold text-white">
                  {member.role}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-brand-red transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                    {member.department}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Source Profile
                  </span>
                  <span title="Listed in live public directory (didm.in/about-us)">didm.in</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ========================================================= */
/* 4. FAQ ACCORDION                                          */
/* ========================================================= */
interface AboutFaqProps {
  faqs: AboutFaq[];
}

export function AboutFaqAccordion({ faqs }: AboutFaqProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs (missed classes, salary, backup...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
          />
        </div>

        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold"
                  : "bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-semibold uppercase text-brand-red tracking-wider">
                    {faq.category}
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                    {faq.question}
                  </h4>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? "rotate-180 bg-brand-red text-white"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
                  <p className="mt-3">{faq.answer}</p>
                  <div className="text-[10px] font-mono text-neutral-400 pt-2 flex items-center justify-between">
                    <span>Source: {faq.source}</span>
                    <span className="text-emerald-500">Documented Policy</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-900/40 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            No matching questions found for &ldquo;{search}&rdquo;. You can connect directly with our admissions desk at +91 8800505151.
          </div>
        )}
      </div>
    </div>
  );
}
