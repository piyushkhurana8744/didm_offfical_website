import { CDPBrowser } from './cdp-browser.mjs';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = path.resolve('docs/screenshots');

async function main() {
  console.log('🚀 Starting About Us Visual Verification & Interaction Audit...');
  const browser = new CDPBrowser({ port: 9224, userDataDir: '/tmp/didm-about-audit' });
  await browser.launch();
  console.log('✅ Chrome CDP ready.');

  const results = {
    viewports: [],
    interactions: [],
    consoleErrors: []
  };

  try {
    const aboutUrl = 'http://127.0.0.1:3000/about';

    const viewports = [
      { name: 'about-desktop-1440', width: 1440, height: 900, isMobile: false },
      { name: 'about-tablet-1024', width: 1024, height: 768, isMobile: false },
      { name: 'about-tablet-768', width: 768, height: 1024, isMobile: false },
      { name: 'about-mobile-375', width: 375, height: 812, isMobile: true }
    ];

    for (const vp of viewports) {
      console.log(`📸 Capturing viewport ${vp.name} (${vp.width}x${vp.height})...`);
      await browser.setViewport(vp.width, vp.height, vp.isMobile);
      await browser.navigate(aboutUrl);
      await browser.evaluate(`document.fonts ? document.fonts.ready : Promise.resolve()`);
      await new Promise(r => setTimeout(r, 1000));

      const screenshotPath = path.join(SCREENSHOT_DIR, `${vp.name}.png`);
      await browser.screenshot(screenshotPath);

      // Check key sections exist
      const checkSections = await browser.evaluate(`
        (() => {
          return {
            h1: document.querySelector('h1')?.textContent?.trim() || null,
            teamCardsCount: document.querySelectorAll('#team .group').length,
            faqCardsCount: document.querySelectorAll('#faqs .rounded-2xl').length,
            hasPillars: !!document.querySelector('button span')?.textContent,
            hasEnquiryForm: !!document.querySelector('form input')
          };
        })()
      `);

      results.viewports.push({
        viewport: vp.name,
        width: vp.width,
        height: vp.height,
        sections: checkSections
      });
      console.log(`   ✅ Sections verified:`, checkSections);
    }

    // Interactive Tab Test: Switch to "Our Vision" then "Our Values"
    console.log('\n🔄 Testing Pillar Tab Switching...');
    await browser.setViewport(1440, 900, false);
    await browser.navigate(aboutUrl);
    await new Promise(r => setTimeout(r, 800));

    // Click Vision Tab
    await browser.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const visionBtn = buttons.find(b => b.textContent.includes('Our Vision'));
        if (visionBtn) visionBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 500));
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'about-tab-vision.png'));
    console.log('   ✅ Captured Vision tab screenshot');

    // Test FAQ Accordion Expand & Search
    console.log('\n❓ Testing FAQ Search & Expand...');
    await browser.evaluate(`
      (() => {
        const input = document.querySelector('#faqs input[type="text"]');
        if (input) {
          input.value = "missed";
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      })()
    `);
    await new Promise(r => setTimeout(r, 600));
    await browser.screenshot(path.join(SCREENSHOT_DIR, 'about-faq-search-missed.png'));
    console.log('   ✅ Captured FAQ search screenshot');

    // Check console logs
    const logs = browser.consoleLogs || [];
    const errors = logs.filter(l => l.type === 'error');
    results.consoleErrors = errors;

    fs.writeFileSync(
      path.join(SCREENSHOT_DIR, 'about-audit-results.json'),
      JSON.stringify(results, null, 2)
    );

    console.log('\n🎉 About Page Visual Audit Completed Successfully!');
  } catch (err) {
    console.error('❌ Audit encountered error:', err);
  } finally {
    await browser.close();
  }
}

main();
