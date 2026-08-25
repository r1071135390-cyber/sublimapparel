import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a data extraction assistant. Your job is to extract structured data from Proforma Invoice (PI) documents used in B2B apparel manufacturing.

Extract the following fields and return ONLY a valid JSON object (no prose, no markdown fences). If a field cannot be confidently determined, use null.

Required JSON shape:
{
  "pi_number": string | null,
  "issue_date": string | null,
  "valid_until": string | null,
  "lead_time_days": number | null,
  "payment_terms": string | null,
  "customer": {
    "name": string | null,
    "company": string | null,
    "email": string | null,
    "phone": string | null,
    "address": string | null
  },
  "items": [
    {
      "description": string,
      "fabric": string | null,
      "qty": number,
      "unit_price_cents": number
    }
  ],
  "shipping_cents": number,
  "shipping_method": string | null,
  "currency": "USD",
  "notes": string | null
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

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let textInput: string | null = null;
    let imageDataUri: string | null = null;

    if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const form = await req.formData();
      const file = form.get("file");
      const textField = form.get("text");
      if (file && typeof file === "object" && "arrayBuffer" in file) {
        const f = file as unknown as File;
        const buf = await f.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = "";
        const chunk = 0x8000;
        for (let i = 0; i < bytes.length; i += chunk) {
          binary += String.fromCharCode.apply(
            null,
            Array.from(bytes.subarray(i, i + chunk)),
          );
        }
        const base64 =
          typeof Buffer !== "undefined"
            ? Buffer.from(bytes).toString("base64")
            : btoa(binary);
        const mimeType = f.type || "image/jpeg";
        imageDataUri = `data:${mimeType};base64,${base64}`;
      } else if (typeof textField === "string") {
        textInput = textField;
      }
    } else {
      const body = (await req.json()) as {
        text?: string;
        imageData?: string;
        imageName?: string;
      };
      textInput = body.text ?? null;
      imageDataUri = body.imageData ?? null;
    }

    if (!textInput && !imageDataUri) {
      return NextResponse.json(
        { error: "Provide either 'text' or 'imageData' field" },
        { status: 400 },
      );
    }

    const { LLMClient, Config } = await import("coze-coding-dev-sdk");
    const config = new Config();
    const customHeaders: Record<string, string> = {};
    req.headers.forEach((v, k) => {
      customHeaders[k] = v;
    });
    const client = new LLMClient(config, customHeaders);

    const messages: Array<{
      role: "system" | "user";
      content:
        | string
        | Array<
            | { type: "text"; text: string }
            | { type: "image_url"; image_url: { url: string } }
          >;
    }> = [{ role: "system", content: SYSTEM_PROMPT }];

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
      temperature: 0.2,
      thinking: "disabled",
    });

    let content = response.content.trim();
    content = content
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "LLM did not return valid JSON", raw: content.slice(0, 500) },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      data: parsed,
      source: imageDataUri ? "image" : "text",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
