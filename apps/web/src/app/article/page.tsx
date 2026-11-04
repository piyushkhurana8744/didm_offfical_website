import Link from "next/link";
import { Clock, Calendar, ArrowLeft, Bookmark, Share2, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 2026 Modern Performance Marketing Architecture | DIDM Guide",
  description:
    "Comprehensive technical guide on structuring Meta Conversions API (CAPI), Google Performance Max, and attribution modeling for high-scale e-commerce and lead generation.",
};

export default function ArticlePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The 2026 Modern Performance Marketing Architecture",
    description: "How modern high-growth direct-to-consumer brands structure Meta CAPI, Google PMax, and attribution models to scale profitably.",
    author: {
      "@type": "Person",
      name: "DIDM Performance Marketing Research Wing",
    },
    publisher: {
      "@type": "Organization",
      name: "Delhi Institute of Digital Marketing",
      logo: "https://www.didm.in/logo.png",
    },
    datePublished: "2026-01-15",
  };

  return (
    <div className="py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-brand-red">Knowledge Hub</Link>
          <span>/</span>
          <span className="text-neutral-900 dark:text-white font-semibold">Performance Architecture</span>
        </nav>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-soft dark:bg-brand-red/10 text-brand-red text-xs font-mono font-semibold">
            DEEP ARCHITECTURE GUIDE
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 dark:text-white leading-[1.1]">
            The 2026 Modern Performance Marketing Architecture.
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <span>By DIDM Performance Research Wing</span>
            <span>·</span>
            <span>12 Min Read</span>
            <span>·</span>
            <span>Updated for 2026 Bidding Algorithms</span>
          </div>
        </div>

        {/* Executive Summary Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-100/80 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="text-xs font-mono uppercase text-brand-red font-bold tracking-wider">
            Executive Summary & Key Takeaways
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>Third-party browser cookies are largely obsolete; first-party server-side Conversions API (CAPI) is now mandatory.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>Micro-targeting ad groups have been superseded by broad Advantage+ Shopping and Performance Max with strong audience signals.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>Creative velocity is the new targeting: top brands test 20–30 creative hook variations weekly using automated AI workflows.</span>
            </li>
          </ul>
        </div>

        {/* Article Body Content */}
        <div className="space-y-8 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              1. The Death of Client-Side Tracking
            </h2>
            <p>
              For a decade, digital marketers relied on simple JavaScript tags placed in website headers.
              With iOS privacy updates, ad blockers, and browser tracking prevention, up to 35% of
              conversion events are routinely dropped before reaching ad algorithms.
            </p>
            <p>
              In our classroom labs at DIDM, students configure Google Tag Manager Server-Side containers
              routed through Cloudflare workers. By dispatching purchase and lead events directly from the
              web server to Meta and Google endpoints, conversion match rates routinely exceed 92%.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              2. Advantage+ and Performance Max Creative Frameworks
            </h2>
            <p>
              Modern machine learning algorithms do not need you to micro-segment audiences into 50 different
              interest groups. In fact, doing so restricts the algorithm from finding low-cost conversions.
            </p>
            <p>
              The creative itself has become the targeting mechanism. A video that leads with a specific
              pain point automatically qualifies who watches past the 3-second mark. We teach our students
              the Hook-Story-Offer creative production matrix:
            </p>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-800 dark:text-neutral-200 space-y-1">
              <div>[00:00 - 00:03] Pattern Interrupt Hook (Visual or counter-intuitive claim)</div>
              <div>[00:03 - 00:18] Empathy & Core Friction Demonstration</div>
              <div>[00:18 - 00:30] Proof Mechanism & Irresistible Call-to-Action</div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
              3. Practical Training at DIDM
            </h2>
            <p>
              Reading about performance architecture is useful, but managing live campaigns with real
              money is where true competence is born. That is why every student in our MIDM course is
              allotted active ad campaign budgets to experience bidding volatility firsthand.
            </p>
          </section>
        </div>

        {/* End Article CTA */}
        <div className="p-8 rounded-3xl bg-neutral-900 text-white space-y-4">
          <h3 className="text-xl font-bold text-white">
            Want to master these performance architectures in person?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400">
            Join our next cohort of the Master in Digital Marketing (MIDM) or 1-Year DMI Diploma at any of our 13 centres or online.
          </p>
          <div className="pt-2">
            <Link href="/enquire" className="btn-red text-xs py-3 px-6 font-bold">
              Book a Free 1-on-1 Strategy Demo
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

