"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail, Clock, Factory, Truck } from "lucide-react";

type Scenario = "shop_order" | "sample_fee" | "inquiry_deposit" | "bulk_deposit";

const SCENARIO_INFO: Record<
  Scenario,
  {
    title: string;
    icon: React.ReactNode;
    headline: string;
    nextSteps: { icon: React.ReactNode; title: string; desc: string }[];
    ctaPrimary: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
  }
> = {
  shop_order: {
    title: "Order confirmed",
    icon: <CheckCircle2 className="h-12 w-12 text-[#ff4d00]" strokeWidth={2.5} />,
    headline: "Thanks for your order!",
    nextSteps: [
      {
        icon: <Mail className="h-5 w-5 text-[#ff4d00]" />,
        title: "Confirmation email",
        desc: "We've sent a receipt and order details to your email.",
      },
      {
        icon: <Clock className="h-5 w-5 text-[#ff4d00]" />,
        title: "Processing",
        desc: "Production starts within 24 hours. Tracking info will be emailed when shipped.",
      },
    ],
    ctaPrimary: { label: "Back to home", href: "/" },
    ctaSecondary: { label: "Continue shopping", href: "/shop/" },
  },
  sample_fee: {
    title: "Sample fee paid",
    icon: <CheckCircle2 className="h-12 w-12 text-[#ff4d00]" strokeWidth={2.5} />,
    headline: "Your sample is in production!",
    nextSteps: [
      {
        icon: <Mail className="h-5 w-5 text-[#ff4d00]" />,
        title: "Shipping quote",
        desc: "Our team will email you a shipping quote within 1 business day.",
      },
      {
        icon: <Factory className="h-5 w-5 text-[#ff4d00]" />,
        title: "Sample production",
        desc: "We'll produce and ship your sample in 5-7 business days.",
      },
    ],
    ctaPrimary: { label: "Back to home", href: "/" },
    ctaSecondary: { label: "Order another sample", href: "/samples/" },
  },
  inquiry_deposit: {
    title: "Express service activated",
    icon: <CheckCircle2 className="h-12 w-12 text-[#ff4d00]" strokeWidth={2.5} />,
    headline: "You're at the front of the queue!",
    nextSteps: [
      {
        icon: <Clock className="h-5 w-5 text-[#ff4d00]" />,
        title: "Quote in 30 minutes",
        desc: "Our team is reviewing your inquiry now. Expect a quote in your inbox shortly.",
      },
      {
        icon: <Mail className="h-5 w-5 text-[#ff4d00]" />,
        title: "Priority support",
        desc: "Your dedicated rep will reach out via email within the hour.",
      },
    ],
    ctaPrimary: { label: "Back to home", href: "/" },
    ctaSecondary: { label: "View our products", href: "/products/" },
  },
  bulk_deposit: {
    title: "Deposit received",
    icon: <CheckCircle2 className="h-12 w-12 text-[#ff4d00]" strokeWidth={2.5} />,
    headline: "Production starts within 24 hours!",
    nextSteps: [
      {
        icon: <Factory className="h-5 w-5 text-[#ff4d00]" />,
        title: "Production",
        desc: "Your order is now in our production queue. We'll send progress photos as we go.",
      },
      {
        icon: <Truck className="h-5 w-5 text-[#ff4d00]" />,
        title: "Final payment",
        desc: "70% balance is due before shipment. We'll email you QC photos and the final invoice.",
      },
    ],
    ctaPrimary: { label: "Back to home", href: "/" },
  },
};

export default function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [scenario, setScenario] = useState<Scenario>("shop_order");

  useEffect(() => {
    const s = searchParams.get("scenario") as Scenario | null;
    if (s && s in SCENARIO_INFO) {
      setScenario(s);
    } else if (s === null) {
      // No scenario - redirect to home
      router.replace("/");
    }
  }, [searchParams, router]);

  const info = SCENARIO_INFO[scenario];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="border-2 border-[#0a0a0a] bg-white p-6 shadow-[6px_6px_0_0_#ff4d00] sm:p-10">
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex">{info.icon}</div>
          <div className="mb-2 inline-block border border-[#0a0a0a] bg-[#faf9f6] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0a0a0a]">
            {info.title}
          </div>
          <h1 className="mt-3 text-3xl font-black uppercase leading-tight tracking-tight text-[#0a0a0a] sm:text-4xl">
            {info.headline}
          </h1>
        </div>

        <div className="mb-8 space-y-4">
          {info.nextSteps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border-l-4 border-[#ff4d00] bg-[#faf9f6] p-4"
            >
              <div className="mt-0.5">{step.icon}</div>
              <div>
                <div className="text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">
                  {step.title}
                </div>
                <div className="text-sm text-[#6b6b6b]">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={info.ctaPrimary.href}
            className="flex-1 bg-[#ff4d00] px-6 py-3 text-center text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#cc3d00]"
          >
            {info.ctaPrimary.label}
          </Link>
          {info.ctaSecondary && (
            <Link
              href={info.ctaSecondary.href}
              className="flex-1 border-2 border-[#0a0a0a] bg-white px-6 py-3 text-center text-sm font-bold uppercase tracking-wider text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-white"
            >
              {info.ctaSecondary.label}
            </Link>
          )}
        </div>

        <div className="mt-8 border-t-2 border-[#e5e5e5] pt-6 text-center text-xs text-[#6b6b6b]">
          Need help?{" "}
          <Link
            href="/contact/"
            className="font-bold text-[#0a0a0a] underline hover:text-[#ff4d00]"
          >
            Contact us
          </Link>
          {" "}or email{" "}
          <a
            href="mailto:hello@sublimapparel.com"
            className="font-bold text-[#0a0a0a] underline hover:text-[#ff4d00]"
          >
            hello@sublimapparel.com
          </a>
        </div>
      </div>
    </div>
  );
}
