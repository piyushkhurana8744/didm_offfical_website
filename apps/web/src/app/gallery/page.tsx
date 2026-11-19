"use client";

import { EditorialHero } from "@/components/creative/EditorialHero";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Camera,
  Play,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Building,
  Award,
} from "lucide-react";
import BATCHES_MANIFEST from "@/data/didm-batches-manifest.json";
const BATCHES_DATA = Object.fromEntries(Object.entries(BATCHES_MANIFEST).map(([key,items]) => [key,items.map(item=>item.src)]));
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionHeading } from "@/components/motion/MotionHeading";
import { StaggeredCardGrid } from "@/components/motion/StaggeredCardGrid";

interface GalleryBatch {
  id: string;
  name: string;
  campus: string;
  photos: string[];
}

export default function SuccessfulBatchImagesPage() {
  // Lightbox modal state
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [activePhotoList, setActivePhotoList] = useState<string[]>([]);

  // Expanded states for each gallery
  const [expandedGalleries, setExpandedGalleries] = useState<Record<string, boolean>>({});

  // Lead form modal / state
  const [counsellingForm, setCounsellingForm] = useState({
    name: "",
    email: "",
    phone: "",
    centre: "Dwarka",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter state by campus
  const [activeCampusFilter, setActiveCampusFilter] = useState<string>("all");

  const batchGalleries: GalleryBatch[] = [
    {
      id: "51",
      name: "Preet Vihar & Satya Niketan Batches",
      campus: "Preet Vihar",
      photos: (BATCHES_DATA as any)["51"] || [],
    },
    {
      id: "39",
      name: "Dwarka Campus Batches",
      campus: "Dwarka",
      photos: (BATCHES_DATA as any)["39"] || [],
    },
    {
      id: "40",
      name: "Gurugram Campus Batches",
      campus: "Gurgaon",
      photos: (BATCHES_DATA as any)["40"] || [],
    },
    {
      id: "41",
      name: "Kalkaji Campus Batches",
      campus: "Kalkaji",
      photos: (BATCHES_DATA as any)["41"] || [],
    },
    {
      id: "45",
      name: "Noida Campus Batches",
      campus: "Noida",
      photos: (BATCHES_DATA as any)["45"] || [],
    },
    {
      id: "42",
      name: "Pitampura Campus Batches",
      campus: "Pitampura",
      photos: (BATCHES_DATA as any)["42"] || [],
    },
    {
      id: "44",
      name: "Meerut Campus Batches",
      campus: "Meerut",
      photos: (BATCHES_DATA as any)["44"] || [],
    },
    {
      id: "46",
      name: "Rajouri Garden Campus Batches",
      campus: "Rajouri Garden",
      photos: (BATCHES_DATA as any)["46"] || [],
    },
    {
      id: "47",
      name: "South Campus (Satya Niketan) Batches",
      campus: "South Campus",
      photos: (BATCHES_DATA as any)["47"] || [],
    },
    {
      id: "48",
      name: "Online Live Interactive Batches",
      campus: "Online",
      photos: (BATCHES_DATA as any)["48"] || [],
    },
    {
      id: "31",
      name: "Convocation & Graduation Ceremony",
      campus: "All",
      photos: (BATCHES_DATA as any)["31"] || [],
    },
    {
      id: "30",
      name: "Corporate Training Batches",
      campus: "Corporate",
      photos: (BATCHES_DATA as any)["30"] || [],
    },
    {
      id: "32",
      name: "Campus Hackathons & Celebrations",
      campus: "All",
      photos: (BATCHES_DATA as any)["32"] || [],
    },
  ];

  const filteredGalleries = batchGalleries.filter((g) => {
    if (activeCampusFilter === "all") return true;
    return g.campus.toLowerCase() === activeCampusFilter.toLowerCase();
  });

  const toggleGallery = (id: string) => {
    setExpandedGalleries((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openLightbox = (src: string, index: number, list: string[]) => {
    setSelectedPhoto(src);
    setActivePhotoIdx(index);
    setActivePhotoList(list);
  };

  const nextPhoto = () => {
    if (!activePhotoList.length) return;
    const nextIdx = (activePhotoIdx + 1) % activePhotoList.length;
    setActivePhotoIdx(nextIdx);
    setSelectedPhoto(activePhotoList[nextIdx]);
  };

  const prevPhoto = () => {
    if (!activePhotoList.length) return;
    const prevIdx = (activePhotoIdx - 1 + activePhotoList.length) % activePhotoList.length;
    setActivePhotoIdx(prevIdx);
    setSelectedPhoto(activePhotoList[prevIdx]);
  };

  return (
    <div className="creative-page bg-white text-[#222222] font-sans antialiased">
      <EditorialHero bannerRatio={3.75} eyebrow="THE DIDM COMMUNITY" title="Students Happy Faces" description="Meet the learning community through real batch photographs and celebrations across DIDM centres." image="/images/didm/batches/successful_batches_hero.webp" alt="DIDM successful batch closing ceremonies" caption="DIDM successful batch closing ceremonies" variant="stories" href="#community-gallery" action="Find your campus" />
      <div id="community-gallery" />
      {/* 1. TOP HERO BANNER */}
      <details className="creative-source-art"><summary>Original DIDM community artwork</summary>      <section className="w-full bg-[#8b0000] border-b-4 border-[#ffcc00] overflow-hidden">
        <div className="w-full">
          <Image
            src="/images/didm/batches/successful_batches_hero.webp"
            alt="DIDM's Successful Batch Closing Ceremonies"
            width={1500}
            height={429}
            priority
            sizes="100vw"
            className="w-full h-auto object-cover object-center"
          />
        </div>
      </section></details>


      {/* 2. TITLE SECTION */}
      <MotionSection preset="editorial" className="py-8 sm:py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900">
            Students <span className="text-[#c0392b]">Happy Faces</span>
          </h2>
          <div className="w-20 h-1 bg-[#c0392b] mx-auto rounded"></div>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto pt-1 leading-relaxed">
            Our students are creating their paths of success and getting rewarded with successful job opportunities at prestigious platforms. Look at what our students have to say about their experience at DIDM.
          </p>

          {/* Quick Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Campuses" },
              { id: "dwarka", label: "Dwarka" },
              { id: "gurgaon", label: "Gurugram" },
              { id: "kalkaji", label: "Kalkaji" },
              { id: "noida", label: "Noida" },
              { id: "pitampura", label: "Pitampura" },
              { id: "preet vihar", label: "Preet Vihar" },
              { id: "rajouri garden", label: "Rajouri Garden" },
              { id: "online", label: "Online Batches" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveCampusFilter(btn.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  activeCampusFilter === btn.id
                    ? "bg-[#c0392b] text-white shadow"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* 3. BATCH GALLERIES SEQUENTIAL GROUPS */}
      <MotionSection preset="stagger" className="py-6 sm:py-8 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredGalleries.map((gallery) => {
            const isExpanded = expandedGalleries[gallery.id];
            const photosToShow = isExpanded ? gallery.photos : gallery.photos.slice(0, 8);

            return (
              <div
                key={gallery.id}
                className="bg-white p-5 sm:p-7 rounded-xl border border-neutral-200 shadow-sm space-y-5"
              >
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-[#c0392b] flex items-center justify-center font-bold text-xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-neutral-900">
                      {gallery.name}
                    </h2>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#c0392b] bg-red-50 px-2.5 py-1 rounded">
                    {gallery.photos.length} Verified Photos
                  </span>
                </div>

                {/* 4x2 Photos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {photosToShow.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => openLightbox(url, i, gallery.photos)}
                      className="group relative aspect-[4/3] rounded overflow-hidden border border-neutral-200 bg-neutral-100 cursor-pointer shadow-sm hover:shadow-md transition"
                    >
                      <Image
                        src={url}
                        alt={`${gallery.name} - Photo ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full bg-white/90 text-[#c0392b] flex items-center justify-center shadow">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View More Button */}
                {gallery.photos.length > 8 && (
                  <div className="text-center pt-2">
                    <button
                      onClick={() => toggleGallery(gallery.id)}
                      className="inline-flex items-center gap-2 bg-[#c0392b] hover:bg-[#8b0000] text-white font-bold px-6 py-2 rounded text-xs uppercase tracking-wider shadow transition"
                    >
                      <span>{isExpanded ? "View Less" : "View More"}</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </MotionSection>

      {/* 4. LET'S GET STARTED CTA SECTION */}
      <MotionSection preset="scale" className="py-12 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 uppercase">
            Let&apos;s Get Started
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
            Are you ready to grow your business &amp; enhance your skill set with DIDM? Join our upcoming master batch today!
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/enquire"
              className="inline-block bg-[#c0392b] hover:bg-[#a01616] text-white font-bold px-8 py-3 rounded text-xs sm:text-sm uppercase tracking-wider shadow-lg transition"
            >
              Book Seat For Free Counselling
            </Link>
            <a
              href="tel:8800505151"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-3 rounded text-xs sm:text-sm uppercase tracking-wider transition"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: 88005 05151</span>
            </a>
          </div>
        </div>
      </MotionSection>

      {/* 5. VIDEO REVIEWS / DIDM MEDIA SHOWCASE */}
      <MotionSection preset="depth" className="py-12 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#c0392b] uppercase tracking-wider">
              Student Experiences
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 mt-1">
              DIDM Review &amp; Media Highlights
            </h3>
            <div className="w-16 h-1 bg-[#c0392b] mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Video Card */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border-2 border-neutral-300 shadow-lg bg-neutral-900">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLc3bZ1c3l9bE9T7b7pLqN_8V0pT3x"
                title="DIDM Trainee Reviews & Batch Closings"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Content Beside Video */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-neutral-900">
                10,000+ Placed Trainees Can&apos;t Be Wrong
              </h4>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                Watch actual convocation speeches, mock interview debriefs, and salary review journeys from past students who transitioned into performance marketing, SEO, and paid media roles.
              </p>
              <ul className="space-y-2 text-xs text-neutral-800">
                <li className="flex items-center gap-2">✔ 100% Practical Training directly on live ad campaigns</li>
                <li className="flex items-center gap-2">✔ Dedicated Placement Officers coordinating interviews</li>
                <li className="flex items-center gap-2">✔ Industry Recognized Diploma backed by ASSOCHAM</li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/trainers#trainee-reviews"
                  className="inline-flex items-center gap-2 bg-[#c0392b] hover:bg-[#a01616] text-white font-bold px-5 py-2.5 rounded text-xs uppercase"
                >
                  <span>Read 54+ Verified Trainee Stories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* 6. COMPANIES THAT LOVE OUR STUDENTS (PLACEMENT PARTNERS) */}
      <MotionSection preset="editorial" className="py-10 bg-white border-t border-neutral-200 text-center">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <h3 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase">
            Companies That Love Our Students
          </h3>
          <div className="w-16 h-1 bg-[#c0392b] mx-auto"></div>
          <p className="text-xs text-neutral-500">
            Over 450+ verified corporate recruiters trust DIDM graduates
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-neutral-700 font-bold text-sm sm:text-base pt-2">
            <span className="hover:text-[#c0392b] transition">Micromax</span>
            <span className="hover:text-[#c0392b] transition">Flipkart</span>
            <span className="hover:text-[#c0392b] transition">MakeMyTrip</span>
            <span className="hover:text-[#c0392b] transition">Droom</span>
            <span className="hover:text-[#c0392b] transition">Dentsu</span>
            <span className="hover:text-[#c0392b] transition">GroupM</span>
            <span className="hover:text-[#c0392b] transition">Ogilvy</span>
            <span className="hover:text-[#c0392b] transition">Amazon</span>
            <span className="hover:text-[#c0392b] transition">Zomato</span>
            <span className="hover:text-[#c0392b] transition">Swiggy</span>
          </div>
        </div>
      </MotionSection>

      {/* 7. FULLSCREEN LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#ffcc00] p-1 transition"
              aria-label="Close Modal"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full transition z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full transition z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] max-h-[75vh] rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900">
              <Image
                src={selectedPhoto}
                alt="DIDM Batch Closing Photo"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>

            {/* Counter */}
            <div className="w-full text-center mt-3 text-white">
              <p className="text-xs text-neutral-400 font-mono">
                {activePhotoIdx + 1} of {activePhotoList.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
