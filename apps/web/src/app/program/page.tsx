import { redirect } from "next/navigation";
import { getCourseBySlug } from "@/lib/content";

interface ProgramPageProps {
  searchParams: Promise<{ p?: string }>;
}

export default async function LegacyProgramRoute({ searchParams }: ProgramPageProps) {
  const { p } = await searchParams;
  const course = getCourseBySlug(p || "midm");

  if (course) {
    redirect(`/programs/${course.slug}`);
  }

  redirect("/programs");
}
