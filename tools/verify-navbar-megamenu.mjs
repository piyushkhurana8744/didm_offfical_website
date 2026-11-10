import { CDPBrowser } from './cdp-browser.mjs';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = path.resolve('docs/screenshots');

async function main() {
  console.log('🚀 Starting Comprehensive Navigation & Mega-Menu Visual Audit...');
  const browser = new CDPBrowser({ port: 9225, userDataDir: '/tmp/didm-nav-audit' });
  await browser.launch();
  console.log('✅ Chrome CDP ready.');

  const results = {
    viewports: [],
    megaMenus: [],
    consoleErrors: []
  };

  try {
    const baseUrl = 'http://127.0.0.1:3000';

    // 1. Desktop 1440x900 - Mega-menus
    console.log('\n--- 1. Testing Desktop 1440 Mega-Menus ---');
    await browser.setViewport(1440, 900, false);
    await browser.navigate(baseUrl);
    await new Promise(r => setTimeout(r, 1200));

    // Screenshot default desktop header
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'nav-desktop-1440-default.png'));

    // Trigger Training Mega-Menu
    console.log('Triggering Training Mega-Menu...');
    await browser.evaluate(`
      (() => {
        const links = Array.from(document.querySelectorAll('header nav a'));
        const trainingLink = links.find(a => a.textContent.includes('Training'));
        if (trainingLink) {
          const container = trainingLink.closest('.relative');
          if (container) {
            container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          }
        }
      })()
    `);
    await new Promise(r => setTimeout(r, 600));
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'nav-desktop-1440-training-megamenu.png'));
    console.log('   ✅ Captured Training Mega-Menu screenshot');

    // Trigger Centres Mega-Menu
    console.log('Triggering Centres Mega-Menu...');
    await browser.evaluate(`
      (() => {
        const links = Array.from(document.querySelectorAll('header nav a'));
        const centresLink = links.find(a => a.textContent.includes('Select Centers'));
        if (centresLink) {
          const container = centresLink.closest('.relative');
          if (container) {
            container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          }
        }
      })()
    `);
    await new Promise(r => setTimeout(r, 600));
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'nav-desktop-1440-centres-megamenu.png'));
    console.log('   ✅ Captured Centres Mega-Menu screenshot');

    // Trigger About Us Dropdown
    console.log('Triggering About Us Dropdown...');
    await browser.evaluate(`
      (() => {
        const links = Array.from(document.querySelectorAll('header nav a'));
        const aboutLink = links.find(a => a.textContent.includes('About Us'));
        if (aboutLink) {
          const container = aboutLink.closest('.relative');
          if (container) {
            container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          }
        }
      })()
    `);
    await new Promise(r => setTimeout(r, 600));
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'nav-desktop-1440-about-dropdown.png'));
    console.log('   ✅ Captured About Us Dropdown screenshot');

    // Trigger Resources Mega-Menu
    console.log('Triggering Resources Mega-Menu...');
    await browser.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('header nav button'));
        const resBtn = buttons.find(b => b.textContent.includes('Resources'));
        if (resBtn) {
          const container = resBtn.closest('.relative');
          if (container) {
            container.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          }
        }
      })()
    `);
    await new Promise(r => setTimeout(r, 600));
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'nav-desktop-1440-resources-megamenu.png'));
    console.log('   ✅ Captured Resources Mega-Menu screenshot');

    // 2. Desktop 1280x800
    console.log('\n--- 2. Testing Desktop 1280 Viewport ---');
    await browser.setViewport(1280, 800, false);
    await browser.navigate(baseUrl);
    await new Promise(r => setTimeout(r, 800));
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'nav-desktop-1280.png'));
    console.log('   ✅ Captured Desktop 1280 screenshot');

    // 3. Tablet 768x1024
    console.log('\n--- 3. Testing Tablet 768 Viewport & Mobile Drawer ---');
    await browser.setViewport(768, 1024, false);
    await browser.navigate(baseUrl);
    await new Promise(r => setTimeout(r, 800));

    // Click Hamburger Menu
    await browser.evaluate(`
      (() => {
        const btn = document.querySelector('button[aria-label="Toggle navigation drawer"]');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 600));
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'nav-tablet-768-drawer.png'));
    console.log('   ✅ Captured Tablet 768 Drawer screenshot');

    // 4. Mobile 390x844
    console.log('\n--- 4. Testing Mobile 390 Viewport & Accordion Expand ---');
    await browser.setViewport(390, 844, true);
    await browser.navigate(baseUrl);
    await new Promise(r => setTimeout(r, 800));

    // Open hamburger
    await browser.evaluate(`
      (() => {
        const btn = document.querySelector('button[aria-label="Toggle navigation drawer"]');
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 500));

    // Expand Training Accordion
    await browser.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const trainingBtn = buttons.find(b => b.textContent.includes('Training Programs'));
        if (trainingBtn) trainingBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 500));
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'nav-mobile-390-drawer-accordion.png'));
    console.log('   ✅ Captured Mobile 390 Accordion screenshot');

    results.consoleErrors = browser.consoleLogs.filter(l => l.type === 'error');
    fs.writeFileSync(
      path.join(SCREENSHOT_DIR, 'nav-audit-results.json'),
      JSON.stringify(results, null, 2)
    );

    console.log('\n🎉 Mega-Menu Visual Audit Completed Successfully!');
  } catch (err) {
    console.error('❌ Nav audit error:', err);
  } finally {
    await browser.close();
  }
}

main();

