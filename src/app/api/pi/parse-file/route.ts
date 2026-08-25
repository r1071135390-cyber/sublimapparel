/**
 * POST /api/pi/parse-file
 *
 * Upload a PDF / Excel / image file → extract structured PI data via LLM.
 *
 * Request: multipart/form-data with field "file"
 *   - .pdf          → extract text via pdf-parse → LLM
 *   - .xlsx / .xls  → parse cells with xlsx (preserving red/blue/black) → LLM
 *   - image (png/jpg/jpeg/webp) → send directly to LLM vision
 *
 * Response: { success, data: { pi_number, customer, items, ... } }
 *
 * NOTE: This is the dev/Next.js variant. Production uses /functions/api/pi/parse-file.ts
 * (Cloudflare Function) which doesn't have npm packages — there we forward to a tiny
 * intermediate that asks the LLM directly. The Cloudflare function intentionally only
 * supports image+text; PDF/Excel parsing happens here.
 */

import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
// pdf-parse uses CommonJS, import default
import { PDFParse } from "pdf-parse";

const SYSTEM_PROMPT = `You are a data extraction assistant. Your job is to extract structured data from Proforma Invoice (PI) documents used in B2B apparel manufacturing.

Extract the following fields and return ONLY a valid JSON object (no prose, no markdown fences). If a field cannot be confidently determined, use null.

Required JSON shape:
{
  "pi_number": string | null,           // e.g. "SA202608250001"
  "issue_date": string | null,           // ISO date "YYYY-MM-DD" if you can infer
  "valid_until": string | null,          // ISO date or null
  "lead_time_text": string | null,       // e.g. "Within 30 days"
  "payment_terms_text": string | null,   // e.g. "The buyer should pay 100% of payment amount 3 days after confirmation of the PI..."
  "customer": {
    "name": string | null,
    "phone": string | null,
    "address": string | null
  },
  "items": [
    {
      "description": string,             // product description (men tank tops + ...)
      "fabric": string | null,            // fabric / material spec if mentioned
      "qty": number,                      // integer quantity
      "unit_price_cents": number          // integer price in USD cents (e.g. $19.90 = 1990)
    }
  ],
  "shipping_label": string | null,       // e.g. "Shipping Cost"
  "shipping_method": string | null,      // e.g. "DDP by AIR"
  "shipping_cents": number,               // shipping cost in cents, 0 if none
  "currency": "USD",
  "notes": string | null
}

Important rules:
- Convert all monetary values to integer cents (multiply dollar amounts by 100)
- If qty is "15 SETS", use 15 as the integer
- For shipping line items, put the value in shipping_cents instead of items
- PI number typically looks like "SA" + 8-digit date + 3-4 digit sequence. Preserve exactly as written.
- Return ONLY the JSON. No markdown, no commentary, no code fences.`;


export async function POST(req: NextRequest) {
  try {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }
    const file = form.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Provide a 'file' field" }, { status: 400 });
    }
    const f = file as File;
    const fileName = f.name || "file";
    const lower = fileName.toLowerCase();

    const buf = Buffer.from(await f.arrayBuffer());
    let textInput: string | null = null;
    let imageDataUri: string | null = null;
    let mimeType: string | null = null;

    if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) {
      // Excel: parse with xlsx, preserve color hints
      textInput = excelToText(buf);
    } else if (lower.endsWith(".pdf")) {
      // PDF: extract text via pdf-parse
      const parser = new PDFParse({ data: new Uint8Array(buf) });
      const parsed = await parser.getText();
      await parser.destroy();
      textInput = parsed.text;
    } else if (f.type.startsWith("image/")) {
      // Image: send to LLM vision
      const base64 = buf.toString("base64");
      mimeType = f.type;
      imageDataUri = `data:${mimeType};base64,${base64}`;
    } else {
      return NextResponse.json(
        { error: `Unsupported file type: ${f.type || fileName}` },
        { status: 400 },
      );
    }

    if (!textInput && !imageDataUri) {
      return NextResponse.json({ error: "Could not extract content from file" }, { status: 400 });
    }

    // Lazy-load SDK
    const { LLMClient, Config } = await import("coze-coding-dev-sdk");
    const config = new Config();
    const headers: Record<string, string> = {};
    req.headers.forEach((v, k) => {
      headers[k] = v;
    });
    const client = new LLMClient(config, headers);

    type MessageContent =
      | string
      | Array<
          | { type: "text"; text: string }
          | { type: "image_url"; image_url: { url: string } }
        >;
    const messages: Array<{ role: "system" | "user"; content: MessageContent }> = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (imageDataUri) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: "Extract the Proforma Invoice data from this image." },
          { type: "image_url", image_url: { url: imageDataUri } },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: `Extract the Proforma Invoice data from the following document content. Return ONLY the JSON object.

Document content:
"""
${textInput}
"""`,
      });
    }

    const response = await client.invoke(messages, {
      model: "doubao-seed-1-8-251228",
      temperature: 0.1,
      thinking: "disabled",
    });

    let content = response.content.trim();
    content = content.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();

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
      success: true,
      data: parsed,
      source: imageDataUri ? "image" : lower.endsWith(".pdf") ? "pdf" : "excel",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}

/**
 * Convert Excel sheet to a text representation that preserves color hints
 * (red text = customer fillable, blue text = bank info, black = fixed).
 * This helps the LLM understand which cells are editable.
 */
function excelToText(buf: Buffer): string {
  const wb = XLSX.read(buf, { type: "buffer", cellStyles: true });
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  const range = XLSX.utils.decode_range(sheet["!ref"] || "A1");

  const lines: string[] = [];
  lines.push(`# Sheet: ${sheetName}`);
  lines.push("");

  for (let r = range.s.r; r <= range.e.r; r++) {
    const rowCells: string[] = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell: any = sheet[addr];
      if (!cell) continue;
      const v = String(cell.v).replace(/\n/g, " ").trim();
      if (!v) continue;

      // Get font color (xlsx.js exposes it via cell.s.font.color)
      let marker = ""; // default: black (fixed)
      const color = cell.s?.font?.color;
      if (color) {
        const rgb = typeof color === "object" ? color.rgb : color;
        if (typeof rgb === "string") {
          if (rgb.toUpperCase().includes("FF0000") || rgb.toUpperCase().includes("FFFF0000")) {
            marker = "[RED-customer-fillable] ";
          } else if (rgb.toUpperCase().includes("0070C0") || rgb.toUpperCase().includes("FF0070C0")) {
            marker = "[BLUE-bank-info] ";
          }
        }
      }
      rowCells.push(`${addr}: ${marker}${v}`);
    }
    if (rowCells.length > 0) {
      lines.push(`Row ${r + 1}: ${rowCells.join(" | ")}`);
    }
  }
  return lines.join("\n");
}
