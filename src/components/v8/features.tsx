const features = [
  {
    num: "F.01",
    title: "FULL COTTON, FULL PRINT",
    body: "Most factories print only on polyester. We are specialists in full-colour sublimation on 100% COTTON — a rare capability that opens new creative doors.",
  },
  {
    num: "F.02",
    title: "DOOR-TO-DOOR DELIVERY",
    body: "DDP SHIPPING TO 50+ COUNTRIES. YOUR TEAM RECEIVES BOXES AT THE DOOR, NO CUSTOMS PAPERWORK, NO SURPRISE DUTIES, NO HEADACHES.",
  },
  {
    num: "F.03",
    title: "WHOLE SUPPLY CHAIN",
    body: "DESIGN, PRINTING, CUTTING, SEWING, PACKING, SHIPPING — ONE FACTORY, ONE ACCOUNTABLE TEAM. NO MIDDLEMEN, NO COORDINATION OVERHEAD.",
  },
  {
    num: "F.04",
    title: "FIFTY PIECES MINIMUM",
    body: "SMALL MOQ MEANS YOU CAN TEST, ITERATE AND SCALE. WE WORK WITH RACE ORGANISERS, MARKETING TEAMS AND SMALL BRANDS WITHOUT QUANTITY DEMANDS.",
  },
];

export function Features() {
  return (
    <section className="border-b-4 border-black bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-6 border-b-2 border-black pb-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-black">
              [002] CAPABILITIES
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-black md:text-5xl">
              WHAT WE DO
            </h2>
          </div>
          <p className="hidden text-right text-xs font-bold uppercase tracking-widest text-black md:block">
            04 PILLARS
          </p>
        </div>

        <div className="grid gap-px bg-black md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <article
              key={f.num}
              className="group bg-white p-6 transition-colors hover:bg-[#ffeb00] md:p-7"
            >
              <p className="text-xs font-black uppercase tracking-widest text-black">
                {f.num}
              </p>
              <h3 className="mt-4 text-lg font-black uppercase leading-tight text-black">
                {f.title}
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-black">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
