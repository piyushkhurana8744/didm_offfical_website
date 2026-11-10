import { NextResponse } from "next/server";
import { assertSafeOrigin, currentAdmin, destroySession, requestIp } from "@/lib/cms/auth";
import { audit } from "@/lib/mongodb/repositories";
export async function POST(request: Request) {
  try {
    assertSafeOrigin(request);
    const user = await currentAdmin();
    await destroySession();
    if (user) await audit({ actorUserId: user.id, action: "auth.logout", entityType: "session", ipAddress: await requestIp() });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Unable to sign out." }, { status: 400 }); }
}
