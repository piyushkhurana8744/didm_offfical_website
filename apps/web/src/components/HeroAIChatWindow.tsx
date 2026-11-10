"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Send,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  GraduationCap,
  Image as ImageIcon,
  Bot,
  MapPin,
  Calendar,
  Phone,
} from "lucide-react";
import type { VerifiedDidmMedia } from "@/data/didm-media";

interface HeroAIChatWindowProps {
  primaryMedia: VerifiedDidmMedia;
}

interface ChatMessage {
  id: string;
  sender: "user" | "counsellor";
  text: string;
  source?: "verified_catalog" | "counselling_referral";
  suggestions?: string[];
  suggestedActions?: { label: string; href: string }[];
}

const QUICK_CHIPS = [
  "Which course is best for me?",
  "What is the fee for MIDM?",
  "Nearest branch in Delhi NCR?",
  "Tell me about 100% placement support",
];

export function HeroAIChatWindow({ primaryMedia }: HeroAIChatWindowProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "photo">("chat");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "hero-welcome",
      sender: "counsellor",
      text: "Hello! I am your DIDM AI Course Counsellor. Ask me anything about our digital marketing courses, syllabus modules, tuition fees, or 14 Delhi NCR campus locations.",
      source: "verified_catalog",
      suggestions: QUICK_CHIPS,
    },
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (activeTab === "chat") {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/counsellor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (data.ok) {
        const assistantMessage: ChatMessage = {
          id: `counsellor-${Date.now()}`,
          sender: "counsellor",
          text: data.answer,
          source: data.source,
          suggestions: data.suggestions,
          suggestedActions: data.suggestedActions,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: "counsellor",
            text: data.error || "Unable to retrieve details at this moment. Please call +91 88005 05151.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "counsellor",
          text: "Our counselling service is momentarily busy. Please connect via our central helpline: +91 88005 05151.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "hero-welcome",
        sender: "counsellor",
        text: "Conversation reset! What program or campus details would you like to explore?",
        source: "verified_catalog",
        suggestions: QUICK_CHIPS,
      },
    ]);
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#131319] shadow-2xl transition-all duration-300">
      {/* Top Header & Tab Switcher Bar */}
      <div className="p-3.5 sm:p-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-red text-white flex items-center justify-center font-bold text-xs shadow-md shadow-brand-red/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-white">
                DIDM AI Academic Advisor
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              Live admissions & course guidance
            </div>
          </div>
        </div>

        {/* Tab Switcher: Chat vs Campus Photo */}
        <div className="flex items-center gap-1 bg-neutral-800/80 p-1 rounded-xl border border-neutral-700/60">
          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition flex items-center gap-1 ${
              activeTab === "chat"
                ? "bg-brand-red text-white font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Bot className="w-3 h-3" />
            <span>AI Chat</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("photo")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition flex items-center gap-1 ${
              activeTab === "photo"
                ? "bg-brand-red text-white font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <ImageIcon className="w-3 h-3" />
            <span>Campus</span>
          </button>
        </div>
      </div>

      {/* VIEW A: Interactive AI Chat Window */}
      {activeTab === "chat" ? (
        <div className="flex flex-col h-[420px] sm:h-[460px]">
          {/* Messages Scroll Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-xs scroll-smooth"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] p-3 sm:p-3.5 rounded-2xl ${
                    m.sender === "user"
                      ? "bg-brand-red text-white rounded-tr-none font-medium shadow-md shadow-brand-red/20"
                      : "bg-neutral-100 dark:bg-[#1A1A22] text-neutral-900 dark:text-neutral-100 rounded-tl-none border border-neutral-200/80 dark:border-neutral-800 shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                  {/* Grounded Tag */}
                  {m.source && (
                    <div className="mt-2 pt-1.5 border-t border-neutral-200/50 dark:border-neutral-700/50 flex items-center justify-between text-[9px] text-neutral-500 font-mono">
                      <span>✓ Grounded in DIDM Catalog</span>
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Suggested Action Shortcuts */}
                {m.suggestedActions && m.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[88%]">
                    {m.suggestedActions.map((act, i) => (
                      <Link
                        key={i}
                        href={act.href}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-brand-red hover:bg-brand-red hover:text-white text-[11px] font-bold border border-brand-red/20 transition flex items-center gap-1 shadow-xs"
                      >
                        <span>{act.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Suggested Follow-up Questions */}
                {m.suggestions && m.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[92%]">
                    {m.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(sug)}
                        className="text-left px-2.5 py-1 rounded-full bg-white dark:bg-[#131319] text-neutral-600 dark:text-neutral-300 hover:text-brand-red hover:border-brand-red text-[10px] sm:text-[11px] border border-neutral-200 dark:border-neutral-700 transition"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-neutral-100 dark:bg-[#1A1A22] text-neutral-500 text-xs w-20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-bounce delay-200" />
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-neutral-50 dark:bg-[#1A1A22] border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about MIDM, fees, centres, batches..."
              className="flex-1 text-xs py-2 px-3 rounded-xl bg-white dark:bg-[#131319] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-red"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2.5 rounded-xl bg-brand-red text-white transition ${
                !input.trim() || isLoading ? "opacity-40 cursor-not-allowed" : "hover:bg-brand-red-dark shadow-md shadow-brand-red/30"
              }`}
              aria-label="Send message to AI advisor"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        /* VIEW B: Verified Campus Photo View */
        <div className="space-y-0 animate-in fade-in">
          <div className="relative aspect-[16/10] w-full bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={primaryMedia.path}
              alt={primaryMedia.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 550px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-red font-bold block">
                  Verified Campus Lab
                </span>
                <p className="text-xs sm:text-sm font-semibold truncate">
                  {primaryMedia.alt}
                </p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                Classroom Batches
              </span>
            </div>
          </div>

          <div className="p-4 bg-neutral-50/70 dark:bg-[#1A1A22]/70 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Live Ad Accounts Provided</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">2-Month Live Agency Floor</span>
            </div>
          </div>
        </div>
      )}

      {/* Sub-bar with quick contact actions */}
      <div className="p-3 bg-neutral-100/60 dark:bg-[#16161E] border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Grounded in official DIDM syllabus</span>
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="text-neutral-400 hover:text-brand-red transition flex items-center gap-1"
          title="Reset conversation"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}

