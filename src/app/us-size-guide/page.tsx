import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Ruler,
  Shirt,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title:
    "US Size Guide for Custom Apparel | Specs, Charts & Excel Template | SublimApparel",
  description:
    "US-spec size charts for custom apparel: men&apos;s, women&apos;s, youth, hoodies. Free Excel template for collecting sizes from your registration system. Sublimation cut & sew sizing since 2018.",
  keywords: [
    "US size guide",
    "custom apparel size chart",
    "sublimation sizing",
    "men's t-shirt size chart",
    "women's t-shirt size chart",
    "youth apparel sizes",
    "hoodie size chart",
    "size collection template",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/us-size-guide/",
  },
  openGraph: {
    title: "US Size Guide for Custom Apparel | SublimApparel",
    description:
      "Men&apos;s, women&apos;s, youth, hoodie size charts. Free Excel template for collecting sizes from your registration system.",
    url: "https://sublimapparel.com/us-size-guide/",
  },
};

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "US Size Guide", path: "/us-size-guide/" },
]);

interface SizeRow {
  size: string;
  chest: string;
  length: string;
  sleeve: string;
}

const mensTees: SizeRow[] = [
  { size: "XS", chest: "32-34", length: "27", sleeve: "7.5" },
  { size: "S", chest: "34-36", length: "28", sleeve: "7.75" },
  { size: "M", chest: "38-40", length: "29", sleeve: "8" },
  { size: "L", chest: "42-44", length: "30", sleeve: "8.25" },
  { size: "XL", chest: "46-48", length: "31", sleeve: "8.5" },
  { size: "2XL", chest: "50-52", length: "32", sleeve: "8.75" },
  { size: "3XL", chest: "54-56", length: "33", sleeve: "9" },
  { size: "4XL", chest: "58-60", length: "34", sleeve: "9.25" },
  { size: "5XL", chest: "62-64", length: "35", sleeve: "9.5" },
];

const womensTees: SizeRow[] = [
  { size: "XS", chest: "30-32", length: "25", sleeve: "6" },
  { size: "S", chest: "32-34", length: "25.5", sleeve: "6.25" },
  { size: "M", chest: "34-36", length: "26", sleeve: "6.5" },
  { size: "L", chest: "36-38", length: "26.5", sleeve: "6.75" },
  { size: "XL", chest: "38-40", length: "27", sleeve: "7" },
  { size: "2XL", chest: "40-42", length: "27.5", sleeve: "7.25" },
  { size: "3XL", chest: "42-44", length: "28", sleeve: "7.5" },
];

const youthTees: SizeRow[] = [
  { size: "YXS (4-5)", chest: "22-24", length: "18", sleeve: "5" },
  { size: "YS (6-7)", chest: "24-26", length: "19.5", sleeve: "5.5" },
  { size: "YM (8-9)", chest: "26-28", length: "21", sleeve: "6" },
  { size: "YL (10-12)", chest: "28-30", length: "22.5", sleeve: "6.5" },
  { size: "YXL (14-16)", chest: "30-32", length: "24", sleeve: "7" },
];

const hoodies: SizeRow[] = [
  { size: "S", chest: "36-38", length: "27", sleeve: "24" },
  { size: "M", chest: "40-42", length: "28", sleeve: "24.5" },
  { size: "L", chest: "44-46", length: "29", sleeve: "25" },
  { size: "XL", chest: "48-50", length: "30", sleeve: "25.5" },
  { size: "2XL", chest: "52-54", length: "31", sleeve: "26" },
  { size: "3XL", chest: "56-58", length: "32", sleeve: "26.5" },
  { size: "4XL", chest: "60-62", length: "33", sleeve: "27" },
];

function SizeTable({ title, rows, notes }: { title: string; rows: SizeRow[]; notes?: string }) {
  return (
    <div className="rounded-sm border-2 border-black/10 bg-white">
      <div className="border-b border-black/10 bg-[#faf9f6] p-4">
        <h3 className="text-lg font-black">{title}</h3>
        {notes && <p className="mt-1 text-xs text-black/60">{notes}</p>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-black/10 bg-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-black/60">
                Size
              </th>
              <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-black/60">
                Chest (in)
              </th>
              <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-black/60">
                Length (in)
              </th>
              <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-black/60">
                Sleeve (in)
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr
                key={r.size}
                className={idx % 2 === 0 ? "bg-white" : "bg-[#faf9f6]/50"}
              >
                <td className="px-4 py-3 font-black">{r.size}</td>
                <td className="px-4 py-3">{r.chest}</td>
                <td className="px-4 py-3">{r.length}</td>
                <td className="px-4 py-3">{r.sleeve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function UsSizeGuidePage() {
  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* HERO */}
      <section className="border-b border-black/10 bg-[#0a0a0a] py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#ff4d00]/40 bg-[#ff4d00]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff4d00]">
            <Ruler className="h-3.5 w-3.5" />
            US spec, since 2018
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
            US Size Guide for
            <br />
            <span className="text-[#ff4d00]">Custom Apparel</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            US-spec measurement charts for men&apos;s, women&apos;s, youth, and
            hoodies. Free Excel template for collecting sizes from your
            registration system. No more guessing.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/size-collection-template.csv"
              download
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff4d00] px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#ff6633] hover:shadow-[0_8px_24px_rgba(255,77,0,0.4)]"
            >
              <Download className="h-4 w-4" />
              Download size template
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-white/30 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#ff4d00] hover:bg-[#ff4d00]/10"
            >
              Request free size samples
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW TO MEASURE */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            How to measure.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            Three measurements per garment. Use a soft measuring tape, hold it
            snug, don&apos;t pull tight.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Chest",
                desc: "Measure around the fullest part of the chest, under the arms, keeping the tape horizontal.",
                icon: "📏",
              },
              {
                title: "Length",
                desc: "Measure from the highest point of the shoulder down to the bottom hem of the garment.",
                icon: "📐",
              },
              {
                title: "Sleeve",
                desc: "Measure from the shoulder seam down the outside of the arm to the end of the cuff.",
                icon: "🦾",
              },
            ].map((m) => (
              <div
                key={m.title}
                className="rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6"
              >
                <div className="text-3xl">{m.icon}</div>
                <h3 className="mt-3 text-lg font-black">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/70">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIZE CHARTS */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Standard size charts.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            Sublimation cut & sew. All measurements in inches. Width is laid
            flat, so divide by 2 to get half-chest.
          </p>

          <div className="mt-10 space-y-6">
            <SizeTable
              title="Men&apos;s T-Shirts"
              rows={mensTees}
              notes="Classic unisex cut. 100% polyester for sublimation. Performance fabric feel."
            />
            <SizeTable
              title="Women&apos;s T-Shirts"
              rows={womensTees}
              notes="Fitted women&apos;s cut. 100% polyester for sublimation. Shorter sleeve, tapered waist."
            />
            <SizeTable
              title="Youth T-Shirts"
              rows={youthTees}
              notes="Sized by age range. 100% polyester for sublimation. Same unisex cut as men&apos;s."
            />
            <SizeTable
              title="Hoodies & Crewnecks"
              rows={hoodies}
              notes="Unisex relaxed fit. Fleece-backed polyester for sublimation. 320 GSM weight."
            />
          </div>

          <div className="mt-10 rounded-sm border-2 border-[#ff4d00]/30 bg-[#ff4d00]/5 p-6">
            <h3 className="flex items-center gap-2 text-lg font-black">
              <CheckCircle2 className="h-5 w-5 text-[#ff4d00]" />
              All measurements are based on the finished garment, laid flat.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-black/70">
              Tolerance is ±0.5 inches per measurement. Need a custom spec?
              We&apos;ve made garments down to XXS for petite frames and up to
              6XL for big-and-tall. Just ask.
            </p>
          </div>
        </div>
      </section>

      {/* TEMPLATE */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Free size collection template.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            Pre-formatted CSV that opens in Excel, Google Sheets, and Numbers.
            Use it with your registration form to collect sizes automatically.
          </p>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6">
                <div className="mb-3 text-xs font-black uppercase tracking-wider text-black/50">
                  Template columns
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    "Name",
                    "Email",
                    "Shirt Size (Men&apos;s)",
                    "Shirt Size (Women&apos;s)",
                    "Hoodie Size",
                    "Quantity",
                    "Notes",
                  ].map((col) => (
                    <li key={col} className="flex items-center gap-2 font-bold">
                      <CheckCircle2 className="h-4 w-4 text-[#ff4d00]" />
                      <span dangerouslySetInnerHTML={{ __html: col }} />
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/size-collection-template.csv"
                download
                className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#ff6633]"
              >
                <Download className="h-4 w-4" />
                Download CSV template
              </a>
            </div>

            <div>
              <h3 className="text-xl font-black">How to use it.</h3>
              <ol className="mt-4 space-y-3 text-sm text-black/70">
                <li>
                  <span className="font-black text-black">1.</span> Download
                  the CSV. Open it in Excel or Google Sheets.
                </li>
                <li>
                  <span className="font-black text-black">2.</span> Add a
                  registration form to your event (Google Forms, Eventbrite,
                  RunSignup) that captures size selection.
                </li>
                <li>
                  <span className="font-black text-black">3.</span> Map your
                  form fields to the CSV columns. Most registration tools
                  export directly to CSV.
                </li>
                <li>
                  <span className="font-black text-black">4.</span> Send us
                  the CSV 30 days before your event. We use it to lock
                  production counts and sizes.
                </li>
              </ol>

              <p className="mt-4 text-sm font-bold text-black">
                Tip: We accept CSVs with size columns even if you don&apos;t
                fill in name/email. As long as the size column matches our
                standard sizes, we can produce to it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Common sizing questions.
          </h2>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "Are these sizes the same as Anvil, Gildan, or Bella+Canvas?",
                a: "Our sublimation cut & sew specs are close to industry-standard but not identical. We run slightly slimmer than Gildan and slightly looser than Bella+Canvas. For exact comparison, request a free size sample set before you commit.",
              },
              {
                q: "Can you make a custom size not on this chart?",
                a: "Yes. We&apos;ve made XXS petite cuts and 6XL big-and-tall. Custom sizes need a one-time pattern setup (~$30-50) and a 5-10 day sample lead time. We keep the pattern on file for re-orders at no extra cost.",
              },
              {
                q: "How do I handle sizes I forgot to collect?",
                a: "For a small percentage (5-10% of registrations), we recommend ordering Medium as a default. Medians skew toward L for men and M for women. If you have leftover Meds, you can swap them via re-order at MOQ 30 within 30 days.",
              },
              {
                q: "Do you offer women&apos;s cut and men&apos;s cut separately?",
                a: "Yes. Women&apos;s cut is tapered at the waist, narrower in the shoulder, and has a shorter sleeve length. Men&apos;s cut is straight, boxier, and longer. Same design, different fit. No extra setup fee.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-white p-6 open:border-[#ff4d00]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span dangerouslySetInnerHTML={{ __html: f.q }} />
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#ff4d00] transition-transform group-open:rotate-90" />
                </summary>
                <p
                  className="mt-3 text-sm leading-relaxed text-black/70"
                  dangerouslySetInnerHTML={{ __html: f.a }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
