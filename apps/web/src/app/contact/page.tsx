"use client";

import { useEnquirySubmission, EnquiryFeedback } from "@/components/creative/EnquirySubmission";
import { EditorialHero } from "@/components/creative/EditorialHero";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Presentation,
  GraduationCap,
  Lightbulb,
  CheckCircle2,
  Send,
  Loader2,
  Building,
  User,
  ShieldCheck,
  Navigation,
} from "lucide-react";
import CAMPUSES from "@/data/didm-campuses-contact.json";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";
import { SplitContentReveal } from "@/components/motion/SplitContentReveal";

export default function ContactUsPage() {
  const enquiry = useEnquirySubmission();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    center: "Satya Niketan",
    agree: false,
  });
  const isSubmitting = enquiry.pending;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:formData.name, phone:formData.phone, email:formData.email, centreId:formData.center}, () => setIsSubmitted(true));

  return (
    <div className="creative-page min-h-screen bg-[#fafbfc] text-[#222222]">
      {/* 1. TOP BREADCRUMB BAR */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-neutral-500">
            <Link href="/" className="hover:text-[#c0392b] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold text-[#c0392b]">Contact Us</span>
          </nav>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <a
              href="mailto:info@didm.in"
              className="hidden sm:inline-flex items-center gap-1.5 text-neutral-600 hover:text-[#c0392b] transition"
            >
              <Mail className="w-3.5 h-3.5 text-[#c0392b]" />
              <span>info@didm.in</span>
            </a>
            <a
              href="tel:+918800505151"
              className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-[#c0392b] font-bold transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#c0392b]" />
              <span>+91 8800-505-151</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. AUTHENTIC HERO BANNER (Exact Replica of didm.in/contact-us) */}
      <EditorialHero bannerRatio={3.3714285714285714} eyebrow="YOUR NEXT CHAPTER" title="Contact Delhi Institute of Digital Marketing" description="A new career, a skill to build or a course to explore. Speak with the DIDM team and find a learning path that works for you." image="/images/didm/contact/contact_banner.png" alt="DIDM Contact Us" caption="DIDM Contact Us" variant="admissions" href="#contact-enquiry" action="Request a callback" />
      <details className="creative-source-art"><summary>Original DIDM contact artwork</summary>      <MotionSection as="section" preset="editorial" className="bg-white w-full overflow-hidden border-b border-neutral-200">
        <div className="w-full">
          <Image
            src="/images/didm/contact/contact_banner.png"
            alt="DIDM Contact Us - We are here to help you 24/7"
            width={1888}
            height={560}
            priority
            className="w-full h-auto object-cover"
            sizes="100vw"
          />
        </div>
      </MotionSection></details>

      {/* 3. MORE SEGMENT (3 White Cards) */}
      <MotionSection as="section" preset="stagger" className="py-10 sm:py-12 bg-[#f4f5f7] border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionHeading
            title="More Segment"
            align="center"
            as="h2"
            size="lg"
            className="mb-8"
          />

          <StaggeredCardGrid columns={3} stagger={0.1}>
            {/* Card 1: Corporate Training */}
            <Link
              href="/corporate-training-program"
              className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <Presentation className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#c0392b] group-hover:underline">
                Corporate Training
              </h3>
            </Link>

            {/* Card 2: College | University */}
            <Link
              href="/colleges-and-university-session"
              className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#c0392b] group-hover:underline">
                College | University
              </h3>
            </Link>

            {/* Card 3: 150+ Reasons to Choose DIDM */}
            <Link
              href="/why-choose-didm"
              className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition text-center space-y-3 group"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#c0392b] flex items-center justify-center mx-auto group-hover:bg-[#c0392b] group-hover:text-white transition">
                <Lightbulb className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#c0392b] group-hover:underline">
                150+ Reasons to Choose DIDM
              </h3>
            </Link>
          </StaggeredCardGrid>
        </div>
      </MotionSection>

      {/* 4. MAP YOUR CAREER WITH DIDM (Interactive Map & Lead Form) */}
      <MotionSection as="section" preset="depth" className="py-12 sm:py-16 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionHeading
            eyebrow="Interactive Campus Locator"
            title="Map your career with DIDM"
            subtitle="Connect with academic specialists or walk into your nearest centre for direct admission guidance."
            align="center"
            as="h2"
            size="lg"
            className="mb-10"
          />

          <SplitContentReveal
            layout="balanced"
            left={
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm aspect-[4/3] lg:aspect-auto min-h-[380px] lg:h-full relative bg-neutral-100">
                <iframe
                  title="Delhi Institute of Digital Marketing - Satya Niketan Head Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4015178872896!2d77.16497941508162!3d28.587729082435455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d8f9e54e58d%3A0xc9085d1a82de1181!2sDelhi%20Institute%20of%20Digital%20Marketing!5e0!3m2!1sen!2sin!4v1614672356048!5m2!1sen!2sin"
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            }
            right={
              <div className="bg-[#b52828] text-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col justify-between">
                <div className="text-center space-y-1 pb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Book Seat For Free Counselling
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-200">
                    Speak To Our Specialist -{" "}
                    <a href="tel:+918800505151" className="font-bold underline hover:text-white">
                      +91 - 8800505151
                    </a>
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="bg-white/10 rounded-xl p-8 text-center space-y-3 backdrop-blur-sm">
                    <CheckCircle2 className="w-12 h-12 text-green-300 mx-auto" />
                    <h4 className="text-lg font-bold text-white">Request Submitted!</h4>
                    <p className="text-xs text-neutral-200">
                      Our senior counsellor will call you to discuss your enquiry to guide you on batches and admissions.
                    </p>
                  </div>
                ) : (
                  <form id="contact-enquiry" onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                      <input aria-label="Full name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name *"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                      <input aria-label="Phone number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone *"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                      <input aria-label="Email address"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email *"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
                      />
                    </div>

                    <div>
                      <select aria-label="Preferred training centre"
                        value={formData.center}
                        onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <option value="" disabled>Choose Center Near You...</option>
                        {CAMPUSES.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name} Campus
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-start gap-2 pt-1 text-[11px] text-neutral-200">
                      <input
                        type="checkbox"
                        id="agree"
                        required
                        checked={formData.agree}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        className="mt-0.5 rounded text-[#b52828] focus:ring-0"
                      />
                      <label htmlFor="agree">
                        I agree to the DIDM{" "}
                        <Link href="/terms" className="underline hover:text-white">
                          Terms of Use
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline hover:text-white">
                          Privacy Policy
                        </Link>
                        .
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 rounded-md bg-[#821414] hover:bg-[#6c1010] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <span>Submit Your Request</span>
                        )}
                      </button>
                    </div>
                  <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={false} />
</form>
                )}
              </div>
            }
          />
        </div>
      </MotionSection>

      {/* 5. CAMPUS DIRECTORY CARDS (All 14 Campuses Matching Exact Original!) */}
      <MotionSection as="section" preset="stagger" className="py-12 sm:py-16 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionHeading
            eyebrow="Classroom Network"
            title="All 14 Training Centres & Hubs"
            subtitle="Visit your nearest branch for offline classroom demos, counseling, and batch registrations."
            align="center"
            as="h2"
            size="lg"
            className="mb-10"
          />

          <StaggeredCardGrid columns={4} stagger={0.05}>
            {CAMPUSES.map((campus, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-black text-[#c0392b]">
                    {campus.name}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed min-h-[54px]">
                    {campus.address}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-neutral-100 text-xs text-neutral-700">
                    {campus.call && (
                      <p>
                        <strong className="text-neutral-900">Call @</strong>{" "}
                        <a href={`tel:${campus.call.replace(/\s+/g, "")}`} className="hover:text-[#c0392b]">
                          {campus.call}
                        </a>
                      </p>
                    )}
                    <p>
                      <strong className="text-neutral-900">Helpline:</strong>{" "}
                      <a href={`tel:${campus.helpline.replace(/[^0-9+]/g, "")}`} className="hover:text-[#c0392b]">
                        {campus.helpline}
                      </a>
                    </p>
                    <p>
                      <strong className="text-neutral-900">Email:</strong>{" "}
                      <a href={`mailto:${campus.email}`} className="hover:text-[#c0392b]">
                        {campus.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={campus.directionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded bg-[#c0392b] hover:bg-[#a92323] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition text-center shadow-xs"
                  >
                    <span>Get Direction</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </StaggeredCardGrid>
        </div>
      </MotionSection>
    </div>
  );
}
