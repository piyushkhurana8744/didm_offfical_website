import { NextResponse } from "next/server";
import { assertSafeOrigin, clearLoginFailures, createSession, loginAllowed, recordLoginFailure, requestIp, verifyPassword } from "@/lib/cms/auth";
import { connectMongo } from "@/lib/mongodb/connection";
import { User } from "@/lib/mongodb/models";
import { audit } from "@/lib/mongodb/repositories";
import { z } from "zod";
const LoginSchema=z.object({email:z.string().email().max(254),password:z.string().min(1).max(1024)});

export async function POST(request: Request) {
  try {
    assertSafeOrigin(request);
    const ip = await requestIp();
    const body = LoginSchema.parse(await request.json());
    const email = body.email.trim().toLowerCase();
    const password = body.password;
    const key = `${ip}:${email}`;
    if (!await loginAllowed(key)) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
    await connectMongo();
    const row = await User.findOne({ email }).select("+passwordHash +passwordSalt").lean();
    const valid = row && !row.disabled && verifyPassword(password, row.passwordSalt, row.passwordHash);
    if (!valid) {
      await recordLoginFailure(key);
      await audit({ action: "auth.login_failed", entityType: "user", metadata: { email }, ipAddress: ip });
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    await clearLoginFailures(key);
    await createSession(row!._id);
    await audit({ actorUserId: row!._id, action: "auth.login", entityType: "session", ipAddress: ip });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = Number((error as { status?: number }).status) || 400;
    return NextResponse.json({ error: "Unable to sign in." }, { status });
  }
}
