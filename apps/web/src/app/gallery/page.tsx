"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  GraduationCap,
  Award,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { DIDM_MEDIA } from "@/data/didm-media";

interface GalleryItem {
  id: string;
  title: string;
  category: "convocation" | "classroom" | "awards" | "campuses";
  date: string;
  location: string;
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-noida-grad",
    title: "Noida Branch Convocation & Certificate Distribution",
    category: "convocation",
    date: "July 2026",
    location: "Noida Sector 62 Campus",
    image: DIDM_MEDIA.noidaCentre.path,
    description: "Graduating batch holding industry diplomas and celebrating 100% placement allocation into agency roles.",
  },
  {
    id: "gal-meerut-cert",
    title: "Meerut Campus Graduation Ceremony",
    category: "convocation",
    date: "June 2026",
    location: "Meerut Regional Branch",
    image: DIDM_MEDIA.meerutCentre.path,
    description: "Students proudly displaying Google, Meta, and DIDM certification badges alongside course mentors.",
  },
  {
    id: "gal-haldwani-open",
    title: "Haldwani Kumaon Campus Batch Launch",
    category: "campuses",
    date: "April 2026",
    location: "Haldwani Campus (Uttarakhand)",
    image: DIDM_MEDIA.haldwaniCentre.path,
    description: "First graduating cohort of digital marketing strategists from the Haldwani campus.",
  },
  {
    id: "gal-corporate-session",
    title: "Executive Corporate Marketing Masterclass",
    category: "classroom",
    date: "May 2026",
    location: "Central Headquarters (Satya Niketan)",
    image: DIDM_MEDIA.corporateTraining.path,
    description: "Hands-on campaign optimization workshop and agency simulation led by project directors.",
  },
  {
    id: "gal-college-seminar",
    title: "University Skill Conclave & Youth Workshop",
    category: "awards",
    date: "March 2026",
    location: "Associated University Auditorium",
    image: DIDM_MEDIA.collegeTraining.path,
    description: "Over 350+ students participating in the 'AI & Modern Performance Marketing' keynote series.",
  },
  {
    id: "gal-midm-lab",
    title: "Live Agency Simulation Lab Session",
    category: "classroom",
    date: "August 2026",
    location: "Dwarka Campus Lab",
    image: DIDM_MEDIA.midmCourse.path,
    description: "Students actively creating and troubleshooting ad creatives in Meta Ads Manager.",
  },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Student Gallery</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            CAMPUS MOMENTS &amp; BATCH CELEBRATIONS
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Capturing <em>graduation smiles</em>, conclaves &amp; campus life.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Real photos from our convocation ceremonies, live agency simulations, university workshops, and campus life across 14 DIDM branches.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`text-xs px-4 py-2 rounded-full font-semibold transition ${
              activeTab === "all"
                ? "bg-brand-red text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            All Memories ({GALLERY_ITEMS.length})
          </button>
          <button
            onClick={() => setActiveTab("convocation")}
            className={`text-xs px-4 py-2 rounded-full font-semibold transition ${
              activeTab === "convocation"
                ? "bg-brand-red text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            Convocations &amp; Graduations
          </button>
          <button
            onClick={() => setActiveTab("classroom")}
            className={`text-xs px-4 py-2 rounded-full font-semibold transition ${
              activeTab === "classroom"
                ? "bg-brand-red text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            Classroom Labs &amp; Sessions
          </button>
          <button
            onClick={() => setActiveTab("awards")}
            className={`text-xs px-4 py-2 rounded-full font-semibold transition ${
              activeTab === "awards"
                ? "bg-brand-red text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            Conclaves &amp; Events
          </button>
          <button
            onClick={() => setActiveTab("campuses")}
            className={`text-xs px-4 py-2 rounded-full font-semibold transition ${
              activeTab === "campuses"
                ? "bg-brand-red text-white"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            Campus Launches
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full">
                  {item.location}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-brand-red font-semibold">
                    {item.date}
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Batch Event</span>
                  </span>
                  <Link href="/stories" className="text-brand-red hover:underline font-semibold">
                    View Stories →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placement Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-100/60 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Want to see detailed placement records and alumni reviews?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Browse video interviews of alumni who transitioned from college freshers to agency performance marketing managers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/stories"
              className="btn-red text-xs sm:text-sm px-6 py-2.5 font-bold flex items-center gap-2"
            >
              <span>Watch Trainee Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/outcomes"
              className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-brand-red transition px-4 py-2.5"
            >
              Placement Records
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

