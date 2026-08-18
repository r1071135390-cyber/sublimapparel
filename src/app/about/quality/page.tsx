import type { Metadata } from "next";
import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import {
  ShieldCheck,
  Search,
  Layers,
  Ruler,
  Camera,
  Eye,
  CheckCircle2,
  AlertTriangle,
  PackageCheck,
  FileBadge,
  Droplet,
  Sun,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quality Control · 4-Stage QC, 50+ Checkpoints, AQL 2.5",
  description:
    "4-stage quality control: incoming fabric, in-line, pre-final, and pre-shipment. 50+ checkpoints, AQL 2.5 sampling, 99.2% first-pass rate. Sublimation apparel B2B.",
  keywords: [
    "quality control",
    "apparel quality",
    "aql 2.5",
    "qc process",
    "fabric inspection",
    "sublimation quality",
    "factory audit",
    "defect rate",
  ],

  openGraph: {
    images: ["/about-hero.webp"],
  },
};

const stats = [
  { value: "4", unit: "STAGES", label: "Inline → final QC" },
  { value: "50+", unit: "CHECKS", label: "Per garment" },
  { value: "AQL", unit: "2.5", label: "Inspection standard" },
  { value: "99.2%", unit: "PASS", label: "First-pass rate" },
];

const stages = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Stage 1 · Incoming fabric",
    detail: "Every fabric roll inspected on arrival: GSM, width, color consistency, hand-feel, defect count. We reject 3-5% of incoming lots — typically fabric that doesn't match the spec or has visible flaws.",
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Stage 2 · Print inspection",
    detail: "After sublimation printing, each panel is checked for color accuracy (vs Pantone), registration, ink coverage, edge crispness. Defective panels re-printed, not reworked.",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Stage 3 · Sewing line check",
    detail: "Inline QC at each sewing station checks stitch count (8-10/inch), seam alignment, tension, thread trim. Random pull-tests every 50 pieces. Defects removed before heat-pressing.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Stage 4 · Pre-shipment audit",
    detail: "AQL 2.5 final inspection: random sample pulled per lot, full defect classification, photo report, pass/fail. Failed lots reworked or rejected before any carton is sealed.",
  },
];

const checkpoints = [
  { icon: <Ruler className="h-4 w-4" />, label: "Size measurement (12 points per garment, ±1cm tolerance)" },
  { icon: <Camera className="h-4 w-4" />, label: "Color matching against approved mockup" },
  { icon: <Eye className="h-4 w-4" />, label: "Print registration and edge sharpness" },
  { icon: <CheckCircle2 className="h-4 w-4" />, label: "Stitch density (8–10 stitches/inch for athletic wear)" },
  { icon: <Droplet className="h-4 w-4" />, label: "Wash fastness (no bleed after 5 cycles at 40°C)" },
  { icon: <Sun className="h-4 w-4" />, label: "Light fastness (no fade after 40hr xenon exposure)" },
  { icon: <AlertTriangle className="h-4 w-4" />, label: "Loose threads, raw edges, fabric pills" },
  { icon: <PackageCheck className="h-4 w-4" />, label: "Print positioning, symmetry front-to-back" },
  { icon: <FileBadge className="h-4 w-4" />, label: "Care label, size label, country-of-origin label" },
  { icon: <Search className="h-4 w-4" />, label: "Zipper function, drawstring length, snap security" },
  { icon: <Eye className="h-4 w-4" />, label: "Hand-feel, drape, weight against spec" },
  { icon: <CheckCircle2 className="h-4 w-4" />, label: "Final fold, poly-bag, carton count vs packing list" },
];

const useCases = [
  { title: "Race team with strict sponsor-brand color matching", body: "Pantone-grade color calibration at print, light-box final check against master sample. We've matched brand colors to within ΔE < 1.5 for 200+ race teams." },
  { title: "POD platform with white-label customer returns", body: "Strict zero-defect shipment. We pull a 30-piece AQL sample per 1,000-piece lot, full reject if any critical defect found. POD return rate: <0.4%." },
  { title: "School uniform bulk with size consistency", body: "12-point measurement per garment, ±1cm tolerance. We sort by size on the packing line, not by carton. Schools receive uniform-size bundles they can distribute without re-sorting." },
  { title: "Athletic brand with 5K-piece monthly run", body: "Pre-shipment audit on every lot, photo report + measurement report. Brand QC team can fly in for an unannounced visit — we've hosted 4 in the last 12 months." },
  { title: "Trade show pre-order with sample quality bar", body: "Sample at 2 weeks, bulk at 4 weeks, but bulk must match sample within ΔE < 2. We hold the original sample for comparison until the order is shipped." },
  { title: "Reorder through US warehouse", body: "Stock in CA is from a previously QC-passed lot, but we re-inspect on pull: fold condition, poly-bag integrity, label legibility, no transit damage." },
];

const faqs = [
  { q: "What's your first-pass yield?", a: "99.2% across the last 12 months. The 0.8% is split between incoming fabric reject (0.4%) and in-line defects caught before final QC (0.4%). Final-shipment defect rate is <0.1%." },
  { q: "Can I send my own QC team or third-party inspector?", a: "Yes, anytime. We host 8-12 inspector visits per year (SGS, Bureau Veritas, brand QC teams). Inspector accommodation and access arranged free of charge." },
  { q: "What happens if a defective lot is found after final QC?", a: "We segregate, count, and either rework (if defect is repairable) or destroy (if not). You receive a written report with defect count, root cause, and corrective action. Replacement pieces ship in the next available batch at our cost." },
  { q: "Do you have ISO or other quality certifications?", a: "ISO 9001:2015 (quality management) and OEKO-TEX Standard 100 (fabric safety). BSCI social compliance audited. Sedex SMETA 4-pillar available. Audit reports shared under NDA." },
];

export default function QualityPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      {/* 1 · HERO */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
            [ 012 / About · quality ]
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            <span className="block">4 stages.</span>
            <span className="block text-[#cc3d00]">50+ checkpoints.</span>
            <span className="block">99.2% pass.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0] md:text-xl">
            Quality isn't a final step. It's a continuous check at every stage — incoming
            fabric, print, sewing, pre-shipment. AQL 2.5 sampling. 8 dedicated QC staff.
            Audit-ready.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/about/production" className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]">
              See production process →
            </Link>
            <RequestQuoteLink label="quality / page / Get a quote" className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]">Get a quote →</RequestQuoteLink>
          </div>
        </div>
      </section>

      {/* 2 · STATS */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x-2 divide-[#0a0a0a] border-x-2 border-[#0a0a0a] md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center md:py-10">
              <div className="text-3xl font-extrabold leading-none text-[#0a0a0a] md:text-5xl">
                {s.value}
                <span className="ml-1 text-base font-bold text-[#cc3d00] md:text-lg">{s.unit}</span>
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · DESCRIPTION */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ Why 4 stages ]</div>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
            Catching a defect at stage 1 costs $0.50.{" "}
            <span className="text-[#cc3d00]">At stage 4 it costs $15.</span>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#3a3a3a] md:text-lg">
            <p>
              Quality control isn't one step. It's a funnel. Defects caught at fabric
              arrival get rejected before any labor is invested. Defects caught at print
              stage get re-printed — a $2 fix. Defects caught at sewing get reworked — a
              $3-5 fix. Defects caught only at final QC require replacement pieces — $15
              plus a delayed ship.
            </p>
            <p>
              <strong className="text-[#0a0a0a]">We check at every stage, not just at the end.</strong>{" "}
              This is how we hit 99.2% first-pass and &lt;0.1% final-shipment defect rate.
              It also means a defect caught at stage 1 doesn't drag down the whole line.
            </p>
            <p>
              Our QC team is 8 dedicated inspectors, separate from the production team.
              They have authority to stop a line. They report to a QC manager who reports
              to the COO, not to the line supervisor. Independence matters.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · 4 STAGES */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#1a1a1a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#0078a8]">[ 012.A / The 4 stages ]</div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">From fabric arrival to carton seal.</h2>
          </div>
          <div className="grid gap-px bg-[#0a0a0a] md:grid-cols-2">
            {stages.map((s, i) => (
              <div key={s.title} className="bg-[#1a1a1a] p-8">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border-2 border-[#ff4d00] text-[#cc3d00]">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a0a0a0]">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · CHECKPOINTS */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 012.B / What we actually check ]</div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">12 of the 50+ inspection points.</h2>
          <div className="grid gap-px bg-[#0a0a0a] md:grid-cols-2 lg:grid-cols-3">
            {checkpoints.map((c) => (
              <div key={c.label} className="flex items-start gap-3 bg-[#faf9f6] p-5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#0a0a0a] text-[#0a0a0a]">
                  {c.icon}
                </div>
                <span className="text-sm leading-snug md:text-base">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · USE CASES */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 012.C / Where it matters ]</div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Six scenarios where QC saves the order.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div key={u.title} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-3 text-xs font-mono font-bold text-[#cc3d00]">0{i + 1}</div>
                <h3 className="text-lg font-bold leading-snug">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a]">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · FAQ */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 012.D / FAQ ]</div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">The QC questions buyers ask.</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-2 text-xs font-mono font-bold text-[#cc3d00]">Q · {String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-lg font-bold leading-snug md:text-xl">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3a3a3a] md:text-base">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · CTA */}
      <section className="bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-8 text-xs font-mono uppercase tracking-widest text-[#cc3d00]">[ 012.E / Audit us ]</div>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Come audit. Bring your QC team.</h2>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0]">
            We host 8-12 inspector visits per year. Accommodation arranged, full factory
            access, and your team can pull a random AQL sample alongside ours.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/get-a-quote?type=audit" className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]">
              Schedule an audit →
            </Link>
            <Link href="/about/factory" className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]">
              See the factory →
            </Link>
          </div>
        </div>
      </section>

      {/* 9 · RELATED */}
      <section className="border-t-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#6b6b6b]">Related</div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { href: "/about/factory", title: "Factory", desc: "2,000 sqm, 6 printers, 12 lines" },
              { href: "/about/production", title: "Production process", desc: "7 steps, 21 days" },
              { href: "/about/faq", title: "FAQ", desc: "30 B2B questions answered" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className="group block border-2 border-[#0a0a0a] bg-white p-6 transition-colors hover:bg-[#0a0a0a] hover:text-[#faf9f6]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#cc3d00]">→</div>
                <div className="mt-2 text-lg font-bold">{r.title}</div>
                <div className="mt-1 text-sm text-[#6b6b6b] group-hover:text-[#a0a0a0]">{r.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
