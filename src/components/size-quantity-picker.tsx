"use client";

import * as React from "react";
import { Plus, Minus, X } from "lucide-react";

/**
 * Size row type for the structured size picker used by both:
 *  - the contact page form
 *  - the Request a Quote modal
 */
export type SizeRow = {
  id: string;
  size: string;
  qty: number;
  fixed: boolean;
};

export const DEFAULT_SIZES: SizeRow[] = [
  { id: "sz-xs", size: "XS", qty: 0, fixed: true },
  { id: "sz-s", size: "S", qty: 0, fixed: true },
  { id: "sz-m", size: "M", qty: 0, fixed: true },
  { id: "sz-l", size: "L", qty: 0, fixed: true },
  { id: "sz-xl", size: "XL", qty: 0, fixed: true },
  { id: "sz-xxl", size: "2XL", qty: 0, fixed: true },
];

export const SIZE_PRESETS = [
  "Custom T-Shirts (Polyester)",
  "Custom T-Shirts (Cotton)",
  "Cycling Kits",
  "Racing Kits",
  "Hoodies & Sweatshirts",
  "Jerseys & Vests",
  "Pants & Shorts",
  "Golf / Bowling Shirts",
  "Hats & Caps",
  "Bags & Backpacks",
  "Flags & Banners",
  "Home Textiles (Pillows, Throws, Curtains)",
  "Mousepads & Coasters",
  "Phone Cases & Small Accessories",
  "Custom Project (Other)",
];

export const PRINT_METHODS = [
  "Sublimation",
  "DTG (Direct to garment)",
  "DTF (Heat transfer)",
  "Screen print",
  "Embroidery",
  "Not sure — please advise",
];

export const FABRIC_OPTIONS = [
  "Polyester",
  "100% cotton",
  "Poly-cotton blend",
  "Recycled / rPET",
  "Not sure — please advise",
];

export const DESIGN_STATUSES = [
  "Have design ready",
  "Have sketch / concept",
  "Need design help",
  "Use a template",
];

/**
 * Size breakdown picker — default 6 columns (XS-2XL), with optional
 * custom size rows. Renders a live total below.
 */
export function SizeQuantityPicker({
  rows,
  onBump,
  onSetQty,
  onAdd,
  onRemove,
  onRename,
  totalPieces,
}: {
  rows: SizeRow[];
  onBump: (id: string, delta: number) => void;
  onSetQty: (id: string, n: number) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onRename: (id: string, label: string) => void;
  totalPieces: number;
}) {
  const fixedRows = rows.filter((r) => r.fixed);
  const customRows = rows.filter((r) => !r.fixed);

  return (
    <div className="space-y-3">
      {/* Default 6-column grid */}
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {fixedRows.map((r) => (
          <div key={r.id} className="flex flex-col">
            <div className="mb-1 text-center text-[10px] font-black uppercase tracking-widest text-[#0a0a0a]">
              {r.size}
            </div>
            <SizeQtyStepper
              qty={r.qty}
              onBump={(d) => onBump(r.id, d)}
              onSet={(n) => onSetQty(r.id, n)}
            />
          </div>
        ))}
      </div>

      {/* Custom rows */}
      {customRows.length > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {customRows.map((r) => (
            <div key={r.id} className="flex flex-col">
              <div className="mb-1 flex items-center gap-1">
                <input
                  type="text"
                  value={r.size}
                  onChange={(e) => onRename(r.id, e.target.value)}
                  placeholder="e.g. 3XL"
                  maxLength={8}
                  aria-label="Custom size label"
                  className="w-full border-b-2 border-[#0a0a0a]/30 bg-transparent py-1 text-center text-[10px] font-black uppercase tracking-widest text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff4d00] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => onRemove(r.id)}
                  aria-label={`Remove ${r.size || "custom size"}`}
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[#0a0a0a]/40 transition-colors hover:bg-black/5 hover:text-[#ff4d00]"
                >
                  <X className="h-3 w-3" strokeWidth={2.5} />
                </button>
              </div>
              <SizeQtyStepper
                qty={r.qty}
                onBump={(d) => onBump(r.id, d)}
                onSet={(n) => onSetQty(r.id, n)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Add special size */}
      <button
        type="button"
        onClick={onAdd}
        className="w-full border border-dashed border-[#0a0a0a]/25 px-2 py-1.5 text-[10px] font-bold text-[#ff4d00] transition-colors hover:border-[#ff4d00] hover:bg-[#ff4d00]/5"
      >
        + Add special size (e.g. 3XL, 4XL, Tall) — add as many rows as you need
      </button>

      {/* Total */}
      <div className="flex items-baseline justify-between border-t border-[#0a0a0a]/10 pt-2">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a]/60">
          Total{" "}
          <span className="ml-1 text-sm font-black tabular-nums text-[#0a0a0a]">
            {totalPieces.toLocaleString()}
          </span>{" "}
          pcs
        </div>
        <div className="text-[9px] font-bold uppercase tracking-wider text-[#0a0a0a]/40">
          leave 0 if not needed
        </div>
      </div>
    </div>
  );
}

function SizeQtyStepper({
  qty,
  onBump,
  onSet,
}: {
  qty: number;
  onBump: (delta: number) => void;
  onSet: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border border-[#0a0a0a]/20 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onBump(-1)}
        className="flex h-8 w-8 items-center justify-center text-[#0a0a0a]/60 transition-colors hover:bg-black/5 hover:text-[#ff4d00] disabled:cursor-not-allowed disabled:opacity-30"
        disabled={qty <= 0}
      >
        <Minus className="h-3 w-3" strokeWidth={2.5} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={99999}
        value={qty}
        onChange={(e) => onSet(parseInt(e.target.value, 10))}
        className="w-full min-w-0 border-x border-[#0a0a0a]/15 bg-transparent py-1 text-center text-sm font-black tabular-nums text-[#0a0a0a] focus:outline-none"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onBump(1)}
        className="flex h-8 w-8 items-center justify-center text-[#0a0a0a]/60 transition-colors hover:bg-black/5 hover:text-[#ff4d00]"
      >
        <Plus className="h-3 w-3" strokeWidth={2.5} />
      </button>
    </div>
  );
}
