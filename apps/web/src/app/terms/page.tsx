import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, FileText, AlertCircle, CheckCircle2, Phone } from "lucide-react";
import { SITE_BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms and Conditions of Admission | DIDM Official",
  description:
    "Review Delhi Institute of Digital Marketing (DIDM) terms of admission, attendance requirements, certification rules, student conduct, and fee policies.",
  alternates: {
    canonical: "https://www.didm.in/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold">Terms &amp; Conditions</span>
        </nav>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            ACADEMIC TERMS &amp; INSTITUTIONAL REGULATIONS
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Terms and Conditions of <em>Enrollment &amp; Training</em>.
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <span>Entity: Delhi Institute of Digital Marketing (DIDM)</span>
            <span>·</span>
            <span>Effective Academic Year: 2026–2027</span>
            <span>·</span>
            <span>Applies to: All 14 Campuses &amp; Virtual Cohorts</span>
          </div>
        </div>

        {/* Advisory Banner */}
        <div className="p-6 rounded-2xl bg-neutral-100/70 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
            <FileText className="w-4 h-4 text-brand-red shrink-0" />
            <span>Enrollment Agreement Summary</span>
          </div>
          <p className="leading-relaxed">
            By registering for any diploma, certification, or customized training program at Delhi Institute of Digital Marketing (DIDM), candidates agree to abide by the institutional rules, attendance benchmarks, and academic code of conduct set out below.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-10 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">01.</span>
              <span>Admission &amp; Batch Allocation</span>
            </h2>
            <p>
              Admission to all DIDM certification and diploma programs is granted on a first-come, first-served basis subject to batch seat availability. Trainees may select either weekday morning, weekday evening, or weekend cohorts at their chosen campus branch or virtual classroom.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Batch timing adjustments or transfers between campus locations must be formally requested through the center coordinator.</li>
              <li>DIDM reserves the right to reschedule cohort start dates by reasonable notice if technical or institutional requirements necessitate.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">02.</span>
              <span>Attendance, Missed Sessions &amp; Backup Policy</span>
            </h2>
            <p>
              Practical digital marketing requires consistent participation. Trainees are expected to maintain at least 80% attendance to qualify for placement drives and capstone evaluations.
            </p>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-900 dark:text-emerald-300">
              <strong>Zero-Fee Backup Guarantee:</strong> If a student misses a lecture due to illness or personal emergency, they are eligible to attend free backup classes in parallel or subsequent cohorts upon pre-informing the support team.
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">03.</span>
              <span>Intellectual Property &amp; Study Materials</span>
            </h2>
            <p>
              All course materials, including proprietary e-notes, campaign templates, ad scripts, LMS video recordings, and curriculum presentations, remain the exclusive intellectual property of DIDM.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Materials are provided solely for the registered student's personal educational use.</li>
              <li>Unauthorized distribution, recording, commercial resale, or public sharing of DIDM LMS videos is strictly prohibited.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">04.</span>
              <span>Certifications &amp; Placement Assistance</span>
            </h2>
            <p>
              DIDM provides comprehensive examination preparation for 30+ third-party industry certifications (Google, Meta, HubSpot, SEMrush) and awards the official DIDM ISO 9001:2015 Diploma upon satisfactory completion of assignments and practical agency capstones.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Placement assistance (including resume reviews, interview scheduling, and hiring partner introductions) is provided to all eligible Master and Diploma graduates.</li>
              <li>Employment outcomes depend on student performance, technical proficiency, interview performance, and market conditions; DIDM provides 100% placement assistance rather than an unconditional employment guarantee.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">05.</span>
              <span>Student Conduct &amp; Classroom Governance</span>
            </h2>
            <p>
              Trainees must maintain professional, respectful decorum towards faculty, peers, and staff at all physical campuses and in online communication groups. Harassment, disruptive behavior, or malicious system tampering will result in immediate disciplinary review.
            </p>
          </section>
        </div>

        {/* Contact Footer */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            Questions regarding academic terms? Reach our administration desk.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-brand-red underline">Privacy Policy</Link>
            <Link href="/refund" className="hover:text-brand-red underline">Refund Policy</Link>
            <Link href="/contact" className="hover:text-brand-red underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

