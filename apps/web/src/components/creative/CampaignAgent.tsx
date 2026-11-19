"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, AudioLines, Check, Sparkles } from "lucide-react";
import "@/styles/campaign-agent.css";

const briefs = [
  { label: "Brand launch", title: "A new brand. An unexpected first impression.", audience: "Young creatives", output: "Identity + social launch" },
  { label: "Social campaign", title: "Turn a scroll into a conversation.", audience: "A curious community", output: "Content + channel strategy" },
  { label: "Creative ads", title: "Find the idea that makes people look twice.", audience: "Your next customer", output: "Ad concept + creative tests" },
];

/** Local creative demonstration. Does not call or replace the AI counsellor. */
export function CampaignAgent({ active }: { active: boolean }) {
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");
  const brief = briefs[selected];

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={root} className="journey-prompt journey-layer campaign-agent" data-running={active && visible} inert={!active}>
    <div className="agent-identity"><span className="agent-monogram">d.</span><span>DIDM CREATIVE AGENT<small>YOUR IDEA. A NEW POSSIBILITY.</small></span><span className="agent-demo">INTERACTIVE DEMO</span></div>
    <div className="agent-portrait" aria-hidden="true">
      <div className="agent-halo" /><div className="agent-orbit agent-orbit-one" /><div className="agent-orbit agent-orbit-two" />
      <span className="agent-satellite agent-satellite-idea"><Sparkles size={15} /> Imagine</span>
      <span className="agent-satellite agent-satellite-create"><AudioLines size={15} /> Create</span>
      <svg viewBox="0 0 500 330" className="agent-character" fill="none">
        <defs>
          <linearGradient id={`${id}-shell`} x1="155" y1="65" x2="338" y2="267" gradientUnits="userSpaceOnUse"><stop stopColor="#fff"/><stop offset=".38" stopColor="#e9e8e4"/><stop offset=".67" stopColor="#b8b8b6"/><stop offset=".82" stopColor="#f9f8f5"/><stop offset="1" stopColor="#8d8e90"/></linearGradient>
          <linearGradient id={`${id}-glass`} x1="186" y1="106" x2="303" y2="217" gradientUnits="userSpaceOnUse"><stop stopColor="#353941"/><stop offset=".5" stopColor="#101216"/><stop offset="1" stopColor="#24272d"/></linearGradient>
          <linearGradient id={`${id}-red`} x1="184" y1="230" x2="310" y2="293" gradientUnits="userSpaceOnUse"><stop stopColor="#fa6b67"/><stop offset=".4" stopColor="#bf292f"/><stop offset="1" stopColor="#71191f"/></linearGradient>
          <radialGradient id={`${id}-eye`}><stop stopColor="#fff4ed"/><stop offset=".5" stopColor="#fbc6bd"/><stop offset="1" stopColor="#ef7774"/></radialGradient>
        </defs>
        <ellipse className="agent-ground" cx="250" cy="309" rx="78" ry="10" fill="#090a0d" opacity=".3"/>
        <g className="agent-float">
          <path d="M219 239C196 244 180 263 180 281C202 300 293 302 319 280C319 260 300 244 280 239" fill={`url(#${id}-red)`} stroke="#f0a7a1" strokeOpacity=".45"/>
          <path d="M224 246C234 252 267 253 278 246" stroke="#ffd5cc" strokeWidth="2" strokeLinecap="round"/>
          <rect x="235" y="270" width="30" height="9" rx="4.5" fill="#571c23"/><path d="M244 274.5h12" stroke="#ffe4da" strokeWidth="2" strokeLinecap="round"/>
          <rect x="135" y="132" width="26" height="62" rx="13" fill={`url(#${id}-red)`}/><rect x="339" y="132" width="26" height="62" rx="13" fill={`url(#${id}-red)`}/>
          <rect x="144" y="140" width="9" height="43" rx="4.5" fill="#ffb2a9"/><rect x="347" y="140" width="9" height="43" rx="4.5" fill="#ffb2a9"/>
          <path d="M250 74V48" stroke="#c9c8c4" strokeWidth="7" strokeLinecap="round"/><circle cx="250" cy="42" r="9" fill="#d94a4c"/><circle cx="247" cy="39" r="3" fill="#ffc6b8"/>
          <rect x="153" y="73" width="194" height="173" rx="67" fill={`url(#${id}-shell)`} stroke="#fff" strokeOpacity=".6" strokeWidth="1.5"/>
          <rect x="168" y="91" width="164" height="132" rx="50" fill="#858687"/><rect x="172" y="95" width="156" height="124" rx="47" fill={`url(#${id}-glass)`} stroke="#0e1013" strokeWidth="2"/>
          <path d="M191 118C202 104 230 102 260 104" stroke="#fff" strokeOpacity=".15" strokeWidth="4" strokeLinecap="round"/>
          <g className="agent-eyes"><rect x="204" y="140" width="20" height="28" rx="10" fill={`url(#${id}-eye)`}/><rect x="276" y="140" width="20" height="28" rx="10" fill={`url(#${id}-eye)`}/></g>
          <path d="M236 182Q250 194 264 182" stroke="#f7b6aa" strokeWidth="4" strokeLinecap="round"/>
          <path d="M184 231C203 243 218 245 229 245" stroke="#fff" strokeOpacity=".65" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="314" cy="202" r="3" fill="#d55154"/>
        </g>
      </svg>
      <span className="agent-caption"><span /> A little curiosity. A lot of possibility.</span>
    </div>
    <div className="agent-brief">
      <div className="agent-brief-heading"><span><Sparkles size={12} /> LET’S MAKE SOMETHING DIFFERENT</span><ArrowUpRight size={16} /></div>
      <div className="agent-choices" role="group" aria-label="Choose a sample campaign brief">{briefs.map((item, index) => <button type="button" key={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{selected === index && <Check size={10} />}{item.label}</button>)}</div>
      <p className="agent-brief-title" aria-live="polite">{brief.title}</p>
      <div className="agent-brief-meta"><span>{brief.audience}</span><span>{brief.output}</span></div>
    </div>
  </div>;
}
