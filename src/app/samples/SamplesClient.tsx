"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StripeProvider } from "@/components/stripe/StripeProvider";
import { SamplePaymentForm } from "@/components/stripe/SamplePaymentForm";

const PRODUCT_TYPES = [
  { value: "t-shirt", label: "T-Shirt", price: "$50 / sample" },
  { value: "polo", label: "Polo Shirt", price: "$55 / sample" },
  { value: "hoodie", label: "Hoodie / Sweatshirt", price: "$70 / sample" },
  { value: "tank-top", label: "Tank Top", price: "$45 / sample" },
  { value: "jersey", label: "Sports Jersey", price: "$65 / sample" },
  { value: "long-sleeve", label: "Long-Sleeve Tee", price: "$55 / sample" },
];

const SAMPLE_FEE_CENTS = 5000; // $50 base sample fee

export default function SamplesClient() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "payment">("form");
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    productType: "t-shirt",
    quantity: 1,
    shippingAddress: "",
    designNotes: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
    setStep("payment");
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    router.push(
      `/order/success/?scenario=sample_fee&piid=${paymentIntentId}`
    );
  };

  if (step === "payment") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <Link
            href="/samples/"
            onClick={(e) => {
              e.preventDefault();
              setStep("form");
            }}
            className="text-sm font-bold uppercase tracking-wider text-[#ff4d00] hover:underline"
          >
            ← Back to form
          </Link>
        </div>
        <h1 className="mb-2 text-3xl font-black uppercase tracking-tight text-[#0a0a0a]">
          Pay sample fee
        </h1>
        <p className="mb-6 text-sm text-[#6b6b6b]">
          Sample fee: <strong>$50.00 USD</strong> · Product:{" "}
          <strong>
            {PRODUCT_TYPES.find((p) => p.value === formData.productType)?.label}
          </strong>{" "}
          · Ship to: <strong>{formData.shippingAddress || "TBD"}</strong>
        </p>

        <StripeProvider amountCents={SAMPLE_FEE_CENTS} customerEmail={formData.email}>
          <SamplePaymentForm
            amountCents={SAMPLE_FEE_CENTS}
            amountDisplay="$50.00"
            customerName={formData.name}
            customerEmail={formData.email}
            customerCompany={formData.company}
            shippingAddress={formData.shippingAddress}
            productType={formData.productType}
            designNotes={formData.designNotes}
            onSuccess={handlePaymentSuccess}
          />
        </StripeProvider>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-black uppercase tracking-tight text-[#0a0a0a]">
        Order a custom sample
      </h1>
      <p className="mb-8 text-base text-[#6b6b6b]">
        See and feel the quality before committing to a bulk order. Sample fee
        starts at $50 (non-refundable) plus shipping.
      </p>

      <form onSubmit={handleFormSubmit} className="space-y-6">
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
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

        <div>
          <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
            Product type *
          </label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleFormChange}
            className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
          >
            {PRODUCT_TYPES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} — {p.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
            Ship-to address (full address for shipping quote)
          </label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleFormChange}
            rows={3}
            placeholder="Street, city, state/province, ZIP, country"
            className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
            Design notes (colors, sizes, deadline, etc.)
          </label>
          <textarea
            name="designNotes"
            value={formData.designNotes}
            onChange={handleFormChange}
            rows={4}
            placeholder="e.g. Adult L x1, Adult XL x1; full-color front print; need by 2026-02-15"
            className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
          />
        </div>

        {error && (
          <div className="border-2 border-[#dc2626] bg-red-50 p-3 text-sm text-[#dc2626]">
            {error}
          </div>
        )}

        <div className="border-t-2 border-[#0a0a0a] pt-6">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
              Sample fee
            </span>
            <span className="text-2xl font-black text-[#0a0a0a]">$50.00</span>
          </div>
          <p className="mb-4 text-xs text-[#6b6b6b]">
            Shipping fee will be quoted separately after you submit. We'll email
            you a tracking number once the sample ships.
          </p>
          <button
            type="submit"
            className="w-full bg-[#ff4d00] px-6 py-4 text-base font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#cc3d00]"
          >
            Continue to payment →
          </button>
        </div>
      </form>
    </div>
  );
}
