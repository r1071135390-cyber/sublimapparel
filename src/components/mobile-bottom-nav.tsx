"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shirt, Wrench, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  match: (pathname: string) => boolean;
};

const tabs: Tab[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    match: (p) => p === "/",
  },
  {
    href: "/products",
    label: "Products",
    icon: Shirt,
    match: (p) => p === "/products" || p.startsWith("/products/") || p.startsWith("/tag/") || p.startsWith("/all-over-print") || p.startsWith("/cases/") || p.startsWith("/fabric/") || p.startsWith("/industry/") || p.startsWith("/technique/") || p.startsWith("/blog/") || p.startsWith("/about/") || p.startsWith("/shipping"),
  },
  {
    href: "/technique/sublimation",
    label: "Technique",
    icon: Wrench,
    match: (p) => p === "/technique" || p.startsWith("/technique/"),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
    match: (p) => p === "/contact",
  },
];

export function MobileBottomNav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex h-16 max-w-screen-sm items-stretch justify-around">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={cn(
                  "flex h-full w-full flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors",
                  active
                    ? "text-[#ff4d00]"
                    : "text-neutral-500 hover:text-black"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
                <span className="leading-none">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
