import Link from "next/link";
import {
  MapPin,
  Warehouse,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  CreditCard,
  Layers,
} from "lucide-react";

const linkGroups = [
  {
    title: "Products",
    items: [
      "Cotton Sublimation Collection",
      "Team & Performance Apparel",
      "Custom Cut-and-Sew Apparel",
      "Headwear & Accessories",
      "Flags, Banners & Outdoor",
      "Trade Show & Display Textiles",
      "Home & Soft Goods",
      "Bags, Pet & Promo",
    ],
    viewAll: { href: "/products", label: "View all products" },
  },
  {
    title: "Capabilities",
    items: [
      "Dye sublimation printing",
      "100% cotton (full-bleed)",
      "Cut & sew manufacturing",
      "All-over print",
      "Custom labels, tags & packaging",
      "Quality control & testing",
      "Factory & equipment",
    ],
  },
  {
    title: "Industries",
    items: [
      "Events & conferences",
      "Promotional distributors",
      "Sports teams & leagues",
      "Music, tour & festival merch",
      "Trade show & display",
      "Corporate & employee programmes",
      "Apparel brands & agencies",
      "Schools & universities",
      "Political campaigns",
    ],
    viewAll: { href: "/about", label: "View all industries" },
  },
  {
    title: "Resources",
    items: [
      "Artwork & file setup guide",
      "Fabric library",
      "Size charts",
      "Sublimation vs screen print vs DTG",
      "Ordering FAQ",
      "Guides",
      "Lead times",
      "Sampling process",
    ],
  },
  {
    title: "Company",
    items: [
      "About sublimprint.com",
      "Our factory in Yiwu",
      "Why Yiwu",
      "Certifications & compliance",
      "Sustainability & ink safety",
      "Careers",
      "Contact",
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
                  <li key={item}>
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-black transition-colors hover:text-[#ff4d00]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                {group.viewAll && (
                  <li className="pt-1">
                    <Link
                      href={group.viewAll.href}
                      className="text-sm font-black uppercase tracking-wider text-[#ff4d00] transition-colors hover:text-black"
                    >
                      {group.viewAll.label} →
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Locations / contact / response commitment */}
      <div className="border-t-2 border-black bg-[#faf9f6]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              <MapPin size={12} className="mr-1 inline-block" />
              Factory
            </h3>
            <p className="text-sm font-medium leading-relaxed">
              HomeDorm — Factory
              <br />
              35 Lingyun Road
              <br />
              Yiwu, Zhejiang, China
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              <Warehouse size={12} className="mr-1 inline-block" />
              US Warehouse
            </h3>
            <p className="text-sm font-medium leading-relaxed">
              HomeDorm — US warehouse
              <br />
              13052 Jurupa Ave
              <br />
              Fontana, CA 92335
              <br />
              United States
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              <Mail size={12} className="mr-1 inline-block" />
              Contact
            </h3>
            <ul className="space-y-1.5 text-sm font-medium">
              <li>
                <a
                  href="mailto:hello@sublimprint.com"
                  className="hover:text-[#ff4d00]"
                >
                  hello@sublimprint.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff4d00]">
                  <MessageCircle size={12} className="mr-1 inline-block" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff4d00]">
                  WeChat
                </a>
              </li>
              <li>
                <a href="tel:+86138XXXXXXXX" className="hover:text-[#ff4d00]">
                  <Phone size={12} className="mr-1 inline-block" />
                  Phone
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              Response commitment
            </h3>
            <p className="text-sm font-medium leading-relaxed">
              We reply within one business day. Our team overlaps with US
              Pacific and UK business hours. Quotes are landed and duty paid,
              with any exclusions stated on the quote.
            </p>
          </div>
        </div>
      </div>

      {/* Certifications / Payment / Platforms */}
      <div className="border-t-2 border-black bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              <ShieldCheck size={12} className="mr-1 inline-block" />
              Certifications
            </h3>
            <p className="text-sm font-medium leading-relaxed text-white/80">
              OEKO-TEX Standard 100 · ISO 9001 · Sedex-SMETA · CPSIA-compliant
              inks
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              <CreditCard size={12} className="mr-1 inline-block" />
              Payment
            </h3>
            <p className="text-sm font-medium leading-relaxed text-white/80">
              T/T · L/C at sight · PayPal (samples) · Trade Assurance on
              Alibaba
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#ff4d00]">
              <Layers size={12} className="mr-1 inline-block" />
              Platforms
            </h3>
            <p className="text-sm font-medium leading-relaxed text-white/80">
              Alibaba Gold Supplier · Made-in-China · Global Sources · Google
              Verified
            </p>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-white/10 bg-black text-white/70">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 text-xs md:flex-row md:items-center">
          <p className="font-medium">
            © {new Date().getFullYear()} Yiwu HomeDorm Commodity Manufacturing
            Co., Ltd. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <li>
              <Link href="/contact" className="hover:text-[#ff4d00]">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#ff4d00]">
                Terms of sale
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#ff4d00]">
                Shipping policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#ff4d00]">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-6 text-[11px] leading-relaxed text-white/50">
          sublimprint.com is the website of Yiwu HomeDorm Commodity Manufacturing
          Co., Ltd. — registered in Yiwu, Zhejiang, China. SublimPrint is a
          trade name used for the website only; it is not a registered
          trademark. All artwork, designs and trademarks shown are property
          of their respective owners.
        </div>
      </div>
    </footer>
  );
}
