import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Factory,
  FileText,
  Ruler,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Contact } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { buildResourcesHubGraph } from "@/lib/breadcrumb";

export const metadata = buildPageMetadata({
    title: "Tools & Resources for Custom Apparel Buyers | Sublimapparel",
    description: "Free tools, calculators, and guides for sourcing custom apparel: event timeline planner, US size chart, quality control checklist, 90-day new program roadmap,…",
    keywords: ["custom apparel tools", "apparel sourcing guide", "event apparel timeline", "us size guide sublimation", "apparel quality control checklist", "how to source from china", "90 day apparel program"],
    alternates: {
    canonical: "/resources",
  },
    ogTitle: "Tools & Resources for Custom Apparel Buyers",
    ogDescription: "Plan, size, qualify and ship — every tool a custom apparel buyer needs, free from Sublimapparel.",
    // 2026-09-11 (Round 15 P0-1): was "/resources" — a page path, not an
    // image. Social crawlers would render a broken share card. Resource
    // hub falls back to /og-default.jpg.
    ogImage: "/og-default.jpg",
  });;

const tools = [
  {
    slug: "event-timeline",
    title: "Event Apparel Timeline Planner",
    icon: Calendar,
    summary:
      "Work backwards from your event date. Get a 10-stage production plan with realistic lead times for sample, bulk, QC and DDP shipping.",
    bestFor: "Event organizers, race directors, festival teams",
    cta: "Plan your event",
  },
  {
    slug: "us-size-guide",
    title: "US Size & Measurement Guide",
    icon: Ruler,
    summary:
      "Convert US/UK/EU sizes to garment measurements. Sublimation shrinkage math, unisex vs ladies fit, and a printable measurement sheet.",
    bestFor: "Brand buyers, schools, sports teams",
    cta: "Open size guide",
  },
  {
    slug: "quality-control",
    title: "Quality Control Checklist",
    icon: ShieldCheck,
    summary:
      "What to inspect on a pre-shipment sample. Printable 47-point checklist covering stitching, print, sizing, color fastness, and packaging.",
    bestFor: "First-time importers, QA teams",
    cta: "Get the checklist",
  },
  {
    slug: "90-day-program",
    title: "90-Day New Apparel Program Roadmap",
    icon: TrendingUp,
    summary:
      "Launch a new private-label or branded apparel line in 90 days. Week-by-week deliverables from concept to first PO.",
    bestFor: "Startups, brand founders, agency owners",
    cta: "See the roadmap",
  },
  {
    slug: "how-to-source",
    title: "How to Source Apparel from China (Playbook)",
    icon: Compass,
    summary:
      "Step-by-step sourcing workflow: finding factories, RFQ, sampling, contracts, payment, QC, freight, customs — with downloadable templates.",
    bestFor: "First-time importers, sourcing agents",
    cta: "Read the playbook",
  },
] as const;

const guides = [
  {
    href: "/fabric",
    icon: Sparkles,
    title: "Fabric & Print Methods",
    text: "Polyester sublimation vs 100% cotton allover print vs tri-blend. Which fabric wins for which product.",
  },
  {
    href: "/products",
    icon: Factory,
    title: "Product Catalog",
    text: "T-shirts, hoodies, polos, tank tops, cycling kits, soccer kits, basketball kits, esports jerseys.",
  },
  {
    href: "/quality-control",
    icon: Wrench,
    title: "QC Process",
    text: "Inline inspection, pre-shipment AQL, third-party audits, and how we reduce defect rate to under 0.8%.",
  },
  {
    href: "/shipping",
    icon: Clock,
    title: "DDP Shipping & Logistics",
    text: "Sea DDP, air DDP, express DDP — door-to-door delivery with all duties pre-paid. Transit times to 50+ countries.",
  },
] as const;

export default function ResourcesPage() {
  // 2026-09-11 push (Round 8 part 2): /resources/ previously had only
  // a breadcrumb. Add WebPage (speakable) + ItemList of the 5 free
  // tools + FAQPage so Google can return rich results for
  // "apparel sourcing tools" / "event timeline calculator" /
  // "quality control checklist" queries and so the page joins the
  // brand entity graph.
  const resourcesFaqs = [
    {
      q: "Are SublimApparel's tools really free?",
      a: "Yes. Every tool on /resources/ — timeline planner, US size guide, QC checklist, 90-day roadmap, how-to-source playbook — is free to use, no email gate, no signup. They run in your browser and produce a downloadable plan, sheet, or checklist.",
    },
    {
      q: "Can I save my answers in the event timeline planner?",
      a: "Yes. The timeline calculator saves your inputs in your browser's local storage, so you can come back later and pick up where you left off. You can also print or screenshot the resulting plan to share with your team or quote request.",
    },
    {
      q: "Do you have a US/UK/EU size conversion guide?",
      a: "Yes. The US Size & Measurement Guide on /resources/ converts US, UK, and EU sizes to garment measurements, and includes sublimation-shrinkage math, unisex vs ladies fit, and a printable measurement sheet for accurate fit across your order.",
    },
    {
      q: "What's in the 47-point quality control checklist?",
      a: "The pre-shipment QC checklist on /quality-control/ covers stitching, print registration, color fastness, sizing tolerances, fabric hand-feel, packaging, and labeling across 47 inspection points grouped by product type. It's what we use internally before a shipment leaves the Yiwu factory.",
    },
    {
      q: "Do I have to order from you to use the sourcing playbook?",
      a: "No. The how-to-source playbook on /how-to-source/ is a generic step-by-step guide for finding, vetting, and onboarding any Chinese apparel factory, with downloadable templates (RFQ, sampling contract, payment terms, QC checklist, freight quote). It is useful whether you eventually work with us or with another supplier.",
    },
  ];

  // 2026-09-12 (R39): consolidate the 4 separate JSON-LD
  // nodes (BreadcrumbList + WebPage + ItemList #tools +
  // FAQPage — passed as a flat array to a single <JsonLd>
  // call) into a single @graph payload via
  // buildResourcesHubGraph. The new graph:
  //   - joins the WebPage, Person #person-ramon, ItemList
  //     #tools (5 free tools), ItemList #guides (4 guide
  //     cards), FAQPage #faq, and BreadcrumbList into a
  //     single @graph with all @id cross-linking
  //   - Both ItemLists are <= 50, so Google keeps them
  //     eligible for carousel rich results
  //   - WebPage + mainEntity round-trip to FAQPage so the
  //     PAA-style rich results on "apparel sourcing tools"
  //     queries still resolve
  //   - Person #person-ramon is inlined so the publisher
  //     author chain is self-contained (matches R36-C,
  //     R35-D, R37, R38)
  const resourcesGraph = buildResourcesHubGraph({
    tools: tools.map((t) => ({ slug: t.slug, title: t.title })),
    guides: guides.map((g) => ({ href: g.href, title: g.title })),
    faq: resourcesFaqs,
  });

  return (
    <>
      <JsonLd data={resourcesGraph} />

      {/* HERO */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d00]">
                Tools & Resources
              </p>
              <h1 className="mb-4 text-3xl font-black leading-tight md:text-5xl">
                Everything you need to plan, source and ship custom apparel.
              </h1>
              <p className="mb-6 max-w-2xl text-base text-white/70 md:text-lg">
                Free interactive tools, printable checklists, and step-by-step
                guides built for custom apparel buyers, brand owners, and event
                organizers.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/get-a-quote/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4d00] px-6 py-3 text-sm font-black text-black transition hover:bg-[#e64500]"
                >
                  Get a custom quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/blog/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
                >
                  Read the blog
                </Link>
              </div>
            </div>
            <div className="hidden md:col-span-4 md:flex md:justify-end">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/80">
                  On this page
                </p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>· 5 free interactive tools</li>
                  <li>· Fabric & product references</li>
                  <li>· QC and shipping guides</li>
                  <li>· Blog vs Resources explained</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d00]">
              Interactive tools
            </p>
            <h2 className="text-2xl font-black text-[#0a0a0a] md:text-4xl">
              5 free tools for custom apparel buyers
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#6b6b6b]">
              Save weeks of planning. Each tool runs in your browser and gives
              you a downloadable plan, sheet, or checklist.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={`/${tool.slug}/`}
                className="group flex flex-col rounded-2xl border border-[#e5e5e5] bg-white p-6 transition hover:-translate-y-1 hover:border-[#ff4d00] hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a0a0a] text-white transition group-hover:bg-[#ff4d00]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-black text-[#0a0a0a]">
                  {tool.title}
                </h3>
                <p className="mb-3 text-sm leading-relaxed text-[#6b6b6b]">
                  {tool.summary}
                </p>
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#a0a0a0]">
                  Best for: {tool.bestFor}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#ff4d00]">
                  {tool.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}

          {/* Always-visible CTA card */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#0a0a0a] p-6 text-white">
            <div>
              <CheckCircle2 className="mb-4 h-7 w-7 text-[#ff4d00]" />
              <h3 className="mb-2 text-lg font-black">
                Need a human to walk you through it?
              </h3>
              <p className="mb-5 text-sm text-white/70">
                Send us your event date, quantity and design idea. We&apos;ll
                reply with a same-day feasibility plan.
              </p>
            </div>
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff4d00] px-5 py-2.5 text-sm font-black text-black transition hover:bg-[#e64500]"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* GUIDES & REFERENCES */}
      <section className="border-y border-[#e5e5e5] bg-[#fafafa] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00c2ff]">
              References
            </p>
            <h2 className="text-2xl font-black text-[#0a0a0a] md:text-4xl">
              Fabric, products, QC, shipping — explained
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#6b6b6b]">
              Quick-reference guides that pair with our tools. Bookmark the ones
              you use most.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {guides.map((g) => {
              const Icon = g.icon;
              return (
                <Link
                  key={g.href}
                  href={g.href}
                  className="group flex flex-col rounded-2xl border border-[#e5e5e5] bg-white p-5 transition hover:border-[#0a0a0a]"
                >
                  <Icon className="mb-3 h-6 w-6 text-[#0a0a0a] transition group-hover:text-[#ff4d00]" />
                  <h3 className="mb-1.5 text-base font-black text-[#0a0a0a]">
                    {g.title}
                  </h3>
                  <p className="text-sm text-[#6b6b6b]">{g.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BLOG VS RESOURCES — clear differentiation */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-3xl border border-[#e5e5e5] bg-white p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d00]">
                Tools vs Blog
              </p>
              <h2 className="text-2xl font-black text-[#0a0a0a] md:text-3xl">
                Tools give you answers. The blog gives you context.
              </h2>
              <p className="mt-3 text-base text-[#6b6b6b]">
                This page is for{" "}
                <strong className="text-[#0a0a0a]">interactive tools</strong>{" "}
                you can run in your browser. The blog is for{" "}
                <strong className="text-[#0a0a0a]">articles</strong> — sourcing
                stories, factory tours, industry trends, customer spotlights.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/blog/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-3 text-sm font-black text-white transition hover:bg-[#1a1a1a]"
                >
                  <FileText className="h-4 w-4" />
                  Open the blog
                </Link>
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0a0a0a] px-5 py-3 text-sm font-black text-[#0a0a0a] transition hover:bg-[#0a0a0a] hover:text-white"
                >
                  Talk to a specialist
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-5">
                <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#ff4d00]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#ff4d00]">
                  You are here
                </p>
                <h3 className="mb-1 text-base font-black text-[#0a0a0a]">
                  /resources
                </h3>
                <p className="text-sm text-[#6b6b6b]">
                  Calculators, timeline planners, printable checklists, sourcing
                  playbooks.
                </p>
              </div>
              <div className="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-5">
                <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#00c2ff]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#00c2ff]">
                  Articles
                </p>
                <h3 className="mb-1 text-base font-black text-[#0a0a0a]">
                  /blog
                </h3>
                <p className="text-sm text-[#6b6b6b]">
                  Sourcing stories, factory tours, industry trends, customer
                  case studies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
