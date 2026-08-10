// Shared fabric catalogue data — used by /fabric, /fabric/cotton, /fabric/polyester
// 12 fabric types we keep on hand. `comp` field is the filter key.

export type FabricType = {
  name: string;
  comp: string;
  gsm: string;
  use: string;
  fit: string;
  swatch: string;
  description: string;
};

export const fabricTypes: FabricType[] = [
  {
    name: "Polyester jersey",
    comp: "100% Polyester",
    gsm: "110–160",
    use: "T-shirts, cultural shirts, jerseys",
    fit: "★★★★★",
    swatch: "01-jersey",
    description: "Workhorse polyester for sublimation. Holds prints flat, washes clean, doesn't pill.",
  },
  {
    name: "Bird-eye mesh",
    comp: "100% Polyester",
    gsm: "135–275",
    use: "Basketball, cycling, team kits",
    fit: "★★★★★",
    swatch: "02-birdeye",
    description: "Perforated mesh — small holes for breathability, smooth face for sharp prints.",
  },
  {
    name: "Poly-spandex stretch mesh",
    comp: "92% Poly + 8% Spandex",
    gsm: "100–185",
    use: "Compression, yoga base layers",
    fit: "★★★★",
    swatch: "03-spandex",
    description: "92/8 poly-spandex. Four-way stretch for compression and fitted cuts.",
  },
  {
    name: "Polar fleece",
    comp: "100% Polyester",
    gsm: "270–420",
    use: "Hoodies, jackets, winter sports",
    fit: "★★★★",
    swatch: "04-fleece",
    description: "Heavy-knit loops, brushed both sides. Plush hand, prints through to the pile.",
  },
  {
    name: "Nylon-spandex",
    comp: "75–85% Nylon + 15–25% Spandex",
    gsm: "160–280",
    use: "Yoga, swimwear, leggings",
    fit: "★★★",
    swatch: "05-nylon",
    description: "Silky hand, excellent stretch recovery. Used for swim, yoga, fitted tops.",
  },
  {
    name: "Direct print fabric",
    comp: "100% Polyester (coated)",
    gsm: "100–170",
    use: "Flags, banners, posters, pillows",
    fit: "★★★★★",
    swatch: "06-banner",
    description: "Flag/banner fabric. Tightly woven, takes direct print on coated face.",
  },
  {
    name: "Poly-cotton blend (CVC / TC)",
    comp: "65% Poly + 35% Cotton",
    gsm: "120–260",
    use: "Polos, workwear, shirts",
    fit: "★★",
    swatch: "07-polycotton",
    description: "Poly-cotton CVC or TC. Heavier hand, used for polo and workwear.",
  },
  {
    name: "100% Cotton",
    comp: "100% Cotton",
    gsm: "180–250",
    use: "Cotton tees, hoodies — our edge",
    fit: "★",
    swatch: "08-cotton",
    description: "Pure cotton — specialty process at our factory. We dye-sub cotton via DTG/DTF for full color, soft hand.",
  },
  {
    name: "Polyester satin / chiffon",
    comp: "100% Polyester",
    gsm: "80–120",
    use: "Dresses, dance, scarves",
    fit: "★★★★★",
    swatch: "09-satin",
    description: "Polyester satin and chiffon. Silky drape, used for dance and dresses.",
  },
  {
    name: "French terry",
    comp: "100% Polyester",
    gsm: "200–320",
    use: "Hoodies, pullovers",
    fit: "★★★★",
    swatch: "10-terry",
    description: "Looped back, smooth face. Mid-weight for hoodies and pullovers.",
  },
  {
    name: "Polyester compression",
    comp: "100% Polyester",
    gsm: "180–280",
    use: "Compression wear, cycling",
    fit: "★★★★",
    swatch: "11-compression",
    description: "Polyester interlock, tight knit. Holds shape under stretch.",
  },
  {
    name: "Microfiber peach",
    comp: "100% Polyester",
    gsm: "120–200",
    use: "Blankets, pillow covers, lining",
    fit: "★★★★",
    swatch: "12-peach",
    description: "Microfiber peach skin. Soft sueded hand, used for linings and home textiles.",
  },
];

// Filter helpers
export const cottonFabrics = fabricTypes.filter((f) =>
  f.comp.toLowerCase().includes("cotton"),
);
export const polyesterFabrics = fabricTypes.filter(
  (f) =>
    f.comp.toLowerCase().includes("poly") &&
    !f.comp.toLowerCase().includes("cotton"),
);
