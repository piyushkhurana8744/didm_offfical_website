"use client";

import { useEnquirySubmission, EnquiryFeedback } from "@/components/creative/EnquirySubmission";
import { EditorialHero } from "@/components/creative/EditorialHero";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Phone, Mail, ChevronDown, CheckCircle2, X } from "lucide-react";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

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

export default function MediaCoveragePage() {
  const enquiry = useEnquirySubmission();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    nearcenter: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const loading = enquiry.pending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => enquiry.submit(e, {name:formData.fullname, phone:formData.phone, email:formData.email, centreId:formData.nearcenter}, () => setSubmitted(true));

  return (
    <main className="creative-page bg-white min-h-screen text-[#222222]">
      {/* 1. Top Banner */}
      <EditorialHero bannerRatio={3.75} eyebrow="RECOGNITION & COVERAGE" title="DIDM Media Coverage & Achievements" description="Explore DIDM’s awards, media coverage and institutional milestones through the original photographs, certificates and published stories." image="/images/didm/media/trending_news_coverage.jpg" alt="DIDM trending news coverage" caption="DIDM trending news coverage" variant="recognition" href="#recognition-stories" action="Explore the recognition" />
      <details className="creative-source-art"><summary>Original DIDM media artwork</summary>      <MotionSection as="section" preset="editorial" className="w-full bg-neutral-900 overflow-hidden">
        <div className="relative w-full h-[180px] sm:h-[260px] md:h-[340px] lg:h-[400px]">
          <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            src="/images/didm/media/trending_news_coverage.jpg"
            alt="DIDM Trending News Coverage Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </MotionSection></details>
      <div id="recognition-stories" />
      {/* 3. Section 1: Noida Education Conclave Award 2026 */}
      <MotionSection as="section" preset="depth" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-8 space-y-2">
          <span className="text-[#c0392b] font-bold text-lg sm:text-xl block tracking-wide">
            Trending News
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2c3e50] font-poppins">
            Noida Education Conclave Award 2026
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-1">
            DIDM has been recognised as the Best Digital Marketing Training Company, with the award presented by Shri Yogendra Upadhyay, Minister for Higher Education, Uttar Pradesh, during the Noida Education Conclave 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Main Card */}
          <div className="lg:col-span-6 bg-white rounded-lg border border-neutral-200 shadow-md p-4 text-center flex flex-col justify-between h-full">
            <div
              className="relative w-full h-[280px] sm:h-[340px] cursor-pointer overflow-hidden rounded group"
              onClick={() => setSelectedImage("/images/didm/media/noida_education_conclave_award_2026..webp")}
            >
              <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src="/images/didm/media/noida_education_conclave_award_2026..webp"
                alt="Noida Education Conclave Award 2026"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="pt-4 pb-2 space-y-1">
              <h3 className="font-bold text-lg sm:text-xl text-black">
                Noida Education Conclave Award
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 italic">
                &ldquo;Award Presented by Shri Yogendra Upadhyay, Minister for Higher Education, Uttar Pradesh&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#b52828]">
                &ldquo;Best Digital Marketing Training Company&rdquo;
              </p>
              <div className="pt-3">
                <Link
                  href="/news-and-events/492"
                  className="inline-block px-5 py-2 bg-[#b52828] hover:bg-[#8c1b1b] text-white text-xs font-bold uppercase rounded shadow transition-colors"
                >
                  More About News &rsaquo;
                </Link>
              </div>
            </div>
          </div>

          {/* Right 4 Grid Photos */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              "/images/didm/media/didm_receives_assocham_award_for_third_time....webp",
              "/images/didm/media/noida_education_conclave_award_2026..._image_3.webp",
              "/images/didm/media/noida_education_conclave_award_2026...._image_5.webp",
              "/images/didm/media/noida_education_conclave_award_2026......webp",
            ].map((src, i) => (
              <div
                key={i}
                className="relative w-full h-[180px] sm:h-[220px] rounded border border-neutral-200 overflow-hidden cursor-pointer shadow group"
                onClick={() => setSelectedImage(src)}
              >
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={src}
                  alt={`Noida Conclave Award photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* 4. Section 2: For the third time, DIDM has won the ASSOCHAM Award! */}
      <MotionSection as="section" preset="depth" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-100">
        <div className="text-center max-w-4xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-black font-poppins">
            For the third time, DIDM has won the{" "}
            <span className="text-[#c0392b]">ASSOCHAM Award!</span>
          </h2>
          <span className="text-[#2c3e50] font-semibold text-base sm:text-lg block">
            9th MSME Excellence Award by ASSOCHAM
          </span>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-1">
            In a significant achievement, DIDM receives the award from ASSOCHAM for the third time in a row! For the first time, DIDM received the Most Promising Brand award, while for the second time, DIDM received the Eminent Fair Business Practices award from ASSOCHAM.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Main Card */}
          <div className="lg:col-span-6 bg-white rounded-lg border border-neutral-200 shadow-md p-4 text-center">
            <div
              className="relative w-full h-[280px] sm:h-[340px] cursor-pointer overflow-hidden rounded group"
              onClick={() => setSelectedImage("/images/didm/media/didm_receives_assocham_award_for_third_time.webp")}
            >
              <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src="/images/didm/media/didm_receives_assocham_award_for_third_time.webp"
                alt="9th MSME Excellence Award by ASSOCHAM"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="pt-4">
              <h3 className="font-bold text-base sm:text-lg text-black uppercase">
                9th MSME EXCELLENCE AWARDS BY ASSOCHAM
              </h3>
            </div>
          </div>

          {/* Right Photos */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              "/images/didm/media/assocham_award_3rd_time.webp",
              "/images/didm/media/didm_has_won_the_assocham_award_.webp",
              "/images/didm/media/didm_has_won_the_assocham_award_for_3rd_time.webp",
            ].map((src, i) => (
              <div
                key={i}
                className="relative w-full h-[180px] sm:h-[220px] rounded border border-neutral-200 overflow-hidden cursor-pointer shadow group"
                onClick={() => setSelectedImage(src)}
              >
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={src}
                  alt={`ASSOCHAM 9th Award photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* 5. Section 3: Fair Business Practices Award by ASSOCHAM */}
      <MotionSection as="section" preset="depth" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-100">
        <div className="text-center max-w-4xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-black font-poppins">
            DIDM receives the eminent{" "}
            <span className="text-[#c0392b]">Fair Business Practices Award</span> by ASSOCHAM
          </h2>
          <span className="text-[#2c3e50] font-semibold text-base sm:text-lg block">
            8th MSME Excellence Awards by ASSOCHAM
          </span>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-1">
            On March 9, 2022, Delhi Institute of Digital Marketing received the &lsquo;Fair Business Practices&rsquo; category award at the 8th MSME Excellence Awards ceremony held at Taj Mahal Hotel, New Delhi, presented by Minister of State, Ministry of MSME, Govt. of India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Main Card */}
          <div className="lg:col-span-6 bg-white rounded-lg border border-neutral-200 shadow-md p-4 text-center">
            <div
              className="relative w-full h-[280px] sm:h-[340px] cursor-pointer overflow-hidden rounded group"
              onClick={() => setSelectedImage("/images/didm/media/msme_award_didm.jpg")}
            >
              <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src="/images/didm/media/msme_award_didm.jpg"
                alt="8th MSME Fair Business Practices Award"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="pt-4">
              <h3 className="font-bold text-base sm:text-lg text-black uppercase">
                8th MSME FAIR BUSINESS PRACTICES BY ASSOCHAM
              </h3>
            </div>
          </div>

          {/* Right Photos */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              "/images/didm/media/msmes_excellence_award_2022_didm.jpg",
              "/images/didm/media/msme_excellence_award.jpg",
              "/images/didm/media/msme_excellence_award___summit_-_didm.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="relative w-full h-[180px] sm:h-[220px] rounded border border-neutral-200 overflow-hidden cursor-pointer shadow group"
                onClick={() => setSelectedImage(src)}
              >
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={src}
                  alt={`MSME Fair Business Practices photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* 6. Section 4: 4 Newspaper Coverage Cards */}
      <MotionSection as="section" preset="stagger" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-100">
        <StaggeredCardGrid columns={4} stagger={0.08}>
          {[
            "/images/didm/media/msme_excellence_award___summit_-_didm.jpeg",
            "/images/didm/media/msme_excellence_award.jpg",
            "/images/didm/media/msme_excellence_award___summit_-_didm.jpg",
            "/images/didm/media/msme_excellence_award___summit_-_didm.jpeg",
          ].map((src, i) => (
            <div
              key={i}
              className="bg-white rounded border border-neutral-200 overflow-hidden shadow cursor-pointer group"
              onClick={() => setSelectedImage(src)}
            >
              <div className="relative w-full h-[220px] sm:h-[280px]">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={src}
                  alt={`Newspaper Coverage ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </StaggeredCardGrid>
      </MotionSection>

      {/* 7. Section 5: International Fame Awards 2021 & WASME Awards */}
      <MotionSection as="section" preset="depth" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-100 space-y-12">
        {/* IFA Awards */}
        <div>
          <div className="text-center max-w-4xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-black font-poppins">
              DIDM receives the{" "}
              <span className="text-[#c0392b]">International Fame Awards 2021</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              DIDM has grabbed the prestigious International Fame Awards 2021 and was adjourned as the Best Digital Marketing Training Company, presented by Sonu Sood. Delhi Institute of Digital Marketing came off as winner by beating India&rsquo;s top digital marketing institutes in the same category.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 bg-white rounded-lg border border-neutral-200 shadow-md p-4 text-center">
              <div
                className="relative w-full h-[280px] sm:h-[340px] cursor-pointer overflow-hidden rounded group"
                onClick={() => setSelectedImage("/images/didm/media/ifa_award_sonu_sood_2021.jpg")}
              >
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/media/ifa_award_sonu_sood_2021.jpg"
                  alt="IFA Award presented by Sonu Sood"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="pt-4">
                <h3 className="font-bold text-base sm:text-lg text-black uppercase">
                  IFA Awards 2021
                </h3>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                "/images/didm/media/ifa_award_2021.jpg",
                "/images/didm/media/ifa_award.jpg",
                "/images/didm/media/ifa_awards.jpg",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative w-full h-[180px] sm:h-[220px] rounded border border-neutral-200 overflow-hidden cursor-pointer shadow group"
                  onClick={() => setSelectedImage(src)}
                >
                  <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src={src}
                    alt={`IFA Award photo ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WASME Awards */}
        <div>
          <div className="text-center max-w-4xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-black font-poppins">
              DIDM receives the{" "}
              <span className="text-[#c0392b]">WASME SME Excellence Awards 2021</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              <strong>World Association for Small and Medium Enterprises (WASME)</strong> has awarded <strong>Delhi Institute of Digital Marketing</strong> with SME Excellence Awards 2021 in the category of Best Digital Marketing Training Company, held at Scope Convention Complex, Lodhi Road, New Delhi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 bg-white rounded-lg border border-neutral-200 shadow-md p-4 text-center">
              <div
                className="relative w-full h-[280px] sm:h-[340px] cursor-pointer overflow-hidden rounded group"
                onClick={() => setSelectedImage("/images/didm/media/didm_wasme_seme_excellence_award_2021.jpg")}
              >
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/media/didm_wasme_seme_excellence_award_2021.jpg"
                  alt="WASME SME Excellence Awards 2021"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="pt-4">
                <h3 className="font-bold text-base sm:text-lg text-black uppercase">
                  WASME SME EXCELLENCE Awards
                </h3>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {[
                "/images/didm/media/wasme_award_2021.jpg",
                "/images/didm/media/wasme_award.jpg",
                "/images/didm/media/wasme_excellence_award_2021.webp",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative w-full h-[180px] sm:h-[220px] rounded border border-neutral-200 overflow-hidden cursor-pointer shadow group"
                  onClick={() => setSelectedImage(src)}
                >
                  <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src={src}
                    alt={`WASME Award photo ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 8. Section 6: Most Promising Brand Award by ASSOCHAM */}
      <MotionSection as="section" preset="depth" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-100">
        <div className="text-center max-w-4xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-black font-poppins">
            DIDM receives the{" "}
            <span className="text-[#c0392b]">Most Promising Brand Award</span> by ASSOCHAM
          </h2>
          <span className="text-[#2c3e50] font-semibold text-base sm:text-lg block">
            6th SMEs Excellence Awards 2018 by ASSOCHAM
          </span>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed pt-1">
            In 2018, <strong className="text-[#b52828]">DIDM</strong> was honored with the prestigious title of &lsquo;Most Promising Digital Marketing Institute&rsquo; by ASSOCHAM. Competing against over 200 digital marketing companies, DIDM stood out for its excellence in education and practical training.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-white rounded-lg border border-neutral-200 shadow-md p-4 text-center">
            <div
              className="relative w-full h-[280px] sm:h-[340px] cursor-pointer overflow-hidden rounded group"
              onClick={() => setSelectedImage("/images/didm/media/didm_receives_most_promising_brand_award.webp")}
            >
              <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src="/images/didm/media/didm_receives_most_promising_brand_award.webp"
                alt="Most Promising Brand Award by ASSOCHAM"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="pt-4">
              <h3 className="font-bold text-base sm:text-lg text-black uppercase">
                6th SMEs Excellence Awards 2018 by ASSOCHAM
              </h3>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              "/images/didm/media/most_promising_brand_award.webp",
              "/images/didm/media/6th_sme_awards_2018.webp",
              "/images/didm/media/didm_wins_sme_excellence_awards_2018.webp",
            ].map((src, i) => (
              <div
                key={i}
                className="relative w-full h-[180px] sm:h-[220px] rounded border border-neutral-200 overflow-hidden cursor-pointer shadow group"
                onClick={() => setSelectedImage(src)}
              >
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={src}
                  alt={`ASSOCHAM 2018 photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* 9. Section 7: Media News Highlights + Lead Form Box */}
      <MotionSection as="section" preset="editorial" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: MEDIA NEWS */}
          <div className="lg:col-span-6 bg-[#fbfbfb] rounded-lg border border-neutral-200 p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="relative w-full h-[60px] mb-4">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/media/media_news.png"
                  alt="Media News"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <ul className="space-y-3 text-sm text-neutral-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#b52828] font-bold">•</span>
                  <span><strong>Business Standard:</strong> Highlights DIDM’s consecutive ASSOCHAM recognitions for ethical training and 100% placement track record.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b52828] font-bold">•</span>
                  <span><strong>The Economic Times:</strong> Changemakers feature celebrating DIDM’s AI-powered modern digital marketing curriculum.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b52828] font-bold">•</span>
                  <span><strong>Dainik Jagran:</strong> Comprehensive report on DIDM’s premier educational conclaves and college masterclasses across Delhi NCR.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#b52828] font-bold">•</span>
                  <span><strong>Zee News:</strong> Recognition of DIDM as Delhi&rsquo;s leading digital marketing training institute.</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <Link
                href="/news-and-events"
                className="inline-block px-6 py-2.5 bg-[#b52828] hover:bg-[#8c1b1b] text-white text-xs font-bold uppercase rounded shadow transition-colors"
              >
                View More Press Releases
              </Link>
            </div>
          </div>

          {/* Right: Crimson Lead Capture Form */}
          <div className="lg:col-span-6 bg-[#7c1515] text-white rounded-lg p-6 sm:p-8 flex flex-col justify-center shadow-lg">
            <div className="text-center mb-6 space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold font-poppins">
                Take a free session today!!
              </h3>
              <p className="text-xs uppercase tracking-widest text-white/80">
                Go Digital | Go Global
              </p>
              <p className="text-sm font-semibold text-white/90">
                Speak To Our Specialist:{" "}
                <a href="tel:+918800505151" className="underline hover:text-white">
                  +91 - 8800505151
                </a>
              </p>
            </div>

            {submitted ? (
              <div className="bg-white/10 border border-white/30 rounded-lg p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-white mx-auto" />
                <h4 className="text-lg font-bold">Request Submitted!</h4>
                <p className="text-xs text-white/90">
                  Our career counsellors will connect with you shortly for your free demo class.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="relative">
                  <input aria-label="Full name"
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    className="w-full h-11 px-4 pr-10 bg-white text-neutral-800 placeholder-neutral-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <User className="absolute right-3 top-3 w-5 h-5 text-neutral-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <input aria-label="Phone number"
                    type="tel"
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-11 px-4 pr-10 bg-white text-neutral-800 placeholder-neutral-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Phone className="absolute right-3 top-3 w-5 h-5 text-neutral-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <input aria-label="Email address"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-4 pr-10 bg-white text-neutral-800 placeholder-neutral-500 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Mail className="absolute right-3 top-3 w-5 h-5 text-neutral-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select aria-label="Preferred training centre"
                    required
                    value={formData.nearcenter}
                    onChange={(e) => setFormData({ ...formData, nearcenter: e.target.value })}
                    className="w-full h-11 px-4 pr-10 bg-white text-neutral-800 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white appearance-none cursor-pointer"
                  >
                    <option value="">Choose Center Near You..</option>
                    {CAMPUSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-neutral-400 pointer-events-none" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#4a0909] hover:bg-[#380606] text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-all"
                >
                  {loading ? "Submitting..." : "Submit Your Request"}
                </button>
              <EnquiryFeedback error={enquiry.error} pending={enquiry.pending} consent={true} />
</form>
            )}
          </div>
        </div>
      </MotionSection>

      {/* 10. Section 8: OTHER AWARDS & RECOGNITIONS */}
      <MotionSection as="section" preset="depth" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-100">
        <div className="text-center max-w-4xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#c0392b] font-poppins uppercase">
            OTHER AWARDS &amp; RECOGNITIONS
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            The Delhi Institute of Digital Marketing (DIDM) has received many awards throughout our journey. Below, we proudly showcase some of the certifications and recognitions that have fueled our drive to lead the digital marketing education industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main ASSOCHAM Certificate */}
          <div className="lg:col-span-6 bg-white rounded-lg border border-neutral-200 shadow-md p-4 text-center">
            <div
              className="relative w-full h-[320px] sm:h-[400px] cursor-pointer overflow-hidden rounded group"
              onClick={() => setSelectedImage("/images/didm/media/didm_assocham_certificate.webp")}
            >
              <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src="/images/didm/media/didm_assocham_certificate.webp"
                alt="Most Promising Digital Marketing Institute of 2018 - ASSOCHAM Certificate"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="pt-4">
              <h3 className="font-bold text-base sm:text-lg text-black">
                &lsquo;Most Promising Digital Marketing Institute of 2018&rsquo; <br />
                <span className="text-[#b52828]">- ASSOCHAM</span>
              </h3>
            </div>
          </div>

          {/* 4 Smaller Certificates & Badges */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              { src: "/images/didm/media/just_dial_award_-_didm.webp", title: "JustDial Top Rated" },
              { src: "/images/didm/media/didm_jims_certificate.webp", title: "JIMS Certificate" },
              { src: "/images/didm/media/franchise_batao_award.webp", title: "Franchise Batao Award" },
              { src: "/images/didm/media/ssb_news.webp", title: "SSB News Recognition" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded border border-neutral-200 overflow-hidden shadow p-3 text-center cursor-pointer group"
                onClick={() => setSelectedImage(item.src)}
              >
                <div className="relative w-full h-[140px] sm:h-[160px] overflow-hidden">
                  <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="pt-2 text-xs font-semibold text-neutral-800">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:-top-10 sm:-right-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full max-h-[85vh]">
              <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src={selectedImage}
                alt="Enlarged media view"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
