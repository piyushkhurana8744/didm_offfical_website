import Link from "next/link";
import { MapPin, Phone, Mail, Train, Clock, Star, CheckCircle2, ArrowRight, ShieldCheck, Calendar } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIDM Dwarka Centre | Digital Marketing Training in Ramphal Chowk, Sector 7",
  description:
    "Join DIDM Dwarka branch at Ramphal Chowk, Sector 7. Best digital marketing course in Dwarka with live ad campaigns, agency internship, and 100% placement.",
};

export default function DwarkaCentrePage() {
  const dwarka = SITE_DATA.centres.find((c) => c.id === "dwarka")!;

  const centreJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "DIDM Dwarka Centre",
    telephone: "+91-8800505151",
    email: "dwarka@didm.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: dwarka.address,
      addressLocality: "Dwarka, New Delhi",
      postalCode: "110075",
      addressCountry: "IN",
    },
    openingHours: "Mo-Fr 09:00-21:00, Sa-Su 09:00-19:00",
  };

  return (
    <div className="py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(centreJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <Link href="/centres" className="hover:text-brand-red">Centres</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold">Dwarka Branch</span>
        </nav>

        {/* Hero & Address Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
              WEST DELHI PREMIER CAMPUS
            </div>

            <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
              Digital marketing training at <em>DIDM Dwarka</em>.
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
              Located right on Ramphal Chowk Road in Sector 7, DIDM Dwarka is one of our flagship training
              hubs. Equipped with a high-performance computer lab, projection suites, and direct mentorship desks.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/enquire?c=dwarka" className="btn-red py-3 px-6 text-sm font-bold">
                Book a Demo at Dwarka <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${dwarka.phone.replace(/[^0-9]/g, "")}`}
                className="btn-ghost py-3 px-5 text-sm font-semibold flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-red" />
                <span>Call Centre: 88005 05151</span>
              </a>
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="lg:col-span-5 p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="text-xs font-mono uppercase text-brand-red font-bold">
                Location & Schedule
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{dwarka.rating} (820+ Reviews)</span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 dark:text-white block mb-0.5">Physical Address:</strong>
                  {dwarka.address}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Train className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <strong className="text-neutral-900 dark:text-white">Nearest Metro: </strong>
                  {dwarka.metroStation}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <strong className="text-neutral-900 dark:text-white">Operating Hours: </strong>
                  Mon–Fri 9am–9pm · Sat–Sun 9am–7pm
                </div>
              </div>
            </div>

            {/* Upcoming Batches */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800 space-y-2">
              <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-red" />
                <span>Upcoming Batches at Dwarka:</span>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1 pl-6 list-disc">
                <li>Weekday Morning: 10:00 AM – 12:00 PM (Filling Fast)</li>
                <li>Weekday Evening: 4:00 PM – 6:00 PM (Seats Available)</li>
                <li>Weekend Masterclass: Saturday & Sunday 11:00 AM – 3:00 PM</li>
              </ul>
            </div>

            <Link href="/enquire?c=dwarka" className="btn-red w-full text-center py-3 text-xs font-bold block">
              Reserve Seat in Next Dwarka Batch
            </Link>
          </div>
        </div>

        {/* Lab Facilities & Local Mentors */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-100/60 dark:bg-[#131319]/40 border border-neutral-200 dark:border-neutral-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
              Campus Infrastructure
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 dark:text-white">
              Built for immersive practical execution.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="font-bold text-neutral-900 dark:text-white text-base">30+ High-Spec Lab PCs</h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Dedicated workstations equipped with dual screens, high-speed fiber internet, and licensed digital tools.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="font-bold text-neutral-900 dark:text-white text-base">On-Floor Doubt Faculty</h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Stay after class in our open lab to practice campaigns with teaching assistants available all day.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="font-bold text-neutral-900 dark:text-white text-base">Agency Collaboration Desk</h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Work directly with local brand clients in West Delhi on live lead generation and Google Maps optimization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
