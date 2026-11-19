const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "../docs/audit_screenshots/cinematic");
const VIDEO_DIR = path.join(__dirname, "../docs/audit_screenshots/cinematic/video");

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(VIDEO_DIR, { recursive: true });

async function run() {
  console.log("Launching Playwright Chromium...");
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--enable-webgl"],
  });

  // 1. Desktop 1440x900 with video recording
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await context.newPage();
  console.log("Navigating to http://localhost:3005/ ...");
  await page.goto("http://localhost:3005/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000);

  // Capture Homepage Hero
  await page.screenshot({ path: path.join(OUT_DIR, "01_homepage_hero.png") });
  console.log("Captured 01_homepage_hero.png");

  // Locate the 3D Curriculum Book Section
  const bookSection = page.locator("#didm-curriculum-experience");
  const bookBox = await bookSection.boundingBox();
  console.log("Book Section Bounding Box:", bookBox);

  if (bookBox) {
    const startY = bookBox.y;
    const scrollableH = bookBox.height - 900;

    // Stage 1: Scroll to 0% progress
    console.log("Scrolled to Book Stage 1 (0% progress)...");
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), startY + 50);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(OUT_DIR, "02_book_00_closed.png") });

    // Stage 2: Scroll to 25% progress (Cover Opens)
    console.log("Scrolled to Book Stage 2 (25% progress - Cover Opens)...");
    await page.evaluate(
      ([y, h]) => window.scrollTo({ top: y + h * 0.25, behavior: "smooth" }),
      [startY, scrollableH]
    );
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, "03_book_25_open_cover.png") });

    // Stage 3: Scroll to 52% progress (First Page Turning with Curvature)
    console.log("Scrolled to Book Stage 3 (52% progress - First Page Turn)...");
    await page.evaluate(
      ([y, h]) => window.scrollTo({ top: y + h * 0.52, behavior: "smooth" }),
      [startY, scrollableH]
    );
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, "04_book_52_page1_turn.png") });

    // Stage 4: Scroll to 78% progress (Second Page Turning)
    console.log("Scrolled to Book Stage 4 (78% progress - Second Page Turn)...");
    await page.evaluate(
      ([y, h]) => window.scrollTo({ top: y + h * 0.78, behavior: "smooth" }),
      [startY, scrollableH]
    );
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, "05_book_78_page2_turn.png") });

    // Stage 5: Scroll to 95% progress (Curriculum Final Spread & Action CTAs)
    console.log("Scrolled to Book Stage 5 (95% progress - Final Spread & CTAs)...");
    await page.evaluate(
      ([y, h]) => window.scrollTo({ top: y + h * 0.95, behavior: "smooth" }),
      [startY, scrollableH]
    );
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, "06_book_95_final_ctas.png") });

    // REVERSE SCROLL TEST: Scroll back to 25% and 0%
    console.log("Reverse scrolling back to 25% progress...");
    await page.evaluate(
      ([y, h]) => window.scrollTo({ top: y + h * 0.25, behavior: "smooth" }),
      [startY, scrollableH]
    );
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, "07_book_reverse_25.png") });

    console.log("Reverse scrolling back to 0% (closed book)...");
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "smooth" }), startY);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, "08_book_reverse_00_closed.png") });
  }

  // 2. Digital Workspace (Laptop Section)
  console.log("Scrolling to #digital-workspace...");
  const laptopSection = page.locator("#digital-workspace");
  await laptopSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, "09_laptop_workspace.png") });

  // Click on SEO topic
  console.log("Interacting with Laptop topics...");
  const seoButton = page.locator("#digital-workspace button:has-text('Search Engine Optimization')");
  if (await seoButton.count() > 0) {
    await seoButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT_DIR, "10_laptop_seo_selected.png") });
  }

  // 3. Admission Dossier (Folder Section)
  console.log("Scrolling to #admission-dossier...");
  const folderSection = page.locator("#admission-dossier");
  await folderSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, "11_admission_folder_form.png") });

  await context.close();

  // 4. Mobile Viewport Test (390x844)
  console.log("Testing Mobile Viewport (390x844)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3005/", { waitUntil: "networkidle", timeout: 30000 });
  await mobilePage.waitForTimeout(1500);

  const mobileBook = mobilePage.locator("#didm-curriculum-experience");
  await mobileBook.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, "12_mobile_390_book.png") });

  const mobileLaptop = mobilePage.locator("#digital-workspace");
  await mobileLaptop.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, "13_mobile_390_laptop.png") });

  const mobileFolder = mobilePage.locator("#admission-dossier");
  await mobileFolder.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, "14_mobile_390_folder.png") });

  await mobileContext.close();
  await browser.close();
  console.log("All cinematic test captures completed successfully!");
}

run().catch((err) => {
  console.error("Test capture error:", err);
  process.exit(1);
});

