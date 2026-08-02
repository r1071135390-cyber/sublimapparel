"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function V3Switcher() {
  const pathname = usePathname();

  return (
    <div className="fixed right-6 bottom-6 z-[100] flex items-center gap-1 border-2 border-black bg-white p-1 shadow-[4px_4px_0_0_#000]">
      <Link
        href="/"
        className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors ${
          !pathname.startsWith("/v2") && !pathname.startsWith("/v3")
            ? "bg-black text-white"
            : "text-black hover:bg-black/5"
        }`}
      >
        V1
      </Link>
      <Link
        href="/v2"
        className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors ${
          pathname.startsWith("/v2")
            ? "bg-black text-white"
            : "text-black hover:bg-black/5"
        }`}
      >
        V2
      </Link>
      <Link
        href="/v3"
        className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors ${
          pathname.startsWith("/v3")
            ? "bg-[#ff4d00] text-white"
            : "text-black hover:bg-black/5"
        }`}
      >
        V3
      </Link>
    </div>
  );
}
