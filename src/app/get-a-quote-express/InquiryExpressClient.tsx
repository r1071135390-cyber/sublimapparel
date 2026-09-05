"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StripeProvider } from "@/components/stripe/StripeProvider";
import { InquiryDepositForm } from "@/components/stripe/InquiryDepositForm";
import { Zap, Clock, Check } from "lucide-react";

const DEPOSIT_CENTS = 9900; // $99

export default function InquiryExpressClient() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "payment">("form");
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    productType: "Custom T-Shirts",
    estimatedQuantity: "",
    deadline: "",
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
    if (!formData.estimatedQuantity.trim()) {
      setError("Please enter an estimated quantity");
      return;
    }
    setStep("payment");
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    router.push(
      `/order/success/?scenario=inquiry_deposit&piid=${paymentIntentId}`
    );
  };

  if (step === "payment") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <button
            onClick={() => setStep("form")}
            className="text-sm font-bold uppercase tracking-wider text-[#ff4d00] hover:underline"
          >
            ← Back to form
          </button>
        </div>
        <h1 className="mb-2 text-3xl font-black uppercase tracking-tight text-[#0a0a0a]">
          Confirm your express deposit
        </h1>
        <p className="mb-6 text-sm text-[#6b6b6b]">
          Express service: <strong>$99.00 USD</strong> · Skip the queue, get a
          quote in 30 minutes.
        </p>

        <div className="mb-6 border-2 border-[#0a0a0a] bg-[#faf9f6] p-4 text-sm">
          <div className="mb-1 font-bold text-[#0a0a0a]">{formData.name}</div>
          <div className="text-[#6b6b6b]">{formData.email}</div>
          {formData.company && (
            <div className="text-[#6b6b6b]">{formData.company}</div>
          )}
          <div className="mt-2 border-t border-[#e5e5e5] pt-2 text-[#0a0a0a]">
            {formData.productType} · est. {formData.estimatedQuantity} pcs
            {formData.deadline && ` · deadline ${formData.deadline}`}
          </div>
        </div>

        <StripeProvider amountCents={DEPOSIT_CENTS} customerEmail={formData.email}>
          <InquiryDepositForm
            amountCents={DEPOSIT_CENTS}
            amountDisplay="$99.00"
            customerName={formData.name}
            customerEmail={formData.email}
            customerCompany={formData.company}
            productType={formData.productType}
            estimatedQuantity={formData.estimatedQuantity}
            designNotes={formData.designNotes}
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
          <Zap className="h-3.5 w-3.5" strokeWidth={3} />
          Express service
        </div>
        <h1 className="mb-3 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
          Skip the queue — quote in 30 min
        </h1>
        <p className="text-base text-white/80">
          Pay a $99 deposit to jump to the front of our inquiry queue. Fully
          refundable if we can&apos;t match your requirements.
        </p>
      </div>

      {/* What you get */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            icon: Clock,
            title: "30 min response",
            desc: "Quote in your inbox in 30 min, not 12 hours.",
          },
          {
            icon: Check,
            title: "Free mockup",
            desc: "Free digital mockup of your design on the actual garment.",
          },
          {
            icon: Zap,
            title: "Priority support",
            desc: "Dedicated rep for the lifetime of your order.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="border-2 border-[#0a0a0a] bg-white p-4"
          >
            <item.icon
              className="mb-2 h-6 w-6 text-[#ff4d00]"
              strokeWidth={2.5}
            />
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
              {item.title}
            </div>
            <div className="text-xs text-[#6b6b6b]">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Form */}
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
            <option>Custom T-Shirts</option>
            <option>Polo Shirts</option>
            <option>Hoodies / Sweatshirts</option>
            <option>Tank Tops</option>
            <option>Sports Jerseys</option>
            <option>Long-Sleeve Tees</option>
            <option>Other (specify in notes)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
              Estimated quantity *
            </label>
            <input
              type="text"
              name="estimatedQuantity"
              required
              placeholder="e.g. 500 pcs"
              value={formData.estimatedQuantity}
              onChange={handleFormChange}
              className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
              Deadline (optional)
            </label>
            <input
              type="text"
              name="deadline"
              placeholder="e.g. 2026-03-15"
              value={formData.deadline}
              onChange={handleFormChange}
              className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
            Design notes (printing method, fabric, special requirements)
          </label>
          <textarea
            name="designNotes"
            value={formData.designNotes}
            onChange={handleFormChange}
            rows={4}
            placeholder="e.g. Full-color sublimation on 100% polyester; all-over print front and back; need DDP shipping to Los Angeles"
            className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base focus:border-[#ff4d00] focus:outline-none"
          />
        </div>

        {error && (
          <div className="border-2 border-[#dc2626] bg-red-50 p-3 text-sm text-[#dc2626]">
            {error}
          </div>
        )}

        <div className="border-t-2 border-[#0a0a0a] pt-6">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
              Express deposit
            </span>
            <span className="text-2xl font-black text-[#0a0a0a]">$99.00</span>
          </div>
          <p className="mb-4 text-xs text-[#6b6b6b]">
            Credited toward your final order. Refundable if we can&apos;t
            match your requirements within 7 days.
          </p>
          <button
            type="submit"
            className="w-full bg-[#ff4d00] px-6 py-4 text-base font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#cc3d00]"
          >
            Continue to payment →
          </button>
          <p className="mt-3 text-center text-xs text-[#6b6b6b]">
            Or{" "}
            <Link
              href="/get-a-quote/"
              className="font-bold text-[#0a0a0a] underline hover:text-[#ff4d00]"
            >
              use the standard (free) inquiry form
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
