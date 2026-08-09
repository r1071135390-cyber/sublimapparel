// 压缩 8 张 JPG 为 WebP（质量 78，宽度限制 1600px）
// 在沙箱里跑一次即可，构建产物用 webp 文件
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');
const images = [
  'designer-workstation.jpg',
  'fabric-printing.jpg',
  'factory-floor.jpg',
  'heat-press.jpg',
  'hero-jersey.jpg',
  'printer-closeup.jpg',
  'product-lineup.jpg',
  'qc-inspection.jpg',
];

(async () => {
  for (const name of images) {
    const src = path.join(PUBLIC, name);
    const dst = path.join(PUBLIC, name.replace('.jpg', '.webp'));
    const before = fs.statSync(src).size;
    await sharp(src)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(dst);
    const after = fs.statSync(dst).size;
    const ratio = ((1 - after / before) * 100).toFixed(1);
    console.log(
      `${name.padEnd(30)} ${(before / 1024).toFixed(0).padStart(4)}KB → ${(after / 1024).toFixed(0).padStart(4)}KB  (-${ratio}%)`
    );
  }
})();
