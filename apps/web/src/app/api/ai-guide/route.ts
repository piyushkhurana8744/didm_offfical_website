import { NextResponse } from "next/server";
import { z } from "zod";
import { callAIAgent } from "@/lib/ai-agent/provider-adapter";
import type { AIGuideResponse } from "@/types/adaptive";

// Rate limiting in-memory store
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 30;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_REQUESTS) {
    return false;
  }
  record.count += 1;
  return true;
}

const RequestSchema = z.object({
  message: z.string().trim().min(2, "Message must be at least 2 characters").max(500, "Message cannot exceed 500 characters"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(1000),
      })
    )
    .max(20)
    .optional(),
  currentProfile: z
    .object({
      visitorGoal: z.enum(["student", "career_switch", "business_owner", "freelancer", "explorer"]).optional(),
      experienceLevel: z.enum(["beginner", "intermediate", "practising"]).optional(),
      preferredLearningMode: z.enum(["classroom", "online", "either"]).optional(),
      preferredLocation: z.string().max(100).optional(),
    })
    .passthrough()
    .optional(),
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Rate limit exceeded. Please wait a moment before sending another message.",
        },
        { status: 429 }
      );
    }

    const raw = await request.json().catch(() => null);
    if (!raw) {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const parsed = RequestSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Invalid request payload",
        },
        { status: 400 }
      );
    }

    const response: AIGuideResponse = await callAIAgent(parsed.data);

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("[ai-guide route error]", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process AI guide request. Please try again or reach out to admissions.",
      },
      { status: 500 }
    );
  }
}
