import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Award, CheckCircle2, ShieldCheck, ArrowRight, Clock } from "lucide-react";
import { getAllCourses, getAllCentres, SITE_BRAND } from "@/lib/content";
import { DIDM_MEDIA } from "@/data/didm-media";

export function Footer() {
  const courses = getAllCourses();
  const centres = getAllCentres();

  return (
    <footer className="bg-white dark:bg-[#131319] border-t border-neutral-200 dark:border-neutral-800 pt-16 pb-28 md:pb-16 text-sm text-neutral-600 dark:text-neutral-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Accreditations Badge Row */}
        <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800/80 mb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <Link href="/" className="inline-flex items-center group">
              <Image
                src={DIDM_MEDIA.officialLogo.path}
                alt={DIDM_MEDIA.officialLogo.alt}
                width={DIDM_MEDIA.officialLogo.width}
                height={DIDM_MEDIA.officialLogo.height}
                className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-sm">
              Delhi Institute of Digital Marketing (DIDM) provides classroom and live-online
              digital marketing education, practical learning and career support across its centre network.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>{SITE_BRAND.headOffice}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <a href={`tel:${SITE_BRAND.phoneClean}`} className="hover:text-brand-red font-medium">
                  {SITE_BRAND.phone} (Toll-Free Admissions Desk)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <a href={`mailto:${SITE_BRAND.email}`} className="hover:text-brand-red">
                  {SITE_BRAND.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold tracking-wider">
              Career Programs
            </div>
            <ul className="space-y-2.5 text-xs">
              {courses.slice(0, 5).map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/programs/${course.slug}`}
                    className="hover:text-brand-red transition block"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/programs"
                  className="text-brand-red font-semibold flex items-center gap-1 hover:underline pt-1"
                >
                  View All Programs <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Centres */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-neutral-900 dark:text-white font-bold tracking-wider">
              Campus Locations
            </div>
            <ul className="space-y-2 text-xs">
              {centres.slice(0, 6).map((ctr) => (
                <li key={ctr.id}>
                  <Link
                    href={`/centres/${ctr.slug}`}
                    className="hover:text-brand-red transition block truncate"
                  >
                    {ctr.name.replace("DIDM ", "")} ({ctr.city})
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/centres"
                  className="text-brand-red font-semibold flex items-center gap-1 hover:underline pt-1"
                >
                  All Campus Locations <ArrowRight className="w-3 h-3" />
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
                <Link href="/trainers" className="hover:text-brand-red transition">
                  Faculty & Mentors Directory
                </Link>
              </li>
              <li>
                <Link href="/why-choose-didm" className="hover:text-brand-red transition">
                  Why Choose DIDM (150+ Reasons)
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-red transition">
                  Student Convocation Gallery
                </Link>
              </li>
              <li>
                <Link href="/life-at-didm" className="hover:text-brand-red transition">
                  Life at DIDM & Campus Culture
                </Link>
              </li>
              <li>
                <Link href="/news-and-events" className="hover:text-brand-red transition">
                  News & Conclave Highlights
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-brand-red transition">
                  Student FAQs & Policies
                </Link>
              </li>
              <li>
                <Link href="/upcoming-batches" className="hover:text-brand-red transition">
                  Upcoming Batches
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-brand-red transition">
                  30+ Global Certifications
                </Link>
              </li>
              <li>
                <Link href="/media-coverage" className="hover:text-brand-red transition">
                  Media Coverage &amp; Awards
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="hover:text-brand-red transition">
                  Franchise Partnerships
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-brand-red transition">
                  Careers @ DIDM
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-red transition">
                  Contact & Campus Directory
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
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} Delhi Institute of Digital Marketing (DIDM). All rights reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <span>DPDP Act 2023 Compliant</span>
            <span>·</span>
            <Link href="/privacy" className="hover:text-brand-red">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-brand-red">
              Terms of Admission
            </Link>
            <span>·</span>
            <Link href="/refund" className="hover:text-brand-red">
              Refund & Fee Policy
            </Link>
            <span>·</span>
            <span>{SITE_BRAND.hours}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
