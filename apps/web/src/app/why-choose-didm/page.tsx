"use client";

import { useEnquirySubmission, EnquiryFeedback } from "@/components/creative/EnquirySubmission";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Sparkles,
  Search,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Layers,
  Award,
  BookOpen,
  Laptop,
  GraduationCap,
  Briefcase,
  Users,
  Check,
  Building,
  Star,
} from "lucide-react";
import { SITE_BRAND } from "@/lib/content";
import REASONS_DATA from "@/data/didm-150-reasons.json";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

export default function WhyChooseDIDMPage() {
  const enquiry = useEnquirySubmission();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(50);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    centre: "Dwarka",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filtered reasons
  const filteredReasons = REASONS_DATA.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 9 Training Centres from the source page
  const trainingCentres = [
    {
      id: "dwarka",
      name: "DIDM Dwarka",
      tag: "#didmdwarka",
      address: "E-557, 2nd Floor, Opp, Goyal sons, Near Ramphal Chawk, Dwarka, Sector-7, New Delhi-110077",
      phone: "+91 - 8800 505 151",
      email: "info@didm.in",
      link: "/centres/dwarka",
    },
    {
      id: "gurugram",
      name: "DIDM Gurugram",
      tag: "#didmgurugram",
      address: "M-41, 2nd floor, Old DLF Colony, Sector -14, opp. Krishna Mandir, Gurugram, Haryana 122001",
      phone: "+91 - 8800 505 151",
      email: "info@didm.in",
      link: "/centres/gurgaon",
    },
    {
      id: "kalkaji",
      name: "DIDM Kalkaji",
      tag: "#didmkalkaji",
      address: "B-49A/1, 1st floor Kalkaji Hansraj Sethi Marg, Near Nehru Enclave Metro Station, Block B, Kalkaji, New Delhi 110019",
      phone: "+91 - 8800 505 151",
      email: "info@didm.in",
      link: "/centres/kalkaji",
    },
    {
      id: "meerut",
      name: "DIDM Meerut",
      tag: "#didmmeerut",
      address: "2nd Floor, Dhyan Plaza, Gurdwara Road Crossing, Main Begum Bridge Road, Meerut City, Pin 250002",
      phone: "+91 - 8800 505 151",
      email: "info@didm.in",
      link: "/centres/meerut",
    },
    {
      id: "noida",
      name: "DIDM Noida",
      tag: "#didmnoida",
      address: "Delhi Institute of Digital Marketing C/o News 24, Film City, Sector 16A, Noida, Uttar Pradesh 201301",
      phone: "+91 - 8800 505 151",
      email: "info@didm.in",
      link: "/centres/noida",
    },
    {
      id: "pitampura",
      name: "DIDM Pitampura",
      tag: "#didmpitampura",
      address: "150, 1st Floor, Kapil Vihar, Pitampura, Opp Metro Pillar No-353 & Gulab Sweets, New Delhi - 110034",
      phone: "+91 - 8800 505 151",
      email: "info@didm.in",
      link: "/centres/pitampura",
    },
    {
      id: "preet-vihar",
      name: "DIDM Preet Vihar",
      tag: "#didmpreetvihar",
      address: "2, 3rd Floor, Park End, Vikas Marg, Preet Vihar, New Delhi-110092 (Metro Pillar No 99)",
      phone: "+91 - 8800 505 151",
      email: "info@didm.in",
      link: "/centres/preet-vihar",
    },
    {
      id: "south-campus",
      name: "DIDM South Campus",
      tag: "#didmsouthcampus",
      address: "Plot No 12, 3rd Floor, Satya Niketan, Near Moti Bagh, Opp. Venkateshwar College, New Delhi 110021",
      phone: "+91 - 8800 505 151",
      email: "info@didm.in",
      link: "/centres/satya-niketan",
    },
    {
      id: "mumbai",
      name: "DIDM Mumbai",
      tag: "#didmmumbai",
      address: "C/O Bag Films Pvt Ltd, News 24, Anjani Complex, Pereira Hill Road, Andheri East, Mumbai - 400093",
      phone: "+91 - 8800 505 151",
      email: "info@didm.in",
      link: "/centres/mumbai",
    },
  ];

  return (
    <div className="bg-white text-[#222222] font-sans antialiased">
      {/* 1. TOP BANNER */}
      <section className="w-full bg-[#8b0000] border-b-4 border-[#ffcc00] overflow-hidden">
        <div className="w-full">
          <Image
            src="/images/didm/courses/150_reasons_banner.gif"
            alt="150 Reasons to Join DIDM Banner"
            width={1500}
            height={429}
            priority
            sizes="100vw"
            className="w-full h-auto object-cover object-center"
          />
        </div>
      </section>

      {/* 2. HEADINGS & INTRO */}
      <MotionSection preset="editorial" className="py-8 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-600">
            JOIN OUR <span className="text-[#c0392b]">DIGITAL MARKETING TRAINING INSTITUTE</span> FOR <span className="text-[#c0392b]">DIGITAL MARKETING COURSE</span>
          </h3>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-neutral-900 leading-tight">
            150+ Reasons to Join Digital Marketing Course - <span className="text-[#c0392b]">DIDM</span>
          </h1>
          <div className="w-20 h-1 bg-[#c0392b] mx-auto rounded mt-2 mb-3"></div>
          <p className="text-sm sm:text-base font-bold text-[#c0392b] italic">
            &ldquo;Don&apos;t work for money, Make it work for you&rdquo; Join us !!!
          </p>
        </div>
      </MotionSection>

      {/* 3. MAIN SECTION: 150 REASONS LIST (LEFT) + STICKY LEAD FORM (RIGHT) */}
      <MotionSection preset="fadeUp" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 150 Numbered Reasons (col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Search Bar & Counter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input aria-label="Search 150 reasons (e.g., SEO, Placement, LMS)..."
                    type="text"
                    placeholder="Search 150 reasons (e.g., SEO, Placement, LMS)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#c0392b] bg-white"
                  />
                </div>
                <div className="text-xs font-bold text-neutral-600">
                  Showing {Math.min(visibleCount, filteredReasons.length)} of {filteredReasons.length} Verified Reasons
                </div>
              </div>

              {/* Reasons List */}
              <div className="space-y-4">
                {filteredReasons.slice(0, visibleCount).map((reason) => (
                  <div
                    key={reason.id}
                    className="p-4 sm:p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] transition shadow-sm bg-white space-y-1.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        {reason.id}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">
                          {reason.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed text-justify">
                          {reason.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More / Load More Button */}
              {visibleCount < filteredReasons.length && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setVisibleCount((prev) => Math.min(prev + 50, filteredReasons.length))}
                    className="inline-flex items-center gap-2 bg-[#b52828] hover:bg-[#8b0000] text-white font-bold px-8 py-3 rounded text-xs uppercase tracking-wider shadow transition"
                  >
                    <span>Load More Reasons ({filteredReasons.length - visibleCount} Remaining)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Lead Card & Widgets (col-span-4) */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              {/* Form Card */}
              <div className="bg-white rounded-lg border-2 border-[#c0392b] p-6 shadow-xl space-y-4">
                <div className="text-center border-b border-neutral-200 pb-3">
                  <span className="text-xs font-bold text-[#c0392b] uppercase tracking-wider">
                    Take a Free Class
                  </span>
                  <h3 className="text-xl font-black text-neutral-900 mt-1">
                    Book Free Counselling
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Speak with our master faculty &amp; visit nearest branch
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="py-6 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-neutral-900 text-base">Request received</h4>
                    <p className="text-xs text-neutral-600">
                      Our admissions team will contact you to discuss your enquiry with batch details.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => enquiry.submit(e, { name:leadForm.name, phone:leadForm.phone, email:leadForm.email, centreId:leadForm.centre }, () => setFormSubmitted(true))}
                    className="space-y-3"
                  >
                    <div>
                      <input aria-label="Full name"
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#c0392b]"
                      />
                    </div>
                    <div>
                      <input aria-label="Email address"
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#c0392b]"
                      />
                    </div>
                    <div>
                      <input aria-label="Phone number"
                        type="tel"
                        placeholder="Mobile Number (10 Digits) *"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded focus:outline-none focus:border-[#c0392b]"
                      />
                    </div>
                    <div>
                      <select aria-label="Preferred training centre"
                        value={leadForm.centre}
                        onChange={(e) => setLeadForm({ ...leadForm, centre: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#c0392b]"
                      >
                        <option value="Dwarka">DIDM Dwarka</option>
                        <option value="Gurugram">DIDM Gurugram</option>
                        <option value="Kalkaji">DIDM Kalkaji</option>
                        <option value="Meerut">DIDM Meerut</option>
                        <option value="Noida">DIDM Noida</option>
                        <option value="Pitampura">DIDM Pitampura</option>
                        <option value="Preet Vihar">DIDM Preet Vihar</option>
                        <option value="South Campus">DIDM South Campus</option>
                        <option value="Mumbai">DIDM Mumbai</option>
                        <option value="Online">Online Live Class</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#c0392b] hover:bg-[#a01616] text-white font-bold py-2.5 rounded text-xs uppercase tracking-wider transition shadow"
                    >
                      Book Free Demo Now &gt;&gt;
                    </button>
                  <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
                )}
              </div>

              {/* Call Helpline Card */}
              <div className="bg-neutral-900 text-white rounded-lg p-5 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#c0392b] flex items-center justify-center mx-auto text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-neutral-100">Need Immediate Help?</h4>
                <p className="text-xs text-neutral-400">
                  Speak directly with senior course advisors:
                </p>
                <div className="pt-1">
                  <a
                    href="tel:8800505151"
                    className="inline-block bg-[#ffcc00] text-[#800b0b] font-black px-4 py-2 rounded text-sm hover:bg-yellow-400 transition"
                  >
                    +91 - 88005 05151
                  </a>
                </div>
              </div>

              {/* Master Course Highlight Card */}
              <div className="border border-neutral-200 rounded-lg p-5 space-y-3 bg-neutral-50">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#c0392b] bg-red-100 px-2 py-0.5 rounded">
                  FLAGSHIP PROGRAM
                </span>
                <h4 className="font-bold text-neutral-900 text-sm">
                  Master in Digital Marketing (MIDM)
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  500+ Hours comprehensive learning covering 50+ modules, 2 months practical internship &amp; 100% placement assurance.
                </p>
                <Link
                  href="/programs/master-in-digital-marketing-course"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c0392b] hover:underline"
                >
                  <span>Explore Master Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 4. PERFORMANCE STATS CIRCLES */}
      <MotionSection preset="stagger" className="py-10 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="w-16 h-16 rounded-full border-4 border-[#c0392b] text-[#c0392b] font-black text-lg flex items-center justify-center mx-auto bg-white shadow-sm">
              95%
            </div>
            <h4 className="font-bold text-sm text-neutral-900 pt-2">Practical Training</h4>
            <p className="text-xs text-neutral-500">Live Ad Spends on Google &amp; Meta</p>
          </div>

          <div className="space-y-1">
            <div className="w-16 h-16 rounded-full border-4 border-[#c0392b] text-[#c0392b] font-black text-lg flex items-center justify-center mx-auto bg-white shadow-sm">
              92%
            </div>
            <h4 className="font-bold text-sm text-neutral-900 pt-2">Placement Success</h4>
            <p className="text-xs text-neutral-500">30,000+ Placed Across India</p>
          </div>

          <div className="space-y-1">
            <div className="w-16 h-16 rounded-full border-4 border-[#c0392b] text-[#c0392b] font-black text-lg flex items-center justify-center mx-auto bg-white shadow-sm">
              98%
            </div>
            <h4 className="font-bold text-sm text-neutral-900 pt-2">Learner Satisfaction</h4>
            <p className="text-xs text-neutral-500">4.9/5 Stars on Google Reviews</p>
          </div>

          <div className="space-y-1">
            <div className="w-16 h-16 rounded-full border-4 border-[#c0392b] text-[#c0392b] font-black text-lg flex items-center justify-center mx-auto bg-white shadow-sm">
              100%
            </div>
            <h4 className="font-bold text-sm text-neutral-900 pt-2">Placement Support</h4>
            <p className="text-xs text-neutral-500">450+ Active Hiring Partners</p>
          </div>
        </div>
      </MotionSection>

      {/* 5. 15 CHECKPOINTS CURRICULUM OVERVIEW */}
      <MotionSection preset="depth" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase">
              Curriculum Core <span className="text-[#c0392b]">Checkpoints</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2 mb-2"></div>
            <p className="text-xs sm:text-sm text-neutral-600">
              Key digital marketing disciplines covered across our classroom and live agency sessions
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {[
              "Search Engine Optimization (SEO)",
              "Google Search, Display & Video Ads",
              "Social Media Marketing (SMM & SMO)",
              "Meta Ads Manager & CAPI Tracking",
              "Google Analytics 4 (GA4) & GTM",
              "Content Marketing & Copywriting",
              "E-Commerce & Shopify Growth",
              "Email Marketing & Automation",
              "Affiliate Marketing & Passive Income",
              "Online Reputation Management (ORM)",
              "Graphic Designing with Canva Pro",
              "Google AdSense & Web Monetization",
              "Generative AI & Prompt Engineering",
              "Influencer & Video Marketing",
              "Live Capstone Agency Defense",
            ].map((chk, i) => (
              <div
                key={i}
                className="p-3.5 rounded border border-neutral-200 bg-neutral-50 text-xs text-neutral-800 flex items-center gap-2 hover:border-[#c0392b] transition"
              >
                <Check className="w-4 h-4 text-[#c0392b] shrink-0" />
                <span className="font-medium">{chk}</span>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* 6. HYBRID DIGITAL MARKETING COURSES (4 CARDS) */}
      <MotionSection preset="stagger" className="py-12 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase">
              DIDM - <span className="text-[#c0392b]">Hybrid Digital Marketing Course</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <StaggeredCardGrid columns={4} stagger={0.05}>
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="relative aspect-[16/9] w-full">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/courses/master-course.jpg"
                  alt="Master in Digital Marketing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2 flex-1">
                <h4 className="font-bold text-neutral-900 text-sm">Master in Digital Marketing</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  500+ Hours comprehensive hybrid learning with 2 months live project internship.
                </p>
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                <Link
                  href="/programs/master-in-digital-marketing-course"
                  className="block w-full bg-[#c0392b] hover:bg-[#a01616] text-white text-center font-bold py-2 rounded text-xs uppercase"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="relative aspect-[16/9] w-full">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/courses/advanced-in-digital-marketing-course.jpg"
                  alt="Advanced in Digital Marketing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2 flex-1">
                <h4 className="font-bold text-neutral-900 text-sm">Advanced in Digital Marketing</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Level 2 AIMTP program covering 35+ core modules with practical ad spend experience.
                </p>
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                <Link
                  href="/programs/advanced-digital-marketing-course"
                  className="block w-full bg-neutral-800 hover:bg-neutral-900 text-white text-center font-bold py-2 rounded text-xs uppercase"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="relative aspect-[16/9] w-full">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/courses/professional-certificate-course.jpg"
                  alt="Professional in Digital Marketing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2 flex-1">
                <h4 className="font-bold text-neutral-900 text-sm">Professional in Digital Marketing</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Customized modular program for entrepreneurs, freelancers, and working specialists.
                </p>
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                <Link
                  href="/programs/customized-digital-marketing-course"
                  className="block w-full bg-neutral-800 hover:bg-neutral-900 text-white text-center font-bold py-2 rounded text-xs uppercase"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div className="relative aspect-[16/9] w-full">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/courses/online-digital-marketin-course.jpg"
                  alt="Online in Digital Marketing"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2 flex-1">
                <h4 className="font-bold text-neutral-900 text-sm">Online in Digital Marketing</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Learn anytime, anywhere through two-way interactive live Zoom batches and 24/7 LMS.
                </p>
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                <Link
                  href="/programs/online-digital-marketing-course"
                  className="block w-full bg-neutral-800 hover:bg-neutral-900 text-white text-center font-bold py-2 rounded text-xs uppercase"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 7. DIGITAL MARKETING COURSE COMPARISON (3 CARDS) */}
      <MotionSection preset="editorial" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase">
              Comparison Between <span className="text-[#c0392b]">All Courses</span>
            </h2>
            <div className="w-20 h-1 bg-[#c0392b] mx-auto mt-2 mb-3"></div>
            <p className="text-xs sm:text-sm text-neutral-600">
              Evaluate features, modules, and fees to select the ideal program tailored to your career aspirations in digital marketing.
            </p>
          </div>

          <StaggeredCardGrid columns={3} stagger={0.06}>
            {/* Card 1: Advanced (AIDM) */}
            <div className="bg-white rounded-lg border border-neutral-300 shadow-md flex flex-col justify-between overflow-hidden">
              <div className="bg-neutral-800 text-white text-center py-3">
                <h4 className="font-bold text-base">Advanced In Digital Marketing</h4>
                <p className="text-xs text-neutral-300">Level 2 - AIMTP</p>
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div className="text-center pb-3 border-b border-neutral-200">
                  <div className="text-2xl font-black text-neutral-900">INR 52,250/-*</div>
                  <span className="text-xs text-neutral-500">+ Applicable Taxes</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  <li className="flex items-center gap-2">✔ <strong>35+ Modules</strong> Covered</li>
                  <li className="flex items-center gap-2">✔ <strong>3 Months</strong> Duration</li>
                  <li className="flex items-center gap-2">✔ In-Class + Live Projects</li>
                  <li className="flex items-center gap-2">✔ 15+ Industry Certifications</li>
                  <li className="flex items-center gap-2">✔ Placement Assistance</li>
                  <li className="flex items-center gap-2">✔ LMS Portal Access</li>
                </ul>
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center">
                <Link
                  href="/programs/advanced-digital-marketing-course"
                  className="inline-block w-full bg-neutral-800 hover:bg-neutral-900 text-white font-bold py-2.5 rounded text-xs uppercase"
                >
                  Learn More &gt;&gt;
                </Link>
              </div>
            </div>

            {/* Card 2: Master (MIDM) - Featured */}
            <div className="bg-white rounded-lg border-2 border-[#c0392b] shadow-xl flex flex-col justify-between overflow-hidden relative scale-[1.02]">
              <div className="bg-[#c0392b] text-white text-center py-3.5">
                <span className="bg-[#ffcc00] text-[#800b0b] text-[10px] font-black uppercase px-2 py-0.5 rounded absolute top-2 right-2">
                  MOST POPULAR
                </span>
                <h4 className="font-black text-lg">Master In Digital Marketing</h4>
                <p className="text-xs text-amber-200">Level 3 - MIDM Program</p>
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div className="text-center pb-3 border-b border-neutral-200">
                  <div className="text-3xl font-black text-[#c0392b]">INR 58,410/-*</div>
                  <span className="text-xs text-neutral-500">+ Applicable Taxes</span>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-800">
                  <li className="flex items-center gap-2">✔ <strong>50+ In-Depth Modules</strong></li>
                  <li className="flex items-center gap-2">✔ <strong>500+ Hours</strong> Learning Session</li>
                  <li className="flex items-center gap-2">✔ <strong>2 Months Practical Live Internship</strong></li>
                  <li className="flex items-center gap-2">✔ 30+ Global Certifications</li>
                  <li className="flex items-center gap-2">✔ <strong>100% Placement Guarantee</strong></li>
                  <li className="flex items-center gap-2">✔ Lifetime LMS Access &amp; Toolstack</li>
                  <li className="flex items-center gap-2">✔ Mentorship from Agency Directors</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 border-t border-red-200 text-center">
                <Link
                  href="/programs/master-in-digital-marketing-course"
                  className="inline-block w-full bg-[#c0392b] hover:bg-[#a01616] text-white font-bold py-2.5 rounded text-xs uppercase shadow"
                >
                  Learn More &gt;&gt;
                </Link>
              </div>
            </div>

            {/* Card 3: Customized / Professional */}
            <div className="bg-white rounded-lg border border-neutral-300 shadow-md flex flex-col justify-between overflow-hidden">
              <div className="bg-neutral-800 text-white text-center py-3">
                <h4 className="font-bold text-base">Customized Digital Marketing</h4>
                <p className="text-xs text-neutral-300">Level 1 - Professional Modular</p>
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div className="text-center pb-3 border-b border-neutral-200">
                  <div className="text-2xl font-black text-neutral-900">INR 22,125/-*</div>
                  <span className="text-xs text-neutral-500">+ Applicable Taxes</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  <li className="flex items-center gap-2">✔ <strong>Modular Specialization</strong></li>
                  <li className="flex items-center gap-2">✔ <strong>1.5 to 2 Months</strong> Duration</li>
                  <li className="flex items-center gap-2">✔ Choose SEO, Ads or SMM</li>
                  <li className="flex items-center gap-2">✔ Targeted Practical Training</li>
                  <li className="flex items-center gap-2">✔ Basic Certifications</li>
                  <li className="flex items-center gap-2">✔ Ideal for Freelancers &amp; Owners</li>
                </ul>
              </div>
              <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center">
                <Link
                  href="/programs/customized-digital-marketing-course"
                  className="inline-block w-full bg-neutral-800 hover:bg-neutral-900 text-white font-bold py-2.5 rounded text-xs uppercase"
                >
                  Learn More &gt;&gt;
                </Link>
              </div>
            </div>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 8. FROM WHERE YOU WILL GET BEST DIGITAL MARKETING COURSE? (9 CENTRE CARDS GRID) */}
      <MotionSection preset="stagger" className="py-12 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-4xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900">
              From where you will get best <span className="text-[#c0392b]">Digital Marketing Course?</span>
            </h2>
            <div className="w-20 h-1 bg-[#c0392b] mx-auto mt-2 mb-3"></div>
            <p className="text-xs sm:text-sm text-neutral-700 font-medium">
              Delhi Institute of Digital Marketing - <strong>DIDM</strong> offers best Digital Marketing Course near by your location across Delhi-NCR in Multiple Training Centers
            </p>
            <p className="text-[11px] text-neutral-500 font-mono">
              #digitalmarketingcourse #digitalmarketinginstitute #delhiinstituteofdigitalmarketing #didm
            </p>
          </div>

          <StaggeredCardGrid columns={3} stagger={0.04}>
            {trainingCentres.map((c) => (
              <div
                key={c.id}
                className="bg-white p-6 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="border-b border-neutral-100 pb-2">
                    <h3 className="text-lg font-black text-neutral-900">{c.name}</h3>
                    <span className="text-xs font-mono text-[#c0392b] font-bold">{c.tag}</span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed min-h-[48px]">
                    {c.address}
                  </p>

                  <div className="space-y-1 text-xs text-neutral-700 pt-1">
                    <p>
                      <strong>Helpline No:</strong> {c.phone}
                    </p>
                    <p>
                      <strong>Email ID:</strong> {c.email}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={c.link}
                    className="block w-full bg-[#c0392b] hover:bg-[#a01616] text-white font-bold py-2.5 rounded text-xs text-center uppercase tracking-wider transition shadow"
                  >
                    View More Details
                  </Link>
                </div>
              </div>
            ))}
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 9. TRENDING BLOGS */}
      <MotionSection preset="editorial" className="py-10 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
              Trending <span className="text-[#c0392b]">Blogs</span>
            </h2>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <StaggeredCardGrid columns={3} stagger={0.06}>
            <Link
              href="/news-and-events"
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                Career Guidance
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                Why DIDM is Ranked India&apos;s #1 Practical Digital Marketing Institute
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Discover the 150+ operational differentiators that set DIDM apart, from live ad spend budgets to corporate recruitment alliances.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>

            <Link
              href="/news-and-events"
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                Curriculum
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                Master In Digital Marketing (MIDM) vs Conventional Certification Courses
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                A thorough breakdown of the 500+ hours curriculum structure, onboarding internship, and 30+ global certifications.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>

            <Link
              href="/news-and-events"
              className="group p-5 rounded-lg border border-neutral-200 hover:border-[#c0392b] shadow-sm hover:shadow transition space-y-3"
            >
              <span className="text-[11px] font-bold text-[#c0392b] uppercase tracking-wider">
                Admissions
              </span>
              <h3 className="font-bold text-neutral-900 group-hover:text-[#c0392b] transition text-sm sm:text-base leading-snug">
                Upcoming Weekday &amp; Weekend Batch Schedules Across All 14 Branches
              </h3>
              <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                Check available seats, demo schedules, and fee installment options at your nearest DIDM campus in Delhi NCR.
              </p>
              <div className="text-xs font-bold text-[#c0392b] flex items-center gap-1">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          </StaggeredCardGrid>
        </div>
      </MotionSection>
    </div>
  );
}
