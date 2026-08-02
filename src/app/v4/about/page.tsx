import Image from "next/image";
import { Process } from "@/components/v4/process";
import { DDP } from "@/components/v4/ddp";
import { Contact } from "@/components/v4/contact";
import { Sparkles, Layers, Truck, Zap } from "lucide-react";

export const metadata = {
  title: "About | VividPrint",
  description: "Yiwu-based sublimation factory with full in-house production and DDP worldwide shipping.",
};

const capabilities = [
  { icon: Sparkles, title: "Design Studio", desc: "In-house graphic design team. Free mockups for your project." },
  { icon: Layers, title: "Sublimation Presses", desc: "Industrial-grade sublimation lines for cotton and polyester." },
  { icon: Zap, title: "Laser Cutting", desc: "Precision cutting for complex shapes and patterns." },
  { icon: Truck, title: "DDP Logistics", desc: "End-to-end shipping with customs clearance included." },
];

const stats = [
  { num: "10+", label: "Years in sublimation" },
  { num: "50+", label: "Countries served" },
  { num: "500K+", label: "Pieces printed yearly" },
  { num: "50", label: "Pieces minimum order" },
];

export default function V4AboutPage() {
  return (
    <>
      <section className="bg-[#0a0e1a] pt-20 pb-16 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">About</div>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
            One factory.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Full control.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            Based in Yiwu, China — the world's small-commodity capital. We manufacture every piece in-house, from raw fabric to packed carton.
          </p>
        </div>
      </section>

      <section className="bg-[#0a0e1a] pb-24 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
              <Image src="/v4-tech2.jpg" alt="VividPrint factory" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for B2B events.</h2>
              <p className="mt-6 text-white/70">
                We don't do retail. We don't do drop shipping. We focus on one thing: large-format sublimation apparel for events, campaigns, and bulk orders.
              </p>
              <p className="mt-4 text-white/70">
                That focus lets us offer something most factories can't: full-cotton all-over print, low MOQs, and DDP shipping that lets your customers receive boxes at the door without ever thinking about customs.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <div className="text-3xl font-bold text-cyan-300">{stat.num}</div>
                    <div className="mt-1 text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#06080f] py-24 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Capabilities</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">In-house, end-to-end.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap) => (
              <div key={cap.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 text-cyan-300">
                  <cap.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{cap.title}</h3>
                <p className="mt-2 text-sm text-white/60">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <DDP />
      <Contact />
    </>
  );
}
