// functions/lib/pi-status.ts
// MIRROR of src/lib/pi-status.ts — Cloudflare Pages Functions live in
// their own compile unit and can't reach into src/ directly, so we keep
// a copy here. Keep the two files in sync.
//
// 2026-11-17 (R139): the editable-status rule used to live inline in
// functions/api/pi/update.ts as `new Set(["draft", "sent"])`, which
// contradicted the admin UI and made every unpaid-but-not-sent PI
// impossible to edit. See src/lib/pi-status.ts for the full rationale.

/**
 * Statuses whose PI document the admin may still change.
 *
 * Mirrored in src/lib/pi-status.ts — keep the two in sync.
 */
export const EDITABLE_PI_STATUSES: readonly string[] = [
  "draft",
  "sent",
  "pending_bank",
  "partially_paid",
];

/**
 * Normalize a raw status string. `cancelled` is accepted as an alias
 * of `canceled` because older rows were written with that spelling.
 */
export function normalizePiStatus(status: unknown): string {
  const s = typeof status === "string" ? status.toLowerCase().trim() : "";
  return s === "cancelled" ? "canceled" : s;
}

/**
 * True when the PI may still be edited.
 */
export function isEditablePiStatus(status: unknown): boolean {
  return EDITABLE_PI_STATUSES.includes(normalizePiStatus(status));
}
