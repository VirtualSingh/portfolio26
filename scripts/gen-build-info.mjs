// Pre-build: stamps the UTC run date into a generated module so the footer
// can say "updated <Mon YYYY>" from a constant — no Date logic at render
// time, so the prerendered HTML and the hydrated app always agree.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const target = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'app',
  'core',
  'build-info.ts',
);

// UTC, not local: the same commit built anywhere stamps the same date.
const buildDate = new Date().toISOString().slice(0, 10);

const content = `/** Generated at build time by scripts/gen-build-info.mjs - do not edit by hand. */
export const BUILD_DATE = '${buildDate}';
`;

writeFileSync(target, content);
console.log(`[gen-build-info] wrote BUILD_DATE = '${buildDate}' to ${target}`);
