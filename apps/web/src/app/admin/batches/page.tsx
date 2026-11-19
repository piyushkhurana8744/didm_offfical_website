import { requireAdmin } from "@/lib/cms/auth";
import { hasPermission } from "@/lib/cms/permissions";
import { connectMongo } from "@/lib/mongodb/connection";
import { SiteSetting } from "@/lib/mongodb/models";
import { BATCH_SETTING_ID } from "@/lib/admissions/batches";
import { BatchListSchema } from "@/lib/admissions/batch-schema";
import { getAllCourses, getAllCentres } from "@/lib/content";
import { BatchEditor } from "./BatchEditor";
export default async function BatchesAdmin(){const user=await requireAdmin("courses.read");await connectMongo();const row=await SiteSetting.findById(BATCH_SETTING_ID).lean();const draft=BatchListSchema.safeParse(row?.draft??{batches:[]});return <><h1 className="text-3xl font-bold">Admissions batches</h1><p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-400">Save verified schedules as a draft. Publishing updates the public batch directory. Past start dates are automatically excluded. Publishing requires courses.publish permission.</p><BatchEditor initial={draft.success?draft.data.batches:[]} courses={getAllCourses().map(c=>({id:c.id,name:c.name}))} centres={getAllCentres().map(c=>({id:c.id,name:c.name}))} canWrite={hasPermission(user.permissions,"courses.write")} canPublish={hasPermission(user.permissions,"courses.publish")}/></>}
