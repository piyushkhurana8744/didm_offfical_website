import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, AlertCircle, Clock, RefreshCw, Mail, Phone, FileText } from "lucide-react";
import { SITE_BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fee, Cancellation & Refund Policy | DIDM Official",
  description:
    "Official guidelines on admission fee processing, batch transfer options, course cancellation timelines, and student fee regulations at Delhi Institute of Digital Marketing.",
  alternates: {
    canonical: "https://www.didm.in/refund",
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold">Refund &amp; Fee Policy</span>
        </nav>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            FINANCIAL REGULATIONS &amp; ADMISSION GOVERNANCE
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Fee Structure, Batch Transfers &amp; <em>Refund Policy</em>.
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <span>Entity: Delhi Institute of Digital Marketing (DIDM)</span>
            <span>·</span>
            <span>Governing Term: Academic Year 2026–2027</span>
            <span>·</span>
            <span>Applies to: In-Class &amp; Live Virtual Programs</span>
          </div>
        </div>

        {/* Advisory Banner */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Policy Overview Notice</span>
          </div>
          <p className="leading-relaxed">
            This policy outlines the operational guidelines for course seat reservations, fee payment schedules, batch transfer protections, and cancellation requests. Candidates are encouraged to attend a free demo session prior to fee submission.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">01.</span>
              <span>Seat Reservation &amp; Registration Fee</span>
            </h2>
            <p>
              To maintain optimal faculty-to-student ratios (capped at 15–20 trainees per batch), a nominal seat reservation fee is collected to allocate learning terminal workstations, generate personal LMS credentials, and provision practical software licenses.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Seat reservation amounts are adjusted against the total course fee upon batch confirmation.</li>
              <li>Once LMS software credentials and terminal resources are provisioned, registration deposits become non-refundable.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">02.</span>
              <span>Zero-Fee Batch Transfer &amp; Schedule Pause Option</span>
            </h2>
            <p>
              Recognizing that professional commitments and unexpected personal emergencies arise, DIDM offers a comprehensive flexible schedule protection policy in lieu of abrupt forfeiture:
            </p>
            <div className="p-5 rounded-2xl bg-neutral-100/70 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-brand-red" />
                <span>Flexible Adjustment Options Available at Zero Additional Fee:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
                <li>Transfer from Weekday cohorts to Weekend Fast-Track cohorts without transfer penalty.</li>
                <li>Transfer between any of our 14 physical campus branches (e.g., Dwarka to Noida or Satya Niketan).</li>
                <li>Temporarily pause enrollment for up to 6 months and resume in a subsequent fresh batch.</li>
                <li>Switch from classroom mode to live virtual streaming at any stage of training.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">03.</span>
              <span>Course Cancellation &amp; Refund Request Process</span>
            </h2>
            <p>
              Cancellation and refund requests are evaluated on an individual merit basis by the central administrative review board:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li><strong>Prior to Batch Commencement:</strong> Written requests received at least 7 working days before scheduled batch orientation may be eligible for tuition review minus administrative and LMS provisioning costs.</li>
              <li><strong>Post Batch Commencement:</strong> Once formal classes commence and proprietary learning assets have been issued, tuition fees are non-refundable. Trainees remain entitled to our full Zero-Fee Repeat and Lifetime LMS benefits.</li>
              <li><strong>Formal Submission:</strong> All cancellation applications must be submitted in writing to the Center Director and emailed to <code className="text-brand-red font-mono">info@didm.in</code> with student ID and fee receipt copies.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">04.</span>
              <span>Payment Installments &amp; Processing Timelines</span>
            </h2>
            <p>
              For candidates enrolled under approved EMI or multi-tranche fee schedules, subsequent installment obligations must be cleared as per the signed admission agreement. Approved refunds, where determined by institutional review, are processed via bank transfer within 15–21 business days.
            </p>
          </section>
        </div>

        {/* Administration Helpline */}
        <div className="p-8 rounded-3xl bg-neutral-900 text-white space-y-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Have questions regarding fee payments or batch pauses?</h3>
            <p className="text-xs text-neutral-400">
              Speak directly with our central student accounts team for personalized assistance.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="btn-red text-xs px-5 py-2.5 font-bold flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Helpline: 88005 05151</span>
            </a>
            <Link
              href="/contact"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold border border-white/20 transition"
            >
              Contact Branch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

