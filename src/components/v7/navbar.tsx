"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/v7", label: "Index" },
    { href: "/v7/products", label: "Catalogue" },
    { href: "/v7/about", label: "Atelier" },
    { href: "/v7/contact", label: "Contact" },
  ];

  return (
    <header className="border-b border-stone-300 bg-[#f5f1e8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between">
          <Link href="/v7" className="flex items-baseline gap-3">
            <span className="font-serif text-2xl font-semibold tracking-tight text-stone-900">
              Vivid<span className="italic">Print</span>
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-stone-500 sm:inline">
              Issue Nº 07
            </span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive
                      ? "font-medium text-stone-900"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/v7/contact"
            className="border border-stone-900 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-stone-900 transition-colors hover:bg-stone-900 hover:text-[#f5f1e8]"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </header>
  );
}
