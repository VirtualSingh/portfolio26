// One-off: shrink the five project-cover PNGs into 1600x1000 WebP so the
// Projects grid ships tens of KB per cover instead of hundreds. Crop from
// the top edge so each screenshot's page header survives the trim.
import { stat, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

// Only the five project covers — nothing else in public/images is touched.
const covers = ['ngxecharts.png', 'portfolio3.png', 'portfolio4.png', 'myprint.png', 'tnt.png'];

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const done = [];
for (const name of covers) {
  const src = join(dir, name);
  const out = src.replace(/\.png$/, '.webp');
  const before = (await stat(src)).size;
  await sharp(src)
    .resize(1600, 1000, { fit: 'cover', position: 'top' })
    .webp({ quality: 82 })
    .toFile(out);
  const after = (await stat(out)).size; // throws if the .webp never landed
  console.log(`[optimize-covers] ${name}: ${kb(before)} -> ${kb(after)}`);
  done.push(src);
}

// Sources go only once every cover converted — a mid-run failure leaves
// the originals in place to retry from.
for (const src of done) await unlink(src);
console.log(`[optimize-covers] removed ${done.length} source PNGs`);
