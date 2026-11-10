export type VerifiedDidmMedia = {
  id: string;
  path: string;
  sourceUrl: string;
  intendedUse: string;
  alt: string;
  width: number;
  height: number;
  sha256: string;
  verificationStatus: "verified";
};

export const DIDM_MEDIA = {
  officialLogo: {
    id: "didm-official-logo",
    path: "/images/didm/logo/didm-logo-reg-d147db09a041.png",
    sourceUrl: "https://www.didm.in/assets/all/images/didm-logo-reg.png",
    intendedUse: "DIDM global navigation, footer and organization identity",
    alt: "DIDM — Delhi Institute of Digital Marketing",
    width: 400,
    height: 125,
    sha256: "d147db09a0416369e134c24d2a222d678f299c534cc96ec12d57c442896a30d2",
    verificationStatus: "verified",
  },
  digitalMarketingCourseBanner: {
    id: "didm-digital-marketing-course-banner",
    path: "/images/didm/courses/digital-marketing-banner-2-f1bfa6ba7d26.jpg",
    sourceUrl: "https://www.didm.in/assets/uploads/banner/DIGITAL_MARKETING_BANNER_2.jpg",
    intendedUse: "General digital marketing programs directory artwork",
    alt: "DIDM digital marketing course network artwork",
    width: 1280,
    height: 379,
    sha256: "f1bfa6ba7d2651085fc586bfcf9f37e32e30150f311235c8f4eed39461fa0568",
    verificationStatus: "verified",
  },
  midmCourse: {
    id: "didm-midm-course",
    path: "/images/didm/courses/master-in-digital-marketing-course-midm-didm-0e3cbe9c3dd3.webp",
    sourceUrl: "https://didm.in/assets/upload/images/Master_in_digital_marketing_course_MIDM_DIDM.webp",
    intendedUse: "Master in Digital Marketing program cards and detail page",
    alt: "Master in Digital Marketing course at DIDM",
    width: 500,
    height: 400,
    sha256: "0e3cbe9c3dd3ccd3abd8c1a7a90cf87ecda8626359032cb4f55a94d23a3ca32c",
    verificationStatus: "verified",
  },
  advancedCourse: {
    id: "didm-advanced-course",
    path: "/images/didm/courses/advanced-in-digital-marketing-course-aimtp-course-didm-1cdd1ada7c96.webp",
    sourceUrl: "https://didm.in/assets/upload/images/Advanced_in_digital_marketing_course_AIMTP_Course_DIDM.webp",
    intendedUse: "Advanced Digital Marketing program cards",
    alt: "Advanced Digital Marketing course at DIDM",
    width: 500,
    height: 400,
    sha256: "1cdd1ada7c96d77ce5fe9bafafb16f918559c80463b1160b3b6288fe7abd5a1d",
    verificationStatus: "verified",
  },
  advancedCourseHero: {
    id: "didm-advanced-course-hero",
    path: "/images/didm/courses/ai-powered-advanced-digital-marketing-course-f9f127558aac.png",
    sourceUrl: "https://didm.in/assets/uploads/images/AI-Powered-Advanced-digital-marketing-course.png",
    intendedUse: "Advanced Digital Marketing detail page",
    alt: "DIDM AI-powered Advanced Digital Marketing course students",
    width: 1500,
    height: 400,
    sha256: "f9f127558aac0cc3dc60d1cf35ee1ce3ec52496b1cda1ca0cdc1065a58e455df",
    verificationStatus: "verified",
  },
  noidaCentre: {
    id: "didm-noida-centre",
    path: "/images/didm/centres/ai-powered-digital-marketing-course-noida-didm-branch-9e326f9f636c.webp",
    sourceUrl: "https://didm.in/assets/upload/images/AI-Powered-Digital-Marketing-Course-Noida-DIDM-Branch.webp",
    intendedUse: "Noida centre listing and detail page",
    alt: "DIDM Noida branch graduating students",
    width: 1500,
    height: 400,
    sha256: "9e326f9f636cd4c9ed7417cdbc157eb6b22c471e87c384fad0461a16261a32dc",
    verificationStatus: "verified",
  },
  meerutCentre: {
    id: "didm-meerut-centre",
    path: "/images/didm/centres/digital-marketing-course-in-meerut-garden-branch-by-didm-cdf90dffffbc.jpg",
    sourceUrl: "https://didm.in/assets/upload/images/Digital%20Marketing%20Course%20in%20Meerut%20Garden%20Branch%20by%20DIDM.jpg",
    intendedUse: "Meerut centre listing and detail page",
    alt: "DIDM Meerut branch students with certificates",
    width: 1500,
    height: 400,
    sha256: "cdf90dffffbc5b7fc03b362eca2a47752ac331b91f4bd0c4736efbe030922f5a",
    verificationStatus: "verified",
  },
  haldwaniCentre: {
    id: "didm-haldwani-centre",
    path: "/images/didm/centres/didm-in-haldwani-branch-a78266e244a3.webp",
    sourceUrl: "https://didm.in/assets/upload/images/new/DIDM%20in%20Haldwani%20Branch.webp",
    intendedUse: "Haldwani-Rudrapur centre listing and detail page",
    alt: "DIDM Haldwani branch graduating students",
    width: 1500,
    height: 400,
    sha256: "a78266e244a3ef8d84faa69bbe67488f68b62b55514d10fbc79ca885519b779c",
    verificationStatus: "verified",
  },
  collegeTraining: {
    id: "didm-college-training",
    path: "/images/didm/courses/college-program-by-didm-b67088073004.jpg",
    sourceUrl: "https://didm.in/assets/upload/images/college%20program%20by%20didm.jpg",
    intendedUse: "Homepage institutional training section",
    alt: "DIDM college digital marketing training program",
    width: 1500,
    height: 1000,
    sha256: "b67088073004e32fa344a8b4ae1139843e97777ab9024fa54445bd76de9b0556",
    verificationStatus: "verified",
  },
  corporateTraining: {
    id: "didm-corporate-training",
    path: "/images/didm/courses/corporate-training-program-b2b28b0d9008.jpg",
    sourceUrl: "https://didm.in/assets/upload/images/corporate%20training%20program.jpg",
    intendedUse: "Homepage and organizations corporate training sections",
    alt: "DIDM corporate digital marketing training session",
    width: 1500,
    height: 1000,
    sha256: "b2b28b0d9008174f8e25f054430448edb0e0c5510a1584b97eff05067b6ef32c",
    verificationStatus: "verified",
  },
  mediaNews: {
    id: "didm-media-news",
    path: "/images/didm/blog/media-news-d13077c0380c.png",
    sourceUrl: "https://didm.in/assets/upload/images/imges/MEDIA%20NEWS.png",
    intendedUse: "Knowledge hub media and news heading",
    alt: "DIDM media and news",
    width: 1796,
    height: 250,
    sha256: "d13077c0380c1998c2a8047de16e3ef4cef7e768c993824b17b028d2911c10bc",
    verificationStatus: "verified",
  },
  historicalOnlineAdvancedFee: {
    id: "didm-historical-online-advanced-fee",
    path: "/images/didm/courses/didm-online-advanced-course-fees-bc5606fa52dd.webp",
    sourceUrl: "https://didm.in/assets/upload/images/didm%20online%20advanced%20course%20fees.webp",
    intendedUse: "Archive only; not displayed because pricing may be historical",
    alt: "Historical DIDM online advanced course fee graphic",
    width: 312,
    height: 770,
    sha256: "bc5606fa52ddc410c9fec92389b608dec4cb85cb08777e04aa6cbd071e01b2a8",
    verificationStatus: "verified",
  },
} as const satisfies Record<string, VerifiedDidmMedia>;

export const VERIFIED_DIDM_MEDIA: VerifiedDidmMedia[] = Object.values(DIDM_MEDIA);

export function getVerifiedDidmMedia(id: string | undefined): VerifiedDidmMedia | undefined {
  return VERIFIED_DIDM_MEDIA.find((item) => item.id === id && item.intendedUse !== "Archive only; not displayed because pricing may be historical");
}

export const COURSE_CARD_MEDIA: Record<string, VerifiedDidmMedia | undefined> = {
  "master-in-digital-marketing-course": DIDM_MEDIA.midmCourse,
  "digital-marketing-artificial-intelligence": DIDM_MEDIA.advancedCourse,
  "advanced-digital-marketing-course": DIDM_MEDIA.advancedCourseHero,
  "customized-digital-marketing-course": DIDM_MEDIA.corporateTraining,
  "online-digital-marketing-course": DIDM_MEDIA.digitalMarketingCourseBanner,
  "gen-ai-knowledge-camp": DIDM_MEDIA.collegeTraining,
};

export const COURSE_DETAIL_MEDIA: Record<string, VerifiedDidmMedia | undefined> = {
  "master-in-digital-marketing-course": DIDM_MEDIA.midmCourse,
  "digital-marketing-artificial-intelligence": DIDM_MEDIA.advancedCourseHero,
  "advanced-digital-marketing-course": DIDM_MEDIA.advancedCourse,
  "customized-digital-marketing-course": DIDM_MEDIA.corporateTraining,
  "online-digital-marketing-course": DIDM_MEDIA.digitalMarketingCourseBanner,
  "gen-ai-knowledge-camp": DIDM_MEDIA.collegeTraining,
};

export const CENTRE_MEDIA: Record<string, VerifiedDidmMedia | undefined> = {
  noida: DIDM_MEDIA.noidaCentre,
  meerut: DIDM_MEDIA.meerutCentre,
  "haldwani-rudrapur": DIDM_MEDIA.haldwaniCentre,
};

export function getCentreMedia(slug: string): VerifiedDidmMedia | undefined {
  if (slug === "noida") return DIDM_MEDIA.noidaCentre;
  if (slug === "meerut") return DIDM_MEDIA.meerutCentre;
  if (slug === "haldwani-rudarpur") return DIDM_MEDIA.haldwaniCentre;
  return undefined;
}
