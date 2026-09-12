import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { MapPin, Mail, MessageCircle, Phone, Building2, Warehouse } from "lucide-react";
import { FullKeywordCloud } from "@/components/keyword-cloud";

const linkGroups = [
  {
    title: "Products",
    items: [
      { label: "Cotton Printing (DTG & DTF)", href: "/fabric/cotton" },
      { label: "Polyester Sublimation", href: "/fabric" },
      { label: "Team & Performance Apparel", href: "/products" },
      { label: "Custom Cut-and-Sew Apparel", href: "/products" },
      { label: "Headwear & Accessories", href: "/products" },
      { label: "Flags, Banners & Outdoor", href: "/products" },
      { label: "Trade Show & Display Textiles", href: "/products" },
      { label: "Home & Soft Goods", href: "/products" },
      { label: "Bags, Pet & Promo", href: "/products" },
    ],
    viewAll: { href: "/products", label: "View all products" },
  },
  {
    title: "Capabilities",
    items: [
      // 2026-09-11 (Round 11): these /about links were too broad. Point each
      // capability to the dedicated sub-page with full content + schema.
      { label: "Dye sublimation printing", href: "/about/factory" },
      { label: "100% cotton (full-bleed)", href: "/fabric/cotton" },
      { label: "Cut & sew manufacturing", href: "/about/production" },
      { label: "All-over print", href: "/all-over-print" },
      { label: "Custom labels, tags & packaging", href: "/about/production" },
      { label: "Quality control & testing", href: "/about/quality" },
      { label: "Factory & equipment", href: "/about/factory" },
      // 2026-09-11 (Round 12): /pricing (0.85) and /production (0.80) were
      // orphan pages — no navbar or footer links. Adding them here so Google
      // can crawl and index these high-priority informational pages.
      { label: "Pricing & MOQ guide", href: "/pricing" },
      { label: "Production timeline & lead times", href: "/production" },
    ],
  },
  {
    title: "Industries",
    items: [
      // 2026-09-11 (Round 11): all these /cases/* paths are broken 404s.
      // Fix: link to the real /industries/* pages that are in the sitemap.
      // /cases/sports-teams existed but redirecting to /industries/sports-teams-leagues
      // (the real industry profile page with full content, FAQ, schema, and cases).
      { label: "Sports Teams & Leagues", href: "/industries/sports-teams-leagues" },
      { label: "Endurance & Race Events", href: "/industries/endurance-race-events" },
      { label: "Events & Conferences", href: "/industries/events-conferences" },
      { label: "Music, Tour & Festival Merch", href: "/industries/music-festival-tour-merchandise" },
      { label: "Corporate & Employee Programs", href: "/industries/corporate-employee-programs" },
      { label: "Schools, Universities & Greek Life", href: "/industries/schools-universities-greek-life" },
      { label: "Breweries, Coffee & Hospitality", href: "/industries/breweries-coffee-hospitality" },
      { label: "Promotional & Marketing Agencies", href: "/industries/promotional-marketing-agencies" },
      { label: "Trade Shows & Display", href: "/industries/trade-shows-display" },
      { label: "Apparel Brands & Agencies", href: "/industries/apparel-brands-agencies" },
      { label: "Political Campaigns", href: "/industries/political-campaigns" },
      { label: "E-commerce & Fulfillment", href: "/industries/e-commerce-fulfillment" },
    ],
    viewAll: { href: "/industries", label: "View all 12 industries" },
  },
  {
    title: "Solutions",
    items: [
      // 2026-09-11 (Round 11): restore the Solutions section that was removed
      // when the duplicate Industries group was deleted. These 6 solution pages
      // are high-priority (0.95) SEO pages in the sitemap.
      { label: "Teams & Sports Apparel", href: "/teams-sports-apparel" },
      { label: "Event Festivals & Conferences", href: "/event-festivals-conferences" },
      { label: "Corporate & Organization Apparel", href: "/corporate-organization-apparel" },
      { label: "Promotional & Marketing Apparel", href: "/promotional-marketing-apparel" },
      { label: "Apparel Brands & Agencies", href: "/apparel-brands-agencies" },
      { label: "E-commerce & Fulfillment", href: "/e-commerce-fulfillment" },
      { label: "All-Over Print Catalog", href: "/all-over-print" },
    ],
    viewAll: { href: "/solutions", label: "All solutions overview" },
  },
  {
    title: "Quick order",
    items: [
      { label: "Order a custom sample", href: "/samples" },
      { label: "Express quote (30 min)", href: "/get-a-quote-express" },
      { label: "Pay bulk order deposit", href: "/bulk-deposit" },
    ],
  },
  // 2026-09-11 (Round 12): /shipping, /shipping/ddp, /shipping/global, and
  // /shipping/us-warehouse were all orphan pages (no navbar or footer links).
  // Add a Shipping group so Google can crawl and index these high-value
  // informational pages (priority 0.8–0.9).
  // 2026-09-11 (R21-A): also add the 5 country-specific DDP pages so
  // buyers searching for "DDP shipping to USA / UK / EU / AU / Canada"
  // can find the relevant page from any page on the site, and so the
  // new pages get internal link weight.
  {
    title: "Shipping",
    items: [
      { label: "Shipping overview", href: "/shipping" },
      { label: "DDP shipping — duty paid", href: "/shipping/ddp" },
      { label: "Global shipping guide", href: "/shipping/global" },
      { label: "DDP shipping to USA", href: "/shipping/usa" },
      { label: "DDP shipping to UK", href: "/shipping/uk" },
      { label: "DDP shipping to EU", href: "/shipping/eu" },
      { label: "DDP shipping to Australia", href: "/shipping/au" },
      { label: "DDP shipping to Canada", href: "/shipping/canada" },
      { label: "US warehouse & fulfilment", href: "/shipping/us-warehouse" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "View All Tools & Resources", href: "/resources" },
      // 2026-09-11 (R25-C): /search/ is the new dedicated full-text
      // search page. It is the target of the WebSite SearchAction, so
      // a footer link here gives the page internal link weight and
      // makes the search affordance discoverable from every page.
      { label: "Site search (products, fabric, blog)", href: "/search" },
      { label: "Event Timeline Calculator", href: "/event-timeline" },
      { label: "US Size Guide & Excel Template", href: "/us-size-guide" },
      { label: "Quality Control Process", href: "/quality-control" },
      { label: "90-Day Production Program", href: "/90-day-program" },
      { label: "How to Source Custom Apparel", href: "/how-to-source" },
      { label: "Case studies", href: "/cases" },
      // 2026-09-11 (Round 11): /about was too broad for each of these.
      // Fabric library → /fabric (hub), Sublimation vs DTG → /compare page,
      // Ordering FAQ → /about/faq (29 Q&A with FAQPage schema).
      { label: "Fabric library", href: "/fabric" },
      // 2026-09-11 (R21-C): /fabric/care targets PAA queries like
      // "how to wash sublimated shirts". Add it to the resources group
      // so buyers can find the care guide from any page.
      { label: "Care & washing guide", href: "/fabric/care" },
      // 2026-09-11 (Round 12): all 3 compare pages were orphan pages in sitemap
      // (priority 0.80-0.85) — now linked from footer so Google can crawl them.
      // 2026-09-11 (R26-D): added the 4th compare page (sublimation vs screen
      // printing) so the new URL has a real internal link to inherit PageRank
      // from the high-authority homepage + footer.
      { label: "Sublimation vs screen print vs DTG", href: "/compare/sublimation-vs-dtg" },
      { label: "Sublimation vs screen printing", href: "/compare/sublimation-vs-screen-print" },
      { label: "Polyester vs cotton for sublimation", href: "/compare/polyester-vs-cotton-sublima" },
      { label: "DDP vs FOB shipping from China", href: "/compare/ddp-vs-fob" },
      // 2026-09-11 (Round 13): /technique/ (priority 0.85, 20 sub-pages) was an
      // orphan page — no navbar or footer links. Adding it here so Google can
      // crawl and index the full technique encyclopedia hub.
      { label: "Decoration techniques encyclopedia", href: "/technique" },
      { label: "Ordering FAQ", href: "/about/faq" },
    ],
  },
  {
    title: "Company",
    items: [
      // 2026-09-11 (Round 11): /about was too broad for most of these.
      // Point to the dedicated sub-pages with full content + JSON-LD schema.
      { label: "About sublimapparel.com", href: "/about" },
      { label: "Our factory in Yiwu", href: "/about/factory" },
      { label: "Why Yiwu", href: "/about/factory" },
      { label: "Production process", href: "/about/production" },
      { label: "Quality control", href: "/about/quality" },
      { label: "Certifications & compliance", href: "/about/quality" },
      { label: "Sustainability & ink safety", href: "/about/quality" },
      { label: "Case studies archive", href: "/cases" },
      { label: "Get a quote", href: "/get-a-quote" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white text-black">
      {/* Mega link directory */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block min-h-11 py-2.5 leading-tight text-sm text-black/80 transition-colors hover:text-[#cc3d00]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {group.viewAll && (
                <Link
                  href={group.viewAll.href}
                  className="mt-4 inline-flex min-h-11 items-center gap-1 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:text-[#ff4d00]"
                >
                  {group.viewAll.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Keyword directory - SEO */}
      <div className="border-t-2 border-black bg-[#f5f5f5]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-6">
            <h2 className="text-base font-black uppercase tracking-tight md:text-lg">
              Browse our full catalog by apparel type, sport, and use case
            </h2>
            <p className="mt-1 text-sm text-black/60">
              {`13 apparel categories · 42 sports · 25 use-case scenarios. Every link below leads to a curated page with custom-printed garments ready to ship DDP to your door.`}
            </p>
          </div>
          <FullKeywordCloud />
        </div>
      </div>

      {/* Locations + Contact + Response Commitment */}
      <div className="border-t border-black/10 bg-[#faf9f6]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Factory */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              <Building2 size={14} />
              Factory
            </h3>
            <p className="mt-2 text-sm text-black/70">
              35 Lingyun Road
              <br />
              Yiwu, Zhejiang, China
            </p>
          </div>

          {/* US Warehouse */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              <Warehouse size={14} />
              US Warehouse
            </h3>
            <p className="mt-2 text-sm text-black/70">
              13052 Jurupa Ave
              <br />
              Fontana, CA 92335
              <br />
              United States
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              <Mail size={14} />
              Contact
            </h3>
            <Link
              href="mailto:info@sublimapparel.com,chris@sublimapparel.com"
              className="text-sm text-black/80 transition-colors hover:text-[#cc3d00]"
            >
              info@sublimapparel.com
            </Link>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              <li className="flex items-center gap-2">
                <MessageCircle size={14} />
                WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} />
                WeChat
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} />
                Phone
              </li>
            </ul>
          </div>

          {/* Response Commitment */}
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              Response commitment
            </h3>
            <p className="text-sm leading-relaxed text-black/70">
              We reply within one business day. Our team overlaps with US
              Pacific and UK business hours. Quotes are landed and duty paid,
              with any exclusions stated on the quote.
            </p>
            <RequestQuoteLink
              label="Footer / Get a quote"
              className="mt-4 inline-flex items-center gap-2 border-2 border-black bg-[#ff4d00] px-4 py-2 text-xs font-black uppercase tracking-wider text-black transition-all hover:bg-black hover:border-black"
            >
              Get a quote →
            </RequestQuoteLink>
          </div>
        </div>
      </div>

      {/* Certifications / Payment / Platforms */}
      <div className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              Certifications
            </h3>
            <p className="text-sm leading-relaxed text-white/80">
              OEKO-TEX Standard 100 · ISO 9001 · Sedex-SMETA · CPSIA-compliant
              inks
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              Payment
            </h3>
            <p className="text-sm leading-relaxed text-white/80">
              T/T · L/C at sight · PayPal (samples) · Trade Assurance on
              Alibaba
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              Platforms
            </h3>
            <p className="text-sm leading-relaxed text-white/80">
              Alibaba Gold Supplier · Made-in-China · Global Sources · Google
              Verified
            </p>
          </div>
        </div>
      </div>

      {/* Copyright + Legal */}
      <div className="border-t border-white/10 bg-black text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-white/80 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Yiwu HomeDorm Commodity Manufacturing Co., Ltd. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy/" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms/" className="hover:text-white">
                Terms of sale
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy/" className="hover:text-white">
                Shipping policy
              </Link>
            </li>
            <li>
              <Link href="/site-map/" className="hover:text-white">
                Sitemap
              </Link>
            </li>
            <li>
              <Link
                href="/admin/"
                className="hover:text-white"
                title="Sales team: create & upload Proforma Invoices"
              >
                Sales portal
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-6 text-[11px] leading-relaxed text-white/80">
          sublimapparel.com is a website of Yiwu HomeDorm Commodity Manufacturing
          Co., Ltd. — registered in Yiwu, Zhejiang, China. All artwork, designs
          and trademarks shown are property of their respective owners.
        </div>
      </div>
    </footer>
  );
}
