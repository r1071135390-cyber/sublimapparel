import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Droplets, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Fabric & Process — Polyester, Cotton, DTG, Sublimation | SublimApparel",
  description:
    "We run every major apparel print process — sublimation on polyester, DTG and DTF on 100% cotton, screen print, and embroidery. Pick the right fabric and process for your project.",
};

const fabrics = [
  {
    slug: "cotton",
    name: "100% Cotton",
    badge: "Most factories skip this",
    badgeColor: "bg-[#ff4d00]",
    icon: Leaf,
    color: "bg-[#faf9f6]",
    desc: "DTG and DTF printing on 100% cotton, organic cotton, and cotton-blend. Soft hand feel, full color, low MOQ 50 pcs.",
    href: "/fabric/cotton",
  },
  {
    slug: "polyester",
    name: "100% Polyester",
    badge: "Our bread & butter",
    badgeColor: "bg-[#00c2ff] text-black",
    icon: Droplets,
    color: "bg-white",
    desc: "Dye sublimation on polyester — all-over print, photorealistic color, no setup fee. Perfect for sportswear, esports, cycling, and streetwear.",
    href: "/products",
  },
];

const processes = [
  { name: "Sublimation", fabric: "Polyester", desc: "All-over print, photorealistic color, zero hand feel" },
  { name: "DTG", fabric: "Cotton (light)", desc: "Direct to garment, soft hand feel, full color on natural fabrics" },
  { name: "DTF", fabric: "Cotton (any color)", desc: "Heat transfer film, vibrant on dark, durable" },
  { name: "Screen print", fabric: "Any", desc: "Classic, cost-effective for high-volume simple designs" },
  { name: "Embroidery", fabric: "Any", desc: "Premium finish for logos, caps, polos" },
  { name: "DTF heat transfer", fabric: "Any", desc: "Versatile, low MOQ, good for small runs" },
];

export default function FabricPage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Fabric & Process
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-8xl">
            Two fabrics.
            <br />
            <span className="text-[#ff4d00]">Six processes.</span>
            <br />
            One factory.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-neutral-700 md:text-lg">
            We run every major apparel print process so you can pick the right
            fabric and method for your project — not the only one we happen to
            have. Most factories only run polyester sublimation. We run
            cotton too.
          </p>
        </div>
      </section>

      {/* FABRIC CARDS */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Fabrics
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            What we print on.
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {fabrics.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.slug}
                  href={f.href}
                  className={"group relative flex flex-col border-2 border-black p-8 transition-all hover:border-[#ff4d00] " + f.color}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-8 w-8 text-[#ff4d00]" strokeWidth={1.5} />
                    <span className={"px-2 py-1 text-[10px] font-black uppercase tracking-widest " + f.badgeColor + " text-white"}>
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="mb-3 text-3xl font-black leading-none">{f.name}</h3>
                  <p className="mb-6 flex-1 text-sm text-black/70 md:text-base">{f.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black transition-colors group-hover:text-[#ff4d00]">
                    Explore {f.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESSES table */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Processes
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            All processes we run.
          </h2>

          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-black bg-black text-left text-xs font-black uppercase tracking-widest text-white">
                  <th className="px-4 py-3">Process</th>
                  <th className="px-4 py-3">Best on</th>
                  <th className="px-4 py-3">Why pick it</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((p, i) => (
                  <tr key={i} className={"border-b border-black/10 " + (i % 2 === 0 ? "bg-white" : "bg-neutral-50")}>
                    <td className="px-4 py-3 font-black">{p.name}</td>
                    <td className="px-4 py-3 text-sm">{p.fabric}</td>
                    <td className="px-4 py-3 text-sm text-black/70">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Not sure which fabric
            <br />
            or process fits?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
            Tell us what you&apos;re making. We&apos;ll recommend the fabric and
            process that fits your budget, deadline, and design.
          </p>
          <Link
            href="/get-a-quote"
            className="mt-8 inline-flex items-center gap-2 bg-[#ff4d00] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
          >
            Get a Recommendation
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
