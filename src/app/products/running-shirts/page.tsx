import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Palette,
  Ruler,
  Users,
  Zap,
  Activity,
  Wind,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Running Shirts | All-Over Print, Sublimation, MOQ 50",
  description:
    "Custom running shirts — all-over print sublimation on light, fast-dry polyester. MOQ 50 pcs, 4-way stretch, moisture-wicking, anti-odor finish. Built for marathons, club runs, charity races, school athletics. DDP shipping worldwide.",
  keywords: [
    // Primary
    "custom running shirts",
    "custom marathon shirts manufacturer",
    "running event shirts bulk",
    // Secondary
    "sublimation running shirts",
    "all over print running tee",
    "lightweight race shirts",
    "moisture wicking running apparel",
    "marathon shirts wholesale",
    "5k race shirts custom",
    "charity run shirts",
    "club running kit",
  ],
  openGraph: {
    images: ["/product-hero-products.webp"],
  },
};

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "true low-MOQ", color: "orange" },
  { value: "135–160", label: "GSM RANGE", note: "light & fast", color: "white" },
  { value: "7–15", label: "DAYS LEAD TIME", note: "production + QC", color: "white" },
  { value: "100+", label: "COUNTRIES DDP", note: "duty paid door-to-door", color: "orange" },
];

const styles = [
  { name: "Classic Crewneck Tee", desc: "The everyday training shirt. Set-in sleeves, ribbed crew neck, relaxed athletic fit.", gsm: "135 GSM" },
  { name: "Fitted Race Tee", desc: "Side-seamed, tapered cut, scoop or crew neck. Polyester-spandex blend for next-to-skin feel.", gsm: "145 GSM" },
  { name: "Long-Sleeve Runner", desc: "For cool-weather training, sun protection, and layering. Same all-over print area as short-sleeve.", gsm: "145 GSM" },
  { name: "Sleeveless Singlet", desc: "Racerback or A-line. Built for race day, track & field, hot-weather marathons.", gsm: "135 GSM" },
  { name: "Half-Zip Running Top", desc: "Mock neck, lightweight zipper, thumb loops. Perfect for cold-weather training and ultras.", gsm: "160 GSM" },
  { name: "Kids' Running Tee", desc: "CPSIA-compliant dyes, soft hand feel, sizes 2Y–14Y. School athletics, cross-country, fun runs.", gsm: "135 GSM" },
];

const fabricChoices = [
  { name: "100% Polyester Interlock", best: "Sublimation · all-over print · race day", moq: "50 pcs" },
  { name: "Polyester-Spandex (92/8)", best: "4-way stretch · next-to-skin · fitted", moq: "50 pcs" },
  { name: "Birdseye Mesh Poly", best: "Maximum airflow · hot marathons · training", moq: "50 pcs" },
  { name: "Recycled Poly (rPET)", best: "Sustainability story · 8–12 bottles per shirt", moq: "50 pcs" },
  { name: "Coolmax®-blend", best: "Advanced moisture management · premium races", moq: "50 pcs" },
  { name: "Lightweight Pique Poly", best: "Textured feel · training kit · coaching staff", moq: "50 pcs" },
];

const customisation = [
  { icon: Palette, title: "Edge-to-edge sublimation", desc: "Seam-to-seam CMYK print on polyester. No color limit, no setup fee, even single-piece runs possible." },
  { icon: Wind, title: "Performance finish", desc: "Moisture-wicking, anti-odor, UV-50+ optional. All finishes OEKO-TEX certified and CPSIA-compliant for kids." },
  { icon: Layers, title: "Print area", desc: "Front, back, both sleeves, neck label, hem tag. Full panel on poly. Sponsorship logos, race bibs, names — all in one print." },
  { icon: Ruler, title: "Sizes XS–3XL", desc: "Men's, women's, unisex, kids' sizing. Race-cut and classic-fit size charts. Spec sheet sent with every quote." },
];

const useCases = [
  { who: "Marathon & race organisers", what: "Marathon finisher shirts, 5K/10K race kits, charity run tees, ultras, fun runs" },
  { who: "Running clubs & teams", what: "Club kit nights, cross-country teams, training groups, coaching staff uniforms" },
  { who: "Schools & universities", what: "Cross-country, track & field, intramural leagues, university athletics, alumni runs" },
  { who: "Charity & fundraising", what: "Awareness walks, charity runs, sponsor-driven campaigns, community events" },
  { who: "Corporate wellness", what: "Company running clubs, fitness challenges, employee wellness programs" },
  { who: "Race directors & brands", what: "Branded race merchandise, finisher swag, sponsor co-branded apparel" },
];

const pricing = [
  { qty: "50 pcs", poly: "$11.50", mesh: "$12.50", note: "true low-MOQ" },
  { qty: "100 pcs", poly: "$9.20", mesh: "$10.20", note: "race-day sweet spot" },
  { qty: "300 pcs", poly: "$7.80", mesh: "$8.80", note: "club / team order" },
  { qty: "500 pcs", poly: "$6.90", mesh: "$7.90", note: "charity run bulk" },
  { qty: "1,000+ pcs", poly: "$6.20", mesh: "$7.20", note: "marathon / mass events" },
];

const faq = [
  {
    q: "What GSM is best for a marathon shirt?",
    a: "For race day, 135–145 GSM polyester interlock hits the sweet spot — light enough to disappear, durable enough to survive a marathon, and prints edge-to-edge. For training and club kit, 145–160 GSM with a poly-spandex blend gives more structure and a fitted feel.",
  },
  {
    q: "Can I add sponsor logos and runner names to the same shirt?",
    a: "Yes. Sublimation is a single dye process — sponsors, race bibs, event logos, and individual names are all printed in the same step. No extra screens, no setup fees. We send a print-area mock-up with every quote so you can see exactly where everything lands.",
  },
  {
    q: "Do you make kids' running shirts?",
    a: "Yes. CPSIA-compliant dyes, soft hand feel, sizes 2Y–14Y. Perfect for school cross-country, fun runs, and family race day. Same low MOQ 50 across the run (adult + kid sizes combined).",
  },
  {
    q: "Can you print a custom finisher shirt for my race?",
    a: "Yes — we work with race directors on finisher shirts, volunteer shirts, pacer shirts, and sponsor co-branded apparel. Sublimation lets you do unlimited design variations in one production run (e.g. different colors per wave or age group) with no setup fees.",
  },
  {
    q: "What's the difference between birdseye mesh and interlock for running?",
    a: "Birdseye mesh has tiny perforated holes for maximum airflow — great for hot marathons, summer training, and humid climates. Interlock is smoother and slightly warmer — better for cool-weather runs, layering, and a more refined look. Both print identically with sublimation.",
  },
  {
    q: "How fast can you deliver race-day shirts?",
    a: "Sample: 5–7 days from artwork approval. Bulk: 10–14 days after sample approval. DDP shipping adds 7–12 days to most countries. For race deadlines, we can split-ship samples first and bulk later if needed — just ask.",
  },
];

export default function RunningShirtsPage() {
  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Running Shirts", path: "/products/running-shirts" },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Custom All-Over Print Running Shirts",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/0128/hero.webp`,
        "description": "Custom sublimation running shirts, all-over print, low MOQ 50 pcs, DDP shipping worldwide. Poly interlock or mesh, 4-way stretch, anti-odor finish.",
        "brand": { "@type": "Brand", "name": "SublimApparel" },
        "manufacturer": { "@type": "Organization", "name": "SublimApparel" },
        "offers": {
          "@type": "Offer",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/running-shirts/`,
          "priceCurrency": "USD",
          "priceRange": "$",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      }} />
      <JsonLd data={buildFaqJsonLd(faq)} />

      {/* HERO */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-12">
          <div className="md:col-span-7 py-16 md:py-24">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              01 / Apparel · Running Shirts
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom
              <br />
              all-over print
              <br />
              <span className="text-[#cc3d00]">running shirts.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              Light, fast-dry, edge-to-edge sublimation. Built for marathons, club runs, charity races, and school athletics. MOQ 50 pcs, 7–15 day production, DDP to 100+ countries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-a-quote/"
                className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black"
              >
                Get a Running Shirt Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                href="/industries/endurance-race-events/"
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
              >
                See Race Events Page
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 border-t-2 border-black md:border-l-2 md:border-t-0 bg-[#faf9f6] flex items-center justify-center p-10">
            <div className="text-center">
              <Zap className="mx-auto h-24 w-24 text-[#cc3d00] md:h-32 md:w-32" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-600">
                Men's · Women's · Unisex · Kids
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-neutral-600">
                Interlock · Mesh · Poly-Spandex · Recycled
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-0 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-8 ${i < 3 ? "border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 border-black md:border-b-0" : ""}`}
            >
              <div className={`text-5xl font-black md:text-6xl ${s.color === "orange" ? "text-[#cc3d00]" : "text-black"}`}>
                {s.value}
              </div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-black">{s.label}</div>
              <div className="mt-1 text-xs text-neutral-500">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STYLES */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 002 / Styles ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Six cuts. <span className="text-[#cc3d00]">Race-ready.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">
            From the everyday training tee to the race-day singlet — same low MOQ, same 7–15 day production, same DDP shipping.
          </p>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {styles.map((s, i) => (
              <div
                key={s.name}
                className={`border-black p-6 ${i % 3 !== 2 ? "lg:border-r-2" : ""} ${i < 3 ? "border-b-2" : ""} ${i % 2 === 0 ? "md:border-r-2 lg:border-r-0" : "md:border-r-0"} bg-white`}
              >
                <div className="text-2xl font-black text-black">{s.name}</div>
                <p className="mt-2 text-sm text-neutral-700">{s.desc}</p>
                <div className="mt-3 inline-block border-2 border-black bg-[#faf9f6] px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-black">
                  {s.gsm}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FABRIC CHOICES */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 003 / Fabric ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Engineered for <span className="text-[#cc3d00]">running.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">
            Poly interlock, mesh, poly-spandex, recycled — all OEKO-TEX certified, all sublimation-grade, all run-tested on real runners.
          </p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Fabric</div>
              <div className="col-span-6 border-l-2 border-white p-3">Best for</div>
              <div className="col-span-3 border-l-2 border-white p-3">MOQ</div>
            </div>
            {fabricChoices.map((f, i) => (
              <div
                key={f.name}
                className={`grid grid-cols-12 text-sm ${i < fabricChoices.length - 1 ? "border-b-2 border-black" : ""}`}
              >
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{f.name}</div>
                <div className="col-span-6 border-r-2 border-black p-3 text-neutral-700">{f.best}</div>
                <div className="col-span-3 p-3 font-black text-[#cc3d00]">{f.moq}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-600">
            Need a fabric we don't list? <Link href="/get-a-quote/" className="font-bold text-black underline">Ask us →</Link> We source from 30+ mills in Guangdong, Zhejiang, and Jiangsu.
          </p>
        </div>
      </section>

      {/* CUSTOMISATION */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 004 / Customisation ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Your race. <span className="text-[#cc3d00]">Your design.</span>
          </h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {customisation.map((c, i) => (
              <div
                key={c.title}
                className={`p-6 ${i < 3 ? "lg:border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-black" : ""} ${i === 2 ? "border-b-2 lg:border-b-0 border-black" : ""}`}
              >
                <c.icon className="h-8 w-8 text-[#cc3d00]" strokeWidth={2} />
                <div className="mt-3 text-xl font-black text-black">{c.title}</div>
                <p className="mt-2 text-sm text-neutral-700">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-400">[ 005 / Who orders this ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            <span className="text-[#cc3d00]">50–10,000 pcs</span> per race.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-300 md:text-lg">
            Same factory, same team — from a 50-piece school cross-country kit to a 10,000-piece marathon finisher drop. Tell us what you need and we run it.
          </p>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div
                key={u.who}
                className={`p-6 ${i < 3 ? "lg:border-r-2 border-neutral-800" : ""} ${i < 3 ? "border-b-2 lg:border-b-0 border-neutral-800" : ""} ${i === 3 || i === 4 ? "border-b-2 lg:border-b-0 border-neutral-800 md:border-r-2 md:border-b-0" : ""}`}
              >
                <Users className="h-6 w-6 text-[#cc3d00]" strokeWidth={2} />
                <div className="mt-3 text-lg font-black text-white">{u.who}</div>
                <p className="mt-1 text-sm text-neutral-400">{u.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 006 / Pricing ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Transparent. <span className="text-[#cc3d00]">No quotes required</span> to see the range.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">
            Starting prices for full-print sublimation running shirts, 4-color CMYK, poly interlock or mesh. Custom quotes for heavier GSM, special trims, and rush orders.
          </p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Poly Interlock</div>
              <div className="col-span-3 border-l-2 border-white p-3">Birdseye Mesh</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div
                key={p.qty}
                className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}
              >
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.poly}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.mesh}</div>
                <div className="col-span-3 p-3 text-neutral-600">{p.note}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-600">
            All prices FOB China. DDP shipping to your country quoted separately. Setup, design redraw, and woven labels included. <Link href="/get-a-quote/" className="font-bold text-black underline">Get your exact quote →</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 007 / FAQ ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Common questions.
          </h2>
          <div className="mt-10 space-y-0 border-2 border-black bg-white">
            {faq.map((f, i) => (
              <details
                key={f.q}
                className={`group p-6 ${i < faq.length - 1 ? "border-b-2 border-black" : ""}`}
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4">
                  <span className="text-lg font-black text-black">{f.q}</span>
                  <span className="ml-4 shrink-0 text-2xl font-black text-[#cc3d00] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-base text-neutral-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-white/80">[ 008 / Next step ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-7xl">
            Send us your race design.
            <br />
            Get a quote in 1 business day.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            PNG, AI, or even a hand-drawn sketch — we'll redraw it free and quote poly + mesh options. Sample available for $25–$45.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/get-a-quote/"
              className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#cc3d00]"
            >
              Get a Running Shirt Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link
              href="/products/training-apparel/"
              className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
            >
              See Training Apparel
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
