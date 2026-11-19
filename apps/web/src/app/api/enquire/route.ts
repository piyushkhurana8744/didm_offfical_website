import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import type { EnquiryResponse } from "@/types/backend";
import { SITE_BRAND } from "@/lib/content";
import { countRecentWebsiteLeads, createWebsiteLead } from "@/lib/mongodb/repositories";
import { z } from "zod";

const EnquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().max(30).transform(value=>value.replace(/[^0-9+]/g,"")).refine(value=>/^\+?[0-9]{10,15}$/.test(value),"Enter a valid phone number"),
  email: z.string().trim().email().max(254).optional().or(z.literal("")),
  courseId: z.string().max(100).optional(),
  centreId: z.string().max(100).optional(),
  preferredBatch: z.string().max(120).optional(),
  consent: z.literal(true),
  sourceUrl: z.url().max(1000).optional(),
  message: z.string().trim().max(4000).optional(),
  organization: z.string().trim().max(200).optional(),
  formType: z.string().regex(/^[a-z0-9_-]{1,60}$/).optional(),
  website: z.string().max(0).optional(),
  utmParams: z.object({utm_source:z.string().max(200).optional(),utm_medium:z.string().max(200).optional(),utm_campaign:z.string().max(200).optional(),utm_term:z.string().max(200).optional(),utm_content:z.string().max(200).optional()}).optional(),
});
const assisted = (message:string):EnquiryResponse => ({success:false,message,mode:"direct_assisted",counselorContact:{phone:SITE_BRAND.phone,whatsappUrl:SITE_BRAND.whatsapp}});

export async function POST(request:Request) {
  let payload:unknown;
  try {
    const raw=await request.text();
    if(raw.length>16000)return NextResponse.json(assisted("Your request is too large. Please shorten your message."),{status:413});
    payload=JSON.parse(raw);
  } catch { return NextResponse.json(assisted("Please send a valid enquiry."),{status:400}); }
  const parsed=EnquirySchema.safeParse(payload);
  if(!parsed.success)return NextResponse.json(assisted("Check your name, phone, email and privacy consent, then try again."),{status:400});
  const body=parsed.data;
  try {
    const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"local";
    const ipHash=createHash("sha256").update(ip).digest("hex");
    const recent=await countRecentWebsiteLeads(ipHash,new Date(Date.now()-15*60_000));
    if(recent>=5)return NextResponse.json(assisted("Too many requests. Please call the admissions team."),{status:429,headers:{"Retry-After":"900"}});
    const id=await createWebsiteLead({name:body.name,phone:body.phone,email:body.email||undefined,interestedCourse:body.courseId?.trim(),preferredCentre:body.centreId?.trim(),sourceUrl:body.sourceUrl,ipHash,preferredBatch:body.preferredBatch?.trim(),message:body.message,organization:body.organization,utmParams:body.utmParams,formType:body.formType||"website-enquiry"});
    return NextResponse.json({success:true,enquiryId:id,mode:"crm_queued",message:"Your enquiry has been securely registered. Admissions will confirm your preferences.",counselorContact:{phone:SITE_BRAND.phone,whatsappUrl:SITE_BRAND.whatsapp}} satisfies EnquiryResponse,{status:201});
  } catch { return NextResponse.json(assisted("We could not save your enquiry. Please call the admissions team."),{status:503}); }
}
