import Link from "next/link";

export function Footer() {
  const links = {
    Products: [
      { href: "/v4/products", label: "T-Shirts" },
      { href: "/v4/products", label: "Sports Jerseys" },
      { href: "/v4/products", label: "Hoodies" },
      { href: "/v4/products", label: "All Products" },
    ],
    Company: [
      { href: "/v4/about", label: "About Us" },
      { href: "/v4/contact", label: "Contact" },
      { href: "#", label: "Factory Tour" },
      { href: "#", label: "Sustainability" },
    ],
    Service: [
      { href: "#", label: "DDP Shipping" },
      { href: "#", label: "Custom Design" },
      { href: "#", label: "Sample Service" },
      { href: "#", label: "Bulk Orders" },
    ],
  };

  return (
    <footer className="border-t border-white/10 bg-[#06080f] text-white">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="text-2xl font-semibold tracking-tight">VividPrint</div>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Full-color, full-cotton sublimation apparel. DDP delivery to your door — no customs, no duties, no headaches.
            </p>
            <div className="mt-6 text-xs text-white/40">
              Yiwu, China · Shipping to 50+ countries
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-white/60 transition-colors hover:text-cyan-400">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">© 2025 VividPrint. All rights reserved.</p>
          <p className="text-xs text-white/40">hello@vividprint.cn · +86 138 XXXX XXXX</p>
        </div>
      </div>
    </footer>
  );
}
