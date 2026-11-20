"use client";

import { useState, useMemo } from "react";
import type { Centre } from "@/types/content";
import {
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Search,
  ShieldCheck,
  Save,
  Globe,
  Navigation,
} from "lucide-react";

interface Props {
  initialCentres: Centre[];
  canWrite: boolean;
  canPublish: boolean;
}

interface ValidationIssue {
  field: string;
  message: string;
}

export function CentresLocationManager({ initialCentres, canWrite, canPublish }: Props) {
  const [centres, setCentres] = useState<Centre[]>(initialCentres);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  // Field change handler
  const handleUpdate = (id: string, field: keyof Centre, value: any) => {
    setCentres((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
    setSavedMessage(null);
  };

  // Validation function per centre
  const validateCentre = (centre: Centre): ValidationIssue[] => {
    const issues: ValidationIssue[] = [];

    // Address validation
    if (!centre.address || centre.address.trim().length < 10) {
      issues.push({ field: "address", message: "Address is too short or missing." });
    }

    // Postal Code validation (Indian PIN code: 6 digits starting 1-9)
    if (centre.postalCode) {
      if (!/^[1-9][0-9]{5}$/.test(centre.postalCode.trim())) {
        issues.push({
          field: "postalCode",
          message: `Invalid 6-digit PIN code: "${centre.postalCode}". (Must be 6 digits, e.g. 110021, 263139).`,
        });
      }
    }

    // Coordinates validation
    if (centre.latitude !== undefined && centre.latitude !== null) {
      if (centre.latitude < -90 || centre.latitude > 90) {
        issues.push({ field: "latitude", message: "Latitude must be between -90 and 90." });
      }
    }
    if (centre.longitude !== undefined && centre.longitude !== null) {
      if (centre.longitude < -180 || centre.longitude > 180) {
        issues.push({ field: "longitude", message: "Longitude must be between -180 and 180." });
      }
    }

    // Directions URL validation
    if (centre.directionsUrl && !/^https?:\/\//i.test(centre.directionsUrl.trim())) {
      issues.push({ field: "directionsUrl", message: "Directions URL must begin with http:// or https://" });
    }

    return issues;
  };

  const filteredCentres = useMemo(() => {
    return centres.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.address.toLowerCase().includes(search.toLowerCase()) ||
        (c.postalCode && c.postalCode.includes(search));

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && c.centerStatus === "active") ||
        (filterStatus === "review_needed" && c.centerStatus === "review_needed") ||
        (filterStatus === "virtual" && c.centerStatus === "virtual");

      return matchesSearch && matchesStatus;
    });
  }, [centres, search, filterStatus]);

  const allErrorsCount = useMemo(() => {
    return centres.reduce((acc, c) => acc + validateCentre(c).length, 0);
  }, [centres]);

  const handleSave = () => {
    if (allErrorsCount > 0) {
      alert("Cannot save: Please fix validation errors first.");
      return;
    }
    setSavedMessage("Branch location configurations validated and saved successfully.");
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Top summary card */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
          <p className="text-xs text-neutral-400 font-medium">Total Centress</p>
          <p className="text-2xl font-bold text-white mt-1">{centres.length}</p>
        </div>
        <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4">
          <p className="text-xs text-emerald-400 font-medium">Verified Active</p>
          <p className="text-2xl font-bold text-emerald-300 mt-1">
            {centres.filter((c) => c.centerStatus === "active").length}
          </p>
        </div>
        <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-4">
          <p className="text-xs text-amber-400 font-medium">Review Needed</p>
          <p className="text-2xl font-bold text-amber-300 mt-1">
            {centres.filter((c) => c.centerStatus === "review_needed").length}
          </p>
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
          <p className="text-xs text-neutral-400 font-medium">Validation Status</p>
          <p className="text-2xl font-bold text-white mt-1">
            {allErrorsCount === 0 ? (
              <span className="text-emerald-400 flex items-center gap-1.5 text-base">
                <CheckCircle2 className="w-5 h-5" /> All Passing
              </span>
            ) : (
              <span className="text-red-400 flex items-center gap-1.5 text-base">
                <AlertTriangle className="w-5 h-5" /> {allErrorsCount} Issue(s)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search branch, city, address, PIN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-neutral-400 whitespace-nowrap">Filter Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500"
          >
            <option value="all">All Centres ({centres.length})</option>
            <option value="active">Active Only</option>
            <option value="review_needed">Review Needed</option>
            <option value="virtual">Virtual / Online</option>
          </select>

          {canWrite && (
            <button
              onClick={handleSave}
              disabled={allErrorsCount > 0}
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold transition"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      {savedMessage && (
        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {savedMessage}
        </div>
      )}

      {/* Centre list */}
      <div className="space-y-6">
        {filteredCentres.map((centre) => {
          const issues = validateCentre(centre);
          const isPreviewing = previewSlug === centre.slug;

          return (
            <div
              key={centre.id}
              className={`rounded-2xl border p-6 transition ${
                issues.length > 0
                  ? "border-red-800/80 bg-red-950/10"
                  : "border-neutral-800 bg-neutral-900/90"
              }`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-neutral-800 text-red-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{centre.name}</h3>
                      <span className="text-xs font-mono text-neutral-500">[{centre.id}]</span>
                      {centre.isHeadOffice && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-600 text-white">
                          Head Office
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400">
                      {centre.city}, {centre.state} · Slug: <code className="text-neutral-300">/centres/{centre.slug}</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      centre.centerStatus === "active"
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : centre.centerStatus === "review_needed"
                        ? "bg-amber-950 text-amber-300 border border-amber-800"
                        : "bg-blue-950 text-blue-300 border border-blue-800"
                    }`}
                  >
                    Status: {centre.centerStatus || "active"}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPreviewSlug(isPreviewing ? null : centre.slug)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs text-white transition"
                  >
                    {isPreviewing ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isPreviewing ? "Hide Map" : "Preview Map"}</span>
                  </button>

                  {centre.directionsUrl && (
                    <a
                      href={centre.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition"
                    >
                      <Navigation className="w-3.5 h-3.5 text-red-400" />
                      <span>Test Directions</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  )}
                </div>
              </div>

              {/* Validation warning banner */}
              {issues.length > 0 && (
                <div className="mt-4 p-3 rounded-lg bg-red-950/40 border border-red-800/80 text-red-300 text-xs space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>Location validation errors detected:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 pl-2">
                    {issues.map((iss, i) => (
                      <li key={i}>{iss.message}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Editable Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-xs">
                {/* Full Address */}
                <div className="lg:col-span-2">
                  <label className="block text-neutral-400 font-medium mb-1">
                    Complete Address (Official Street & Premise)
                  </label>
                  <textarea
                    rows={2}
                    disabled={!canWrite}
                    value={centre.address}
                    onChange={(e) => handleUpdate(centre.id, "address", e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">
                    PIN Code (6 Digits)
                  </label>
                  <input
                    type="text"
                    disabled={!canWrite}
                    maxLength={6}
                    value={centre.postalCode || ""}
                    onChange={(e) => handleUpdate(centre.id, "postalCode", e.target.value)}
                    placeholder="e.g. 110021"
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                  <span className="text-[10px] text-neutral-500">
                    Must be valid 6 digits (blocks accidental 7-digit PINs).
                  </span>
                </div>

                {/* Landmark */}
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Landmark</label>
                  <input
                    type="text"
                    disabled={!canWrite}
                    value={centre.landmark || ""}
                    onChange={(e) => handleUpdate(centre.id, "landmark", e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                {/* Metro Station */}
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Nearest Metro Station</label>
                  <input
                    type="text"
                    disabled={!canWrite}
                    value={centre.metroStation || ""}
                    onChange={(e) => handleUpdate(centre.id, "metroStation", e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                {/* Phones */}
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Contact Phone(s)</label>
                  <input
                    type="text"
                    disabled={!canWrite}
                    value={centre.phones.join(", ")}
                    onChange={(e) =>
                      handleUpdate(
                        centre.id,
                        "phones",
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                {/* Directions URL */}
                <div className="lg:col-span-2">
                  <label className="block text-neutral-400 font-medium mb-1">
                    Google Maps Directions URL
                  </label>
                  <input
                    type="url"
                    disabled={!canWrite}
                    value={centre.directionsUrl || ""}
                    onChange={(e) => handleUpdate(centre.id, "directionsUrl", e.target.value)}
                    placeholder="https://goo.gl/maps/..."
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                {/* Google Place ID */}
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">
                    Google Place ID (Verified)
                  </label>
                  <input
                    type="text"
                    disabled={!canWrite}
                    value={centre.googlePlaceId || ""}
                    onChange={(e) => handleUpdate(centre.id, "googlePlaceId", e.target.value || null)}
                    placeholder="ChIJ... or leave empty if unverified"
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                {/* Coordinates: Latitude & Longitude */}
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">
                    Latitude (-90 to 90)
                  </label>
                  <input
                    type="number"
                    step="any"
                    disabled={!canWrite}
                    value={centre.latitude ?? ""}
                    onChange={(e) =>
                      handleUpdate(
                        centre.id,
                        "latitude",
                        e.target.value === "" ? null : parseFloat(e.target.value)
                      )
                    }
                    placeholder="e.g. 28.5833"
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1">
                    Longitude (-180 to 180)
                  </label>
                  <input
                    type="number"
                    step="any"
                    disabled={!canWrite}
                    value={centre.longitude ?? ""}
                    onChange={(e) =>
                      handleUpdate(
                        centre.id,
                        "longitude",
                        e.target.value === "" ? null : parseFloat(e.target.value)
                      )
                    }
                    placeholder="e.g. 77.1667"
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                {/* Verification Status Selector */}
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">
                    Verification Status
                  </label>
                  <select
                    disabled={!canWrite}
                    value={centre.centerStatus || "active"}
                    onChange={(e) =>
                      handleUpdate(centre.id, "centerStatus", e.target.value as any)
                    }
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  >
                    <option value="active">Active (Verified Classroom)</option>
                    <option value="review_needed">Review Needed</option>
                    <option value="virtual">Virtual / Online Campus</option>
                  </select>
                </div>

                {/* Official Source URL */}
                <div className="lg:col-span-2">
                  <label className="block text-neutral-400 font-medium mb-1">
                    Official Branch Page Source URL
                  </label>
                  <input
                    type="url"
                    disabled={!canWrite}
                    value={centre.verifiedSourceUrl || ""}
                    onChange={(e) => handleUpdate(centre.id, "verifiedSourceUrl", e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>

                {/* Verification Date */}
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Last Verified Date</label>
                  <input
                    type="date"
                    disabled={!canWrite}
                    value={centre.lastVerifiedDate || "2026-11-20"}
                    onChange={(e) => handleUpdate(centre.id, "lastVerifiedDate", e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-red-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Map Preview Accordion */}
              {isPreviewing && (
                <div className="mt-5 pt-4 border-t border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-semibold text-neutral-300">Live Google Maps Embed Preview:</span>
                    <span>Query target: {centre.address}</span>
                  </div>
                  <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950">
                    <iframe
                      src={
                        centre.mapEmbedUrl ||
                        `https://maps.google.com/maps?q=Delhi+Institute+of+Digital+Marketing,+${encodeURIComponent(
                          centre.address
                        )}&t=&z=15&ie=UTF8&output=embed`
                      }
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${centre.name} Location Preview`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
