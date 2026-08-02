import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Custom T-Shirts", href: "/v5/products" },
  { label: "Sports Jerseys", href: "/v5/products" },
  { label: "Hoodies", href: "/v5/products" },
  { label: "Tank Tops", href: "/v5/products" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/v5/about" },
  { label: "Our Process", href: "/v5/about" },
  { label: "Quality Control", href: "/v5/about" },
  { label: "Contact", href: "/v5/contact" },
];

export function V5Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-white">
                VP
              </div>
              <span className="text-lg font-bold text-neutral-900">VividPrint</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Full-color sublimation apparel, delivered to your door. No customs, no duties, no
              hassle.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
                OEKO-TEX
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
                Sedex
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900">Products</h4>
            <ul className="mt-4 space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-600 hover:text-neutral-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900">Company</h4>
            <ul className="mt-4 space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-neutral-600 hover:text-neutral-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900">Get in Touch</h4>
            <p className="mt-4 text-sm text-neutral-600">
              sales@vividprint.com
              <br />
              Mon-Fri, 9:00-18:00 (GMT+8)
            </p>
            <Link
              href="/v5/contact"
              className="mt-4 inline-block rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
          © 2025 VividPrint. All rights reserved. | Yiwu, China
        </div>
      </div>
    </footer>
  );
}
