import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flag, Users, Palette, Ruler, Layers, Shirt, Sun, Mountain, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Golf Apparel | Sublimated Polos & Quarter-Zips",
  description: "Premium custom golf polos, mock necks, and quarter-zips for country clubs, tournaments, and corporate golf days. Sublimated all-over print, moisture-wicking...",
  keywords: [
    "golf apparel",
    "golf polo custom",
    "sublimated golf shirts",
    "custom golf polos",
    "country club uniforms",
    "corporate golf day apparel",
    "tournament golf shirts",
    "all over print polo",
    "mock neck golf",
    "quarter zip golf",
    "moisture wicking polo",
    "DDP golf apparel",
  ],

  openGraph: {
    images: ["/product-lineup.webp"],
  },
};

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "tournament / club", color: "orange" },
  { value: "15–20", label: "DAYS LEAD TIME", note: "from art approval", color: "white" },
  { value: "180–220", label: "GSM POLY-SPANDEX", note: "moisture-wicking", color: "white" },
  { value: "$16–24", label: "STARTING POLO", note: "vs $60 retail", color: "orange" },
];

const styles = [
  { name: "Classic Polo", desc: "3-button placket, rib collar, side vents. The workhorse for country clubs, corporate golf days, charity tournaments.", gsm: "180–200 GSM" },
  { name: "Mock Neck", desc: "No collar, hidden quarter zip, modern athletic cut. Tech-forward country clubs, member-guest events, pro shop retail.", gsm: "180–200 GSM" },
  { name: "Quarter-Zip Pullover", desc: "Cool-morning rounds, shoulder season. Brushed interior, flatlock seams, modern fit.", gsm: "220–260 GSM" },
  { name: "Long Sleeve Polo", desc: "Cool-weather rounds, links-style. Same placket, heavier weight, UPF 30+.", gsm: "200–220 GSM" },
  { name: "Women's Sleeveless", desc: "Racerback or cap-sleeve polo, golf-specific women's cut. Slightly longer back hem.", gsm: "180–200 GSM" },
  { name: "Women's Polo", desc: "Shorter sleeves, narrower shoulders, tapered waist. Matches men's in the same order at no surcharge.", gsm: "180–200 GSM" },
];

const fabricChoices = [
  { name: "Poly-Spandex Stretch", best: "Polos · 4-way stretch · swing-friendly · anti-wrinkle", moq: "50 pcs" },
  { name: "Birdseye Mesh Knit", best: "Hot climates · max airflow · textured look", moq: "50 pcs" },
  { name: "UPF 30+ Sun", best: "All-day rounds · UV protection · mid-summer", moq: "50 pcs" },
  { name: "Recycled Poly (rPET)", best: "Eco-aware clubs · sustainability story · GRS certified", moq: "50 pcs" },
  { name: "Brushed Poly Fleece", best: "Quarter-zips · shoulder season · cooler rounds", moq: "50 pcs" },
];

const customisation = [
  { icon: Shirt, title: "Left-chest logo", desc: "Embroidery or sublimated. Most clubs go full-sublimation (no decals, won't peel in wash)." },
  { icon: Palette, title: "All-over print", desc: "Sub-sponsor panels, tartans, stripes, course logos, club crests. Sublimation means unlimited color." },
  { icon: Trophy, title: "Tournament-ready", desc: "Sponsor panels on sleeves and back yoke. Easy to swap sponsor per event." },
  { icon: Ruler, title: "Men's & women's cut", desc: "Women's cut has shorter sleeves, narrower shoulders, longer back. Mixed in one order at no surcharge." },
];

const useCases = [
  { who: "Country clubs", what: "Member polos, pro shop apparel, club championship kit" },
  { who: "Golf tournaments", what: "Charity classics, member-guest, pro-am, sponsor polos" },
  { who: "Corporate golf days", what: "Client entertainment, team building, executive retreats" },
  { who: "Golf apparel brands", what: "Retail collections, capsule drops, pop-up merch" },
  { who: "Resort & hospitality", what: "Staff uniforms, range apparel, course concierges" },
  { who: "College & high school teams", what: "Team polos, travel kits, fundraising gear" },
];

const pricing = [
  { qty: "50 pcs", polo: "$16.00", quarter: "$22.00", note: "tournament / club" },
  { qty: "100 pcs", polo: "$13.50", quarter: "$19.00", note: "member kit" },
  { qty: "300 pcs", polo: "$11.50", quarter: "$16.50", note: "league bulk" },
  { qty: "500 pcs", polo: "$10.00", quarter: "$14.50", note: "retail / pro shop" },
  { qty: "1,000+ pcs", polo: "$8.50", quarter: "$12.50", note: "brand drop" },
];

const faq = [
  {
    q: "Will the fabric show sweat?",
    a: "Our 180-200 GSM poly-spandex is moisture-wicking and anti-microbial. The fabric pulls sweat to the surface where it evaporates — most patterns and heathered colors hide any moisture marks completely. We can recommend specific colorways for hot-climate clubs.",
  },
  {
    q: "Can you match our club crest exactly?",
    a: "Yes. Send us a vector file (AI, EPS, or SVG) or a high-res PNG — we'll redraw it for free. We use the exact Pantone colors, the right proportions, and the correct print method (sublimated vs embroidered crest).",
  },
  {
    q: "Do you make women's cut?",
    a: "Yes — women's cut has shorter sleeves, narrower shoulders, slightly tapered waist, and longer back hem. You can mix men's and women's in the same order, same design, no surcharge.",
  },
  {
    q: "Can I get different sponsors on each sleeve?",
    a: "Yes — sponsor panels on left sleeve, right sleeve, and back yoke are all included in the sublimation. We can also do event-specific versions: same template, different sponsor per tournament, no setup fee on re-orders.",
  },
  {
    q: "What's the lead time for a tournament?",
    a: "Standard 15-25 days from art approval. For tighter deadlines (10-14 days) we can expedite the production line for a 15% rush fee. Tell us your tournament date up front — we'll work backwards to your deadline.",
  },
];

export default function GolfPage() {
  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Golf Shirts", path: "/products/golf" },
      ])} />
      <JsonLd data={buildFaqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Custom Golf Apparel — Polos, Mock Necks, Quarter-Zips",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/og-default.jpg`,
        "description": "Custom sublimation golf apparel — polos, mock necks, quarter-zips, long sleeve. MOQ 50 pcs, DDP shipping worldwide.",
        "brand": { "@type": "Brand", "name": "SublimApparel" },
        "manufacturer": { "@type": "Organization", "name": "SublimApparel" },
        "offers": {
          "@type": "Offer",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/golf/`,
          "priceCurrency": "USD",
          "priceRange": "$",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      }} />

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-12">
          <div className="md:col-span-7 py-16 md:py-24">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              06 / Apparel · Golf
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom golf.
              <br />
              <span className="text-[#cc3d00]">Polo, mock, zip.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              Sublimated polos, mock necks, and quarter-zips for country clubs, tournaments, and corporate golf days. Poly-spandex 4-way stretch, swing-friendly, anti-wrinkle, UPF 30+. At factory-direct pricing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/get-a-quote/" className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black">
                Get a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link href="/cases/corporate-programs/" className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">
                See Club Cases
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 border-t-2 border-black md:border-l-2 md:border-t-0 bg-[#0a0a0a] flex items-center justify-center p-10">
            <div className="text-center">
              <Flag className="mx-auto h-24 w-24 text-[#cc3d00] md:h-32 md:w-32" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white">Country Clubs</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white">Tournaments · Corporate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-0 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-8 ${i < 3 ? "border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 border-black md:border-b-0" : ""}`}>
              <div className={`text-4xl font-black md:text-5xl ${s.color === "orange" ? "text-[#cc3d00]" : "text-black"}`}>{s.value}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-black">{s.label}</div>
              <div className="mt-1 text-xs text-neutral-500">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 001.5 / Gallery ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From the <span className="text-[#cc3d00]">factory floor</span> to the first tee.</h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            <div className="border-2 border-black bg-white">
              <img src="/golf-polo-navy.webp" alt="Custom sublimated navy golf polo with all-over abstract print" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Polo · Navy</div>
            </div>
            <div className="border-2 border-t-0 border-black bg-white md:border-t-2 md:border-l-0">
              <img src="/golf-quarter-zip.webp" alt="Custom sublimated charcoal quarter-zip with mountain landscape print" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Quarter-Zip · Mountain</div>
            </div>
            <div className="border-2 border-t-0 border-black bg-white md:border-t-2 lg:border-l-0">
              <img src="/golf-mockneck-tropical.webp" alt="Custom sublimated white mock neck with tropical leaf print" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Mock Neck · Tropical</div>
            </div>
            <div className="border-2 border-t-0 border-black bg-white md:border-t-2 lg:border-l-0">
              <img src="/golf-womens-sleeveless.webp" alt="Custom sublimated women's pink sleeveless polo with floral print" className="aspect-[4/5] w-full object-cover" />
              <div className="border-t-2 border-black p-3 text-xs font-black uppercase tracking-widest text-black">Women's · Floral</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 002 / Styles ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From <span className="text-[#cc3d00]">classic polo</span> to quarter-zip.</h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">The full range of golf tops — all sublimation-ready.</p>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {styles.map((s, i) => (
              <div key={s.name} className={`border-black p-6 ${i % 3 !== 2 ? "lg:border-r-2" : ""} ${i < 3 ? "border-b-2" : ""} ${i % 2 === 0 ? "md:border-r-2 lg:border-r-0" : "md:border-r-0"} bg-white`}>
                <div className="text-xl font-black text-black">{s.name}</div>
                <p className="mt-2 text-sm text-neutral-700">{s.desc}</p>
                <div className="mt-3 inline-block border-2 border-black bg-[#faf9f6] px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-black">{s.gsm}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 003 / Fabric ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Swing-friendly. <span className="text-[#cc3d00]">Sweat-free.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">All fabrics are poly or poly-spandex — we never use cotton for golf performance wear.</p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Fabric</div>
              <div className="col-span-6 border-l-2 border-white p-3">Best for</div>
              <div className="col-span-3 border-l-2 border-white p-3">MOQ</div>
            </div>
            {fabricChoices.map((f, i) => (
              <div key={f.name} className={`grid grid-cols-12 text-sm ${i < fabricChoices.length - 1 ? "border-b-2 border-black" : ""}`}>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{f.name}</div>
                <div className="col-span-6 border-r-2 border-black p-3 text-neutral-700">{f.best}</div>
                <div className="col-span-3 p-3 font-black text-[#cc3d00]">{f.moq}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 004 / Customisation ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Tournament-ready <span className="text-[#cc3d00]">detail.</span></h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {customisation.map((c, i) => (
              <div key={c.title} className={`p-6 ${i < 3 ? "lg:border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-black" : ""} ${i === 2 ? "border-b-2 lg:border-b-0 border-black" : ""}`}>
                <c.icon className="h-8 w-8 text-[#cc3d00]" strokeWidth={2} />
                <div className="mt-3 text-xl font-black text-black">{c.title}</div>
                <p className="mt-2 text-sm text-neutral-700">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-400">[ 005 / Who orders this ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">From <span className="text-[#cc3d00]">the 1st tee</span> to the 19th hole.</h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div key={u.who} className={`p-6 ${i < 3 ? "lg:border-r-2 border-neutral-800" : ""} ${i < 3 ? "border-b-2 lg:border-b-0 border-neutral-800" : ""} ${i === 3 || i === 4 ? "border-b-2 lg:border-b-0 border-neutral-800 md:border-r-2 md:border-b-0" : ""}`}>
                <Users className="h-6 w-6 text-[#cc3d00]" strokeWidth={2} />
                <div className="mt-3 text-lg font-black text-white">{u.who}</div>
                <p className="mt-1 text-sm text-neutral-400">{u.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 006 / Pricing ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">A fraction of <span className="text-[#cc3d00]">retail.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Starting prices for sublimation polos and quarter-zips. Retail equivalent is $60+ — you get the same fabric and quality, factory-direct.</p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Classic Polo</div>
              <div className="col-span-3 border-l-2 border-white p-3">Quarter-Zip</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div key={p.qty} className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.polo}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.quarter}</div>
                <div className="col-span-3 p-3 text-neutral-600">{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 007 / FAQ ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Common questions.</h2>
          <div className="mt-10 space-y-0 border-2 border-black bg-white">
            {faq.map((f, i) => (
              <details key={f.q} className={`group p-6 ${i < faq.length - 1 ? "border-b-2 border-black" : ""}`}>
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

      <section className="bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-white/80">[ 008 / Next step ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-7xl">Got a tournament? <br />Get a quote in 1 business day.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-a-quote/" className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#cc3d00]">
              Get a Golf Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link href="/products/" className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">
              See All Apparel
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
