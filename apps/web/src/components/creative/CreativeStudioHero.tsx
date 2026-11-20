"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { AdaptiveHeroGuide } from "@/components/homepage/AdaptiveHeroGuide";

export function CampaignArtwork({ className = "", format = "poster" }: { className?: string; format?: "poster" | "social" | "story" }) {
  return (
    <Image
      className={className}
      src={`/images/creative/offscript-${format}.svg`}
      alt={`OFFSCRIPT original illustrative campaign ${format}: bold editorial typography and a cobalt globe`}
      width={format === "poster" ? 760 : format === "social" ? 640 : 440}
      height={format === "poster" ? 940 : format === "social" ? 640 : 780}
      priority={format === "poster"}
    />
  );
}

export function CreativeStudioHero({ heading, media }: { heading?: string; media?: { path: string; alt: string } }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled || !root.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const context = gsap.context(() => {
        const tl = gsap.timeline({ onComplete: () => root.current?.setAttribute("data-hero-state", "settled") });
        root.current?.setAttribute("data-hero-state", "entrance");
        tl.from(".hero-line > span", { yPercent: 112, rotate: 2, stagger: 0.12, duration: 0.85, ease: "power3.out" })
          .from(".hero-guide-wrapper", { y: 35, opacity: 0, duration: 0.9, ease: "power3.out" }, 0.2);
      }, root);
      dispose = () => context.revert();
    });
    return () => { cancelled = true; dispose?.(); };
  }, []);

  return (
    <section ref={root} className="creative-hero next-gen-hero" data-hero-state="static" aria-labelledby="creative-hero-title">
      <div className="restored-home-accreditation">
        <div>
          <span>DELHI INSTITUTE OF DIGITAL MARKETING</span>
          <span>Classroom &amp; live online learning · <Link href="/enquire">Book free counselling ↗</Link></span>
        </div>
      </div>
      <div className="creative-shell hero-meta">
        <span><i /> THE NEXT CHAPTER OF DIGITAL MARKETING</span>
        <span>DELHI INSTITUTE OF DIGITAL MARKETING ↗</span>
      </div>
      <div className="creative-shell hero-layout">
        <div className="hero-copy">
          <p className="creative-eyebrow"><span className="eyebrow-rule" /> PRACTICAL DIGITAL MARKETING TRAINING</p>
          <h1 id="creative-hero-title">
            {heading ? (
              <span className="hero-line"><span>{heading}</span></span>
            ) : (
              <>
                <span className="hero-line"><span>Think creatively.</span></span>
                <span className="hero-line"><span>Market intelligently.</span></span>
                <span className="hero-line"><span>Make your move.</span></span>
              </>
            )}
          </h1>
          <p className="hero-description">Your ideas. Real-world skills. Learn digital marketing, explore AI tools and create what comes next at Delhi Institute of Digital Marketing.</p>
          <div className="creative-actions">
            <Link href="#courses" className="creative-button">Explore programs <ArrowRight size={17} /></Link>
            <Link href="/enquire" className="creative-text-link">Free counselling <ArrowUpRight size={18} /></Link>
          </div>
          {media && (
            <div className="mt-5 flex items-center gap-3">
              <div className="hero-published-media">
                <Image src={media.path} alt={media.alt} fill sizes="95px" />
              </div>
              <span className="text-xs text-neutral-600">Discover learning at DIDM.</span>
            </div>
          )}
          <div className="hero-authenticity">
            <div className="hero-photo">
              <Image src="/images/didm/life/preet-vihar-3.jpg" alt="DIDM learners and trainers at Preet Vihar" fill sizes="95px" />
            </div>
            <div>
              <strong>Real classrooms. Real creative energy.</strong>
              <span>Learn on campus or join live online.</span>
            </div>
            <Link href="/life-at-didm" aria-label="Explore student life at DIDM">
              <ArrowUpRight size={22} />
            </Link>
          </div>
        </div>

        {/* Embedded AI Course & Career Guide in place of static studio illustration */}
        <div className="hero-guide-wrapper w-full flex items-center justify-center">
          <AdaptiveHeroGuide embedded />
        </div>
      </div>
      <div className="creative-shell hero-bottom">
        <a href="#campaign-journey"><ArrowDown size={15} /> SCROLL TO SEE AN IDEA COME ALIVE</a>
        <div><span>STRATEGY</span><i /> <span>CREATIVITY</span><i /><span>AI</span><i /><span>PERFORMANCE</span></div>
        <span className="hero-edition">THE AI MARKETING PLAYGROUND / 01</span>
      </div>
    </section>
  );
}
