/**
 * Image optimization pass v2.
 *
 * PageSpeed flagged 4 oversized images, plus the CDN is caching
 * existing files for 30 days (s-maxage=2592000), so re-uploading
 * the same path won't bust cache. We rename to -v2 suffix and
 * update all code references.
 *
 * Re-run: `node scripts/optimize-images-v2.mjs`
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';

const tasks = [
  { src: 'public/sublimapparel-logo.webp', dst: 'public/sublimapparel-logo-v2.webp', width: 220, quality: 80, desc: 'logo 240x96 -> 220x88 @q80' },
  { src: 'public/heat-press.webp',         dst: 'public/heat-press-v2.webp',         width: 640, quality: 75, desc: 'heat-press 800x600 -> 640x480 @q75' },
  { src: 'public/printer-closeup.webp',    dst: 'public/printer-closeup-v2.webp',    width: 720, quality: 75, desc: 'printer-closeup 800x500 -> 720x720 @q75' },
  { src: 'public/hero-jersey.webp',        dst: 'public/hero-jersey-v2.webp',        width: 824, quality: 75, desc: 'hero-jersey 800x450 -> 824x824 @q75' },
];

for (const t of tasks) {
  const before = (await fs.stat(t.src)).size;
  const buf = await sharp(t.src)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 6 })
    .toBuffer();
  await fs.writeFile(t.dst, buf);
  const meta = await sharp(buf).metadata();
  const after = buf.length;
  const saved = ((before - after) / 1024).toFixed(1);
  console.log(`${t.desc}`);
  console.log(`  ${before} -> ${after} bytes (${meta.width}x${meta.height})  saved ${saved} KiB`);
}
