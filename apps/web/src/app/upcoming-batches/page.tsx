import Link from "next/link";
import { Suspense } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { getAllCourses, getAllCentres, SITE_BRAND } from "@/lib/content";
import { EnquiryForm } from "@/components/EnquiryForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Batches & Schedule | DIDM",
  description:
    "Check live upcoming batch dates, timings, and campus availability for Master, Advanced, and Online Digital Marketing programs across Delhi NCR and India.",
  alternates: {
    canonical: "https://www.didm.in/upcoming-batches",
  },
};

const BATCH_SCHEDULES = [
  {
    id: "batch-midm-weekday-dwarka",
    courseName: "Master in Digital Marketing (MIDM)",
    courseSlug: "master-in-digital-marketing-course",
    badge: "Fast Filling",
    mode: "Classroom (In-Person)",
    centre: "Dwarka Campus",
    centreSlug: "dwarka",
    startDate: "Monday, Next Week",
    timing: "10:00 AM – 01:00 PM",
    days: "Monday to Thursday (Weekday)",
    duration: "3 Months (Fast-Track) + 2 Mos Internship",
    seatsLeft: 4,
  },
  {
    id: "batch-midm-weekend-noida",
    courseName: "Master in Digital Marketing (MIDM)",
    courseSlug: "master-in-digital-marketing-course",
    badge: "Working Professionals",
    mode: "Classroom (In-Person)",
    centre: "Noida Sector 62",
    centreSlug: "noida",
    startDate: "Saturday, This Weekend",
    timing: "10:30 AM – 02:30 PM",
    days: "Saturday & Sunday (Weekend)",
    duration: "6 Months + Live Agency Onboarding",
    seatsLeft: 6,
  },
  {
    id: "batch-dmi-hybrid-gurgaon",
    courseName: "Digital Marketing Intelligence (DMI)",
    courseSlug: "digital-marketing-artificial-intelligence",
    badge: "AI-Specialized",
    mode: "Hybrid (Classroom + Labs)",
    centre: "Gurugram Sector 14 Hub",
    centreSlug: "gurgaon",
    startDate: "Tuesday, Next Week",
    timing: "02:00 PM – 05:00 PM",
    days: "Tuesday & Thursday",
    duration: "4 Months Dual Diploma",
    seatsLeft: 5,
  },
  {
    id: "batch-online-evening",
    courseName: "Online Live Interactive Course",
    courseSlug: "online-digital-marketing-course",
    badge: "Global Batch",
    mode: "Live 2-Way Interactive Zoom",
    centre: "Global Online Campus",
    centreSlug: "online",
    startDate: "Wednesday, Next Week",
    timing: "08:00 PM – 10:00 PM",
    days: "Monday, Wednesday, Friday (Evening)",
    duration: "3.5 Months + 24/7 LMS Library",
    seatsLeft: 8,
  },
  {
    id: "batch-aidm-kalkaji",
    courseName: "Advanced Digital Marketing (AIDM)",
    courseSlug: "advanced-digital-marketing-course",
    badge: "Performance Media",
    mode: "Classroom (In-Person)",
    centre: "Kalkaji South Delhi",
    centreSlug: "kalkaji",
    startDate: "Monday, Next Week",
    timing: "11:00 AM – 02:00 PM",
    days: "Monday to Thursday",
    duration: "2.5 Months",
    seatsLeft: 3,
  },
  {
    id: "batch-midm-satya-niketan",
    courseName: "Master in Digital Marketing (MIDM)",
    courseSlug: "master-in-digital-marketing-course",
    badge: "Central Headquarters",
    mode: "Classroom (In-Person)",
    centre: "Satya Niketan South Campus (HQ)",
    centreSlug: "satya-niketan",
    startDate: "Saturday, Next Weekend",
    timing: "11:00 AM – 03:00 PM",
    days: "Saturday & Sunday",
    duration: "6 Months + Agency Mentorship",
    seatsLeft: 2,
  },
];

export default function UpcomingBatchesPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
            <span>/</span>
            <Link href="/programs" className="hover:text-brand-red transition-colors">Programs</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Upcoming Batches</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>ADMISSIONS OPEN 2026–27 · SMALL BATCH COHORTS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.1]">
            Upcoming batches, schedules &amp; campus seat availability.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            DIDM operates small-cohort classroom and live online batches to ensure 1-on-1 ad campaign mentoring, doubt resolution, and hands-on laboratory terminal access. Select your preferred timing and campus below.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Active Cohort Schedule</h2>
              <p className="text-xs sm:text-sm text-neutral-500">Updated weekly by central admissions desk.</p>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              Showing {BATCH_SCHEDULES.length} Immediate Batches
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BATCH_SCHEDULES.map((batch) => (
              <div
                key={batch.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-brand-red/10 text-brand-red text-[11px] font-mono font-bold">
                      {batch.badge}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <Users className="w-3.5 h-3.5" />
                      {batch.seatsLeft} Seats Left
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white line-clamp-1">
                      {batch.courseName}
                    </h3>
                    <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                      <span>{batch.centre}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                      <span className="font-mono text-[11px]">Start Date:</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{batch.startDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                      <span className="font-mono text-[11px]">Class Timing:</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{batch.timing}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                      <span className="font-mono text-[11px]">Days:</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{batch.days}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-400">
                      <span className="font-mono text-[11px]">Format:</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{batch.mode}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-3">
                  <Link
                    href={`/programs/${batch.courseSlug}`}
                    className="btn-ghost text-xs py-2 px-3 font-semibold flex-1 text-center"
                  >
                    View Syllabus
                  </Link>
                  <Link
                    href={`/enquire?p=${batch.courseSlug}&c=${batch.centreSlug}`}
                    className="btn-red text-xs py-2 px-3 font-bold flex-1 text-center"
                  >
                    Reserve Seat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Batch Assurance Features */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-100/70 dark:bg-[#14141C] border border-neutral-200 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Clock className="w-6 h-6 text-brand-red" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Zero-Fee Backup Batches</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Missed a session? Attend backup classes in upcoming batches at zero extra fee with pre-notice to your coordinator.
            </p>
          </div>
          <div className="space-y-2">
            <Users className="w-6 h-6 text-brand-red" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">1-on-1 Mentor Ad Audits</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Every trainee receives dedicated desk sessions to review Meta ad accounts, Google Ads quality scores, and SEO audits.
            </p>
          </div>
          <div className="space-y-2">
            <BookOpen className="w-6 h-6 text-brand-red" />
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">24/7 LMS Video Library</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Full access to recorded lecture modules, presentation slides, e-notes, and live tool walk-throughs throughout your course.
            </p>
          </div>
        </div>

        {/* Real Enquiry Form Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50 dark:bg-[#15151D] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Admissions Support Desk
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Need custom timings or corporate batch slots?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Speak directly with an academic counsellor to book a trial classroom session or design a flexible learning schedule.
            </p>
          </div>

          <Suspense fallback={<div className="p-8 text-center text-xs text-neutral-400">Loading batch advisory form...</div>}>
            <EnquiryForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

