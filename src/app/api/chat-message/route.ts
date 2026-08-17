import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase-client";
import { sendChatNotificationEmail } from "@/lib/email";

// Email format validation
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ChatMessagePayload {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  pageUrl?: string;
}

export async function POST(req: NextRequest) {
  let body: ChatMessagePayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Trim and validate
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const topic = (body.topic ?? "").trim() || "other";
  const message = (body.message ?? "").trim();
  const pageUrl = (body.pageUrl ?? "").trim().slice(0, 500);

  if (!name || name.length > 120) {
    return NextResponse.json(
      { ok: false, error: "Name is required (max 120 chars)" },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required" },
      { status: 400 }
    );
  }
  if (!message || message.length < 4 || message.length > 4000) {
    return NextResponse.json(
      { ok: false, error: "Message is required (4-4000 chars)" },
      { status: 400 }
    );
  }

  // Insert into Supabase
  try {
    const client = getSupabaseClient(); // uses service role on server
    const { data, error } = await client
      .from("chat_messages")
      .insert({
        name,
        email,
        topic,
        message,
        page_url: pageUrl || null,
        user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("[/api/chat-message] insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to save message" },
        { status: 500 }
      );
    }

    // Send notification email to info@sublimapparel.com
    // We don't fail the request if email fails — DB record is the source of truth
    const emailResult = await sendChatNotificationEmail({
      id: data?.id ?? "",
      name,
      email,
      topic,
      message,
      pageUrl,
      userAgent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
      createdAt: data?.created_at,
    });

    return NextResponse.json({
      ok: true,
      id: data?.id,
      received_at: data?.created_at,
      email_sent: emailResult.ok,
      // Only surface email errors in dev — in prod we silently log
      ...(emailResult.ok ? {} : { email_error: "notification unavailable" }),
    });
  } catch (err) {
    console.error("[/api/chat-message] exception:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
