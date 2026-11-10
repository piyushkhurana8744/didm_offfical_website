import { NextRequest, NextResponse } from "next/server";
import { queryCourseCounsellor } from "@/lib/counsellor/knowledge-base";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;

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
    const response = queryCourseCounsellor(cleanMessage);

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

