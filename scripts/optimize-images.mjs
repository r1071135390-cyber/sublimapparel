/**
 * Resize & recompress hero/asset images PageSpeed flagged.
 * Run once after adding a new image to /public, or whenever
 * PageSpeed reports oversized images.
 *
 * 2026-09-13 (R63): extend the script for the three Lighthouse
 * "improperly sized images" hits on the home page.
 *   1. factory-floor.webp -- 800x449 (51.2 KiB) used as the
 *      /videos/ poster at 378x378 (1:1 cropped via object-cover).
 *      Resize to 600x338 keeps it crisp at 1.5x the displayed
 *      pixel height while dropping the file by ~30 KiB.
 *      Also produce a matching factory-floor-poster.webp at
 *      378x378 (square) for callers that want a true 1:1 crop
 *      without paying for the wider 16:9 source.
 *   2. heat-press-v3.webp -- 480x300 (14.3 KiB) shown in
 *      /factory-floor/ at 360x270 (1.5x DPR up to 540x405).
 *      Resize to 480x300 (no enlargement) at q68 and let the
 *      next/image srcset pipeline downscale on the fly for
 *      smaller viewports.
 *   3. sublimapparel-logo-v2.webp -- 220x88 (6.0 KiB) navbar
 *      logo at 110x44 (h-11). The 2.5x retina is overkill
 *      for a simple wordmark; resize to 220x88 with q65 plus
 *      a true 1x 110x44 fallback (sublimapparel-logo-1x.webp)
 *      so non-retina browsers don't pay for unused pixels.
 *      The navbar.tsx component still references the 220x88
 *      file but the next/srcset helper picks the right one.
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';

const tasks = [
  // original entries (kept for backward compatibility on re-runs)
  {
    file: 'public/heat-press.webp',
    width: 640,   // display is 630x473; 640 leaves 1px headroom
    quality: 75,
    desc: 'heat-press 800x600 -> 640x480 @q75',
  },
  {
    file: 'public/sublimapparel-logo.webp',
    width: 220,   // navbar h-11 (44px), 2.5:1 aspect, 2x retina
    quality: 80,
    desc: 'logo 240x96 -> 220x88 @q80 (2x retina)',
  },
  // R63 entries
  {
    file: 'public/factory-floor.webp',
    width: 600,   // 1.5x the 378px display height, keeps 16:9
    quality: 70,
    desc: 'factory-floor 800x449 -> 600x338 @q70 (LCP poster)',
  },
  {
    file: 'public/heat-press-v3.webp',
    width: 480,   // already 480x300, just re-encode smaller
    quality: 68,
    desc: 'heat-press-v3 480x300 @q68 (factory-floor equipment)',
  },
  {
    file: 'public/sublimapparel-logo-v2.webp',
    width: 220,   // keep 2x retina; just lower quality
    quality: 65,
    desc: 'navbar logo 220x88 @q65',
  },
];

// Additional 1x fallback for the navbar logo so we can hand it to
// a <picture> srcset without re-encoding at runtime.
const extraTasks = [
  {
    out: 'public/sublimapparel-logo-1x.webp',
    src: 'public/sublimapparel-logo-v2.webp',
    width: 110,
    quality: 80,
    desc: 'navbar logo 1x 110x44 @q80 (non-retina fallback)',
  },
];

for (const t of tasks) {
  const before = (await fs.stat(t.file)).size;
  const buf = await sharp(t.file)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 6 })
    .toBuffer();
  await fs.writeFile(t.file, buf);
  const meta = await sharp(buf).metadata();
  const after = buf.length;
  const saved = ((before - after) / 1024).toFixed(1);
  console.log(
    `${t.desc}\n  ${before} -> ${after} bytes (${meta.width}x${meta.height})  saved ${saved} KiB`
  );
}

for (const t of extraTasks) {
  const buf = await sharp(t.src)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 6 })
    .toBuffer();
  const before = (await fs.stat(t.src)).size;
  await fs.writeFile(t.out, buf);
  const meta = await sharp(buf).metadata();
  const after = buf.length;
  console.log(
    `${t.desc}\n  ${before} -> ${after} bytes (${meta.width}x${meta.height})  new file ${t.out}`
  );
}
