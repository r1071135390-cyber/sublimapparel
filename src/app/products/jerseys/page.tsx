import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shirt, Users, Palette, Ruler, Layers, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Team Jerseys | Soccer, Baseball, Basketball",
  description:
    "Custom sublimation team jerseys for soccer, baseball, basketball, volleyball. Full dye-sublimation, no setup fee, MOQ 50 pcs, 10–15 day production. Numbers, names, logos all printed — not stitched.",
  keywords: [
    "custom team jerseys",
    "sublimation jerseys",
    "soccer jersey custom",
    "baseball jersey sublimation",
    "basketball jersey printing",
    "volleyball team jerseys",
    "reversible jerseys",
    "all over print jersey",
    "sublimated jerseys",
    "low MOQ jerseys",
  ],

  openGraph: {
    images: ["/hero-jersey.webp"],
  },
};

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "true low-MOQ", color: "orange" },
  { value: "10–15", label: "DAYS LEAD TIME", note: "production + QC", color: "white" },
  { value: "140–180", label: "GSM INTERLOCK", note: "moisture-wicking", color: "white" },
  { value: "100+", label: "COUNTRIES DDP", note: "duty paid door-to-door", color: "orange" },
];

const styles = [
  { name: "Short Sleeve Jersey", desc: "Classic cut for soccer, baseball, basketball, volleyball. V-neck or crew neck.", gsm: "140–160 GSM" },
  { name: "Sleeveless Jersey", desc: "Basketball, lacrosse, training pinnie style. Deep arm holes for range of motion.", gsm: "140–160 GSM" },
  { name: "Long Sleeve Jersey", desc: "Cold-weather training, compression base layer, esports-style esports uniforms.", gsm: "160–180 GSM" },
  { name: "Reversible Jersey", desc: "Two-color, two-design in one garment. For practice vs game day or away/home.", gsm: "160–180 GSM" },
  { name: "Compression Base Layer", desc: "Tight-fit, mesh inserts, four-way stretch. Worn under jersey or solo for training.", gsm: "180–200 GSM" },
  { name: "Kids' Team Jersey", desc: "CPSIA-compliant, soft seams, numbers sized for small frames. Sizes 2Y–14Y.", gsm: "140–160 GSM" },
];

const fabricChoices = [
  { name: "Polyester Interlock", best: "All sports · smooth face · true all-over print", moq: "50 pcs" },
  { name: "Polyester Mesh (eyelet)", best: "Soccer/Baseball · breathability · game day", moq: "50 pcs" },
  { name: "Polyester Birdseye", best: "Reversibles · textured · two-face", moq: "50 pcs" },
  { name: "Coolmax / Performance", best: "High-intensity · moisture-wicking · premium", moq: "50 pcs" },
  { name: "Spandex Blend (92/8)", best: "Compression · stretch · base layer", moq: "50 pcs" },
  { name: "Recycled Poly Interlock", best: "Eco story · 8 bottles per jersey · retail", moq: "50 pcs" },
];

const customisation = [
  { icon: Palette, title: "All-over print", desc: "Front, back, both sleeves, side panels — all sublimated as one image. Numbers and names printed, not stitched (won't peel)." },
  { icon: Shirt, title: "Cut & style", desc: "V-neck, crew, button placket, sleeveless, raglan, set-in sleeves. Custom collar and cuff designs available." },
  { icon: Ruler, title: "Sizes YXS–3XL", desc: "Adult and youth sizing. Custom size charts on request. Women's and men's specific cuts." },
  { icon: Sparkles, title: "Trims", desc: "Custom woven neck labels, embroidered sponsor patches, screen-printed numbers, custom tags, polybags." },
];

const useCases = [
  { who: "School teams", what: "PE uniforms, after-school leagues, varsity, JV" },
  { who: "Club & travel teams", what: "Year-round rosters, tournament kits" },
  { who: "Adult leagues", what: "Recreational, beer league, social sports" },
  { who: "Esports & gaming", what: "Tournament jerseys, team kits, pro-style merch" },
  { who: "Workplace teams", what: "Corporate leagues, charity matches" },
  { who: "Pickup groups", what: "Friend groups, alumni teams, weekend warriors" },
];

const pricing = [
  { qty: "50 pcs", poly: "$14.50", compression: "$18.00", note: "true low-MOQ" },
  { qty: "100 pcs", poly: "$12.20", compression: "$15.50", note: "sweet spot" },
  { qty: "300 pcs", poly: "$10.50", compression: "$13.50", note: "team orders" },
  { qty: "500 pcs", poly: "$9.40", compression: "$12.20", note: "bulk / league" },
  { qty: "1,000+ pcs", poly: "$8.50", compression: "$11.00", note: "wholesale" },
];

const faq = [
  {
    q: "Are numbers and names printed or stitched?",
    a: "Printed via sublimation, then heat-pressed. This means no peeling, no cracking, no extra cost per number/name, and a softer feel on the body. We do offer embroidered crests and sponsor patches as a separate add-on if you want the raised look.",
  },
  {
    q: "Can each player have a different name and number?",
    a: "Yes — for no extra cost. We don't charge per name/number like stitched jerseys do. Just send us your roster (CSV or spreadsheet) and we'll set it up. Minimum order 50 pcs for individual names.",
  },
  {
    q: "What's the difference between interlock and mesh?",
    a: "Interlock is smooth, dense, and shows the print at maximum vibrancy — best for all-over print. Mesh has tiny holes for breathability — best for hot-weather game day. We use interlock for most sublimation jerseys and recommend it unless you need serious airflow.",
  },
  {
    q: "Do you do reversible jerseys?",
    a: "Yes. Two separate designs printed on one birdseye fabric, hemmed together at the shoulders. Each side can have a completely different color, logo, and number set. Popular for away/home combinations.",
  },
  {
    q: "Can I order a full uniform set (jersey + shorts)?",
    a: "Yes. Most teams order jerseys + matching shorts. We can do both as a coordinated set, same lead time, with custom designs on both pieces. Ask about our team bundle pricing.",
  },
];

export default function JerseysPage() {
  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Jerseys", path: "/products/jerseys" },
      ])} />
      <JsonLd data={buildFaqJsonLd(faq)} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Custom Team Jerseys",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/og-default.jpg`,
        "description": "Custom sublimation printing, low MOQ 50 pcs, DDP shipping worldwide.",
        "brand": { "@type": "Brand", "name": "SublimApparel" },
        "manufacturer": { "@type": "Organization", "name": "SublimApparel" },
        "offers": {
          "@type": "Offer",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/jerseys/`,
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
              03 / Apparel · Team Jerseys
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom
              <br />
              sublimation
              <br />
              <span className="text-[#ff4d00]">jerseys.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              All-over print team jerseys for soccer, baseball, basketball, volleyball, esports, and more. Numbers, names, logos — all printed, not stitched. No setup fee, MOQ 50 pcs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black">
                Get a Jersey Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link href="/cases/sports-teams" className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">
                See Team Case Studies
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 border-t-2 border-black md:border-l-2 md:border-t-0 bg-[#faf9f6] flex items-center justify-center p-10">
            <div className="text-center">
              <Shirt className="mx-auto h-24 w-24 text-[#ff4d00] md:h-32 md:w-32" strokeWidth={1.5} />
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-600">Soccer · Baseball · Basketball</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-neutral-600">Volleyball · Esports · Training</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-0 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-8 ${i < 3 ? "border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 border-black md:border-b-0" : ""}`}>
              <div className={`text-5xl font-black md:text-6xl ${s.color === "orange" ? "text-[#ff4d00]" : "text-black"}`}>{s.value}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-widest text-black">{s.label}</div>
              <div className="mt-1 text-xs text-neutral-500">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 002 / Styles ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Six cuts. <span className="text-[#ff4d00]">All sports.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">From the workhorse short-sleeve to the high-stretch compression base layer.</p>
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Game-day weight. <span className="text-[#ff4d00]">Print-ready.</span></h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">From smooth interlock for maximum print vibrancy to birdseye for reversibles.</p>
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
                <div className="col-span-3 p-3 font-black text-[#ff4d00]">{f.moq}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-neutral-500">[ 004 / Customisation ]</div>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">All printed. <span className="text-[#ff4d00]">Nothing peels.</span></h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {customisation.map((c, i) => (
              <div key={c.title} className={`p-6 ${i < 3 ? "lg:border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-black" : ""} ${i === 2 ? "border-b-2 lg:border-b-0 border-black" : ""}`}>
                <c.icon className="h-8 w-8 text-[#ff4d00]" strokeWidth={2} />
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl"><span className="text-[#ff4d00]">Roster to roster</span> · 50 to 5,000 pcs.</h2>
          <div className="mt-10 grid gap-0 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <div key={u.who} className={`p-6 ${i < 3 ? "lg:border-r-2 border-neutral-800" : ""} ${i < 3 ? "border-b-2 lg:border-b-0 border-neutral-800" : ""} ${i === 3 || i === 4 ? "border-b-2 lg:border-b-0 border-neutral-800 md:border-r-2 md:border-b-0" : ""}`}>
                <Users className="h-6 w-6 text-[#ff4d00]" strokeWidth={2} />
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
          <h2 className="text-4xl font-black leading-tight md:text-6xl">Transparent. <span className="text-[#ff4d00]">No quotes required</span> to see the range.</h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">Starting prices for full-print sublimation jerseys with individual names and numbers. Compression base layer priced separately.</p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Interlock Poly</div>
              <div className="col-span-3 border-l-2 border-white p-3">Compression</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div key={p.qty} className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.poly}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#ff4d00]">{p.compression}</div>
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
                  <span className="ml-4 shrink-0 text-2xl font-black text-[#ff4d00] transition-transform group-open:rotate-45">+</span>
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
          <h2 className="text-4xl font-black leading-tight md:text-7xl">Send your roster.<br />Get a jersey quote in 1 business day.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-a-quote" className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#ff4d00]">
              Get a Jersey Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white">
              See All Apparel
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
