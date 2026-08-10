import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  DollarSign,
  Shirt,
  Factory,
  Globe,
  FileText,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ · 30 B2B Sublimation Questions Answered | SublimApparel",
  description:
    "30 frequently asked B2B questions about sublimation apparel: pricing, MOQ, fabric, lead time, shipping, customs, payment, samples, file prep. Yiwu factory direct.",
  keywords: [
    "sublimation faq",
    "b2b apparel faq",
    "moq sublimation",
    "lead time sublimation",
    "ddp shipping faq",
    "sublimation pricing",
    "yiwu factory faq",
  ],
};

const stats = [
  { value: "30", unit: "Q&A", label: "B2B questions" },
  { value: "5", unit: "SECTIONS", label: "Organized" },
  { value: "24h", unit: "REPLY", label: "Direct support" },
  { value: "100%", unit: "HONEST", label: "No marketing fluff" },
];

const sections = [
  {
    id: "pricing",
    icon: <DollarSign className="h-5 w-5" />,
    title: "Pricing & MOQ",
    questions: [
      { q: "What's the per-piece price for sublimation apparel?", a: "Depends on garment type, fabric, and quantity. Rough bands: $5-9 for basic polyester tees at 500+ pieces, $8-15 for hoodies, $14-22 for athletic jerseys, $20-35 for cycling jerseys. Price drops 20-35% between 100 and 1,000 pieces." },
      { q: "What's the minimum order quantity (MOQ)?", a: "Per style: 50 pieces sublimation, 100 pieces mixed. Per order: 100 pieces across any styles. For samples, 1-3 pieces at $35-65 freight via DHL." },
      { q: "How does price vary with quantity?", a: "100 pieces = base price. 250 pieces = -10%. 500 pieces = -20%. 1,000 pieces = -30%. 5,000+ pieces = custom quote. Larger runs hit economies of scale on fabric, print, and labor." },
      { q: "Do you offer price breaks for reorders?", a: "Yes. Once an order is shipped, we hold the screen file and color profile at no charge. Reorder setup fee is $0 (we don't burn screens for sublimation, so there's nothing to re-set). You only pay the unit cost." },
      { q: "What's the deposit and payment terms?", a: "30/70 split typical. 30% T/T or Wise deposit to start production, 70% balance against pre-shipment photos before we ship. For established clients (3+ orders), we offer 50/50 or net-30 terms." },
      { q: "Are there any hidden fees I should know about?", a: "No. We itemize the quote: unit price (fabric + print + sewing + QC + packing), sample cost (if any), shipping (per Incoterm), and any extras (custom labels, hangtags, retail poly-bag). What you see is what you pay." },
    ],
  },
  {
    id: "product",
    icon: <Shirt className="h-5 w-5" />,
    title: "Products & fabric",
    questions: [
      { q: "Can you do all-over printing on 100% cotton?", a: "Honest answer: true edge-to-edge all-over print is only achievable on polyester via sublimation. On 100% cotton we run DTG and DTF, which deliver A4–A3 per panel with the same vibrancy and a softer hand-feel — but you do get panel seams. If you need true all-over edge-to-edge on cotton, we can talk about a custom cut-and-sew sublimation transfer workflow. See /fabric/cotton for the full process." },
      { q: "What fabrics do you stock?", a: "Polyester (most common, 120-220 GSM), poly-spandex (4-way stretch, 180-260 GSM), brushed poly (sweatshirt weight), cotton-poly blends (65/35 and 50/50), recycled poly (rPET), and 100% cotton (with pre-treatment). Mesh and waffle-knit available on request." },
      { q: "Can I bring my own fabric?", a: "Yes. We accept customer-supplied fabric (CIF Yiwu) for confirmed orders. We test-print your design on a 1m swatch first to confirm color and stretch before bulk. Customer fabric doesn't change the unit price significantly." },
      { q: "What about colors and Pantone matching?", a: "Sublimation is CMYK process — full color at no extra cost. We can hit Pantone Solid Coated within ΔE < 2 with our calibrated workflow. For critical brand colors, we send a lab dip or a print swatch for approval before bulk." },
      { q: "Do you make cut-and-sew garments or just print?", a: "Both. We do printing on customer-supplied blanks (you ship blanks to us, we print and ship back), and we do full-package cut-and-sew (we source fabric, cut, print, sew, finish). Most clients use full-package for cost and quality control." },
      { q: "What's the print area and resolution?", a: "Full front, full back, sleeves, hood — anywhere on the garment. Resolution: 300 DPI minimum, 720 DPI for fine details. We render at scale with seam allowance so colors don't distort across panel joins." },
    ],
  },
  {
    id: "process",
    icon: <Factory className="h-5 w-5" />,
    title: "Production & quality",
    questions: [
      { q: "How long from PO to delivery?", a: "Sample: 5-7 days. Bulk after sample approval: 10-18 days depending on quantity. Plus shipping: 3-5 days (express), 5-9 days (air), 15-35 days (sea/rail). Total: 20-28 days sample-included, 15-22 days bulk-direct." },
      { q: "Can you do rush orders?", a: "Yes. 200 pieces in 5-7 days, 500 pieces in 7-9 days, 1,000 pieces in 9-12 days, 3,000 pieces in 12-18 days. Rush incurs a 15-25% surcharge. We've done 5,000-piece campaign orders in 8 days." },
      { q: "What's your QC process?", a: "4 stages: incoming fabric, print inspection, sewing inline, pre-shipment AQL 2.5. 50+ checkpoints per garment. 8 dedicated QC staff, separate from production. See /about/quality for the full breakdown." },
      { q: "Do you have social compliance audits?", a: "Yes. BSCI audited (last Q1 2024, grade C), Sedex SMETA 4-pillar available, ISO 9001:2015, OEKO-TEX Standard 100 for fabric. Audit reports shared under NDA." },
      { q: "What if there's a quality issue after delivery?", a: "Within 30 days of receipt, report the issue with photos. We assess within 2 business days and either replace, refund, or credit future order. Replacement ships in the next available batch at our cost. We've had 0.4% claim rate over the last 12 months." },
      { q: "Can I visit the factory in person?", a: "Yes. We're 90 minutes by high-speed train from Shanghai or 20 minutes from Yiwu Airport. Schedule a 2-day visit, we arrange hotel, factory tour, and tech-pack review. Most clients do this once before placing their first bulk order." },
    ],
  },
  {
    id: "shipping",
    icon: <Globe className="h-5 w-5" />,
    title: "Shipping & customs",
    questions: [
      { q: "What shipping methods are available?", a: "Sea freight (cheapest, 15-35 days), air freight (5-9 days, middle), express DHL/FedEx/UPS (3-7 days, fastest), rail to Europe (18-22 days, 40% cheaper than air), and US domestic from our Fontana CA warehouse (2-5 days)." },
      { q: "What is DDP and do you offer it?", a: "DDP = Delivered Duty Paid. We pay all import duties, tariffs, and brokerage; you receive the boxes and sign once. Available to US, CA, UK, EU, AU, NZ, JP, KR, MX, BR, and 90+ more countries. No import license needed on your end." },
      { q: "What's FOB vs CIF vs EXW?", a: "FOB (Free On Board): we deliver to Yiwu port, you handle freight + insurance + duties. CIF: we deliver to your destination port, you handle duties + last-mile. EXW: you pick up at our factory gate. DDP is the easiest; FOB/CIF/EXW are for buyers with their own forwarder." },
      { q: "How does US warehouse work?", a: "You pre-build 100-500 pieces of your top designs, we air-freight to our Fontana CA facility, then ship US-domestic (2-5 days) as orders come in. $0 setup on reorder, $0.05/piece/month storage after 90 days. See /shipping/us-warehouse for full details." },
      { q: "Do you ship to Amazon FBA?", a: "Yes. FBA prep included: stickering, poly-bagging, carton-pack, palletization to your routing. We ship to FTW1, ONT8, IND9, and any other FBA warehouse you specify. Routing instructions on the PO." },
      { q: "What if my shipment gets stuck in customs?", a: "Our broker handles the release. If there's a documentation issue (HS code, certificate of origin), we resolve at our cost. We've had 1 customs hold in the last 24 months across 8,000+ shipments. Most DDP shipments clear in 1-2 days." },
    ],
  },
  {
    id: "admin",
    icon: <FileText className="h-5 w-5" />,
    title: "Artwork, files & admin",
    questions: [
      { q: "What file format should I send?", a: "Best: AI, PSD, or layered PDF (CMYK, 300 DPI minimum, embedded fonts). Acceptable: high-res PNG (transparent background, 300+ DPI). Send the original art and a reference mockup. We can work from sketches but production files should be vector or 300+ DPI raster." },
      { q: "Do you help with design or just print?", a: "We do both. Free mockup positioning (we render your design on a garment template at scale). Free tech-pack review. For deeper design help (color palette, layout optimization, print-ready file cleanup), we charge $30-80/hour, optional." },
      { q: "Do you sign NDAs?", a: "Yes, mutual NDA before any sensitive artwork is shared. Standard 2-year term, mutual confidentiality. We can also register your design with a US trademark or copyright filing service if you want legal protection in the US market." },
      { q: "How do you handle my design files and brand assets?", a: "All client files are stored on encrypted internal servers, access limited to project team only. We never reuse, resell, or share your design or brand. Files retained for 3 years for reorder, then deleted on request." },
      { q: "Can I get a custom label, hangtag, or poly-bag?", a: "Yes. Custom woven labels ($0.15-0.40/pc), printed care labels ($0.05-0.12/pc), hangtags ($0.10-0.30/pc), retail poly-bags with logo ($0.08-0.18/pc). We can source from our supplier network or use your existing inventory." },
      { q: "What's the difference between a sample and a pre-production sample?", a: "Sample (1-3 pieces, $35-65 freight): made to show fabric, color, construction. Pre-production sample (PPS, 1-2 pieces, often free with bulk PO): made after fabric is committed, used to sign off on bulk before production starts. We recommend PPS for orders over 500 pieces." },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      {/* 1 · HERO */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 014 / About · FAQ ]
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            <span className="block">30 questions.</span>
            <span className="block text-[#ff4d00]">Honest answers.</span>
            <span className="block">No marketing fluff.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0] md:text-xl">
            Everything B2B buyers ask us in the first call, organized into 5 sections:
            pricing, product, process, shipping, admin. If your question isn't here, just
            message us.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/get-a-quote" className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]">
              Skip the FAQ, send a brief →
            </Link>
            <a
              href="https://wa.me/8613764593988"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
            >
              WhatsApp us →
            </a>
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
                <span className="ml-1 text-base font-bold text-[#ff4d00] md:text-lg">{s.unit}</span>
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · SECTION NAV */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#1a1a1a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#00c2ff]">
            [ Jump to section ]
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-3 border-2 border-[#0a0a0a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#ff4d00] hover:bg-[#0a0a0a]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[#ff4d00] text-[#ff4d00]">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold leading-snug md:text-base">{s.title}</div>
                  <div className="text-xs text-[#a0a0a0]">{s.questions.length} Q&A</div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#ff4d00] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · DESCRIPTION */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">[ How to use this ]</div>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
            Pick the section that matches your question.{" "}
            <span className="text-[#ff4d00]">Read the answer. Move on.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#3a3a3a] md:text-lg">
            These are the questions we get most often from new B2B buyers. They're honest
            answers, not marketing copy — if the answer is "we can't do that" or "we
            recommend you don't", we say so. If your question isn't here, message us on
            WhatsApp or send a brief via the link above.
          </p>
        </div>
      </section>

      {/* 5 · SECTIONS */}
      {sections.map((s, sIdx) => (
        <section key={s.id} id={s.id} className="border-b-2 border-[#0a0a0a]">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-[#ff4d00] bg-[#ff4d00] text-white">
                {s.icon}
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
                  Section {String(sIdx + 1).padStart(2, "0")} · {s.questions.length} Q&A
                </div>
                <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">{s.title}</h2>
              </div>
            </div>
            <div className="space-y-4">
              {s.questions.map((q, i) => (
                <details
                  key={q.q}
                  className="group border-2 border-[#0a0a0a] bg-white open:bg-[#faf9f6]"
                >
                  <summary className="flex cursor-pointer items-center gap-4 p-5 md:p-6">
                    <div className="text-xs font-mono font-bold text-[#ff4d00] md:text-sm">
                      Q.{String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="flex-1 text-base font-bold leading-snug md:text-lg">{q.q}</h3>
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#0a0a0a] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t-2 border-[#0a0a0a] p-5 md:p-6">
                    <p className="text-sm leading-relaxed text-[#3a3a3a] md:text-base">{q.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 6 · CTA */}
      <section className="bg-[#0a0a0a] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-8 text-xs font-mono uppercase tracking-widest text-[#ff4d00]">
            [ 014.A / Still have questions? ]
          </div>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            We answer WhatsApp in &lt;1 hour during CN business hours.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0]">
            Or send a brief and we'll come back with a quote, sample plan, and timeline
            within 1 business day.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/8613764593988"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e64400] hover:border-[#e64400]"
            >
              WhatsApp +86 137 6459 3988 →
            </a>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
            >
              Send a brief →
            </Link>
          </div>
        </div>
      </section>

      {/* 7 · RELATED */}
      <section className="border-t-2 border-[#0a0a0a] bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#6b6b6b]">Related</div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { href: "/about/factory", title: "Factory", desc: "2,000 sqm, 12 lines, 24/7" },
              { href: "/about/quality", title: "Quality control", desc: "4-stage QC, 50+ checkpoints" },
              { href: "/fabric/cotton", title: "100% cotton", desc: "Our differentiator" },
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
