import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Navbar() {
  const links = [
    { href: "/v4", label: "Home" },
    { href: "/v4/products", label: "Products" },
    { href: "/v4/about", label: "About" },
    { href: "/v4/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0e1a]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/v4" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">VividPrint</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/v4/contact"
          className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cyan-500/30"
        >
          Start a Project
        </Link>
      </div>
    </header>
  );
}
