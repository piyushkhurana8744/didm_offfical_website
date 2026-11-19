"use client";
import { enquiryAttribution } from "@/lib/admissions/attribution";

import { EnquiryFeedback } from "@/components/creative/EnquirySubmission";
import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Send, Phone, User, Mail, MapPin, BookOpen, Sparkles, Check } from "lucide-react";
import { MotionSection } from "@/components/motion";

export function OriginalTrainingHighlightsAndForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    centre: "Satya Niketan (South Campus)",
    course: "Master in Digital Marketing (MIDM)",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const centresList = [
    "Satya Niketan (South Campus)",
    "Dwarka (West Delhi)",
    "Noida (Sector 15)",
    "Kalkaji (South Delhi)",
    "Pitampura (North Delhi)",
    "Preet Vihar (East Delhi)",
    "Rajouri Garden (West Delhi)",
    "Gurgaon (Sikanderpur)",
    "Dehradun (Rajpur Road)",
    "Jaipur (Gopalpura)",
    "Meerut",
    "Mumbai (Andheri)",
    "Live Online Interactive Campus",
  ];

  const coursesList = [
    "Master in Digital Marketing (MIDM)",
    "Advanced Digital Marketing (AIDM)",
    "Professional in Digital Marketing",
    "Digital Marketing Intelligence (DMI)",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in your name and phone number.");
      return;
    }
    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          centreId: formData.centre,
          courseId: formData.course,
          consent: true,
          sourceUrl: window.location.href,
          ...enquiryAttribution(window.location.href, "homepage-enquiry"),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Failed to submit request. Please try calling us.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please call our toll free helpline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionSection id="demo-enquiry" preset="split" className="py-14 sm:py-20 bg-neutral-100 dark:bg-[#090A0E] border-b border-neutral-200 dark:border-neutral-800 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Training Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-brand-red bg-brand-red/10 px-3.5 py-1 rounded-full font-heading">
                Comprehensive Highlights
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white font-heading">
                Digital Marketing Course/Training Highlights
              </h2>
              <p className="text-sm font-semibold text-brand-red">
                Master in Digital Marketing Course | Online &amp; Offline Mode
              </p>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              DIDM is prime and recognized as the best digital marketing training institute across Delhi NCR and India. With more than 10 years of consistent academic excellence, we have trained more than 50,000+ candidates who are working as high-impact digital marketing strategists and agency directors.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                "100% Practical In-Person & Hybrid Lab Training",
                "Hands-On Budget for Live Advertising Accounts",
                "Real Corporate Projects & 2-Month Agency Floor",
                "Experienced Industry Mentors from Top MNCs",
                "Placement Drives Across 650+ Recruiter Partners",
                "Lifelong LMS Video Recording & Notes Access",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Official Accreditations Badge Box */}
            <div className="pt-4 flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#14151C] border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="relative w-20 h-14 shrink-0 overflow-hidden rounded-lg">
                <Image sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src="/images/didm/homepage/logo.jpg"
                  alt="ASSOCHAM Most Promising Brand & Justdial 5-Star Reviews"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xs">
                <div className="font-bold text-neutral-900 dark:text-white font-heading">
                  Most Promising Brand &amp; 5-Star Reviews Awarded
                </div>
                <div className="text-neutral-500 text-[11px] mt-0.5">
                  Honored by ASSOCHAM, Justdial, and National Education Conclave for academic excellence.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Take A Free Session Today Form */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#151620] rounded-2xl sm:rounded-3xl border-2 border-brand-red/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase font-heading">
                100% Free Demo
              </div>

              <div className="space-y-2 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-heading">
                  Take a free session today!!
                </h3>
                <p className="text-xs text-neutral-500">
                  Attend an in-person or live online trial class with our master mentors.
                </p>
              </div>

              {status === "success" ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-neutral-900 dark:text-white text-base">Demo Session Requested!</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Our senior counselor from <strong>{formData.centre}</strong> will call you shortly on <strong>{formData.phone}</strong> with batch timings.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setFormData({ name: "", phone: "", email: "", centre: centresList[0], course: coursesList[0] }); }}
                    className="text-xs text-brand-red font-semibold hover:underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {errorMsg && (
                    <div role="alert" className="p-3 text-xs bg-red-50 text-red-600 border border-red-200 rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                      <input aria-label="Full name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                      <input aria-label="Phone number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                      <input aria-label="Email address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
                        Select Campus
                      </label>
                      <select aria-label="Preferred training centre"
                        value={formData.centre}
                        onChange={(e) => setFormData({ ...formData, centre: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                      >
                        {centresList.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
                        Select Program
                      </label>
                      <select aria-label="Program of interest"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                      >
                        {coursesList.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-red py-3 px-4 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-brand-red/30 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
                  >
                    {loading ? (
                      <span>Connecting with Admissions...</span>
                    ) : (
                      <>
                        <span>Submit Free Session Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-center text-neutral-500 pt-1">
                    🔒 Zero spam · No sales pressure · In-person or Live Online
                  </div>
                <EnquiryFeedback error="" pending={false} consent />
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </MotionSection>
  );
}

