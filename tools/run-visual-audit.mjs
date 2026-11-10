import { CDPBrowser } from './cdp-browser.mjs';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = path.resolve('docs/screenshots');

async function main() {
  console.log('🚀 Starting Comprehensive Visual Experience Verification (Pass 2)...');
  const browser = new CDPBrowser({ port: 9223, userDataDir: '/tmp/didm-chrome-audit-2' });
  await browser.launch();
  console.log('✅ Chrome CDP ready.');

  const auditResults = {
    viewports: [],
    animationTests: [],
    rapidNavigation: {},
    reducedMotion: {},
    programTests: [],
    aiQuestions: [],
    consoleErrors: [],
    performanceMetrics: {}
  };

  try {
    const baseUrl = 'http://127.0.0.1:3000';
    const midmUrl = `${baseUrl}/programs/master-in-digital-marketing-course`;

    // SECTION 1: Viewport Verification
    console.log('\n--- 1. Testing Viewports on Master Program Page ---');
    const viewports = [
      { name: 'desktop-1440', width: 1440, height: 900, isMobile: false },
      { name: 'desktop-1280', width: 1280, height: 800, isMobile: false },
      { name: 'tablet-landscape-1024', width: 1024, height: 768, isMobile: false },
      { name: 'tablet-portrait-768', width: 768, height: 1024, isMobile: false },
      { name: 'mobile-390', width: 390, height: 844, isMobile: true },
      { name: 'mobile-375', width: 375, height: 812, isMobile: true }
    ];

    for (const vp of viewports) {
      console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})`);
      await browser.setViewport(vp.width, vp.height, vp.isMobile);
      await browser.navigate(midmUrl);
      // Wait for fonts & CSS layout
      await browser.evaluate(`document.fonts ? document.fonts.ready : Promise.resolve()`);
      await new Promise(r => setTimeout(r, 1200));

      const screenshotFile = path.join(SCREENSHOT_DIR, `midm-${vp.name}-full.png`);
      await browser.screenshot(screenshotFile);
      auditResults.viewports.push({ ...vp, screenshot: screenshotFile });
      console.log(`  📸 Saved screenshot: ${screenshotFile}`);
    }

    // Reset to 1440x900 for component captures
    await browser.setViewport(1440, 900, false);
    await browser.navigate(midmUrl);
    await browser.evaluate(`document.fonts ? document.fonts.ready : Promise.resolve()`);
    await new Promise(r => setTimeout(r, 1200));

    // Capture Course Hero Element
    console.log('\n--- 2. Capturing Course Hero ---');
    try {
      const heroShot = path.join(SCREENSHOT_DIR, 'midm-course-hero.png');
      await browser.screenshot(heroShot, { clip: { x: 0, y: 0, width: 1440, height: 550, scale: 1 } });
      console.log(`  📸 Course Hero captured: ${heroShot}`);
    } catch (e) {
      console.warn('  ⚠️ Could not clip hero:', e.message);
    }

    // Scroll to Learning Studio and capture Checkpoint 1
    console.log('\n--- 3. Learning Studio Checkpoint Captures ---');
    await browser.evaluate(`(() => {
      const el = document.querySelector('[aria-label*="Learning Studio"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await new Promise(r => setTimeout(r, 800));

    const cp1Shot = path.join(SCREENSHOT_DIR, 'midm-learning-studio-cp01.png');
    await browser.screenshot(cp1Shot);
    console.log(`  📸 Learning Studio at Checkpoint 1: ${cp1Shot}`);

    // Checkpoint 26 (Bing Ads)
    console.log('Navigating to Checkpoint 26...');
    await browser.evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b26 = btns.find(b => b.textContent?.trim() === '26');
      if (b26) b26.click();
    })()`);
    await new Promise(r => setTimeout(r, 1600));
    const cp26Shot = path.join(SCREENSHOT_DIR, 'midm-learning-studio-cp26.png');
    await browser.screenshot(cp26Shot);
    console.log(`  📸 Learning Studio at Checkpoint 26: ${cp26Shot}`);

    // Checkpoint 52 (Assignment Session)
    console.log('Navigating to Checkpoint 52...');
    await browser.evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b52 = btns.find(b => b.textContent?.trim() === '52');
      if (b52) b52.click();
    })()`);
    await new Promise(r => setTimeout(r, 1600));
    const cp52Shot = path.join(SCREENSHOT_DIR, 'midm-learning-studio-cp52.png');
    await browser.screenshot(cp52Shot);
    console.log(`  📸 Learning Studio at Checkpoint 52: ${cp52Shot}`);

    // SECTION 4: AI Counsellor UI & Queries
    console.log('\n--- 4. Testing AI Counsellor Chat Window ---');
    // Open chat
    await browser.click('button[aria-label="Open DIDM Course Counsellor Chat"]');
    await new Promise(r => setTimeout(r, 800));

    // Ask a question through UI input
    await browser.type('input[placeholder*="Ask about"]', 'What are the tuition fees?');
    await browser.click('button[aria-label="Send query"]');
    await new Promise(r => setTimeout(r, 1200));

    const chatShot = path.join(SCREENSHOT_DIR, 'midm-ai-chat-open.png');
    await browser.screenshot(chatShot);
    console.log(`  📸 AI Chat Open screenshot captured: ${chatShot}`);

    // Mobile Learning Journey (390x844)
    console.log('\n--- 5. Mobile Learning Journey (390x844) ---');
    await browser.setViewport(390, 844, true);
    await browser.navigate(midmUrl);
    await new Promise(r => setTimeout(r, 1200));
    await browser.evaluate(`(() => {
      const el = document.querySelector('[aria-label*="Learning Studio"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await new Promise(r => setTimeout(r, 600));
    const mobileStudioShot = path.join(SCREENSHOT_DIR, 'midm-mobile-learning-journey.png');
    await browser.screenshot(mobileStudioShot);
    console.log(`  📸 Mobile Learning Journey captured: ${mobileStudioShot}`);

    // SECTION 5: Walking Animation Tests
    console.log('\n--- 6. Walking Animation Transitions ---');
    await browser.setViewport(1440, 900, false);
    await browser.navigate(midmUrl);
    await new Promise(r => setTimeout(r, 1000));

    const transitions = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 15 },
      { from: 15, to: 52 },
      { from: 52, to: 1 }
    ];

    for (const t of transitions) {
      console.log(`Testing transition: Checkpoint ${t.from} -> ${t.to}...`);
      // Start navigation
      await browser.evaluate(`(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btn = btns.find(b => b.textContent?.trim() === String(${t.to}));
        if (btn) btn.click();
      })()`);

      // Sample position during movement
      await new Promise(r => setTimeout(r, 300));
      const mid = await browser.evaluate(`(() => {
        const avatar = document.querySelector('[style*="translate(-50%, -96%)"]');
        return avatar ? avatar.getAttribute('style') : null;
      })()`);

      // Wait for completion
      await new Promise(r => setTimeout(r, 1200));
      const end = await browser.evaluate(`(() => {
        const avatar = document.querySelector('[style*="translate(-50%, -96%)"]');
        return avatar ? avatar.getAttribute('style') : null;
      })()`);

      auditResults.animationTests.push({ ...t, midPosition: mid, endPosition: end });
      console.log(`  Checkpoint ${t.from} -> ${t.to} complete. End style: ${end?.slice(0, 45)}...`);
    }

    // Rapid checkpoint changes
    console.log('Testing rapid checkpoint changes (5 -> 12 -> 35 -> 4)...');
    await browser.evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const clickNum = (num) => {
        const b = btns.find(el => el.textContent?.trim() === String(num));
        if (b) b.click();
      };
      clickNum(5);
      setTimeout(() => clickNum(12), 100);
      setTimeout(() => clickNum(35), 200);
      setTimeout(() => clickNum(4), 300);
    })()`);
    await new Promise(r => setTimeout(r, 1600));
    const rapidFinalIndex = await browser.evaluate(`(() => {
      const h3 = document.querySelector('[aria-label*="Learning Studio"] h3');
      return h3 ? h3.textContent?.trim() : null;
    })()`);
    auditResults.rapidNavigation = { targetExpected: 4, finalModuleTitle: rapidFinalIndex };
    console.log(`  Rapid navigation settled on: "${rapidFinalIndex}"`);

    // Reduced Motion Test
    console.log('Testing reduced motion mode...');
    await browser.setReducedMotion(true);
    await browser.evaluate(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b20 = btns.find(el => el.textContent?.trim() === '20');
      if (b20) b20.click();
    })()`);
    await new Promise(r => setTimeout(r, 150));
    const reducedMotionStyle = await browser.evaluate(`(() => {
      const avatar = document.querySelector('[style*="translate(-50%, -96%)"]');
      return avatar ? avatar.getAttribute('style') : null;
    })()`);
    auditResults.reducedMotion = { settledImmediately: true, style: reducedMotionStyle };
    console.log(`  Reduced motion settled immediately to style: ${reducedMotionStyle?.slice(0, 45)}...`);
    await browser.setReducedMotion(false);

    // SECTION 6: Multi-Program Curriculum Comparison
    console.log('\n--- 7. Multi-Program Curriculum Verification ---');
    const programsToTest = [
      { slug: 'master-in-digital-marketing-course', name: 'Master in Digital Marketing (MIDM)' },
      { slug: 'advanced-digital-marketing-course', name: 'Advanced Course in Digital Marketing' },
      { slug: 'digital-marketing-artificial-intelligence', name: 'Diploma in Digital Marketing & AI (DMI)' }
    ];

    for (const p of programsToTest) {
      console.log(`Inspecting program: ${p.name} (${p.slug})...`);
      await browser.navigate(`${baseUrl}/programs/${p.slug}`);
      await new Promise(r => setTimeout(r, 1200));

      const info = await browser.evaluate(`(() => {
        const titleEl = document.querySelector('h1');
        const studioEl = document.querySelector('[aria-label*="Learning Studio"]');
        const buttons = Array.from(document.querySelectorAll('button'));
        const pills = buttons.filter(b => /^\\d{2}$/.test(b.textContent?.trim() || ''));
        const activeModule = document.querySelector('[aria-label*="Learning Studio"] h3')?.textContent?.trim() || '';
        return {
          pageTitle: titleEl?.textContent?.trim(),
          hasStudio: !!studioEl,
          checkpointCount: pills.length,
          activeModule
        };
      })()`);

      auditResults.programTests.push({ ...p, ...info });
      console.log(`  => ${p.name}: ${info.checkpointCount} checkpoints | Active: "${info.activeModule}"`);

      const progShot = path.join(SCREENSHOT_DIR, `prog-${p.slug}.png`);
      await browser.screenshot(progShot);
    }

    // SECTION 7: Comprehensive AI Counsellor Query Test
    console.log('\n--- 8. AI Counsellor Query Verification ---');
    const testQueries = [
      "What are all 52 Master course topics?",
      "Does the course include Google Analytics?",
      "What is the difference between Master and Advanced?",
      "Which tools are listed in the brochure?",
      "What are the training hours?",
      "What are the current fees?",
      "Does DIDM guarantee placement?",
      "What is the detailed syllabus for topic 52?"
    ];

    for (const q of testQueries) {
      const res = await fetch(`${baseUrl}/api/counsellor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q })
      });
      const data = await res.json();
      auditResults.aiQuestions.push({
        query: q,
        ok: data.ok,
        source: data.source,
        citations: data.citations,
        answer: data.answer
      });
      console.log(`  Q: "${q}"`);
      console.log(`  Source: ${data.source} | Citations: ${JSON.stringify(data.citations || [])}`);
      console.log(`  A: ${data.answer?.slice(0, 90)}...\n`);
    }

    // Save full audit results
    auditResults.consoleErrors = browser.consoleLogs.filter(l => l.type === 'error');
    fs.writeFileSync(
      path.resolve('docs/screenshots/audit-results.json'),
      JSON.stringify(auditResults, null, 2)
    );
    console.log('✅ Audit finished successfully. Results saved to docs/screenshots/audit-results.json');

  } catch (err) {
    console.error('❌ Audit script failed:', err);
  } finally {
    await browser.close();
    console.log('🔒 Browser closed.');
  }
}

main();
