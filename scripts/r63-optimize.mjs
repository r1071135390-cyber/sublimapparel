// Wrapper script for optimize-images that resolves sharp via
// the pnpm .pnpm store. This is a workaround for the project
// using `only-allow pnpm` + non-hoisted modules.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("sharp");
const { promises: fs } = require("node:fs");

const tasks = [
  {
    file: "public/factory-floor.webp",
    width: 600,
    quality: 70,
    desc: "factory-floor 800x449 -> 600x338 @q70 (LCP poster)",
  },
  {
    file: "public/heat-press-v3.webp",
    width: 480,
    quality: 68,
    desc: "heat-press-v3 480x300 @q68 (factory-floor equipment)",
  },
  {
    file: "public/sublimapparel-logo-v2.webp",
    width: 220,
    quality: 65,
    desc: "navbar logo 220x88 @q65",
  },
];

const extraTasks = [
  {
    out: "public/sublimapparel-logo-1x.webp",
    src: "public/sublimapparel-logo-v2.webp",
    width: 110,
    quality: 80,
    desc: "navbar logo 1x 110x44 @q80 (non-retina fallback)",
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
