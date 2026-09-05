"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Loader2, AlertCircle, Check } from "lucide-react";
import { SHOP_PRODUCTS, ShopProduct } from "@/lib/shop-data";
import { formatUsd } from "@/lib/stripe-client";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { JsonLd } from "@/components/json-ld";

// Top-level page metadata can't be exported from a "use client" file,
// so this page is rendered through a thin server component wrapper
// in `./page.tsx`. See that file for the metadata + breadcrumb.

type CartLine = { sku: string; quantity: number };

export default function ShopClient() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [email, setEmail] = useState("");
  const [name, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartTotal = cart.reduce((sum, line) => {
    const p = SHOP_PRODUCTS.find((x) => x.sku === line.sku);
    return sum + (p ? p.amount_cents * line.quantity : 0);
  }, 0);

  function setQuantity(sku: string, quantity: number) {
    setCart((prev) => {
      const existing = prev.find((l) => l.sku === sku);
      if (quantity <= 0) {
        return prev.filter((l) => l.sku !== sku);
      }
      if (existing) {
        return prev.map((l) => (l.sku === sku ? { ...l, quantity } : l));
      }
      return [...prev, { sku, quantity }];
    });
  }

  async function handleCheckout() {
    setError(null);

    if (cart.length === 0) {
      setError("Add at least one item to your cart.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const items = cart
        .map((line) => {
          const product = SHOP_PRODUCTS.find((p) => p.sku === line.sku);
          if (!product) return null;
          return {
            name: product.name,
            description: product.description.slice(0, 200),
            amount_cents: product.amount_cents,
            quantity: line.quantity,
          };
        })
        .filter(Boolean) as Array<{
        name: string;
        description: string;
        amount_cents: number;
        quantity: number;
      }>;

      const res = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer_email: email,
          customer_name: name || undefined,
        }),
      });

      const data = (await res.json()) as { ok: boolean; url?: string; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || `Checkout failed (${res.status})`);
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url!;
    } catch (err: any) {
      console.error("[shop] checkout error:", err);
      setError(err?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ])}
      />
      <main>
        {/* HERO */}
        <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
            <div className="mb-4 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              Shop
            </div>
            <h1 className="mb-4 text-balance text-4xl font-black leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              Small batch,
              <br />
              <span className="text-[#cc3d00]">ready to ship.</span>
            </h1>
            <p className="max-w-2xl text-base text-white/85 md:text-lg">
              Stock sublimated apparel and sample packs for{" "}
              <strong>fast evaluation</strong>. Skip the 14-day custom production
              cycle — buy off-the-shelf designs and sample swatches to validate
              quality, fit, and print fidelity before committing to a bulk order.
            </p>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="border-b-2 border-black bg-[#faf9f6]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Catalog
            </div>
            <h2 className="mb-12 text-3xl font-black leading-tight tracking-tight md:text-5xl">
              Pick what you need.
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {SHOP_PRODUCTS.map((product) => (
                <ProductCard
                  key={product.sku}
                  product={product}
                  quantity={cart.find((c) => c.sku === product.sku)?.quantity ?? 0}
                  onQuantityChange={(q) => setQuantity(product.sku, q)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CHECKOUT FORM */}
        <section className="border-b-2 border-black bg-white">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
              Checkout
            </div>
            <h2 className="mb-3 text-3xl font-black leading-tight tracking-tight md:text-5xl">
              Your cart
            </h2>
            <p className="mb-8 text-base text-black/70">
              Secure payment via Stripe. We accept all major credit cards.
            </p>

            {/* Cart summary */}
            <div className="mb-8 border-2 border-black bg-[#faf9f6] p-6">
              {cart.length === 0 ? (
                <p className="text-sm text-black/70">
                  Your cart is empty. Add a product above to get started.
                </p>
              ) : (
                <ul className="space-y-3">
                  {cart.map((line) => {
                    const product = SHOP_PRODUCTS.find((p) => p.sku === line.sku);
                    if (!product) return null;
                    return (
                      <li
                        key={line.sku}
                        className="flex items-center justify-between border-b border-black/10 pb-3 last:border-0"
                      >
                        <div>
                          <div className="text-sm font-black">{product.name}</div>
                          <div className="text-xs text-black/60">
                            {formatUsd(product.amount_cents)} × {line.quantity}
                          </div>
                        </div>
                        <div className="text-sm font-black">
                          {formatUsd(product.amount_cents * line.quantity)}
                        </div>
                      </li>
                    );
                  })}
                  <li className="flex items-center justify-between border-t-2 border-black pt-3">
                    <div className="text-base font-black uppercase tracking-widest">
                      Total
                    </div>
                    <div className="text-2xl font-black text-[#ff4d00]">
                      {formatUsd(cartTotal)}
                    </div>
                  </li>
                </ul>
              )}
            </div>

            {/* Email + name */}
            <div className="mb-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black/70">
                  Email <span className="text-[#ff4d00]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full border-2 border-black bg-white px-4 py-3 text-base text-black outline-none focus:border-[#ff4d00]"
                />
                <p className="mt-1 text-xs text-black/70">
                  Receipt + tracking info will be sent here.
                </p>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black/70">
                  Company / Name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Apparel Co."
                  className="w-full border-2 border-black bg-white px-4 py-3 text-base text-black outline-none focus:border-[#ff4d00]"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 flex items-start gap-2 border-2 border-[#ff4d00] bg-[#ff4d00]/10 p-4 text-sm text-[#ff4d00]">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={submitting || cart.length === 0}
              className="flex w-full items-center justify-center gap-2 bg-[#ff4d00] px-6 py-4 text-base font-black uppercase tracking-widest text-black transition-colors hover:bg-[#cc3d00] disabled:cursor-not-allowed disabled:bg-black/30"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Redirecting to Stripe...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length === 0
                    ? "Add items to checkout"
                    : `Checkout — ${formatUsd(cartTotal)}`}
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-black/70">
              You will be redirected to Stripe's secure checkout page to enter
              your card details. We never see or store your card number.
            </p>
          </div>
        </section>

        {/* FOOTNOTE — link back to custom bulk */}
        <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
          <div className="mx-auto max-w-4xl px-6 py-12 text-center">
            <h3 className="mb-2 text-2xl font-black leading-tight md:text-3xl">
              Need a custom design or 100+ pieces?
            </h3>
            <p className="mb-6 text-sm text-white/70 md:text-base">
              These are off-the-shelf. For custom sublimated apparel, get a
              quote and we'll match a factory slot in 24 hours.
            </p>
            <Link
              href="/get-a-quote/"
              className="inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            >
              Get a custom quote
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function ProductCard({
  product,
  quantity,
  onQuantityChange,
}: {
  product: ShopProduct;
  quantity: number;
  onQuantityChange: (q: number) => void;
}) {
  return (
    <div className="flex flex-col border-2 border-black bg-white">
      {/* Image placeholder */}
      <div className="relative aspect-square w-full border-b-2 border-black bg-gradient-to-br from-[#faf9f6] to-[#e5e5e5]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-black text-black/20">
            {product.name
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </div>
        )}
        {product.badge && (
          <div className="absolute right-2 top-2 bg-[#ff4d00] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-black">
            {product.badge}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-black leading-tight">{product.name}</h3>
        <p className="mb-4 flex-1 text-sm text-black/70">{product.description}</p>
        <div className="mb-4 text-2xl font-black text-[#ff4d00]">
          {formatUsd(product.amount_cents)}
          {product.min_quantity > 1 && (
            <span className="ml-1 text-xs font-bold text-black/70">
              / pc
            </span>
          )}
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
            disabled={quantity === 0}
            className="h-10 w-10 border-2 border-black bg-white text-lg font-black text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            −
          </button>
          <div className="flex h-10 flex-1 items-center justify-center border-2 border-black bg-[#faf9f6] text-base font-black">
            {quantity}
          </div>
          <button
            type="button"
            onClick={() =>
              onQuantityChange(quantity === 0 ? product.min_quantity : quantity + 1)
            }
            className="h-10 w-10 border-2 border-black bg-[#ff4d00] text-lg font-black text-black transition-colors hover:bg-[#cc3d00]"
          >
            +
          </button>
        </div>
        {quantity > 0 && (
          <div className="mt-2 flex items-center justify-center gap-1 text-xs text-[#ff4d00]">
            <Check className="h-3 w-3" strokeWidth={3} />
            Added to cart
          </div>
        )}
      </div>
    </div>
  );
}
