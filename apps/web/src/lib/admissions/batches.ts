import "server-only";
import { connectMongo } from "@/lib/mongodb/connection";
import { SiteSetting } from "@/lib/mongodb/models";
import { BatchListSchema, upcomingBatches } from "./batch-schema";
import { getAllCourses, getAllCentres } from "@/lib/content";
export const BATCH_SETTING_ID = "admissions-batches";
export async function getPublishedBatches() {
  const configured = process.env.CMS_USE_TEST_DATABASE === "true" ? !!process.env.TEST_MONGODB_URI : !!process.env.MONGODB_URI;
  if (!configured) return { batches: [], available: false };
  try {
    await connectMongo();
    const record = await SiteSetting.findById(BATCH_SETTING_ID).lean();
    const result = BatchListSchema.safeParse(record?.published ?? {batches:[]});
    if (!result.success) return {batches:[],available:false};
    const courses = new Set(getAllCourses().map(c=>c.id)), centres = new Set(getAllCentres().map(c=>c.id));
    const valid = result.data.batches.filter(b=>courses.has(b.courseId)&&centres.has(b.centreId));
    const today = new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Kolkata"});
    return { batches: upcomingBatches(valid,today), available: true };
  } catch { return {batches:[],available:false}; }
}
