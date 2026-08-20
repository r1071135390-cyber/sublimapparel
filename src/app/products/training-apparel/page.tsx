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
  Dumbbell,
  Activity,
  Wind,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Training Apparel | All-Over Print, Sublimation, MOQ 50",
  description:
    "Custom training apparel — all-over print sublimation on 4-way stretch poly-spandex. MOQ 50 pcs, durable for high-intensity training, sweat-wicking, anti-odor finish. Built for CrossFit, gym studios, team training kits, coaching staff. DDP shipping worldwide.",
  keywords: [
    // Primary
    "custom training apparel",
    "workout apparel manufacturer",
    "training clothing supplier",
    // Secondary
    "sublimation training shirts",
    "all over print gym tee",
    "4-way stretch training kit",
    "CrossFit team apparel",
    "studio gym uniform",
    "coaching staff uniform",
    "personal trainer apparel",
    "athletic training shirt",
  ],
  openGraph: {
    images: ["/products/0129/0.webp"],
  },
};

// Hero / showcase gallery sourced from public/products/0129/ (0.webp = cover, 1-8.webp = gallery)
const heroGallery = [
  { src: "/products/0129/0.webp", alt: "Custom all-over print training apparel — hero view" },
  { src: "/products/0129/1.webp", alt: "Sublimated gym training shirts — front detail" },
  { src: "/products/0129/2.webp", alt: "CrossFit training tee all-over print — back view" },
  { src: "/products/0129/3.webp", alt: "Studio training apparel sublimation — side profile" },
  { src: "/products/0129/4.webp", alt: "Workout shirt full print — close-up fabric" },
  { src: "/products/0129/5.webp", alt: "Athletic training tee — color range" },
  { src: "/products/0129/6.webp", alt: "Performance training top — stretch detail" },
  { src: "/products/0129/7.webp", alt: "Compression-fit training shirt — full print" },
  { src: "/products/0129/8.webp", alt: "Gym team training kit — coordinated set" },
];

const stats = [
  { value: "50", label: "MOQ (PCS)", note: "true low-MOQ", color: "orange" },
  { value: "140–180", label: "GSM RANGE", note: "training-tough", color: "white" },
  { value: "7–15", label: "DAYS LEAD TIME", note: "production + QC", color: "white" },
  { value: "100+", label: "COUNTRIES DDP", note: "duty paid door-to-door", color: "orange" },
];

const styles = [
  { name: "Training Tee", desc: "The workhorse. Poly-spandex 4-way stretch, side gussets, drop hem, reinforced seams.", gsm: "150 GSM" },
  { name: "Fitted Performance Tank", desc: "Racerback or scoop neck. For HIIT, hot yoga, CrossFit, and group classes. Built to squat, jump, and sweat.", gsm: "140 GSM" },
  { name: "Long-Sleeve Training Top", desc: "For cool-weather training, sun protection, and layering. Same all-over print area as short-sleeve.", gsm: "160 GSM" },
  { name: "Cropped Training Top", desc: "Hits at the waist. For CrossFit, lifting, group classes. Women's cut available XS–2XL.", gsm: "145 GSM" },
  { name: "Compression Fit Top", desc: "Tight, next-to-skin, 88/12 poly-spandex. For base layers and high-performance training.", gsm: "180 GSM" },
  { name: "Coaching Staff Polo", desc: "Pique poly, collar, three-button placket. For head coaches, trainers, and gym staff who need a uniform look.", gsm: "160 GSM" },
];

const fabricChoices = [
  { name: "Polyester-Spandex (92/8)", best: "4-way stretch · training · CrossFit · HIIT", moq: "50 pcs" },
  { name: "Polyester-Spandex (88/12)", best: "Tighter compression · base layer · lifting", moq: "50 pcs" },
  { name: "Birdseye Mesh Poly", best: "Maximum airflow · hot studios · group classes", moq: "50 pcs" },
  { name: "Pique Polyester", best: "Coaching staff · textured feel · uniform look", moq: "50 pcs" },
  { name: "Interlock Polyester", best: "Smooth · durable · team training kit", moq: "50 pcs" },
  { name: "Recycled Poly-Spandex", best: "Sustainability story · eco-conscious gym brands", moq: "50 pcs" },
];

const customisation = [
  { icon: Palette, title: "Edge-to-edge sublimation", desc: "Seam-to-seam CMYK print on polyester. No color limit, no setup fee. Sponsor logos, gym names, member names — all in one print." },
  { icon: Activity, title: "Training-tough finish", desc: "4-way stretch recovery, reinforced seams, anti-odor, sweat-wicking. Built to survive daily wear, weekly washes, and hard sessions." },
  { icon: Layers, title: "Print area", desc: "Front, back, both sleeves, neck label, hem tag. Full panel on poly. Branded labels and woven hem tags available." },
  { icon: Ruler, title: "Sizes XS–3XL", desc: "Men's, women's, unisex sizing. Race-cut, fitted, and relaxed-fit size charts. Spec sheet sent with every quote." },
];

const useCases = [
  { who: "CrossFit boxes & gyms", what: "Box merch, member kit, throwdown tees, affiliate uniforms" },
  { who: "Studio & group fitness", what: "Instructor uniforms, branded spin/yoga/barre kit, studio merch" },
  { who: "Personal trainers & coaches", what: "Branded 1:1 client apparel, online coaching merch, gym staff uniforms" },
  { who: "Sports teams & clubs", what: "Training-day kit, gym-day kit, off-pitch uniform" },
  { who: "Corporate wellness", what: "Company fitness programs, employee step challenges, gym partnerships" },
  { who: "Fitness brands & influencers", what: "Custom merch drops, subscriber kits, branded training apparel" },
];

const pricing = [
  { qty: "50 pcs", poly: "$11.80", stretch: "$12.80", note: "true low-MOQ" },
  { qty: "100 pcs", poly: "$9.50", stretch: "$10.50", note: "studio / box start" },
  { qty: "300 pcs", poly: "$8.00", stretch: "$9.00", note: "team / club order" },
  { qty: "500 pcs", poly: "$7.10", stretch: "$8.10", note: "brand merch drop" },
  { qty: "1,000+ pcs", poly: "$6.40", stretch: "$7.40", note: "large facility bulk" },
];

const faq = [
  {
    q: "What GSM is best for training apparel?",
    a: "For high-intensity training, 140–160 GSM poly-spandex (92/8) hits the sweet spot — 4-way stretch, durable, prints edge-to-edge, and holds up to daily washing. For compression and base layers, 88/12 poly-spandex at 180 GSM. For coaching staff uniforms, 160 GSM pique poly.",
  },
  {
    q: "Can I add my gym's logo and individual member names to the same shirt?",
    a: "Yes. Sublimation is a single dye process — gym logos, sponsor placements, and individual member names are all printed in the same step. No extra screens, no setup fees. We send a print-area mock-up with every quote.",
  },
  {
    q: "Do you make women's training cuts?",
    a: "Yes — racerback tanks, fitted tees, and cropped cuts in women's sizing XS–2XL. We also do men's, unisex, and coaching staff styles. Spec sheets for every cut sent with the quote.",
  },
  {
    q: "How durable is the print after repeated washing?",
    a: "Sublimation is dyed into the fabric, not printed on top — it won't crack, peel, or fade, even after 100+ washes. All seams are reinforced for high-intensity wear. We test every production run with a wash-cycle QC before shipping.",
  },
  {
    q: "Can you do compression fits?",
    a: "Yes — we run 88/12 poly-spandex at 180 GSM for tight, next-to-skin compression. For base layers, lifting, and high-performance training. Same MOQ 50, same sublimation process, same low per-piece price as our relaxed fits.",
  },
  {
    q: "How fast can you deliver training kit?",
    a: "Sample: 5–7 days from artwork approval. Bulk: 10–14 days after sample approval. DDP shipping adds 7–12 days to most countries. For gym launches and grand openings, we can split-ship samples first and bulk later if needed — just ask.",
  },
];

export default function TrainingApparelPage() {
  return (
    <main>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Training Apparel", path: "/products/training-apparel" },
      ])} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Custom All-Over Print Training Apparel",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/0129/0.webp`,
        "description": "Custom sublimation training apparel, all-over print, 4-way stretch poly-spandex, MOQ 50 pcs, DDP shipping worldwide. Built for CrossFit, gym studios, and team training kits.",
        "brand": { "@type": "Brand", "name": "SublimApparel" },
        "manufacturer": { "@type": "Organization", "name": "SublimApparel" },
        "offers": {
          "@type": "Offer",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com"}/products/training-apparel/`,
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
              01 / Apparel · Training Apparel
            </div>
            <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
              Custom
              <br />
              all-over print
              <br />
              <span className="text-[#cc3d00]">training apparel.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-700 md:text-lg">
              4-way stretch, edge-to-edge sublimation, training-tough finish. Built for CrossFit, gym studios, coaching staff, and team training kits. MOQ 50 pcs, 7–15 day production, DDP to 100+ countries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-a-quote/"
                className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-black"
              >
                Get a Training Apparel Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                href="/industries/sports-teams-leagues/"
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
              >
                See Sports Teams Page
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 border-t-2 border-black md:border-l-2 md:border-t-0 bg-[#faf9f6] flex items-center justify-center p-6 md:p-10">
            <div className="w-full">
              <div className="aspect-[4/5] w-full overflow-hidden bg-white border-2 border-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroGallery[0].src}
                  alt={heroGallery[0].alt}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-neutral-600">
                Men's · Women's · Unisex
              </p>
              <p className="mt-1 text-center text-xs font-bold uppercase tracking-widest text-neutral-600">
                Poly-Spandex · Mesh · Pique · Recycled
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT GALLERY */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#cc3d00]">
                02 / Gallery
              </div>
              <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Built for the box, the studio, and the gym floor.
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm text-neutral-600 md:block">
              Reinforced seams, 4-way stretch, sweat-wicking finish. Real production samples, not renders.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {heroGallery.map((img, i) => (
              <div
                key={img.src}
                className={`overflow-hidden border-2 border-black bg-white ${
                  i === 0 ? "col-span-2 row-span-2 aspect-[4/5] md:col-span-2 md:row-span-2" : "aspect-square"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </div>
            ))}
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
            Six cuts. <span className="text-[#cc3d00]">Built to train.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">
            From the everyday training tee to the high-performance compression fit — same low MOQ, same 7–15 day production, same DDP shipping.
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
            Engineered for <span className="text-[#cc3d00]">training.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-700 md:text-lg">
            4-way stretch poly-spandex, mesh, pique, recycled — all OEKO-TEX certified, all sublimation-grade, all built to survive daily washes and hard sessions.
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
            Your gym. <span className="text-[#cc3d00]">Your brand.</span>
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
            <span className="text-[#cc3d00]">50–10,000 pcs</span> per order.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-neutral-300 md:text-lg">
            Same factory, same team — from a 50-piece CrossFit box drop to a 10,000-piece fitness brand merch run. Tell us what you need and we run it.
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
            Starting prices for full-print sublimation training apparel, 4-color CMYK, poly-spandex or mesh. Custom quotes for compression, special trims, and rush orders.
          </p>
          <div className="mt-10 border-2 border-black bg-white">
            <div className="grid grid-cols-12 border-b-2 border-black bg-black text-xs font-black uppercase tracking-widest text-white">
              <div className="col-span-3 p-3">Quantity</div>
              <div className="col-span-3 border-l-2 border-white p-3">Poly Interlock</div>
              <div className="col-span-3 border-l-2 border-white p-3">Poly-Spandex 4-Way</div>
              <div className="col-span-3 border-l-2 border-white p-3">Note</div>
            </div>
            {pricing.map((p, i) => (
              <div
                key={p.qty}
                className={`grid grid-cols-12 text-sm ${i < pricing.length - 1 ? "border-b-2 border-black" : ""}`}
              >
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-black">{p.qty}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.poly}</div>
                <div className="col-span-3 border-r-2 border-black p-3 font-black text-[#cc3d00]">{p.stretch}</div>
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
            Send us your gym design.
            <br />
            Get a quote in 1 business day.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            PNG, AI, or even a hand-drawn sketch — we'll redraw it free and quote interlock + poly-spandex options. Sample available for $25–$45.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/get-a-quote/"
              className="group inline-flex items-center gap-2 bg-black px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-[#cc3d00]"
            >
              Get a Training Apparel Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <Link
              href="/products/running-shirts/"
              className="inline-flex items-center gap-2 border-2 border-black bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
            >
              See Running Shirts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
