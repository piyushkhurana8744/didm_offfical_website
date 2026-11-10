"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Check, ArrowRight, RotateCcw, Bookmark, Send, Bot, HelpCircle } from "lucide-react";
import { getAllCourses, getAllCentres, SITE_BRAND } from "@/lib/content";
import type { Course } from "@/types/content";

export function Advisor() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [goal, setGoal] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [userQuery, setUserQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [savedNotification, setSavedNotification] = useState(false);

  const courses = getAllCourses();

  // Recommendation engine logic
  const getRecommendation = (): {
    course: Course;
    reasons: string[];
    alternative?: string;
  } => {
    if (time === "A full year, in depth") {
      const dmi = courses.find((c) => c.id === "dmi") || courses[0];
      return {
        course: dmi,
        reasons: [
          "You selected a full year deep immersion: DMI provides 12 months with 3 months actual agency floor residency.",
          "Includes 6 structured growth phases and eligible candidates receive a paid internship with Pre-Placement Offer (PPO) potential.",
          "Best choice for aspiring marketing leaders and senior growth architects.",
        ],
        alternative: "MIDM (3-6 Months)",
      };
    }

    if (goal === "Grow my business") {
      const prof = courses.find((c) => c.id === "professional") || courses[0];
      return {
        course: prof,
        reasons: [
          "Tailored specifically for founders: focus on direct lead generation ROI, local Google Maps ranking, and high-conversion ad funnels.",
          "Work directly on your actual business campaigns in class with mentor review.",
          "Learn how to audit agencies and optimize customer acquisition costs.",
        ],
        alternative: "MIDM",
      };
    }

    if (goal === "Grow in my job") {
      const adv = courses.find((c) => c.id === "advanced") || courses[0];
      return {
        course: adv,
        reasons: [
          "Fast-track focused curriculum covering Google Ads, Meta Ads and SEO performance.",
          "Flexible weekend and evening batches to balance your existing work commitments.",
          "Industry-recognized certifications to showcase for your next appraisal.",
        ],
        alternative: "MIDM (Comprehensive)",
      };
    }

    // Default top recommendation: MIDM
    const midm = courses.find((c) => c.id === "midm") || courses[0];
    return {
      course: midm,
      reasons: [
        `Ideal match for "${goal || "Career growth"}": 500+ hours covering full-stack digital marketing & modern AI tools.`,
        "Includes 2 months live practical agency training with interview drives across 650+ hiring partners.",
        "Hands-on budget provided to run live PPC ads on Google and Meta.",
      ],
      alternative: "DMI 1-Year Diploma",
    };
  };

  const handleSavePlan = (course: Course) => {
    try {
      const plan = {
        id: course.id,
        name: course.shortName,
        fullName: course.name,
        slug: course.slug,
        ts: Date.now(),
      };
      localStorage.setItem("didm-plan", JSON.stringify(plan));
      window.dispatchEvent(new Event("didm-plan-updated"));
      setSavedNotification(true);
      setTimeout(() => setSavedNotification(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const q = userQuery.toLowerCase();
    if (q.includes("fee") || q.includes("cost") || q.includes("price") || q.includes("paisa") || q.includes("kitna")) {
      setAiAnswer(
        "DIDM offers transparent pricing with flexible 0% interest EMI options and merit scholarships. Detailed fee schedules depend on the specific track (MIDM vs 1-Year DMI) and batch mode. Speak to an advisor or download the syllabus for exact fee breakups."
      );
    } else if (q.includes("placement") || q.includes("job") || q.includes("salary") || q.includes("guarantee")) {
      setAiAnswer(
        "DIDM operates an active corporate placement cell with 650+ verified hiring partners including agencies, tech startups, and multinationals. We provide dedicated interview prep, live portfolio building, and unlimited placement drives until placed."
      );
    } else if (q.includes("centre") || q.includes("branch") || q.includes("location") || q.includes("delhi") || q.includes("noida") || q.includes("gurgaon") || q.includes("dwarka")) {
      setAiAnswer(
        "DIDM has 14 campuses across Delhi NCR (Dwarka, Satya Niketan HO, Kalkaji, Pitampura, Preet Vihar, Rajouri Garden), Noida, Gurgaon, Dehradun, Meerut, Jaipur, Mumbai, Haldwani, plus a Live Interactive Online Campus."
      );
    } else if (q.includes("duration") || q.includes("time") || q.includes("batch") || q.includes("weekend")) {
      setAiAnswer(
        "Programs offer weekday morning (10 AM), afternoon, evening, and weekend (Sat-Sun) batches. MIDM takes 3-5 months, Advanced is 2.5 months, and the DMI Diploma is an extensive 12-month program."
      );
    } else {
      setAiAnswer(
        `Great question regarding "${userQuery}". Our senior academic advisors can clarify batch schedules, syllabus depths, and free trial demos. Call toll-free: +91 88005 05151 or book a callback.`
      );
    }
  };

  const resetAdvisor = () => {
    setStep(1);
    setGoal("");
    setTime("");
    setLocation("");
    setAiAnswer(null);
    setUserQuery("");
  };

  const rec = getRecommendation();

  return (
    <div className="w-full bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-4 sm:p-7 shadow-advisor relative overflow-hidden transition-all">
      {/* Decorative top orb */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-ai/10 dark:bg-ai/20 rounded-full blur-2xl pointer-events-none advisor-orb" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-neutral-100 dark:border-neutral-800 gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 rounded-full bg-ai-soft dark:bg-ai/20 flex items-center justify-center text-ai dark:text-ai-dark shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-ai dark:text-ai-dark font-semibold flex items-center gap-1.5">
              <span>AI Course Advisor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
              Find your ideal marketing career track in 3 taps
            </div>
          </div>
        </div>

        {step > 1 && (
          <button
            onClick={resetAdvisor}
            className="text-[11px] sm:text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 font-medium transition shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        )}
      </div>

      {/* Interactive Step Content */}
      <div className="py-4 sm:py-6">
        {step === 1 && (
          <div className="space-y-3 sm:space-y-4 animate-in fade-in">
            <div className="text-[11px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider font-mono">
              Step 1 of 3: What is your primary career goal?
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {[
                "Start my career",
                "Switch careers",
                "Grow in my job",
                "Grow my business",
                "Learn AI tools",
                "Freelance",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setGoal(opt);
                    setStep(2);
                  }}
                  className="p-3 sm:p-3.5 rounded-2xl text-left border border-neutral-200 dark:border-neutral-800 hover:border-ai dark:hover:border-ai hover:bg-ai-soft/50 dark:hover:bg-ai/10 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[46px] flex items-center"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider font-mono">
              Step 2 of 3: How much time can you commit each week?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {[
                { title: "Part-time (6-8 hrs)", desc: "Weekend or Evening batches" },
                { title: "Standard (15-20 hrs)", desc: "Weekday 3-5 month fast track" },
                { title: "A full year, in depth", desc: "12-month agency residency (DMI)" },
              ].map((t) => (
                <button
                  key={t.title}
                  onClick={() => {
                    setTime(t.title);
                    setStep(3);
                  }}
                  className="p-3.5 sm:p-4 rounded-2xl text-left border border-neutral-200 dark:border-neutral-800 hover:border-ai hover:bg-ai-soft/50 dark:hover:bg-ai/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                    {t.title}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider font-mono">
              Step 3 of 3: Preferred Learning Mode?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {[
                { title: "Classroom in Delhi NCR", desc: "14 branches with computer labs" },
                { title: "Live Interactive Online", desc: "Two-way live faculty sessions" },
                { title: "Hybrid Flexible", desc: "Attend in person or online anytime" },
              ].map((loc) => (
                <button
                  key={loc.title}
                  onClick={() => {
                    setLocation(loc.title);
                    setStep(4);
                  }}
                  className="p-3.5 sm:p-4 rounded-2xl text-left border border-neutral-200 dark:border-neutral-800 hover:border-ai hover:bg-ai-soft/50 dark:hover:bg-ai/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                    {loc.title}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">{loc.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-in zoom-in-95">
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-ai-soft/60 via-white to-white dark:from-ai/10 dark:via-[#131319] dark:to-[#131319] border border-ai/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-ai text-white font-bold">
                  Recommended For You
                </span>
                <span className="text-xs font-mono text-neutral-500 font-semibold">
                  {rec.course.duration} · {rec.course.hours}
                </span>
              </div>

              <div className="mt-2.5">
                <h4 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                  {rec.course.name}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                  {rec.course.tagline}
                </p>
              </div>

              {/* Reasons */}
              <div className="mt-4 space-y-2 border-t border-ai/10 pt-3">
                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Why this is your best fit:
                </div>
                {rec.reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              {/* Recommendation CTAs */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Link
                  href={`/programs/${rec.course.slug}`}
                  className="btn-primary text-xs py-2 px-3.5 flex-1 sm:flex-initial text-center justify-center"
                >
                  <span>View Details</span> <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => handleSavePlan(rec.course)}
                  className="btn-ghost text-xs py-2 px-3 flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                >
                  <Bookmark className="w-3.5 h-3.5 text-ai" />
                  <span>{savedNotification ? "Saved!" : "Save Plan"}</span>
                </button>

                <Link
                  href={`/enquire?p=${rec.course.id}`}
                  className="btn-red text-xs py-2 px-3.5 w-full sm:w-auto text-center justify-center"
                >
                  Book Free Demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Chat Query Bar */}
      <div className="pt-3 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <form onSubmit={handleAskQuestion} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Bot className="w-4 h-4 text-ai absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask: 'Fees?', 'Placements?', 'Nearest Centre?'..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-ai text-neutral-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-ai text-white hover:bg-ai-ink active:scale-95 transition shrink-0"
            aria-label="Submit question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {aiAnswer && (
          <div className="mt-3 p-3 rounded-xl bg-ai-soft/50 dark:bg-ai/10 border border-ai/20 text-xs text-neutral-800 dark:text-neutral-200 animate-in fade-in leading-relaxed">
            <strong className="text-ai dark:text-ai-dark block mb-1">DIDM AI Advisor:</strong>
            {aiAnswer}
          </div>
        )}
      </div>
    </div>
  );
}
