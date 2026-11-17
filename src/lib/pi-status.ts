// src/lib/pi-status.ts
// Single source of truth for proforma invoice status handling in the
// admin UI.
//
// 2026-11-17 (R139): before this module, the "can I edit this PI?" rule
// was duplicated in three places with three different answers:
//
//   - functions/api/pi/update.ts  → EDITABLE_STATUSES = {draft, sent}
//   - edit-pi/EditPIClient.tsx    → status !== "draft" && status !== "sent"
//   - summary/SummaryClient.tsx   → sc.label === "DRAFT" || sc.label === "SENT"
//
// The third one compares a DISPLAY LABEL, so a status that fell through
// to the default branch was silently treated as editable. The server
// kept the real authority but the UI kept disagreeing with it.
//
// One rule, one place: a PI is editable while it is still alive and no
// money has been collected for it.
//
//   draft          no money involved          → editable
//   sent           no money involved          → editable
//   pending_bank   customer declared a wire; the factory has not
//                  confirmed receipt, so amount_paid_cents is still 0
//                  → editable (the declared amount + reference stay in
//                    bank_notes; /api/admin/pi/mark-received reconciles
//                    what actually landed)
//   partially_paid a deposit was collected, the balance is still open
//                  → editable (the update endpoint recomputes
//                    amount_due_cents as total − paid, and the Stripe
//                    intent is re-minted when its amount changes)
//   paid           money fully collected       → locked
//   canceled       voided by sales             → locked
//   expired        past valid_until, dead      → locked
//
// The server mirror of this rule lives in functions/lib/pi-status.ts —
// Cloudflare Pages Functions are a separate compile unit and cannot
// import from src/. Keep the two in sync.

/** Every status the database allows for a proforma invoice. */
export type PiStatus =
  | "draft"
  | "sent"
  | "paid"
  | "pending_bank"
  | "partially_paid"
  | "canceled"
  | "expired";

/**
 * Statuses whose PI document the admin may still change.
 *
 * Mirrored in functions/lib/pi-status.ts — keep the two in sync.
 */
export const EDITABLE_PI_STATUSES: readonly PiStatus[] = [
  "draft",
  "sent",
  "pending_bank",
  "partially_paid",
];

/**
 * Normalize whatever the API / database returned into a lower-case
 * status string. `cancelled` is accepted as an alias of `canceled`
 * because older rows were written with the British spelling.
 */
export function normalizePiStatus(status: string | null | undefined): string {
  const s = (status ?? "").toLowerCase().trim();
  return s === "cancelled" ? "canceled" : s;
}

/**
 * True when the PI may still be edited.
 *
 * @param status the PI's status, in any casing the database might use
 */
export function isEditablePiStatus(status: string | null | undefined): boolean {
  return (EDITABLE_PI_STATUSES as readonly string[]).includes(
    normalizePiStatus(status),
  );
}

/**
 * True when the invoice is settled — nothing left to collect.
 *
 * `expired` counts as settled: the PI is dead, so offering a "Receive"
 * button on it would only produce a server-side rejection.
 */
export function isSettledPiStatus(status: string | null | undefined): boolean {
  const s = normalizePiStatus(status);
  return isPaidPiStatus(status) || s === "canceled" || s === "expired";
}

/**
 * True when money has been collected against the invoice.
 *
 * Accepts the aliases the Stripe webhook and the manual mark-paid flow
 * have used historically.
 */
export function isPaidPiStatus(status: string | null | undefined): boolean {
  const s = normalizePiStatus(status);
  return (
    s === "paid" || s === "succeeded" || s === "completed" || s === "true"
  );
}

/**
 * True when the PI was voided by sales. Accepts both the `canceled`
 * and the legacy `cancelled` spellings.
 */
export function isCancelledPiStatus(status: string | null | undefined): boolean {
  return normalizePiStatus(status) === "canceled";
}

/**
 * Badge colours + label for the admin summary list.
 *
 * 2026-11-17 (R139): `pending_bank` and `expired` used to fall through
 * to the default branch and were both rendered as "DRAFT", which made a
 * wire-awaiting-verification invoice look like a brand-new draft.
 */
export function piStatusMeta(status: string | null | undefined): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  switch (normalizePiStatus(status)) {
    case "paid":
      return {
        bg: "bg-[#0a0a0a]",
        text: "text-white",
        border: "border-[#0a0a0a]",
        label: "PAID",
      };
    case "sent":
      return {
        bg: "bg-[#00c2ff]",
        text: "text-[#0a0a0a]",
        border: "border-[#00c2ff]",
        label: "SENT",
      };
    // 2026-11-08 (R133): a deposit was collected, the balance is open.
    case "partially_paid":
      return {
        bg: "bg-amber-400",
        text: "text-[#0a0a0a]",
        border: "border-amber-500",
        label: "DEPOSIT PAID",
      };
    // 2026-11-17 (R139): the customer declared a wire, we have not
    // confirmed it yet.
    case "pending_bank":
      return {
        bg: "bg-[#ff4d00]",
        text: "text-black",
        border: "border-[#ff4d00]",
        label: "WIRE PENDING",
      };
    case "canceled":
      return {
        bg: "bg-white",
        text: "text-[#6b6b6b]",
        border: "border-[#6b6b6b]",
        label: "CANCELLED",
      };
    case "expired":
      return {
        bg: "bg-white",
        text: "text-[#6b6b6b]",
        border: "border-[#6b6b6b]",
        label: "EXPIRED",
      };
    case "draft":
    default:
      return {
        bg: "bg-[#ff4d00]",
        text: "text-white",
        border: "border-[#ff4d00]",
        label: "DRAFT",
      };
  }
}
