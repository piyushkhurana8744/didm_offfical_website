"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

type Props = {
  bannerRatio?: number;
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  image: string;
  alt: string;
  caption: string;
  href?: string;
  action?: string;
  variant?: "institution" | "mentors" | "stories" | "recognition" | "editorial" | "admissions";
};

const photographs: Record<string, { src: string; alt: string; caption: string }> = {
  "/images/didm/trainers/Digital Marketing Trainer in DIDM.jpg": { src: "/images/didm/trainers/DIDM_Trainer_Head_Mr.jpg", alt: "Vaibhav Sharma, DIDM trainer head", caption: "Meet the people behind the learning / DIDM faculty" },
  "/images/didm/placement/DIGITAL MARKETING CAREER PLACEMENT IN DIDM.jpg": { src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-6.jpg", alt: "DIDM learners pictured in the published Preet Vihar batch-closing gallery", caption: "Individual ambitions. A shared learning community. / Preet Vihar" },
  "/images/didm/contact/contact_banner.png": { src: "/images/didm/life/preet-vihar-6.jpg", alt: "A consultation space in the DIDM Preet Vihar campus archive", caption: "Start with a conversation / DIDM learning community" },
  "/images/didm/colleges/colleges_banner.png": { src: "/images/didm/colleges/sessions/2b0a3d8855b228d2.jpg", alt: "A session from the DIDM institutional training archive", caption: "Learning beyond the classroom / Institutional session archive" },
  "/images/didm/corporate/corporate_banner.jpg": { src: "/images/didm/homepage/corporate_training_program.jpg", alt: "Participants attending a session in the DIDM training archive", caption: "From the DIDM training archive" },
  "/images/didm/certifications/certification_banner.gif": { src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-6.jpg", alt: "DIDM learners pictured in the Preet Vihar batch-closing gallery", caption: "Learning, practice and a moment to celebrate / DIDM" },
  "/images/didm/batches/successful_batches_hero.webp": { src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-6.jpg", alt: "DIDM learners pictured in the Preet Vihar batch-closing gallery", caption: "A moment from the DIDM community / Preet Vihar" },
  "/images/didm/life/LifeofDIDM-2.webp": { src: "/images/didm/homepage/DIDM_June_Batch_Closing_by-Mr-Siddhartha-sir-in_Preet-Vihar-6.jpg", alt: "DIDM learners pictured in the Preet Vihar batch-closing gallery", caption: "People, possibilities and shared moments / Preet Vihar" },
  "/images/didm/media/trending_news_coverage.jpg": { src: "/images/didm/media/noida_education_conclave_award_2026..webp", alt: "A photograph from DIDM’s Noida Education Conclave archive", caption: "From the DIDM institutional event archive" },
};

export function EditorialHero({ bannerRatio, eyebrow, title, accent, description, image, alt, caption, href = "/enquire", action = "Talk to DIDM", variant = "institution" }: Props) {
  const photograph = photographs[image];
  return (
    <section className={`editorial-hero editorial-${variant} editorial-premium`} aria-labelledby="editorial-page-title">
      <div className="creative-shell">
        <nav className="editorial-breadcrumb" aria-label="Breadcrumb"><Link href="/">DIDM</Link><span aria-hidden="true">/</span><span>{eyebrow}</span></nav>
        <div className="editorial-layout">
          <RevealOnScroll direction="up" className="editorial-copy">
            <p className="creative-eyebrow"><span className="eyebrow-rule" aria-hidden="true" />{eyebrow}</p>
            <h1 id="editorial-page-title" className="editorial-title"><span>{title}</span>{accent && <span><em>{accent}</em></span>}</h1>
            <p>{description}</p>
            <Link href={href} className="creative-button">{action}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </RevealOnScroll>
          <RevealOnScroll direction="up" delayMs={90}>
            <figure>
              <div className={`editorial-photo ${variant === "mentors" && photograph ? "editorial-faculty-photo" : ""}`}>
                <Image src={photograph?.src || image} alt={photograph?.alt || alt} fill priority sizes="(max-width: 800px) 100vw, 48vw" />
              </div>
              <figcaption><span>{photograph?.caption || caption}</span></figcaption>
            </figure>
          </RevealOnScroll>
        </div>
        {bannerRatio && photograph && <details className="editorial-source"><summary>View original DIDM artwork</summary><Image src={image} alt={alt} width={1500} height={Math.round(1500 / bannerRatio)} sizes="(max-width: 800px) 100vw, 900px" /></details>}
      </div>
    </section>
  );
}
