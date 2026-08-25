import Link from "next/link";
import { buildPageMetadata } from "@/lib/page-metadata";
import Image from "next/image";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { Check, Clock, FileText, MessageCircle, ArrowRight, Zap } from "lucide-react";

export const metadata = buildPageMetadata({
    title: "Get a Quote | Custom Sublimation & Cotton Apparel Manufacturer",
    description: "Request a landed-cost quote in under 12 hours. Free digital mockup, free sample round on first order. Sublimation on polyester, DTG / DTF on 100% cotton, DDP s…",
    keywords: ["get a quote", "sublimation quote", "custom apparel quote", "bulk order inquiry", "B2B apparel sourcing", "sublimation factory quote", "DDP quote", "apparel manufacturer China"],
  });;

const whatHappens = [
  {
    icon: FileText,
    time: "Within 1 hour",
    title: "We read your inquiry",
    desc: "Our team reads every inquiry. We flag any missing info (size breakdown, deadline, destination) and reply with a confirmation.",
  },
  {
    icon: MessageCircle,
    time: "Within 1 business day",
    title: "We send a landed quote + free mockup",
    desc: "A single line item — unit price + shipping + duties. No setup fee. Plus free mockup of your design on the actual garment.",
  },
  {
    icon: Clock,
    time: "Production: 7–15 days",
    title: "We start production",
    desc: "After artwork/sample approval + deposit. We send photos of the bulk sample before shipping your products.",
  },
  {
    icon: Check,
    time: "Delivered to your door",
    title: "DDP to 100+ countries",
    desc: "We help you pick the most economical shipping option that meets your delivery deadline, then handle customs, duties, and last-mile if needed.",
  },
];

const tips = [
  { tag: "ESSENTIAL", text: "Destination country + postal code — so we can calculate the actual DDP shipping cost." },
  { tag: "ESSENTIAL", text: "Quantity + size breakdown (S/M/L/XL counts) — even an estimate is fine." },
  { tag: "ESSENTIAL", text: "Required delivery date — so we can tell you honestly whether 7, 15, or 30 days is realistic." },
  { tag: "HELPFUL", text: "Fabric preference (polyester / 100% cotton / recycled) — most projects have a clear answer." },
  { tag: "HELPFUL", text: "Design status (ready / need help / template) — so we know if mockup is needed." },
  { tag: "OPTIONAL", text: "Pantone colors, reference images, brand guidelines — anything that helps us match your vision." },
];

export default function GetAQuotePage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Get a Quote", path: "/get-a-quote" },
      ])} />
      <main>
      {/* HERO — matches home page hero style: dark background, full-bleed image, gradient overlay, text on top */}
      <section
        id="hero"
        className="relative overflow-hidden bg-[#0a0a0a] text-white"
      >
        {/* Desktop background image (full bleed) — hidden on mobile */}
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/quote-hero-showroom.webp"
            alt="SublimApparel showroom — four people (two Chinese sales reps, two European/American clients) at a wooden table reviewing color swatches, design sketches, sample garments, and laptop quotes in the Yiwu factory"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-95 brightness-105"
          />
          {/* Brighter gradient mask — image clearly visible, text still readable */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.18) 100%)",
            }}
          />
        </div>

        {/* Mobile hero image — same image, no overlay, max impact */}
        <div className="relative block w-full lg:hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/quote-hero-showroom.webp"
              alt="SublimApparel showroom meeting — color swatches, sample garments and laptops on the table"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-105"
            />
            {/* Subtle bottom-to-top darken so it joins the dark section seamlessly */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-20"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 100%)",
              }}
            />
          </div>
          {/* Tiny caption strip — anchors the image as "showroom meeting" */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white drop-shadow">
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-black/55 px-2 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00]" />
              Yiwu showroom
            </span>
            <span className="rounded-sm bg-black/55 px-2 py-1 backdrop-blur-sm">
              4-person order review
            </span>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12 lg:py-16">
          {/* Top badge */}
          <div className="mb-3 flex items-center gap-3 md:mb-4">
            <span className="inline-flex h-6 items-center rounded-sm border border-white/30 bg-white/10 px-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm md:h-7 md:px-3 md:text-xs">
              Get a Quote · Reply in 1 business day
            </span>
          </div>

          {/* Status line */}
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/70 md:mb-6 md:text-sm">
            <span>
              <span className="font-bold text-white">DDP to 100+ countries</span>
              <span className="mx-2 text-white/40">·</span>
              <span>Free 3D mockup</span>
              <span className="mx-2 text-white/40">·</span>
              <span>No setup fee</span>
            </span>
          </div>

          {/* Headline — 3 lines, flat / full width */}
          <h1 className="mb-4 max-w-4xl text-3xl font-black leading-[1.05] tracking-tight md:mb-5 md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block text-white">Tell us your</span>
            <span className="block text-[#cc3d00]">product, quantity</span>
            <span className="block text-[#cc3d00]">and deadline.</span>
          </h1>

          {/* Subhead */}
          <p className="mb-6 max-w-2xl text-sm text-white/80 md:mb-8 md:text-lg">
            You will have a landed, duty-paid price within one business day.
            If your deadline is not achievable, we will say so in the same
            reply rather than take the order and manage the problem later.
          </p>

          {/* Status pills row — matches home page hero category chips */}
          <div className="mb-4 flex flex-wrap items-center gap-2.5 md:mb-6 md:gap-4">
            <span className="border-l-4 border-[#ff4d00] pl-3 text-xs font-black uppercase tracking-widest text-white">
              Why us
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/25 bg-white/5 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm md:px-3 md:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff4d00]" />
              Reply within 1 business day
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/25 bg-white/5 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm md:px-3 md:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00c2ff]" />
              Team hours overlap US Pacific &amp; UK
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/25 bg-white/5 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm md:px-3 md:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Yiwu factory + Fontana, CA
            </span>
          </div>

          {/* CTA — scroll to form */}
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href="#inquiry"
              className="inline-flex items-center gap-2 rounded-sm bg-[#ff4d00] px-5 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[3px_3px_0_0_rgba(255,255,255,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.45)] md:text-base"
            >
              Start your quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products/all/"
              className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#ff4d00] hover:bg-[#ff4d00]/20 md:text-base"
            >
              Browse 120+ products
            </Link>
          </div>
        </div>
      </section>

      {/* EXPRESS CTA — skip the queue with $99 deposit */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/get-a-quote-express/"
            className="group block border-2 border-[#0a0a0a] bg-gradient-to-r from-[#ff4d00] to-[#cc3d00] p-6 text-white shadow-[6px_6px_0_0_#0a0a0a] transition-all hover:shadow-[3px_3px_0_0_#0a0a0a] sm:p-8"
          >
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 border border-white/40 bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
                  <Zap className="h-3.5 w-3.5" strokeWidth={3} />
                  Skip the queue
                </div>
                <h3 className="mb-2 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
                  Need a quote in 30 min? Pay $99 express deposit
                </h3>
                <p className="text-sm text-white/90 sm:text-base">
                  Refundable if we can&apos;t match your requirements. Free
                  mockup + dedicated rep included.
                </p>
              </div>
              <div className="flex items-center gap-2 border-2 border-white bg-[#0a0a0a] px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors group-hover:bg-white group-hover:text-[#0a0a0a]">
                Use express
                <ArrowRight className="h-4 w-4" strokeWidth={3} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT — sets expectations */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-12 flex items-end justify-between border-b border-white/15 pb-6">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-white/60">
                [ 001 / Process ]
              </div>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                What happens
                <br />
                <span className="text-[#cc3d00]">after you submit.</span>
              </h2>
            </div>
            <div className="hidden text-right text-xs font-bold uppercase tracking-widest text-white/60 md:block">
              <div>From inquiry to door</div>
              <div className="mt-1 text-3xl font-black text-white">7–15 days</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {whatHappens.map((w, i) => {
              const Icon = w.icon;
              return (
                <div
                  key={i}
                  className="group relative flex flex-col border-2 border-white/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-[#ff4d00] hover:bg-white/10"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-black text-[#cc3d00] text-5xl leading-none">
                      0{i + 1}
                    </span>
                    <Icon className="h-6 w-6 text-white/40 transition-colors group-hover:text-[#cc3d00]" strokeWidth={1.5} />
                  </div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#cc3d00]">
                    {w.time}
                  </div>
                  <h3 className="mb-2 text-xl font-black leading-tight">{w.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIPS — what to include for fastest quote */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                Pro tip
              </div>
              <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-black md:text-5xl">
                What to include for
                <br />
                <span className="text-[#cc3d00]">the fastest quote.</span>
              </h2>
              <p className="mt-4 text-base text-black/70">
                You don&apos;t need everything — start with the essentials below.
                We&apos;ll ask follow-up questions only if needed.
              </p>
            </div>

            <div className="md:col-span-7">
              <ul className="space-y-3">
                {tips.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 border-2 border-black bg-white p-4"
                  >
                    <span
                      className={
                        "shrink-0 px-2 py-1 text-[10px] font-black uppercase tracking-widest " +
                        (t.tag === "ESSENTIAL"
                          ? "bg-[#ff4d00] text-white"
                          : t.tag === "HELPFUL"
                          ? "bg-[#00c2ff] text-black"
                          : "bg-black/10 text-black/70")
                      }
                    >
                      {t.tag}
                    </span>
                    <span className="text-sm leading-relaxed text-black/80">{t.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE FORM */}
      <div id="inquiry" className="scroll-mt-20">
        <Contact />
      </div>
    </main>
    </>
  );
}
