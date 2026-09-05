"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { StripeProvider } from "@/components/stripe/StripeProvider";
import { BulkDepositForm } from "@/components/stripe/BulkDepositForm";
import { CheckCircle2, Factory, Truck, Shield } from "lucide-react";

const DEPOSIT_PERCENT = 30;

export default function BulkDepositClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"form" | "payment">("form");
  const [error, setError] = useState<string | null>(null);

  // Allow pre-fill via URL: /bulk-deposit/?quote_id=Q-12345&total=5000
  const initialQuoteId = searchParams.get("quote_id") || "";
  const initialTotal = searchParams.get("total") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    quoteId: initialQuoteId,
    totalAmount: initialTotal, // in dollars, e.g. "5000"
  });

  // Auto-advance to payment step if URL has all required params
  useEffect(() => {
    const urlName = searchParams.get("name");
    const urlEmail = searchParams.get("email");
    if (urlName && urlEmail && initialQuoteId && initialTotal) {
      setFormData((prev) => ({
        ...prev,
        name: urlName,
        email: urlEmail,
      }));
    }
  }, [searchParams, initialQuoteId, initialTotal]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Calculate deposit in cents
  const totalCents = useMemo(() => {
    const num = parseFloat(formData.totalAmount);
    if (isNaN(num) || num <= 0) return 0;
    return Math.round(num * 100);
  }, [formData.totalAmount]);

  const depositCents = useMemo(() => {
    return Math.round(totalCents * (DEPOSIT_PERCENT / 100));
  }, [totalCents]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!formData.quoteId.trim()) {
      setError("Quote ID is required");
      return;
    }
    if (totalCents <= 0) {
      setError("Please enter a valid total amount");
      return;
    }
    setStep("payment");
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    router.push(
      `/order/success/?scenario=bulk_deposit&piid=${paymentIntentId}&quote_id=${encodeURIComponent(formData.quoteId)}`
    );
  };

  const formatMoney = (cents: number) => {
    return `$${(cents / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (step === "payment") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <button
            onClick={() => setStep("form")}
            className="text-sm font-bold uppercase tracking-wider text-[#ff4d00] hover:underline"
          >
            ← Back to details
          </button>
        </div>
        <h1 className="mb-2 text-3xl font-black uppercase tracking-tight text-[#0a0a0a]">
          Pay 30% deposit
        </h1>
        <p className="mb-6 text-sm text-[#6b6b6b]">
          Production will start within 24 hours of payment confirmation.
        </p>

        <div className="mb-6 border-2 border-[#0a0a0a] bg-[#faf9f6] p-4">
          <div className="mb-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                Quote
              </div>
              <div className="font-bold text-[#0a0a0a]">{formData.quoteId}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                Total
              </div>
              <div className="font-bold text-[#0a0a0a]">
                {formatMoney(totalCents)}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                Customer
              </div>
              <div className="font-bold text-[#0a0a0a]">{formData.name}</div>
              <div className="text-[#6b6b6b]">{formData.email}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6b6b6b]">
                Deposit due now
              </div>
              <div className="text-2xl font-black text-[#ff4d00]">
                {formatMoney(depositCents)}
              </div>
              <div className="text-xs text-[#6b6b6b]">
                ({DEPOSIT_PERCENT}% of total)
              </div>
            </div>
          </div>
        </div>

        <StripeProvider amountCents={depositCents} customerEmail={formData.email}>
          <BulkDepositForm
            amountCents={depositCents}
            amountDisplay={formatMoney(depositCents)}
            customerName={formData.name}
            customerEmail={formData.email}
            customerCompany={formData.company}
            quoteId={formData.quoteId}
            totalAmountCents={totalCents}
            onSuccess={handlePaymentSuccess}
          />
        </StripeProvider>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Hero */}
      <div className="mb-10 border-2 border-[#0a0a0a] bg-[#0a0a0a] p-6 text-white shadow-[6px_6px_0_0_#ff4d00] sm:p-8">
        <div className="mb-3 inline-flex items-center gap-2 border border-[#ff4d00] bg-[#ff4d00] px-3 py-1 text-xs font-bold uppercase tracking-wider">
          <Factory className="h-3.5 w-3.5" strokeWidth={3} />
          Bulk order deposit
        </div>
        <h1 className="mb-3 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
          Pay 30% deposit to start production
        </h1>
        <p className="text-base text-white/80">
          Production starts within 24 hours of payment. The remaining 70% is
          due before shipment.
        </p>
      </div>

      {/* How it works */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            step: 1,
            icon: Shield,
            title: "Pay 30% now",
            desc: "Refundable if we can't match the quote.",
          },
          {
            step: 2,
            icon: Factory,
            title: "Production",
            desc: "7-15 days, with progress photos.",
          },
          {
            step: 3,
            icon: Truck,
            title: "Pay 70% & ship",
            desc: "After QC photos. DDP to your door.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="border-2 border-[#0a0a0a] bg-white p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center bg-[#ff4d00] text-xs font-black text-black">
                {item.step}
              </span>
              <item.icon
                className="h-5 w-5 text-[#0a0a0a]"
                strokeWidth={2.5}
              />
            </div>
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
              {item.title}
            </div>
            <div className="text-xs text-[#6b6b6b]">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-black uppercase tracking-tight text-[#0a0a0a]">
            Quote details
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
                Quote ID *
              </label>
              <input
                type="text"
                name="quoteId"
                required
                placeholder="e.g. Q-2026-0142"
                value={formData.quoteId}
                onChange={handleFormChange}
                className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
                Total quote amount (USD) *
              </label>
              <input
                type="number"
                name="totalAmount"
                required
                min="1"
                step="0.01"
                placeholder="e.g. 5000"
                value={formData.totalAmount}
                onChange={handleFormChange}
                className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
              />
            </div>
          </div>
          {totalCents > 0 && (
            <div className="mt-3 border-2 border-[#0a0a0a] bg-[#faf9f6] p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#6b6b6b]">Total:</span>
                <span className="font-bold text-[#0a0a0a]">
                  {formatMoney(totalCents)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b6b6b]">30% deposit:</span>
                <span className="text-lg font-black text-[#ff4d00]">
                  {formatMoney(depositCents)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b6b6b]">70% on delivery:</span>
                <span className="font-bold text-[#0a0a0a]">
                  {formatMoney(totalCents - depositCents)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xl font-black uppercase tracking-tight text-[#0a0a0a]">
            Your contact info
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
                Full name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleFormChange}
                className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleFormChange}
                className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleFormChange}
                className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
                Phone (optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="border-2 border-[#dc2626] bg-red-50 p-3 text-sm text-[#dc2626]">
            {error}
          </div>
        )}

        <div className="border-t-2 border-[#0a0a0a] pt-6">
          <button
            type="submit"
            disabled={totalCents <= 0}
            className="w-full bg-[#ff4d00] px-6 py-4 text-base font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#cc3d00] disabled:opacity-50"
          >
            {totalCents > 0
              ? `Continue to pay ${formatMoney(depositCents)} deposit →`
              : "Continue to payment →"}
          </button>
          <p className="mt-3 text-center text-xs text-[#6b6b6b]">
            Don&apos;t have a quote yet?{" "}
            <Link
              href="/get-a-quote/"
              className="font-bold text-[#0a0a0a] underline hover:text-[#ff4d00]"
            >
              Request a free quote
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
