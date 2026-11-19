"use client";

import { useState, useEffect, useId } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ShieldCheck,
  Phone,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  Loader2,
  Calendar,
  Sparkles,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { getAllCourses, getAllCentres, SITE_BRAND } from "@/lib/content";
import { enquiryAttribution } from "@/lib/admissions/attribution";
import Link from "next/link";
import type { EnquiryResponse } from "@/types/backend";

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const formId = useId();
  const [website, setWebsite] = useState("");
  const courses = getAllCourses();
  const centres = getAllCentres();

  const initialProgram = searchParams.get("p") || courses[0]?.id || "midm";
  const initialCentre = searchParams.get("c") || centres[0]?.id || "dwarka";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(initialProgram);
  const [selectedCentre, setSelectedCentre] = useState(initialCentre);
  const [preferredBatch, setPreferredBatch] = useState(searchParams.get("batch")?.slice(0, 120) || "Please advise me");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<EnquiryResponse | null>(null);

  useEffect(() => {
    const p = searchParams.get("p");
    const c = searchParams.get("c");
    if (p) {
      const match = courses.find((crs) => crs.id === p || crs.slug === p);
      if (match) setSelectedProgram(match.id);
    }
    if (c) {
      const match = centres.find((ctr) => ctr.id === c || ctr.slug === c);
      if (match) setSelectedCentre(match.id);
    }
  }, [searchParams, courses, centres]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string; consent?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (!consent) {
      newErrors.consent = "You must agree to receive course information via Call/WhatsApp.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmissionResult(null);
    setIsSubmitting(true);

    const payload = {
      ...enquiryAttribution(window.location.href),
      website,
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim() || undefined,
      courseId: selectedProgram,
      centreId: selectedCentre,
      preferredBatch,
      consent,
      sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
    };

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: EnquiryResponse = await res.json();
      setSubmissionResult(res.ok && data.success && data.enquiryId ? data : { success: false, mode: "direct_assisted", message: data.message || "We could not confirm your request. Please contact admissions.", counselorContact: {phone: SITE_BRAND.phone, whatsappUrl: SITE_BRAND.whatsapp} });
    } catch (err) {
      setSubmissionResult({
        success: false,
        mode: "direct_assisted",
        message: "We could not save your enquiry. Please contact admissions directly.",
        counselorContact: {
          phone: SITE_BRAND.phone,
          whatsappUrl: SITE_BRAND.whatsapp,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCourseObj = courses.find((c) => c.id === selectedProgram) || courses[0];
  const selectedCentreObj = centres.find((c) => c.id === selectedCentre) || centres[0];

  if (submissionResult?.success && submissionResult.enquiryId) {
    const firstName = name.trim().split(" ")[0];

    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-xl text-center space-y-6 animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
            <span>Reference ID: {submissionResult.enquiryId}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white pt-1">
            Enquiry received, {firstName}!
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
            Your preference for <strong className="text-neutral-900 dark:text-white">{selectedCourseObj.name}</strong> at our{" "}
            <strong className="text-neutral-900 dark:text-white">{selectedCentreObj.name}</strong> has been received. Admissions will confirm the session and availability with you.
          </p>
        </div>

        {/* Transparent Lead Status Notice */}
        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-left text-xs space-y-2 max-w-lg mx-auto">
          <div className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
            <span>Admissions Priority Hotline</span>
          </div>
          <p className="text-neutral-500 leading-relaxed">
            To discuss your request or confirm a session, connect directly with our counselling desk:
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <a
              href={`tel:${SITE_BRAND.phoneClean}`}
              className="flex-1 btn-red text-xs py-2.5 px-4 font-bold flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {SITE_BRAND.phone}</span>
            </a>
            <a
              href={submissionResult.counselorContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-secondary text-xs py-2.5 px-4 font-bold flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Counselor</span>
            </a>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmissionResult(null);
            setName("");
            setPhone("");
            setEmail("");
          }}
          className="text-xs font-semibold text-neutral-500 hover:text-brand-red transition"
        >
          ← Book another demo session or inquire for a colleague
        </button>
      </div>
    );
  }

  return (
    <form
      aria-busy={isSubmitting}
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-5"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
          Request Free Counselling & Demo Information
        </h3>
        <p className="text-xs text-neutral-500">
          Share your preferences. Admissions will confirm available sessions and course details.
        </p>
      </div>

      {submissionResult && !submissionResult.success && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"><p className="font-semibold">Your request has not been confirmed.</p><p className="mt-2">{submissionResult.message}</p><div className="mt-3 flex flex-wrap gap-4"><a className="underline" href={`tel:${SITE_BRAND.phoneClean}`}>Call admissions</a><a className="underline" href={SITE_BRAND.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp admissions</a></div><p className="mt-2 text-xs">Your details are still here. You can try submitting again.</p></div>}
      <div className="hidden" aria-hidden="true"><label htmlFor={`${formId}-website`}>Leave this field blank</label><input id={`${formId}-website`} value={website} onChange={e=>setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" /></div>
      {/* Name Input */}
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-name`} className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
          Full Name <span className="text-brand-red">*</span>
        </label>
        <input
          required
          maxLength={120}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          type="text"
          id={`${formId}-name`}
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="e.g. Rahul Sharma"
          className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
        />
        {errors.name && (
          <p id={`${formId}-name-error`} role="alert" className="text-xs text-brand-red flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Phone Number Input */}
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-phone`} className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
          Mobile Number (WhatsApp) <span className="text-brand-red">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-400">
            +91
          </span>
          <input
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            type="tel"
            id={`${formId}-phone`}
            autoComplete="tel-national"
            maxLength={10}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            placeholder="98765 43210"
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
          />
        </div>
        {errors.phone && (
          <p id={`${formId}-phone-error`} role="alert" className="text-xs text-brand-red flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.phone}</span>
          </p>
        )}
      </div>

      {/* Email (Optional) */}
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-email`} className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
          Email Address <span className="text-neutral-400 font-normal">(Optional for syllabus PDF)</span>
        </label>
        <input
          type="email"
          id={`${formId}-email`}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="rahul@gmail.com"
          className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
        />
      </div>

      {/* Program Selector */}
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-program`} className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-brand-red" />
          <span>Select Program</span>
        </label>
        <select
          id={`${formId}-program`}
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.duration})
            </option>
          ))}
        </select>
      </div>

      {/* Centre Selector */}
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-centre`} className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-red" />
          <span>Select Preferred Centre / Online</span>
        </label>
        <select
          id={`${formId}-centre`}
          value={selectedCentre}
          onChange={(e) => setSelectedCentre(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
        >
          {centres.map((ctr) => (
            <option key={ctr.id} value={ctr.id}>
              {ctr.name} ({ctr.city}) {ctr.isHeadOffice ? "★ HO" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Preferred Batch Timing */}
      <div className="space-y-1.5">
        <div id={`${formId}-timing-label`} className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-brand-red" />
          <span>Preferred timing (subject to availability)</span>
        </div>
        <div role="group" aria-labelledby={`${formId}-timing-label`} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            "Weekday morning",
            "Weekday evening",
            "Weekend Saturday & Sunday",
            "Please advise me",
          ].map((batch) => (
            <button
              type="button"
              key={batch}
              aria-pressed={preferredBatch === batch}
              onClick={() => setPreferredBatch(batch)}
              className={`p-2.5 rounded-xl border text-left transition font-medium ${
                preferredBatch === batch
                  ? "border-brand-red bg-brand-red-soft dark:bg-brand-red/10 text-brand-red font-bold"
                  : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1A1A22] text-neutral-600 dark:text-neutral-400"
              }`}
            >
              {batch}
            </button>
          ))}
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="space-y-1 pt-1">
        <label className="flex items-start gap-2.5 text-[11px] text-neutral-600 dark:text-neutral-400 cursor-pointer">
          <input
            required
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
            }}
            className="mt-0.5 rounded text-brand-red focus:ring-brand-red"
          />
          <span>
            I agree to be contacted by DIDM about this enquiry by call, SMS or WhatsApp. Read the <Link className="underline" href="/privacy">Privacy Policy</Link> and <Link className="underline" href="/terms">Terms of Use</Link>.
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-brand-red flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.consent}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-red py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-red/25 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending your enquiry...</span>
          </>
        ) : (
          <>
            <span>Request free counselling</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Your details are used to respond to this course enquiry.</span>
      </div>
    </form>
  );
}
