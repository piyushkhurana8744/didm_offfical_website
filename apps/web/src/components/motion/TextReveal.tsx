"use client";
import { useRef } from "react";
import { useScrollEntrance } from "./useScrollEntrance";

interface TextRevealProps { text: string; className?: string; wordClassName?: string; delayMs?: number; staggerMs?: number; highlightWords?: Record<string, string> }
export function TextReveal({ text, className = "", wordClassName = "", delayMs = 0, staggerMs = 35, highlightWords = {} }: TextRevealProps) {
  const root = useRef<HTMLSpanElement>(null);
  useScrollEntrance(root, { selector: ":scope > span", delayMs, staggerMs });
  return <span ref={root} className={className} data-scroll-entrance="words">{text.split(" ").map((word, index) => <span key={index}><span className={`inline-block ${wordClassName} ${highlightWords[word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()] || ""}`}>{word}</span>{" "}</span>)}</span>;
}
