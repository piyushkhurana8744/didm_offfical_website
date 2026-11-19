const { chromium } = require('./playwright-runtime.cjs');
const fs = require('node:fs');
const routes = ['/', '/programs/master-in-digital-marketing-course', '/programs/advanced-digital-marketing-course', '/programs/online-digital-marketing-course', '/about', '/centres/rajouri-garden', '/outcomes', '/trainers', '/stories', '/media-coverage', '/news-and-events', '/contact'];
(async () => {
  fs.mkdirSync('docs/ui-restoration/before/pages', { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const results = [];
  for (const route of routes) {
    const response = await page.goto('http://localhost:3005' + route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1300);
    await page.screenshot({ path: `docs/ui-restoration/before/pages/${route.replaceAll('/', '_') || 'home'}.png` });
    results.push({ route, status: response.status(), h1: await page.locator('h1').allTextContents() });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'docs/ui-restoration/before/pages/mobile.png' });
  fs.writeFileSync('docs/ui-restoration/before/pages/results.json', JSON.stringify(results, null, 2));
  console.log(results);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
