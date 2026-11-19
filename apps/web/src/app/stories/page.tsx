import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialHero } from "@/components/creative/EditorialHero";
import { MotionSection } from "@/components/motion/MotionSection";
import { PUBLISHED_STUDENT_REFLECTIONS } from "@/lib/public/student-stories";

export const metadata: Metadata = {
  title: "Student Reflections & Published Feedback | DIDM",
  description: "Read learner reflections published by DIDM, explore the learning community and find a digital marketing program to discuss with admissions.",
  alternates: { canonical: "/stories" },
};

export default function StoriesPage() {
  return <div className="creative-page pb-16">
    <EditorialHero eyebrow="STUDENT REFLECTIONS" title="Different journeys." accent="In their own words." description="A first step, a new perspective or a little more confidence. Explore reflections published by DIDM’s learning community." image="/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-6.jpg" alt="DIDM learners pictured in the published Preet Vihar batch-closing gallery" caption="A moment from the learning community / Preet Vihar" variant="stories" href="#student-stories" action="Read learner reflections" />
    <div className="student-shell space-y-8 pt-12" id="student-stories">
      <p className="story-proof">These reflections come from <a href="https://www.didm.in/" target="_blank" rel="noopener noreferrer">DIDM’s published student feedback</a>. They describe individual experiences. Course enrolment, salaries and placement outcomes are not inferred from these quotes.</p>
      <MotionSection className="story-collection" preset="stagger">
        {PUBLISHED_STUDENT_REFLECTIONS.map(story => <div className="story-card" key={story.slug}>
          <div><Image src={story.image} alt={story.name} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
          <article><p className="public-eyebrow">A LEARNER’S PERSPECTIVE</p><h2>{story.name}</h2><blockquote>“{story.quote}”</blockquote><small>Published learner feedback / DIDM</small><Link href={`/stories/${story.slug}`}>Read this reflection <ArrowUpRight size={16} aria-hidden="true" /></Link></article>
        </div>)}
      </MotionSection>
    </div>
  </div>;
}
