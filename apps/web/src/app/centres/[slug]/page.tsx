import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Train,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  MessageCircle,
  Building,
  GraduationCap,
  Users,
  Laptop,
} from "lucide-react";
import { getAllCentres, getCentreBySlug, getAllCourses, SITE_BRAND } from "@/lib/content";
import { getCentreMedia } from "@/data/didm-media";
import { FAQSection } from "@/components/FAQSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const centres = getAllCentres();
  return centres.map((centre) => ({
    slug: centre.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const centre = getCentreBySlug(slug);

  if (!centre) {
    return {
      title: "Centre Not Found | DIDM",
    };
  }

  const title = `${centre.name} | Digital Marketing Course in ${centre.city}`;
  const description = `Explore ${centre.name} at ${centre.landmark || centre.address}. Review course options, available batches and admissions contact details.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.didm.in/centres/${centre.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.didm.in/centres/${centre.slug}`,
    },
  };
}

export default async function CentreDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const centre = getCentreBySlug(slug);

  if (!centre) {
    notFound();
  }

  const allCourses = getAllCourses();
  const allCentres = getAllCentres();
  const otherCentres = allCentres.filter((c) => c.id !== centre.id).slice(0, 4);

  const centreJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: centre.name,
    telephone: centre.phones[0] || SITE_BRAND.phone,
    email: centre.email || SITE_BRAND.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: centre.address,
      addressLocality: centre.city,
      addressRegion: centre.state,
      addressCountry: "IN",
    },
    openingHours: "Mo-Fr 09:00-21:00, Sa-Su 09:00-19:00",
  };

  const primaryPhone = centre.phones[0] || SITE_BRAND.phone;
  const cleanPhone = primaryPhone.replace(/[^0-9]/g, "");
  const centreMedia = getCentreMedia(centre.slug);

  const centreFaqs = [
    {
      q: `Can I visit ${centre.name} before enrolling?`,
      a: `Yes, walk-ins and booked visits are welcome Monday through Sunday during campus operating hours. You can inspect the computer lab, review course materials, and attend a free 1-on-1 counseling and demo session with a senior trainer.`,
    },
    {
      q: `Are weekend batches available at this branch?`,
      a: `Yes, ${centre.name} runs dedicated Saturday and Sunday weekend cohorts specifically scheduled for working professionals and university students, alongside weekday morning and evening batches.`,
    },
    {
      q: `What happens if I miss a lecture at ${centre.city}?`,
      a: `All registered learners have access to recorded backup lectures and can schedule 1-on-1 revision sessions with our faculty or repeat the missed module in another active cohort at the campus.`,
    },
    {
      q: `Is parking or metro access available at this location?`,
      a: centre.metroStation
        ? `Yes, the campus is conveniently located near ${centre.metroStation} for fast, reliable transit, with visitor parking accessible nearby.`
        : `Yes, visitor parking and public transit connections are accessible in the immediate vicinity of the campus premises.`,
    },
  ];

  return (
    <div className="py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(centreJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <Link href="/centres" className="hover:text-brand-red">Centres</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold">{centre.city} · {centre.name.replace("DIDM ", "")}</span>
        </nav>

        {centreMedia && (
          <div className="relative aspect-[15/4] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
            <Image
              src={centreMedia.path}
              alt={centreMedia.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        )}

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-bold uppercase">
                {centre.region} CAMPUS
              </span>
              {centre.isHeadOffice && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold">
                  NATIONAL HEAD OFFICE
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.12]">
              Digital marketing training at <em className="text-brand-red font-semibold">{centre.name}</em>.
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
              Located at {centre.landmark ? `${centre.landmark}, ` : ""}{centre.address}, this branch is fully equipped with dedicated computer workstations, high-speed fiber internet, and master digital marketing instructors ready to mentor you.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold text-base">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{centre.rating}</span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  {centre.reviewsCount} verified reviews
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800">
                <div className="text-base font-bold text-neutral-900 dark:text-white">
                  650+
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Placement Partners
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 col-span-2 sm:col-span-1">
                <div className="text-base font-bold text-brand-red">
                  100% Practical
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Live Ad Budgets
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/enquire?c=${centre.id}`}
                className="btn-red text-xs sm:text-sm py-3 px-6 font-bold shadow-lg shadow-brand-red/20"
              >
                Book 1-on-1 Free Demo Session
              </Link>
              <a
                href={`tel:${cleanPhone}`}
                className="btn-secondary text-xs sm:text-sm py-3 px-5 flex items-center gap-2 font-semibold"
              >
                <Phone className="w-4 h-4 text-brand-red" />
                <span>Call Campus Directly</span>
              </a>
              <a
                href={`https://wa.me/918800505151?text=Hi%20DIDM%2C%20I%20am%20interested%20in%20joining%20the%20${encodeURIComponent(centre.name)}%20branch.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Verified Address & Connectivity Card */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-mono uppercase text-brand-red font-bold">
                Campus Location Card
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Open for In-Person Visits
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                    Address
                  </div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white mt-0.5 leading-snug">
                    {centre.address}
                  </p>
                  {centre.landmark && (
                    <p className="text-xs text-neutral-500 mt-1">
                      Landmark: <span className="font-semibold text-neutral-700 dark:text-neutral-300">{centre.landmark}</span>
                    </p>
                  )}
                  <div className="pt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.name + " " + centre.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-red hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open in Google Maps Directions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {centre.metroStation && (
                <div className="flex items-start gap-3">
                  <Train className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                      Metro Connectivity
                    </div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white mt-0.5">
                      {centre.metroStation}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                    Operating Hours
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-0.5">
                    Monday to Friday: 9:00 AM – 9:00 PM
                  </p>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300">
                    Saturday & Sunday: 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                    Phone Numbers
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {centre.phones.map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                        className="text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-brand-red bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg transition"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Batches Banner */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200/80 dark:border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                <Calendar className="w-4 h-4 text-brand-red" />
                <span>Upcoming Cohorts at this Branch:</span>
              </div>
              <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                {centre.batches.map((batch, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{batch}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Campus Facilities Section */}
        <section className="space-y-6 pt-6">
          <div>
            <div className="text-xs font-mono uppercase text-brand-red font-bold">
              Infrastructure
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mt-1">
              Facilities available at <em>{centre.name}</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {centre.facilities.map((facility, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-red-soft dark:bg-brand-red/10 flex items-center justify-center shrink-0">
                  <Laptop className="w-4 h-4 text-brand-red" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    {facility}
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Included with full access for all enrolled candidates.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Programs Taught at this Centre */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-xs font-mono uppercase text-brand-red font-bold">
                Curriculum
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mt-1">
                Programs conducted at this branch
              </h2>
            </div>
            <Link
              href="/compare"
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <span>Compare all course modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allCourses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between card-hover"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red font-bold">
                      {course.badge || "Career Track"}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {course.name}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {course.tagline}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-500 font-mono">
                    {course.hours}
                  </span>
                  <Link
                    href={`/programs/${course.slug}`}
                    className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other Centres in Network */}
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-xs font-mono uppercase text-brand-red font-bold">
              Alternative Locations
            </div>
            <h2 className="text-xl sm:text-2xl font-normal text-neutral-900 dark:text-white mt-1">
              Explore other DIDM branches
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCentres.map((c) => (
              <Link
                key={c.id}
                href={`/centres/${c.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 hover:border-brand-red/50 transition group"
              >
                <div className="text-[10px] font-mono text-brand-red font-bold uppercase">
                  {c.city} · {c.region}
                </div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-brand-red transition truncate">
                  {c.name.replace("DIDM ", "")}
                </h4>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                  {c.landmark || c.address}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-xs font-mono uppercase text-brand-red font-bold">
              Campus Queries
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 dark:text-white mt-1">
              Frequently asked questions · <em>{centre.name}</em>
            </h2>
          </div>
          <FAQSection faqs={centreFaqs} />
        </section>

        {/* Bottom Booking CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 text-white relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-red font-bold">
              Zero Commitment · 100% Free Trial
            </span>
            <h3 className="text-2xl sm:text-4xl font-normal text-white leading-tight">
              Attend a live classroom demo session at {centre.name}.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Experience the teaching methodology, inspect our practical labs, and consult directly with our senior instructors before taking any admission decision.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/enquire?c=${centre.id}`}
                className="btn-red text-xs sm:text-sm py-3 px-6 font-bold"
              >
                Schedule Free Demo at {centre.city}
              </Link>
              <a
                href={`tel:${cleanPhone}`}
                className="btn-ghost text-xs sm:text-sm py-3 px-5 text-white border-neutral-700 hover:bg-neutral-800"
              >
                Call: {primaryPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

