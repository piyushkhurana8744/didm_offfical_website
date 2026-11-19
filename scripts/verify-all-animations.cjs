const { chromium } = require("./playwright-runtime.cjs");
const fs = require("fs");
const path = require("path");

const QA_DIR = path.join(__dirname, "../docs/audit_screenshots/qa_verification");
const VIDEO_DIR = path.join(__dirname, "../docs/audit_screenshots/qa_verification/videos");

fs.mkdirSync(QA_DIR, { recursive: true });
fs.mkdirSync(VIDEO_DIR, { recursive: true });

const ROUTES_TO_TEST = [
  { url: "http://localhost:3005/", name: "homepage", label: "Homepage" },
  { url: "http://localhost:3005/about", name: "about", label: "About Us" },
  { url: "http://localhost:3005/programs/master-in-digital-marketing-course", name: "midm", label: "Master in Digital Marketing" },
  { url: "http://localhost:3005/contact", name: "contact", label: "Contact Us" },
  { url: "http://localhost:3005/careers", name: "careers", label: "Careers" },
  { url: "http://localhost:3005/trainers", name: "trainers", label: "Faculty & Trainers" },
  { url: "http://localhost:3005/outcomes", name: "outcomes", label: "Placements & Outcomes" },
  { url: "http://localhost:3005/corporate-training-program", name: "corporate", label: "Corporate Training" },
  { url: "http://localhost:3005/certifications", name: "certifications", label: "30+ Certifications" },
  { url: "http://localhost:3005/why-choose-didm", name: "why_choose_didm", label: "150 Reasons" },
  { url: "http://localhost:3005/centres/rajouri-garden", name: "rajouri_centre", label: "Rajouri Garden Branch" },
  { url: "http://localhost:3005/gallery", name: "gallery", label: "Batches Gallery" },
  { url: "http://localhost:3005/life-at-didm", name: "life_at_didm", label: "Life at DIDM" }
];

async function runQA() {
  console.log("=== STARTING DIDM ANIMATION BROWSER QA ===");
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl"]
  });

  const qaResults = [];

  // 1. Desktop Suite (1440x900) with video recording
  console.log("\n--- Testing Desktop Viewport (1440x900) ---");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1440, height: 900 }
    }
  });

  const page = await desktopContext.newPage();

  for (const item of ROUTES_TO_TEST) {
    console.log(`Auditing ${item.label} (${item.url})...`);
    const startTime = Date.now();
    await page.goto(item.url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);

    // Initial hero capture
    const heroShot = path.join(QA_DIR, `${item.name}_desktop_hero.png`);
    await page.screenshot({ path: heroShot });

    // Smooth scroll through entire page to trigger all intersection observers & motion sections
    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    const scrollSteps = Math.min(Math.ceil(totalHeight / 600), 12);
    
    for (let s = 1; s <= scrollSteps; s++) {
      const scrollY = (totalHeight / scrollSteps) * s;
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "smooth" }), scrollY);
      await page.waitForTimeout(300);
    }

    // Scroll to bottom and wait for any lingering animations
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await page.waitForTimeout(1400); // Exceeds 1200ms fail-safe timer

    // Check for any unrendered zero-opacity content
    const zeroOpacityElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll("h1, h2, h3, p, button, a, img, form, input"));
      return elements.filter((el) => {
        const style = window.getComputedStyle(el);
        return style.opacity === "0" && style.visibility !== "hidden" && style.display !== "none";
      }).length;
    });

    // Check form usability if form exists on page
    let formUsable = "N/A (No form)";
    const formInput = await page.$("input[type='text'], input[type='tel']");
    if (formInput) {
      try {
        await formInput.click({ timeout: 2000 });
        await formInput.fill("Test QA User");
        const val = await formInput.inputValue();
        formUsable = val === "Test QA User" ? "PASS (Unblocked & Operable)" : "FAIL";
      } catch (err) {
        formUsable = `FAIL (${err.message})`;
      }
    }

    // Capture full-page screenshot after animations have settled
    const fullShot = path.join(QA_DIR, `${item.name}_desktop_full.png`);
    await page.screenshot({ path: fullShot, fullPage: true });

    qaResults.push({
      route: item.url,
      page: item.label,
      viewport: "1440x900",
      loadTimeMs: Date.now() - startTime,
      zeroOpacityElements,
      failSafeActive: zeroOpacityElements === 0 ? "CONFIRMED (0 Traps)" : `WARNING (${zeroOpacityElements} hidden)`,
      formUsable,
      heroScreenshot: `${item.name}_desktop_hero.png`,
      fullScreenshot: `${item.name}_desktop_full.png`
    });
  }

  await desktopContext.close();

  // 2. Mobile Suite (390x844 - iPhone 14)
  console.log("\n--- Testing Mobile Viewport (390x844) ---");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  const mobilePage = await mobileContext.newPage();

  for (const item of [ROUTES_TO_TEST[0], ROUTES_TO_TEST[1], ROUTES_TO_TEST[2], ROUTES_TO_TEST[3], ROUTES_TO_TEST[5], ROUTES_TO_TEST[6]]) {
    console.log(`Auditing Mobile: ${item.label}...`);
    await mobilePage.goto(item.url, { waitUntil: "networkidle", timeout: 30000 });
    await mobilePage.waitForTimeout(1000);

    // Scroll down to mid
    await mobilePage.evaluate(() => window.scrollBy({ top: 1200, behavior: "smooth" }));
    await mobilePage.waitForTimeout(1300);

    const mobileShot = path.join(QA_DIR, `${item.name}_mobile_mid.png`);
    await mobilePage.screenshot({ path: mobileShot });
  }

  await mobileContext.close();
  await browser.close();

  console.log("\n=== QA VERIFICATION COMPLETE ===");
  fs.writeFileSync(path.join(QA_DIR, "qa_results.json"), JSON.stringify(qaResults, null, 2));
  console.log("Results written to:", path.join(QA_DIR, "qa_results.json"));
}

runQA().catch((err) => {
  console.error("QA script failed:", err);
  process.exit(1);
});

