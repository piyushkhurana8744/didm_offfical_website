import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  Sparkles,
  BookOpen,
  MapPin,
  Laptop,
  Layers,
  Check,
  Building,
} from "lucide-react";
import { getAllCourses, getCourseBySlug, getAllCentres, SITE_BRAND } from "@/lib/content";
import { COURSE_DETAIL_MEDIA } from "@/data/didm-media";
import { ProgramSignature } from "@/components/creative/ProgramSignature";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseLearningStudio } from "@/components/course/CourseLearningStudio";
import { SyllabusAccordion } from "@/components/SyllabusAccordion";
import { FAQSection } from "@/components/FAQSection";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  const params: { slug: string }[] = [];
  courses.forEach((c) => {
    params.push({ slug: c.slug });
    params.push({ slug: c.id });
    c.aliases.forEach((alias) => {
      params.push({ slug: alias });
    });
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return {
      title: "Course Not Found | DIDM",
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://www.didm.in/programs/${course.slug}`;

  return {
    title: `${course.name} | Delhi Institute of Digital Marketing (DIDM)`,
    description: course.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${course.name} | DIDM`,
      description: course.summary,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const allCourses = getAllCourses();
  const allCentres = getAllCentres();
  const relatedCourses = allCourses.filter((c) => c.id !== course.id).slice(0, 3);
  const courseMedia = COURSE_DETAIL_MEDIA[course.slug];

  // Schema.org Course JSON-LD
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.summary,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_BRAND.fullName,
      sameAs: "https://www.didm.in",
    },
    educationalCredentialAwarded: `${course.shortName} Course Completion Diploma`,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.format.includes("Online") ? ["Online", "Classroom"] : ["Classroom"],
      duration: course.duration,
    },
  };

  const formattedModules = course.syllabus.map((m, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: m.title,
    duration: m.duration || "Structured Lab Hours",
    summary: m.summary,
    topics: m.topics,
    toolsUsed: m.toolsUsed,
    practicalProject: m.practicalProject,
  }));

  // Aggregate tools from syllabus
  const allTools = Array.from(new Set(course.syllabus.flatMap((s) => s.toolsUsed))).slice(0, 16);

  return (
    <div className="creative-page space-y-12 sm:space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* PHASE 2: Compact, Cohesive Course Hero */}
      <CourseHero course={course} courseMedia={courseMedia} />
      <div id="program-explorer"><ProgramSignature course={course}/></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* PHASE 3 & 4: Signature Single-View Learning Studio */}
        <CourseLearningStudio course={course} />

        {/* Practical Pedagogy: The 3 DIDM Learning Pillars */}
        <MotionSection preset="stagger" className="space-y-6">
          <MotionHeading
            eyebrow="Practical Methodology"
            title="How learning is structured at DIDM"
            subtitle="Every course is built on real budgets, agency desk workflows, and verified portfolio output."
            as="h2"
            size="lg"
          />

          <StaggeredCardGrid columns={3} stagger={0.12}>
            <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-xs font-mono uppercase text-brand-red font-bold">Pillar 01</div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Live Ad Budget Execution</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                You run real advertising campaigns on Google Ads and Meta Ads with real ad spend. No hypothetical PowerPoint exercises.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 font-bold">Pillar 02</div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Agency Internship Framework</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Work under senior mentors solving actual client brand problems, building verified portfolio case studies that prove competency.
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-sm">
              <div className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold">Pillar 03</div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">100% Dedicated Placement Support</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Resume optimization, technical mock interviews, and continuous recruitment drives across our 650+ corporate partner network.
              </p>
            </div>
          </StaggeredCardGrid>
        </MotionSection>

        {/* Detailed Curriculum Reference: Dynamic Syllabus Accordion */}
        <MotionSection id="syllabus" preset="editorial" className="space-y-6 sm:space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <MotionHeading
              eyebrow="Full Curriculum Reference"
              title={`Comprehensive Syllabus for ${course.shortName}`}
              subtitle="Explore each module in detail, including learning objectives, tools used, and capstone deliverables."
              as="h2"
              size="lg"
            />

            <Link
              href={`/enquire?p=${course.id}`}
              className="btn-red py-2.5 px-4 text-xs font-bold shrink-0 self-start sm:self-auto"
            >
              Download Full Syllabus PDF
            </Link>
          </div>

          <SyllabusAccordion modules={formattedModules} />
        </MotionSection>

        {/* Software & Tools Showcase */}
        {allTools.length > 0 && (
          <MotionSection preset="scale" className="p-6 sm:p-8 rounded-3xl bg-neutral-100/70 dark:bg-[#14141C] border border-neutral-200 dark:border-neutral-800 space-y-5">
            <MotionHeading
              eyebrow="Industry Stacks Mastered"
              title={`Software & Platforms Mastered in ${course.shortName}`}
              subtitle="Get hands-on training with 40+ licensed marketing tools used by digital agencies and high-growth startups."
              as="h2"
              size="lg"
            />
            <div className="flex flex-wrap gap-2.5">
              {allTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1E1E28] border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-800 dark:text-neutral-200 shadow-2xs"
                >
                  {tool}
                </span>
              ))}
            </div>
          </MotionSection>
        )}

        {/* Profile Alignment & Target Audience */}
        <MotionSection preset="fadeUp" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-5 shadow-sm">
          <MotionHeading
            eyebrow="Profile Alignment"
            title="Who is this program designed for?"
            as="h2"
            size="lg"
          />

          <StaggeredCardGrid columns={3} stagger={0.08}>
            {course.idealFor.map((item, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200/70 dark:border-neutral-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            ))}
          </StaggeredCardGrid>
        </MotionSection>

        {/* Campus Network Availability */}
        <MotionSection preset="editorial" className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-mono uppercase text-brand-red font-bold">
                Campus Availability
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                Where is {course.shortName} conducted?
              </h2>
            </div>
            <Link
              href="/centres"
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <span>Explore all 14 campus batch timings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {allCentres.map((ctr) => (
              <Link
                key={ctr.id}
                href={`/centres/${ctr.slug}`}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 hover:border-brand-red/50 transition group"
              >
                <div className="text-[10px] font-mono text-neutral-400 uppercase">
                  {ctr.city}
                </div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition truncate mt-0.5">
                  {ctr.name.replace("DIDM ", "")}
                </div>
              </Link>
            ))}
          </div>
        </MotionSection>

        {/* Course-Specific FAQs */}
        {course.faqs.length > 0 && (
          <MotionSection preset="editorial" className="max-w-3xl mx-auto space-y-6 pt-4">
            <MotionHeading
              eyebrow="Admissions & FAQs"
              title={`Frequently Asked Questions About ${course.shortName}`}
              align="center"
              as="h2"
              size="lg"
            />

            <FAQSection faqs={course.faqs} />
          </MotionSection>
        )}

        {/* Related Programs Section */}
        <MotionSection preset="stagger" className="space-y-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <MotionHeading
            eyebrow="Alternative Pathways"
            title="Explore Related Programs"
            as="h2"
            size="lg"
          />

          <StaggeredCardGrid columns={3} stagger={0.1}>
            {relatedCourses.map((rel) => (
              <div
                key={rel.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>{rel.duration.split("(")[0].trim()}</span>
                    <span className="text-brand-red font-bold">{rel.hours}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {rel.tagline}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <Link
                    href={`/programs/${rel.slug}`}
                    className="font-bold text-brand-red hover:underline flex items-center gap-1"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href={`/enquire?p=${rel.id}`}
                    className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium"
                  >
                    Book Demo
                  </Link>
                </div>
              </div>
            ))}
          </StaggeredCardGrid>
        </MotionSection>

        {/* Final Admissions CTA Banner */}
        <MotionSection preset="scale" className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white text-center space-y-4 border border-neutral-800 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to Enroll in {course.shortName}?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Reserve your seat in our upcoming batches across 14 Delhi NCR branches or live online. Connect with senior academic advisors for fee instalment plans.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/enquire?p=${course.id}`}
              className="btn-red py-3 px-6 text-xs sm:text-sm font-bold w-full sm:w-auto shadow-lg shadow-brand-red/30"
            >
              Book 1-on-1 Free Demo Session
            </Link>
            <Link
              href="/compare"
              className="btn-ghost text-white border-neutral-700 hover:border-white py-3 px-5 text-xs sm:text-sm font-semibold w-full sm:w-auto"
            >
              Compare with Other Programs
            </Link>
          </div>
        </MotionSection>
      </div>
    </div>
  );
}
