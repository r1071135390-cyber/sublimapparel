import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  STRIPE_SECRET_KEY?: string;
  PUBLIC_URL?: string;
  COZE_SUPABASE_URL?: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY?: string;
}

const SYSTEM_PROMPT = `You are a data extraction assistant. Your job is to extract structured data from Proforma Invoice (PI) documents used in B2B apparel manufacturing.

Extract the following fields and return ONLY a valid JSON object (no prose, no markdown fences). If a field cannot be confidently determined, use null.

Required JSON shape:
{
  "pi_number": string | null,           // e.g. "SA202608250001"
  "issue_date": string | null,           // ISO date "YYYY-MM-DD" if you can infer
  "valid_until": string | null,          // ISO date or null
  "lead_time_days": number | null,       // e.g. 30
  "payment_terms": string | null,        // e.g. "100% upfront", "30% deposit + 70% before shipping"
  "customer": {
    "name": string | null,
    "company": string | null,
    "email": string | null,
    "phone": string | null,
    "address": string | null
  },
  "items": [
    {
      "description": string,             // product description
      "fabric": string | null,            // fabric / material spec if mentioned
      "qty": number,                      // integer quantity
      "unit_price_cents": number          // integer price in USD cents (e.g. $19.90 = 1990)
    }
  ],
  "shipping_cents": number,               // shipping cost in cents, 0 if none
  "shipping_method": string | null,       // e.g. "DDP by AIR"
  "currency": "USD",                      // assume USD unless clearly stated
  "notes": string | null                  // any other relevant terms/notes
}

Important rules:
- Convert all monetary values to integer cents (multiply dollar amounts by 100)
- If qty is "15 SETS", use 15 as the integer
- For multi-line items with subtotals, preserve them as separate items
- For shipping line items, put the value in shipping_cents instead of items
- PI number typically looks like "SA" + 8-digit date + 3-4 digit sequence. Preserve exactly as written.
- Return ONLY the JSON. No markdown, no commentary, no code fences.`;

const USER_PROMPT_TEXT = `Extract the Proforma Invoice data from the following text and return the JSON object as specified.

PI text:
"""
{INPUT_TEXT}
"""`;

const USER_PROMPT_IMAGE = `Extract the Proforma Invoice data from this image and return the JSON object as specified in the system prompt.`;

export const onRequestPost = async (context: EventContext<Env, string, Record<string, unknown>>): Promise<Response> => {
  const env = context.env as Env;
  const contentType = context.request.headers.get("content-type") || "";

  let textInput: string | null = null;
  let imageDataUri: string | null = null;
  let mimeType: string | null = null;

  try {
    if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const form = await context.request.formData();
      const file = form.get("file");
      const textField = form.get("text");
      if (file && typeof file === "object" && "arrayBuffer" in file) {
        const f = file as unknown as File;
        const buf = await f.arrayBuffer();
        const bytes = new Uint8Array(buf);
        // base64 encode
        let binary = "";
        const chunk = 0x8000;
        for (let i = 0; i < bytes.length; i += chunk) {
          binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
        }
        const base64 = btoa(binary);
        mimeType = f.type || "image/jpeg";
        imageDataUri = `data:${mimeType};base64,${base64}`;
      } else if (typeof textField === "string") {
        textInput = textField;
      }
    } else {
      const body = (await context.request.json()) as { text?: string; imageDataUri?: string; mimeType?: string };
      textInput = body.text ?? null;
      imageDataUri = body.imageDataUri ?? null;
      mimeType = body.mimeType ?? null;
    }

    if (!textInput && !imageDataUri) {
      return new Response(JSON.stringify({ error: "Provide either 'text' or 'file' field" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Lazy-load SDK to avoid bundling issues in non-LLM functions
    const { LLMClient, Config, HeaderUtils } = await import("coze-coding-dev-sdk");
    const config = new Config();
    const customHeaders: Record<string, string> = Object.fromEntries(context.request.headers.entries());
    const client = new LLMClient(config, customHeaders);

    const messages: Array<{ role: "system" | "user"; content: string | Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }> }> = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (imageDataUri) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: USER_PROMPT_IMAGE },
          { type: "image_url", image_url: { url: imageDataUri } },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: USER_PROMPT_TEXT.replace("{INPUT_TEXT}", textInput!),
      });
    }

    const response = await client.invoke(messages, {
      model: "doubao-seed-1-8-251228",
      temperature: 0.2, // low temperature for deterministic extraction
      thinking: "disabled",
    });

    let content = response.content.trim();
    // Strip markdown code fences if any
    content = content.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: "LLM did not return valid JSON",
          raw: content.slice(0, 500),
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: parsed, source: imageDataUri ? "image" : "text" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
