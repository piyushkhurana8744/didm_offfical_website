"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Sparkles, FileText, ArrowRight, Download, CheckCircle2, Mail, Send } from "lucide-react";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<"guides" | "prompts" | "lessons">("guides");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const guides = [
    {
      title: "The 2026 Full-Stack Performance Marketing Architecture",
      readTime: "12 Min Read",
      summary: "How modern high-growth direct-to-consumer brands structure Meta CAPI, Google PMax, and attribution models to scale without losing margin.",
      tag: "Deep Guide",
      slug: "/article",
    },
    {
      title: "Technical SEO Checklist for AI Search (GEO) in 2026",
      readTime: "8 Min Read",
      summary: "How to optimize websites for Google's AI Overviews, Perplexity citations, and ChatGPT Search results using structured schema and entity mapping.",
      tag: "Search Engineering",
      slug: "/article",
    },
    {
      title: "How to Build a High-Converting Landing Page with Zero Coding",
      readTime: "10 Min Read",
      summary: "Step-by-step wireframe, typography rules, mobile conversion anchors, and Google Tag Manager tracking protocols.",
      tag: "Conversion Rate CRO",
      slug: "/article",
    },
  ];

  const prompts = [
    {
      title: "Meta Ad Creative Hook & Script Generator",
      tools: "Claude 3.5 Sonnet / GPT-4o",
      summary: "System prompt that generates 10 high-converting video hook angles (curiosity, pain-point, social proof) for TikTok and Reels.",
    },
    {
      title: "Local Business Google Maps Semantic Review Responder",
      tools: "ChatGPT-4o",
      summary: "Automatically craft personalized, keyword-rich review replies that improve local map pack rankings for Google Business Profiles.",
    },
    {
      title: "Screaming Frog Crawl Log Anomaly Extractor",
      tools: "Claude / Code Interpreter",
      summary: "Feed raw 50,000-row crawl files to immediately isolate broken canonicals, redirect loops, and orphaned indexable URLs.",
    },
  ];

  const lessons = [
    {
      title: "Setting up Meta Conversions API (CAPI) with Stape & Cloudflare",
      duration: "18 Min Video + Code Snippets",
      summary: "Bypass browser cookie blockers and restore 95%+ server-side conversion event accuracy.",
    },
    {
      title: "Building an Autonomous AI Social Media Scheduler with Make.com",
      duration: "24 Min Video + JSON Blueprint",
      summary: "Create a webhook that accepts blog posts, summarizes them via GPT-4o, renders graphics in Bannerbear, and posts to LinkedIn.",
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-soft dark:bg-ai/10 text-ai dark:text-ai-dark text-xs font-mono font-semibold">
            FREE KNOWLEDGE REPOSITORY
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Practical marketing playbooks & <em>AI automation templates</em>.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Free high-utility resources authored by DIDM senior mentors. No generic fluff — genuine
            agency workflows, prompt engineering systems, and campaign blueprints.
          </p>
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
          <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            {[
              { id: "guides", label: "In-Depth Guides" },
              { id: "prompts", label: "AI Prompt Templates" },
              { id: "lessons", label: "Free Micro-Lessons" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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

          {/* Tab 1: In-Depth Guides */}
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
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: AI Prompt Templates */}
          {activeTab === "prompts" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
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
                    <Link
                      href="/article"
                      className="text-xs font-semibold text-ai dark:text-ai-dark hover:underline flex items-center gap-1"
                    >
                      <span>Copy Prompt Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Free Micro-Lessons */}
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
                      href="/enquire"
                      className="btn-ghost text-xs py-2 px-4 block text-center font-semibold"
                    >
                      Watch Free Lesson
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
            Get Weekly Marketing & AI Playbooks in Your Inbox
          </h3>
          <p className="text-xs text-neutral-500">
            Join 22,000+ marketers receiving our Sunday breakdown of real algorithm shifts, ad creatives, and AI automations.
          </p>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you! You are subscribed to Sunday Playbooks.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work or personal email..."
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-700 text-xs focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
              />
              <button
                type="submit"
                className="btn-red text-xs py-2.5 px-4 font-bold shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
