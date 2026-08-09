import Link from "next/link";
import { industries } from "@/lib/cases";
import {
  Home,
  Package,
  MessageSquareQuote,
  Phone,
  Shirt,
  Sparkles,
  Truck,
  Globe,
  ShieldCheck,
  Users,
  Layers,
  FileText,
  ArrowRight,
  Map,
} from "lucide-react";

// Visual sitemap for the user to review site structure.
// Not indexed by search engines (noindex via metadata below).
// Visit /site-map to see the architecture; SEO sitemap lives at /sitemap.xml.

export const metadata = {
  title: "Site Map · SublimPrint",
  description: "Internal site architecture overview.",
  robots: { index: false, follow: false },
};

type SitemapNode = {
  path: string;
  label: string;
  note?: string;
  new?: boolean;
};

type SitemapGroup = {
  id: string;
  level: "L1" | "L2" | "L3";
  title: string;
  blurb: string;
  accent: "orange" | "blue" | "black" | "grey";
  nodes: SitemapNode[];
};

const ACCENT_CLASS: Record<SitemapGroup["accent"], string> = {
  orange: "border-[#ff4d00] bg-[#ff4d00]/5",
  blue: "border-[#00c2ff] bg-[#00c2ff]/5",
  black: "border-[#0a0a0a] bg-[#0a0a0a]/5",
  grey: "border-[#6b6b6b] bg-[#6b6b6b]/5",
};

const ACCENT_BADGE: Record<SitemapGroup["accent"], string> = {
  orange: "bg-[#ff4d00] text-white",
  blue: "bg-[#00c2ff] text-[#0a0a0a]",
  black: "bg-[#0a0a0a] text-white",
  grey: "bg-[#6b6b6b] text-white",
};

const GROUPS: SitemapGroup[] = [
  {
    id: "entry",
    level: "L1",
    title: "Entry · Top-level conversion",
    blurb: "4 routes every visitor lands on or is funnelled to. The only place you push hard with CTAs.",
    accent: "orange",
    nodes: [
      { path: "/", label: "Home", note: "Hero · Beyond Apparel · Inquiry · Features · Artwork · Products · Process · DDP · Industries · Contact" },
      { path: "/products", label: "Products", note: "6 apparel categories + 6 hard-surface categories" },
      { path: "/get-a-quote", label: "Get a Quote", note: "★ main conversion · RFP-style 12-field form" },
      { path: "/contact", label: "Contact", note: "Address, WhatsApp, email, response commitment" },
    ],
  },
  {
    id: "blue-ocean",
    level: "L2",
    title: "Blue-Ocean SEO · Wang-zha pages",
    blurb: "0–1 competitor pages on these keywords. Eat them first, fastest SEO wins.",
    accent: "blue",
    nodes: [
      { path: "/fabric", label: "Fabric & Craft", note: "Index — fabric comparison, DTG vs sublimation, specs", new: true },
      { path: "/fabric/cotton", label: "Sublimation on 100% Cotton", note: "★ king differentiator · eats cotton jersey / 100% cotton / sublimation cotton / direct to garment", new: true },
      { path: "/shipping", label: "Shipping & Warehouse", note: "Index — DDP / US warehouse / Global delivery", new: true },
      { path: "/shipping/ddp", label: "DDP Delivered Duty Paid", note: "★ king SEO · eats ddp / duties paid / overseas warehouse", new: true },
      { path: "/shipping/us-warehouse", label: "US Warehouse · Fontana, CA", note: "★ king SEO · eats us warehouse / overseas warehouse / fulfillment", new: true },
      { path: "/shipping/global", label: "Worldwide Shipping", note: "★ king SEO · eats worldwide shipping / global fulfillment / sea air express", new: true },
    ],
  },
  {
    id: "trust",
    level: "L2",
    title: "Trust & About",
    blurb: "Proves you're a real factory, not a POD middleman.",
    accent: "black",
    nodes: [
      { path: "/about", label: "About", note: "Factory story, vertical integration, certifications" },
      { path: "/about/factory", label: "Inside the factory", note: "2,000 sqm, 12 lines, 6 printers, 200+ staff", new: true },
      { path: "/about/production", label: "Production process", note: "7 steps, 21-day average, day-by-day timeline", new: true },
      { path: "/about/quality", label: "Quality control", note: "4-stage QC, 50+ checkpoints, AQL 2.5", new: true },
      { path: "/about/cases", label: "Industries we serve", note: "12 verticals, 1,000+ clients, 5M+ pieces", new: true },
      { path: "/about/faq", label: "30 B2B questions", note: "Pricing, MOQ, fabric, lead time, shipping, admin", new: true },
      { path: "/cases", label: "Case Studies (index)", note: "12 industries · gateway to per-industry pages" },
    ],
  },
  {
    id: "cases",
    level: "L3",
    title: "Case Studies · 12 industry pages",
    blurb: "Dynamic route /cases/[slug]. Add real case images to `lib/cases.ts` later.",
    accent: "grey",
    nodes: industries.map((ind) => ({
      path: `/cases/${ind.slug}`,
      label: ind.title,
      note: ind.pitch.slice(0, 60) + (ind.pitch.length > 60 ? "…" : ""),
    })),
  },
  {
    id: "legal",
    level: "L3",
    title: "Legal · 3 boilerplate pages",
    blurb: "Generic B2B framework, legal entity = Yiwu HomeDorm. Not legal advice — review before launch.",
    accent: "grey",
    nodes: [
      { path: "/privacy", label: "Privacy Policy", note: "GDPR-style 9 sections", new: true },
      { path: "/terms", label: "Terms of Sale", note: "10 sections · quotes / orders / production / returns / arbitration", new: true },
      { path: "/shipping-policy", label: "Shipping Policy", note: "Incoterms + DDP + US warehouse + customs + lost", new: true },
    ],
  },
];

const STATS = {
  totalPages: GROUPS.reduce((acc, g) => acc + g.nodes.length, 0),
  staticPages: GROUPS.filter((g) => g.level !== "L3").reduce((acc, g) => acc + g.nodes.length, 0),
  dynamicPages: industries.length,
  newPages: GROUPS.flatMap((g) => g.nodes).filter((n) => n.new).length,
};

export default function SiteMapPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
      {/* Hero */}
      <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff4d00]">
            <Map className="h-3.5 w-3.5" />
            [ 000 / Site architecture ]
          </div>
          <h1 className="text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            How this site
            <br />
            is <span className="text-[#ff4d00]">wired together</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Every page that exists, grouped by role. Blue = SEO
            wang-zha, orange = conversion, black = trust, grey = supporting.
            Click any page to open it.
          </p>

          {/* Stats strip */}
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border-2 border-white/20 md:grid-cols-4">
            {[
              { k: STATS.totalPages, l: "Total pages" },
              { k: STATS.staticPages, l: "Static routes" },
              { k: STATS.dynamicPages, l: "Dynamic (cases)" },
              { k: STATS.newPages, l: "Added recently" },
            ].map((s) => (
              <div key={s.l} className="bg-[#0a0a0a] px-5 py-4">
                <div className="text-3xl font-extrabold text-[#ff4d00] md:text-4xl">
                  {s.k}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="space-y-8">
          {GROUPS.map((group) => (
            <div
              key={group.id}
              className={`border-2 ${ACCENT_CLASS[group.accent]} p-5 md:p-7`}
            >
              {/* Group header */}
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${ACCENT_BADGE[group.accent]}`}
                    >
                      {group.level}
                    </span>
                    <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                      {group.title}
                    </h2>
                  </div>
                  <p className="max-w-3xl text-sm text-[#6b6b6b] md:text-base">
                    {group.blurb}
                  </p>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#6b6b6b]">
                  {group.nodes.length} {group.nodes.length === 1 ? "page" : "pages"}
                </div>
              </div>

              {/* Nodes */}
              <ul className="grid gap-3 md:grid-cols-2">
                {group.nodes.map((node) => (
                  <li key={node.path}>
                    <Link
                      href={node.path}
                      className="group flex items-start gap-3 border-2 border-[#0a0a0a] bg-white p-4 transition-all hover:border-[#ff4d00] hover:bg-[#fff5f0] hover:shadow-[4px_4px_0_#ff4d00]"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <code className="font-mono text-xs font-bold text-[#0a0a0a]">
                            {node.path}
                          </code>
                          {node.new && (
                            <span className="bg-[#ff4d00] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-bold text-[#0a0a0a]">
                          {node.label}
                        </div>
                        {node.note && (
                          <div className="mt-1 text-xs text-[#6b6b6b] leading-relaxed">
                            {node.note}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#6b6b6b] transition-transform group-hover:translate-x-1 group-hover:text-[#ff4d00]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 border-2 border-dashed border-[#6b6b6b] p-5 text-center text-xs text-[#6b6b6b]">
          <strong className="block text-sm text-[#0a0a0a]">
            Not on this sitemap
          </strong>
          <p className="mt-1">
            Future plans (from workbuddy blue-ocean research):{" "}
            <code className="font-mono">/products/golf</code>,{" "}
            <code className="font-mono">/products/esports</code>,{" "}
            <code className="font-mono">/solutions/political</code>,{" "}
            <code className="font-mono">/shipping/us-warehouse</code>,{" "}
            <code className="font-mono">/fabric/dtg-vs-sublimation</code>,{" "}
            <code className="font-mono">/fabric/specs</code>. Each one eats a 0–1 competitor keyword.
          </p>
        </div>
      </section>
    </main>
  );
}
