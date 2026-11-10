import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type { EnquiryPayload, EnquiryResponse } from "@/types/backend";
import { SITE_BRAND } from "@/lib/content";
import { countRecentWebsiteLeads, createWebsiteLead } from "@/lib/mongodb/repositories";
import { z } from "zod";
const EnquirySchema=z.object({name:z.string().trim().min(2).max(120),phone:z.string().max(30),email:z.string().trim().email().max(254).optional().or(z.literal("")),courseId:z.string().max(100).optional(),centreId:z.string().max(100).optional(),preferredBatch:z.string().max(120).optional(),consent:z.literal(true),sourceUrl:z.string().url().max(1000).optional()});
function clean(value: unknown, max: number) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
const assisted=(message:string)=>({success:false,message,mode:"direct_assisted",counselorContact:{phone:SITE_BRAND.phone,whatsappUrl:SITE_BRAND.whatsapp}} satisfies EnquiryResponse);
export async function POST(request: Request) {
 try { const body=EnquirySchema.parse(await request.json()) as EnquiryPayload; const name=clean(body.name,120),phone=clean(body.phone,20).replace(/[^0-9+]/g,""),email=clean(body.email,254);
  if(name.length<2||phone.replace(/\D/g,"").length<10||body.consent!==true)return NextResponse.json(assisted("Valid name, phone and consent are required."),{status:400});
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json(assisted("Enter a valid email address."),{status:400});
  const h=await headers(),ip=h.get("x-forwarded-for")?.split(",")[0]?.trim()||"local",ipHash=createHash("sha256").update(ip).digest("hex"),cutoff=new Date(Date.now()-15*60_000);
  const recent=await countRecentWebsiteLeads(ipHash,cutoff);
  if(recent>=5)return NextResponse.json(assisted("Too many requests. Please call the admissions team."),{status:429});
  const id=await createWebsiteLead({name,email:email||undefined,phone,interestedCourse:clean(body.courseId,100),preferredCentre:clean(body.centreId,100),sourceUrl:clean(body.sourceUrl,1000)||undefined,ipHash,preferredBatch:clean(body.preferredBatch,120)});
  return NextResponse.json({success:true,enquiryId:id,mode:"crm_queued",message:"Your enquiry has been securely registered.",counselorContact:{phone:SITE_BRAND.phone,whatsappUrl:SITE_BRAND.whatsapp}} satisfies EnquiryResponse,{status:201});
 } catch{return NextResponse.json(assisted("We could not save your enquiry. Please call the admissions team."),{status:500});}
}
