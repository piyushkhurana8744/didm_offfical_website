import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { assertSafeOrigin, requireApiPermission } from "@/lib/cms/auth";
import { connectMongo } from "@/lib/mongodb/connection";
import { SiteSetting } from "@/lib/mongodb/models";
import { audit } from "@/lib/mongodb/repositories";
import { BATCH_SETTING_ID } from "@/lib/admissions/batches";
import { BatchListSchema } from "@/lib/admissions/batch-schema";
import { getAllCourses, getAllCentres } from "@/lib/content";

function failure(error:unknown){return NextResponse.json({ok:false,error:error instanceof Error?error.message:"Unable to update batches"},{status:Number((error as {status?:number})?.status)||400});}
export async function PUT(request:Request){
  try {
    assertSafeOrigin(request);
    const user=await requireApiPermission("courses.write");
    const raw=await request.text();if(raw.length>100000)return NextResponse.json({ok:false,error:"Batch payload too large"},{status:413});
    const payload=BatchListSchema.parse(JSON.parse(raw));
    const courses=new Set(getAllCourses().map(c=>c.id)),centres=new Set(getAllCentres().map(c=>c.id));
    if(payload.batches.some(b=>!courses.has(b.courseId)||!centres.has(b.centreId)))throw new Error("Every batch must reference an existing course and centre");
    await connectMongo();
    const session=await mongoose.startSession();
    try{await session.withTransaction(async()=>{await SiteSetting.updateOne({_id:BATCH_SETTING_ID},{$set:{draft:payload,updatedBy:user.id}},{upsert:true,runValidators:true,session});await audit({actorUserId:user.id,action:"batches.draft_saved",entityType:"setting",entityId:BATCH_SETTING_ID,metadata:{count:payload.batches.length}},session);});}finally{await session.endSession();}
    return NextResponse.json({ok:true,message:"Draft saved. Publish separately to update the website."});
  }catch(error){return failure(error);}
}
export async function POST(request:Request){
  try{
    assertSafeOrigin(request);
    const user=await requireApiPermission("courses.publish");
    await connectMongo();const session=await mongoose.startSession();
    try{await session.withTransaction(async()=>{const record=await SiteSetting.findById(BATCH_SETTING_ID).session(session);if(!record)throw new Error("Save a draft before publishing");const payload=BatchListSchema.parse(record.draft);record.published=payload;record.updatedBy=user.id;await record.save({session});await audit({actorUserId:user.id,action:"batches.published",entityType:"setting",entityId:BATCH_SETTING_ID,metadata:{count:payload.batches.length}},session);});}finally{await session.endSession();}
    return NextResponse.json({ok:true,message:"Batch schedule published."});
  }catch(error){return failure(error);}
}
