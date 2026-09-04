/**
 * Resize & recompress hero/asset images PageSpeed flagged.
 * Run once after adding a new image to /public, or whenever
 * PageSpeed reports oversized images.
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';

const tasks = [
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
