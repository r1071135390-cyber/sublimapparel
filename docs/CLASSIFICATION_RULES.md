# VividPrint Product Classification Rules
**Version:** 2026-08-18
**Status:** Active — used in `src/lib/products-data.ts` and `src/lib/tag-archive.ts`

---

## Overview

Every product in VividPrint has **three classification dimensions** that drive how it appears on the website (especially on tag archive pages):

| Dimension | Cardinality | Count | Cardinality Rule |
|---|---|---|---|
| **Category** | Exactly 1 | 13 (after Sportswear removed) | One and only one |
| **Sports** | 0–5 | 41 | Pick only relevant ones |
| **Scenarios** | 2–5 | 25 | Pick only relevant ones |

Source files:
- `src/lib/products-data.ts` — `products` array, `ProductCategory` type, `ALL_SPORTS`, `ALL_SCENARIOS`
- `src/lib/tag-archive.ts` — `CATEGORY_TAGS`, `SPORT_TAGS`, `SCENARIO_TAGS`, `findTagBySlug`

---

## 1. Category (13 mutually exclusive options)

Each product **must have exactly one** category. The category is the primary visual label on the product card.

| Category | Definition | Examples |
|---|---|---|
| **Hoodie** | Caps, headwear, beanies, ski masks | Beanie Caps, Cycling Caps, Sun Caps |
| **T-Shirt** | Short-sleeve tops, jerseys, singlets, suits (上衣), GIs, wrestling wear, fishing shirts | Basketball Jersey, Wrestling Singlet, MMA Gi, Cycling Top |
| **Pants** | Long pants, shorts, leggings, tights, swim trunks | Boxing Trunks, Cycling Shorts, Yoga Legging, MMA Shorts |
| **Sweatshirt** | Long-sleeve sweatshirts, hoodies, pullovers, track jackets (上衣类长袖) | Pullover Hoodie, Crewneck Sweatshirt |
| **Tank Top & Camis** | Sleeveless tops, rash guards, lycra tops, body suits | Surf Lycra Top, Rash Guard, Singlet (when tight-fitting) |
| **Shirt** | Standard collared shirts (not polo) | Button-up Shirt, Dress Shirt |
| **Home** | Home goods, household items, gifts | Scarf, Apron, Beach Sarong, Towel, Onesie, Home Jumpsuit, Blanket |
| **Skirt** | Skirts, dresses, leotards, cheer uniforms | Dance Dress, Cheerleading Dress, Netball Dress, Leotard |
| **Polo Shirt** | Polo-style collared shirts (with buttons + collar) | Sublimation Polo, Sport Polo |
| **Cap** | Baseball caps, visors (different from Hoodie which is knit caps) | Baseball Cap, Trucker Cap, Sun Visor |
| **Jacket** | Outerwear, windbreakers, ski jackets | Windbreaker, Softshell Jacket, Down Jacket |
| **Vest** | Safety vests, reflective vests, hi-vis vests (NOT tank tops) | Construction Vest, Safety Vest, Reflective Vest |

> ⚠️ **Sportswear is removed** (2026-08-18). All 38 products previously in Sportswear have been redistributed to the categories above based on their product name.

---

## 2. Sports (0–5 selections from 41)

**Rule of thumb:** Pick the 1–5 sports the product is *primarily designed for*. If the product is not sport-specific (e.g. a scarf), pick `[]` (empty).

### Full list (41)

```
AFL, Athletics, Badminton, Baseball, Basketball, Beach, Bowling, Boxing,
Cheer, Cricket, CrossFit, Cycling, Dance, Dive, Esports, Fishing, Football,
Golf, Gym, Hockey, Lacrosse, MMA, Martial Arts, Netball, Pilates, Rugby,
Running, Skate, Skating, Ski, Snowboard, Soccer, Softball, Surf, Swimwear,
Table Tennis, Tennis, Triathlon, Volleyball, Wrestling, Yoga
```

### Examples

| Product | Sports |
|---|---|
| Basketball Jersey Wear | `[Basketball]` |
| Cycling Set (top + shorts) | `[Cycling]` |
| Yoga Set | `[Yoga, Pilates, Gym]` |
| Wrestling Singlet | `[Wrestling, MMA, Martial Arts]` |
| Scarf (0001) | `[]` (no sport) |
| Baby Onesie | `[]` (no sport) |
| Beach Sarong | `[Beach, Swimwear, Surf]` |
| Construction Vest | `[]` (no sport) |
| Surf Lycra Top | `[Surf, Swimwear, Beach]` |
| MMA Gi | `[MMA, Martial Arts]` |
| Fishing Shirt | `[Fishing]` |

### Anti-pattern ❌

**Do NOT** do this:
```ts
sports: ["AFL", "Athletics", "Badminton", "Baseball", "Basketball", "Beach", "Bowling", "Boxing", "Cheer", "Cricket", "CrossFit", "Cycling", "Dance", "Dive", "Esports", "Fishing", "Football", "Golf", "Gym", "Hockey", "Lacrosse", "MMA", "Martial Arts", "Netball", "Pilates", "Rugby", "Running", "Skate", "Skating", "Ski", "Snowboard", "Soccer", "Softball", "Surf", "Swimwear", "Table Tennis", "Tennis", "Triathlon", "Volleyball", "Wrestling", "Yoga"]
```

This is what caused "achieve 不准确" — every product showed up on every sport archive page.

---

## 3. Scenarios (2–5 selections from 25)

**Rule of thumb:** Pick the 2–5 use cases the product best serves. Most products should have 2–4 scenarios.

### Full list (25)

```
Promotional Swag, Event & Festival, School & Education, Team & Club,
Sports League, Corporate & Branding, Uniform & Workwear, Retail & Fashion,
Political Campaign, Fundraiser & Charity, Music & Merch, Wedding & Party,
Gift & Souvenir, Construction & Engineering, Express & Logistics,
Hospitality & F&B, Medical & Healthcare, Security & Property,
Retail & Supermarket, Education & School, Corporate & Promo,
Transit & Transport, Studio & Gym, Military, Festival & Holiday
```

### Examples

| Product | Scenarios |
|---|---|
| Basketball Jersey | `[Sports League, Team & Club, School & Education]` |
| Cheerleading Dress | `[School & Education, Sports League, Team & Club]` |
| Scarf (0001) | `[Retail & Fashion, Gift & Souvenir, Promotional Swag]` |
| Construction Vest (0101) | `[Construction & Engineering, Security & Property, Uniform & Workwear]` |
| Baby Onesie | `[Gift & Souvenir, Retail & Fashion]` |
| Beach Sarong | `[Beach, Travel, Retail & Fashion]` (Travel is NOT in scenarios; use "Festival & Holiday" or "Event & Festival") |
| Fishing Shirt | `[Retail & Fashion, Gift & Souvenir]` |
| Polo Shirt | `[Corporate & Branding, Uniform & Workwear, Retail & Fashion]` |
| MMA Gi | `[Sports League, Team & Club]` |
| Yoga Set | `[Studio & Gym, Retail & Fashion, Promotional Swag]` |

### Anti-pattern ❌

Do NOT tag every product with all 13+ scenarios. Pick the 2–5 most relevant ones.

---

## 4. The Categorization Algorithm (used in 07-sportswear-reclassification.tsv)

```js
function categorizeByName(name) {
  const n = name.toLowerCase();

  // Rule 1: Bottom-wear → Pants
  if (
    n.includes("shorts") ||
    n.includes("legging") ||
    n.includes("tights") ||
    (n.includes("swimwear") && n.includes("trunks"))
  ) return "Pants";

  // Rule 2: Tank-top style dress → Tank Top & Camis
  if (n.includes("vest") && n.includes("tank") && n.includes("dress")) {
    return "Tank Top & Camis"; // e.g. 0008
  }

  // Rule 3: Other vests → Vest (safety/reflective)
  if (n.includes("vest")) return "Vest";

  // Rule 4: Tight-fitting tops → Tank Top & Camis
  if (
    n.includes("rash guard") ||
    n.includes("lycra top") ||
    n.includes("lycra suit")
  ) return "Tank Top & Camis";

  // Rule 5: Sleeveless top → T-Shirt
  if (n.includes("singlet")) return "T-Shirt";

  // Rule 6: Dress / leotard → Skirt
  if (n.includes("leotard")) return "Skirt";
  if (n.includes("dress") && !n.includes("tank vest")) return "Skirt";

  // Rule 7: Uniform with skirt → Skirt
  if (n.includes("uniform") && (n.includes("skirt") || n.includes("top + skirt"))) {
    return "Skirt";
  }

  // Rule 8: All other sport tops → T-Shirt
  if (
    n.includes("jersey") ||
    n.includes("outfit") ||
    n.includes("wear") ||
    n.includes("set") ||
    n.includes("suit") ||
    n.includes("gi") ||
    n.includes("fishing shirt")
  ) return "T-Shirt";

  // Fallback: T-Shirt
  return "T-Shirt";
}
```

### Distribution (38 Sportswear products reclassified)

| New Category | Count |
|---|---|
| T-Shirt | 23 |
| Pants | 8 |
| Skirt | 4 |
| Tank Top & Camis | 2 |
| Vest | 1 |

---

## 5. Open Questions / Edge Cases

These products need user review before applying:

1. **0008 Womens Tank Vest Dress** → "Tank Top & Camis" (currently rule picks this; user mentioned "should be Sports" but Sports category does not exist; review)
2. **0042 Surf Lycra Top** → "Tank Top & Camis" ✓
3. **Cheerleading Dress (0023)** → "Skirt" ✓
4. **Netball Dress** → "Skirt" ✓
5. **Dance Dress** → "Skirt" ✓
6. **Hip-Hop Street Dance Outfit** → "T-Shirt" (rule picks this since "outfit" matches; but could be "Skirt" depending on style)

---

## 6. Related Files

- `src/lib/products-data.ts` — main data source
- `src/lib/tag-archive.ts` — tag archive pages metadata
- `scripts/export-prod-status.mjs` — generates 01-06 TSVs from production data
- `scripts/generate-missing-tag-pages.mjs` — generates 75 missing tag archive static pages
- `public/product-review/01-products.tsv` — full product list with tags
- `public/product-review/07-sportswear-reclassification.tsv` — proposed reclassification of 38 products
