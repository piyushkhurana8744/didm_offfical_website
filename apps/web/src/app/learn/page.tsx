"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Sparkles, FileText, ArrowRight, Download, CheckCircle2, Mail, Send } from "lucide-react";
import { DIDM_MEDIA } from "@/data/didm-media";

export default function LearnPage() {
  const [copyStatus, setCopyStatus] = useState("");
  const promptBlueprints = ["Act as a marketing writing partner. Ask me for the audience, offer, channel and brand voice. Suggest five distinct campaign hooks. Mark assumptions and do not invent customer reviews or results. Include a human fact-checking checklist.", "Help me plan a technical SEO audit. Ask for a non-sensitive crawl summary. Group issues by crawling, indexing, page structure and performance. Explain how to validate each finding without promising rankings.", "Help me outline a marketing reporting dashboard. Ask for the business objective, metric definitions and date range. Separate observations from hypotheses and list tracking limitations. Do not infer causation from correlation."];
  const copyPrompt = async (index: number) => { try { await navigator.clipboard.writeText(promptBlueprints[index]); setCopyStatus(`Prompt ${index + 1} copied. Review it before using it with an AI tool.`); } catch { setCopyStatus("Clipboard access is unavailable. Expand the prompt text below and copy it manually."); } };
  const [activeTab, setActiveTab] = useState<"guides" | "prompts" | "lessons">("guides");

  const guides = [
    { title: "The 2026 Performance Marketing Architecture", readTime: "Guide", summary: "Explore an introduction to performance marketing systems, conversion tracking and reporting.", tag: "Marketing guide", slug: "/article" },
    { title: "Explore the digital marketing curriculum", readTime: "Curriculum", summary: "Follow the Master course roadmap and explore the topics behind a broad marketing skill set.", tag: "Learning roadmap", slug: "/programs/master-in-digital-marketing-course#course-roadmap" },
    { title: "Find a course around your goals", readTime: "Interactive", summary: "Answer five short questions and explore explained course matches, career paths and skills exercises.", tag: "Course discovery", slug: "/course-finder" },
  ];
  const prompts = [
    {title:"Campaign hook brainstorming",tools:"AI writing exercise",summary:"Explore campaign ideas from an audience, offer and brand brief, with a human fact-checking step."},
    {title:"Technical SEO audit planning",tools:"AI planning exercise",summary:"Organise a non-sensitive crawl summary into issues, priorities and checks. Verify findings yourself."},
    {title:"Marketing measurement planning",tools:"AI reporting exercise",summary:"Define objectives and metrics, separate observations from hypotheses and document tracking limitations."},
  ];

  const lessons = [
    {
      title: "Explore how clicks become enquiries",
      duration: "Interactive exercise",
      summary: "Change a campaign budget, click cost and conversion rate to explore an illustrative marketing funnel.",
    },
    {
      title: "Check your marketing fundamentals",
      duration: "Interactive exercise",
      summary: "Answer four questions about SEO, paid media, content and analytics, then explore explanations and next steps.",
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-soft dark:bg-ai/10 text-ai dark:text-ai-dark text-xs font-mono font-semibold">
            FREE KNOWLEDGE REPOSITORY
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Explore marketing. <em>Put your curiosity to work.</em>
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Explore marketing concepts, try prompt-writing exercises and put your thinking to work in the interactive learning lab.
          </p>
        </div>

        <div className="relative aspect-[1796/250] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
          <Image
            src={DIDM_MEDIA.mediaNews.path}
            alt={DIDM_MEDIA.mediaNews.alt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

        {/* Featured Guide Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white relative overflow-hidden space-y-4 border border-neutral-800 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-brand-red text-white font-bold">
              Featured Read
            </span>
            <span className="text-xs text-neutral-400 font-mono">Updated for 2026</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-normal text-white max-w-2xl leading-tight">
            The 2026 Modern Performance Marketing Architecture.
          </h2>

          <p className="text-sm text-neutral-300 max-w-xl leading-relaxed">
            A comprehensive breakdown of how modern growth teams structure Meta CAPI, Google Ads Value Rules,
            and AI creative testing loops to maintain positive ROAS.
          </p>

          <div className="pt-2">
            <Link href="/article" className="btn-red text-xs py-2.5 px-5 font-bold inline-flex items-center gap-2">
              <span>Read Full Free Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tabs Filter */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            {[
              { id: "guides", label: "Guides & Learning Paths" },
              { id: "prompts", label: "AI Prompt Templates" },
              { id: "lessons", label: "Interactive Exercises" },
            ].map((tab) => (
              <button
                key={tab.id}
                aria-pressed={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as "guides" | "prompts" | "lessons")}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-brand-red text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Guides & Learning Paths */}
          {activeTab === "guides" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
              {guides.map((g, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-brand-red font-bold uppercase">{g.tag}</span>
                      <span className="text-neutral-400">{g.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{g.title}</h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {g.summary}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                    <Link
                      href={g.slug}
                      className="text-xs font-semibold text-brand-red hover:underline flex items-center gap-1"
                    >
                      <span>Explore resource</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: AI Prompt Templates */}
          {activeTab === "prompts" && (
            <div><p role="status" className="mb-4 text-sm">{copyStatus}</p><div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
              {prompts.map((p, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-ai-soft dark:bg-ai-soft-dark text-ai dark:text-ai-dark font-bold">
                      {p.tools}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{p.title}</h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                    <button type="button" onClick={() => copyPrompt(i)} className="text-xs font-semibold text-ai dark:text-ai-dark hover:underline flex items-center gap-1">Copy prompt blueprint <ArrowRight className="w-3.5 h-3.5" /></button>
                    <details className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400"><summary className="cursor-pointer">View prompt text</summary><p className="mt-3 select-text">{promptBlueprints[i]}</p></details>
                  </div>
                </div>
              ))}
            </div></div>
          )}

          {/* Tab 3: Interactive Exercises */}
          {activeTab === "lessons" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
              {lessons.map((l, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
                      {l.duration}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{l.title}</h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {l.summary}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                    <Link
                      href={i === 0 ? "/course-finder#campaign-lab" : "/course-finder#skill-check"}
                      className="btn-ghost text-xs py-2 px-4 block text-center font-semibold"
                    >
                      Try free exercise
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Subscription Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-100/80 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 max-w-2xl mx-auto text-center space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-brand-red text-white flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            Explore your next learning step
          </h3>
          <p className="text-xs text-neutral-500">
            Explore course recommendations, career pathways and practical learning exercises. No sign-up needed.
          </p>

          <Link href="/course-finder" className="btn-ghost text-xs py-2.5 px-4 font-bold">Open the learning lab</Link>
        </div>
      </div>
    </div>
  );
}

