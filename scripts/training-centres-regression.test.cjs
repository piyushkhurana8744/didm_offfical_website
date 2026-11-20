const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('../apps/web/node_modules/typescript');

// Hook TypeScript compilation into Node CJS loader
require.extensions['.ts'] = function (module, filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
  }).outputText;
  module._compile(compiled, filename);
};

// Hook path resolution for '@/...' aliases and extensionless TS imports
const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  let target = request;
  if (target.startsWith('@/')) {
    target = path.resolve('apps/web/src', target.slice(2));
  }

  // Check extensionless ts or directory index.ts
  const candidates = [
    target,
    target + '.ts',
    target + '.tsx',
    path.join(target, 'index.ts'),
    path.join(target, 'index.tsx'),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c) && !fs.statSync(c).isDirectory()) {
      return originalResolveFilename.call(this, c, parent, isMain, options);
    }
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

const { CANONICAL_CENTRES } = require(path.resolve('apps/web/src/data/didm-centres-canonical.ts'));
const { getAllCentres, getCentreBySlug } = require(path.resolve('apps/web/src/lib/content/index.ts'));

test('canonical centres contains all required physical branches, virtual campus, and review centres', () => {
  assert.ok(CANONICAL_CENTRES.length >= 14, `Expected at least 14 centres, found ${CANONICAL_CENTRES.length}`);
  const slugs = CANONICAL_CENTRES.map((c) => c.slug);
  const requiredPhysicalSlugs = [
    'dwarka',
    'satya-niketan',
    'noida',
    'gurgaon',
    'kalkaji',
    'pitampura',
    'preet-vihar',
    'rajouri-garden',
    'south-extension',
    'haldwani-rudarpur',
    'dehradun',
    'varanasi',
  ];

  for (const s of requiredPhysicalSlugs) {
    assert.ok(slugs.includes(s), `Missing required physical centre slug: ${s}`);
  }
});

test('Noida centre is grounded in Sector 18 (Savitri Market), not Sector 62 or Film City', () => {
  const noida = CANONICAL_CENTRES.find((c) => c.id === 'noida' || c.slug === 'noida');
  assert.ok(noida, 'Noida centre must exist');
  assert.match(noida.address, /Sector\s*18/i, 'Noida address must specify Sector 18');
  assert.match(noida.address, /Savitri Market/i, 'Noida address must specify Savitri Market');
  assert.doesNotMatch(noida.address, /Sector\s*62/i, 'Noida address must NOT be Sector 62');
  assert.doesNotMatch(noida.address, /Film City/i, 'Noida address must NOT be older Film City');
  assert.equal(noida.postalCode, '201301');
});

test('Preet Vihar centre is grounded in Plot 4 Metro Pillar 100, not older 3rd-floor / pillar 99', () => {
  const preetVihar = CANONICAL_CENTRES.find((c) => c.id === 'preet-vihar' || c.slug === 'preet-vihar');
  assert.ok(preetVihar, 'Preet Vihar centre must exist');
  assert.match(preetVihar.address, /Plot\s*No\.?\s*4/i, 'Preet Vihar must be Plot No. 4');
  assert.match(preetVihar.address, /1st Floor/i, 'Preet Vihar must be 1st Floor');
  assert.match(preetVihar.address, /Pillar\s*(?:No\.?)?\s*100/i, 'Preet Vihar must reference Metro Pillar 100');
  assert.doesNotMatch(preetVihar.address, /Pillar\s*(?:No\.?)?\s*99/i, 'Preet Vihar must NOT reference Pillar 99');
  assert.doesNotMatch(preetVihar.address, /3rd Floor/i, 'Preet Vihar must NOT reference 3rd floor');
  assert.equal(preetVihar.postalCode, '110092');
});

test('Haldwani centre has valid 6-digit PIN 263139, resolving invalid 7-digit 2631390', () => {
  const haldwani = CANONICAL_CENTRES.find(
    (c) => c.id === 'haldwani' || c.slug === 'haldwani-rudarpur' || c.aliases.includes('haldwani')
  );
  assert.ok(haldwani, 'Haldwani centre must exist');
  assert.equal(haldwani.postalCode, '263139');
  assert.notEqual(haldwani.postalCode, '2631390', 'Must not have invalid 7-digit PIN');
  assert.match(haldwani.address, /263139\b/);
  assert.doesNotMatch(haldwani.address, /2631390/);
});

test('Dehradun centre retains official 248001 PIN', () => {
  const dehradun = CANONICAL_CENTRES.find((c) => c.id === 'dehradun' || c.slug === 'dehradun');
  assert.ok(dehradun, 'Dehradun centre must exist');
  assert.equal(dehradun.postalCode, '248001');
});

test('Varanasi centre retains official 221010 PIN', () => {
  const varanasi = CANONICAL_CENTRES.find((c) => c.id === 'varanasi' || c.slug === 'varanasi');
  assert.ok(varanasi, 'Varanasi centre must exist');
  assert.equal(varanasi.postalCode, '221010');
});

test('Mumbai and Jaipur are marked review_needed and not claimed as unconditionally verified', () => {
  const mumbai = CANONICAL_CENTRES.find((c) => c.slug === 'mumbai');
  const jaipur = CANONICAL_CENTRES.find((c) => c.slug === 'jaipur');
  assert.ok(mumbai, 'Mumbai entry must exist');
  assert.ok(jaipur, 'Jaipur entry must exist');
  assert.equal(mumbai.centerStatus, 'review_needed');
  assert.equal(jaipur.centerStatus, 'review_needed');
});

test('DIDM Online is marked as virtual and not treated as a physical training centre', () => {
  const online = CANONICAL_CENTRES.find((c) => c.id === 'online' || c.slug === 'online');
  assert.ok(online, 'Online centre entry must exist');
  assert.equal(online.centerStatus, 'virtual');
  assert.notEqual(online.isHeadOffice, true, 'Online campus must not be designated as Head Office');
});

test('All physical centres have verified 6-digit Indian PIN codes', () => {
  const physicalCentres = CANONICAL_CENTRES.filter((c) => c.centerStatus === 'active');
  for (const c of physicalCentres) {
    assert.ok(c.postalCode, `Centre ${c.name} missing postalCode`);
    assert.match(c.postalCode, /^[1-9][0-9]{5}$/, `Centre ${c.name} has invalid PIN: ${c.postalCode}`);
  }
});

test('All active physical centres have valid directions URLs and Google Maps embed URLs', () => {
  const physicalCentres = CANONICAL_CENTRES.filter((c) => c.centerStatus === 'active');
  for (const c of physicalCentres) {
    assert.ok(c.directionsUrl, `Centre ${c.name} missing directionsUrl`);
    assert.match(c.directionsUrl, /^https?:\/\//, `Centre ${c.name} directionsUrl must be HTTP/HTTPS: ${c.directionsUrl}`);
    assert.ok(c.mapEmbedUrl, `Centre ${c.name} missing mapEmbedUrl`);
    assert.match(c.mapEmbedUrl, /output=embed/, `Centre ${c.name} mapEmbedUrl must include output=embed`);
  }
});

test('getAllCentres and getCentreBySlug export canonical verified data', () => {
  const all = getAllCentres();
  assert.ok(all.length >= 14);

  const noida = getCentreBySlug('noida');
  assert.ok(noida);
  assert.match(noida.address, /Sector\s*18/i);
  assert.equal(noida.postalCode, '201301');

  const preetVihar = getCentreBySlug('preet-vihar');
  assert.ok(preetVihar);
  assert.match(preetVihar.address, /Plot\s*No\.?\s*4/i);
});

test('Navigation configuration does not contain stale Noida Sector 62', () => {
  const navContent = fs.readFileSync('apps/web/src/config/site-navigation.ts', 'utf8');
  assert.doesNotMatch(navContent, /Sector\s*62/i, 'site-navigation.ts must not have Sector 62');
  assert.match(navContent, /Sector\s*18/i, 'site-navigation.ts must reference Sector 18');
});
