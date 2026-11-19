"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, Play, Sparkles } from "lucide-react";
import type { Course } from "@/types/content";
import { CampaignArtwork } from "./CreativeStudioHero";

const directions: Record<string, { title: string; intro: string; label: string }> = {
  midm: { title:"Learn the pieces. Build the campaign.", intro:"Explore how the 52 original curriculum checkpoints connect. Your complete roadmap continues below.", label:"THE LEARNING-TO-CAMPAIGN STUDIO" },
  advanced: { title:"Think strategically. Create purposefully.", intro:"Explore the course’s learning areas, from search and social to campaign measurement.", label:"PERFORMANCE MARKETING STUDIO" },
  customized: { title:"Build skills you can put to work.", intro:"Explore the learning areas that can contribute to your own practical marketing portfolio.", label:"YOUR SKILLS PORTFOLIO" },
  dmi: { title:"A connected journey into marketing & AI.", intro:"Follow the curriculum milestones. See how strategy, creative practice and measurement connect.", label:"THE LEARNING JOURNEY" },
  online: { title:"Bring your next chapter online.", intro:"Explore the course’s learning modules, then bring your questions to a live learning session.", label:"DIGITAL LEARNING WORKSPACE" },
  "gen-ai-knowledge-camp": { title:"Curiosity is your best creative tool.", intro:"Explore the AI-assisted workflows covered in this course. Select a learning topic to look inside.", label:"AI CREATION LAB" },
};

export function ProgramSignature({ course }: { course: Course }) {
  const [index, setIndex] = useState(0);
  const [view, setView] = useState("Classroom");
  const stage = useRef<HTMLDivElement>(null);
  const config = directions[course.id] || directions.midm;
  const modules = course.syllabus;
  const item = modules[index];
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let dispose: (()=>void) | undefined;
    let cancelled = false;
    import("gsap").then(({gsap}) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(".signature-detail", { clipPath:"inset(0% 0% 100% 0%)", y:18 }, {clipPath:"inset(0% 0% 0% 0%)", y:0, duration:.55, ease:"power3.out"});
        gsap.fromTo(".signature-visual", { rotationY:-10, scale:.94 }, {rotationY:0, scale:1, duration:.65, ease:"power2.out"});
      }, stage);
      dispose = () => ctx.revert();
    });
    return () => { cancelled=true; dispose?.(); };
  }, [index, view]);
  if (!item) return null;
  return <section className={`signature-experience signature-${course.id}`} aria-label={config.label}><div className="creative-shell">
    <div className="creative-section-heading"><div><p className="creative-eyebrow"><span className="eyebrow-rule" />{config.label}</p><h2>{config.title}</h2></div><p>{config.intro}</p></div>
    <div ref={stage} className="signature-workspace">
      <div className="signature-module-list" aria-label="Curriculum modules">{modules.map((m,i)=><button key={`${m.title}-${i}`} aria-pressed={index===i} onClick={()=>setIndex(i)}><span>{String(i+1).padStart(2,"0")}</span><span>{m.title}</span><ArrowUpRight size={15}/></button>)}</div>
      <div className="signature-detail" id={`signature-detail-${course.id}`}>
        <div className="signature-detail-top"><span>{course.shortName} / LEARNING EXPLORER</span><span>{String(index+1).padStart(2,"0")} OF {modules.length}</span></div>
        {course.id === "online" && <div className="workspace-view-controls" aria-label="Explore the online learning workspace">{["Classroom","Modules","Practice"].map(v=><button key={v} onClick={()=>setView(v)} aria-pressed={view===v}>{v}</button>)}</div>}
        <div className="signature-detail-layout">
          <div className="signature-visual" aria-hidden="true">{course.id==="online" ? view === "Classroom" ? <><div className="classroom-frame"><Image src="/images/didm/life/preet-vihar-3.jpg" alt="" width={600} height={400}/><span><Play size={14}/> Classroom community / DIDM</span></div><div className="assignment-tile"><BookOpen size={23}/><strong>Learn. Discuss. Practise.</strong></div></> : <div className="lab-art"><BookOpen size={30}/><span>ILLUSTRATIVE LEARNING WORKSPACE</span><strong>{view==="Modules" ? "A connected curriculum." : "Make room for practice."}</strong><div>{(view === "Modules" ? item.toolsUsed : ["Explore a brief", "Apply a skill", "Review your work"]).map(t=><span key={t}>{t}</span>)}</div><i>{view==="Modules"?"Learning topics from the course":"A conceptual learning workflow"}</i></div> : course.id==="dmi" ? <div className="milestone-art">{modules.map((m,i)=><div key={m.title} data-current={index===i}><span>{String(i+1).padStart(2,"0")}</span><p>{m.title}</p></div>)}</div> : course.id==="gen-ai-knowledge-camp" ? <div className="lab-art"><Sparkles size={30}/><span>EXPLORE A WORKFLOW</span><strong>{item.title}</strong><div>{item.toolsUsed.map(t=><span key={t}>{t}</span>)}</div><i>Human direction. AI assistance.</i></div> : course.id === "advanced" ? <div className="performance-art"><span>ILLUSTRATIVE CAMPAIGN SYSTEM</span><div className="performance-mini"><CampaignArtwork format="social"/></div>{["Strategy","Creative","Targeting","Measurement"].map((s,i)=><div key={s} data-current={i===index}><span>0{i+1}</span><strong>{s}</strong><ArrowRight size={13}/></div>)}<small>Every part informs the next.</small></div> : course.id === "customized" ? <div className="portfolio-art"><span>YOUR SKILLS / PROJECT EXPLORATION</span><CampaignArtwork format={index%2===0?"poster":"social"}/><div><strong>{index===0?"Build your web presence.":"Connect your campaign."}</strong><span>Original illustrative portfolio concept</span></div></div> : <><CampaignArtwork format={index%2===0?"poster":"social"}/><span className="signature-art-caption">ILLUSTRATIVE PROJECT / CAMPAIGN EXPLORATION</span></>}</div>
          <div className="signature-module-copy"><p className="signature-module-label">CURRICULUM / {String(index+1).padStart(2,"0")}</p><h3>{item.title}</h3><p>{item.summary}</p><div className="signature-tool-list">{item.toolsUsed.filter(t=>t!=="Industry Toolstack").map(t=><span key={t}>{t}</span>)}</div><p className="signature-source-note">Learning topic from the existing DIDM curriculum. Campaign artwork is illustrative.</p><button className="signature-next" onClick={()=>setIndex((index+1)%modules.length)}>Next learning area <ArrowRight size={17}/></button></div>
        </div>
      </div>
    </div>
  </div></section>;
}
