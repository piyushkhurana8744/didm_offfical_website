import { NextRequest, NextResponse } from "next/server";
import { queryCourseCounsellor } from "@/lib/counsellor/knowledge-base";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    const history = Array.isArray(body?.history)
      ? body.history
          .filter((turn: unknown) => {
            if (!turn || typeof turn !== "object") return false;
            const candidate = turn as { role?: unknown; content?: unknown };
            return (candidate.role === "user" || candidate.role === "assistant") && typeof candidate.content === "string";
          })
          .slice(-10)
          .map((turn: { role: "user" | "assistant"; content: string }) => ({ role: turn.role, content: turn.content.slice(0, 500) }))
      : [];

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid question or query." },
        { status: 400 }
      );
    }

    // Input sanitization and length bounds
    const cleanMessage = message.trim();
    if (cleanMessage.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Query is too short." },
        { status: 400 }
      );
    }

    if (cleanMessage.length > 500) {
      return NextResponse.json(
        { ok: false, error: "Query exceeds maximum limit of 500 characters." },
        { status: 400 }
      );
    }

    // Retrieve grounded response from the trusted DIDM knowledge base
    const response = queryCourseCounsellor(cleanMessage, history);

    return NextResponse.json({
      ok: true,
      ...response,
    });
  } catch (error) {
    console.error("Course Counsellor API error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Our course counselling service is briefly busy. Please connect via our central admissions helpline at +91 88005 05151.",
      },
      { status: 500 }
    );
  }
}

