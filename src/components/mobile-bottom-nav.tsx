"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Shirt,
  Compass,
  Layers,
  Wrench,
  Truck,
  FileText,
} from "lucide-react";
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
    match: (p) =>
      p === "/products" ||
      p.startsWith("/products/") ||
      p.startsWith("/tag/") ||
      p.startsWith("/cases/"),
  },
  {
    href: "/teams-sports-apparel",
    label: "Solutions",
    icon: Compass,
    match: (p) =>
      p === "/teams-sports-apparel" ||
      p === "/event-festivals-conferences" ||
      p === "/corporate-organization-apparel" ||
      p === "/promotional-marketing-apparel" ||
      p === "/apparel-brands-agencies" ||
      p === "/e-commerce-fulfillment",
  },
  {
    href: "/fabric",
    label: "Fabrics",
    icon: Layers,
    match: (p) => p === "/fabric" || p.startsWith("/fabric/"),
  },
  {
    href: "/resources",
    label: "Tools",
    icon: Wrench,
    match: (p) =>
      p === "/resources" ||
      p === "/event-timeline" ||
      p === "/us-size-guide" ||
      p === "/quality-control" ||
      p === "/90-day-program" ||
      p === "/how-to-source",
  },
  {
    href: "/shipping",
    label: "Shipping",
    icon: Truck,
    match: (p) =>
      p === "/shipping" ||
      p === "/shipping-policy" ||
      p === "/ddp",
  },
  {
    href: "/blog",
    label: "Blog",
    icon: FileText,
    match: (p) => p === "/blog" || p.startsWith("/blog/"),
  },
];

export function MobileBottomNav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-0 bottom-0 z-40 px-2 pb-2 md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className="relative mx-auto flex h-[68px] max-w-screen-sm items-stretch justify-around rounded-[28px] border border-white/50 bg-white/55 shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.22),0_-2px_8px_-2px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] backdrop-blur-2xl backdrop-saturate-150"
        style={{
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          backdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        {/* Subtle top highlight line for that "glass" look */}
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="group relative flex flex-1 flex-col items-center justify-center gap-0.5"
              aria-current={active ? "page" : undefined}
            >
              {/* Active background pill */}
              <span
                className={cn(
                  "absolute inset-x-2 inset-y-2 rounded-2xl transition-all duration-300 ease-out",
                  active
                    ? "bg-gradient-to-b from-[#ff4d00]/12 to-[#ff4d00]/6 ring-1 ring-[#ff4d00]/25"
                    : "bg-transparent group-hover:bg-black/[0.04]"
                )}
              />

              {/* Top dot indicator (active state) */}
              <span
                className={cn(
                  "absolute top-1 h-1 rounded-full transition-all duration-300",
                  active
                    ? "w-6 bg-[#ff4d00] shadow-[0_0_8px_rgba(255,77,0,0.5)]"
                    : "w-0 bg-transparent"
                )}
              />

              <Icon
                className={cn(
                  "relative h-[22px] w-[22px] transition-all duration-200",
                  active
                    ? "scale-110 text-[#ff4d00]"
                    : "text-neutral-600 group-hover:text-black"
                )}
                strokeWidth={active ? 2.4 : 1.8}
              />
              <span
                className={cn(
                  "relative text-[10px] font-semibold leading-none tracking-tight transition-colors duration-200",
                  active ? "text-[#ff4d00]" : "text-neutral-600 group-hover:text-black"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
