import { NextResponse } from "next/server";

const MAX_FILES = 5;
const MAX_SIZE_MB = 25;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".pdf", ".ai", ".eps", ".psd", ".svg", ".tif", ".tiff"];

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const fd = await request.formData();

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const product = String(fd.get("product") ?? "").trim();
    const quantity = String(fd.get("quantity") ?? "").trim();
    const printProcess = String(fd.get("process") ?? "").trim();
    const fabric = String(fd.get("fabric") ?? "").trim();
    const designStatus = String(fd.get("designStatus") ?? "").trim();
    const sizeBreakdown = String(fd.get("sizeBreakdown") ?? "").trim();
    const shipCountry = String(fd.get("shipCountry") ?? "").trim();
    const shipZip = String(fd.get("shipZip") ?? "").trim();
    const deadline = String(fd.get("deadline") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }
    if (!shipCountry || !shipZip) {
      return NextResponse.json(
        { error: "Destination country and ZIP / postal code are required for a DDP quote" },
        { status: 400 }
      );
    }
    if (!deadline) {
      return NextResponse.json(
        { error: "Required delivery date is required" },
        { status: 400 }
      );
    }

    // Artwork validation
    const files = fd.getAll("artwork").filter((x): x is File => x instanceof File);
    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} artwork files allowed` },
        { status: 400 }
      );
    }
    const artworkMeta: { name: string; size: number; type: string }[] = [];
    for (const f of files) {
      if (f.size === 0) continue;
      if (f.size > MAX_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File "${f.name}" exceeds ${MAX_SIZE_MB} MB` },
          { status: 400 }
        );
      }
      const ext = ("." + (f.name.split(".").pop() ?? "")).toLowerCase();
      if (!ALLOWED_EXT.includes(ext)) {
        return NextResponse.json(
          { error: `File "${f.name}" has unsupported type ${ext}` },
          { status: 400 }
        );
      }
      artworkMeta.push({ name: f.name, size: f.size, type: f.type || "application/octet-stream" });
    }

    // Log inquiry (Cloudflare Workers logs are visible in dashboard)
    // Phase 2: integrate Resend for email delivery + attachment forwarding
    console.log("[Inquiry Received]", {
      name,
      email,
      company: company || "N/A",
      product: product || "N/A",
      quantity: quantity || "N/A",
      process: printProcess || "N/A",
      fabric: fabric || "N/A",
      designStatus: designStatus || "N/A",
      sizeBreakdown: sizeBreakdown || "N/A",
      shipCountry: shipCountry || "N/A",
      shipZip: shipZip || "N/A",
      deadline: deadline || "N/A",
      message: message || "N/A",
      artwork: artworkMeta,
      artworkCount: artworkMeta.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message:
        "Inquiry received successfully. We'll send a free mockup and a quote within 1 business day. (Artwork files validated; team will request re-upload if needed.)",
      artworkCount: artworkMeta.length,
    });
  } catch (err) {
    console.error("[Inquiry Error]", err);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
