// Generate missing tag archive HTML pages for sports (41) and scenarios (25)
// that didn't get built due to next build lockup at step 178/355.
// Uses the t-shirt.html (smallest valid 18-product archive) as template scaffold.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { products } from '../src/lib/products-data.ts';
import { ALL_TAGS, getAllTagSlugs, getTagInfo } from '../src/lib/tag-archive.ts';

const T_SHIRT_HTML = '.next/server/app/tag/category/t-shirt.html';

const templateHtml = readFileSync(T_SHIRT_HTML, 'utf8');

// helpers
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function productsForTag(dimension, value) {
  if (dimension === 'category') {
    return products.filter(p => p.category === value);
  }
  if (dimension === 'sport') {
    return products.filter(p => {
      const isAllSports = Array.isArray(p.sports) && p.sports.length >= 30;
      return p.sports.includes(value) && !isAllSports;
    });
  }
  return products.filter(p => {
    const isAllScenarios = Array.isArray(p.scenarios) && p.scenarios.length >= 20;
    return p.scenarios.includes(value) && !isAllScenarios;
  });
}

function gradientFor(slug) {
  const GRADIENTS = [
    'from-amber-500 to-rose-600',
    'from-violet-600 to-indigo-700',
    'from-emerald-500 to-teal-700',
    'from-sky-500 to-blue-700',
    'from-rose-500 to-pink-700',
    'from-orange-500 to-red-600',
    'from-fuchsia-500 to-purple-700',
    'from-cyan-500 to-blue-700',
    'from-lime-500 to-emerald-700',
  ];
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

// Strategy: t-shirt.html has 18 product cards. We use it as scaffold:
// - Replace title / h1 / metadata with new tag's data
// - Replace the 18 product cards with new tag's product list
// - Keep the rest of HTML (header, nav, footer, CSS) intact
//
// This won't be pixel-perfect but will give a working tag archive page
// with correct products and tag metadata.

function findProductCardBlocks(html) {
  // Find <a href="/products/all/...">...</a> blocks. Each card is a <a> element.
  // Simpler: split on the start of each card and rebuild
  const cardRe = /<a[^>]*href="\/products\/all\/[a-z0-9-]+[^"]*"[^>]*>[\s\S]*?<\/a>/g;
  return html.match(cardRe) || [];
}

function buildProductCard(p, gradClass) {
  const url = `/products/all/${p.slug}/`;
  // Use a simple but functional card markup
  return `<a href="${url}" class="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
  <div class="absolute inset-0 bg-gradient-to-br ${gradClass} opacity-70 transition group-hover:opacity-100"></div>
  <div class="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
    <div class="text-[10px] uppercase tracking-widest text-white/60">${p.number}</div>
    <div class="text-sm font-semibold text-white line-clamp-2">${escapeHtml(p.name)}</div>
    <div class="mt-1 text-[10px] uppercase tracking-widest text-white/50">${escapeHtml(p.category)}</div>
  </div>
</a>`;
}

function buildProductGrid(matches) {
  return matches.slice(0, 36).map((p) => {
    const gradClass = gradientFor(p.slug);
    return buildProductCard(p, gradClass);
  }).join('\n');
}

function generateTagPage(dim, slug, label) {
  // For each tag, get its product list
  const matches = productsForTag(dim, label);
  // Read template (use smallest valid page)
  let html = templateHtml;
  // Replace the 18 cards section with our product grid
  // Find the first <div ...grid...> and replace its contents
  const productCards = findProductCardBlocks(html);
  if (productCards.length === 0) {
    throw new Error('No product cards found in t-shirt template!');
  }
  // Replace ALL product card blocks (t-shirt has 18) with our new grid
  // Easiest: replace the first product card with our first product, etc.
  // But the simpler way: find a wrapper around the cards and replace its innerHTML
  // The cards are direct <a> elements in a grid container. Let's find the grid container.
  const gridContainerRe = /<div[^>]*grid[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;
  const gridMatch = html.match(gridContainerRe);
  if (!gridMatch) {
    // Fallback: just replace first card with first new card, etc.
    console.warn(`  [${dim}/${slug}] No grid container found, using card-by-card replacement`);
    let newHtml = html;
    for (let i = 0; i < Math.min(matches.length, productCards.length); i++) {
      const gradClass = gradientFor(matches[i].slug);
      newHtml = newHtml.replace(productCards[i], buildProductCard(matches[i], gradClass));
    }
    // Remove leftover old cards
    for (let i = matches.length; i < productCards.length; i++) {
      newHtml = newHtml.replace(productCards[i], '');
    }
    html = newHtml;
  } else {
    // Replace grid container contents with new product grid
    const newGrid = `<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">\n${buildProductGrid(matches)}\n</div>`;
    html = html.replace(gridContainerRe, newGrid);
  }

  // Replace tag-specific strings (title, h1, breadcrumb, JSON-LD)
  // 1. <title>
  const oldTitle = html.match(/<title>[^<]+<\/title>/);
  if (oldTitle) html = html.replace(oldTitle[0], `<title>${escapeHtml(label)} – Sublimation Products | VividPrint</title>`);

  // 2. meta description
  const oldDesc = html.match(/<meta name="description" content="[^"]+"/);
  if (oldDesc) {
    const info = getTagInfo(dim, label);
    const newDesc = info?.description || `Browse our ${label} sublimation products. DDP shipping, low MOQ, full-color all-over printing from our Yiwu factory.`;
    html = html.replace(oldDesc[0], `<meta name="description" content="${escapeHtml(newDesc)}"`);
  }

  // 3. og:title
  const oldOg = html.match(/<meta property="og:title" content="[^"]+"/);
  if (oldOg) html = html.replace(oldOg[0], `<meta property="og:title" content="${escapeHtml(label)} – Sublimation Products | VividPrint"`);

  // 4. h1 (the tag name in the hero section)
  // Find the h1 with "T-Shirt" or similar
  const oldH1 = html.match(/<h1[^>]*>(?:[^<]|<[^h])+T-Shirt[^<]*<\/h1>/);
  if (oldH1) {
    html = html.replace(oldH1[0], oldH1[0].replace(/T-Shirt/g, escapeHtml(label)));
  }

  return { html, count: matches.length };
}

const ROOT = '.next/server/app';
const OUT_ROOT = 'out/tag';

const generated = [];
const skipped = [];
for (const dim of ['sport', 'scenario', 'category']) {
  for (const slug of getAllTagSlugs(dim)) {
    const dimDir = join(ROOT, dim);
    const targetFile = join(dimDir, slug.slug, 'index.html');
    // Check if already built
    try {
      readFileSync(targetFile, 'utf8');
      skipped.push(`${dim}/${slug.slug}`);
      continue;
    } catch {}
    try {
      const { html, count } = generateTagPage(dim, slug.slug, slug.value);
      // Write to out/tag directly (we'll deploy out/)
      const outDir = join(OUT_ROOT, dim, slug.slug);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html, 'utf8');
      generated.push(`${dim}/${slug.slug} (${count} products)`);
    } catch (e) {
      console.error(`FAILED ${dim}/${slug.slug}: ${e.message}`);
    }
  }
}

console.log(`\n=== GENERATED ${generated.length} PAGES ===`);
for (const g of generated) console.log(`  ${g}`);
console.log(`\n=== SKIPPED ${skipped.length} (already existed) ===`);
