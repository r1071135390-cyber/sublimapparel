import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Warehouse, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Fulfillment — DDP, US Warehouse, Global Delivery | SublimPrint",
  description:
    "DDP shipping to 100+ countries, US warehouse fulfillment from Fontana, CA, and global delivery. One invoice, no surprise duties.",
};

const options = [
  {
    slug: "ddp",
    name: "DDP Shipping",
    tagline: "Duties paid. We handle everything.",
    icon: Globe,
    badge: "Most popular",
    badgeColor: "bg-[#ff4d00]",
    desc: "Delivered Duty Paid to 100+ countries from Yiwu. Customs, duties, and last-mile — one invoice, no surprise bills.",
    href: "/shipping/ddp",
  },
  {
    slug: "us-warehouse",
    name: "US Warehouse",
    tagline: "Fontana, CA. 2–5 day domestic shipping.",
    icon: Warehouse,
    badge: "Fastest for US buyers",
    badgeColor: "bg-[#00c2ff] text-black",
    desc: "Bulk shipped to our California warehouse, then domestic delivery. No customs, no duties, 2–5 days anywhere in the continental US.",
    href: "/shipping/us-warehouse",
  },
  {
    slug: "global",
    name: "Worldwide Shipping",
    tagline: "Sea · air · express · rail to 100+ countries.",
    icon: Truck,
    badge: "All regions",
    badgeColor: "bg-[#0a0a0a] text-white",
    desc: "Five shipping modes, every Incoterm. Transit time, cost, and customs complexity mapped by region so you can pick the right route.",
    href: "/shipping/global",
  },
  {
    slug: "fob",
    name: "FOB / CIF / EXW",
    tagline: "For buyers with their own freight.",
    icon: Truck,
    badge: "Optional",
    badgeColor: "bg-black/10 text-black",
    desc: "If you have your own freight forwarder or prefer to arrange your own shipping, we can quote FOB Yiwu, CIF, or EXW terms.",
    href: "/get-a-quote",
  },
];

export default function ShippingPage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            Shipping & Fulfillment
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
            From our factory
            <br />
            <span className="text-[#00c2ff]">to your door.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            We ship to 100+ countries. Pick the option that fits your buyer —
            full DDP for international, US warehouse for domestic speed, or
            your own freight forwarder if you prefer.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Choose your shipping
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Four ways to ship.
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {options.map((o) => {
              const Icon = o.icon;
              return (
                <Link
                  key={o.slug}
                  href={o.href}
                  className="group flex flex-col border-2 border-black bg-white p-6 transition-all hover:border-[#ff4d00]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-7 w-7 text-[#ff4d00]" strokeWidth={1.5} />
                    <span className={"px-2 py-1 text-[10px] font-black uppercase tracking-widest " + o.badgeColor + " text-white"}>
                      {o.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-2xl font-black leading-none">{o.name}</h3>
                  <p className="mb-4 text-xs font-black uppercase tracking-widest text-[#ff4d00]">{o.tagline}</p>
                  <p className="mb-6 flex-1 text-sm text-black/70">{o.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black transition-colors group-hover:text-[#ff4d00]">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#ff4d00] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Get a shipping quote
            <br />
            in 1 business day.
          </h2>
          <Link
            href="/get-a-quote"
            className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
          >
            Get Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
