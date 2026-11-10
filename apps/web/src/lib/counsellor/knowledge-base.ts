import { getAllCentres, getAllCourses } from "@/lib/content";
import { getBrochureModules52, getCourseComparison, getFaqKnowledge, getInstituteInformation, getToolsAndCertifications } from "@/lib/brochure";
import { getAboutTeam, getAboutFaqs, getAboutAchievements, getAboutUsData } from "@/lib/website";

export interface CounsellorResponse {
  answer: string;
  source: "brochure_retrieval" | "verified_catalog" | "counselling_referral" | "verified_website_retrieval";
  citations?: Array<{ label: string; page?: number; url?: string }>;
  suggestions?: string[];
  suggestedActions?: Array<{ label: string; href: string }>;
}

const norm = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Deterministic structured-data retrieval. This is not presented as generative AI. */
export function queryCourseCounsellor(query: string): CounsellorResponse {
  const q = norm(query);
  const qTokens = new Set(q.split(/\s+/));

  // 1. Careers & Job Openings (check early to capture employment intent)
  if (["job", "jobs", "hiring", "vacancy", "openings", "work at didm", "career openings"].some((term) => q.includes(term))) {
    return {
      answer: `**Careers at DIDM:**\n\nDIDM is actively hiring across our 14 campuses for:\n• **Senior Trainers:** Performance Marketing, Google Ads, Meta Ads & AI Workflows\n• **Admissions Counsellors:** EdTech career guidance officers\n• **Technical SEO Mentors:** Semrush, Google Search Console, and Web Vitals\n• **Corporate Placement Officers:** MNC recruitment drive coordinators\n\nSend your resume directly to careers@didm.in or apply online.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Careers", url: "https://www.didm.in/careers" }],
      suggestedActions: [{ label: "View Open Positions", href: "/careers" }],
    };
  }

  // 1b. Refund & Cancellation Policy
  if (["refund", "cancellation", "money back", "fee return", "fee refund", "refund policy"].some((term) => q.includes(term))) {
    return {
      answer: `**DIDM Fee & Refund Guidelines:**\n\n• **Seat Reservation:** Registration deposits cover terminal setup and software licensing.\n• **Zero-Fee Batch Transfer:** If your schedule changes, you can pause for up to 6 months or transfer between campuses/cohorts with **zero penalty**.\n• **Cancellation Window:** Written refund requests received at least 7 working days prior to batch start undergo review; post-commencement fees are non-refundable.\n• Free demo sessions are provided prior to enrollment to ensure 100% course fit.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Refund Policy", url: "https://www.didm.in/refund" }],
      suggestedActions: [{ label: "Review Refund Policy", href: "/refund" }],
    };
  }

  // 1c. Terms of Admission
  if (["terms", "conditions", "code of conduct", "admission rules", "attendance rule"].some((term) => q.includes(term))) {
    return {
      answer: `**Terms & Regulations of Admission:**\n\n• **Attendance:** Minimum 80% attendance required for placement drives.\n• **Backup Classes:** Zero-fee access to upcoming batches if classes are missed with prior notice.\n• **LMS & Intellectual Property:** Video recordings and materials are for personal trainee learning only.\n• **Capstones:** Passing live agency ad project reviews is required for final diploma issuance.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Terms & Conditions", url: "https://www.didm.in/terms" }],
      suggestedActions: [{ label: "Read Terms & Conditions", href: "/terms" }],
    };
  }

  // 1d. Why Choose DIDM / 150 Reasons
  if (["why choose", "why didm", "150 reasons", "reasons to join", "benefits of didm"].some((term) => q.includes(term))) {
    return {
      answer: `**Why Choose DIDM? (Key Differentiators):**\n\n1. **52-Stop Master Roadmap:** Practical training spanning foundational digital marketing to AI agents.\n2. **ASSOCHAM Award:** Recognized as 'Most Promising Brand in Digital Marketing'.\n3. **Agency Simulation:** Guaranteed agency live account work through in-house agency Online Strikers.\n4. **₹1,00,000+ Tools:** Complimentary access to Semrush, Canva Pro, Screaming Frog & AI tools.\n5. **14 Physical Hubs:** Metro-connected centers across Delhi NCR, UP, Uttarakhand, Rajasthan & Mumbai.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Why Choose DIDM", url: "https://www.didm.in/why-choose-didm" }],
      suggestedActions: [{ label: "Explore All Differentiators", href: "/why-choose-didm" }],
    };
  }

  // 1e. Campus Life & Gallery
  if (["gallery", "photos", "convocation", "life at didm", "culture", "celebration", "events"].some((term) => q.includes(term))) {
    return {
      answer: `**Campus Life & Batch Memories at DIDM:**\n\nExplore real photographs from our convocation ceremonies, 48-hour ad hackathons, festive celebrations (Diwali, Eid, Independence Day), and university masterclasses across all 14 branches.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Student Gallery", url: "https://www.didm.in/gallery" }],
      suggestedActions: [
        { label: "View Photo Gallery", href: "/gallery" },
        { label: "Explore Life at DIDM", href: "/life-at-didm" },
      ],
    };
  }

  // 2. Leadership & Team verification (check before token search to prevent substring collisions)
  if (["team", "faculty", "leadership", "trainer", "trainers", "founder", "director", "mentor", "mentors", "sushil", "vaibhav", "chirag"].some((term) => qTokens.has(term) || q.includes(term))) {
    const team = getAboutTeam();
    const trainerHead = team.find((m) => m.role.toLowerCase().includes("trainer"));
    const hrHead = team.find((m) => m.role.toLowerCase().includes("hr head"));
    const opHead = team.find((m) => m.role.toLowerCase().includes("operation head"));
    return {
      answer: `DIDM's faculty and operational leaders carry 8+ to 15+ years of live agency execution experience:\n\n• **${trainerHead?.name ?? "Vaibhav Sharma"}** (${trainerHead?.role ?? "Trainer Head"}, ${trainerHead?.department ?? "Training | Placement"})\n• **${hrHead?.name ?? "Sushil Sisodia"}** (${hrHead?.role ?? "HR Head"})\n• **${opHead?.name ?? "Chirag Singhal"}** (${opHead?.role ?? "Operation Head"})\n• Plus 11 core department heads and mentors guiding SEO, Paid Ads, and Online Strikers projects.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Faculty Directory", url: "https://www.didm.in/trainers" }],
      suggestedActions: [{ label: "Meet the Trainers & Faculty", href: "/trainers" }],
    };
  }

  // 2. Verified live website about FAQs (ranked by unique token overlap)
  const websiteFaqs = getAboutFaqs();
  const scoredFaqs = websiteFaqs.map((item) => {
    const faqTokens = new Set(norm(item.question).split(" ").filter((w) => w.length > 3));
    const tokenScore = Array.from(faqTokens).filter((w) => qTokens.has(w)).length;
    const bonus = (q.includes("missed") && item.question.toLowerCase().includes("missed")) ? 5
      : (q.includes("salary") && item.question.toLowerCase().includes("salary")) ? 5
      : (q.includes("doubt") && item.question.toLowerCase().includes("understand")) ? 5
      : (q.includes("freelance") && item.question.toLowerCase().includes("freelancer")) ? 5
      : 0;
    return { item, totalScore: tokenScore + bonus };
  }).filter(({ totalScore }) => totalScore >= 2).sort((a, b) => b.totalScore - a.totalScore);

  const matchedWebsiteFaq = scoredFaqs[0]?.item;

  if (matchedWebsiteFaq) {
    return {
      answer: `**${matchedWebsiteFaq.question}**\n\n${matchedWebsiteFaq.answer}`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — About FAQs", url: matchedWebsiteFaq.source }],
      suggestions: ["What if I miss a class?", "What is the expected salary after the course?", "Can I work freelance from home?"],
      suggestedActions: [{ label: "Read all institute FAQs", href: "/about#faqs" }],
    };
  }

  // 3. Upcoming Batches & Schedule
  if (["batch", "batches", "schedule", "upcoming", "start date", "cohort", "intake"].some((term) => q.includes(term))) {
    return {
      answer: `**Upcoming Batches at DIDM:**\n\n• **Weekday Batches:** Mon–Thu (10:00 AM – 1:00 PM / 2:00 PM – 5:00 PM)\n• **Weekend Batches:** Sat–Sun (10:30 AM – 2:30 PM) for working professionals\n• **Live Online Batches:** Mon, Wed, Fri (8:00 PM – 10:00 PM IST)\n\nBatches are held in small cohorts (max 15–20 trainees) across all 14 campuses. Zero-fee backup sessions are available if you miss any class.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Upcoming Batches", url: "https://www.didm.in/upcoming-batches" }],
      suggestedActions: [{ label: "View Live Batch Schedule", href: "/upcoming-batches" }],
    };
  }

  // 4. Franchise & Business Partnership
  if (["franchise", "open center", "partnership", "partner with didm"].some((term) => q.includes(term))) {
    return {
      answer: `**Partner with DIDM (Franchise Opportunities):**\n\nDIDM offers turnkey franchise partnerships across Tier 1, 2, and 3 cities in India. Support includes:\n• Centralized 52-module curriculum and LMS access\n• Faculty recruitment, training, and evaluations\n• High-volume digital admission lead engine via Online Strikers agency\n• Access to 650+ corporate placement partners and 30+ certification vouchers.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Franchise Partnerships", url: "https://www.didm.in/franchise" }],
      suggestedActions: [{ label: "Apply for Franchise", href: "/franchise" }],
    };
  }

  // 5. Careers & Job Openings
  if (["job", "jobs", "career", "careers", "hiring", "vacancy", "openings", "work at didm", "trainer job"].some((term) => q.includes(term))) {
    return {
      answer: `**Careers at DIDM:**\n\nDIDM is actively hiring across our 14 campuses for:\n• **Senior Trainers:** Performance Marketing, Google Ads, Meta Ads & AI Workflows\n• **Admissions Counsellors:** EdTech career guidance officers\n• **Technical SEO Mentors:** Semrush, Google Search Console, and Web Vitals\n• **Corporate Placement Officers:** MNC recruitment drive coordinators\n\nSend your resume directly to careers@didm.in or apply online.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Careers", url: "https://www.didm.in/careers" }],
      suggestedActions: [{ label: "View Open Positions", href: "/careers" }],
    };
  }

  // 6. 30+ Global Certifications
  if (q.includes("certif") || q.includes("credential") || q.includes("diploma")) {
    const data = getToolsAndCertifications();
    return {
      answer: `DIDM prepares students for **30+ Globally Recognized Certifications**, including:\n• **Google:** Google Ads Search, Display, Video, Apps, Shopping, Measurement & GA4\n• **Meta Blueprint:** Meta Certified Digital Marketing Associate\n• **HubSpot Academy:** Inbound Marketing, Content Marketing & Email Marketing\n• **SEMrush:** SEO Fundamentals, Technical SEO Toolkit & Competitive Analysis\n• **Microsoft Advertising:** Certified Professional (MACP)\n• **DIDM Industry Master Diploma:** Evaluated upon live client campaign defense under Online Strikers agency.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Certifications", url: "https://www.didm.in/didm-certifications" }],
      suggestedActions: [{ label: "Explore All 30+ Certifications", href: "/certifications" }],
    };
  }

  // 7. 52 Master Curriculum Checkpoints matching
  const STOP_WORDS = new Set(["for", "and", "the", "with", "from", "into", "your", "this", "that", "how", "what", "can", "our", "all"]);
  const modules = getBrochureModules52();
  const requestedNumber = q.match(/(?:module|topic|checkpoint)\s*(\d{1,2})/)?.[1];
  const exact = requestedNumber ? modules.find((item) => item.sequenceNumber === Number(requestedNumber)) : undefined;
  const matches = exact ? [exact] : modules.map((item) => ({ item, score: norm(item.originalTitle).split(" ").filter((word) => word.length > 2 && !STOP_WORDS.has(word) && qTokens.has(word)).length })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, 5).map(({ item }) => item);

  if (matches.length) return {
    answer: `The Master brochure lists these relevant checkpoints:\n\n${matches.map((item) => `• **${item.sequenceNumber}. ${item.originalTitle}** — ${item.chapter}`).join("\n")}\n\nPage 12 confirms these labels, but does not provide lesson-level descriptions. Ask admissions for the current lesson plan.`,
    source: "brochure_retrieval",
    citations: [{ label: "DIDM brochure — Master curriculum", page: 12 }],
    suggestions: ["Show checkpoint 1", "Compare the three brochure courses", "Which tools are listed?"],
    suggestedActions: [{ label: "Explore all 52 checkpoints", href: "/programs/master-in-digital-marketing-course#learning-studio" }],
  };

  if (q.includes("compare") || q.includes("advanced") || q.includes("customized") || q.includes("master course")) {
    const comparison = getCourseComparison();
    return {
      answer: `The brochure compares three tracks:\n\n${comparison.programs.map((program) => `• **${program.name}:** ${program.totalHours} total hours (${program.inClassHours} in-class + ${program.onBoardHours} onboard)`).join("\n")}\n\nUse the comparison page for the complete source matrix.`,
      source: "brochure_retrieval",
      citations: comparison.sourcePages.map((page) => ({ label: "DIDM brochure — course comparison", page })),
      suggestedActions: [{ label: "Open course comparison", href: "/compare" }],
    };
  }

  if (q.includes("tool")) {
    const data = getToolsAndCertifications();
    return {
      answer: `The brochure lists ${data.practicalTools.length} practical tools, including ${data.practicalTools.slice(0, 10).map((tool) => tool.name).join(", ")}. Its certification section states ${data.certifications.totalCount}.`,
      source: "brochure_retrieval",
      citations: data.sourcePages.map((page) => ({ label: "DIDM brochure — tools and certifications", page })),
    };
  }

  const faq = getFaqKnowledge().find((item) => item.tags.some((tag) => q.includes(norm(tag))));
  if (faq) return { answer: faq.answer, source: "brochure_retrieval", citations: [{ label: "DIDM brochure — FAQ", page: faq.sourcePage }] };

  if (["history", "mission", "workshop", "methodology", "career"].some((term) => q.includes(term))) {
    const info = getInstituteInformation();
    const historical = q.includes("history") || q.includes("workshop");
    return {
      answer: historical ? `The brochure records milestones and workshops as historical claims, including ${info.institutionalWorkshops.slice(0, 3).map((item) => item.institution).join(", ")}. They are not presented as current partnerships without editorial verification.` : `The brochure lists this methodology: ${info.trainingMethodology.pillars.join(", ")}. Career pathways include ${info.careerRoles.slice(0, 8).join(", ")}.`,
      source: "brochure_retrieval",
      citations: [{ label: "DIDM brochure — institute information", page: historical ? info.sourcePages[0] : info.trainingMethodology.sourcePage }],
    };
  }

  // Institutional awards, 2024 achievements & ecosystem
  if (["noida education conclave", "conclave 2026", "yogendra upadhyay"].some((term) => q.includes(term))) {
    return {
      answer: `**Noida Education Conclave Award 2026:**\n\n• **Title:** Best Digital Marketing Training Company\n• **Conferred by:** Shri Yogendra Upadhyay, Minister for Higher Education, Uttar Pradesh\n• **Occasion:** Noida National Education Conclave 2026\n• **Significance:** Honored for 10+ years of digital marketing excellence, live agency floor internships, and integrating Generative AI into practical curriculum.`,
      source: "verified_website_retrieval",
      citations: [
        { label: "DIDM Media Coverage — Noida Conclave Award 2026", url: "https://www.didm.in/media-coverage/noida-education-conclave-award-2026" },
        { label: "Event News Desk Report (ID: 492)", url: "https://www.didm.in/news-and-events/492" }
      ],
      suggestedActions: [{ label: "View Award Story & Photos", href: "/media-coverage/noida-education-conclave-award-2026" }],
    };
  }

  if (["hindustan times", "economic times", "business standard", "press", "news article", "original article", "publication"].some((term) => q.includes(term))) {
    return {
      answer: `**DIDM in National Press & Media Publications:**\n\n• **The Economic Times:** Covered the 25th SME Excellence Awards by WASME felicitating DIDM.\n• **Hindustan Times (Brand Post):** Spotlighted the launch of DIDM's flagship 52-module Master in Digital Marketing (MIDM) program.\n• **Business Standard:** Covered the 8th MSME Excellence Awards at Taj Mahal Hotel New Delhi where DIDM received the Fair Business Practices Award from Union Minister Bhanu Pratap Singh Verma.\n• **News 24:** Featured guidance on career transitions and performance marketing skills.\n• **Other Publications:** Asian News, ED Times, APN Live, United News of India (UNI), and The Vocal News.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Media Coverage & Press Archive", url: "https://www.didm.in/media-coverage" }],
      suggestedActions: [{ label: "Browse All Press Articles", href: "/media-coverage#press" }],
    };
  }

  if (["award", "recognition", "assocham", "wasme", "sonu sood", "ifa", "fame award", "trophy", "certificate", "photos", "award photo"].some((term) => q.includes(term))) {
    return {
      answer: `**DIDM National Awards & Accreditations (Chronological Summary):**\n\n1. **Noida Education Conclave 2026:** 'Best Digital Marketing Training Company' presented by Shri Yogendra Upadhyay (UP Higher Education Minister).\n2. **ASSOCHAM Award (3rd Time, 2023):** 9th MSME Excellence Award for Fair Business Practices.\n3. **ASSOCHAM Award (2022):** 8th MSME Excellence Award presented by Union Minister Bhanu Pratap Singh Verma at Taj Mahal Hotel New Delhi.\n4. **International Fame Awards (2021):** 'Best Digital Marketing Training Company' presented by actor Sonu Sood.\n5. **WASME SME Excellence Awards (2021):** Conferred at SCOPE Complex New Delhi; reported in The Economic Times.\n6. **ASSOCHAM Award (2018):** 'Most Promising Digital Marketing Institute of 2018' (6th SMEs Excellence Awards).\n7. **Institutional Certificates:** ASSOCHAM Certificate of Excellence, JIMS Academic Partnership, ISO 9001:2015, and Justdial #1 Most Searched Institute in Delhi NCR.\n\nYou can explore high-resolution authentic event photographs and certificates in our dedicated Media Hub.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Media Coverage & Awards Hub", url: "https://www.didm.in/media-coverage" }],
      suggestedActions: [
        { label: "View Awards Hub & Timeline", href: "/media-coverage" },
        { label: "Open Event Photo Lightbox", href: "/media-coverage#gallery" }
      ],
    };
  }

  // Convocation & Graduation Ceremonies
  if (["convocation", "graduation", "degree", "passing out", "obt batch", "convocation ceremony"].some((term) => q.includes(term))) {
    return {
      answer: `**DIDM Convocation Ceremonies & Graduation Milestones:**\n\n• **Grand Convocations:** DIDM hosts bi-annual convocation ceremonies celebrating graduating batches of the Master in Digital Marketing (MIDM) and Diploma in Digital Marketing Intelligence (DMI).\n• **July 2026 Convocation:** Recognized top performers and entrepreneurs from the OBT Batch of July 2026, awarding accredited industry certificates and practical portfolio honors.\n• **November 2025 & Earlier Convocations:** Over 10,000+ career-ready professionals graduated across Delhi NCR, UP, and Uttarakhand.\n• **Photo Archives:** You can view authentic event photographs, speeches by industry dignitaries, and student testimonials in our News & Events hub.`,
      source: "verified_website_retrieval",
      citations: [
        { label: "DIDM Convocation Ceremony July 2026", url: "https://www.didm.in/news-and-events/501" },
        { label: "DIDM Convocation Highlights 2026", url: "https://www.didm.in/news-and-events/494" },
      ],
      suggestedActions: [
        { label: "Browse Convocation Stories & Photos", href: "/news-and-events?category=Convocations+%26+Graduations" },
        { label: "View All News & Events", href: "/news-and-events" }
      ],
    };
  }

  // News, Masterclasses, & Events Archive
  if (["news", "press release", "masterclass", "events", "event", "conclave", "workshop", "announcement"].some((term) => q.includes(term))) {
    return {
      answer: `**DIDM News, Masterclasses & Event Dispatches:**\n\n• **Extensive Archive:** Over 500+ verified press releases and event stories covering campus inaugurations, masterclasses, and student achievements.\n• **Recent Highlights:**\n  - Exclusive Masterclass on *BEYOND DIGITAL: AI Mastery Session*\n  - Preet Vihar 2.0 Mega-Campus Inauguration (8 Years of Excellence)\n  - Economic Times Changemakers Feature for AI-driven education\n  - Noida Education Conclave Award 2026 felicitating DIDM\n• **Event Galleries:** Multi-photo high resolution galleries available for all major campus and convocation events.`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — News & Events Archive", url: "https://www.didm.in/news-and-events" }],
      suggestedActions: [
        { label: "Explore News & Events Hub", href: "/news-and-events" },
        { label: "View Masterclass Updates", href: "/news-and-events?category=Masterclasses+%26+Workshops" }
      ],
    };
  }

  // Business hours & Head Office
  if (["hour", "timing", "open", "sunday", "saturday", "weekend", "head office", "satya niketan"].some((term) => q.includes(term))) {
    const aboutData = getAboutUsData();
    return {
      answer: `**DIDM Operating Hours & Headquarters:**\n\n• **Weekdays (Mon–Fri):** ${aboutData.business_hours.weekdays}\n• **Weekends (Sat–Sun):** ${aboutData.business_hours.weekends}\n• **Head Office:** ${aboutData.head_office.address}\n• **Admissions Helpline:** ${aboutData.head_office.phone} (${aboutData.head_office.email})`,
      source: "verified_website_retrieval",
      citations: [{ label: "DIDM Official Website — Contact & Headquarters", url: "https://www.didm.in/about-us" }],
      suggestedActions: [{ label: "View Campus Details", href: "/centres" }],
    };
  }

  if (["centre", "center", "location"].some((term) => q.includes(term))) return { answer: `The current catalog contains ${getAllCentres().length} centre records. Confirm current batch availability with admissions.`, source: "verified_catalog", suggestedActions: [{ label: "Browse centres", href: "/centres" }] };
  if (q.includes("duration") || q.includes("hour")) return { answer: getAllCourses().slice(0, 4).map((course) => `• **${course.name}:** ${course.duration}; ${course.hours}`).join("\n"), source: "verified_catalog" };

  return { answer: "I could not find that fact in the structured brochure or verified catalog, so I won’t guess. Ask about a numbered Master checkpoint, course comparison, tools, certifications, methodology, careers, workshops, or centres.", source: "counselling_referral", suggestions: ["Show checkpoint 26", "Compare Master vs Advanced vs Customized", "Which tools are listed?"], suggestedActions: [{ label: "Contact admissions", href: "/enquire" }] };
}
