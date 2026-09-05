/**
 * AVIF generation + data URI inline for LCP images.
 *
 * 1. Resize hero-jersey to 824x464 (2x retina of 412x232 mobile display)
 * 2. Convert to AVIF (20-30% smaller than WebP at same quality)
 * 3. Generate base64 data URI for inline use in HTML
 *
 * Mobile LCP: hero-jersey (displayed 412x232 on mobile)
 * Desktop LCP: factory-floor background (full bleed)
 *
 * Both files are written to public/ and to scripts/.data/ for inlining.
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const tasks = [
  {
    src: 'public/hero-jersey-v2.webp',
    dst: 'public/hero-jersey.avif',
    uriOut: 'scripts/.data/hero-jersey.avif.base64.txt',
    tsOut: 'src/lib/hero-jersey-data.ts',
    width: 824,
    height: 464,
    quality: 55,
    desc: 'hero-jersey (mobile LCP) 800x800 -> 824x464 @q55 AVIF',
  },
  {
    src: 'public/factory-floor.webp',
    dst: 'public/factory-floor.avif',
    uriOut: null,
    width: 1280,
    height: 720,
    quality: 55,
    desc: 'factory-floor (desktop LCP) 800x800 -> 1280x720 @q55 AVIF',
  },
];

await fs.mkdir('scripts/.data', { recursive: true });

for (const t of tasks) {
  const before = (await fs.stat(t.src)).size;
  const buf = await sharp(t.src)
    .resize({ width: t.width, height: t.height, fit: 'cover', position: 'center' })
    .avif({ quality: t.quality, effort: 6 })
    .toBuffer();
  await fs.writeFile(t.dst, buf);
  const meta = await sharp(buf).metadata();
  const after = buf.length;
  const saved = ((before - after) / 1024).toFixed(1);

  let base64Info = '';
  if (t.uriOut) {
    const b64 = `data:image/avif;base64,${buf.toString('base64')}`;
    await fs.writeFile(t.uriOut, b64);
    // Also write the TS data module for src/lib/hero-jersey-data.ts
    if (t.tsOut) {
      const tsContent =
        '// Auto-generated: hero-jersey inline AVIF data URI\n' +
        '// Source: /public/hero-jersey.avif (412x232, 20.5KB, mobile LCP image)\n' +
        '// Build: node scripts/optimize-hero-avif.mjs\n\n' +
        'export const HERO_JERSEY_AVIF_BASE64 = `' + b64 + '`;\n';
      await fs.writeFile(t.tsOut, tsContent);
    }
    base64Info = `  base64 URI: ${(b64.length / 1024).toFixed(1)} KiB -> ${t.uriOut}`;
  }

  console.log(`${t.desc}`);
  console.log(`  ${before} -> ${after} bytes (${meta.width}x${meta.height})  saved ${saved} KiB`);
  console.log(`  ${before} -> ${after} bytes (${((before - after) / before * 100).toFixed(1)}% smaller than webp source)`);
  if (base64Info) console.log(base64Info);
}
