"use client";

import { EditorialHero } from "@/components/creative/EditorialHero";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Phone, Mail, ChevronDown, CheckCircle2 } from "lucide-react";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { SplitContentReveal } from "@/components/motion/SplitContentReveal";

const CAMPUSES = [
  "Dwarka",
  "Gurgaon",
  "Kalkaji",
  "Noida",
  "Preet Vihar",
  "Rajouri Garden",
  "Satya Niketan",
  "Pitampura",
  "South Ex",
  "Dehradun",
  "Haldwani",
  "Mumbai",
  "Meerut",
  "Jaipur",
  "Varanasi",
  "Online",
];

const OPENINGS = [
  "Branch Manager",
  "Team Leader",
  "Sales Consultant",
  "Admin Support",
  "Digital Marketing Trainers",
];

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    nearcenter: "",
    policy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const loading = false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Career enquiry at DIDM\nName: ${formData.fullname}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nPreferred centre: ${formData.nearcenter}`;
    window.location.href = `mailto:info@didm.in?subject=${encodeURIComponent("DIDM career enquiry")}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("careers-application-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <main className="bg-white min-h-screen text-[#222222]">
      <EditorialHero bannerRatio={3.2844638949671774} eyebrow="WORK WITH DIDM" title="Digital Marketing Careers at DIDM" description="Explore opportunities to contribute to the DIDM team. Find the role that matches your skills and start a conversation." image="/images/didm/careers/career_global_1.jpg" alt="DIDM careers and opportunities" caption="DIDM careers and opportunities" variant="mentors" href="#careers-application-form" action="Explore opportunities" />
      <div id="community-gallery" />
      {/* 1. Top Hero Header */}
      <MotionSection as="section" preset="editorial" className="pt-8 pb-6 md:pt-10 md:pb-8 text-center px-4 bg-white">
        <div className="creative-page max-w-5xl mx-auto space-y-3">
          <MotionHeading
            eyebrow="Join The DIDM Ecosystem"
            title="It's Not Just A Team - It's a Family"
            subtitle="TRANSFORM YOUR WORLD — “Go Digital | Go Global”"
            align="center"
            as="h2"
            size="xl"
          />
        </div>
      </MotionSection>


      {/* 2. Alternating Photo / Crimson Sections */}
      <div className="w-full">
        {/* ROW 1: Cake cutting photo (Left) + Career Opportunities (Right) */}
        <MotionSection preset="split" className="flex flex-col md:flex-row w-full min-h-[460px] lg:min-h-[500px]">
          {/* Photo Left */}
          <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[460px] lg:min-h-[500px] bg-neutral-900 overflow-hidden">
            <Image
              src="/images/didm/careers/career_global_1.jpg"
              alt="DIDM Team Celebration and Cake Cutting"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Crimson Card Right */}
          <div className="w-full md:w-1/2 bg-[#b52828] text-white p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="max-w-xl">
              <span className="text-sm font-semibold tracking-wider uppercase text-white/90 block mb-1">
                DIDM
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold mb-4 font-poppins text-white">
                Career Opportunities
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-white/95 font-normal mb-8">
                Do you feel yourself dragging into your workplace everyday and hate being at some boring office with same 9 to 5 schedule? Do you feel that you were probably born to be some sort of big names at digital marketing industry? Here is a chance to believe in your dreams and to achieve it by applying for the post which suits you the most. DIDM is probably one of the best workplaces where human talents are valued more than anything and everything else. Apply Now !
              </p>

              {/* 12 Years Badge with slight authentic overlap */}
              <div className="inline-flex items-center bg-white rounded shadow-md px-6 py-3.5 md:-ml-8 transition-transform hover:scale-105">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#b52828] mr-2">
                  12
                </span>
                <span className="text-base sm:text-lg font-bold text-[#b52828]">
                  Years of Experienced
                </span>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* ROW 2: WHAT WE ARE LOOKING FOR (Left) + Team outside photo (Right) */}
        <MotionSection preset="split" className="flex flex-col-reverse md:flex-row w-full min-h-[440px] lg:min-h-[480px]">
          {/* Crimson Card Left */}
          <div className="w-full md:w-1/2 bg-[#b52828] text-white p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="max-w-xl md:ml-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold mb-5 font-poppins text-white tracking-wide">
                WHAT WE ARE LOOKING FOR....
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-white/95 uppercase tracking-wide font-medium">
                WE HAVE AN INCREDIBLY HIGH BAR FOR TALENT. WE ARE LOOKING FOR NOTHING SHORT OF AN INCREDIBLY TALENTED, SELF MOTIVATED AND WHO IS PASSIONATE ABOUT THEIR WORK &amp; HELPING US CONTINUE TO BUILD AND FOLLOW DIDM COMMUNITY.
              </p>
            </div>
          </div>

          {/* Photo Right */}
          <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[440px] lg:min-h-[480px] bg-neutral-900 overflow-hidden">
            <Image
              src="/images/didm/careers/looking.jpg"
              alt="DIDM Team Outside Office Building"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </MotionSection>

        {/* ROW 3: Team event photo (Left) + Opening Position (Right) */}
        <MotionSection preset="split" className="flex flex-col md:flex-row w-full min-h-[440px] lg:min-h-[480px]">
          {/* Photo Left */}
          <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[440px] lg:min-h-[480px] bg-neutral-900 overflow-hidden">
            <Image
              src="/images/didm/careers/career_world.jpg"
              alt="DIDM Team at Evening Celebration Event"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Crimson Card Right */}
          <div className="w-full md:w-1/2 bg-[#b52828] text-white p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="max-w-xl">
              <span className="text-sm font-semibold tracking-wider uppercase text-white/90 block mb-1">
                DIDM
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold mb-6 font-poppins text-white">
                Opening Position
              </h2>

              <ul className="space-y-3.5">
                {OPENINGS.map((pos, idx) => (
                  <li key={idx} className="flex items-center text-base sm:text-lg font-medium text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-white mr-3 shrink-0" />
                    <span>{pos}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </MotionSection>

        {/* ROW 4: Fill The Application (Left) + Women Faculty Photo (Right) */}
        <MotionSection
          as="div"
          id="careers-application-form"
          preset="split"
          className="flex flex-col-reverse md:flex-row w-full min-h-[520px] lg:min-h-[560px]"
        >
          {/* Form Left */}
          <div className="w-full md:w-1/2 bg-[#b52828] text-white p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="max-w-xl md:ml-auto w-full">
              <span className="text-sm font-medium tracking-wide text-white/90 block mb-1">
                Apply For Joining DIDM Here
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold mb-6 font-poppins text-white">
                Fill The Application
              </h2>

              {submitted ? (
                <div className="bg-white/10 border border-white/30 rounded-lg p-6 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                  <h3 className="text-xl font-bold text-white">Continue in your email app</h3>
                  <p className="text-sm text-white/90">
                    Send the prepared email to share your career enquiry with DIDM. Opening your email app does not submit an application.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 bg-white text-[#b52828] text-xs font-bold rounded uppercase hover:bg-neutral-100 transition-colors"
                  >
                    Prepare another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="relative">
                    <input aria-label="Full name"
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.fullname}
                      onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                      className="w-full h-12 px-4 pr-11 bg-transparent text-white placeholder-white/80 border border-white/40 rounded focus:outline-none focus:border-white focus:bg-white/5 transition-all text-sm sm:text-base"
                    />
                    <User className="absolute right-3.5 top-3.5 w-5 h-5 text-white/80 pointer-events-none" />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input aria-label="Phone number"
                      type="tel"
                      placeholder="Phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 pr-11 bg-transparent text-white placeholder-white/80 border border-white/40 rounded focus:outline-none focus:border-white focus:bg-white/5 transition-all text-sm sm:text-base"
                    />
                    <Phone className="absolute right-3.5 top-3.5 w-5 h-5 text-white/80 pointer-events-none" />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input aria-label="Email address"
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 pr-11 bg-transparent text-white placeholder-white/80 border border-white/40 rounded focus:outline-none focus:border-white focus:bg-white/5 transition-all text-sm sm:text-base"
                    />
                    <Mail className="absolute right-3.5 top-3.5 w-5 h-5 text-white/80 pointer-events-none" />
                  </div>

                  {/* Choose Center Near You.. */}
                  <div className="relative">
                    <select aria-label="Preferred training centre"
                      required
                      value={formData.nearcenter}
                      onChange={(e) => setFormData({ ...formData, nearcenter: e.target.value })}
                      className="w-full h-12 px-4 pr-11 bg-[#b52828] text-white border border-white/40 rounded focus:outline-none focus:border-white transition-all text-sm sm:text-base appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#b52828] text-white">
                        Choose Center Near You..
                      </option>
                      {CAMPUSES.map((campus) => (
                        <option key={campus} value={campus} className="bg-[#8c1b1b] text-white">
                          {campus}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-3.5 w-5 h-5 text-white/80 pointer-events-none" />
                  </div>

                  {/* Agree Checkbox */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="careers-policy-check"
                      checked={formData.policy}
                      onChange={(e) => setFormData({ ...formData, policy: e.target.checked })}
                      required
                      className="mt-1 h-4 w-4 rounded border-white/40 text-[#b52828] focus:ring-white accent-[#8c1b1b]"
                    />
                    <label htmlFor="careers-policy-check" className="text-xs text-white/90 leading-tight">
                      I agree to the DIDM{" "}
                      <Link href="/terms" className="underline hover:text-white font-medium">
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="underline hover:text-white font-medium">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3.5 px-6 rounded-md bg-[#7c1515] hover:bg-[#631010] active:scale-[0.99] text-white font-semibold text-sm sm:text-base tracking-wide transition-all shadow-md uppercase"
                  >
                    {loading ? "Submitting..." : "Submit Your Request"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Photo Right */}
          <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[520px] lg:min-h-[560px] bg-neutral-900 overflow-hidden">
            <Image
              src="/images/didm/careers/applyform.jpg"
              alt="DIDM Female Faculty and Staff Team"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </MotionSection>
      </div>

      {/* 3. Bottom Clarity Action Bar */}
      <MotionSection as="section" preset="scale" className="py-12 md:py-16 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Titles */}
            <div className="text-center lg:text-left space-y-1">
              <h2 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold text-[#c0392b] font-poppins leading-tight">
                Excited Now......
              </h2>
              <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-black tracking-wide font-poppins">
                GET INSTANT CAREER OPPORTUNITIES....
              </h3>
            </div>

            {/* Right Buttons */}
            <div className="w-full lg:w-auto flex flex-col gap-3 min-w-[320px] sm:min-w-[420px]">
              {/* Top Row: ABOUT US & CURRICULUM */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/about"
                  className="flex items-center justify-center py-3.5 px-6 bg-white text-[#b52828] font-bold text-sm sm:text-base rounded shadow-md border border-neutral-200 hover:bg-[#b52828] hover:text-white hover:shadow-lg hover:scale-[1.02] transition-all tracking-wider text-center"
                >
                  ABOUT US
                </Link>
                <Link
                  href="/programs/master-in-digital-marketing-course"
                  className="flex items-center justify-center py-3.5 px-6 bg-white text-[#b52828] font-bold text-sm sm:text-base rounded shadow-md border border-neutral-200 hover:bg-[#b52828] hover:text-white hover:shadow-lg hover:scale-[1.02] transition-all tracking-wider text-center"
                >
                  CURRICULUM
                </Link>
              </div>

              {/* Bottom Row: APPLY NOW */}
              <button
                onClick={scrollToForm}
                className="w-full flex items-center justify-center py-3.5 px-6 bg-white text-[#b52828] font-bold text-base sm:text-lg rounded shadow-md border border-neutral-200 hover:bg-[#b52828] hover:text-white hover:shadow-lg hover:scale-[1.01] transition-all tracking-wider uppercase"
              >
                APPLY NOW
              </button>
            </div>
          </div>
        </div>
      </MotionSection>
    </main>
  );
}
