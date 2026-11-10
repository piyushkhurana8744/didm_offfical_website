"use client";

import Link from "next/link";
import { Building2, TrendingUp, Users, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SITE_BRAND } from "@/lib/content";
import { getRecruiterLogoComponent } from "@/components/BrandIcons";

const HIRING_PARTNERS = [
  { name: "Ogilvy", type: "Global Creative & Media Agency", location: "Gurgaon / Mumbai" },
  { name: "Dentsu Creative", type: "Digital Performance Network", location: "Delhi NCR / Bangalore" },
  { name: "GroupM", type: "Media Investment Giant", location: "Gurgaon" },
  { name: "Amazon", type: "E-Commerce & Advertising", location: "Pan-India" },
  { name: "Zomato", type: "Growth & Retention Marketing", location: "Gurgaon" },
  { name: "Swiggy", type: "Performance & CRM Marketing", location: "Delhi NCR" },
  { name: "Paytm", type: "Fintech User Acquisition", location: "Noida" },
  { name: "MakeMyTrip", type: "Travel Search & Meta PPC", location: "Gurgaon" },
  { name: "Nykaa", type: "D2C Influencer & Ads", location: "Mumbai / Delhi" },
  { name: "PolicyBazaar", type: "High-Intent Search Ads", location: "Gurgaon" },
  { name: "CarDekho", type: "Lead Generation Funnels", location: "Jaipur / Gurgaon" },
  { name: "Lenskart", type: "Omnichannel Retail Ads", location: "Delhi NCR" },
];

export function PlacementPartnersMarquee() {
  return (
    <section className="py-20 md:py-28 bg-[#FBFAF7] dark:bg-[#0A0A0E] border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-bold uppercase">
              <Building2 className="w-3.5 h-3.5" />
              <span>650+ CORPORATE RECRUITERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-tight">
              Where our alumni work. <em>Hiring partners you know</em>.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Our dedicated corporate placement cell coordinates on-campus recruitment drives, portfolio review sessions, and direct interview referrals until you are placed.
            </p>
          </div>

          <Link
            href="/outcomes"
            className="text-xs sm:text-sm font-bold text-brand-red hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View Detailed Placement & Salary Report</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Partners Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {HIRING_PARTNERS.map((partner, idx) => {
            const RecruiterLogo = getRecruiterLogoComponent(partner.name);
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 card-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="h-12 w-full rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center px-4 py-2 mb-3 group-hover:border-brand-red/30 transition-colors">
                    <RecruiterLogo className="h-7 w-auto max-w-[130px] object-contain transition-transform group-hover:scale-105" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-brand-red font-bold">
                    Hiring Partner
                  </span>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5 truncate">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                    {partner.type}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 font-mono flex items-center justify-between">
                  <span>{partner.location}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Active</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Career Trajectory Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-xs font-mono uppercase text-neutral-400 font-bold">
              Entry-Level Executive (0-1 Yrs)
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              ₹3.5L – ₹5.5L CTC
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Roles: SEO Executive, PPC Specialist, Social Media Analyst, Content Strategist.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold">
              Mid-Level Growth Lead (2-4 Yrs)
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-brand-red">
              ₹6.0L – ₹9.5L CTC
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Roles: Performance Marketing Manager, Media Buyer, Analytics Lead, Agency Account Manager.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-xs font-mono uppercase text-neutral-400 font-bold">
              Senior Digital Strategist (5+ Yrs)
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              ₹12.0L – ₹20.0L+ CTC
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Roles: Head of Digital Marketing, VP Growth, Agency Founder, Independent Consultant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

