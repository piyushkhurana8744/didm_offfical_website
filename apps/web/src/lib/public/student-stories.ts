import voices from "@/data/creative-student-voices.json";

/** Publication evidence is distinct from approval of course enrolment or career outcomes. */
export const PUBLISHED_STUDENT_REFLECTIONS = voices.map(voice => ({
  ...voice,
  slug: voice.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  sourceUrl: "https://www.didm.in/",
  sourceLabel: "DIDM’s published learner feedback",
}));
export function getStudentReflection(slug: string) {
  return PUBLISHED_STUDENT_REFLECTIONS.find(story => story.slug === slug);
}
