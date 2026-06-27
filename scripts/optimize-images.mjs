/**
 * optimize-images.mjs — Local image optimization (run with `npm run images`).
 *
 * Generates web-optimized derivatives WITHOUT overwriting the source PNGs:
 *   - public/ brand assets  -> .webp (logos, badge, watermarks) + favicon + og-image
 *   - src/assets/projetos/* -> <name>.webp (display) + <name>-thumb.webp (gallery strip)
 *
 * Runs locally only (kept out of the Vercel build) so deploys stay light and
 * deterministic. Re-run whenever a source PNG changes. See CLAUDE.md.
 */
import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const PROJ = join(ROOT, 'src', 'assets', 'projetos');

// Brand cream canvas (institutional --cream #e5e4d9) for the social card.
const CREAM = { r: 0xe5, g: 0xe4, b: 0xd9, alpha: 1 };

function kb(file) {
  return `${(statSync(file).size / 1024).toFixed(0)}KB`.padStart(8);
}
function log(file) {
  console.log(kb(file), '  ', file.slice(ROOT.length + 1).replace(/\\/g, '/'));
}

// --- 1. Brand assets in public/ -------------------------------------------
// Each entry: source PNG + max bounding box (keeps aspect ratio, never enlarges).
const brand = [
  { in: 'logo-horizontal-verde-escuro.png', max: 600, q: 86 },
  { in: 'logo-horizontal-branco.png', max: 600, q: 86 },
  { in: 'badge-verde-creme.png', max: 440, q: 84 },
  { in: 'simbolo-verde.png', max: 520, q: 84 },
  { in: 'simbolo-creme.png', max: 520, q: 84 },
];

for (const b of brand) {
  const dest = join(PUBLIC, b.in.replace(/\.png$/, '.webp'));
  await sharp(join(PUBLIC, b.in))
    .resize({ width: b.max, height: b.max, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: b.q })
    .toFile(dest);
  log(dest);
}

// Dedicated favicon (the 197KB símbolo PNG was being used as the icon).
const favicon = join(PUBLIC, 'favicon-48.png');
await sharp(join(PUBLIC, 'simbolo-verde.png'))
  .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(favicon);
log(favicon);

// Dedicated 1200x630 social card (og:image / twitter:image): horizontal logo on cream.
const ogLogo = await sharp(join(PUBLIC, 'logo-horizontal-verde-escuro.png'))
  .resize({ width: 760, fit: 'inside' })
  .toBuffer();
const og = join(PUBLIC, 'og-image.png');
await sharp({ create: { width: 1200, height: 630, channels: 3, background: CREAM } })
  .composite([{ input: ogLogo, gravity: 'center' }])
  .png({ compressionLevel: 9 })
  .toFile(og);
log(og);

// --- 2. Project photos in src/assets/projetos ------------------------------
function walk(dir) {
  let out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.png')) out.push(p);
  }
  return out;
}

for (const png of walk(PROJ)) {
  const base = png.replace(/\.png$/, '');
  // Display variant: native size capped at 1280w (carousel renders < 900px wide).
  await sharp(png)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(`${base}.webp`);
  log(`${base}.webp`);
  // Gallery thumbnail (rendered at 64px, 16:9 cover).
  await sharp(png)
    .resize({ width: 240, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(`${base}-thumb.webp`);
  log(`${base}-thumb.webp`);
}

console.log('\nDone.');
