"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Compass, RotateCcw } from "lucide-react";
import type { DiscoveryCourse } from "@/lib/student/discovery";
import { DEFAULT_PROFILE, recommendCourses, type LearnerProfile } from "@/lib/student/discovery";

const steps: {key:keyof LearnerProfile; title:string; note:string; options:{value:string;label:string;detail:string}[]}[] = [
  {key:"goal",title:"What would you like to do next?",note:"Start with your ambition. We’ll help you explore a direction.",options:[{value:"career",label:"Start or switch my career",detail:"Build a broad marketing foundation"},{value:"business",label:"Grow my business",detail:"Bring more clarity to your marketing"},{value:"specialise",label:"Develop a specialism",detail:"Build on the skills you already have"}]},
  {key:"experience",title:"Where are you starting from?",note:"There’s room for every starting point.",options:[{value:"beginner",label:"I’m new to marketing",detail:"I’d like to start with the fundamentals"},{value:"practising",label:"I have some experience",detail:"I already study or work in marketing"}]},
  {key:"interest",title:"What sparks your curiosity?",note:"Pick an interest, or keep your options open.",options:[{value:"all",label:"A bit of everything",detail:"Explore the whole marketing landscape"},{value:"seo",label:"Search & SEO",detail:"Help people discover useful content"},{value:"performance",label:"Performance marketing",detail:"Plan, measure and improve campaigns"},{value:"content",label:"Content & creativity",detail:"Turn a message into something memorable"},{value:"ai",label:"AI & automation",detail:"Explore responsible AI-assisted workflows"}]},
  {key:"mode",title:"Where would you like to learn?",note:"Admissions will confirm which formats are currently available.",options:[{value:"classroom",label:"On campus",detail:"I prefer learning in a classroom"},{value:"online",label:"Live online",detail:"I need the flexibility to learn remotely"},{value:"either",label:"I’m open to either",detail:"Help me explore both options"}]},
  {key:"time",title:"What kind of commitment suits you?",note:"This is a preference, not a promise about course duration.",options:[{value:"focused",label:"A focused learning track",detail:"I want to work on a particular set of skills"},{value:"extended",label:"A broader learning journey",detail:"I can make room for a comprehensive program"}]},
];
export function CourseFinder({courses}:{courses:DiscoveryCourse[]}) {
  const [profile,setProfile]=useState<LearnerProfile>({...DEFAULT_PROFILE});
  const [step,setStep]=useState(0);
  const [done,setDone]=useState(false);
  const [chosen,setChosen]=useState(false);
  const heading=useRef<HTMLHeadingElement>(null);
  const current=steps[step];
  const focusHeading=()=>requestAnimationFrame(()=>heading.current?.focus());
  const advance=()=>{if(step===steps.length-1)setDone(true);else setStep(step+1);setChosen(false);focusHeading();};
  const reset=()=>{setProfile({...DEFAULT_PROFILE});setStep(0);setDone(false);setChosen(false);focusHeading();};
  return <div className="student-finder" id="finder">
    <aside className="finder-aside"><Compass size={30}/><p className="student-eyebrow">YOUR NEXT CHAPTER</p><h2>A little clarity.<br/> A better first step.</h2><p>Five quick questions to explore the DIDM programs that could fit you.</p><ol aria-label="Course finder progress">{steps.map((s,i)=><li key={s.key} aria-current={!done&&step===i?"step":undefined}><span>{done||i<step?<Check size={14}/>:String(i+1).padStart(2,"0")}</span>{["Your ambition","Your starting point","Your interests","Your classroom","Your commitment"][i]}</li>)}</ol><p className="finder-privacy">No sign-up. No personal details.<br/>Your answers stay in this page.</p></aside>
    <div className="finder-main">{!done?<>
      <p className="student-eyebrow">STEP {step+1} OF {steps.length}</p><h2 ref={heading} tabIndex={-1}>{current.title}</h2><p>{current.note}</p>
      <fieldset className="finder-options"><legend className="sr-only">{current.title}</legend>{current.options.map(o=><label key={o.value} className={chosen&&profile[current.key]===o.value?"is-selected":""}><input type="radio" name={current.key} checked={chosen&&profile[current.key]===o.value} onChange={()=>{setProfile({...profile,[current.key]:o.value});setChosen(true);}}/><span><strong>{o.label}</strong><small>{o.detail}</small></span><span className="option-check" aria-hidden="true">{chosen&&profile[current.key]===o.value&&<Check size={14}/>}</span></label>)}</fieldset>
      <div className="finder-navigation"><button className="student-text-button" disabled={step===0} onClick={()=>{setStep(step-1);setChosen(true);focusHeading();}}>← Back</button><button className="student-primary" disabled={!chosen} onClick={advance}>{step===steps.length-1?"See my matches":"Continue"}<ArrowRight size={17}/></button></div>
    </>:<><p className="student-eyebrow">A PLACE TO START</p><h2 ref={heading} tabIndex={-1}>Your learning shortlist.</h2><p>These are explained catalog matches. A counsellor can confirm suitability, format, fees and availability.</p><div className="finder-results">{recommendCourses(courses,profile).map(({course,reasons},i)=><article key={course.id}><span className="student-eyebrow">{i===0?"START EXPLORING HERE":"ANOTHER DIRECTION"}</span><h3>{course.name}</h3><ul>{reasons.slice(0,3).map(r=><li key={r}><Check size={15}/>{r}</li>)}</ul><div className="student-actions"><Link href={`/programs/${course.slug}`}>Explore curriculum <ArrowUpRight size={16}/></Link><Link href={`/enquire?p=${course.id}&form=course-finder`}>Discuss this program <ArrowRight size={16}/></Link></div></article>)}</div><button className="student-text-button" onClick={reset}><RotateCcw size={15}/> Start again</button></>}
      <p className="finder-method">How matching works: your choices are compared with the existing DIDM catalog using transparent rules. No generative AI or admission guarantee.</p>
    </div>
  </div>;
}
