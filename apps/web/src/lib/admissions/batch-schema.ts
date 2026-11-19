import { z } from "zod";
export const BatchSchema = z.object({
  id: z.string().regex(/^[a-zA-Z0-9_-]+$/).max(100),
  courseId: z.string().min(1).max(100),
  centreId: z.string().min(1).max(100),
  mode: z.enum(["classroom", "online"]),
  days: z.enum(["weekday", "weekend"]),
  startDate: z.iso.date(),
  timing: z.string().trim().min(3).max(100),
  availability: z.enum(["open", "full"]),
  sourceUrl: z.url().refine(url => { const u = new URL(url); return u.protocol === "https:" && ["didm.in", "www.didm.in"].includes(u.hostname); }, "Use an official DIDM source URL"),
  verifiedOn: z.iso.date(),
});
export const BatchListSchema = z.object({ batches: z.array(BatchSchema).max(100) }).superRefine(({batches},ctx) => {
  if (new Set(batches.map(b => b.id)).size !== batches.length) ctx.addIssue({code:"custom",message:"Batch IDs must be unique",path:["batches"]});
  const today = new Date().toLocaleDateString("en-CA", {timeZone:"Asia/Kolkata"});
  batches.forEach((b,i) => { if (b.verifiedOn > today) ctx.addIssue({code:"custom",message:"Verification date cannot be in the future",path:["batches",i,"verifiedOn"]}); });
});
export type AdmissionBatch = z.infer<typeof BatchSchema>;
export function upcomingBatches(batches: AdmissionBatch[], today: string) {
  return batches.filter(b => b.startDate >= today).sort((a,b) => a.startDate.localeCompare(b.startDate) || a.id.localeCompare(b.id));
}
