"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShieldCheck, Phone, MessageSquare, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { SITE_DATA } from "@/data/site-data";

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const initialProgram = searchParams.get("p") || "midm";
  const initialCentre = searchParams.get("c") || "dwarka";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(initialProgram);
  const [selectedCentre, setSelectedCentre] = useState(initialCentre);
  const [preferredBatch, setPreferredBatch] = useState("Weekday Morning");
  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const p = searchParams.get("p");
    const c = searchParams.get("c");
    if (p) setSelectedProgram(p);
    if (c) setSelectedCentre(c);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
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

    setIsSubmitting(true);
    // Simulate CRM submission & save plan
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        const prog = SITE_DATA.programs.find((p) => p.id === selectedProgram);
        if (prog) {
          localStorage.setItem(
            "didm-plan",
            JSON.stringify({
              id: prog.id,
              name: prog.shortName,
              fullName: prog.name,
              fee: prog.fee,
              ts: Date.now(),
            })
          );
          window.dispatchEvent(new Event("didm-plan-updated"));
        }
      } catch {
        // ignore
      }
    }, 600);
  };

  if (isSubmitted) {
    const firstName = name.trim().split(" ")[0];
    const programObj = SITE_DATA.programs.find((p) => p.id === selectedProgram);
    const centreObj = SITE_DATA.centres.find((c) => c.id === selectedCentre);

    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-xl text-center space-y-6 animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
            Booking Received
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white pt-1">
            Thank you, {firstName}!
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
            Your free 1-on-1 counseling demo request has been prioritized for{" "}
            <strong className="text-neutral-900 dark:text-white">{programObj?.shortName || "Digital Marketing"}</strong> at our{" "}
            <strong className="text-neutral-900 dark:text-white">{centreObj?.name || "Campus"}</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-100 dark:border-neutral-800 max-w-md mx-auto text-left text-xs space-y-1.5 text-neutral-600 dark:text-neutral-300">
          <div><strong className="text-neutral-900 dark:text-white">Registered Mobile:</strong> {phone}</div>
          <div><strong className="text-neutral-900 dark:text-white">Preferred Timing:</strong> {preferredBatch}</div>
          <div><strong className="text-neutral-900 dark:text-white">Assigned Support Desk:</strong> Dwarka & Satya Niketan Academic Wing</div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${SITE_DATA.brand.phoneClean}`}
            className="btn-primary text-xs py-3 px-5 w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-brand-red" />
            <span>Call Counselor Directly</span>
          </a>

          <a
            href={`https://wa.me/918800505151?text=Hi%20DIDM%2C%20I%20just%20booked%20a%20demo%20for%20${encodeURIComponent(programObj?.shortName || "MIDM")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs py-3 px-5 w-full sm:w-auto text-emerald-600 dark:text-emerald-400"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 sm:p-8 md:p-9 rounded-3xl bg-white dark:bg-[#131319] border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-4 sm:space-y-5"
    >
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
          Book a Free 1-on-1 Demo Session
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Sit with our senior trainers, inspect live ad campaigns, and review placement portfolios.
        </p>
      </div>

      {/* Program Selection Radio Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-mono uppercase tracking-wider">
          Select Course Program:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SITE_DATA.programs.map((p) => {
            const isSelected = selectedProgram === p.id;
            return (
              <button
                type="button"
                key={p.id}
                onClick={() => setSelectedProgram(p.id)}
                className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition ${
                  isSelected
                    ? "border-brand-red bg-brand-red-soft/70 dark:bg-brand-red/20 text-brand-red"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400"
                }`}
              >
                <div className="truncate">{p.shortName}</div>
                <div className="text-[10px] text-neutral-500 font-normal mt-0.5">{p.duration.split("(")[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Centre Dropdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-mono uppercase tracking-wider">
          Preferred Learning Centre:
        </label>
        <select
          value={selectedCentre}
          onChange={(e) => setSelectedCentre(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
        >
          {SITE_DATA.centres.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.city})
            </option>
          ))}
        </select>
      </div>

      {/* Name & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Full Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className={`w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border text-xs sm:text-sm focus:outline-none text-neutral-900 dark:text-white ${
              errors.name ? "border-brand-red" : "border-neutral-200 dark:border-neutral-800 focus:border-brand-red"
            }`}
          />
          {errors.name && (
            <div className="text-[11px] text-brand-red flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Mobile Number (WhatsApp) *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 98765 43210"
            className={`w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border text-xs sm:text-sm focus:outline-none text-neutral-900 dark:text-white ${
              errors.phone ? "border-brand-red" : "border-neutral-200 dark:border-neutral-800 focus:border-brand-red"
            }`}
          />
          {errors.phone && (
            <div className="text-[11px] text-brand-red flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Email & Preferred Batch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rahul@example.com"
            className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Preferred Batch Timing
          </label>
          <select
            value={preferredBatch}
            onChange={(e) => setPreferredBatch(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-[#1A1A22] border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-brand-red text-neutral-900 dark:text-white"
          >
            <option value="Weekday Morning">Weekday Morning (10:00 AM)</option>
            <option value="Weekday Afternoon">Weekday Afternoon (2:00 PM)</option>
            <option value="Weekday Evening">Weekday Evening (5:00 PM)</option>
            <option value="Weekend Special">Weekend Special (Sat & Sun)</option>
            <option value="Online Flexible">Online Flexible Timings</option>
          </select>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded border-neutral-300 text-brand-red focus:ring-brand-red"
          />
          <span className="text-[11px] text-neutral-500 leading-tight">
            I agree to receive course syllabus, fee breakdown, and counseling updates from DIDM via Call, SMS, and WhatsApp under DPDP Act 2023. We never spam.
          </span>
        </label>
        {errors.consent && (
          <div className="text-[11px] text-brand-red mt-1">{errors.consent}</div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-red w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Connecting with Academic Counselor...</span>
          </>
        ) : (
          <>
            <span>Confirm & Reserve Free Demo Seat</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 text-center pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>100% Privacy Protected · Zero Cost Commitment</span>
      </div>
    </form>
  );
}

