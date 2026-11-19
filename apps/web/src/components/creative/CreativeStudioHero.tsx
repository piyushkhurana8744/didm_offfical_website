"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Sparkles, Play, RotateCcw, MousePointer2, Layers, Check } from "lucide-react";

export function CampaignArtwork({ className = "", format = "poster" }: { className?: string; format?: "poster" | "social" | "story" }) {
  return <Image className={className} src={`/images/creative/offscript-${format}.svg`} alt={`OFFSCRIPT original illustrative campaign ${format}: bold editorial typography and a cobalt globe`} width={format === "poster" ? 760 : format === "social" ? 640 : 440} height={format === "poster" ? 940 : format === "social" ? 640 : 780} priority={format === "poster"} />;
}

export function CreativeStudioHero({ heading, media }: { heading?: string; media?: { path: string; alt: string } }) {
  const root = useRef<HTMLElement>(null);
  const [replay, setReplay] = useState(0);
  const [format, setFormat] = useState<"poster" | "social" | "story">("poster");

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled || !root.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const context = gsap.context(() => {
        const tl = gsap.timeline({ onComplete: () => root.current?.setAttribute("data-hero-state", "settled") });
        root.current?.setAttribute("data-hero-state", "entrance");
        tl.from(".hero-line > span", { yPercent: 112, rotate: 2, stagger: .12, duration: .85, ease: "power3.out" })
          .from(".studio-window", { rotateY: -12, rotateX: 5, y: 45, scale: .94, opacity: 0, duration: 1, ease: "power3.out" }, .15)
          .from(".studio-artboard", { clipPath: "inset(100% 0% 0% 0%)", y: 20, duration: 1, ease: "power3.inOut" }, .5)
          .from(".studio-prompt", { x: -45, opacity: 0, duration: .65 }, .9)
          .from(".prompt-words", { clipPath: "inset(0% 100% 0% 0%)", duration: 1.2, ease: "steps(32)" }, 1.1)
          .call(() => root.current?.setAttribute("data-hero-state", "creation"), [], 1.2)
          .from(".studio-social", { y: 75, x: -55, rotate: -12, scale: .8, opacity: 0, duration: .9, ease: "power3.out" }, 1.65)
          .from(".studio-timeline", { clipPath: "inset(0% 100% 0% 0%)", duration: .75 }, 2.1)
          .from(".studio-cursor", { x: -85, y: 55, opacity: 0, duration: .9, ease: "power2.out" }, 2.2)
          .call(() => root.current?.setAttribute("data-hero-state", "expansion"), [], 2.35);
        gsap.to(".studio-cursor", { y: -7, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3.3 });
      }, root);
      dispose = () => context.revert();
    });
    return () => { cancelled = true; dispose?.(); };
  }, [replay]);

  // The recovered full-bleed banner can place the studio below the first fold.
  // Reuse the existing approved replay; do not replace its timeline or timing.
  useEffect(() => {
    const studio = root.current?.querySelector(".hero-studio");
    if (!studio || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < .6) return;
      if (root.current?.getAttribute("data-hero-state") === "settled") setReplay(value => value + 1);
      observer.disconnect();
    }, { threshold: .6 });
    observer.observe(studio);
    return () => observer.disconnect();
  }, []);

  return <section ref={root} className="creative-hero next-gen-hero" data-hero-state="static" aria-labelledby="creative-hero-title">
    <div className="restored-home-accreditation"><div><span>DELHI INSTITUTE OF DIGITAL MARKETING</span><span>Classroom &amp; live online learning · <Link href="/enquire">Book free counselling ↗</Link></span></div></div>
    <div className="creative-shell hero-meta"><span><i /> THE NEXT CHAPTER OF DIGITAL MARKETING</span><span>DELHI INSTITUTE OF DIGITAL MARKETING ↗</span></div>
    <div className="creative-shell hero-layout">
      <div className="hero-copy">
        <p className="creative-eyebrow"><span className="eyebrow-rule" /> PRACTICAL DIGITAL MARKETING TRAINING</p>
        <h1 id="creative-hero-title">{heading ? <span className="hero-line"><span>{heading}</span></span> : <><span className="hero-line"><span>Think creatively.</span></span><span className="hero-line"><span>Market intelligently.</span></span><span className="hero-line"><span>Make your move.</span></span></>}</h1>
        <p className="hero-description">Your ideas. Real-world skills. Learn digital marketing, explore AI tools and create what comes next at Delhi Institute of Digital Marketing.</p>
        <div className="creative-actions"><Link href="#courses" className="creative-button">Explore programs <ArrowRight size={17} /></Link><Link href="/enquire" className="creative-text-link">Free counselling <ArrowUpRight size={18} /></Link></div>
        {media && <div className="mt-5 flex items-center gap-3"><div className="hero-published-media"><Image src={media.path} alt={media.alt} fill sizes="95px" /></div><span className="text-xs text-neutral-600">Discover learning at DIDM.</span></div>}
        <div className="hero-authenticity"><div className="hero-photo"><Image src="/images/didm/life/preet-vihar-3.jpg" alt="DIDM learners and trainers at Preet Vihar" fill sizes="95px" /></div><div><strong>Real classrooms. Real creative energy.</strong><span>Learn on campus or join live online.</span></div><Link href="/life-at-didm" aria-label="Explore student life at DIDM"><ArrowUpRight size={22} /></Link></div>
      </div>
      <div className="hero-studio" aria-label="AI creative studio. Original illustrative campaign, not student work or real campaign results.">
        <div className="studio-orbit-label">YOUR IDEAS, IN FULL COLOUR.</div>
        <div className="studio-window">
          <div className="studio-toolbar"><span className="window-dots"><i /><i /><i /></span><span><Sparkles size={12} /> DIDM / CREATIVE STUDIO</span><span className="studio-live"><i /> LET’S MAKE SOMETHING</span></div>
          <div className="studio-workspace"><div className="studio-rail"><MousePointer2 size={17} /><Layers size={17} /><Sparkles size={17} /><span>T</span><span>+</span></div><div className="studio-artboard"><CampaignArtwork format={format} /></div><div className="studio-margin"><span>01 — BRAND EXPLORATION</span><span>CREATIVE CONCEPT</span></div></div>
          <div className="studio-timeline"><Play size={12} fill="currentColor" /><span>00:12</span>{[0,1,2,3,4,5,6].map(i=><div key={i} className={`timeline-frame frame-${i}`}><span>{i%2===0 ? "OFF" : "SCRIPT"}</span></div>)}<span className="timeline-track" /></div>
        </div>
        <div className="studio-prompt"><div><Sparkles size={14} /><span>THE IDEA STARTS HERE</span><span className="prompt-model">AI-ASSISTED</span></div><p className="prompt-words">A bold campaign for a generation<br />that thinks a little differently.</p><div className="prompt-foot"><span><Check size={12} /> Creative direction explored</span><span className="prompt-send"><ArrowUpRight size={15} /></span></div></div>
        <div className="studio-social"><div><span className="social-avatar">o.</span><span>offscript.studio</span><span>•••</span></div><CampaignArtwork format="social" /><div><span>♡ &nbsp; ↗</span><span>▱</span></div><p>Good ideas travel.</p></div>
        <div className="studio-cursor"><MousePointer2 size={22} fill="#b52828" /><span>Your next big idea</span></div>
        <div className="studio-controls" aria-label="Preview campaign format">{(["poster", "social", "story"] as const).map(f=><button key={f} aria-pressed={format===f} onClick={()=>setFormat(f)}>{f === "poster" ? "Brand canvas" : f === "social" ? "Social post" : "Story"}</button>)}<button className="studio-replay" onClick={()=>setReplay(v=>v+1)} aria-label="Replay creative studio animation"><RotateCcw size={13} /></button></div>
        <p className="studio-disclaimer">ILLUSTRATIVE CAMPAIGN · CREATED TO SHOW WHAT YOU COULD LEARN</p>
      </div>
    </div>
    <div className="creative-shell hero-bottom"><a href="#campaign-journey"><ArrowDown size={15} /> SCROLL TO SEE AN IDEA COME ALIVE</a><div><span>STRATEGY</span><i /> <span>CREATIVITY</span><i /><span>AI</span><i /><span>PERFORMANCE</span></div><span className="hero-edition">THE AI MARKETING PLAYGROUND / 01</span></div>
  </section>;
}
