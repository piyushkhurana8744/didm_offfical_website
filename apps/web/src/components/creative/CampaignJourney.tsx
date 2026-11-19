"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Search, Megaphone, BarChart3, Layers } from "lucide-react";
import { CampaignAgent } from "./CampaignAgent";
import { CampaignArtwork } from "./CreativeStudioHero";

const scenes = [
  { label: "The idea", title: "Start with a different point of view.", body: "Every campaign starts with a question. Who are we talking to, and what do we want them to feel? Turn that brief into a creative direction.", skill: "Creative thinking · Audience research" },
  { label: "The creative", title: "One idea. A whole world of content.", body: "Explore a visual identity. Shape the message. Adapt your idea into a poster, a social post and a short-form story, with AI as your creative collaborator.", skill: "Content strategy · AI-assisted creation" },
  { label: "The campaign", title: "Put the right story in the right place.", body: "Bring creative work and channel strategy together. Discover how search, paid media and social publishing play different roles in a campaign.", skill: "Search marketing · Paid media · Social" },
  { label: "The insight", title: "Make sense of what happens next.", body: "Follow the journey from discovery to action. Learn to read channel patterns, ask better questions and use evidence to improve your next creative decision.", skill: "Analytics · Measurement · Optimisation" },
  { label: "Your next move", title: "Now make the skills yours.", body: "Creativity is the beginning. Build the strategy, tools and practical knowledge behind it with a DIDM program that fits your next chapter.", skill: "Learn · Practise · Build your portfolio" },
];

export function CampaignJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const frame = requestAnimationFrame(() => { import("gsap/ScrollTrigger").then(({ScrollTrigger})=>ScrollTrigger.refresh()); });
    return () => cancelAnimationFrame(frame);
  }, [ready, reduced]);

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const context = gsap.context(() => {
          const tl = gsap.timeline({ scrollTrigger: {
            trigger: root.current, start: "top top", end: "bottom bottom", scrub: .45,
            onUpdate: self => setActive(Math.min(4, Math.floor(self.progress * 5))),
          } });
          tl.to(".journey-prompt", { y: -65, scale: .85, opacity: 0, duration: .65 }, .5)
            .fromTo(".journey-art", { y: 90, rotation: -12, scale: .65, opacity: 0 }, { y: 0, rotation: -7, scale: 1, opacity: 1, duration: .8 }, .7)
            .fromTo(".journey-social", { x: -75, y: 70, rotation: -9, opacity: 0 }, { x: 0, y: 0, rotation: 9, opacity: 1, duration: .7 }, 1)
            .fromTo(".journey-film", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .6 }, 1.15)
            .to(".journey-art", { xPercent: -23, yPercent: -14, scale: .68, rotation: -4, duration: .7 }, 1.8)
            .to(".journey-social", { xPercent: 20, yPercent: -15, scale: .75, duration: .7 }, 1.8)
            .to(".journey-film", { opacity: 0, y: 20, duration: .35 }, 1.8)
            .fromTo(".journey-channels", { y: 55, rotationX: 15, opacity: 0 }, { y: 0, rotationX: 0, opacity: 1, duration: .65 }, 2)
            .to(".journey-art,.journey-social,.journey-channels", { opacity: 0, scale: .8, y: -40, duration: .55 }, 2.8)
            .fromTo(".journey-analytics", { opacity: 0, y: 70, rotationY: -12 }, { opacity: 1, y: 0, rotationY: 0, duration: .75 }, 2.95)
            .fromTo(".journey-bars i", { scaleY: 0 }, { scaleY: 1, stagger: .05, duration: .6 }, 3.05)
            .fromTo(".journey-chart-line", { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: .8 }, 3.05)
            .to(".journey-analytics", { opacity: 0, scale: .9, y: -45, duration: .5 }, 3.85)
            .fromTo(".journey-course", { opacity: 0, y: 70, rotateX: 10 }, { opacity: 1, y: 0, rotateX: 0, duration: .7 }, 3.95)
            .to({}, { duration: .35 });
        }, root);
        return () => context.revert();
      });
      setReady(true);
      dispose = () => mm.revert();
    }).catch(() => setReduced(true));
    return () => { cancelled = true; dispose?.(); media.removeEventListener("change", update); };
  }, []);

  const choose = (index: number) => {
    if (reduced || !ready) { setActive(index); return; }
    const el = root.current!;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (el.offsetHeight - innerHeight) * ((index + .45) / 5), behavior: "instant" });
  };

  return <section ref={root} id="campaign-journey" className={`campaign-journey ${ready && !reduced ? "journey-enhanced" : "journey-static"}`} data-scene={active} aria-label="From idea to campaign: illustrative learning journey">
    <div className="journey-sticky">
      <div className="creative-shell">
        <div className="journey-topline"><span>THE MAKING OF A MARKETER</span><span>ONE IDEA. FIVE POSSIBILITIES.</span></div>
        <div className="journey-layout">
          <div className="journey-copy">
            <p className="creative-eyebrow"><span className="eyebrow-rule" /> FROM IDEA TO DIGITAL CAMPAIGN</p>
            <div className="journey-numbers" aria-label="Choose a chapter">{scenes.map((scene, i) => <button key={scene.label} onClick={() => choose(i)} aria-current={active === i ? "step" : undefined} aria-label={`${String(i + 1).padStart(2, "0")}. ${scene.label}`}>{String(i + 1).padStart(2, "0")}</button>)}</div>
            <div className="journey-chapter" key={active}><span className="journey-kicker">{scenes[active].label}</span><h2>{scenes[active].title}</h2><p>{scenes[active].body}</p><div className="journey-skill">{scenes[active].skill}</div></div>
            <Link href={active === 4 ? "#courses" : "/programs"} className="journey-link">{active === 4 ? "Find your program" : "Explore what you’ll learn"} <ArrowUpRight size={18} /></Link>
          </div>
          <div className="journey-stage" aria-label={`Illustration: ${scenes[active].label}`}>
            <div className="journey-stage-top"><span><span className="live-dot" /> OFFSCRIPT / CAMPAIGN EXPLORATION</span><span>DEMO PROJECT</span></div>
            <CampaignAgent active={active === 0} />
            <div className="journey-art journey-layer"><CampaignArtwork /><span>01 / BRAND CANVAS</span></div>
            <div className="journey-social journey-layer"><CampaignArtwork format="social" /><span>02 / SOCIAL CONTENT</span></div>
            <div className="journey-film journey-layer"><span>03 / THE STORYBOARD</span><div>{["A fresh idea.", "A new angle.", "Go offscript."].map((v, i) => <div key={v}><small>0{i + 1}</small><strong>{v}</strong><span>↗</span></div>)}</div></div>
            <div className="journey-channels journey-layer">{[{ icon:Search, label:"Search", text:"Meet intent." }, { icon:Megaphone, label:"Paid media", text:"Reach the audience." }, { icon:Layers, label:"Social", text:"Start a conversation." }].map(c => <div key={c.label}><c.icon size={20} /><strong>{c.label}</strong><span>{c.text}</span><Check size={14} /></div>)}</div>
            <div className="journey-analytics journey-layer"><div className="analytics-heading"><BarChart3 size={20} /><span>READ THE SIGNALS</span><span>SAMPLE DATA</span></div><h3>From attention<br />to action.</h3><div className="journey-chart"><svg viewBox="0 0 440 130" role="img" aria-label="Illustrative channel trend"><path d="M0 110H440M0 65H440M0 20H440" stroke="#ffffff15" /><path className="journey-chart-line" d="M0 110 C40 110 45 67 95 79 S160 30 210 48 S280 90 320 39 S400 35 440 9" fill="none" stroke="#b8c3ff" strokeWidth="4" strokeDasharray="600" /></svg></div><div className="journey-bars">{[78,55,34].map((v,i)=><div key={v}><span>{["Discover", "Engage", "Act"][i]}</span><div><i style={{height:`${v}%`}} /></div></div>)}</div><p>Insight → Ask what works. Test what could work better.</p><small>Conceptual learning visual. No DIDM or client performance results.</small></div>
            <div className="journey-course journey-layer" inert={active !== 4}><span className="course-stage-mark">d.</span><span>YOUR CREATIVE NEXT CHAPTER</span><h3>From “what if”<br />to <em>“I made this.”</em></h3><p>Learn the skills behind the campaign.</p><Link href="/programs/master-in-digital-marketing-course">Master in Digital Marketing <ArrowUpRight size={19} /></Link><Link href="/programs/advanced-digital-marketing-course">Advanced Digital Marketing <ArrowUpRight size={19} /></Link><Link href="/programs/gen-ai-knowledge-camp">Generative AI Knowledge Camp <ArrowUpRight size={19} /></Link></div>
            <div className="journey-stage-bottom"><span>ORIGINAL ILLUSTRATIVE CAMPAIGN</span><span>IDEA → CREATE → CONNECT → UNDERSTAND</span></div>
          </div>
        </div>
        <div className="journey-footer"><span><ArrowDown size={14} /> {reduced ? "Choose a chapter to explore" : "Scroll to create. Scroll back to explore."}</span><span>{String(active + 1).padStart(2, "0")} / 05</span></div>
      </div>
    </div>
    <noscript><ol>{scenes.map(s=><li key={s.label}><h3>{s.title}</h3><p>{s.body}</p></li>)}</ol></noscript>
  </section>;
}
