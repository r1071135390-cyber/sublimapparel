/**
 * PIDisplay — render a PI in the exact Excel layout (black/blue/red)
 * Used by the customer-facing /pay/ page and (optionally) the admin preview.
 *
 * Color scheme (matching the Excel PI file):
 *   - Black (#000): company header, fixed text (factory info, terms 1-7, signatures)
 *   - Red (#FF0000): customer-fillable fields, "The company name must be written in full..." reminder
 *   - Blue (#0070C0): bank info (beneficiary, company address)
 *
 * 2026-10-04 (R88): complete header + contract-content refresh to match the
 * customer's reference Excel (`SA202610030002 FR David 50fleece zipper hoodie.xlsx`)
 * and the corresponding PDF rendered through the admin pipeline.
 *
 *   - Header now reads (centered, uppercase):
 *       YIWU HOMEDORM
 *       COMMODITY MANUFACTURING CO.,LTD
 *       ADD: 2nd Floor, No.11 Anshang Road, Yiwu City, China
 *       PROFORMA INVOICE
 *   - The two-column FM/INVOICE NO block stays (uppercased to match).
 *   - The 7 generic terms (Payment / Lead Time / Packing / Sample / MOQ /
 *     Shipment / Validity) are REPLACED with the real factory contract:
 *       (1) Port of Loading
 *       (2) Port of Destination
 *       (3) Shipping Term
 *       (4) Terms of Payment       ← bank-info block embedded right under it
 *       (5) Production Time
 *       (6) Tolerance
 *       (7) Additional Clause (a-e)
 *   - Footer adds the two-originals sentence + Seller/Buyer stamp with
 *     the company / buyer full names.
 *   - Items table stays as-is — per user direction "中间产品信息那里按照现在的".
 *
 * 2026-10-04 (R95): collapsed ROW 1 (centered logo) + ROW 2-3 (company header)
 * into a single flex row. Logo now sits on the leftmost column of the same row
 * that holds YIWU HOMEDORM / COMMODITY / ADD / PROFORMA INVOICE, with the text
 * block centered inside the remaining flex-1 column. The two-column FM /
 * INVOICE NO block shifts down one row as a result (no content change there).
 */

import { CheckCircle2 } from "lucide-react";
import { getBankAccount, type BankAccount } from "@/lib/bank-accounts";

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

export interface PIDisplayProps {
  pi: PIDisplayData;
  // R103: admin-managed bank info. When provided, the Bank Info block
  // uses this instead of the hardcoded BANK_ACCOUNTS fallback.
  bankAccount?: BankAccount;
}

export interface PIDisplayData {
  pi_number: string;
  issue_date: string;
  valid_until?: string;
  lead_time_text: string;
  payment_terms_text: string;
  customer_name: string;
  customer_email?: string | null;
  customer_company?: string | null;
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
          className="break-words border-r border-black/30 p-1 text-center sm:p-2"
          style={{ minHeight: 70 }}
        >
          {it.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={it.image_url}
              alt={it.description}
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              className="mx-auto h-16 w-16 border border-black/20 object-cover sm:h-24 sm:w-24"
            />
          ) : (
            <div className="mx-auto h-12 w-12 border border-dashed border-black/30 sm:h-16 sm:w-16" />
          )}
        </td>
        <td className="break-words border-r border-black/30 p-1 font-bold sm:p-2">
          {it.description}
        </td>
        <td className="break-words border-r border-black/30 p-1 sm:p-2">
          {it.fabric || ""}
        </td>
        <td
          className="break-words border-r border-black/30 p-1 text-right sm:p-2"
        >
          {it.qty} {it.unit || "pcs"}
        </td>
        <td
          className="break-words border-r border-black/30 p-1 text-right sm:p-2"
        >
          {fmtMoney(it.unit_price_cents, currency)}
        </td>
        <td className="break-words p-1 text-right font-bold sm:p-2">
          {fmtMoney(it.total_cents, currency)}
        </td>
      </tr>
      {hasSizes && (
        <tr className="border-b border-black/30 bg-[#fafafa]">
          <td className="break-words border-r border-black/30 p-1 sm:p-2" />
          <td colSpan={5} className="break-words p-1 sm:p-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]">
              <span className="font-black uppercase tracking-wide">
                Size Breakdown:
              </span>
              {it.sizes!.map((s, i) => (
                <span
                  key={`${s.label}-${i}`}
                  className="inline-flex items-center gap-1"
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

export function PIDisplay(props: PIDisplayProps) {
  const { pi } = props;
  const itemsSubtotal = pi.items.reduce((s, it) => s + it.total_cents, 0);
  const shipping = pi.shipping_cents;
  // 2026-10-04 (R80): pick the right bank account for the PI's currency.
  // Wires in USD/EUR/GBP/CNY use different receiving accounts so the
  // sender's bank doesn't have to do a currency conversion (which adds
  // 1-3% fee + 1-2 day delay). Falls back to USD if currency is unknown.
  // R103: prefer caller-provided (DB-loaded) bank info, fall back to
  // the hardcoded BANK_ACCOUNTS map when the caller did not supply one
  // (e.g. admin preview before the PI has been saved).
  const bank: BankAccount = props.bankAccount ?? getBankAccount(pi.currency);
  // Pretty currency code for the table headers, e.g. "USD" / "EUR" / "GBP" / "CNY".
  const currencyUpper = pi.currency.toUpperCase();

  return (
    <div
      className="border-2 border-black bg-white text-[12px] leading-snug"
      style={{ color: BLACK }}
    >
      {/* === ROW 1: Brand logo (leftmost) + company header + PROFORMA INVOICE ===
          R95: logo used to sit in its own row above this block. User asked to
          pull it inline — leftmost column, with the company name/address/
          PROFORMA INVOICE text filling the rest of the row (still centered
          horizontally inside its column). The two-column FM/INVOICE NO block
          moves down one row as a result. */}
      <div className="flex flex-col items-center gap-2 border-y border-black bg-white px-3 py-2 sm:flex-row sm:gap-4 sm:px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sublimapparel-logo-v2.webp"
          alt="sublimapparel.com"
          width={240}
          height={64}
          decoding="async"
          className="h-12 w-auto shrink-0 sm:h-16"
        />
        <div className="min-w-0 flex-1 text-center">
          <p className="break-words text-[14px] font-black uppercase leading-tight tracking-tight sm:text-[18px]">
            YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD
          </p>
          <p className="mt-1 text-[9px] uppercase leading-snug text-black/80 sm:text-[10px]">
            ADD: 2nd Floor, No.11 Anshang Road, Yiwu City, China
          </p>
          <h1 className="mt-1 text-[18px] font-black uppercase tracking-widest text-black sm:mt-2 sm:text-[22px]">
            PROFORMA INVOICE
          </h1>
        </div>
      </div>

      {/* === ROW 2: FM block + factory info (uppercase) === */}
      <div className="grid grid-cols-2 border-b border-black">
        {/* Left: factory info (black) */}
        <div className="border-r border-black p-2 text-[10px] uppercase sm:p-3">
          <p className="font-bold">FM: SUBLIMAPPAREL.com</p>
          <p className="mt-1 font-bold">
            YIWU HOMEDORM COMMODITY MANUFACTURING CO.,LTD
          </p>
          <p>2ND FLOOR, NO.11 ANSHANG ROAD, YIWU, CHINA</p>
          <p className="mt-1 normal-case">
            <span className="font-bold">Annt.:</span> Miss Chris Ma /{" "}
            <span style={{ color: BLUE }}>+86 19817930190</span> /{" "}
            <span style={{ color: BLUE }}>chris@sublimapparel.com</span>
          </p>
        </div>
        {/* Right: INVOICE NO / ISSUE DATE / LEAD TIME (black) — R99 */}
        <div className="text-[10px]">
          <Field label="INVOICE NO.:" value={pi.pi_number} />
          <Field label="ISSUE DATE:" value={fmtDate(pi.issue_date)} />
          <Field label="LEAD TIME:" value={pi.lead_time_text} />
        </div>
      </div>

      {/* === TO block (black text, customer-filled) 鈥?R97 layout / R98 colour switch ===
          Line 1: To: <name> [/ <company>]   (company is appended with " / " only when set)
          Line 2: <address>                   (omitted when not set)
          Line 3: <phone> / <email>          (omitted when both are empty; " / " only between present values) */}
      <div className="border-b border-black p-3 text-[11px]">
        <p className="text-[13px] font-bold uppercase" style={{ color: BLACK }}>
          <span className="text-[10px] font-bold uppercase">To:</span>{" "}
          {pi.customer_name || "—"}
          {pi.customer_company ? ` / ${pi.customer_company}` : ""}
        </p>
        {pi.customer_address && (
          <p className="mt-0.5 uppercase" style={{ color: BLACK }}>
            {pi.customer_address}
          </p>
        )}
        {(pi.customer_phone || pi.customer_email) && (
          <p className="mt-0.5" style={{ color: BLACK }}>
            {[pi.customer_phone, pi.customer_email].filter(Boolean).join(" / ")}
          </p>
        )}
      </div>

      {/* === Items table (kept as-is per user direction) === */}
      <table className="w-full table-fixed border-collapse text-[10px] sm:text-[11px]">
        <thead>
          <tr className="border-b border-t border-black bg-[#fafafa]">
            <th className="w-[15%] break-words p-1 text-center text-[9px] font-black uppercase sm:p-2 sm:text-[10px]">
              Product Picture
            </th>
            <th className="w-[35%] break-words p-1 text-left text-[9px] font-black uppercase sm:p-2 sm:text-[10px]">
              Description
            </th>
            <th className="w-[18%] break-words p-1 text-left text-[9px] font-black uppercase sm:p-2 sm:text-[10px]">
              Fabric Content
            </th>
            <th className="w-[10%] break-words p-1 text-right text-[9px] font-black uppercase sm:p-2 sm:text-[10px]">
              Qty
            </th>
            <th className="w-[12%] break-words p-1 text-right text-[9px] font-black uppercase sm:p-2 sm:text-[10px]">
              DDP Price ({currencyUpper})
            </th>
            <th className="w-[12%] break-words p-1 text-right text-[9px] font-black uppercase sm:p-2 sm:text-[10px]">
              Total ({currencyUpper})
            </th>
          </tr>
        </thead>
        <tbody>
          {pi.items.map((it, idx) => (
            <ItemWithSizesRow key={idx} it={it} currency={pi.currency} />
          ))}
          {/* Shipping row */}
          <tr className="border-b border-black/30 align-top">
            <td className="break-words border-r border-black/30 p-1 text-center sm:p-2">
              <div className="mx-auto h-12 w-12 border border-dashed border-black/30 sm:h-16 sm:w-16" />
            </td>
            <td className="break-words border-r border-black/30 p-1 font-bold sm:p-2">
              {pi.shipping_label || "Shipping Cost"}
            </td>
            <td
              className="break-words border-r border-black/30 p-1 italic sm:p-2"
            >
              {pi.shipping_method || ""}
            </td>
            <td
              className="break-words border-r border-black/30 p-1 text-right sm:p-2"
            >
              1
            </td>
            <td
              className="break-words border-r border-black/30 p-1 text-right sm:p-2"
            >
              {fmtMoney(shipping, pi.currency)}
            </td>
            <td className="break-words p-1 text-right font-bold sm:p-2">
              {fmtMoney(shipping, pi.currency)}
            </td>
          </tr>
          {/* Grand total row */}
          <tr className="bg-[#fafafa]">
            <td
              colSpan={5}
              className="break-words border-r border-black p-1 text-right text-[10px] font-black uppercase sm:p-2 sm:text-[11px]"
            >
              Total ({currencyUpper})
            </td>
            <td className="break-words p-1 text-right text-[12px] font-black sm:p-2 sm:text-[14px]">
              {fmtMoney(pi.total_cents, pi.currency)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* === Contract terms (1-7) — matches reference === */}
      <div className="border-b border-black p-2 text-[10px] leading-relaxed sm:p-3">
        <p>
          <span className="font-bold">(1) Port of Loading:</span> Yiwu / Ningbo / Shanghai or any designated Chinese ports
        </p>
        <p>
          <span className="font-bold">(2) Port of Destination:</span> As Buyer address above
        </p>
        <p>
          <span className="font-bold">(3) Shipping Term:</span>{" "}
          {pi.shipping_method?.match(/\b(DDP|FOB|EXW|CIF|DAP|DDU|CFR|CPT|CIP|DPU)\b/i)?.[0]?.toUpperCase() ?? "DDP"}
        </p>
        <p>
          <span className="font-bold">(4) Terms of Payment:</span>{" "}
          {pi.payment_terms_text ||
            "The buyer should pay 50% of down payment after confirmation of the PI. 50% balance before shipping. The seller should arrange production after receiving the payment and approval of PP samples."}
        </p>

        {/* === Bank Info (embedded within section 4 — matches reference) === */}
        <div className="mt-3 border-t border-black pt-2">
          <p className="mb-1 text-[12px] font-black uppercase tracking-wide">
            Bank Info:
          </p>
          <p>
            <span className="font-bold">BENEFICIARY (COMPANY NAME):</span>{" "}
            <span style={{ color: BLUE }} className="font-bold">
              {bank.beneficiary}
            </span>
          </p>
          {/* Red reminder — KEEPS RED as the customer reminder */}
          <p className="mt-1 italic" style={{ color: RED }}>
            *The company name must be written in full. If it does not fit in the designated space, the full name shall be entered in the remarks column.
          </p>
          <p className="mt-1">
            <span className="font-bold">SUPPORT CURRENCY:</span>{" "}
            <span style={{ color: BLUE }} className="font-bold">
              {currencyUpper}
            </span>
          </p>
          <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5">
            {bank.iban && (
              <p>
                <span className="font-bold">IBAN:</span>{" "}
                <span style={{ color: BLUE }} className="font-bold">
                  {bank.iban}
                </span>
              </p>
            )}
            <p>
              <span className="font-bold">BANK NAME:</span>{" "}
              <span style={{ color: BLUE }} className="font-bold">
                {bank.bankName}
              </span>
            </p>
            <p>
              <span className="font-bold">BANK ACCOUNT:</span>{" "}
              <span style={{ color: BLUE }} className="font-bold">
                {bank.account}
              </span>
            </p>
            <p>
              <span className="font-bold">BANK SWIFT CODE:</span>{" "}
              <span style={{ color: BLUE }} className="font-bold">
                {bank.swift}
              </span>
            </p>
            <p className="col-span-2">
              <span className="font-bold">BANK ADDRESS:</span>{" "}
              <span style={{ color: BLUE }} className="font-bold">
                {bank.bankAddress}
              </span>
            </p>
            {bank.bankCountry && (
              <p>
                <span className="font-bold">BANK COUNTRY:</span>{" "}
                <span style={{ color: BLUE }} className="font-bold">
                  {bank.bankCountry}
                </span>
              </p>
            )}
          </div>
          {bank.notes && (
            <p className="mt-1 italic text-black/70">Note: {bank.notes}</p>
          )}
        </div>

        <p className="mt-3">
          <span className="font-bold">(5) Production Time:</span> Normally about 45 days after order payment received and approval of PP samples. Seller will not take any responsibility for any delivery delay caused by buyer.
        </p>
        <p className="mt-2">
          <span className="font-bold">(6) Tolerance:</span>
        </p>
        <p className="ml-3">Knitted Fabric GSM tolerance of +10gram and Size Measurement of +1.5 inch can be allowed and accepted.</p>
        <p className="ml-3">Quantity Tolerance: +5% can be accepted, seller should make up if the quantity less is more than 5%.</p>
        <p className="ml-3">2% - 3% of the defective products can be allowed and accepted.</p>
        <p className="mt-2">
          <span className="font-bold">(7) Additional Clause:</span>
        </p>
        <p className="ml-3">(a). Buyer confirm to have the commercial rights to reproduce the design. If for any reason the legal owner of the design contacts fulfillment house, they will be directed to the buyer and buyer should bear all the losses of the seller.</p>
        <p className="ml-3">(b). Any loss caused by buyer's change in connection with the agreed contract will be on buyer's account.</p>
        <p className="ml-3">(c). The Seller should inform buyer to arrange the balance ONE week before the goods ready for shipment. The buyers should arrange the balance payment within 5 business days after seller's notice, of any loss occurred hereof will be on Buyers' account. The buyer must not delay payment after seller's balance payment notice, seller will be authorized to dispose the goods if the balance payment is delayed by more than 30 days after seller's balance payment notice AND seller will not refund the received deposit. The seller only provide free warehousing for 30 days after production finished, 1% of total invoice value per week will be charged after 30 days. Until seller receives full payment for the order and the order is shipped, title to the goods remains with seller. Upon transfer of the goods to the carrier, title and risk of loss passes to the buyer. The buyer should handle products with care until the transfer of ownership is complete (for example, in case of a product return).</p>
        <p className="ml-3">(d). The contract effective date will be started since the seller receives the deposit from the buyer. The contract will be invalid if the payment is delayed by 5 working days after the contract date.</p>
        <p className="ml-3">(e). Force Majeure: In case of Force Majeure the Sellers shall not be responsible for delay in delivery or nondelivery of the goods but shall notify immediately the Buyers and deliver to the Buyers by registered mail a certificate issued by government authorities or Chamber of Commerce as evidence thereof.</p>
      </div>

      {/* === Two-originals sentence === */}
      <div className="border-b border-black px-4 py-2 text-center text-[10px] italic">
        This contract is made out in two original copies, one copy to be held by each party in witness thereof.
      </div>

      {/* === Seller / Buyer stamp + signatures === */}
      <div className="grid grid-cols-2 gap-3 p-2 text-[10px] sm:p-3">
        <div>
          <p className="font-bold uppercase">Seller Stamp/ Signature:</p>
          <p className="mt-6 text-[12px] font-black uppercase tracking-wide">
            YIWU HOMEDORM
            <br />
            COMMODITY MANUFACTURING CO.,LTD
          </p>
        </div>
        <div>
          <p className="font-bold uppercase">Buyer Stamp/ Signature:</p>
          <p className="mt-6 text-[12px] font-black uppercase tracking-wide">
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
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline gap-2 border-b border-black/20 px-3 py-1.5 last:border-b-0">
      <span className="w-[110px] text-[10px] font-bold uppercase tracking-wide">
        {label}
      </span>
      <span className="flex-1 font-bold">
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