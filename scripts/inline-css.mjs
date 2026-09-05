/**
 * Post-build: inline the main CSS file into every HTML page.
 * 
 * Why: the single 212KB Tailwind CSS file is render-blocking (~360ms).
 * Inlining eliminates the network round-trip. The HTML itself is
 * gzipped by Cloudflare, so the 32KB gzipped CSS becomes ~30KB inline
 * — net win on FCP and LCP.
 *
 * Static export only (consumes /out/).
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve(process.cwd(), 'out');

async function findHtmlFiles(dir) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await findHtmlFiles(p));
    } else if (item.name === 'index.html') {
      files.push(p);
    }
  }
  return files;
}

const indexHtml = await fs.readFile(path.join(OUT_DIR, 'index.html'), 'utf-8');
const cssMatch = indexHtml.match(/\/_next\/static\/chunks\/([^"]+)\.css/);
if (!cssMatch) {
  console.log('[inline-css] No CSS link found in index.html — nothing to do.');
  process.exit(0);
}
const cssFile = cssMatch[0];
const cssPath = path.join(OUT_DIR, cssFile);
const cssContent = await fs.readFile(cssPath, 'utf-8');
const cssKb = (cssContent.length / 1024).toFixed(1);
console.log(`[inline-css] CSS: ${cssFile} (${cssKb} KiB raw)`);

const htmlFiles = await findHtmlFiles(OUT_DIR);
let inlined = 0;
const linkRegex = /<link\s+rel="stylesheet"\s+href="(\/_next\/static\/chunks\/[^"]+\.css)"[^>]*\/?>/g;

for (const htmlPath of htmlFiles) {
  let html = await fs.readFile(htmlPath, 'utf-8');
  let modified = false;
  html = html.replace(linkRegex, (match, cssHref) => {
    if (cssHref === cssFile) {
      modified = true;
      return `<style>${cssContent}</style>`;
    }
    return match;
  });
  if (modified) {
    await fs.writeFile(htmlPath, html);
    inlined++;
  }
}

// KEEP the CSS file on disk — Next.js's React Flight payload still
// references it via :HL["...css","style"]. If we delete it, hydration
// re-creates the <link> tag and the browser gets 404 → console error.
// The inlined copy in <style> is what actually renders (synchronous),
// the linked copy just confirms what the browser already has (deduped).
// Total cost: 1 file (~200KB) on the CDN; no console error.
console.log(`[inline-css] Inlined into ${inlined} HTML file(s). Kept ${cssFile} for Flight payload.`);
