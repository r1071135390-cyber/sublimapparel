import Link from "next/link";
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
      { label: "Dye sublimation printing", href: "/about" },
      { label: "100% cotton (full-bleed)", href: "/about" },
      { label: "Cut & sew manufacturing", href: "/about" },
      { label: "All-over print", href: "/about" },
      { label: "Custom labels, tags & packaging", href: "/about" },
      { label: "Quality control & testing", href: "/about" },
      { label: "Factory & equipment", href: "/about" },
    ],
  },
  {
    title: "Industries",
    items: [
      { label: "Events & conferences", href: "/cases/events-conferences" },
      { label: "Promotional distributors", href: "/cases/promotional-products" },
      { label: "Sports teams & leagues", href: "/cases/sports-teams" },
      { label: "Music, tour & festival merch", href: "/cases/music-tour-festival" },
      { label: "Trade show & display", href: "/cases/trade-show-display" },
      { label: "Corporate & employee programmes", href: "/cases/corporate-programs" },
      { label: "Apparel brands & agencies", href: "/cases/apparel-brands" },
      { label: "Schools & universities", href: "/cases/schools-greek-life" },
      { label: "Political campaigns", href: "/cases/political-campaigns" },
    ],
    viewAll: { href: "/cases", label: "View all case studies" },
  },
  {
    title: "Resources",
    items: [
      { label: "Case studies", href: "/cases" },
      { label: "Artwork & file setup guide", href: "/get-a-quote" },
      { label: "Fabric library", href: "/about" },
      { label: "Size charts", href: "/about" },
      { label: "Sublimation vs screen print vs DTG", href: "/about" },
      { label: "Ordering FAQ", href: "/about" },
      { label: "Guides", href: "/about" },
      { label: "Lead times", href: "/about" },
      { label: "Sampling process", href: "/get-a-quote" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About sublimapparel.com", href: "/about" },
      { label: "Our factory in Yiwu", href: "/about" },
      { label: "Why Yiwu", href: "/about" },
      { label: "Certifications & compliance", href: "/about" },
      { label: "Sustainability & ink safety", href: "/about" },
      { label: "Careers", href: "/contact" },
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
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
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
                      className="text-sm text-black/80 transition-colors hover:text-[#ff4d00]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {group.viewAll && (
                <Link
                  href={group.viewAll.href}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-black hover:text-[#ff4d00]"
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
              {`13 apparel categories · 41 sports · 29 use-case scenarios. Every link below leads to a curated page with custom-printed garments ready to ship DDP to your door.`}
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
              href="mailto:info@sublimapparel.com"
              className="text-sm text-black/80 transition-colors hover:text-[#ff4d00]"
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
            <Link
              href="/get-a-quote"
              className="mt-4 inline-flex items-center gap-2 border-2 border-black bg-[#ff4d00] px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-black hover:border-black"
            >
              Get a quote →
            </Link>
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
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Yiwu HomeDorm Commodity Manufacturing Co., Ltd. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms of sale
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:text-white">
                Shipping policy
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-white">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-6 text-[11px] leading-relaxed text-white/40">
          sublimapparel.com is a website of Yiwu HomeDorm Commodity Manufacturing
          Co., Ltd. — registered in Yiwu, Zhejiang, China. All artwork, designs
          and trademarks shown are property of their respective owners.
        </div>
      </div>
    </footer>
  );
}
