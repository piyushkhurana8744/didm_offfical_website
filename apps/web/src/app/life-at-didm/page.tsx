import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Sparkles,
  Heart,
  Users,
  Calendar,
  Coffee,
  Trophy,
  ArrowRight,
  Smile,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { DIDM_MEDIA } from "@/data/didm-media";
import { SITE_BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Life at DIDM | Campus Culture, Agency Hackathons & Community",
  description:
    "Discover the vibrant student culture at Delhi Institute of Digital Marketing. From live agency hackathons and ad battles to festive celebrations and alumni network meets.",
  alternates: {
    canonical: "https://www.didm.in/life-at-didm",
  },
  openGraph: {
    title: "Life at DIDM — Where Learning Meets Agency Energy",
    description:
      "Explore the collaborative and energetic student ecosystem across our 14 physical campuses.",
    url: "https://www.didm.in/life-at-didm",
    type: "website",
  },
};

export default function LifeAtDIDMPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
            <Link href="/" className="hover:text-brand-red">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-brand-red">About Us</Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Life at DIDM</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            CAMPUS CULTURE &amp; COMMUNITY
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.08]">
            Not just an institute — an <em>energetic digital ecosystem</em>.
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            At DIDM, education doesn't end when the classroom projector turns off. We believe that true digital marketing fluency emerges when peer collaboration, live competitive ad simulations, cultural festivities, and mentorship come together.
          </p>
        </div>

        {/* 4 Pillars of Campus Life */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Agency Ad Hackathons</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Teams compete over 48 hours to create high-converting ad hooks, creative reels, and lead funnels for real sponsor businesses.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Festive Celebrations</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              From Diwali rangolis and Eid milans to Independence Day celebrations, our campuses bond as one supportive family.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Industry Guest Conclaves</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Top CMOs, media leaders, and agency heads conduct exclusive fireside chats and share insights on industry trends.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Alumni Mentorship Desks</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Graduates now working at Google, Dentsu, GroupM, and Nykaa return to guide existing batches on interview preparation.
            </p>
          </div>
        </div>

        {/* Culture Gallery / Story Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-100/70 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono uppercase text-brand-red font-bold">The DIDM Community</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              A peer network that stays with you for life.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              When you enroll in any DIDM course, you gain instant access to our private Discord/WhatsApp community of 61,500+ digital practitioners across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#181822] border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="text-2xl font-bold text-brand-red font-mono">14+</div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Metro-Connected Campuses</h4>
              <p className="text-xs text-neutral-500">
                Spacious computer labs, high-speed Wi-Fi, and cafeteria zones designed for group project sessions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#181822] border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="text-2xl font-bold text-brand-red font-mono">61,500+</div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Alumni Across the Globe</h4>
              <p className="text-xs text-neutral-500">
                Network with professionals managing media spend across India, UAE, UK, Canada, and Australia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#181822] border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="text-2xl font-bold text-brand-red font-mono">100%</div>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Practical Project Immersion</h4>
              <p className="text-xs text-neutral-500">
                Work alongside fellow students running live budget campaigns through our in-house agency, Online Strikers.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Invite Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white space-y-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono uppercase text-brand-red font-bold">
              Experience the Energy
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Walk into any campus for an informal tour &amp; chat.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              No formal appointments needed. Meet the trainers, check the labs, and talk to current batch students.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/centres"
              className="btn-red text-xs sm:text-sm px-6 py-3 font-bold flex items-center gap-2"
            >
              <span>Locate Nearest Campus</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/gallery"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-semibold transition border border-white/20"
            >
              View Batch Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

