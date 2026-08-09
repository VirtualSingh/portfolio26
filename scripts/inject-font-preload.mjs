// Post-build: browsers only discover @font-face files after the stylesheet
// arrives, so the first paint of hero text waits an extra round-trip.
// Preloading the latin Plus Jakarta Sans woff2 from <head> closes that gap.
// Best-effort by design — any miss logs a warning and exits 0, never failing
// the deploy over a font optimisation.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const browserDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'dist',
  'portfolio',
  'browser',
);

function warnAndExit(reason) {
  console.warn(`[inject-font-preload] WARNING: ${reason} — skipping preload injection.`);
  process.exit(0);
}

if (!existsSync(browserDir)) warnAndExit(`build output not found at ${browserDir}`);

// Hashed by the build (styles-XXXX.css); plain styles.css tolerated too.
const cssFiles = readdirSync(browserDir).filter((f) => /^styles(-\w+)?\.css$/.test(f));
if (cssFiles.length === 0) warnAndExit('no styles-*.css in build output');

// The variable font ships one file per unicode-range subset; only the latin
// one (range starts at U+0000) is guaranteed to be fetched on first paint.
let fontUrl = null;
for (const file of cssFiles) {
  const css = readFileSync(join(browserDir, file), 'utf8');
  for (const block of css.match(/@font-face\s*\{[^}]*\}/g) ?? []) {
    if (!block.includes('Plus Jakarta Sans Variable')) continue;
    if (!/unicode-range:[^;}]*U\+0000/i.test(block)) continue;
    const match = block.match(/url\((['"]?)([^'")]+\.woff2)\1\)/);
    if (match) {
      fontUrl = match[2];
      break;
    }
  }
  if (fontUrl) break;
}
if (!fontUrl)
  warnAndExit("no latin 'Plus Jakarta Sans Variable' @font-face with a woff2 url found");

const preload = `<link rel="preload" href="${fontUrl}" as="font" type="font/woff2" crossorigin>`;

// 404.html only exists once the Pages payload step has copied it — fine either
// way, since a copy made after injection carries the preload along.
for (const name of ['index.html', '404.html']) {
  const htmlPath = join(browserDir, name);
  if (!existsSync(htmlPath)) {
    console.log(`[inject-font-preload] ${name} not present, skipped.`);
    continue;
  }
  const html = readFileSync(htmlPath, 'utf8');
  if (html.includes(preload)) {
    console.log(`[inject-font-preload] ${name} already has the preload, skipped.`);
    continue;
  }
  if (!html.includes('</head>')) {
    console.warn(`[inject-font-preload] WARNING: no </head> in ${name}, skipped.`);
    continue;
  }
  writeFileSync(htmlPath, html.replace('</head>', `${preload}</head>`));
  console.log(`[inject-font-preload] injected preload for ${fontUrl} into ${name}`);
}
