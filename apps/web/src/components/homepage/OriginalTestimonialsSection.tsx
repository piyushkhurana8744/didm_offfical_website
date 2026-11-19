"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import VOICES from "@/data/creative-student-voices.json";
import { MotionSection } from "@/components/motion";
export function OriginalTestimonialsSection(){
 const [index,setIndex]=useState(0);const voice=VOICES[index];
 return <MotionSection className="student-voices" preset="slideRight"><div className="creative-shell"><div className="creative-section-heading"><div><p className="creative-eyebrow"><span className="eyebrow-rule"/>THE STUDENTS BEHIND THE STORIES</p><h2>Real people.<br/><em>Their own words.</em></h2></div><p>Different ambitions, individual experiences. Meet voices from the DIDM learning community.</p></div><div className="voice-editorial"><div className="voice-portraits" aria-label="Choose a student story">{VOICES.map((v,i)=><button key={v.name} onClick={()=>setIndex(i)} aria-pressed={index===i} aria-label={`Read ${v.name}’s story`}><Image src={v.image} alt={v.name} width={150} height={180} sizes="(max-width:600px) 70px, 110px"/><span>{v.name}</span></button>)}</div><div className="voice-quote" key={index}><span className="voice-quote-mark" aria-hidden="true">“</span><blockquote>{voice.quote}</blockquote><div className="voice-author"><strong>{voice.name}</strong><span>DIDM learner / Published student feedback</span></div><div className="voice-controls"><span>{String(index+1).padStart(2,"0")} / {String(VOICES.length).padStart(2,"0")}</span><button onClick={()=>setIndex((index+VOICES.length-1)%VOICES.length)} aria-label="Previous Testimonial"><ArrowLeft size={18}/></button><button onClick={()=>setIndex((index+1)%VOICES.length)} aria-label="Next Testimonial"><ArrowRight size={18}/></button><Link href={`/stories/${voice.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`}>Read this reflection <ArrowUpRight size={17}/></Link></div></div></div></div></MotionSection>;
}
