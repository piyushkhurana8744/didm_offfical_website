import type { Metadata } from "next";
import { CreativeStudioHero } from "@/components/creative/CreativeStudioHero";
import { MotionSection, MotionHeading } from "@/components/motion";
import { CreativePrograms } from "@/components/creative/CreativePrograms";
import { CampaignJourney } from "@/components/creative/CampaignJourney";
import { RealStudentExperience } from "@/components/homepage/RealStudentExperience";
import { OriginalTrainingBenefits } from "@/components/homepage/OriginalTrainingBenefits";
import { OriginalTrainingHighlightsAndForm } from "@/components/homepage/OriginalTrainingHighlightsAndForm";
import { OriginalTestimonialsSection } from "@/components/homepage/OriginalTestimonialsSection";
import { OriginalUpskillCareer } from "@/components/homepage/OriginalUpskillCareer";
import { OriginalMasterMentors } from "@/components/homepage/OriginalMasterMentors";
import { OriginalAwardsRecognition } from "@/components/homepage/OriginalAwardsRecognition";
import { OriginalCampusGallery } from "@/components/homepage/OriginalCampusGallery";
import { HomepageCentresDirectory } from "@/components/homepage/HomepageCentresDirectory";
import { HomepageNewsEvents } from "@/components/homepage/HomepageNewsEvents";
import { OriginalHiringPartners } from "@/components/homepage/OriginalHiringPartners";
import { OriginalInstitutionalPrograms } from "@/components/homepage/OriginalInstitutionalPrograms";
import { OriginalCareerClarity } from "@/components/homepage/OriginalCareerClarity";
import { FAQSection } from "@/components/FAQSection";
import { SITE_DATA } from "@/data/site-data";
import Link from "next/link";
import { getHomepage } from "@/lib/mongodb/pages";
import { getVerifiedDidmMedia } from "@/data/didm-media";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Digital Marketing & AI Courses | DIDM",
  description:
    "Explore DIDM digital marketing and AI courses, practical curricula, classroom and live online learning, training centres and free admissions counselling.",
  alternates: {
    canonical: "https://www.didm.in/",
  },
};

export default async function HomePage() {
  const homepage = await getHomepage();
  const published = homepage.status !== "static-fallback" && homepage.revision > 0;
  const heroMedia = published ? getVerifiedDidmMedia(homepage.content.heroMediaId) : undefined;
  return (
    <div className="creative-home bg-white dark:bg-[#0B0C10] text-[#222222] dark:text-[#EAEAEA] font-body selection:bg-[#b52828] selection:text-white">
      {/* 1. Hero Full-Bleed Billboard, Eyebrow & Primary H1 Area */}
      <CreativeStudioHero heading={published ? homepage.content.heroHeading : undefined} media={heroMedia ? { path: heroMedia.path, alt: heroMedia.alt } : undefined} />
      <MotionSection className="student-entry"><div className="student-shell student-entry-inner"><div><p className="student-eyebrow">A GOOD PLACE TO BEGIN</p><h2>Big possibilities. Find your direction.</h2><p>Explore what fits your goals, your interests and your schedule.</p></div><div className="student-entry-choices"><Link href="/course-finder">Find my course ↗</Link><Link href="/upcoming-batches">Explore batches ↗</Link></div></div></MotionSection>

      {/* Approved campaign storytelling follows the restored program directory. */}

      {/* 3. Choose the Certification Course for Your Career (4 Flagship Programs) */}
      <CreativePrograms />
      <CampaignJourney />

      {/* 4. Flagship 3D Digital Workspace: Laptop Agency Floor Console */}

      {/* 5. Real Student Experience: Live Ad Budgets & Agency Floor */}
      <RealStudentExperience />

      {/* 5. Value Pillars: 12 Benefits Grid */}
      <OriginalTrainingBenefits />

      {/* 6. Course Training Highlights & 'Take a free session today!!' Inline Form */}
      <OriginalTrainingHighlightsAndForm />

      {/* 7. Over 35000+ Careers Transformed (Alumni Testimonials Banner) */}
      <OriginalTestimonialsSection />

      {/* 8. Upskill Your Career with Digital Marketing Course (4 Value Columns) */}
      <OriginalUpskillCareer />

      {/* 9. Meet Our Master Mentors (Google Senior Strategists) */}
      <OriginalMasterMentors />

      {/* 10. Delhi Institute of Digital Marketing - Awards & Media Recognition */}
      <OriginalAwardsRecognition />

      {/* 11. Smiling Faces, Successful Futures: Campus Life & Batch Closing Gallery */}
      <OriginalCampusGallery />

      {/* 12. Find Your Nearest DIDM Training Campus (14 Physical Branches Directory) */}
      <HomepageCentresDirectory />

      {/* 13. Latest News & Events at DIDM */}
      <HomepageNewsEvents />

      {/* 14. Hiring Partners: Companies That Love Our Students */}
      <OriginalHiringPartners />

      {/* 15. Institutional & Corporate Training Solutions */}
      <OriginalInstitutionalPrograms />

      {/* 16. Flagship 3D Admission Dossier & Interactive Application Form */}

      {/* 17. Pre-Admission FAQs with Masked Reveal */}
      <MotionSection preset="editorial" className="py-14 sm:py-20 bg-gray-50 dark:bg-[#12131A] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <MotionHeading
            eyebrow="Frequently Asked Questions"
            title="Everything You Need to Know Before Joining DIDM"
            description="Clear answers to curriculum, practical live projects, 100% placement support, and EMI options."
            align="center"
          />
          <FAQSection faqs={SITE_DATA.faqs} />
        </div>
      </MotionSection>

      {/* 17. Still Confused...... ?? GET INSTANT CAREER CLARITY */}
      <OriginalCareerClarity />
    </div>
  );
}
