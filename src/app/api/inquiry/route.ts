import { NextResponse } from "next/server";
import { S3Storage } from "coze-coding-dev-sdk";

const MAX_FILES = 5;
const MAX_SIZE_MB = 25;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".pdf", ".ai", ".eps", ".psd", ".svg", ".tif", ".tiff"];

export async function POST(request: Request) {
  try {
    const fd = await request.formData();

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const product = String(fd.get("product") ?? "").trim();
    const quantity = String(fd.get("quantity") ?? "").trim();
    const deadline = String(fd.get("deadline") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Artwork files
    const files = fd.getAll("artwork").filter((x): x is File => x instanceof File);
    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} artwork files allowed` },
        { status: 400 }
      );
    }
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
    }

    // Upload to object storage
    const storage = new S3Storage({
      endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
      accessKey: "",
      secretKey: "",
      bucketName: process.env.COZE_BUCKET_NAME,
      region: "cn-beijing",
    });

    const uploadedKeys: { name: string; key: string; size: number }[] = [];
    for (const f of files) {
      if (f.size === 0) continue;
      const buf = Buffer.from(await f.arrayBuffer());
      const safeBaseName = f.name.replace(/[^A-Za-z0-9._-]/g, "_");
      const key = await storage.uploadFile({
        fileContent: buf,
        fileName: `inquiries/${Date.now()}_${safeBaseName}`,
        contentType: f.type || "application/octet-stream",
      });
      uploadedKeys.push({ name: f.name, key, size: f.size });
    }

    console.log("[Inquiry Received]", {
      name,
      email,
      company: company || "N/A",
      product: product || "N/A",
      quantity: quantity || "N/A",
      deadline: deadline || "N/A",
      message: message || "N/A",
      artwork: uploadedKeys,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message:
        "Inquiry received successfully. We'll send a free mockup and a quote within 1 business day.",
      artworkCount: uploadedKeys.length,
    });
  } catch (err) {
    console.error("[Inquiry Error]", err);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
