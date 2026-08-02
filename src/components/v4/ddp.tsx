import Link from "next/link";
import { Truck, Shield, Clock, MapPin } from "lucide-react";

export function DDP() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-800 py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-400/30 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-400/30 blur-[120px]" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <Truck className="h-3.5 w-3.5" />
              Door-to-Door Service
            </div>
            <h2 className="mt-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              No customs.
              <br />
              No duties.
              <br />
              <span className="text-cyan-200">No surprises.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-white/80">
              DDP (Delivered Duty Paid) means we handle everything. You see one price at checkout — we deliver the box to your door, fully cleared.
            </p>
            <Link
              href="/v4/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 transition-all hover:bg-cyan-50"
            >
              Get a DDP Quote
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shield, title: "No customs", desc: "We handle all paperwork" },
              { icon: Clock, title: "7-day avg", desc: "Production to door" },
              { icon: MapPin, title: "50+ countries", desc: "Worldwide delivery" },
              { icon: Truck, title: "Tracked", desc: "Every shipment tracked" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm"
              >
                <item.icon className="h-7 w-7 text-cyan-200" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
