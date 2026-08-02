"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/v6", label: "Home" },
  { href: "/v6/products", label: "Products" },
  { href: "/v6/about", label: "About" },
  { href: "/v6/contact", label: "Contact" },
];

export function V6Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/v6" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center bg-[#00ff88] text-sm font-black text-black">
            VP
          </div>
          <span className="text-lg font-black uppercase tracking-tight text-white">
            VividPrint
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "text-[#00ff88]" : "text-white/80 hover:text-[#00ff88]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/v6/contact"
            className="rounded-none border-2 border-white px-5 py-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
          >
            Get Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-none p-2 text-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-white/80"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
