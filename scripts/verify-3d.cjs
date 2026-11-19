/* Browser QA only: does not submit forms or write to the application database.
   Run with PLAYWRIGHT_MODULE=/path/to/playwright and BASE_URL=http://localhost:3005. */
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    "/Users/piyushkhurana/.npm/_npx/e41f203b7505f1fb/node_modules/playwright",
);
const fs = require("fs"),
  path = require("path"),
  assert = require("node:assert/strict");
const base = process.env.BASE_URL || "http://localhost:3005",
  mode = process.env.QA_MODE || "development";
const root = `docs/audit_screenshots/3d/visibility/${mode}`;
fs.mkdirSync(root, { recursive: true });
const routes = [
  ["home", "/"],
  ["master", "/programs/master-in-digital-marketing-course"],
  ["advanced", "/programs/advanced-digital-marketing-course"],
  ["dmi", "/programs/digital-marketing-artificial-intelligence"],
  ["ai", "/programs/gen-ai-knowledge-camp"],
  ["online", "/programs/online-digital-marketing-course"],
  ["centres", "/centres"],
  ["rajouri", "/centres/rajouri-garden"],
  ["about", "/about"],
  ["outcomes", "/outcomes"],
  ["careers", "/careers"],
  ["trainers", "/trainers"],
  ["stories", "/stories"],
  ["media", "/media-coverage"],
  ["news", "/news-and-events"],
  ["gallery", "/gallery"],
  ["life", "/life-at-didm"],
  ["resources", "/digital-marketing-course-journal"],
];
const result = {
  mode,
  base,
  started: new Date().toISOString(),
  browser: "Chrome headless; actual WebGL 2 renderer recorded per scene",
  deviceNote: "Mobile is browser emulation, not physical-device verification.",
  pages: [],
  assertions: [],
};
const check = (name, condition) => {
  assert.ok(condition, name);
  result.assertions.push(name);
};
async function sample(scene) {
  return scene.evaluate((e) => ({ ...e.dataset }));
}
async function ready(p, home = false) {
  const scene = p.locator("[data-scene]").first();
  if (!home) await scene.scrollIntoViewIfNeeded();
  await p.waitForFunction(
    () => document.querySelector("[data-scene]")?.dataset.ready === "yes",
    {},
    { timeout: 60000 },
  );
  await p.waitForTimeout(1000);
  return scene;
}
(async () => {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: process.env.BLOCK_WEBGL
      ? ["--disable-webgl"]
      : ["--enable-unsafe-swiftshader"],
  });
  try {
    for (const [name, route] of routes.filter(
      ([n]) =>
        !process.env.QA_ROUTES || process.env.QA_ROUTES.split(",").includes(n),
    )) {
      const item = { name, route, views: [] };
      result.pages.push(item);
      for (const mobile of [false, true]) {
        const label = mobile ? "mobile" : "desktop";
        const context = await browser.newContext({
          viewport: mobile
            ? { width: 390, height: 844 }
            : { width: 1440, height: 900 },
          deviceScaleFactor: 1,
          isMobile: mobile,
          hasTouch: mobile,
        });
        const p = await context.newPage();
        const errors = [];
        p.on("pageerror", (e) => errors.push(e.message));
        const response = await p.goto(base + route, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });
        check(`${name} ${label}: HTTP 200`, response.status() === 200);
        const scene = await ready(p, name === "home");
        const box = await scene.locator("canvas").boundingBox();
        check(
          `${name} ${label}: visible canvas`,
          box && box.width > 200 && box.height > 200,
        );
        check(
          `${name} ${label}: one canvas`,
          (await p.locator("canvas").count()) === 1,
        );
        if (name === "home")
          check(
            `home ${label}: first viewport`,
            box.y < (mobile ? 844 : 900) && box.y + 100 < (mobile ? 844 : 900),
          );
        await scene.screenshot({
          path: `${root}/${name}-${label}-frame-1.png`,
        });
        const before = await sample(scene);
        await p.waitForTimeout(1400);
        await scene.screenshot({
          path: `${root}/${name}-${label}-frame-2.png`,
        });
        const after = await sample(scene);
        check(
          `${name} ${label}: advancing render frames`,
          Number(after.frames) > Number(before.frames),
        );
        check(`${name} ${label}: active context`, after.context === "active");
        check(`${name} ${label}: no runtime errors`, errors.length === 0);
        if (name !== "master")
          check(
            `${name} ${label}: student changes position`,
            before.student !== after.student,
          );
        check(
          `${name} ${label}: no horizontal overflow`,
          await p.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
        );
        await p.screenshot({ path: `${root}/${name}-${label}.png` });
        item.views.push({
          label,
          canvas: box,
          before,
          after,
          errors,
          screenshot: `${root}/${name}-${label}.png`,
        });
        console.log(
          `${mode} ${name} ${label}: ${after.fps} fps; ${after.drawCalls} draw calls`,
        );
        if (name === "master" && !mobile) {
          check(
            "Master retains 52 original checkpoints",
            (await p
              .locator('[aria-label="All curriculum checkpoints"] button')
              .count()) === 52,
          );
          await p
            .getByRole("button", { name: "Select Module 18:", exact: false })
            .click();
          const originals = require('../apps/web/src/data/brochure/master-52-modules.json');
          const titles = await p.locator('[aria-label="All curriculum checkpoints"] button').evaluateAll(bs => bs.map(b => b.getAttribute('title')));
          check('All 52 original module titles and their order are preserved', JSON.stringify(titles) === JSON.stringify(originals.map(m => m.originalTitle)));
          const position = after.student;
          await p.waitForTimeout(1600);
          const next = await sample(scene);
          check(
            "Master student moves toward selected checkpoint",
            position !== next.student,
          );
          check(
            "Master checkpoint updates module information",
            (await p
              .locator("button[aria-pressed=true]")
              .first()
              .innerText()) === "18",
          );
        }
        if (name === "home" && !mobile) {
          await p.evaluate(() => scrollTo(0, 0));
          await p.waitForTimeout(500);
          await p.screenshot({ path: `${root}/home-first-viewport.png` });
        }
        await context.close();
      }
      fs.writeFileSync(`${root}/results.json`, JSON.stringify(result, null, 2));
    }
    if (!process.env.QA_ROUTES || process.env.QA_ROUTES.includes("home")) {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        recordVideo: {
          dir: `docs/recordings/3d/${mode}`,
          size: { width: 1440, height: 900 },
        },
      });
      const p = await context.newPage();
      await p.goto(base, { waitUntil: "domcontentloaded" });
      await p.screenshot({ path: `${root}/home-initial.png` });
      const scene = await ready(p, true);
      await p.waitForTimeout(2500);
      await p.screenshot({ path: `${root}/home-loaded.png` });
      const a = await sample(scene);
      await p.waitForTimeout(2000);
      const b = await sample(scene);
      check("Homepage student travels", a.student !== b.student);
      await p.screenshot({ path: `${root}/home-student-moved.png` });
      let target = JSON.parse(b.targets).find((t) => t.id === "ads-centre");
      await p.mouse.move(target.x, target.y);
      await p.waitForTimeout(700);
      check(
        "Mesh hover highlights Advertising Lab",
        (await sample(scene)).hover === "ads-centre",
      );
      await p.screenshot({ path: `${root}/home-hover.png` });
      await p.mouse.click(target.x, target.y);
      await p.waitForTimeout(600);
      await p.screenshot({ path: `${root}/home-camera-transition.png` });
      await p.waitForTimeout(1400);
      const selected = await sample(scene);
      check(
        "Mesh click selects actual lab",
        (await p
          .getByRole("button", { name: "Advertising Lab", exact: true })
          .getAttribute("aria-pressed")) === "true",
      );
      check(
        "Camera moves after mesh click",
        Math.hypot(
          ...JSON.parse(selected.camera).map(
            (v, i) => v - JSON.parse(b.camera)[i],
          ),
        ) > 2,
      );
      await p.screenshot({ path: `${root}/home-selected.png` });
      await p.waitForTimeout(1000);
      await p
        .getByRole("button", { name: "Return to campus overview" })
        .click();
      await p.waitForTimeout(2000);
      check(
        "Camera returns to overview",
        Math.hypot(
          ...JSON.parse((await sample(scene)).camera).map(
            (v, i) => v - JSON.parse(b.camera)[i],
          ),
        ) < 1,
      );
      await p
        .getByRole("button", { name: "AI Innovation Lab", exact: true })
        .focus();
      await p.keyboard.press("Enter");
      await p.waitForTimeout(1200);
      check(
        "Keyboard selects a lab",
        (await p
          .getByRole("button", { name: "AI Innovation Lab", exact: true })
          .getAttribute("aria-pressed")) === "true",
      );
      await p.getByRole("link", { name: "Explore curriculum" }).click();
      await p.waitForURL("**/programs/gen-ai-knowledge-camp");
      check(
        "Lab curriculum link navigates correctly",
        p.url().includes("/programs/gen-ai-knowledge-camp"),
      );
      await p.waitForTimeout(1200);
      const video = p.video();
      await context.close();
      await video.saveAs(
        `docs/recordings/3d/${mode}/homepage-interaction.webm`,
      );
      result.recording = `docs/recordings/3d/${mode}/homepage-interaction.webm`;
      // Reduced motion, dynamic preference change, unavailable WebGL and context loss.
      const reduced = await browser.newContext({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
      });
      const rp = await reduced.newPage();
      await rp.goto(base, { waitUntil: "domcontentloaded" });
      await rp.waitForSelector("[data-fallback=yes]");
      check(
        "Reduced motion uses still preview",
        (await rp.locator("canvas").count()) === 0,
      );
      check(
        "Reduced motion has loaded image",
        await rp
          .locator(".scene-poster img")
          .evaluate((i) => i.complete && i.naturalWidth > 0),
      );
      await rp
        .locator("[data-scene]")
        .screenshot({ path: `${root}/home-reduced-motion.png` });
      await rp.getByRole("button", { name: "SEO Lab", exact: true }).click();
      check(
        "Fallback HTML controls work",
        (await rp
          .getByRole("link", { name: "Explore curriculum" })
          .getAttribute("href")) ===
          "/programs/master-in-digital-marketing-course",
      );
      await reduced.close();
      const fault = await browser.newContext({
        viewport: { width: 1440, height: 900 },
      });
      const fp = await fault.newPage();
      await fp.goto(base, { waitUntil: "domcontentloaded" });
      const live = await ready(fp, true);
      await fp.evaluate(() =>
        document
          .querySelector("canvas")
          .getContext("webgl2")
          .getExtension("WEBGL_lose_context")
          .loseContext(),
      );
      await fp.waitForSelector("[data-fallback=yes]");
      check(
        "Context loss replaces canvas with still preview",
        (await fp.locator("canvas").count()) === 0,
      );
      await fp.screenshot({ path: `${root}/home-context-loss.png` });
      await fault.close();
      const block = await browser.newContext({
        viewport: { width: 390, height: 844 },
      });
      await block.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (kind, ...rest) {
          return /^webgl|experimental-webgl/.test(kind)
            ? null
            : original.call(this, kind, ...rest);
        };
      });
      const bp = await block.newPage();
      await bp.goto(base, { waitUntil: "domcontentloaded" });
      await bp.waitForSelector("[data-fallback=yes]");
      check(
        "Unavailable WebGL uses still preview",
        (await bp.locator("canvas").count()) === 0,
      );
      await bp.screenshot({ path: `${root}/home-webgl-unavailable.png` });
      await block.close();
      const pause = await browser.newContext({
        viewport: { width: 1440, height: 900 },
      });
      const pp = await pause.newPage();
      await pp.goto(base, { waitUntil: "domcontentloaded" });
      const ps = await ready(pp, true);
      await pp.evaluate(() => scrollTo(0, innerHeight * 4));
      await pp.waitForTimeout(800);
      const pausedA = await sample(ps);
      await pp.waitForTimeout(800);
      const pausedB = await sample(ps);
      check(
        "Offscreen canvas pauses",
        pausedB.loop === "never" && pausedA.frames === pausedB.frames,
      );
      await pp.evaluate(() => scrollTo(0, 0));
      await pp.waitForTimeout(1200);
      check(
        "Canvas resumes on return",
        Number((await sample(ps)).frames) > Number(pausedB.frames),
      );
      await pause.close();
    }
    result.completed = new Date().toISOString();
    fs.writeFileSync(`${root}/results.json`, JSON.stringify(result, null, 2));
    console.log("PASS", result.assertions.length, "assertions");
  } finally {
    await browser.close();
  }
})().catch((e) => {
  result.failure = e.message;
  fs.writeFileSync(`${root}/results.json`, JSON.stringify(result, null, 2));
  console.error(e);
  process.exit(1);
});
