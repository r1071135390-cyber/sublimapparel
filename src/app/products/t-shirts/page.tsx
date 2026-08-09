import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Shirt,
  Sparkles,
  Layers,
  Leaf,
  Palette,
  Ruler,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Sublimation T-Shirts | All-Over Print, Low MOQ | SublimApparel",
  description:
    "Custom sublimation t-shirts — all-over print, no setup fee, MOQ 50 pcs. Polyester and 100% cotton. Men's, women's, unisex, kids' sizes. Ships in 7–15 days. DDP to 100+ countries.",
  keywords: [
    "custom sublimation t-shirts",
    "sublimation tee shirts",
    "all over print t-shirt",
    "custom printed t-shirts",
    "low MOQ t-shirts",
    "polyester t-shirt printing",
    "cotton t-shirt printing",
    "team t-shirts",
    "event t-shirts",
    "promo t-shirts",
  ],
};

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "true low-MOQ", color: "orange" },
  { value: "7–15", label: "DAYS LEAD TIME", note: "production + QC", color: "white" },
  { value: "180–220", label: "GSM RANGE", note: "tee weight", color: "white" },
  { value: "100+", label: "COUNTRIES DDP", note: "duty paid door-to-door", color: "orange" },
];

const styles = [
  { name: "Classic Crewneck", desc: "The everyday tee. Set-in sleeves, ribbed crew neck, regular fit.", gsm: "180–200 GSM" },
  { name: "Heavyweight Tee", desc: "Thicker fabric, boxier cut. Streetwear and premium retail feel.", gsm: "220–240 GSM" },
  { name: "Fitted Women's Tee", desc: "Side-seamed, tapered waist, scoop or crew neck. Polyester-spandex blend available.", gsm: "170–190 GSM" },
  { name: "Long-Sleeve Tee", desc: "Year-round staple for layering. Same all-over print area as short-sleeve.", gsm: "180–200 GSM" },
  { name: "Kids' Tee", desc: "CPSIA-compliant dyes, soft hand feel, sizes 2Y–14Y. MOQ 50 across the run.", gsm: "160–180 GSM" },
  { name: "Tank Top / Sleeveless", desc: "Racerback, standard, or A-line. Great for runs, gyms, summer events.", gsm: "150–170 GSM" },
];

const fabricChoices = [
  { name: "100% Polyester", best: "Sublimation · all-over print · sportswear", moq: "50 pcs" },
  { name: "100% Cotton", best: "DTG/DTF · soft hand feel · lifestyle", moq: "50 pcs" },
  { name: "Cotton-Poly Blend (65/35)", best: "Hybrid · matte finish · retail feel", moq: "100 pcs" },
  { name: "Organic Cotton (GOTS)", best: "Eco line · natural dyes · premium brands", moq: "100 pcs" },
  { name: "Recycled Poly (rPET)", best: "Sustainability story · 12–20 bottles per shirt", moq: "100 pcs" },
  { name: "Tri-Blend (poly/cotton/rayon)", best: "Vintage feel · fashion · music merch", moq: "100 pcs" },
];

const customisation = [
  { icon: Palette, title: "All-over print", desc: "Seam-to-seam sublimation on polyester. CMYK + white ink, no color limit, no setup fee." },
  { icon: Ruler, title: "Sizes XXS–5XL", desc: "Men's, women's, unisex, kids' sizing. Custom size charts on request. Spec sheet sent with every quote." },
  { icon: Layers, title: "Print area", desc: "Front, back, both sleeves, neck label, hem tag. Poly sublimation: full panel. Cotton: A4 per panel." },
  { icon: Sparkles, title: "Finishing", desc: "Woven labels, hang tags, polybags, fold & pack, individual SKU stickers, retail-ready bundles." },
];

const useCases = [
  { who: "Event organisers", what: "Music festivals, conferences, charity runs, trade shows" },
  { who: "Sports teams & clubs", what: "League nights, tournaments, training kits, fan merch" },
  { who: "Schools & universities", what: "Orientation, Greek life, dorm apparel, class shirts" },
  { who: "Marketing teams", what: "Company swag, conference booth tees, customer gifts" },
  { who: "Brands & creators", what: "Dropshipping lines, influencer merch, YouTuber merch, Patreon rewards" },
  { who: "Fundraisers & campaigns", what: "Charity events, political campaigns, awareness walks" },
];

const pricing = [
  { qty: "50 pcs", poly: "$11.50", cotton: "$13.50", note: "true low-MOQ" },
  { qty: "100 pcs", poly: "$9.20", cotton: "$10.80", note: "sweet spot for events" },
  { qty: "300 pcs", poly: "$7.80", cotton: "$9.20", note: "team / brand orders" },
  { qty: "500 pcs", poly: "$6.90", cotton: "$8.40", note: "bulk / corporate" },
  { qty: "1,000+ pcs", poly: "$6.20", cotton: "$7.60", note: "wholesale" },
];

const faq = [
  {
    q: "Can I print all over the shirt, including the sleeves?",
    a: "Yes on polyester (sublimation) — full panel, seam-to-seam. On cotton we can print A4-size areas per panel (front, back, each sleeve). We send a print-area mock-up with every quote so you can see exactly where your design will land.",
  },
  {
    q: "What's the difference between sublimation and DTG on t-shirts?",
    a: "Sublimation bonds dye into polyester fibers — zero hand feel, vibrant, all-over possible, but only on poly. DTG lays ink on top of cotton — soft hand feel, but limited to A4 per panel. We run both. Tell us your fabric and we'll recommend the right process.",
  },
  {
    q: "Do you have a sample I can feel before bulk?",
    a: "Yes. We send a printed sample of your design on the fabric you choose. Sample cost $25–$45 (depending on style), deductible from any bulk order over $1,000.",
  },
  {
    q: "What file format do you need?",
    a: "PNG (transparent background) at 150+ DPI for photos, or AI / SVG / PDF for vector. We redraw rough sketches for free if your art is hand-drawn or low-res.",
  },
  {
    q: "Can you ship to my country DDP?",
    a: "Yes. We ship DDP (Delivered Duty Paid) to 100+ countries, with US warehouse stock for 2–5 day delivery to most US ZIPs. EU customers pay no customs; UK customers pay no duties; AU / CA customers pay no GST / HST at the door.",
  },
];

export default function TShirtsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-12">
          <div className="md:col-span-7 py-16 md:py-24">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              01 / Apparel · T-shirts
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom
              <br />
              sublimation
              <br />
              <span className="text-[#ff4d00]">t-shirts.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              All-over print on polyester and DTG on 100% cotton. No setup fee, MOQ 50 pcs, 7–15 day production, DDP to 100+ countries. Poly and cotton, same factory, same MOQ.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-a-quote"
                className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black"
              >
                Get a Tee Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                href="/fabric/cotton"
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
              >
                See Cotton Process
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 border-t-2 border-black md:border-l-2 md:border-t-0 bg-[#faf9f6] flex items-center justify-center p-10">
            <div className="text-center">
              <Shirt className="mx-auto h-24 w-24 text-[#ff4d00] md:h-32 md:w-32" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-600">
                Men's · Women's · Unisex · Kids
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-neutral-600">
                Poly · Cotton · Organic · Recycled
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
              <div className={`text-5xl font-black md:text-6xl ${s.color === "orange" ? "text-[#ff4d00]" : "text-black"}`}>
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
            Six cuts. <span className="text-[#ff4d00]">One MOQ.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">
            From the everyday crewneck to the racing singlet — same low MOQ, same 7–15 day production, same DDP shipping.
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
            Poly or cotton. <span className="text-[#ff4d00]">You choose.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">
            Most factories pick one. We run both — sublimation on polyester, DTG and DTF on cotton — so you match fabric to brand, not the other way around.
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
                <div className="col-span-3 p-3 font-black text-[#ff4d00]">{f.moq}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-600">
            Need a fabric we don't list? <Link href="/get-a-quote" className="font-bold text-black underline">Ask us →</Link> We source from 30+ mills in Guangdong, Zhejiang, and Jiangsu.
          </p>
        </div>
      </section>

      {/* CUSTOMISATION */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 004 / Customisation ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Your design. <span className="text-[#ff4d00]">Your spec.</span>
          </h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {customisation.map((c, i) => (
              <div
                key={c.title}
                className={`p-6 ${i < 3 ? "lg:border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-black" : ""} ${i === 2 ? "border-b-2 lg:border-b-0 border-black" : ""}`}
              >
                <c.icon className="h-8 w-8 text-[#ff4d00]" strokeWidth={2} />
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
            <span className="text-[#ff4d00]">50–10,000 pcs</span> per order.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-300 md:text-lg">
            Same factory, same team — from a 50-piece Greek-life drop to a 10,000-piece corporate rebrand. Tell us what you need and we run it.
          </p>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div
                key={u.who}
                className={`p-6 ${i < 3 ? "lg:border-r-2 border-neutral-800" : ""} ${i < 3 ? "border-b-2 lg:border-b-0 border-neutral-800" : ""} ${i === 3 || i === 4 ? "border-b-2 lg:border-b-0 border-neutral-800 md:border-r-2 md:border-b-0" : ""}`}
              >
                <Users className="h-6 w-6 text-[#ff4d00]" strokeWidth={2} />
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
            Transparent. <span className="text-[#ff4d00]">No quotes required</span> to see the range.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">
            Starting prices for full-print sublimation tees, 180 GSM, 4-color CMYK, poly or cotton. Custom quotes for heavier GSM, special trims, and rush orders.
          </p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Polyester</div>
              <div className="col-span-3 border-l-2 border-white p-3">100% Cotton</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div
                key={p.qty}
                className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}
              >
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.poly}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.cotton}</div>
                <div className="col-span-3 p-3 text-neutral-600">{p.note}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-600">
            All prices FOB China. DDP shipping to your country quoted separately. Setup, design redraw, and woven labels included. <Link href="/get-a-quote" className="font-bold text-black underline">Get your exact quote →</Link>
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
                  <span className="ml-4 shrink-0 text-2xl font-black text-[#ff4d00] transition-transform group-open:rotate-45">+</span>
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
            Send us your design.
            <br />
            Get a quote in 1 business day.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            PNG, AI, or even a hand-drawn sketch — we'll redraw it free and quote poly + cotton options. Sample available for $25–$45.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/get-a-quote"
              className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#ff4d00]"
            >
              Get a Tee Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
            >
              See All Apparel
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
