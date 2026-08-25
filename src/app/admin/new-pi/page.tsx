"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Trash2, Plus, Copy, ExternalLink, Check } from "lucide-react";

type LineItem = {
  description: string;
  fabric: string;
  qty: number;
  unitPriceCents: number;
};

function todayPiNumber() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `SA${yyyy}${mm}${dd}`;
}

export default function NewPIPage() {
  const [piNumber, setPiNumber] = useState(todayPiNumber());
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const [items, setItems] = useState<LineItem[]>([
    { description: "", fabric: "", qty: 1, unitPriceCents: 0 },
  ]);

  const [shippingCents, setShippingCents] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState("100% upfront");
  const [paymentPercentage, setPaymentPercentage] = useState(100);
  const [leadTimeDays, setLeadTimeDays] = useState(30);
  const [validUntilDays, setValidUntilDays] = useState(7);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    piNumber: string;
    shareUrl: string;
    clientSecret: string;
    amountDueCents: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const subtotalCents = useMemo(
    () => items.reduce((sum, it) => sum + it.qty * it.unitPriceCents, 0),
    [items],
  );
  const totalCents = subtotalCents + shippingCents;
  const amountDueCents = Math.round((totalCents * paymentPercentage) / 100);

  const fmt = (cents: number) =>
    `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  function addItem() {
    setItems([...items, { description: "", fabric: "", qty: 1, unitPriceCents: 0 }]);
  }
  function removeItem(i: number) {
    setItems(items.filter((_, idx) => idx !== i));
  }
  function updateItem(i: number, field: keyof LineItem, value: string | number) {
    const copy = [...items];
    const item = { ...copy[i] };
    if (field === "qty" || field === "unitPriceCents") {
      item[field] = Number(value) || 0;
    } else {
      item[field] = String(value);
    }
    copy[i] = item;
    setItems(copy);
  }

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);
    try {
      const validItems = items.filter(
        (it) => it.description.trim() && it.qty > 0 && it.unitPriceCents > 0,
      );
      if (validItems.length === 0) {
        throw new Error("At least one line item with description, qty, and price is required");
      }
      if (!customerName.trim()) throw new Error("Customer name is required");

      const res = await fetch("/api/pi/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          piNumber: piNumber.trim(),
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim() || null,
          customerPhone: customerPhone.trim() || null,
          customerCompany: customerCompany.trim() || null,
          customerAddress: customerAddress.trim() || null,
          items: validItems,
          shippingCents,
          currency: "usd",
          paymentTerms,
          paymentPercentage,
          leadTimeDays,
          validUntilDays,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || `Server error: ${res.status}`);
      }
      setResult({
        piNumber: data.pi.pi_number,
        shareUrl: data.shareUrl,
        clientSecret: data.clientSecret,
        amountDueCents: data.amountDueCents,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  async function copyLink() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  // Success state
  if (result) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="border-2 border-black bg-white p-8 shadow-[8px_8px_0_0_rgba(10,10,10,1)]">
          <div className="mb-6 flex items-center gap-3 border-b-2 border-black pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4d00] text-white">
              <Check className="h-7 w-7" strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase">PI Created</h1>
              <p className="text-sm text-[#6b6b6b]">{result.piNumber}</p>
            </div>
          </div>

          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#6b6b6b]">Customer owes</span>
              <span className="text-2xl font-black text-[#ff4d00]">
                {fmt(result.amountDueCents)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6b6b6b]">Total PI value</span>
              <span className="font-bold">{fmt(totalCents)}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-[#6b6b6b]">
              Share this link with your customer
            </label>
            <div className="flex items-stretch gap-2">
              <input
                type="text"
                readOnly
                value={result.shareUrl}
                className="flex-1 border-2 border-black bg-[#faf9f6] px-3 py-2 text-sm font-mono"
              />
              <button
                type="button"
                onClick={copyLink}
                className="flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-sm font-black uppercase text-white transition-colors hover:bg-[#ff4d00]"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-xs text-[#6b6b6b]">
              Customer opens this link → sees the full PI → can pay by card or T/T.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={result.shareUrl}
              target="_blank"
              className="flex flex-1 items-center justify-center gap-2 border-2 border-black bg-[#ff4d00] px-5 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_rgba(10,10,10,1)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0_0_rgba(10,10,10,1)]"
            >
              <ExternalLink className="h-4 w-4" />
              Preview as customer
            </Link>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setPiNumber(todayPiNumber());
                setCustomerName("");
                setCustomerEmail("");
                setCustomerPhone("");
                setCustomerCompany("");
                setCustomerAddress("");
                setItems([{ description: "", fabric: "", qty: 1, unitPriceCents: 0 }]);
                setShippingCents(0);
              }}
              className="flex-1 border-2 border-black bg-white px-5 py-3 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-[#0a0a0a] hover:text-white"
            >
              Create another PI
            </button>
          </div>

          <p className="mt-6 border-t-2 border-dashed border-[#e5e5e5] pt-4 text-xs text-[#6b6b6b]">
            💡 Email this link or send via WeChat. Customer opens it and pays. You get a Supabase
            notification when paid.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-black uppercase tracking-tight text-[#0a0a0a] md:text-4xl">
          New Proforma Invoice
        </h1>
        <p className="text-sm text-[#6b6b6b]">
          Create a PI for your customer. We&apos;ll generate a shareable payment link that lets them
          pay by card or T/T.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-8"
      >
        {/* PI Number */}
        <section>
          <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
            PI Number
          </h2>
          <input
            type="text"
            value={piNumber}
            onChange={(e) => setPiNumber(e.target.value.toUpperCase())}
            placeholder="SA20260825001"
            className="w-full border-2 border-black bg-white px-4 py-2 font-mono text-base focus:bg-[#faf9f6] focus:outline-none"
            required
          />
          <p className="mt-1 text-xs text-[#6b6b6b]">
            Auto-suggested: today&apos;s date. Override if needed.
          </p>
        </section>

        {/* Customer Info */}
        <section>
          <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
            Customer
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Name *"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border-2 border-black bg-white px-4 py-2 focus:bg-[#faf9f6] focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="border-2 border-black bg-white px-4 py-2 focus:bg-[#faf9f6] focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="border-2 border-black bg-white px-4 py-2 focus:bg-[#faf9f6] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Company"
              value={customerCompany}
              onChange={(e) => setCustomerCompany(e.target.value)}
              className="border-2 border-black bg-white px-4 py-2 focus:bg-[#faf9f6] focus:outline-none"
            />
            <textarea
              placeholder="Address (optional)"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              rows={2}
              className="border-2 border-black bg-white px-4 py-2 sm:col-span-2 focus:bg-[#faf9f6] focus:outline-none"
            />
          </div>
        </section>

        {/* Items */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Line Items
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1 border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase transition-colors hover:bg-black hover:text-white"
            >
              <Plus className="h-3 w-3" /> Add
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="grid gap-2 border-2 border-[#e5e5e5] bg-[#faf9f6] p-3 sm:grid-cols-12"
              >
                <input
                  type="text"
                  placeholder="Description (e.g., men tank tops + drawstring shorts)"
                  value={item.description}
                  onChange={(e) => updateItem(i, "description", e.target.value)}
                  className="border-2 border-black bg-white px-3 py-1.5 text-sm sm:col-span-5 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Fabric"
                  value={item.fabric}
                  onChange={(e) => updateItem(i, "fabric", e.target.value)}
                  className="border-2 border-black bg-white px-3 py-1.5 text-sm sm:col-span-3 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  min="1"
                  value={item.qty || ""}
                  onChange={(e) => updateItem(i, "qty", e.target.value)}
                  className="border-2 border-black bg-white px-3 py-1.5 text-sm sm:col-span-1 focus:outline-none"
                />
                <div className="relative sm:col-span-2">
                  <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-sm text-[#6b6b6b]">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Unit"
                    min="0"
                    value={(item.unitPriceCents / 100).toString() || ""}
                    onChange={(e) =>
                      updateItem(i, "unitPriceCents", Math.round(Number(e.target.value) * 100))
                    }
                    className="w-full border-2 border-black bg-white px-3 py-1.5 pl-5 text-sm focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  disabled={items.length === 1}
                  className="flex items-center justify-center border-2 border-black bg-white px-2 py-1.5 text-sm transition-colors hover:bg-[#ff4d00] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:col-span-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping */}
        <section>
          <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
            Shipping (USD)
          </h2>
          <div className="relative max-w-xs">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6b6b6b]">
              $
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={(shippingCents / 100).toString() || ""}
              onChange={(e) => setShippingCents(Math.round(Number(e.target.value) * 100))}
              placeholder="0.00"
              className="w-full border-2 border-black bg-white px-3 py-2 pl-6 focus:bg-[#faf9f6] focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-[#6b6b6b]">e.g., $118.00 for DDP by AIR</p>
        </section>

        {/* Payment Terms */}
        <section>
          <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
            Payment Terms
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              placeholder="e.g., 100% upfront, 30% deposit, 70% before shipping"
              className="border-2 border-black bg-white px-4 py-2 focus:bg-[#faf9f6] focus:outline-none"
            />
            <div>
              <label className="mb-1 block text-xs text-[#6b6b6b]">
                What % is this link collecting?
              </label>
              <select
                value={paymentPercentage}
                onChange={(e) => setPaymentPercentage(Number(e.target.value))}
                className="w-full border-2 border-black bg-white px-4 py-2 focus:bg-[#faf9f6] focus:outline-none"
              >
                <option value="100">100% (full payment)</option>
                <option value="50">50% (deposit)</option>
                <option value="30">30% (deposit)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Lead time / validity */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Lead Time (days)
            </h2>
            <input
              type="number"
              min="1"
              value={leadTimeDays}
              onChange={(e) => setLeadTimeDays(Number(e.target.value) || 30)}
              className="w-full border-2 border-black bg-white px-4 py-2 focus:bg-[#faf9f6] focus:outline-none"
            />
          </div>
          <div>
            <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Valid For (days)
            </h2>
            <input
              type="number"
              min="1"
              value={validUntilDays}
              onChange={(e) => setValidUntilDays(Number(e.target.value) || 7)}
              className="w-full border-2 border-black bg-white px-4 py-2 focus:bg-[#faf9f6] focus:outline-none"
            />
          </div>
        </section>

        {/* Summary */}
        <section className="border-t-2 border-dashed border-[#e5e5e5] pt-6">
          <div className="mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6b6b6b]">Subtotal</span>
              <span className="font-bold">{fmt(subtotalCents)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b6b6b]">Shipping</span>
              <span className="font-bold">{fmt(shippingCents)}</span>
            </div>
            <div className="flex justify-between border-t-2 border-black pt-2 text-lg">
              <span className="font-black uppercase">Total</span>
              <span className="font-black">{fmt(totalCents)}</span>
            </div>
            <div className="flex justify-between bg-[#ff4d00]/10 px-3 py-2">
              <span className="text-sm font-black uppercase">Customer pays via this link</span>
              <span className="text-2xl font-black text-[#ff4d00]">
                {fmt(amountDueCents)}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 border-2 border-[#ff4d00] bg-[#ff4d00]/10 px-4 py-2 text-sm text-[#cc3d00]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full border-2 border-black bg-[#ff4d00] px-6 py-4 text-base font-black uppercase tracking-wider text-white shadow-[6px_6px_0_0_rgba(10,10,10,1)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-[#cc3d00] hover:shadow-[8px_8px_0_0_rgba(10,10,10,1)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Creating PI..." : `Create PI & Generate Payment Link →`}
          </button>
        </section>
      </form>
    </main>
  );
}
