import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  Users,
  Award,
  ShieldCheck,
  MapPin,
  Calendar,
  BookOpen,
  Download,
  Phone,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { HeroVisual } from "@/components/HeroVisual";
import { CinematicHero } from "@/components/CinematicHero";
import { InteractiveCourseDiscovery } from "@/components/InteractiveCourseDiscovery";
import { LearningJourneyStory } from "@/components/LearningJourneyStory";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ToolsMarquee } from "@/components/ToolsMarquee";
import { CampusGallery } from "@/components/CampusGallery";
import { CertificationShowcase } from "@/components/CertificationShowcase";
import { PlacementPartnersMarquee } from "@/components/PlacementPartnersMarquee";
import { CareerTabs } from "@/components/CareerTabs";
import { FAQSection } from "@/components/FAQSection";
import { getAllCourses, getAllCentres, SITE_BRAND } from "@/lib/content";
import { SITE_DATA } from "@/data/site-data";
import { COURSE_CARD_MEDIA, DIDM_MEDIA, getVerifiedDidmMedia } from "@/data/didm-media";
import { getHomepage } from "@/lib/mongodb/pages";
import { HomepageStory } from "@/components/HomepageStory";
import { HomepageCentres } from "@/components/HomepageCentres";
import { HomepageEnquiry } from "@/components/HomepageEnquiry";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const courses = getAllCourses();
  const homepage = await getHomepage("published");

  return (
    <div className="relative overflow-hidden">
      {/* Aurora Ambient Hero Glow */}
      <div className="aurora-glow" />

      {/* 1. Cinematic Hero */}
      <CinematicHero
        heroHeading={homepage.content.heroHeading}
        heroMediaId={homepage.content.heroMediaId}
      />

      {/* 2. Three Free Entry Points Bar */}
      <RevealOnScroll direction="up" delayMs={50}>
        <section className="py-8 bg-neutral-100/70 dark:bg-[#131319]/50 border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/enquire"
                className="p-5 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group hover:border-brand-red transition"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-neutral-400">Step 01</div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                      Attend a Free Demo Session
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-red group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/programs/master-in-digital-marketing-course"
                className="p-5 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group hover:border-brand-red transition"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-ai/10 text-ai flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-neutral-400">Step 02</div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                      Download 50-Module Syllabus
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-red group-hover:translate-x-1 transition" />
              </Link>

              <Link
                href="/centres"
                className="p-5 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group hover:border-brand-red transition"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-neutral-400">Step 03</div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                      Locate Your Nearest Campus
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-red group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 3. Interactive Course Discovery & Hands-On Skill Simulators */}
      <InteractiveCourseDiscovery />

      {/* 4. Apple-Style 5-Phase Learning Journey Story */}
      <LearningJourneyStory />

      {/* Institutional Training Portals */}
      <section className="py-12 bg-neutral-50 dark:bg-[#0A0A0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { media: DIDM_MEDIA.collegeTraining, title: "College & university programs", href: "/enquire" },
              { media: DIDM_MEDIA.corporateTraining, title: "Corporate team training", href: "/organisations" },
            ].map(({ media, title, href }) => (
              <Link key={media.id} href={href} className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#131319]">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={media.path} alt={media.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-center justify-between p-5 sm:p-6">
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase text-brand-red">Institutional training</div>
                    <h3 className="mt-1 text-lg font-bold text-neutral-900 dark:text-white">{title}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-brand-red transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomepageStory />

      {/* 5. 40+ Industry Tools & AI Suites */}
      <ToolsMarquee />

      {/* 6. Career Pathways Tabs */}
      <section className="py-16 md:py-24 bg-neutral-100/60 dark:bg-[#131319]/40 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Tailored Career Outcomes
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white mt-1.5 leading-tight">
              Where do you stand? <em>Choose your pathway</em>.
            </h2>
          </div>

          <CareerTabs />
        </div>
      </section>

      {/* 7. Campus Life & Modern Workstation Labs */}
      <CampusGallery />

      <HomepageCentres />

      {/* 8. Global Industry Certifications */}
      <CertificationShowcase />

      {/* 9. 650+ Placement Partners Marquee */}
      <PlacementPartnersMarquee />

      {/* 10. Student Success Stories */}
      <section className="py-20 md:py-28 bg-[#FBFAF7] dark:bg-[#0A0A0E] border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                Real Verified Journeys
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white mt-1.5 leading-tight">
                From complete beginner to <em>agency leader</em>.
              </h2>
            </div>
            <Link
              href="/stories"
              className="link-arrow text-sm font-semibold text-brand-red hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Read all student stories</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_DATA.stories.slice(0, 3).map((story) => (
              <div
                key={story.id}
                className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-brand-red font-bold uppercase">
                      {story.category}
                    </span>
                    <span className="text-neutral-400">{story.center}</span>
                  </div>
                  <blockquote className="text-sm font-medium text-neutral-800 dark:text-neutral-200 italic leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="font-bold text-sm text-neutral-900 dark:text-white">
                    {story.name}
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">
                    {story.role} · <strong className="text-neutral-700 dark:text-neutral-300">{story.company}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Institutional Factsheet */}
      <section className="py-16 bg-white dark:bg-[#131319] border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider mb-2">
            Institutional Factsheet
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mb-6">
            DIDM at a glance.
          </h2>

          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 bg-neutral-50/70 dark:bg-[#1A1A22]/50">
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Founded & Track Record</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">10+ Years of Excellence (Est. 2014)</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Benchmark Course</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">MIDM (500+ Practical Hours)</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Flagship 1-Yr Diploma</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">DMI (6 Growth Phases · Agency Residency)</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Toll-Free Helpline</dt>
                <dd className="font-bold text-brand-red">{SITE_BRAND.phone}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Physical Learning Centres</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">13+ Physical Learning Centres</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Hiring Network</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">650+ Verified Corporate Partners</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Certifications Provided</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">Google, Meta, HubSpot & DIDM Diploma</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-neutral-400 font-mono text-[10px] uppercase">Corporate Accreditations</dt>
                <dd className="font-bold text-neutral-900 dark:text-white">ASSOCHAM, WASME & ISO 9001:2015</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 12. FAQs Section */}
      <section className="py-20 md:py-28 bg-[#FBFAF7] dark:bg-[#0A0A0E] border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Answers to Common Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              Everything you need to know before joining.
            </h2>
          </div>

          <FAQSection faqs={SITE_DATA.faqs} />
        </div>
      </section>

      <HomepageEnquiry />
    </div>
  );
}
