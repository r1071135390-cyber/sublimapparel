import { JsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/page-metadata";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cloud, Layers, Palette, Ruler, Sparkles, Users, Wind } from "lucide-react";

export const metadata = buildPageMetadata({
    title: "Custom Sublimation Hoodies | All-Over Print, Low MOQ",
    description: "Custom sublimation hoodies — pullover, zip-up, cropped, heavyweight. 320–400 GSM fleece. All-over print, no setup fee, MOQ 50 pcs. DDP to 100+ countries.",
    keywords: ["custom hoodies", "sublimation hoodies", "all over print hoodie", "custom printed hoodies", "pull over hoodies", "zip up hoodies", "heavyweight hoodies", "streetwear hoodies", "team hoodies", "low MOQ hoodies"],
  });;

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "true low-MOQ", color: "orange" },
  { value: "10–18", label: "DAYS LEAD TIME", note: "production + QC", color: "white" },
  { value: "320–400", label: "GSM FLEECE", note: "heavyweight warmth", color: "white" },
  { value: "100+", label: "COUNTRIES DDP", note: "duty paid door-to-door", color: "orange" },
];

const styles = [
  { name: "Classic Pullover", desc: "Kangaroo pocket, double-layer hood, ribbed cuffs. The workhorse.", gsm: "320–360 GSM" },
  { name: "Full-Zip Hoodie", desc: "YKK chunky zip, split kangaroo pockets. Premium retail feel.", gsm: "340–380 GSM" },
  { name: "Heavyweight Hoodie", desc: "Boxy cut, dropped shoulders, 400 GSM. Streetwear-grade warmth.", gsm: "380–420 GSM" },
  { name: "Cropped Hoodie", desc: "Hits at the waist. Soft hand feel. For lifestyle and Gen-Z brands.", gsm: "300–340 GSM" },
  { name: "Quarter-Zip Pullover", desc: "Stand collar, no hood. Smart-casual, ideal for corporate and team outerwear.", gsm: "320–360 GSM" },
  { name: "Kids' Hoodie", desc: "CPSIA-compliant, soft fleece, no drawstrings until 7Y+ for safety. Sizes 2Y–14Y.", gsm: "280–320 GSM" },
];

const fabricChoices = [
  { name: "100% Polyester Fleece", best: "All-over print · streetwear · warm", moq: "50 pcs" },
  { name: "Poly-Cotton Blend (65/35)", best: "Hybrid · matte finish · retail feel", moq: "50 pcs" },
  { name: "French Terry (Poly)", best: "Looser knit · mid-weight · lifestyle", moq: "50 pcs" },
  { name: "Brushed Back Fleece", best: "Soft inner · warmth · premium feel", moq: "50 pcs" },
  { name: "Recycled Poly Fleece (rPET)", best: "12 bottles per hoodie · eco story", moq: "50 pcs" },
  { name: "Organic Cotton Fleece", best: "GOTS · natural · premium brands", moq: "50 pcs" },
];

const customisation = [
  { icon: Palette, title: "All-over print", desc: "Seam-to-seam sublimation on polyester. CMYK + white ink, no color limit, no setup fee. Print across the hood, sleeves, and kangaroo pocket." },
  { icon: Ruler, title: "Sizes XS–3XL", desc: "Unisex, men's, women's, kids' sizing. Custom size charts on request. Oversized fit available." },
  { icon: Layers, title: "Print area", desc: "Front, back, both sleeves, hood panels, neck label, hem tag. Poly sublimation: full panel." },
  { icon: Sparkles, title: "Trims", desc: "YKK zips, metal eyelets, woven labels, custom drawcords, custom aglets, hang tags, polybags." },
];

const useCases = [
  { who: "Streetwear brands", what: "Drops, capsules, retailer collections, season pieces" },
  { who: "Sports teams & clubs", what: "Travel hoodies, fan wear, post-game outerwear" },
  { who: "Universities & Greek life", what: "Chapter hoodies, alumni gifts, dorm merch" },
  { who: "Corporate teams", what: "Company hoodies, branded outerwear, holiday gifts" },
  { who: "Music & creator merch", what: "Tour merch, fan clubs, YouTuber merch" },
  { who: "Event swag", what: "Conference giveaways, festival merch, sponsor gifts" },
];

const pricing = [
  { qty: "50 pcs", poly: "$18.50", cotton: "$22.00", note: "true low-MOQ" },
  { qty: "100 pcs", poly: "$15.80", cotton: "$18.50", note: "sweet spot" },
  { qty: "300 pcs", poly: "$13.20", cotton: "$15.80", note: "team / brand orders" },
  { qty: "500 pcs", poly: "$11.50", cotton: "$13.90", note: "bulk / corporate" },
  { qty: "1,000+ pcs", poly: "$10.20", cotton: "$12.50", note: "wholesale" },
];

const faq = [
  {
    q: "Can I print across the hood and sleeves?",
    a: "Yes on polyester. Sublimation bonds dye into the fibers, so the entire garment becomes the canvas — hood, sleeves, kangaroo pocket, even the lining. On cotton-blend hoodies, print area is A4-size per panel.",
  },
  {
    q: "What's the warmest fabric you offer?",
    a: "Our 400 GSM brushed-back fleece is the heaviest. The inside is brushed for a soft hand feel and serious warmth. For true cold-weather outerwear, we also do poly-filled lined hoodies and sherpa-lined variants.",
  },
  {
    q: "Do you do custom trims like YKK zips and metal eyelets?",
    a: "Yes. We source YKK chunky zips, custom aglets, metal eyelets in matte black or silver, custom drawcords, and woven main labels. All included in your quote.",
  },
  {
    q: "Can kids' hoodies be CPSIA-compliant?",
    a: "Yes. We use CPSIA-compliant dyes, no drawstrings on sizes under 7Y, and pull-tabs that meet small-parts regulations. Compliance certificate included with every kids' order.",
  },
  {
    q: "What about sustainability?",
    a: "We run recycled poly fleece (rPET) made from 12 plastic bottles per hoodie, and GOTS-certified organic cotton fleece. Both available at MOQ 50 pcs. The eco story sells — most streetwear buyers now ask.",
  },
];

export default function HoodiesPage() {
  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Hoodies", path: "/products/hoodies" },
      ])} />
      <JsonLd data={buildFaqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Custom Sublimation Hoodies",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/og-default.jpg`,
        "description": "Custom sublimation printing, low MOQ 50 pcs, DDP shipping worldwide.",
        "brand": { "@type": "Brand", "name": "SublimApparel" },
        "manufacturer": { "@type": "Organization", "name": "SublimApparel" },
        "offers": {
          "@type": "Offer",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/hoodies/`,
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
              02 / Apparel · Hoodies
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom
              <br />
              sublimation
              <br />
              <span className="text-[#cc3d00]">hoodies.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              All-over print on 320–400 GSM fleece. No setup fee, MOQ 50 pcs, 10–18 day production, DDP to 100+ countries. Pullover, zip-up, heavyweight, kids' — all from one factory.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/get-a-quote/" className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black">
                Get a Hoodie Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link href="/fabric/cotton/" className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">
                See Cotton Process
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 border-t-2 border-black md:border-l-2 md:border-t-0 bg-[#faf9f6] flex items-center justify-center p-10">
            <div className="text-center">
              <Cloud className="mx-auto h-24 w-24 text-[#cc3d00] md:h-32 md:w-32" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-600">Pullover · Zip-up · Heavyweight</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-neutral-600">320–400 GSM · All-over print</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-0 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-8 ${i < 3 ? "border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 border-black md:border-b-0" : ""}`}>
              <div className={`text-5xl font-black md:text-6xl ${s.color === "orange" ? "text-[#cc3d00]" : "text-black"}`}>{s.value}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-black">{s.label}</div>
              <div className="mt-1 text-xs text-neutral-500">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 002 / Styles ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Six cuts. <span className="text-[#cc3d00]">All printable.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">From the workhorse pullover to the heavyweight streetwear cut — same low MOQ, same 10–18 day production.</p>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {styles.map((s, i) => (
              <div key={s.name} className={`border-black p-6 ${i % 3 !== 2 ? "lg:border-r-2" : ""} ${i < 3 ? "border-b-2" : ""} ${i % 2 === 0 ? "md:border-r-2 lg:border-r-0" : "md:border-r-0"} bg-white`}>
                <div className="text-2xl font-black text-black">{s.name}</div>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Poly or cotton. <span className="text-[#cc3d00]">Both fleece.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Poly for true all-over print, cotton for soft hand feel, blends for the middle ground.</p>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Your design. <span className="text-[#cc3d00]">Your trims.</span></h2>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl"><span className="text-[#cc3d00]">50–10,000 pcs</span> per order.</h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-300 md:text-lg">From a single chapter drop to a multi-thousand-piece corporate rebrand.</p>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Transparent. <span className="text-[#cc3d00]">No quotes required</span> to see the range.</h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Starting prices for 340 GSM full-print sublimation hoodies. Heavier GSM, premium trims, and rush orders quoted separately.</p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Polyester</div>
              <div className="col-span-3 border-l-2 border-white p-3">Poly-Cotton</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div key={p.qty} className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.poly}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.cotton}</div>
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
          <h2 className="text-4xl font-black leading-tight md:text-7xl">Send us your design.<br />Get a hoodie quote in 1 business day.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-a-quote/" className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#cc3d00]">
              Get a Hoodie Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
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
