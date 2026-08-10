import type { Metadata } from "next";
import { CheckCircle2, Layers, Droplet, Flame, Scissors, Award } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { techniqueData } from "@/lib/json-ld-data";

export const metadata: Metadata = {
  title: "Sublimation Technique & Process | How We Print Apparel — SublimApparel",
  description:
    "Inside the sublimation process: heat-press transfer, CMYK + extended color gamut, 1.9m wide-format printers, 200°C heat press cycle. Sublimation, DTG, DTF and embroidery methods compared.",
  alternates: { canonical: "./" },
};

const methods = [
  {
    name: "Dye-Sublimation",
    best: "Polyester & polyester blends",
    moq: "50 pcs",
    color: "Unlimited (CMYK + 8 extended)",
    feel: "Zero hand-feel — ink becomes part of the fabric",
    leadTime: "15–25 days",
    rank: "★ Our default",
  },
  {
    name: "DTG (Direct-to-Garment)",
    best: "100% cotton, small runs",
    moq: "30 pcs",
    color: "Wide color gamut, no all-over print",
    feel: "Slight hand-feel, sits on top of cotton",
    leadTime: "15–20 days",
    rank: "For cotton-only orders",
  },
  {
    name: "DTF (Direct-to-Film)",
    best: "Cotton, blends, dark fabrics",
    moq: "30 pcs",
    color: "Bright colors on dark fabric",
    feel: "Slight film layer feel",
    leadTime: "15–20 days",
    rank: "For dark cotton & small runs",
  },
  {
    name: "Embroidery",
    best: "Polos, caps, left-chest logos",
    moq: "50 pcs",
    color: "Thread palette (~200 colors)",
    feel: "Premium raised texture",
    leadTime: "20–30 days",
    rank: "Add-on to sublimation orders",
  },
];

const process = [
  {
    icon: Layers,
    title: "01. Artwork separation",
    body: "CMYK + 8 extended spot colors are pre-flighted. Tiny details under 0.3mm get bumped; underbase white is added automatically for polyester.",
  },
  {
    icon: Droplet,
    title: "02. Wide-format print",
    body: "1.9m wide roll-to-roll sublimation printer lays the design onto transfer paper at 4,800 × 1,200 DPI.",
  },
  {
    icon: Scissors,
    title: "03. Cut & assemble",
    body: "Printed paper is cut to garment panel size. Front, back, sleeves are kept aligned for assembly later.",
  },
  {
    icon: Flame,
    title: "04. Heat-press transfer",
    body: "200°C / 30 sec cycle on an 80 × 100 cm platen. Dye sublimates from solid to gas, bonds with polyester fibers — no hand-feel, no peel.",
  },
  {
    icon: Award,
    title: "05. Cut & sew",
    body: "Each garment is cut, assembled and sewn on the same floor. Panels match perfectly because we printed them together.",
  },
  {
    icon: CheckCircle2,
    title: "06. Quality check",
    body: "Every piece inspected. Colors verified against your proof. Defects removed before poly-bagging.",
  },
];

export default function TechniquePage() {
  return (
    <>
      <JsonLd data={techniqueData} />

      <section className="border-b-2 border-black bg-[#0a0a0a] py-14 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
            [ 005 / TECHNIQUE ]
          </p>
          <h1 className="mb-5 text-5xl font-extrabold leading-[0.95] md:text-7xl">
            Sublimation, <br />
            <span className="text-[#ff4d00]">explained.</span>
          </h1>
          <p className="max-w-2xl text-base text-white/70 md:text-lg">
            How the ink becomes part of the fabric. No vinyl, no screen, no
            peeling after 10 washes — just polyester fiber, gas-phase dye, and
            200°C heat.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
            The 6-step process
          </p>
          <h2 className="mb-10 text-3xl font-extrabold md:text-5xl">
            From your file to folded poly-bag.
          </h2>
          <div className="grid grid-cols-1 gap-px bg-black md:grid-cols-2 lg:grid-cols-3">
            {process.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-6">
                <Icon className="mb-3 h-7 w-7 text-[#ff4d00]" strokeWidth={2.5} />
                <h3 className="mb-2 text-lg font-extrabold uppercase tracking-tight">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-black/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#f5f5f3] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
            Pick your method
          </p>
          <h2 className="mb-10 text-3xl font-extrabold md:text-5xl">
            Sublimation vs DTG vs DTF vs Embroidery.
          </h2>
          <div className="overflow-x-auto border-2 border-black bg-white">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b-2 border-black bg-black text-xs uppercase tracking-wider text-white">
                <tr>
                  <th className="px-4 py-3 font-bold">Method</th>
                  <th className="px-4 py-3 font-bold">Best for</th>
                  <th className="px-4 py-3 font-bold">MOQ</th>
                  <th className="px-4 py-3 font-bold">Color</th>
                  <th className="px-4 py-3 font-bold">Hand-feel</th>
                  <th className="px-4 py-3 font-bold">Lead time</th>
                  <th className="px-4 py-3 font-bold">Our take</th>
                </tr>
              </thead>
              <tbody>
                {methods.map((m, idx) => (
                  <tr
                    key={m.name}
                    className={
                      idx !== methods.length - 1
                        ? "border-b border-black/10"
                        : ""
                    }
                  >
                    <td className="px-4 py-3 font-extrabold">{m.name}</td>
                    <td className="px-4 py-3 text-black/70">{m.best}</td>
                    <td className="px-4 py-3 text-black/70">{m.moq}</td>
                    <td className="px-4 py-3 text-black/70">{m.color}</td>
                    <td className="px-4 py-3 text-black/70">{m.feel}</td>
                    <td className="px-4 py-3 text-black/70">{m.leadTime}</td>
                    <td className="px-4 py-3 text-[#ff4d00] font-bold">
                      {m.rank}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#ff4d00]">
            FAQ
          </p>
          <h2 className="mb-10 text-3xl font-extrabold md:text-5xl">
            What people ask us.
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Can you sublimate on 100% cotton?",
                a: "Polyester is the canvas for sublimation — the dye bonds with synthetic fibers. For 100% cotton, we switch to DTG or DTF (still custom, still full-color, just a different process). Tell us the fabric in your quote and we'll route to the right line.",
              },
              {
                q: "How durable is the print after washing?",
                a: "Sublimation dye is part of the fiber — it can't peel, crack, or fade from wash cycles. We test every production batch to 50+ industrial washes without visible degradation.",
              },
              {
                q: "What's the smallest detail you can print?",
                a: "0.3 mm lines survive the press. Anything thinner risks closing up. Tiny text below 8pt gets bumped automatically in our pre-flight check.",
              },
              {
                q: "Do you have a minimum order?",
                a: "50 pieces per design for sublimation. Lower MOQs available for DTG / DTF (30 pcs) — useful for samples or limited drops.",
              },
              {
                q: "Can you match a Pantone color?",
                a: "We print CMYK + 8 extended spot colors. We can hit ~85% of Pantone Solid Coated. Send your Pantone code in the quote and we'll flag any out-of-gamut colors before production.",
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-black/15 pb-5">
                <h3 className="mb-2 text-lg font-extrabold">{item.q}</h3>
                <p className="text-sm leading-relaxed text-black/70">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
