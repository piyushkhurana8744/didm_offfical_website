"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Phone, MessageSquare, Sparkles, Send, ShieldCheck, ArrowRight } from "lucide-react";
import { useAdaptiveHomepage } from "@/context/AdaptiveHomepageContext";
import { getAllCentres } from "@/lib/content";

export function AdaptiveCounsellingHandoff() {
  const { activeModal, modalData, closeCounsellingHandoff, profile } = useAdaptiveHomepage();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [centreId, setCentreId] = useState("");
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const centres = getAllCentres();

  if (activeModal !== "counselling") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !consent) {
      setErrorMsg("Please provide your name, valid phone number, and agree to the privacy consent.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          courseId: modalData?.courseId || profile?.recommendedCourseIds[0] || "midm",
          centreId: centreId || undefined,
          consent: true,
          message: modalData?.prefillReason || `AI Guide consultation for ${profile?.visitorGoal || "admission"}`,
          formType: "adaptive-ai-handoff",
        }),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please call us directly.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="counselling-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-[#12131A] rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeCounsellingHandoff}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {submitSuccess ? (
          <div className="text-center py-6 space-y-4">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 mx-auto">
              <CheckCircle2 size={32} />
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              Counselling Session Reserved!
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Your profile preferences and selected program have been dispatched to our senior admissions counsellors. We will reach out shortly via phone or WhatsApp.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={closeCounsellingHandoff}
                className="px-6 py-2.5 rounded-xl bg-[#b52828] text-white text-xs sm:text-sm font-semibold hover:bg-[#9c2020] transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#b52828]/10 text-[#b52828] dark:bg-[#b52828]/20 dark:text-red-400 mb-2">
                <Sparkles size={12} /> Free 1-on-1 Consultation
              </span>
              <h3 id="counselling-modal-title" className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                Book Personalized Career Counselling
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Speak with an expert mentor regarding syllabus checkpoints, upcoming batches, and 100% placement drives.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs border border-red-200 dark:border-red-900/50">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b52828]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Mobile Number (WhatsApp Preferred) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b52828]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b52828]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Nearest DIDM Campus
                  </label>
                  <select
                    value={centreId}
                    onChange={(e) => setCentreId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#b52828]/40"
                  >
                    <option value="">Select a campus / online</option>
                    <option value="online">DIDM Live Online Campus (Global)</option>
                    {centres.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent-check"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-neutral-300 text-[#b52828] focus:ring-[#b52828]"
                />
                <label htmlFor="consent-check" className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
                  I agree to receive course guidance and batch updates from DIDM via Call/SMS/WhatsApp. We never spam.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#b52828] hover:bg-[#9c2020] text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#b52828]/25 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Registering with Admissions...
                    </>
                  ) : (
                    <>
                      Confirm Free Counselling Call <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center text-[11px] text-neutral-400 dark:text-neutral-500 flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-emerald-500" />
              Direct official admissions desk · Zero commission / no third-party sharing
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
