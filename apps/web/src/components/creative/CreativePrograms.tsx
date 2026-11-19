import Image from "next/image";
import { COURSE_CARD_MEDIA } from "@/data/didm-media";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllCourses } from "@/lib/content";
import { MotionSection } from "@/components/motion";

const labels: Record<string, string> = { midm:"The complete foundation", advanced:"Build your marketing toolkit", customized:"A program shaped around you", dmi:"Marketing meets intelligence", online:"Your classroom, wherever you are", "gen-ai-knowledge-camp":"Explore a new creative workflow" };


const courseArtwork:Record<string,string>={midm:"/images/didm/homepage/Master_in_digital_marketing_course_MIDM_DIDM.webp",advanced:"/images/didm/homepage/Advanced_in_digital_marketing_course_AIMTP_Course_DIDM.webp",dmi:"/images/didm/homepage/digital-marketing-intelligence.webp",customized:"/images/didm/homepage/Professional_in_Digital_Marketing_Course_DIDM.webp",online:"/images/didm/courses/Online Digital Marketing Course by DIDM.png"};
const presentationOrder=["midm","advanced","dmi","customized","online","gen-ai-knowledge-camp"];

export function CreativePrograms() {
  return <section id="courses" className="creative-programs"><div className="creative-shell">
    <div className="creative-section-heading"><div><p className="creative-eyebrow"><span className="eyebrow-rule" /> ACCREDITED CAREER PROGRAMS</p><h2>Choose the Certification Course<br />for Your Career!</h2></div><p>A first step, a fresh direction or a deeper specialisation. Explore DIDM’s digital marketing and AI learning programs.</p></div>
    <div className="creative-program-grid">{getAllCourses().slice().sort((a,b)=>presentationOrder.indexOf(a.id)-presentationOrder.indexOf(b.id)).map((course, index)=><MotionSection key={course.id} as="article" preset={index % 2 === 0 ? "slideLeft" : "scale"} className={`creative-program ${index === 0 ? "program-featured" : ""}`}><div className="restored-program-art"><Image src={courseArtwork[course.id] || COURSE_CARD_MEDIA[course.slug]!.path} alt={course.name+" — original DIDM program artwork"} fill sizes="(max-width:767px) 100vw, (max-width:1199px) 50vw, 25vw" /></div><div className="program-index"><span>{String(index + 1).padStart(2,"0")} / {course.shortName}</span><ArrowUpRight size={21} /></div><p className="program-category">{labels[course.id]}</p><h3><Link href={`/programs/${course.slug}`}>{course.name}</Link></h3><p>{course.summary}</p><div className="program-specs"><span>{course.format}</span><span>{course.modulesCount}</span></div><div className="program-actions"><Link href={`/programs/${course.slug}`}>Explore program <ArrowUpRight size={17} /></Link><Link href={`/enquire?p=${course.id}`}>Request callback</Link></div></MotionSection>)}</div>
    <p className="program-footnote">Find your fit with a real conversation. <Link href="/compare">Compare programs ↗</Link> <Link href="/enquire">Talk to a DIDM counsellor ↗</Link></p>
  </div></section>;
}
