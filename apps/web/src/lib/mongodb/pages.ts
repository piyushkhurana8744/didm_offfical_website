import "server-only";
import mongoose from "mongoose";
import { connectMongo } from "./connection";
import { Page, PageRevision } from "./models";
import { audit, newId } from "./repositories";
import { getVerifiedDidmMedia } from "@/data/didm-media";

export const DEFAULT_HOME_HEADING = "Master modern marketing with practical AI skills and career guidance.";
export type HomepageContent = { heroHeading: string; heroMediaId?: string };

function normalize(value: unknown): HomepageContent {
  const heading = (value as { heroHeading?: unknown } | null)?.heroHeading;
  const mediaId=(value as {heroMediaId?:unknown}|null)?.heroMediaId;
  return { heroHeading: typeof heading === "string" && heading.trim() ? heading.trim() : DEFAULT_HOME_HEADING, heroMediaId:typeof mediaId==="string"&&getVerifiedDidmMedia(mediaId)?mediaId:undefined };
}

export async function getHomepage(mode: "draft" | "published" = "published") {
  if (!process.env.MONGODB_URI) return { content: normalize(null), revision: 0, status: "static-fallback" };
  try {
    await connectMongo();
    const page = await Page.findOne({ slug: "homepage" }).lean();
    if (!page) return { content: normalize(null), revision: 0, status: "static-fallback" };
    return { content: normalize(mode === "draft" ? page.draft : page.published), revision: page.currentRevision, status: page.status };
  } catch (error) {
    console.warn("MongoDB getHomepage fallback to static content:", error);
    return { content: normalize(null), revision: 0, status: "static-fallback" };
  }
}

export async function saveHomepageDraft(heroHeading: string, heroMediaId: string | undefined, userId: string) {
  await connectMongo();
  const heading = heroHeading.trim();
  if (heading.length < 10 || heading.length > 180) throw new Error("Heading must be between 10 and 180 characters");
  if(heroMediaId&&!getVerifiedDidmMedia(heroMediaId))throw new Error("Select a verified DIDM media asset");
  const page = await Page.findOneAndUpdate(
    { slug: "homepage" },
    { $set: { title: "Homepage", draft: { heroHeading: heading,heroMediaId }, adminEdited: true, provenance: "admin" }, $setOnInsert: { _id: newId("page"), status: "draft", seo: {}, currentRevision: 0 } },
    { upsert: true, new: true, runValidators: true }
  );
  await audit({ actorUserId: userId, action: "page.draft_saved", entityType: "page", entityId: page._id });
  return page;
}

export async function publishHomepage(userId: string) {
  await connectMongo();
  const session = await mongoose.startSession();
  try {
    return await session.withTransaction(async () => {
      const page = await Page.findOne({ slug: "homepage" }).session(session);
      if (!page) throw new Error("Save a homepage draft before publishing");
      const revision = page.currentRevision + 1;
      const published = normalize(page.draft);
      await PageRevision.create([{ _id: newId("revision"), pageId: page._id, revisionNumber: revision, content: published, seo: page.seo, status: "published", createdBy: userId }], { session });
      page.published = published; page.status = "published"; page.currentRevision = revision; page.publishedAt = new Date();
      await page.save({ session });
      await audit({ actorUserId: userId, action: "page.published", entityType: "page", entityId: page._id, metadata: { revision } }, session);
      return { revision, content: published };
    });
  } finally { await session.endSession(); }
}

export async function restoreHomepage(revisionNumber: number, userId: string) {
  await connectMongo();
  const session = await mongoose.startSession();
  try {
    return await session.withTransaction(async () => {
      const page = await Page.findOne({ slug: "homepage" }).session(session);
      if (!page) throw new Error("Homepage does not exist");
      const prior = await PageRevision.findOne({ pageId: page._id, revisionNumber }).session(session).lean();
      if (!prior) throw new Error("Revision not found");
      const revision = page.currentRevision + 1;
      const restored = normalize(prior.content);
      await PageRevision.create([{ _id: newId("revision"), pageId: page._id, revisionNumber: revision, content: restored, seo: prior.seo, status: "published", createdBy: userId }], { session });
      page.draft = restored; page.published = restored; page.currentRevision = revision; page.status = "published"; page.publishedAt = new Date();
      await page.save({ session });
      await audit({ actorUserId: userId, action: "page.revision_restored", entityType: "page", entityId: page._id, metadata: { fromRevision: revisionNumber, newRevision: revision } }, session);
      return { revision, content: restored };
    });
  } finally { await session.endSession(); }
}

export async function homepageRevisions() {
  try {
    await connectMongo();
    const page = await Page.findOne({ slug: "homepage" }).lean();
    return page ? PageRevision.find({ pageId: page._id }).sort({ revisionNumber: -1 }).lean() : [];
  } catch (error) {
    console.warn("MongoDB homepageRevisions fallback:", error);
    return [];
  }
}
