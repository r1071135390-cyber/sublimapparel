import fs from "node:fs";
import { buildPageMetadata } from "@/lib/page-metadata";
import path from "node:path";
import Link from "next/link";

export const metadata = buildPageMetadata({
    title: "Ready-to-Decorate Blanks & Craft Services",
    description: "25 blank apparel styles + 4 decoration crafts (sublimation, embroidery, heat transfer, screen print). Mix-and-match fabric + craft. MOQ 50-100 pcs. DDP worldwi…",
    robots: { index: false, follow: false },
  });;

function parseTsv(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0].split("\t");
  return lines.slice(1).map((line) => {
    const cells = line.split("\t");
    const obj: Record<string, string> = {};
    header.forEach((h, i) => (obj[h] = cells[i] ?? ""));
    return obj;
  });
}

export default function BlanksCatalogPage() {
  const tsvPath = path.join(process.cwd(), "public/product-review/09-blanks-and-craft-services.tsv");
  const tsvText = fs.readFileSync(tsvPath, "utf-8");
  const rows = parseTsv(tsvText);

  // group by blank_type
  const byType: Record<string, Record<string, string>[]> = {};
  for (const r of rows) {
    const t = r.blank_type;
    if (!byType[t]) byType[t] = [];
    byType[t].push(r);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <div className="mb-6">
        <Link href="/product-review/" className="text-sm font-bold text-[#cc3d00] hover:underline">
          ← Back to product review
        </Link>
      </div>

      <h1 className="mb-3 text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
        Ready-to-Decorate Blanks
      </h1>
      <p className="mb-2 max-w-3xl text-sm text-black/70 md:text-base">
        {rows.length} blank apparel styles + 4 decoration crafts (sublimation, embroidery, heat
        transfer, screen print). Mix-and-match fabric + craft. MOQ 50–100 pcs. DDP to your door.
      </p>
      <p className="mb-8 text-xs text-black/50">
        Internal review only. Not indexed by search engines. Data may be incomplete — image URLs and
        price ranges need to be filled before going live.
      </p>

      <div className="mb-10 grid gap-4 md:grid-cols-4">
        <Stat label="Blank styles" value={rows.length} />
        <Stat label="Categories" value={Object.keys(byType).length} />
        <Stat label="Decoration crafts" value={4} />
        <Stat label="Avg. blank MOQ" value="50–100 pcs" />
      </div>

      {Object.entries(byType).map(([type, items]) => (
        <section key={type} className="mb-12">
          <h2 className="mb-4 border-b-2 border-black pb-2 text-2xl font-black uppercase tracking-tight">
            {type} <span className="text-base font-bold text-black/50">({items.length})</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((r) => (
              <BlankCard key={r.number} r={r} />
            ))}
          </div>
        </section>
      ))}

      <section className="mt-12 rounded border-2 border-dashed border-[#ff4d00] bg-[#fff7f0] p-6">
        <h3 className="mb-3 text-lg font-black uppercase">Decoration methods supported</h3>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <Craft
            name="Sublimation"
            best="Polyester. Full-bleed, edge-to-edge, no color limit."
            moq="50 pcs"
          />
          <Craft
            name="Embroidery"
            best="Polos, caps, jackets. Premium stitched logos, 3D puff available."
            moq="50 pcs"
          />
          <Craft
            name="Heat Transfer"
            best="Small runs, complex artwork. Works on any fabric, any color."
            moq="50 pcs"
          />
          <Craft
            name="Screen Print"
            best="Bold graphics, bulk runs, 1–6 spot colors. Cost-effective at scale."
            moq="100 pcs"
          />
        </div>
      </section>

      <section className="mt-10 rounded border border-black/10 bg-white p-6 text-sm text-black/70">
        <h3 className="mb-2 text-base font-black uppercase text-black">Why blanks + craft?</h3>
        <ul className="ml-5 list-disc space-y-1">
          <li>One supplier for blank + decoration — no middlemen, no double shipping.</li>
          <li>Yiwu fabric market next door: 200+ blank styles in stock, 3-day restock.</li>
          <li>Mix sublimation (your main craft) with embroidery / heat transfer / screen print for orders that need both.</li>
          <li>Lower MOQ than fully custom cut-and-sew: start at 50 pcs.</li>
        </ul>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded border-2 border-black bg-white p-4">
      <div className="text-3xl font-black text-[#cc3d00]">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-black/60">{label}</div>
    </div>
  );
}

function BlankCard({ r }: { r: Record<string, string> }) {
  return (
    <article className="flex flex-col rounded border border-black/15 bg-white p-4 text-sm shadow-sm transition-shadow hover:shadow-md">
      <header className="mb-2 flex items-start justify-between gap-2">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#cc3d00]">
            {r.number}
          </div>
          <h3 className="text-base font-black leading-tight">{r.blank_name}</h3>
        </div>
      </header>

      <dl className="space-y-1.5 text-xs text-black/70">
        <div>
          <dt className="inline font-bold text-black/50">Fabric:</dt>{" "}
          <dd className="inline">{r.fabric}</dd>
        </div>
        <div>
          <dt className="inline font-bold text-black/50">Colors:</dt>{" "}
          <dd className="inline">{r.color_options}</dd>
        </div>
        <div>
          <dt className="inline font-bold text-black/50">Sizes:</dt>{" "}
          <dd className="inline">{r.size_range}</dd>
        </div>
        <div>
          <dt className="inline font-bold text-black/50">Decoration area:</dt>{" "}
          <dd className="inline">{r.decoration_area}</dd>
        </div>
        <div>
          <dt className="inline font-bold text-black/50">Lead time:</dt>{" "}
          <dd className="inline">{r.lead_time_days} days</dd>
        </div>
        <div>
          <dt className="inline font-bold text-black/50">Blank MOQ:</dt>{" "}
          <dd className="inline font-black text-black">{r.blank_moq} pcs</dd>
        </div>
        <div>
          <dt className="inline font-bold text-black/50">Price (FOB):</dt>{" "}
          <dd className="inline font-black text-black">${r.price_range_usd}</dd>
        </div>
      </dl>

      <div className="mt-3 border-t border-black/10 pt-3">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-black/50">
          Compatible crafts
        </div>
        <div className="flex flex-wrap gap-1">
          {r.compatible_crafts.split("|").map((c) => (
            <span
              key={c}
              className="rounded-sm bg-black/5 px-1.5 py-0.5 text-[10px] font-bold uppercase text-black/70"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {r.notes && (
        <p className="mt-3 border-t border-black/10 pt-2 text-[11px] italic text-black/60">
          {r.notes}
        </p>
      )}

      {r.image_url.startsWith("/blank-apparel/") && (
        <div className="mt-2 text-[10px] text-black/40">📷 image pending</div>
      )}
    </article>
  );
}

function Craft({ name, best, moq }: { name: string; best: string; moq: string }) {
  return (
    <div>
      <div className="font-black uppercase text-black">{name}</div>
      <div className="text-black/70">{best}</div>
      <div className="text-[10px] font-bold text-[#cc3d00]">MOQ {moq}</div>
    </div>
  );
}
