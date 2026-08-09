import type { Metadata } from "next";
import Link from "next/link";
import {
  Factory,
  Ruler,
  Users,
  Clock,
  Shirt,
  Scissors,
  Printer,
  Package,
  ShieldCheck,
  Truck,
  Cog,
  Building2,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Inside Our Yiwu Factory · 12,000 sqm Sublimation Apparel Plant | SublimPrint",
  description:
    "12,000 sqm Yiwu sublimation apparel factory. 12 production lines, 200+ staff, 24/7 capacity. 6 inline printing machines, full cutting-sewing-printing-packaging vertical integration.",
  keywords: [
    "yiwu factory",
    "sublimation factory",
    "apparel factory china",
    "sublimation printing factory",
    "factory tour",
    "factory capacity",
    "vertical integration",
    "oem apparel factory",
  ],
};

const stats = [
  { value: "12,000", unit: "SQM", label: "Floor space" },
  { value: "12", unit: "LINES", label: "Production lines" },
  { value: "200+", unit: "STAFF", label: "Skilled workforce" },
  { value: "24/7", unit: "RUN", label: "Three shifts" },
];

const departments = [
  {
    icon: <Scissors className="h-5 w-5" />,
    name: "Cutting",
    detail: "8 automatic cutting tables, fabric relaxation room (24h pre-cut), 1.2M pieces/month capacity.",
  },
  {
    icon: <Printer className="h-5 w-5" />,
    name: "Sublimation printing",
    detail: "6 inline industrial sublimation printers (Mimaki / MS JP), 200,000 m fabric/month output.",
  },
  {
    icon: <Shirt className="h-5 w-5" />,
    name: "Sewing",
    detail: "12 lines, 180 sewing machines (overlock, coverstitch, flatlock), 80,000 garments/month output.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    name: "Quality control",
    detail: "Inline + final-stage QC stations, AQL 2.5 sampling, dedicated 8-person QC team.",
  },
  {
    icon: <Package className="h-5 w-5" />,
    name: "Packing & labeling",
    detail: "FBA prep, poly-bag, hangtag, carton, palletization. Custom retail packaging per spec.",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    name: "Warehouse & logistics",
    detail: "5,000 sqm finished-goods warehouse, own export license, integrated with Yiwu → CA/US rail/sea.",
  },
];

const equipment = [
  ["Sublimation printers", "6× Mimaki TS55 / MS JP, 6-color industrial inline"],
  ["Cutting tables", "8× automatic, 3.2m working width each"],
  ["Sewing machines", "180× industrial lockstitch / overlock / coverstitch / flatlock"],
  ["Heat press machines", "12× pneumatic dual-station, 60×80cm platen"],
  ["Stitch count target", "8–10 stitches/inch (athletic wear spec)"],
  ["Fabric stock", "1.5M meters on-hand, 200+ SKUs (poly, poly-spandex, cotton, blends)"],
  ["Color management", "X-Rite eXact spectrophotometer, ICC profile per fabric"],
  ["QC equipment", "Wash fastness tester, crockmeter, light box (D65), GSM scale"],
  ["Packing lines", "4 dedicated FBA-prep stations, label applicators"],
  ["Power backup", "Dual-grid + 800kVA diesel generator (zero downtime)"],
];

const useCases = [
  { title: "Athletic brands needing scale", body: "12,000 sqm floor, 12 lines, 200+ staff — we run 80K pieces/month without breaking a sweat. Race teams and jersey brands come back for repeat 5K+ piece orders." },
  { title: "Tech-apparel startups with technical fabric demands", body: "Poly-spandex, mesh, brushed-back, micro-poly — stocked and ICC-calibrated. Send your tech-pack, we reverse-engineer the construction." },
  { title: "Schools and Greek life bulk orders", body: "One PO, one ship date, 1,000+ pieces. We split the run across multiple lines to keep the timeline tight (10-14 days bulk)." },
  { title: "POD platforms with weekly drops", body: "Standing capacity, white-label packing, blind drop-ship. We treat each week as a production slot, not a project." },
  { title: "Political and campaign merch", body: "Rush? We've done 5,000-piece campaign orders in 8 days. Three-shift capacity means we can surge." },
  { title: "Trade show floor samples and pre-orders", body: "Sample run in 5-7 days, bulk in 14-18 days. Pre-sell on the show floor, ship the moment you return." },
];

const faqs = [
  { q: "Can I visit the factory in person?", a: "Yes. We're 90 minutes by high-speed train from Shanghai Hongqiao, or 20 minutes from Yiwu Airport. Schedule a 2-day visit and we'll arrange hotel, factory tour, and a dinner with the production team. Bring your tech-pack — we can discuss it on the floor." },
  { q: "Do you have social compliance audits?", a: "Yes. BSCI audited (last audit Q1 2024, grade C). Sedex SMETA 4-pillar available on request. We can share audit reports under NDA." },
  { q: "What's your minimum order quantity (MOQ)?", a: "Per style: 50 pieces (sublimation) / 100 pieces (mixed). Per order: 100 pieces across any styles. First-time buyers usually start with 200-500 pieces as a trial." },
  { q: "Can you handle technical performance fabrics?", a: "Yes. We run poly-spandex, poly-mesh, brushed poly, micro-poly, recycled poly, and 100% cotton. We don't run silk, leather, or pure wool." },
];

export default function FactoryPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      {/* 1 · HERO */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 010 / About · factory ]
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            <span className="block">12,000 sqm.</span>
            <span className="block text-[#ff4d00]">12 production lines.</span>
            <span className="block">24/7 capacity.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0] md:text-xl">
            A real Yiwu factory — not a trading company. Cutting, printing, sewing, QC, and
            packing all under one roof, integrated with the Yiwu textile supply chain and
            90 minutes from Shanghai port. Come visit, bring your tech-pack.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/about/production"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]"
            >
              See our production process →
            </Link>
            <Link
              href="/get-a-quote?process=sublimation&type=visit"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
            >
              Schedule a factory visit →
            </Link>
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
                <span className="ml-1 text-base font-bold text-[#ff4d00] md:text-lg">
                  {s.unit}
                </span>
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · DESCRIPTION */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ Why visit ]
          </div>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
            The fastest way to know if a factory is real:{" "}
            <span className="text-[#ff4d00]">walk the floor.</span>
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#3a3a3a] md:text-lg">
            <p>
              Most B2B buyers have been burned by a Chinese factory that turned out to be a
              trading company with a rented showroom. We get it. That's why every new client
              gets the same offer: come to Yiwu, walk the floor, see the lines running, talk
              to the production manager.
            </p>
            <p>
              <strong className="text-[#0a0a0a]">12,000 sqm is real.</strong> That's a
              football field and a half of floor space, dedicated to cutting, printing,
              sewing, QC, and packing. Six industrial sublimation printers run 24/7 in
              three shifts. Twelve sewing lines handle 80,000 garments per month at
              full capacity. We don't subcontract — every piece is cut, printed, sewn, and
              packed on this floor.
            </p>
            <p>
              We're 90 minutes by high-speed train from Shanghai, 20 minutes from Yiwu
              Airport. Most clients do a 2-day visit: day 1 factory tour and
              in-person tech-pack review, day 2 sample approval or color matching. Schedule
              via the link below.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · DEPARTMENTS */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#1a1a1a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00c2ff]">
              [ 010.A / Departments ]
            </div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              Six departments. One roof.
            </h2>
            <p className="mt-4 text-lg text-[#a0a0a0]">
              Vertical integration means we control every step. No subcontracting, no
              hand-offs to other workshops, no surprise delays because a partner factory
              is overloaded.
            </p>
          </div>
          <div className="grid gap-px bg-[#0a0a0a] md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <div key={d.name} className="bg-[#1a1a1a] p-8">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border-2 border-[#ff4d00] text-[#ff4d00]">
                  {d.icon}
                </div>
                <h3 className="text-lg font-bold leading-snug">{d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a0a0a0]">{d.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · EQUIPMENT TABLE */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 010.B / Equipment at a glance ]
          </div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">
            What's actually on the floor.
          </h2>
          <div className="border-2 border-[#0a0a0a]">
            <table className="w-full text-left">
              <tbody className="divide-y-2 divide-[#0a0a0a]">
                {equipment.map(([k, v]) => (
                  <tr key={k}>
                    <td className="w-1/3 bg-[#faf9f6] px-4 py-3 text-sm font-bold md:px-6 md:py-4 md:text-base">
                      {k}
                    </td>
                    <td className="w-2/3 bg-white px-4 py-3 text-sm md:px-6 md:py-4 md:text-base">
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6 · USE CASES */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
              [ 010.C / Who uses this factory ]
            </div>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              Six buyer profiles we already serve.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div key={u.title} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-3 text-xs font-mono font-bold text-[#ff4d00]">
                  0{i + 1}
                </div>
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
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 010.D / FAQ ]
          </div>
          <h2 className="mt-3 mb-10 text-3xl font-extrabold leading-tight md:text-5xl">
            Questions buyers ask first.
          </h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-2 border-[#0a0a0a] bg-white p-6">
                <div className="mb-2 text-xs font-mono font-bold text-[#ff4d00]">
                  Q · {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold leading-snug md:text-xl">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3a3a3a] md:text-base">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · CTA */}
      <section className="bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-8 text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 010.E / Visit or quote ]
          </div>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Walk the floor, or just send your tech-pack.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0]">
            Schedule a 2-day visit, or send your design + quantity and we'll come back with
            a sample plan + production timeline within 1 business day.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-a-quote?process=sublimation&type=visit"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]"
            >
              Schedule a visit →
            </Link>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
            >
              Get a quote →
            </Link>
          </div>
        </div>
      </section>

      {/* 9 · RELATED */}
      <section className="border-t-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#6b6b6b]">
            Related
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { href: "/about/production", title: "Production process", desc: "7 steps from inquiry to ship" },
              { href: "/about/quality", title: "Quality control", desc: "4-stage QC, 50+ checkpoints" },
              { href: "/about/cases", title: "Industries we serve", desc: "12 verticals, 1,000+ clients" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className="group block border-2 border-[#0a0a0a] bg-white p-6 transition-colors hover:bg-[#0a0a0a] hover:text-[#faf9f6]">
                <div className="text-xs font-mono uppercase tracking-wider text-[#ff4d00]">→</div>
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
