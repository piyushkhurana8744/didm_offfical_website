"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Send, RotateCcw, CheckCircle, ArrowRight, UserCheck, Bot, HelpCircle } from "lucide-react";
import { useAdaptiveHomepage } from "@/context/AdaptiveHomepageContext";
import type { VisitorGoal } from "@/types/adaptive";

export function AdaptiveHeroGuide({ embedded = false }: { embedded?: boolean }) {
  const {
    profile,
    adaptation,
    messages,
    isPersonalized,
    isThinking,
    selectedGoal,
    sendMessage,
    selectQuickGoal,
    resetPersonalization,
    openCounsellingHandoff,
  } = useAdaptiveHomepage();

  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isThinking) return;
    sendMessage(inputVal);
    setInputVal("");
  };

  const goalsList: Array<{ id: VisitorGoal; label: string; icon: string }> = [
    { id: "student", label: "College Student", icon: "🎓" },
    { id: "career_switch", label: "Career Switcher", icon: "💼" },
    { id: "business_owner", label: "Business Owner", icon: "🚀" },
    { id: "freelancer", label: "Freelancer / Creator", icon: "💻" },
    { id: "explorer", label: "Exploring Options", icon: "🔍" },
  ];

  // Latest guide message
  const latestGuideMessage = [...messages].reverse().find((m) => m.sender === "guide");

  return (
    <div className={`w-full relative z-20 transition-all duration-300 ${embedded ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-8 sm:mb-12"}`}>
      <div className="bg-white/95 dark:bg-[#12131A]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-xl sm:shadow-2xl overflow-hidden">
        {/* Header Banner */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 dark:from-[#151722] dark:via-[#12131A] dark:to-[#151722]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#b52828] to-[#e63946] text-white shadow-md shadow-[#b52828]/20">
              <Sparkles size={16} className="animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
                  DIDM AI Course &amp; Career Guide
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
                Personalizes your curriculum, batch options &amp; roadmap
              </p>
            </div>
          </div>

          {isPersonalized && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                <CheckCircle size={11} />
                {profile?.visitorGoal?.replace("_", " ")}
              </span>
              <button
                type="button"
                onClick={resetPersonalization}
                className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white flex items-center gap-1 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                title="Reset to default homepage"
              >
                <RotateCcw size={11} />
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Quick Persona Chips */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
              <UserCheck size={13} className="text-[#b52828]" />
              Select your path to adapt this page instantly:
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {goalsList.map((g) => {
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    disabled={isThinking}
                    onClick={() => selectQuickGoal(g.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-[#b52828] text-white border-[#b52828] shadow-md shadow-[#b52828]/25 scale-[1.02]"
                        : "bg-neutral-50 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    } ${isThinking ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span>{g.icon}</span>
                    <span>{g.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conversational Input Bar */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask in English or Hinglish (e.g. 'Placement kaise hogi?', 'Fees details')"
                disabled={isThinking}
                className="w-full pl-3.5 pr-12 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/60 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#b52828]/50 focus:border-[#b52828] transition shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isThinking}
                className="absolute right-1.5 sm:right-2 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#b52828] text-white hover:bg-[#9c2020] disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md shadow-[#b52828]/20"
                aria-label="Send message to AI Guide"
              >
                <Send size={14} />
              </button>
            </div>
            <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-neutral-400 dark:text-neutral-500">
              <span>English, हिंदी &amp; Hinglish</span>
              <span>100% verified DIDM curriculum</span>
            </div>
          </form>

          {/* AI Guide Live Response Box (when active or thinking) */}
          {(latestGuideMessage || isThinking) && (
            <div className="rounded-xl sm:rounded-2xl bg-neutral-50 dark:bg-neutral-900/80 p-3.5 sm:p-4 border border-neutral-200/70 dark:border-neutral-800 transition-all max-h-[220px] overflow-y-auto">
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-lg bg-[#b52828]/10 text-[#b52828] dark:bg-[#b52828]/20 dark:text-red-400 mt-0.5">
                  <Bot size={14} />
                </span>
                <div className="space-y-2.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-white tracking-wide">
                      DIDM Admissions AI Advisor
                    </span>
                    {isThinking && (
                      <span className="text-[11px] text-[#b52828] font-medium animate-pulse flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b52828] animate-ping" />
                        Adapting...
                      </span>
                    )}
                  </div>

                  {!isThinking && latestGuideMessage && (
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                      {latestGuideMessage.text}
                    </p>
                  )}

                  {/* Follow-up suggestions */}
                  {!isThinking && latestGuideMessage?.suggestions && latestGuideMessage.suggestions.length > 0 && (
                    <div className="pt-1">
                      <p className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <HelpCircle size={11} /> Suggested questions:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {latestGuideMessage.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => sendMessage(suggestion)}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-[#b52828] hover:text-[#b52828] dark:hover:border-[#b52828] transition"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Handoff suggestion CTA */}
                  {!isThinking && (
                    <div className="pt-1.5 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          openCounsellingHandoff({
                            courseId: profile?.recommendedCourseIds[0],
                            goal: profile?.visitorGoal,
                            prefillReason: `Interested in digital marketing curriculum tailored for ${profile?.visitorGoal || "admission"}`,
                          })
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#b52828] text-white text-[11px] font-semibold hover:bg-[#9c2020] transition shadow-sm"
                      >
                        Free 1-on-1 Counselling <ArrowRight size={12} />
                      </button>
                      {adaptation?.primaryCta && (
                        <Link
                          href={adaptation.primaryCta.href}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
                        >
                          {adaptation.primaryCta.label} <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
