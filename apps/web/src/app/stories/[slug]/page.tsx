import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PUBLISHED_STUDENT_REFLECTIONS, getStudentReflection } from "@/lib/public/student-stories";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return PUBLISHED_STUDENT_REFLECTIONS.map(({slug}) => ({slug})); }
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug}=await params,story=getStudentReflection(slug);
  return story ? { title:`${story.name}’s Learner Reflection | DIDM`,description:`Read ${story.name}’s reflection published by DIDM and explore digital marketing learning options.`,alternates:{canonical:`/stories/${story.slug}`} } : {title:"Reflection not found | DIDM",robots:{index:false}};
}
export default async function StoryDetailPage({params}:Props) {
  const {slug}=await params,story=getStudentReflection(slug);
  if(!story)notFound();
  return <article className="story-detail">
    <nav aria-label="Breadcrumb"><Link href="/">DIDM</Link><span aria-hidden="true">/</span><Link href="/stories">Student reflections</Link><span aria-hidden="true">/</span><span>{story.name}</span></nav>
    <header><div><p className="public-eyebrow">A LEARNER’S PERSPECTIVE</p><h1>{story.name},<br/>in their own words.</h1></div><div><Image src={story.image} alt={story.name} fill sizes="(max-width: 800px) 110px, 240px" priority /></div></header>
    <RevealOnScroll><blockquote>“{story.quote}”</blockquote></RevealOnScroll>
    <div className="story-proof"><p>Source: <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer">{story.sourceLabel}</a>.</p><p>This is an individual reflection. The source does not establish a particular course enrolment, salary or placement result. The course below is an exploration option, not a claim about this learner’s enrolment.</p></div>
    <div className="branch-schedule-handoff"><div><p className="public-eyebrow">EXPLORE THE LEARNING</p><h2>What could you learn next?</h2><p>Explore the digital marketing curriculum or talk to admissions about a program that fits your own goals.</p></div><Link className="student-primary" href="/programs/master-in-digital-marketing-course">Explore the curriculum <ArrowRight size={16} aria-hidden="true" /></Link></div>
  </article>;
}
