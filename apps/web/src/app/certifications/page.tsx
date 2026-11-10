import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Download,
  GraduationCap,
  Layers,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "30+ Globally Recognized Certifications | DIDM",
  description:
    "Earn 30+ globally recognized digital marketing credentials from Google, Meta, HubSpot, SEMrush, and the prestigious DIDM Industry Diploma.",
  alternates: {
    canonical: "https://www.didm.in/didm-certifications",
  },
};

const CERTIFICATION_GROUPS = [
  {
    category: "Google Professional Certifications",
    provider: "Google Skillshop & Google Cloud",
    count: "8 Certifications",
    description: "Industry-standard validations for Google's search, display, video, analytics, and retail ad ecosystem.",
    items: [
      { name: "Google Ads Search Certification", code: "G-SEARCH", verified: true },
      { name: "Google Ads Display Certification", code: "G-DISPLAY", verified: true },
      { name: "Google Ads Video (YouTube) Certification", code: "G-VIDEO", verified: true },
      { name: "Google Ads Measurement Certification", code: "G-MEASURE", verified: true },
      { name: "Google Ads Apps Certification", code: "G-APPS", verified: true },
      { name: "Shopping Ads Certification", code: "G-SHOP", verified: true },
      { name: "Google Analytics 4 (GA4) Certification", code: "GA4-PRO", verified: true },
      { name: "Google Digital Garage Fundamentals", code: "G-GARAGE", verified: true },
    ],
  },
  {
    category: "Meta & Social Media Certifications",
    provider: "Meta Blueprint & LinkedIn",
    count: "6 Certifications",
    description: "Rigorous competency credentials covering paid acquisition, custom audiences, and social analytics.",
    items: [
      { name: "Meta Certified Digital Marketing Associate", code: "META-100-101", verified: true },
      { name: "Meta Certified Community Manager", code: "META-CM", verified: true },
      { name: "Meta Ads Manager & Pixel Architecture", code: "META-ADS", verified: true },
      { name: "LinkedIn Marketing Strategy Certification", code: "LI-STRAT", verified: true },
      { name: "Twitter / X Ads Campaign Certification", code: "X-ADS", verified: true },
      { name: "YouTube Creator & Channel Growth", code: "YT-GROWTH", verified: true },
    ],
  },
  {
    category: "SEO, Inbound & Analytical Toolstacks",
    provider: "HubSpot Academy & SEMrush",
    count: "8 Certifications",
    description: "Inbound methodology, CRM marketing, conversion funnels, and organic competitive intelligence.",
    items: [
      { name: "HubSpot Inbound Marketing Certification", code: "HUBSPOT-INB", verified: true },
      { name: "HubSpot Content Marketing Certification", code: "HUBSPOT-CONT", verified: true },
      { name: "HubSpot Email Marketing Certification", code: "HUBSPOT-EMAIL", verified: true },
      { name: "HubSpot Contextual Marketing", code: "HUBSPOT-CTX", verified: true },
      { name: "SEMrush SEO Fundamentals Certification", code: "SEMRUSH-SEO", verified: true },
      { name: "SEMrush Technical SEO Toolkit Exam", code: "SEMRUSH-TECH", verified: true },
      { name: "SEMrush Competitive Analysis Exam", code: "SEMRUSH-COMP", verified: true },
      { name: "Microsoft Advertising Certified Professional", code: "MACP", verified: true },
    ],
  },
  {
    category: "Institutional Industry Diplomas",
    provider: "Delhi Institute of Digital Marketing (DIDM)",
    count: "4 Credentials",
    description: "Evaluated by senior agency directors at Online Strikers upon live campaign defense.",
    items: [
      { name: "Master in Digital Marketing (MIDM) Diploma", code: "DIDM-MIDM-52", verified: true },
      { name: "Digital Marketing Intelligence (DMI) Dual Diploma", code: "DIDM-DMI", verified: true },
      { name: "Advanced Digital Marketing Specialist (AIDM)", code: "DIDM-AIDM", verified: true },
      { name: "Agency Project Onboarding Certificate", code: "ONLINE-STRIKERS", verified: true },
    ],
  },
];

export default function CertificationsPage() {
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
            <span className="text-neutral-900 dark:text-white font-semibold">Certifications</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>GLOBAL CREDENTIALS · VERIFIED PRACTICAL EXAMS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.1]">
            30+ Globally recognized digital marketing certifications.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            DIDM trainees earn globally valid certifications accepted by top multinational corporations, government organizations, and high-growth digital marketing agencies worldwide.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-2xl font-bold text-brand-red">30+</div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Total Certifications</h3>
            <p className="text-xs text-neutral-500">Google, Meta, HubSpot, SEMrush, Microsoft, and DIDM Diploma.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-2xl font-bold text-neutral-900 dark:text-white">100%</div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Exam Guidance</h3>
            <p className="text-xs text-neutral-500">Dedicated mock drills, question banks, and live exam vouchers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-2xl font-bold text-neutral-900 dark:text-white">ISO 9001</div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Certified Institute</h3>
            <p className="text-xs text-neutral-500">Quality Management System certification in training operations.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-2xl font-bold text-brand-red">ASSOCHAM</div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Apex Body Award</h3>
            <p className="text-xs text-neutral-500">Most Promising Brand in Digital Marketing Education honor.</p>
          </div>
        </div>

        {/* Certifications Groups */}
        <div className="space-y-12">
          {CERTIFICATION_GROUPS.map((group, gIdx) => (
            <div
              key={gIdx}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <span className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
                    {group.provider}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-0.5">
                    {group.category}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">{group.description}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 self-start sm:self-auto">
                  {group.count}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.items.map((cert, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 space-y-2 hover:border-brand-red/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400 font-semibold">{cert.code}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white line-clamp-2">
                      {cert.name}
                    </h3>
                    <div className="text-[11px] font-mono text-brand-red flex items-center gap-1 pt-1">
                      <span>Live Exam Included</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono uppercase text-brand-red-light font-bold">
              Institutional Credential
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Ready to earn industry-validated credentials?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Join the Master in Digital Marketing (MIDM) program to complete hands-on practical exams with dedicated trainer assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/programs/master-in-digital-marketing-course"
              className="btn-red text-xs py-3 px-5 font-bold"
            >
              Explore Master Course
            </Link>
            <Link
              href="/enquire"
              className="btn-ghost text-xs py-3 px-5 font-semibold text-white border-neutral-700 hover:bg-neutral-800"
            >
              Book Demo Class
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

