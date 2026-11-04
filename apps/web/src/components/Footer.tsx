import Link from "next/link";
import { Phone, Mail, MapPin, Award, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#131319] border-t border-neutral-200 dark:border-neutral-800 pt-16 pb-24 md:pb-16 text-sm text-neutral-600 dark:text-neutral-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Accreditations Badge Row */}
        <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800/80 mb-14 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-brand-red shrink-0" />
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                ASSOCHAM Recognized
              </div>
              <div className="text-xs text-neutral-500">Fair Business Practices Award</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-red shrink-0" />
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                WASME Award Winner
              </div>
              <div className="text-xs text-neutral-500">SME Excellence Award 2021</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-brand-red shrink-0" />
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                ISO 9001:2015
              </div>
              <div className="text-xs text-neutral-500">Quality Management Certified</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-brand-red shrink-0" />
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                International Fame
              </div>
              <div className="text-xs text-neutral-500">Best Digital Institute Award</div>
            </div>
          </div>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white font-extrabold text-base">
                D
              </div>
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white">
                DIDM
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-sm">
              Delhi Institute of Digital Marketing (DIDM) is India’s foremost AI-powered digital
              marketing education network. Over 50,000 students trained across 13 branches with 650+
              verified corporate placement partners.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>Plot 12, 3rd Floor, Satya Niketan, Opp. Sri Venkateswara College, New Delhi 110021</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <a href={`tel:${SITE_DATA.brand.phoneClean}`} className="hover:text-brand-red font-medium">
                  +91 88005 05151 (Toll-Free Counseling)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <a href={`mailto:${SITE_DATA.brand.email}`} className="hover:text-brand-red">
                  info@didm.in
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold tracking-wider">
              Flagship Programs
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/program?p=midm" className="hover:text-brand-red transition">
                  Master in Digital Marketing (MIDM)
                </Link>
              </li>
              <li>
                <Link href="/program?p=dmi" className="hover:text-brand-red transition">
                  Diploma in Digital Marketing & AI (DMI)
                </Link>
              </li>
              <li>
                <Link href="/program?p=advanced" className="hover:text-brand-red transition">
                  Advanced Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/program?p=professional" className="hover:text-brand-red transition">
                  Professional Course for Founders
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-brand-red font-semibold flex items-center gap-1 hover:underline pt-1">
                  View All 7 Courses <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Centres */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold tracking-wider">
              Learning Centres
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/centre/dwarka" className="hover:text-brand-red transition">
                  Dwarka (Ramphal Chowk)
                </Link>
              </li>
              <li>
                <Link href="/centres" className="hover:text-brand-red transition">
                  South Extension (South Delhi)
                </Link>
              </li>
              <li>
                <Link href="/centres" className="hover:text-brand-red transition">
                  Noida (Sector 18)
                </Link>
              </li>
              <li>
                <Link href="/centres" className="hover:text-brand-red transition">
                  Gurgaon (Cyber City / DLF 2)
                </Link>
              </li>
              <li>
                <Link href="/centres" className="hover:text-brand-red transition">
                  Pitampura (NSP Tower)
                </Link>
              </li>
              <li>
                <Link href="/centres" className="hover:text-brand-red transition">
                  Kalkaji & Preet Vihar
                </Link>
              </li>
              <li>
                <Link href="/centres" className="hover:text-brand-red transition">
                  Chandigarh & Dehradun
                </Link>
              </li>
              <li>
                <Link href="/centres" className="text-brand-red font-semibold flex items-center gap-1 hover:underline pt-1">
                  All 13+ Physical Centres <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold tracking-wider">
              Resources & Insights
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/compare" className="hover:text-brand-red transition">
                  Compare Courses
                </Link>
              </li>
              <li>
                <Link href="/outcomes" className="hover:text-brand-red transition">
                  Placement & Salary Reports
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-brand-red transition">
                  Student Success Stories
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-brand-red transition">
                  Free Marketing Hub & AI Guides
                </Link>
              </li>
              <li>
                <Link href="/organisations" className="hover:text-brand-red transition">
                  Corporate & Team Upskilling
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-red transition">
                  About DIDM & Leadership
                </Link>
              </li>
              <li>
                <Link href="/enquire" className="hover:text-brand-red transition">
                  Book Free 1-on-1 Counseling
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Delhi Institute of Digital Marketing (DIDM). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>DPDP Act 2023 Compliant</span>
            <span>·</span>
            <Link href="/about" className="hover:text-brand-red">
              Privacy & Disclaimers
            </Link>
            <span>·</span>
            <span>Mon–Fri 9am–9pm · Sat–Sun 9am–7pm</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
