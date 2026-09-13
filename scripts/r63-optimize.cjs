// R63 image optimizer — full round-trip via temp dir to avoid
// the VFS-layer write race on the workspace drive.
const path = require("node:path");
const fs = require("node:fs/promises");
const os = require("node:os");
const sharp = require(
  path.join(
    process.env.TEMP || "C:\\Users\\Administrator\\AppData\\Local\\Temp",
    "sharp-standalone",
    "node_modules",
    "sharp"
  )
);

const ROOT = "C:\\Users\\Administrator\\.trae-cn\\work\\6a9d25e18218ab0836ada44c\\sublimapparel-src";

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

async function processOne(t, isExtra, tmpDir) {
  const srcAbs = path.join(ROOT, isExtra ? t.src : t.file);
  const before = (await fs.stat(srcAbs)).size;
  const buf = await sharp(srcAbs)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 6 })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  const dstAbs = path.join(ROOT, t.out || t.file);
  // Write to a temp file next to the destination, then unlink
  // the original, then rename. The VFS rejects atomic rename over
  // an existing file so the unlink has to happen first.
  const tmpSibling = dstAbs + ".r63tmp";
  const handle = await fs.open(tmpSibling, "w");
  try {
    await handle.writeFile(buf);
  } finally {
    await handle.close();
  }
  try {
    await fs.unlink(dstAbs);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  await fs.rename(tmpSibling, dstAbs);
  const after = buf.length;
  const saved = ((before - after) / 1024).toFixed(1);
  console.log(
    `${t.desc}\n  ${before} -> ${after} bytes (${meta.width}x${meta.height})  saved ${saved} KiB -> ${t.out || t.file}`
  );
  return { before, after };
}

(async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "r63-img-"));
  let totalBefore = 0;
  let totalAfter = 0;
  for (const t of tasks) {
    const { before, after } = await processOne(t, false, tmpDir);
    totalBefore += before;
    totalAfter += after;
  }
  for (const t of extraTasks) {
    const { before, after } = await processOne(t, true, tmpDir);
    totalBefore += before;
    totalAfter += after;
  }
  console.log(
    `\n=== TOTAL: ${totalBefore} -> ${totalAfter} bytes, saved ${((totalBefore - totalAfter) / 1024).toFixed(1)} KiB ===`
  );
  console.log(`Temp dir: ${tmpDir}`);
  await fs.rm(tmpDir, { recursive: true, force: true });
})();
