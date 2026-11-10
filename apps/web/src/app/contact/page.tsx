import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Train,
  MessageCircle,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { getAllCentres, SITE_BRAND } from "@/lib/content";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Us & Campus Helplines | DIDM Official",
  description:
    "Contact Delhi Institute of Digital Marketing (DIDM). Central toll-free helpline +91 88005 05151, head office in Satya Niketan, and phone numbers for all 14 campus branches.",
  alternates: {
    canonical: "https://www.didm.in/contact",
  },
  openGraph: {
    title: "Contact DIDM | Central Helpline & 14 Campus Directory",
    description:
      "Reach DIDM's admissions counselors, visit our Satya Niketan national head office, or connect with any branch in Delhi NCR, Noida, Gurgaon, Dehradun, Meerut, Jaipur, and Mumbai.",
    url: "https://www.didm.in/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const centres = getAllCentres();

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Delhi Institute of Digital Marketing",
    url: "https://www.didm.in/contact",
    mainEntity: {
      "@type": "EducationalOrganization",
      name: SITE_BRAND.fullName,
      telephone: SITE_BRAND.phone,
      email: SITE_BRAND.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_BRAND.headOffice,
        addressCountry: "IN",
      },
    },
  };

  return (
    <div className="py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Contact & Campus Directory</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            CENTRAL ADMISSIONS & CAMPUS DIRECTORY
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Connect with our <em>counseling & academic team</em>.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Have questions about digital marketing courses, cohort schedules, or fee structures? Reach our national admissions desk, speak directly with campus counselors, or walk in for an in-person orientation.
          </p>
        </div>

        {/* 3 Core Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Central Helpline */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-red text-white flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-red font-bold">
                  Toll-Free Admissions Desk
                </span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                  Direct Phone Calling
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Connect directly with a senior counselor for real-time batch timings, syllabus reviews, and seat reservations.
              </p>
              <div className="text-sm font-bold font-mono text-neutral-900 dark:text-white pt-1">
                <a href={`tel:${SITE_BRAND.phoneClean}`} className="hover:text-brand-red transition">
                  {SITE_BRAND.phone}
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 font-mono">
              Mon–Fri 9am–9pm · Sat–Sun 9am–7pm
            </div>
          </div>

          {/* WhatsApp Support */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold">
                  Instant Messaging
                </span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                  Official WhatsApp Desk
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Receive course brochures, PDF syllabi, and upcoming batch schedules directly on your WhatsApp.
              </p>
              <div className="pt-1">
                <a
                  href={SITE_BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 font-mono">
              Typical response time: Under 15 mins
            </div>
          </div>

          {/* National Head Office */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-800 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-brand-red" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">
                  Institutional Headquarters
                </span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                  Satya Niketan HO
                </h3>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {SITE_BRAND.headOffice}
              </p>
              <div className="text-xs text-neutral-500 pt-1 space-y-0.5">
                <div>Email: <a href={`mailto:${SITE_BRAND.email}`} className="text-brand-red hover:underline">{SITE_BRAND.email}</a></div>
                <div>Metro: Durgabai Deshmukh South Campus (Pink Line)</div>
              </div>
            </div>
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
              <Link href="/centres/satya-niketan" className="text-brand-red font-semibold hover:underline">
                View Campus Details →
              </Link>
            </div>
          </div>
        </div>

        {/* 2-Column: Form & Campus Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Embedded Enquiry & Counseling Form */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-brand-red font-bold">
                Online Message & Demo Reservation
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mt-1">
                Send an admission enquiry.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Fill out the form below. If database persistence is temporarily constrained, direct phone and WhatsApp routing options will be provided immediately.
              </p>
            </div>

            <Suspense fallback={<div className="p-8 text-center text-xs text-neutral-400">Loading enquiry form...</div>}>
              <EnquiryForm />
            </Suspense>
          </div>

          {/* Right Column: 14 Campus Locations Directory */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-brand-red font-bold">
                All 14 Physical Campuses
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mt-1">
                Find your nearest branch.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                All centres feature modern computer labs, fiber internet, and dedicated faculty desks.
              </p>
            </div>

            <div className="space-y-3 max-h-[640px] overflow-y-auto touch-scroll pr-1">
              {centres.map((ctr) => (
                <div
                  key={ctr.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 hover:border-brand-red/40 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-brand-red font-bold">
                        {ctr.city} · {ctr.region}
                      </div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                        <Link href={`/centres/${ctr.slug}`} className="hover:text-brand-red transition">
                          {ctr.name}
                        </Link>
                      </h3>
                    </div>
                    {ctr.isHeadOffice && (
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-brand-red text-white font-bold shrink-0">
                        Head Office
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                    {ctr.address}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-xs">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-brand-red" />
                      <a
                        href={`tel:${(ctr.phones[0] || SITE_BRAND.phone).replace(/[^0-9]/g, "")}`}
                        className="font-mono font-semibold text-neutral-800 dark:text-neutral-200 hover:text-brand-red"
                      >
                        {ctr.phones[0] || SITE_BRAND.phone}
                      </a>
                    </div>

                    <Link
                      href={`/centres/${ctr.slug}`}
                      className="text-brand-red font-semibold hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>Campus Details & Timings</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

