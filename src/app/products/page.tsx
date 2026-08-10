import { Contact } from "@/components/contact";
import ProductCatalogGrid from "@/components/product-catalog-grid";
import { productTypes } from "@/lib/products-data";



export const metadata = {
  title: "Custom Sublimation & Cotton Apparel — T-Shirts, Jerseys, Hoodies, Cycling, Golf, Racing",
  description:
    "Custom sublimated apparel for B2B: t-shirts, jerseys, hoodies, cycling kits, golf polos, racing suits. No setup fees, MOQ 50 pcs, full color all-over print, sample in 5 days.",
};

const categories = [
  {
    id: "apparel",
    title: "Apparel",
    desc: "T-shirts, hoodies, jerseys, racing, cycling, golf, bowling, esports, singlets, leggings. Cut and sewn in our Yiwu factory.",
    items: ["T-Shirts", "Hoodies & Sweatshirts", "Jerseys & Singlets", "Racing Kits", "Cycling Kits", "Golf / Bowling Shirts", "Pants & Shorts", "Vests"],
    note: "Polyester or 100% cotton. Our specialty: full-color all-over print on cotton.",
  },
  {
    id: "home",
    title: "Home & Living",
    desc: "Custom printed home textiles. Bright patterns, soft fabrics, ready for retail or e-commerce.",
    items: ["Throw Pillows", "Cushion Covers", "Blankets & Throws", "Curtains & Drapes", "Tablecloths", "Towels", "Bedding Sets"],
    note: "Polyester, cotton, or blended fabrics. Custom sizes available.",
  },
  {
    id: "accessories",
    title: "Bags & Accessories",
    desc: "Custom printed bags, hats, and fashion accessories. Great for events and brand merch.",
    items: ["Drawstring Bags", "Backpacks", "Tote Bags", "Baseball Caps", "Bucket Hats", "Scarves & Bandanas", "Lanyards", "Aprons"],
    note: "Durable sublimation-ready materials. Custom hardware and closures.",
  },
  {
    id: "flags",
    title: "Flags & Banners",
    desc: "Indoor and outdoor flags, banners, and signage. Vibrant colors, fade-resistant.",
    items: ["Garden Flags", "Beach Flags", "Hand Flags", "Trade Show Banners", "Pull-Up Banners", "Pennant Strings"],
    note: "Knitted polyester, flag fabric, or mesh. Pole pockets and hemming included.",
  },
  {
    id: "hardgoods",
    title: "Hard Goods & Lifestyle",
    desc: "Sublimation-ready hard goods and lifestyle products. Perfect for e-commerce and gifting.",
    items: ["Mouse Pads", "Coasters", "Puzzles", "Phone Cases", "AirPods Cases", "Mugs (wrap print)", "Keychains", "Magnets"],
    note: "Pre-treated sublimation blanks. Custom shapes and packaging available.",
  },
  {
    id: "custom",
    title: "Custom Projects",
    desc: "Got something else? We love weird one-offs. Send us your idea and we'll figure out how to print it.",
    items: ["Pet Apparel", "Shoe Uppers", "Lampshades", "Wall Art", "Festival Costumes", "Theatre Costumes", "Promotional Items", "Anything else you imagine"],
    note: "Tell us what you need. If it can be sublimated, we can probably do it.",
  },
];

const comparison = [
  { feature: "Print method", poly: "Dye-sublimation transfer", cotton: "Cotton-sublimation coating" },
  { feature: "Color vibrancy", poly: "Excellent", cotton: "Excellent (slightly softer)" },
  { feature: "Hand feel", poly: "Smooth, lightweight", cotton: "Soft, natural cotton feel" },
  { feature: "Durability", poly: "Won't fade, peel, or crack", cotton: "Won't fade, peel, or crack" },
  { feature: "Best for", poly: "Sports, performance, lightweight", cotton: "Fashion, lifestyle, premium feel" },
  { feature: "MOQ", poly: "50 pcs", cotton: "50 pcs" },
];

export default function ProductsPage() {
  return (
    <main>
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
            Products
          </div>
          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-black md:text-6xl lg:text-7xl">
            Whatever you need
            <br />
            to customize
            <br />
            <span className="text-[#ff4d00]">we make it.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-snug text-black/80">
            Apparel is our bread and butter — but we print home goods, bags, flags, hard
            goods, and whatever custom project you bring us. Polyester or 100% cotton.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="space-y-12">
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                className="border-2 border-black bg-white p-8"
              >
                <div className="grid gap-6 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#ff4d00]">
                      Category 0{i + 1}
                    </div>
                    <h2 className="text-4xl font-black text-black md:text-5xl">
                      {cat.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-black/70">
                      {cat.desc}
                    </p>
                    <p className="mt-4 border-l-4 border-[#00c2ff] pl-3 text-sm font-bold text-black/80">
                      {cat.note}
                    </p>
                  </div>
                  <div className="md:col-span-8">
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {cat.items.map((item) => (
                        <div
                          key={item}
                          className="border-2 border-black bg-[#faf9f6] p-3 text-sm font-black text-black"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials comparison */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-8">
            <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-white">
              Materials
            </div>
            <h2 className="text-4xl font-black leading-tight text-black md:text-6xl">
              Polyester
              <br />
              <span className="italic">or 100% cotton.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70">
              Most sublimation factories can only print on polyester. We can print on both —
              with the same vivid color and durable finish.
            </p>
          </div>

          <div className="overflow-x-auto border-2 border-black">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-4 text-xs font-black uppercase tracking-widest bg-black text-white">
                    Feature
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-widest bg-[#00c2ff]/10 text-black">
                    100% Polyester
                  </th>
                  <th className="p-4 text-xs font-black uppercase tracking-widest bg-[#ff4d00]/10 text-black">
                    100% Cotton
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf9f6]"}
                  >
                    <td className="p-4 text-sm font-black uppercase tracking-wider text-black">
                      {row.feature}
                    </td>
                    <td className="p-4 text-sm text-black/80">{row.poly}</td>
                    <td className="p-4 text-sm text-black/80">{row.cotton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 border-2 border-[#ff4d00] bg-[#ff4d00]/5 p-6">
            <div className="text-xs font-black uppercase tracking-widest text-[#ff4d00]">
              Our specialty
            </div>
            <p className="mt-2 text-lg font-bold text-black">
              Full-color all-over print on 100% cotton is hard to find. Most sublimation
              factories can&apos;t do it — we can, with rich color and soft hand feel.
            </p>
          </div>
        </div>
      </section>

      <ProductCatalogGrid />

      {/* Excel download */}
      <section className="border-t border-black/10 bg-[#0a0a0a] py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Need the full product list?
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">
                Download our complete product catalog as Excel — with name, category, subcategory,
                process, fabric options, and tags. Image column left blank for you to assign.
              </p>
            </div>
            <a
              href="/products-catalog.xlsx"
              download
              className="inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#e64500] md:text-base"
            >
              <span>Download Excel (106 products)</span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
