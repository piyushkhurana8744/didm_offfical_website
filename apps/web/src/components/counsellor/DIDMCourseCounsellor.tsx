"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "counsellor";
  text: string;
  source?: "brochure_retrieval" | "verified_catalog" | "counselling_referral";
  citations?: { label: string; page: number }[];
  suggestions?: string[];
  suggestedActions?: { label: string; href: string }[];
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  "What is covered in the MIDM syllabus?",
  "What are the tuition fees and instalment plans?",
  "Which centre is nearest to me in Delhi NCR?",
  "Do you have weekend batches for working professionals?",
];

export function DIDMCourseCounsellor() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-greeting",
      sender: "counsellor",
      text: "Hello! I am your DIDM Academic Course Counsellor. Ask me anything about our digital marketing programs, syllabus modules, tuition fees, 14 campus locations, or placement support.",
      source: "verified_catalog",
      suggestions: INITIAL_SUGGESTIONS,
      timestamp: "Just now",
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
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now",
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
        const assistantMessage: Message = {
          id: `counsellor-${Date.now()}`,
          sender: "counsellor",
          text: data.answer,
          source: data.source,
          citations: data.citations,
          suggestions: data.suggestions,
          suggestedActions: data.suggestedActions,
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: "counsellor",
            text: data.error || "Unable to retrieve curriculum details at this moment.",
            timestamp: "Just now",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "counsellor",
          text: "Our counselling service is momentarily busy. Please call our central admissions team at +91 88005 05151.",
          timestamp: "Just now",
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
        id: "initial-greeting",
        sender: "counsellor",
        text: "Conversation reset. What program or campus details can I help you explore?",
        source: "verified_catalog",
        suggestions: INITIAL_SUGGESTIONS,
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button (Bottom Right) */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 py-2.5 sm:py-3 px-3.5 sm:px-5 rounded-full bg-neutral-900 text-white shadow-2xl hover:bg-brand-red border border-neutral-700/80 transition-all duration-300 hover:scale-105 group backdrop-blur-md"
            aria-label="Open DIDM Course Counsellor Chat"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-red group-hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-tight">
              Ask Course Counsellor
            </span>
          </button>
        )}
      </div>

      {/* Slide-Up Chat Panel Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="DIDM Course Counsellor Chat Assistant"
          className="fixed inset-x-3 bottom-20 top-auto sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[600px] h-[75vh] max-h-[620px] z-50 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-red text-white flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold">DIDM Course Counsellor</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/20 text-white">
                    Official
                  </span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  Grounded in verified syllabus & admissions data
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs leading-relaxed scroll-smooth"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 sm:p-4 rounded-2xl ${
                    m.sender === "user"
                      ? "bg-brand-red text-white rounded-tr-none font-medium"
                      : "bg-neutral-100 dark:bg-[#1A1A22] text-neutral-900 dark:text-neutral-100 rounded-tl-none border border-neutral-200/60 dark:border-neutral-800"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Grounded Source Tag */}
                  {m.source && (
                    <div className="mt-2 pt-2 border-t border-neutral-200/50 dark:border-neutral-700/50 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                      <span>✓ {m.source === "brochure_retrieval" ? "Brochure-backed retrieval" : m.source === "verified_catalog" ? "Verified site catalog" : "No matching published fact"}</span>
                      <span>{m.timestamp}</span>
                    </div>
                  )}
                  {m.citations && m.citations.length > 0 && (
                    <div className="mt-2 space-y-1 text-[10px] text-neutral-500">
                      {m.citations.map((citation) => <div key={`${citation.label}-${citation.page}`}>Source: {citation.label}, p. {citation.page}</div>)}
                    </div>
                  )}
                </div>

                {/* Suggested Action Shortcuts */}
                {m.suggestedActions && m.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                    {m.suggestedActions.map((act, i) => (
                      <Link
                        key={i}
                        href={act.href}
                        onClick={() => setIsOpen(false)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-brand-red hover:bg-brand-red hover:text-white text-[11px] font-bold border border-brand-red/20 transition flex items-center gap-1"
                      >
                        <span>{act.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Suggested Follow-up Questions */}
                {m.suggestions && m.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {m.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(sug)}
                        className="text-left px-2.5 py-1 rounded-full bg-white dark:bg-[#131319] text-neutral-600 dark:text-neutral-300 hover:text-brand-red hover:border-brand-red text-[11px] border border-neutral-200 dark:border-neutral-700 transition"
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
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-neutral-100 dark:bg-[#1A1A22] text-neutral-500 text-xs w-24">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-brand-red animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-brand-red animate-bounce delay-200" />
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 sm:p-3.5 bg-neutral-50 dark:bg-[#1A1A22] border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about syllabus, fees, centres, batches..."
              className="flex-1 text-xs py-2.5 px-3.5 rounded-xl bg-white dark:bg-[#131319] border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-red"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2.5 rounded-xl bg-brand-red text-white transition ${
                !input.trim() || isLoading ? "opacity-40 cursor-not-allowed" : "hover:bg-brand-red-dark shadow-md"
              }`}
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

