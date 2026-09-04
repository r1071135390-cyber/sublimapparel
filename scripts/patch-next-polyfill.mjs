/**
 * Patch Next.js's bundled polyfill-module.js into an empty module.
 *
 * Why: Next.js 16 hardcodes `require("../build/polyfills/polyfill-module")`
 * in `client/app-globals.js`, which Turbopack cannot redirect via
 * resolveAlias. The polyfills it provides (Array.prototype.at,
 * Object.fromEntries, Object.hasOwn, etc.) are all Baseline features
 * already supported by every browser in our browserslist
 * (chrome/firefox/edge >=111, safari/ios_saf >=16.4). Replacing the
 * module drops ~13.5 KiB from the initial client bundle on every page.
 *
 * Runs in pnpm postinstall (see package.json). Idempotent.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const TARGET = path.resolve(
  process.cwd(),
  'node_modules/next/dist/build/polyfills/polyfill-module.js'
);

const ORIGINAL_MARKER = 'trimStart"in String.prototype';
const EMPTY_BODY = 'module.exports = {};\n';

try {
  const current = await fs.readFile(TARGET, 'utf8');
  if (current.includes(ORIGINAL_MARKER)) {
    await fs.writeFile(TARGET, EMPTY_BODY);
    console.log('[patch-next-polyfill] Patched polyfill-module.js to empty');
  } else if (current === EMPTY_BODY) {
    console.log('[patch-next-polyfill] Already patched (no-op)');
  } else {
    console.log(
      '[patch-next-polyfill] File content unexpected — leaving untouched:',
      current.slice(0, 80)
    );
  }
} catch (e) {
  if (e.code === 'ENOENT') {
    console.log('[patch-next-polyfill] next not installed yet — skipping');
  } else {
    throw e;
  }
}
