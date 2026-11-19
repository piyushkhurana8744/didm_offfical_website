import type { CounsellorResponse } from "./knowledge-base";

export interface CounsellorTurn {
  role: "user" | "assistant";
  content: string;
}

const response = (
  answer: string,
  suggestions?: string[],
  suggestedActions?: Array<{ label: string; href: string }>,
): CounsellorResponse => ({
  answer,
  source: "verified_catalog",
  suggestions,
  suggestedActions,
});

const normalize = (value: string) => value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9\u0900-\u097f]+/g, " ").trim();
const has = (q: string, terms: string[]) => terms.some((term) => q.includes(term));

function isEnglish(raw: string) {
  const q = normalize(raw);
  const englishSignals = ["what", "which", "where", "when", "how", "tell", "course", "fees", "placement", "hello", "thanks", "human"];
  const hinglishSignals = ["hai", "bata", "mujhe", "kaise", "kya", "mein", "karna", "chahiye", "kitni", "bhai"];
  return englishSignals.some((word) => q.split(" ").includes(word)) && !hinglishSignals.some((word) => q.split(" ").includes(word));
}

function detectedGoal(history: CounsellorTurn[]) {
  const text = normalize(history.filter((turn) => turn.role === "user").map((turn) => turn.content).join(" "));
  if (has(text, ["business", "dukan", "shop", "startup", "company", "leads", "customers"])) return "business";
  if (has(text, ["freelanc", "clients", "portfolio"])) return "freelance";
  if (has(text, ["job", "career switch", "placement", "naukri", "salary"])) return "job";
  return undefined;
}

function courseFrom(q: string, history: CounsellorTurn[]) {
  const all = `${normalize(history.filter((turn) => turn.role === "user").map((turn) => turn.content).join(" "))} ${q}`;
  if (has(all, ["dmi", "digital marketing intelligence", "one year diploma", "1 year diploma"])) return "dmi";
  if (has(all, ["advanced", "aidm", "aimtp"])) return "advanced";
  if (has(all, ["professional", "customised", "customized", "short course"])) return "professional";
  if (has(all, ["gen ai", "ai camp", "prompt engineering"])) return "genai";
  if (has(all, ["midm", "master", "digital marketing course"])) return "midm";
  return undefined;
}

function nearestCentre(q: string) {
  const groups: Array<[string[], string]> = [
    [["laxmi nagar", "mayur vihar", "shahdara", "anand vihar", "east delhi"], "Preet Vihar"],
    [["janakpuri", "tilak nagar", "punjabi bagh", "west delhi"], "Rajouri Garden"],
    [["rohini", "shalimar bagh", "model town", "north delhi", "north west"], "Pitampura"],
    [["dwarka", "palam", "uttam nagar"], "Dwarka"],
    [["noida", "ghaziabad"], "Noida"],
    [["gurgaon", "gurugram", "faridabad"], "Gurgaon"],
    [["south delhi", "south extension"], "South Extension"],
  ];
  return groups.find(([areas]) => has(q, areas))?.[1];
}

/** Chat-ready counselling rules distilled from DIDM's approved 10 Nov 2026 training pack. */
export function queryTrainedCounsellor(query: string, history: CounsellorTurn[] = []): CounsellorResponse | undefined {
  const q = normalize(query);
  const english = isEnglish(query);
  const goal = detectedGoal([...history, { role: "user", content: query }]);
  const course = courseFrom(q, history);

  if (/^(hi+|hello+|hey+|hii+|hlo+|namaste|namaskar|good (morning|afternoon|evening))(\s+(bhai+|ji+|sir+|mam+|maam+|didi+))?[ !.]*$/.test(query.trim().toLowerCase())) {
    return response(
      english
        ? "Hello! I’m Ananya, DIDM’s AI admissions counsellor. I can help with courses, fees, batches, centres and career options. What would you like to know?"
        : "Hi! Main Ananya, DIDM ki AI admissions counsellor hoon 😊 Courses, fees, batches, centres ya career options—kis baare mein jaanna hai?",
      english ? ["Which course is right for me?", "Tell me the fees", "Find my nearest centre"] : ["Mere liye kaunsa course sahi hai?", "Fees batao", "Nearest centre batao"],
    );
  }

  if (has(q, ["thank you", "thanks", "shukriya", "dhanyavad", "dhanyawaad"]))
    return response(english ? "You’re welcome! Whenever you need course or admission guidance, I’m here." : "Aapka welcome hai 😊 Course ya admission se related koi bhi help chahiye ho, main yahin hoon.");

  if (has(q, ["how are you", "kaise ho", "kaisi ho", "kya haal"]))
    return response(english ? "I’m doing well and ready to help 😊 What would you like to know about DIDM?" : "Main badhiya hoon aur help ke liye ready hoon 😊 DIDM ke baare mein kya jaanna hai?");

  if (has(q, ["are you ai", "are you a bot", "are you human", "bot ho", "ai ho", "human ho"]))
    return response(english ? "I’m DIDM’s AI assistant. A human counsellor is available any time—what would you like help with?" : "Main DIDM ki AI assistant hoon. Human counsellor bhi kabhi bhi help kar sakte hain—aapko kis cheez ki information chahiye?");

  if (has(q, ["stop messaging", "stop calling", "dont contact", "do not contact", "call mat", "message mat", "ab contact mat", "bakwas", "abuse"]))
    return response(english ? "Sorry for disturbing you. Your request not to be contacted is noted." : "Disturb karne ke liye maafi. Aapko contact na karne ki request note kar li gayi hai.");

  if (has(q, ["human", "real person", "counsellor se", "counselor se", "baat karni hai", "call me"]))
    return response(
      english ? "A human counsellor is available at +91 99712 59994 from 10 AM to 8 PM. Outside these hours, we can arrange a callback the next morning—what time suits you?" : "Human counsellor se +91 99712 59994 par 10 AM–8 PM baat ho sakti hai. Iske baad next morning callback arrange ho sakta hai—kaunsa time theek rahega?",
      undefined,
      [{ label: "Call a counsellor", href: "tel:+919971259994" }],
    );

  if (has(q, ["project unnati", "mou", "college partnership", "college tie up", "government approval", "partner terms", "franchise", "internal staff", "manager", "admin kaun", "team member"]))
    return response(english ? "I can only help with DIDM courses and digital marketing careers. For institutional or partnership queries, please email services@didm.in or call +91 88005 05151." : "Main DIDM courses aur digital marketing careers mein help kar sakti hoon. Institutional ya partnership query ke liye services@didm.in par email karein ya +91 88005 05151 par call karein.");

  if (has(q, ["python", "write code", "script bana", "weather", "politics", "recipe"]))
    return response(english ? "I can help only with DIDM courses and digital marketing careers. Which course would you like to explore?" : "Main sirf DIDM courses aur digital marketing careers mein help kar sakti hoon. Aap kaunsa course explore karna chahte hain?");

  if (has(q, ["not interested", "interested nahi", "nahi chahiye"]))
    return response(english ? "Has something changed since your enquiry, or is the concern fees or time?" : "Enquiry ke baad kuch change hua hai, ya concern fees ya time ko lekar hai?");

  if (has(q, ["already joined", "join kar liya", "dusre institute", "another institute"]))
    return response(english ? "All the best with your course. If you ever need an add-on AI or advanced course, DIDM is here." : "Aapke course ke liye all the best. Kabhi add-on AI ya advanced course chahiye ho, DIDM available hai.");

  if (has(q, ["busy", "baad me", "later", "meeting", "driving"]))
    return response(english ? "A counsellor can call you later. What time works for you?" : "Counsellor aapko baad mein call kar sakte hain. Kaunsa time theek rahega?");

  if (has(q, ["guaranteed", "guarantee", "placement pakki", "job pakki"])) {
    if (course === "dmi") return response(english ? "DMI offers an eligible student a Pre-Placement Offer opportunity, not a guaranteed job. It depends on eligibility, performance and official terms, with placement sessions, a 2-month paid internship and up to ₹10,000 stipend under internship terms." : "DMI mein eligible students ko Pre-Placement Offer ka opportunity milta hai, guaranteed job nahi. Ye eligibility, performance aur official terms par depend karta hai; saath mein placement sessions aur 2-month paid internship mein terms ke under ₹10,000 tak stipend hai.");
    return response(english ? "DIDM provides placement assistance, not a job guarantee: a dedicated placement cell, CV building, mock interviews, interview preparation and access to 650+ hiring partners. The final result depends on the student’s skills and interview." : "DIDM placement assistance deta hai, job guarantee nahi: dedicated placement cell, CV building, mock interviews, interview preparation aur 650+ hiring partners ka support milta hai. Final result student ki skills aur interview par depend karta hai.");
  }

  if (has(q, ["1 lakh salary", "one lakh salary", "salary milegi", "package", "kitni salary"]))
    return response(english ? "No fixed salary can be promised. It depends on your practical skills, portfolio, role, location and interview performance; DIDM supports you with CV, mock interviews and placement preparation." : "Fixed salary promise nahi ki ja sakti. Ye practical skills, portfolio, role, location aur interview performance par depend karti hai; DIDM CV, mock interviews aur placement preparation mein support karta hai.");

  if (has(q, ["too expensive", "fees high", "fee high", "fees zyada", "fee zyada", "discount"]))
    return response(course === "dmi"
      ? (english ? "DMI’s value includes a university diploma, PPO opportunity, paid internship, experience certificate, paid tools and hosting. Some students may get freelance projects, and internship stipend can be up to ₹10,000 under its terms; none is guaranteed. Admissions can confirm any current offer during counselling." : "DMI ki value mein university diploma, PPO opportunity, paid internship, experience certificate, paid tools aur hosting hain. Kuch students ko freelance projects mil sakte hain, aur internship terms mein stipend ₹10,000 tak ho sakta hai; kuch bhi guaranteed nahi hai. Current offer admissions counselling mein confirm karegi.")
      : (english ? "The fee covers structured practical training, live projects, certifications and placement assistance. Student or festival offers may be available, and admissions confirms them during branch counselling." : "Fee mein structured practical training, live projects, certifications aur placement assistance cover hoti hai. Student ya festival offers available ho sakte hain; admissions branch counselling mein confirm karti hai."));

  if (course === "dmi" && has(q, ["cheaper", "sasta", "other institute", "dusra institute"]))
    return response(english ? "Compare whether the other diploma is awarded by a UGC-recognised university, its classroom-plus-Agency-Floor methodology, career benefits and practical resources. DIDM won’t criticise another institute; choose on verified value and fit." : "Compare karein ki doosra diploma UGC-recognised university award karti hai ya nahi, aur uski classroom-plus-Agency-Floor methodology, career benefits aur practical resources kya hain. DIDM kisi institute ko criticise nahi karta; verified value aur fit par choose karein.");

  if (has(q, ["fee", "fees", "fees kitni", "fee kitni", "cost", "price", "charges", "paise"])) {
    const answers: Record<string, [string, string]> = {
      dmi: ["DMI fee is ₹1,67,518 as listed; admissions confirms payment options.", "DMI ki listed fee ₹1,67,518 hai; payment options admissions team confirm karegi."],
      midm: ["MIDM classroom fee is ₹68,661 in one payment or ₹72,201 in two instalments. Online it is ₹57,218, or ₹60,758 in two instalments.", "MIDM classroom fee ₹68,661 one payment ya ₹72,201 two instalments mein hai. Online ₹57,218, ya two instalments mein ₹60,758 hai."],
      advanced: ["Advanced course fee is ₹52,250 in one payment or ₹55,755 in two instalments. Online it is ₹45,418, or ₹48,958 in two instalments.", "Advanced course fee ₹52,250 one payment ya ₹55,755 two instalments mein hai. Online ₹45,418, ya two instalments mein ₹48,958 hai."],
      professional: ["The customised course is listed at ₹24,804. The online Professional course is ₹20,671, or ₹24,211 in two instalments.", "Customised course ki listed fee ₹24,804 hai. Online Professional course ₹20,671, ya two instalments mein ₹24,211 hai."],
      genai: ["The 2-week Gen AI Knowledge Camp is listed at ₹1,999.", "2-week Gen AI Knowledge Camp ki listed fee ₹1,999 hai."],
    };
    if (course && answers[course]) return response(answers[course][english ? 0 : 1] + (english ? " Offers, if available, are confirmed by admissions." : " Available offers admissions team confirm karti hai."));
    return response(english ? "Which course fee do you need—DMI, MIDM, Advanced, Professional or Gen AI Camp?" : "Aapko kis course ki fee chahiye—DMI, MIDM, Advanced, Professional ya Gen AI Camp?");
  }

  if (has(q, ["duration", "how long", "kitne month", "kitna time", "kitne din", "kab tak", "months ka", "month ka"])) {
    const durations: Record<string, [string, string]> = {
      dmi: ["DMI is a 1-year, 52-week diploma with 400+ hours of hands-on training.", "DMI 1-year yani 52-week diploma hai, jisme 400+ hours ki hands-on training hoti hai."],
      midm: ["MIDM takes 3 months in a regular batch or 6 months on weekends, followed by a 2-month live agency internship.", "MIDM regular batch mein 3 months ya weekend batch mein 6 months ka hai; iske baad 2-month live agency internship hoti hai."],
      advanced: ["The Advanced course takes 3 months in a regular batch or 6 months on weekends, with about 140 training hours.", "Advanced course regular batch mein 3 months ya weekend batch mein 6 months ka hai, with around 140 training hours."],
      professional: ["The Professional/Customised course takes 1–2 months, depending on the modules you choose.", "Professional/Customised course selected modules ke according 1–2 months ka hota hai."],
      genai: ["The Gen AI Knowledge Camp is an intensive 2-week course.", "Gen AI Knowledge Camp intensive 2-week course hai."],
    };
    if (course && durations[course]) return response(durations[course][english ? 0 : 1]);
    return response(english ? "Duration depends on the course: DMI is 1 year, MIDM and Advanced are 3 months regular or 6 months weekend, Professional is 1–2 months, and Gen AI Camp is 2 weeks. Which one are you considering?" : "Duration course par depend karti hai: DMI 1 year, MIDM/Advanced 3 months regular ya 6 months weekend, Professional 1–2 months aur Gen AI Camp 2 weeks ka hai. Aap kaunsa consider kar rahe hain?");
  }

  if (has(q, ["what will i learn", "what is covered", "syllabus", "modules", "kya sikh", "kya padh", "kya cover", "andar kya", "isme kya"])) {
    if (course === "dmi") return response(english ? "DMI covers digital architecture, AI tools, consumer psychology, SEO, social media, influencer outreach, Google Ads, conversion optimisation, funnels, freelancing and a final specialisation in AI-SEO, social growth or performance marketing—all with assignments and Agency Floor projects." : "DMI mein digital architecture, AI tools, consumer psychology, SEO, social media, influencer outreach, Google Ads, conversion optimisation, funnels, freelancing aur final specialisation—AI-SEO, social growth ya performance marketing—assignments aur Agency Floor projects ke saath cover hota hai.");
    if (course === "genai") return response(english ? "The Gen AI Camp covers generative AI basics, prompting, content creation, social automation, AI image/video tools, and AI use for business and marketing, with practical case studies." : "Gen AI Camp mein generative AI basics, prompting, content creation, social automation, AI image/video tools aur business/marketing mein AI ka practical use cover hota hai.");
    if (course === "professional") return response(english ? "The Professional course is customised: you choose the modules you need, get fast-track practical sessions, live projects, two add-on modules, tools support and e-notes." : "Professional course customised hota hai: aap required modules choose karte hain, saath mein fast-track practical sessions, live projects, 2 add-on modules, tools support aur e-notes milte hain.");
    return response(english ? "The course covers SEO, Google Ads, social media, content and email marketing, analytics, no-code website building, AI tools, live projects and interview/freelancing preparation. Which course syllabus do you want—MIDM, Advanced or DMI?" : "Course mein SEO, Google Ads, social media, content/email marketing, analytics, bina coding website, AI tools, live projects aur interview/freelancing preparation cover hoti hai. Aapko MIDM, Advanced ya DMI ka syllabus chahiye?");
  }

  if (has(q, ["internship", "live project", "practical", "experience certificate", "agency floor"])) {
    if (course === "dmi") return response(english ? "DMI includes classroom plus Agency Floor learning, real-brand projects, a 2-month paid internship under its terms, and a 6-month experience certificate. The stipend can be up to ₹10,000 under internship terms; it is not guaranteed or monthly." : "DMI mein classroom plus Agency Floor learning, real-brand projects, terms ke under 2-month paid internship aur 6-month experience certificate milta hai. Stipend internship terms mein ₹10,000 tak ho sakta hai; ye guaranteed ya monthly nahi hai.");
    return response(english ? "MIDM includes a 2-month live agency internship with Online Strikers. Students work on practical projects and build a portfolio; internship and certificate details depend on the selected course." : "MIDM mein Online Strikers ke saath 2-month live agency internship hoti hai. Students practical projects par kaam karke portfolio banate hain; internship aur certificate details selected course par depend karti hain.");
  }

  if (has(q, ["certificate", "certification", "diploma valid", "recognised", "recognized", "ugc"])) {
    if (course === "dmi") return response(english ? "DMI is awarded by UGC-recognised Kalinga University through its collaboration with DIDM. UGC recognition does not guarantee acceptance by every employer or country, so verify it for your specific purpose." : "DMI diploma DIDM ke collaboration mein UGC-recognised Kalinga University award karti hai. UGC recognition ka matlab har employer ya country mein automatic acceptance nahi hota, isliye apne specific purpose ke liye verify karein.");
    return response(english ? "DIDM courses include course-specific DIDM and industry certifications; MIDM includes 30+ certifications, including Google-related credentials. Certification count and eligibility depend on the selected course." : "DIDM courses mein course-specific DIDM aur industry certifications milti hain; MIDM mein Google-related credentials ke saath 30+ certifications hain. Exact count aur eligibility selected course par depend karti hai.");
  }

  if (has(q, ["online", "classroom", "offline", "ghar se", "distance", "too far", "bahut dur", "bahut door"]))
    return response(english ? "Classroom and live online options are available with the same training quality, live projects and certificate. DMI classroom training is only at South Extension; for other courses, I can suggest the nearest centre if you share your area." : "Classroom aur live online dono options same training quality, live projects aur certificate ke saath available hain. DMI classroom sirf South Extension mein hota hai; baaki courses ke liye area bata dein to nearest centre suggest karungi.");

  if (has(q, ["eligib", "who can join", "can i join", "mai kar sakta", "main kar sakta", "kar sakti", "12th", "graduate", "degree", "coding", "technical background"]))
    return response(english ? "Students, graduates, job seekers, working professionals, business owners, freelancers and homemakers can join. No coding or technical background is required; basic computer and internet skills are enough." : "Students, graduates, job seekers, working professionals, business owners, freelancers aur homemakers join kar sakte hain. Coding ya technical background required nahi hai; basic computer aur internet skills enough hain.");

  if (course === "dmi" && has(q, ["what is", "batao", "details", "course", "dmi"]))
    return response(english ? "DMI is the Digital Marketing Intelligence Diploma in Digital Marketing, offered through DIDM’s collaboration with UGC-recognised Kalinga University, which awards the diploma. It includes a PPO opportunity, 2-month paid internship, 6-month experience certificate, hosting, 30+ paid tools, live campaigns and AI-led practical training. It is taught only at South Extension. What is your main goal—job, business or freelancing?" : "DMI, Digital Marketing Intelligence Diploma in Digital Marketing hai, jo DIDM aur UGC-recognised Kalinga University ke collaboration se hota hai; diploma university award karti hai. Isme PPO opportunity, 2-month paid internship, 6-month experience certificate, hosting, 30+ paid tools, live campaigns aur AI practical training milti hai. Ye sirf South Extension mein hota hai. Aapka main goal job, business ya freelancing hai?");

  if (has(q, ["recording", "lms", "live class video"]))
    return response(english ? "The LMS provides pre-recorded expert videos that you can watch anytime. A recording of every live class cannot be promised; backup and doubt-clearing sessions are available." : "LMS par pre-recorded expert videos kabhi bhi dekh sakte hain. Har live class ki recording promise nahi ki ja sakti; backup aur doubt-clearing sessions available hain.");

  const centre = nearestCentre(q);
  if (centre || has(q, ["nearest", "centre", "center", "branch", "near me"])) {
    if (course === "dmi") return response(english ? "DMI is taught only at the South Extension branch: K-16, 2nd Floor, South Extension Part 1, New Delhi." : "DMI sirf South Extension branch mein hota hai: K-16, 2nd Floor, South Extension Part 1, New Delhi.");
    if (centre) return response(english ? `The nearest DIDM centre for your area is ${centre}. Classroom and online options are available—would you prefer a free counselling session or demo?` : `Aapke area ke liye nearest DIDM centre ${centre} hai. Classroom aur online dono options hain—free counselling session prefer karenge ya demo?`);
    return response(english ? "Tell me your area or city and I’ll suggest the nearest DIDM centre. If none is convenient, live online classes are available." : "Apna area ya city bataiye, main nearest DIDM centre suggest karungi. Convenient na ho to live online classes bhi available hain.");
  }

  if (has(q, ["no time", "working professional", "weekend", "sunday", "late evening", "timing"]))
    return response(english ? "Working professionals can choose late-evening, weekend, Sunday-only or online batches. Batch, timing and centre switching options are also available; admissions confirms the current schedule." : "Working professionals ke liye late-evening, weekend, Sunday-only aur online batches hain. Batch, timing aur centre switching options bhi available hain; current schedule admissions confirm karti hai.");

  if (has(q, ["parents", "parent", "spouse", "family decide", "ghar wale"]))
    return response(english ? "Your family is welcome to join the free counselling session, so fees, course fit and outcomes can be discussed clearly. Which day suits your family?" : "Aapki family free counselling session mein saath aa sakti hai, jahan fees, course fit aur outcomes clearly discuss honge. Family ke liye kaunsa din theek rahega?");

  if (goal === "business") return response(english ? "For a business, the course focuses on online presence, SEO, paid ads, social media, content and reading campaign results, helping you depend less on agencies—without promising leads or revenue. Is your business already running, or are you planning to start?" : "Business ke liye course online presence, SEO, paid ads, social media, content aur campaign results samajhna sikhata hai, jisse agency dependence kam ho sakti hai—leads ya revenue guarantee nahi hoti. Business already running hai ya start karne ka plan hai?");
  if (goal === "freelance") return response(english ? "For freelancing, you learn client-ready SEO, social media, ads and content, build a portfolio through live projects, and practise finding and pitching clients. Earnings are not guaranteed. Are you starting from scratch or already working with clients?" : "Freelancing ke liye client-ready SEO, social media, ads aur content, live projects se portfolio, aur clients find/pitch karna seekhte hain. Earnings guarantee nahi hoti. Aap scratch se start kar rahe hain ya clients ke saath kaam karte hain?");
  if (goal === "job") return response(english ? "For a job goal, DIDM focuses on practical skills, live projects, portfolio building, CV support, mock interviews and placement assistance through 650+ hiring partners. A job or salary is not guaranteed. Which course or duration are you considering?" : "Job goal ke liye DIDM practical skills, live projects, portfolio, CV support, mock interviews aur 650+ hiring partners ke through placement assistance deta hai. Job ya salary guarantee nahi hoti. Aap kis course ya duration ko consider kar rahe hain?");

  if (has(q, ["digital marketing course", "course ke bare", "course ke baare", "course batao", "which course", "best course"]))
    return response(english ? "DIDM offers DMI, a 1-year university diploma; MIDM, a practical AI-powered flagship course with 50+ modules and live internship; shorter Advanced and Professional tracks; and a 2-week Gen AI Camp. Your best fit depends on your goal. Is it a job, business, freelancing or upskilling?" : "DIDM mein 1-year university diploma DMI, 50+ modules aur live internship wala practical AI-powered MIDM, shorter Advanced/Professional courses aur 2-week Gen AI Camp hain. Best fit aapke goal par depend karta hai. Goal job, business, freelancing ya upskilling hai?");

  return response(
    english
      ? "I don’t have a verified answer for that, so I won’t guess. I can help with DIDM courses, fees, syllabus, duration, batches, centres, internships and placement support—could you rephrase your question with the course name?"
      : "Iska verified answer mere paas nahi hai, isliye guess nahi karungi. Main DIDM courses, fees, syllabus, duration, batches, centres, internship aur placement support mein help kar sakti hoon—course name ke saath question dobara bata denge?",
    english ? ["Compare DIDM courses", "Tell me the fees", "Find my nearest centre"] : ["DIDM courses compare karo", "Fees batao", "Nearest centre batao"],
  );
}
