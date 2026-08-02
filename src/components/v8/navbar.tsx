"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/v8", label: "INDEX" },
    { href: "/v8/products", label: "PRODUCTS" },
    { href: "/v8/about", label: "ABOUT" },
    { href: "/v8/contact", label: "CONTACT" },
  ];

  return (
    <header className="border-b-4 border-black bg-white">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/v8" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-black text-xl font-black text-white">
              VP
            </span>
            <span className="text-xl font-black uppercase tracking-tight text-black">
              VIVID/PRINT
            </span>
          </Link>

          <nav className="hidden items-center md:flex">
            {links.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-l-2 border-black px-5 py-6 text-sm font-black uppercase tracking-wider transition-colors ${
                    isActive ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"
                  } ${i === links.length - 1 ? "border-r-2" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/v8/contact"
            className="bg-[#ffeb00] px-5 py-3 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-[#ffeb00]"
          >
            GET QUOTE →
          </Link>
        </div>
      </div>
    </header>
  );
}
