const FEATURES = [
  {
    num: "01",
    title: "Moisture-Wicking Fabric",
    desc: "Performance polyester that breathes. Stays light through the longest races.",
    accent: "bg-[#00ff88]",
  },
  {
    num: "02",
    title: "Edge-to-Edge Print",
    desc: "Full sublimation means no limits. Photos, gradients, complex designs — all vivid.",
    accent: "bg-white",
  },
  {
    num: "03",
    title: "Race-Proven Durability",
    desc: "Sublimated ink becomes part of the fabric. Won't crack, peel, or fade — ever.",
    accent: "bg-[#00ff88]",
  },
  {
    num: "04",
    title: "DDP Worldwide",
    desc: "We handle every customs form, every duty, every mile. Your team gets boxes, period.",
    accent: "bg-white",
  },
];

export function V6Features() {
  return (
    <section className="bg-white py-20 text-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#00ff88]">
              Why VividPrint
            </div>
            <h2 className="mt-2 text-4xl font-black uppercase leading-none sm:text-5xl">
              Engineered
              <br />
              for Performance
            </h2>
          </div>
          <div className="hidden max-w-xs text-right text-sm text-neutral-600 md:block">
            Every detail tuned for athletes who demand the best from their gear.
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.num} className="border-2 border-black p-6">
              <div className={`inline-block ${f.accent} px-2 py-1 text-xs font-black text-black`}>
                {f.num}
              </div>
              <h3 className="mt-4 text-xl font-black uppercase leading-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
