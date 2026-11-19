// Use an installed Playwright package, an explicit path, or the existing npx cache.
const fs = require('fs');
const path = require('path');
const os = require('os');
function load() {
  const explicit = process.env.PLAYWRIGHT_MODULE || process.env.PLAYWRIGHT_PATH;
  if (explicit) return require(explicit);
  try { return require('playwright'); } catch {}
  const cache = path.join(os.homedir(), '.npm', '_npx');
  if (fs.existsSync(cache)) {
    for (const entry of fs.readdirSync(cache)) {
      const candidate = path.join(cache, entry, 'node_modules', 'playwright');
      if (fs.existsSync(path.join(candidate, 'package.json'))) return require(candidate);
    }
  }
  throw new Error('Install Playwright or set PLAYWRIGHT_MODULE to an existing Playwright module path.');
}
module.exports = load();
