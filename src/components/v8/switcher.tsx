"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const VERSIONS = [
  { id: "v1", label: "V1" },
  { id: "v2", label: "V2" },
  { id: "v3", label: "V3" },
  { id: "v4", label: "V4" },
  { id: "v5", label: "V5" },
  { id: "v6", label: "V6" },
  { id: "v7", label: "V7" },
  { id: "v8", label: "V8" },
    { id: "v9", label: "V9" },
    { id: "v10", label: "V10" },
];

export function Switcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const getVersionPath = (targetId: string, currentPath: string) => {
    const target = VERSIONS.find((v) => v.id === targetId);
    if (!target) return "/";
    const currentFile = currentPath.split("/").pop() || "";
    const base = target.id === "v1" ? "" : `/${target.id}`;
    if (!currentFile || currentFile === "v8" || currentFile === target.id) return base || "/";
    if (currentFile === "products" || currentFile === "about" || currentFile === "contact") {
      return `${base}/${currentFile}`;
    }
    return base || "/";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 border-4 border-black bg-white shadow-[8px_8px_0_0_#000]">
          <p className="border-b-2 border-black bg-black px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#ffeb00]">
            → COMPARE
          </p>
          <div className="grid grid-cols-4 gap-px bg-black">
            {VERSIONS.map((v) => {
              const isActive = (pathname === `/${v.id}` || pathname.startsWith(`/${v.id}/`)) ||
                (v.id === "v1" && (pathname === "/" || pathname.startsWith("/products") || pathname.startsWith("/about") || pathname.startsWith("/contact") && !pathname.startsWith("/v")));
              return (
                <Link
                  key={v.id}
                  href={getVersionPath(v.id, pathname)}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 text-center text-[11px] font-black uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-[#ffeb00] text-black"
                      : "bg-white text-black hover:bg-black hover:text-[#ffeb00]"
                  }`}
                >
                  {v.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="border-4 border-black bg-[#ffeb00] px-5 py-3 text-sm font-black uppercase tracking-widest text-black shadow-[4px_4px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        {open ? "CLOSE ×" : "VERSIONS"}
      </button>
    </div>
  );
}
