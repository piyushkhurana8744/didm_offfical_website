"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, CalendarDays } from "lucide-react";
import type { Course } from "@/types/content";
import type { VerifiedDidmMedia } from "@/data/didm-media";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function CourseHero({ course, courseMedia }: { course: Course; courseMedia?: VerifiedDidmMedia }) {
  return <section className="program-editorial-hero program-premium">
    <div className="creative-shell">
      <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">DIDM</Link><span aria-hidden="true">/</span><Link href="/programs">Programs</Link><span aria-hidden="true">/</span><span>{course.shortName}</span></nav>
      <div className="program-hero-grid">
        <RevealOnScroll direction="up">
          <p className="creative-eyebrow"><span className="eyebrow-rule" aria-hidden="true" />YOUR NEXT CHAPTER / {course.shortName}</p>
          <h1>{course.name}</h1><p className="program-hero-tagline">{course.tagline}</p><p className="program-hero-description">{course.summary}</p>
          <div className="creative-actions"><Link href={`/enquire?p=${course.id}`} className="creative-button">Book free counselling <ArrowUpRight size={18} aria-hidden="true" /></Link><a href="#program-explorer" className="creative-text-link">Explore the learning <ArrowDown size={16} aria-hidden="true" /></a></div>
          <dl className="program-hero-facts"><div><dt>LEARNING FORMAT</dt><dd>{course.format}</dd></div><div><dt>CURRICULUM</dt><dd>{course.id === "midm" ? "52 original checkpoints" : course.modulesCount}</dd></div></dl>
          <p className="course-confirmation-note">Confirm the latest format, duration, fees and certification eligibility with admissions.</p>
        </RevealOnScroll>
        <RevealOnScroll direction="up" delayMs={100}>
          <figure className="program-hero-photo"><div><Image src="/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-6.jpg" alt="DIDM learners pictured in the published Preet Vihar batch-closing gallery" fill priority sizes="(max-width: 800px) 100vw, 45vw" /></div><figcaption><span>From the DIDM learning community / Preet Vihar</span><Link href="/life-at-didm">Student life <ArrowUpRight size={15} aria-hidden="true" /></Link></figcaption>
          {courseMedia && <details className="program-original-art"><summary>View original DIDM course artwork</summary><Image src={courseMedia.path} alt={courseMedia.alt} width={courseMedia.width} height={courseMedia.height} sizes="(max-width: 800px) 100vw, 45vw" /></details>}</figure>
        </RevealOnScroll>
      </div>
      <nav className="course-context-nav" aria-label="Explore this program"><a href="#program-explorer"><ArrowDown size={15} aria-hidden="true" /> Explore curriculum</a><Link href={`/upcoming-batches?p=${course.id}`}><CalendarDays size={15} aria-hidden="true" /> Find a batch</Link><Link href={`/enquire?p=${course.id}`}>Discuss {course.shortName} <ArrowUpRight size={15} aria-hidden="true" /></Link></nav>
    </div>
  </section>;
}
