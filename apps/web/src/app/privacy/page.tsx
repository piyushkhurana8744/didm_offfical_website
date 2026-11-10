import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, Lock, Eye, FileText, Mail, Phone, AlertCircle } from "lucide-react";
import { SITE_BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection | DIDM Official",
  description:
    "Review Delhi Institute of Digital Marketing's data collection, enquiry processing, communication standards, and candidate privacy practices under DPDP Act 2023.",
  alternates: {
    canonical: "https://www.didm.in/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            LEGAL & DATA GOVERNANCE
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Privacy Policy & <em>Data Protection Protocol</em>.
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <span>Entity: Delhi Institute of Digital Marketing (DIDM)</span>
            <span>·</span>
            <span>Effective Date: January 2026</span>
            <span>·</span>
            <span>Framework: Digital Personal Data Protection (DPDP) Act 2023 Compliant</span>
          </div>
        </div>

        {/* Editorial Notice Banner */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Policy Status Notice</span>
          </div>
          <p className="leading-relaxed">
            This document sets out the operational data governance standards currently practiced across DIDM web properties, enquiry forms, and campus admission desks. Final statutory wording remains subject to formal institutional board review and legal counsel ratification.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">01.</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              When you interact with DIDM website features, request a syllabus download, or reserve a counseling demo, we collect only the information necessary to facilitate your academic enquiry:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Contact Information:</strong> Full name, telephone/WhatsApp mobile number, and email address.</li>
              <li><strong>Academic Preferences:</strong> Intended course (MIDM, DMI, Advanced, Professional), preferred campus branch, and batch timing preference (weekday morning, weekday evening, weekend).</li>
              <li><strong>Technical Logs:</strong> Anonymized SHA-256 client IP hash for automated rate-limiting and abuse prevention; standard HTTP referrer information.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">02.</span>
              <span>Purpose & Usage of Collected Data</span>
            </h2>
            <p>
              Candidate information is collected strictly for academic guidance, batch logistics, and verified course communications:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Connecting you with an assigned senior academic advisor to explain curriculum and conduct your demo session.</li>
              <li>Transmitting requested PDF syllabi, fee schedules, and cohort start dates via telephone, SMS, or WhatsApp.</li>
              <li>Coordinating in-person campus visits to your chosen branch (Delhi NCR, Noida, Gurgaon, or Pan-India locations).</li>
              <li>Preventing automated spam submissions through temporary client submission throttling.</li>
            </ul>
            <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800/60 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700">
              DIDM strictly does not sell, rent, trade, or transfer your personal contact details to third-party marketing brokers or unrelated financial institutions.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">03.</span>
              <span>Consent & Communication Channels</span>
            </h2>
            <p>
              By voluntarily submitting an enquiry on our website, you expressly authorize DIDM academic advisors to contact you via telephone call, SMS, or WhatsApp regarding your selected digital marketing program.
            </p>
            <p>
              You have the right to withdraw your consent or request cessation of promotional communication at any time by simply informing your assigned counselor or sending an email to our data desk.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">04.</span>
              <span>Data Retention & Security Storage</span>
            </h2>
            <p>
              Enquiry data is retained only for the duration necessary to conclude your admission evaluation and cohort assignment. Website transmissions utilize Transport Layer Security (TLS 1.3 encryption). Server-side data persistence is governed by strict role-based access control.
            </p>
            <p className="text-xs text-neutral-500">
              [Editorial Notice: Formal statutory retention schedules and automated purging intervals are subject to ongoing DPDP Act 2023 rule notifications and institutional audit.]
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-brand-red font-mono text-base">05.</span>
              <span>Contact for Privacy & Grievances</span>
            </h2>
            <p>
              For questions regarding your personal data, requests for correction, or communication preferences, contact our central institutional desk:
            </p>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2 text-xs sm:text-sm">
              <div><strong>Institutional Entity:</strong> Delhi Institute of Digital Marketing (DIDM)</div>
              <div><strong>Central Office:</strong> {SITE_BRAND.headOffice}</div>
              <div><strong>Email:</strong> <a href={`mailto:${SITE_BRAND.email}`} className="text-brand-red hover:underline">{SITE_BRAND.email}</a></div>
              <div><strong>Telephone Helpline:</strong> <a href={`tel:${SITE_BRAND.phoneClean}`} className="font-mono">{SITE_BRAND.phone}</a></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

