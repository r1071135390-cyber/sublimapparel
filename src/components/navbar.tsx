import Link from "next/link";
import { User, ChevronDown, Mail } from "lucide-react";

export function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/fabric", label: "Fabric" },
    { href: "/technique", label: "Technique" },
    { href: "/shipping", label: "Shipping" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
        <Link href="/" className="group flex items-center gap-2">
          <img
            src="/sublimapparel-logo.webp"
            alt="SublimApparel — custom all-over print apparel factory, Yiwu China"
            className="h-11 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-[#cc3d00]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {/* Contact — sits next to account, always visible (desktop + mobile) */}
          <Link
            href="/contact"
            aria-label="Contact"
            className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-2 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#ff4d00] hover:text-white"
          >
            <Mail className="h-5 w-5" strokeWidth={2.5} />
            <span className="hidden sm:inline">Contact</span>
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-[#cc3d00]"
              aria-label="Account"
            >
              <User className="h-5 w-5" strokeWidth={2.5} />
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={3} />
            </button>
            <div className="invisible absolute right-0 top-full z-10 w-44 border-2 border-black bg-white pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <Link
                href="/login/"
                className="block px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/register/"
                className="block border-t border-black/10 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-black hover:bg-[#ff4d00] hover:text-white"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
