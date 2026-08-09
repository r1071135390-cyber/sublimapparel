import Link from "next/link";

export function Navbar() {
  const links = [
    { href: "/products", label: "Products" },
    { href: "/fabric", label: "Fabric" },
    { href: "/shipping", label: "Shipping" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <img
            src="/logo-main.jpg"
            alt="SublimApparel"
            className="h-12 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-[#ff4d00]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/get-a-quote"
          className="group inline-flex items-center gap-2 bg-black px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#ff4d00]"
        >
          Get a quote
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </nav>
  );
}
