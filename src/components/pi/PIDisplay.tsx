/**
 * PIDisplay — render a PI in the exact Excel layout (black/blue/red)
 * Used by the customer-facing /pay/ page and (optionally) the admin preview.
 *
 * Color scheme (matching the Excel PI file):
 *   - Black (#000): company header, fixed text (factory info, terms 1-7, signatures)
 *   - Red (#FF0000): customer-fillable fields, "The company name must be written in full..." reminder
 *   - Blue (#0070C0): bank info (beneficiary, company address)
 */

import { CheckCircle2 } from "lucide-react";

export interface PIItemRow {
  description: string;
  fabric?: string | null;
  qty: number;
  unit?: string | null;
  unit_price_cents: number;
  total_cents: number;
  image_url?: string | null;
  sizes?: { label: string; qty: number }[] | null;
}

export interface PIDisplayData {
  pi_number: string;
  issue_date: string;
  valid_until?: string;
  lead_time_text: string;
  payment_terms_text: string;
  customer_name: string;
  customer_phone?: string | null;
  customer_address?: string | null;
  items: PIItemRow[];
  shipping_label?: string;
  shipping_method?: string;
  shipping_cents: number;
  total_cents: number;
  subtotal_cents: number;
  currency: string;
}

const BLACK = "#000000";
const RED = "#FF0000";
const BLUE = "#0070C0";
const GRAY_LIGHT = "#f5f5f5";

const fmtMoney = (cents: number, currency = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(cents / 100);

const fmtDate = (iso: string) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

function ItemWithSizesRow({
  it,
  currency,
}: {
  it: PIItemRow;
  currency: string;
}) {
  const hasSizes = Array.isArray(it.sizes) && it.sizes.length > 0;
  return (
    <>
      <tr className="border-b border-black/30 align-top">
        <td
          className="border-r border-black/30 p-2 text-center"
          style={{ minHeight: 70 }}
        >
          {it.image_url ? (
            <img
              src={it.image_url}
              alt={it.description}
              className="mx-auto h-16 w-16 border border-black/20 object-cover"
            />
          ) : (
            <div className="mx-auto h-16 w-16 border border-dashed border-black/30" />
          )}
        </td>
        <td className="border-r border-black/30 p-2 font-bold">
          {it.description}
        </td>
        <td
          className="border-r border-black/30 p-2"
          style={{ color: RED }}
        >
          {it.fabric || ""}
        </td>
        <td
          className="border-r border-black/30 p-2 text-right"
          style={{ color: RED }}
        >
          {it.qty} {it.unit || "set"}
        </td>
        <td
          className="border-r border-black/30 p-2 text-right"
          style={{ color: RED }}
        >
          {fmtMoney(it.unit_price_cents, currency)}
        </td>
        <td className="p-2 text-right font-bold">
          {fmtMoney(it.total_cents, currency)}
        </td>
      </tr>
      {hasSizes && (
        <tr className="border-b border-black/30 bg-[#fafafa]">
          <td className="border-r border-black/30 p-2" />
          <td colSpan={5} className="p-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]">
              <span
                className="font-black uppercase tracking-wide"
                style={{ color: RED }}
              >
                Size Breakdown:
              </span>
              {it.sizes!.map((s, i) => (
                <span
                  key={`${s.label}-${i}`}
                  className="inline-flex items-center gap-1"
                  style={{ color: RED }}
                >
                  <span className="font-bold">{s.label}</span>
                  <span>×{s.qty}</span>
                </span>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export function PIDisplay({ pi }: { pi: PIDisplayData }) {
  const itemsSubtotal = pi.items.reduce((s, it) => s + it.total_cents, 0);
  const shipping = pi.shipping_cents;

  return (
    <div
      className="border-2 border-black bg-white text-[12px] leading-snug"
      style={{ color: BLACK }}
    >
      {/* === ROW 1-3: Header (black, fixed) === */}
      <div className="border-b border-black px-4 py-2 text-center">
        <p className="text-[14px] font-black uppercase tracking-wide">
          Yiwu Homedorm Commodity Manufacturing Co., Ltd
        </p>
        <p className="text-[11px] text-black/80">
          Add: 2nd Floor, No.11 Anshang Road, Yiwu City, China
        </p>
        <h1 className="mt-2 text-[22px] font-black uppercase tracking-widest text-black">
          Proforma Invoice
        </h1>
      </div>

      {/* === ROW 4-8: FM block + factory info === */}
      <div className="grid grid-cols-2 border-b border-black">
        {/* Left: factory info (black) */}
        <div className="border-r border-black p-3 text-[11px]">
          <p className="font-bold">FM: sublimapparel.com</p>
          <p className="mt-1 font-bold">
            Yiwu Homedorm Commodity Manufacturing Co., Ltd
          </p>
          <p>2nd Floor, No.11 Anshang Road, Yiwu, China</p>
          <p className="mt-1">
            <span className="font-bold">Attn:</span> Miss Chris Ma ·{" "}
            <span className="text-[#0070C0]">+86 19817930190</span> ·{" "}
            <span className="text-[#0070C0]">chris@sublimapparel.com</span>
          </p>
        </div>
        {/* Right: INVOICE NO / ISSUE DATE / LEAD TIME (red) */}
        <div className="text-[11px]">
          <Field label="INVOICE NO." value={pi.pi_number} red />
          <Field label="ISSUE DATE" value={fmtDate(pi.issue_date)} red />
          <Field label="LEAD TIME" value={pi.lead_time_text} red />
        </div>
      </div>

      {/* === ROW 9-12: TO block (red, customer-filled) === */}
      <div className="border-b border-black p-3 text-[11px]">
        <p className="text-[10px] font-bold uppercase">TO:</p>
        <p className="mt-0.5 text-[13px] font-bold" style={{ color: RED }}>
          {pi.customer_name || "—"}
        </p>
        {pi.customer_address && (
          <p className="mt-0.5" style={{ color: RED }}>
            {pi.customer_address}
          </p>
        )}
        {pi.customer_phone && (
          <p className="mt-0.5" style={{ color: RED }}>
            {pi.customer_phone}
          </p>
        )}
      </div>

      {/* === ROW 13-17: Items table === */}
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr className="border-b border-t border-black bg-[#fafafa]">
            <th className="w-[15%] border-r border-black p-2 text-center text-[10px] font-black uppercase">
              Product Picture
            </th>
            <th className="w-[35%] border-r border-black p-2 text-left text-[10px] font-black uppercase">
              Description
            </th>
            <th className="w-[18%] border-r border-black p-2 text-left text-[10px] font-black uppercase">
              Fabric Content
            </th>
            <th className="w-[10%] border-r border-black p-2 text-right text-[10px] font-black uppercase">
              Qty
            </th>
            <th className="w-[12%] border-r border-black p-2 text-right text-[10px] font-black uppercase">
              Price (USD)
            </th>
            <th className="w-[12%] p-2 text-right text-[10px] font-black uppercase">
              Total (USD)
            </th>
          </tr>
        </thead>
        <tbody>
          {pi.items.map((it, idx) => (
            <ItemWithSizesRow key={idx} it={it} currency={pi.currency} />
          ))}
          {/* Shipping row */}
          <tr className="border-b border-black/30 align-top">
            <td className="border-r border-black/30 p-2 text-center">
              <div className="mx-auto h-16 w-16 border border-dashed border-black/30" />
            </td>
            <td className="border-r border-black/30 p-2 font-bold" style={{ color: RED }}>
              {pi.shipping_label || "Shipping Cost"}
            </td>
            <td
              className="border-r border-black/30 p-2 italic"
              style={{ color: RED }}
            >
              {pi.shipping_method || ""}
            </td>
            <td
              className="border-r border-black/30 p-2 text-right"
              style={{ color: RED }}
            >
              1
            </td>
            <td
              className="border-r border-black/30 p-2 text-right"
              style={{ color: RED }}
            >
              {fmtMoney(shipping, pi.currency)}
            </td>
            <td className="p-2 text-right font-bold">
              {fmtMoney(shipping, pi.currency)}
            </td>
          </tr>
          {/* Grand total row */}
          <tr className="bg-[#fafafa]">
            <td
              colSpan={5}
              className="border-r border-black p-2 text-right text-[11px] font-black uppercase"
            >
              Total Amount (USD)
            </td>
            <td className="p-2 text-right text-[14px] font-black">
              {fmtMoney(pi.total_cents, pi.currency)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* === ROW 18-23: Terms (black, fixed) === */}
      <div className="border-b border-black p-3 text-[10px] leading-relaxed">
        <p>
          <span className="font-bold">(1) Payment:</span> {pi.payment_terms_text}
        </p>
        <p>
          <span className="font-bold">(2) Lead Time:</span> {pi.lead_time_text}
        </p>
        <p>
          <span className="font-bold">(3) Packing:</span> Each piece in one pp bag,
          standard export carton.
        </p>
        <p>
          <span className="font-bold">(4) Sample:</span> Sample fee will be refunded
          upon bulk order.
        </p>
        <p>
          <span className="font-bold">(5) MOQ:</span> 50 pcs per design.
        </p>
        <p>
          <span className="font-bold">(6) Shipment:</span> By sea / air / express as
          per buyer&apos;s option. DDP service available.
        </p>
        <p>
          <span className="font-bold">(7) Validity:</span> This PI is valid until{" "}
          {fmtDate(pi.valid_until || "")}.
        </p>
      </div>

      {/* === ROW 24-33: Bank Info === */}
      <div className="border-b border-black p-3 text-[10px]">
        <p className="mb-1 text-[12px] font-black uppercase tracking-wide">
          Bank Info:
        </p>
        <p>
          <span className="font-bold">BENEFICIARY: </span>
          <span style={{ color: BLUE }} className="font-bold">
            Yiwu Homedorm Commodity Manufacturing Co., Ltd
          </span>
        </p>
        {/* Red reminder - KEEPS RED as the customer reminder */}
        <p className="mt-1 italic" style={{ color: RED }}>
          *The company name must be written in full on the wire transfer, otherwise
          the payment cannot be received.
        </p>
        <p className="mt-1">
          <span className="font-bold">COMPANY ADDRESS: </span>
          <span style={{ color: BLUE }} className="font-bold">
            2nd Floor, No.11 Anshang Road, Yiwu City, China
          </span>
        </p>
        <div className="mt-1 grid grid-cols-2 gap-x-3">
          <p>
            <span className="font-bold">BANK NAME: </span>
            Bank of China, Yiwu Branch
          </p>
          <p>
            <span className="font-bold">BANK ADDRESS: </span>
            No.188 Chouzhou North Road, Yiwu, China
          </p>
          <p>
            <span className="font-bold">ACCOUNT NO.: </span>
            1234 5678 9012 3456
          </p>
          <p>
            <span className="font-bold">SWIFT CODE: </span>
            BKCHCNBJ78A
          </p>
        </div>
      </div>

      {/* === ROW 49-51: Signatures === */}
      <div className="grid grid-cols-2 p-3 text-[11px]">
        <div>
          <p className="text-[10px] uppercase text-black/60">Seller</p>
          <p className="mt-4 font-bold">
            Yiwu Homedorm Commodity Manufacturing Co., Ltd
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-black/60">Buyer</p>
          <p className="mt-4 font-bold" style={{ color: RED }}>
            {pi.customer_name || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  red,
}: {
  label: string;
  value: string;
  red?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2 border-b border-black/20 px-3 py-1.5 last:border-b-0">
      <span className="w-[110px] text-[10px] font-bold uppercase tracking-wide">
        {label}
      </span>
      <span
        className="flex-1 font-bold"
        style={{ color: red ? RED : BLACK }}
      >
        {value || "—"}
      </span>
    </div>
  );
}

// Compact badge to show the PI status
export function PIStatusBadge({
  status,
}: {
  status: "draft" | "sent" | "paid" | "pending_bank" | "canceled" | "expired";
}) {
  const config: Record<string, { label: string; bg: string; text: string }> = {
    draft: { label: "Draft", bg: "bg-black/10", text: "text-black/70" },
    sent: { label: "Awaiting payment", bg: "bg-[#ff4d00]/10", text: "text-[#ff4d00]" },
    paid: { label: "Paid", bg: "bg-[#00c2ff]/10", text: "text-[#0070c0]" },
    pending_bank: {
      label: "Bank transfer pending verification",
      bg: "bg-amber-100",
      text: "text-amber-800",
    },
    canceled: { label: "Canceled", bg: "bg-black/5", text: "text-black/70" },
    expired: { label: "Expired", bg: "bg-black/5", text: "text-black/70" },
  };
  const c = config[status] || config.draft;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${c.bg} ${c.text}`}
    >
      {status === "paid" && <CheckCircle2 className="h-3 w-3" />}
      {c.label}
    </span>
  );
}
