import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Package,
  Ruler,
  Shield,
  Shirt,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title:
    "4-Step Quality Control Process | AQL 2.5 Inspection | Custom Apparel",
  description:
    "Our 4-step quality control process for custom apparel: pre-production sample, in-line inspection, AQL 2.5 final inspection, pre-shipment photo evidence. We catch defects before you do.",
  keywords: [
    "apparel quality control",
    "AQL 2.5 inspection",
    "custom apparel inspection",
    "pre-shipment inspection",
    "sublimation quality control",
    "garment inspection process",
  ],
  alternates: {
    canonical: "https://sublimapparel.com/quality-control/",
  },
  openGraph: {
    title: "4-Step Quality Control Process | SublimApparel",
    description:
      "Pre-production sample, in-line inspection, AQL 2.5 final inspection, pre-shipment photo evidence. We catch defects before you do.",
    url: "https://sublimapparel.com/quality-control/",
    images: ["/about-process-qc.webp"],
  },
};

const breadcrumb = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Quality Control Process", path: "/quality-control/" },
]);

const steps = [
  {
    n: 1,
    icon: Eye,
    title: "Pre-Production Sample Approval",
    timing: "T-60 days",
    summary:
      "Physical sample on your exact fabric, exact color, exact print placement. You sign off before bulk cut.",
    details: [
      "Sample is produced on the same fabric lot as bulk will be cut from",
      "Colors verified against your Pantone or physical swatch",
      "Print placement, sizing, and graphic fidelity checked",
      "Sewn construction reviewed for stitching quality, seam alignment, and finishing",
      "You receive the sample with photo evidence. Sign-off is the contract for bulk.",
    ],
  },
  {
    n: 2,
    icon: Ruler,
    title: "In-Line Inspection During Production",
    timing: "T-30 to T-15 days",
    summary:
      "QC team checks the first 30 pieces off the line, then samples 10% of remaining production. Defects caught before they reach the box.",
    details: [
      "First 30 pieces inspected piece-by-piece for color, sizing, print, and sewing",
      "Random 10% sampling through production run for ongoing consistency",
      "Color compared against the approved sample under D65 light",
      "Print density, sharpness, and alignment verified against the original artwork",
      "Stitching, hems, labels, and finishing inspected for defects",
    ],
  },
  {
    n: 3,
    icon: ClipboardCheck,
    title: "AQL 2.5 Final Random Inspection",
    timing: "T-7 days",
    summary:
      "Industry-standard AQL 2.5 sampling. Acceptable Quality Limit. We pull a statistically valid sample and grade each defect category.",
    details: [
      "Sample size based on lot size (e.g. 50 pcs sample for 1,000 pc lot)",
      "Defects graded Critical / Major / Minor per ISO 2859-1 standard",
      "Critical defects (functional, safety, legal): 0 accepted",
      "Major defects (visible, affect use): 1.0 AQL accepted",
      "Minor defects (cosmetic, no functional impact): 2.5 AQL accepted",
      "If lot fails, lot is 100% inspected and defects removed before pack-out",
    ],
  },
  {
    n: 4,
    icon: Package,
    title: "Pre-Shipment Photo Evidence",
    timing: "T-3 days",
    summary:
      "Final photos of finished, packed, and loaded cartons. You see exactly what ships before it leaves the factory.",
    details: [
      "Photos of 5-10 random finished pieces laid out for review",
      "Photo of poly-bagged garments in carton",
      "Photo of carton labels (SKU breakdown, sizes, quantities)",
      "Photo of pallet load ready for pickup",
      "All photos sent via email before container is sealed",
    ],
  },
];

const defectCategories = [
  {
    type: "Critical",
    desc: "Functional, safety, or legal defects. Examples: broken stitch on structural seam, fabric hole, missing required label (CPSIA, country of origin).",
    aql: "0 accepted",
  },
  {
    type: "Major",
    desc: "Visible defects that affect the customer&apos;s use. Examples: print off-center by more than 5mm, color visibly different from approved sample, oversized seam, loose thread.",
    aql: "1.0 AQL",
  },
  {
    type: "Minor",
    desc: "Cosmetic defects with no functional impact. Examples: small thread on hem, slight color variation in under-arm area, minor printing imperfection at edge.",
    aql: "2.5 AQL",
  },
];

export default function QualityControlPage() {
  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 bg-[#0a0a0a] py-16 text-white md:py-20">
        <div className="absolute inset-0">
          <Image
            src="/about-process-qc.webp"
            alt="Quality control inspection at SublimApparel Yiwu factory"
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-[#ff4d00]/40 bg-[#ff4d00]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff4d00]">
            <Shield className="h-3.5 w-3.5" />
            4-step inspection
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
            We catch defects
            <br />
            <span className="text-[#ff4d00]">before you do.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            4-stage quality control with AQL 2.5 standard. Pre-production
            sample, in-line inspection, final random inspection, and
            pre-shipment photo evidence. Defects caught before they reach the
            box.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            <div>
              <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">4</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                Inspection stages
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">AQL 2.5</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                Industry standard
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">100%</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                Re-inspect if failed
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#ff4d00] md:text-4xl">Photo</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                Evidence before ship
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            The 4 inspection stages.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            Each stage has a specific purpose. We don&apos;t skip stages for
            tight deadlines.
          </p>

          <div className="mt-12 space-y-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6 md:p-8"
              >
                <div className="flex flex-wrap items-start gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[#ff4d00] text-black">
                    <s.icon className="h-7 w-7" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-black">
                        Stage {s.n}: {s.title}
                      </h3>
                      <span className="rounded-sm bg-black/5 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-black/60">
                        {s.timing}
                      </span>
                    </div>
                    <p className="mt-2 text-base font-bold text-black/80">
                      {s.summary}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {s.details.map((d, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-black/70"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4d00]"
                            strokeWidth={2.5}
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AQL EXPLANATION */}
      <section className="bg-[#faf9f6] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            AQL 2.5 explained.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-black/70">
            AQL (Acceptable Quality Limit) is the industry standard for
            random sampling inspection. It tells you how many defects are
            statistically acceptable in a sample of your lot.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {defectCategories.map((cat) => (
              <div
                key={cat.type}
                className="rounded-sm border-2 border-black/10 bg-white p-6"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-black">{cat.type}</h3>
                  <span
                    className={`rounded-sm px-2 py-1 text-[10px] font-black uppercase tracking-wider ${
                      cat.aql === "0 accepted"
                        ? "bg-black text-white"
                        : "bg-[#ff4d00]/10 text-[#ff4d00]"
                    }`}
                  >
                    {cat.aql}
                  </span>
                </div>
                <p
                  className="mt-3 text-sm leading-relaxed text-black/70"
                  dangerouslySetInnerHTML={{ __html: cat.desc }}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-sm border-2 border-[#ff4d00]/30 bg-[#ff4d00]/5 p-6">
            <h3 className="flex items-center gap-2 text-lg font-black">
              <Shield className="h-5 w-5 text-[#ff4d00]" />
              What happens if a lot fails AQL 2.5?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-black/70">
              The entire lot is 100% inspected piece-by-piece. Defective
              pieces are removed and replaced at our cost (we don&apos;t pass
              defect-rejection fees to the customer). The lot is re-inspected
              before pack-out. In 8 years, fewer than 3% of lots have
              required a full re-inspection.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Common QC questions.
          </h2>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "Can I do my own inspection?",
                a: "Yes. We welcome buyer-side inspections. We can host your QC team at our Yiwu facility for a half-day or full-day inspection. Inspection fees are typically $200-400/day plus travel. Most clients use our in-house QC and only visit for first-time orders or large lots (5,000+ pcs).",
              },
              {
                q: "What if I receive defective pieces after delivery?",
                a: "Document the defects with photos within 7 days of receipt. We&apos;ll credit the value of the defective pieces on your next order, or issue a refund if no next order is planned. In 8 years, our defect claim rate has been under 1% of total pieces shipped.",
              },
              {
                q: "Do you use third-party inspection (QIMA, SGS, Bureau Veritas)?",
                a: "Yes, for orders over 5,000 pcs we recommend third-party inspection as a final check. Cost is typically $300-500 per man-day. We work with QIMA, SGS, and Bureau Veritas. The third-party inspector uses our QC checklist and AQL 2.5 standard.",
              },
              {
                q: "How do you handle fabric defects before printing?",
                a: "Every fabric roll is inspected before cutting. Fabric with visible defects (slubs, holes, dye spots) is rejected and replaced. We use approximately 8-10% more fabric than the finished piece count to account for cuttable defects.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-black/10 bg-[#faf9f6] p-6 open:border-[#ff4d00]"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-black">
                  <span>{f.q}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#ff4d00] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
