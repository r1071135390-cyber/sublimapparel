// scripts/icon-to-ico.mjs — generate multi-resolution favicon.ico from a PNG
//
// Pure Node implementation: PNG decoder + nearest-neighbour downscale +
// ICO writer. No native deps, no sharp, no ImageMagick. Works on every
// machine that has Node 18+.
//
// Usage:
//   node scripts/icon-to-ico.mjs <input.png> <output.ico>
//
// Notes:
//   - Input PNG must be 8-bit RGB or RGBA. We don't support 16-bit, palette
//     PNGs, or interlacing (none of which the brand logo uses).
//   - Output ICO bundles 16, 32, 48, 64, 128, 256 px square sub-images.
//     For each size we emit a PNG entry — modern browsers and OSes all
//     read PNG-encoded ICO entries.

import fs from "node:fs";
import zlib from "node:zlib";

const SRC = process.argv[2];
const OUT = process.argv[3];
if (!SRC || !OUT) {
  console.error("usage: node scripts/icon-to-ico.mjs <input.png> <output.ico>");
  process.exit(1);
}

// CRC32 table for PNG chunks (polynomial 0xEDB88320, reflected).
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

const buf = fs.readFileSync(SRC);
const img = decodePng(buf);
console.log(
  `decoded ${SRC}: ${img.width}x${img.height} ${img.channels === 4 ? "RGBA" : "RGB"}`,
);

const sizes = [16, 32, 48, 64, 128, 256];
const entries = [];
for (const s of sizes) {
  const downscaled = resizeNearest(img, s, s);
  const png = encodePng(downscaled);
  entries.push({ size: s, png });
  console.log(`  ${s}x${s} -> ${png.length} bytes`);
}

const ico = buildIco(entries);
fs.writeFileSync(OUT, ico);
console.log(`Wrote ${OUT} (${ico.length} bytes)`);

// ─── PNG decoder ──────────────────────────────────────────────────────────

function decodePng(buffer) {
  const sig = [137, 80, 78, 71, 13, 10, 26, 10];
  for (let i = 0; i < sig.length; i++) {
    if (buffer[i] !== sig[i]) throw new Error("not a PNG");
  }

  let pos = 8;
  let width = 0,
    height = 0,
    bitDepth = 0,
    colorType = 0;
  const idatChunks = [];
  while (pos < buffer.length) {
    const length = buffer.readUInt32BE(pos);
    pos += 4;
    const type = buffer.toString("ascii", pos, pos + 4);
    pos += 4;
    const data = buffer.subarray(pos, pos + length);
    pos += length + 4; // skip CRC

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data.readUInt8(8);
      colorType = data.readUInt8(9);
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }
  }

  if (bitDepth !== 8) throw new Error(`unsupported bit depth ${bitDepth}`);
  const channels =
    colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 0 ? 1 : null;
  if (channels === null) throw new Error(`unsupported color type ${colorType}`);

  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const stride = width * channels;
  const pixels = Buffer.alloc(stride * height);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const rowStart = y * (stride + 1) + 1;
    const dstStart = y * stride;
    for (let x = 0; x < stride; x++) {
      const cur = raw[rowStart + x];
      const left = x >= channels ? pixels[dstStart + x - channels] : 0;
      const up = y > 0 ? pixels[dstStart - stride + x] : 0;
      const upLeft =
        x >= channels && y > 0 ? pixels[dstStart - stride + x - channels] : 0;
      let val = 0;
      switch (filter) {
        case 0:
          val = cur;
          break;
        case 1:
          val = (cur + left) & 0xff;
          break;
        case 2:
          val = (cur + up) & 0xff;
          break;
        case 3:
          val = (cur + ((left + up) >> 1)) & 0xff;
          break;
        case 4: {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          let pred;
          if (pa <= pb && pa <= pc) pred = left;
          else if (pb <= pc) pred = up;
          else pred = upLeft;
          val = (cur + pred) & 0xff;
          break;
        }
        default:
          throw new Error(`unknown filter ${filter}`);
      }
      pixels[dstStart + x] = val;
    }
  }

  return { width, height, channels, pixels };
}

// ─── Resize (nearest-neighbour) ──────────────────────────────────────────

function resizeNearest(src, newW, newH) {
  const dst = Buffer.alloc(newW * newH * src.channels);
  const xRatio = src.width / newW;
  const yRatio = src.height / newH;
  for (let y = 0; y < newH; y++) {
    const srcY = Math.min(src.height - 1, Math.floor(y * yRatio));
    for (let x = 0; x < newW; x++) {
      const srcX = Math.min(src.width - 1, Math.floor(x * xRatio));
      for (let c = 0; c < src.channels; c++) {
        dst[(y * newW + x) * src.channels + c] =
          src.pixels[(srcY * src.width + srcX) * src.channels + c];
      }
    }
  }
  return { width: newW, height: newH, channels: src.channels, pixels: dst };
}

// ─── PNG encoder (8-bit RGB/RGBA, no interlace) ──────────────────────────

function encodePng(img) {
  const channels = img.channels;
  const stride = img.width * channels;
  const filtered = Buffer.alloc((stride + 1) * img.height);
  for (let y = 0; y < img.height; y++) {
    filtered[y * (stride + 1)] = 0;
    img.pixels.copy(filtered, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const compressed = zlib.deflateSync(filtered);

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(img.width, 0);
  ihdr.writeUInt32BE(img.height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(channels === 4 ? 6 : 2, 9);
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  const iend = Buffer.alloc(0);

  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", compressed),
    chunk("IEND", iend),
  ]);
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])) >>> 0, 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

// ─── ICO writer ──────────────────────────────────────────────────────────

function buildIco(entries) {
  const count = entries.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const headerAndDir = headerSize + dirEntrySize * count;

  let cursor = headerAndDir;
  const withOffsets = entries.map((e) => {
    const off = cursor;
    cursor += e.png.length;
    return { ...e, offset: off };
  });

  const out = Buffer.alloc(cursor);
  let p = 0;
  out.writeUInt16LE(0, p); p += 2;
  out.writeUInt16LE(1, p); p += 2;
  out.writeUInt16LE(count, p); p += 2;

  for (const e of withOffsets) {
    const sz = e.size >= 256 ? 0 : e.size;
    out.writeUInt8(sz, p); p += 1;
    out.writeUInt8(sz, p); p += 1;
    out.writeUInt8(0, p); p += 1;
    out.writeUInt8(0, p); p += 1;
    out.writeUInt16LE(1, p); p += 2;
    out.writeUInt16LE(32, p); p += 2;
    out.writeUInt32LE(e.png.length, p); p += 4;
    out.writeUInt32LE(e.offset, p); p += 4;
  }
  for (const e of withOffsets) {
    e.png.copy(out, e.offset);
  }
  return out;
}
