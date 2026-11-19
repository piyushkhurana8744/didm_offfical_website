const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    "/Users/piyushkhurana/.npm/_npx/e41f203b7505f1fb/node_modules/playwright",
);
const fs = require("fs"),
  assert = require("node:assert/strict");
(async () => {
  const base = process.env.BASE_URL || "http://localhost:3005";
  const mode = process.env.QA_MODE || "development";
  const out = `docs/audit_screenshots/3d/visibility/${mode}`;
  const result = { viewports: [], checks: [], formPostIntercepted: false };
  const ok = (s, c) => {
    assert.ok(c, s);
    result.checks.push(s);
  };
  const b = await chromium.launch({
    headless: true,
    channel: "chrome",
    args: ["--enable-unsafe-swiftshader"],
  });
  try {
    for (const [width, height] of [
      [1920, 1080],
      [1280, 800],
      [768, 1024],
      [375, 812],
    ]) {
      const c = await b.newContext({ viewport: { width, height } });
      const p = await c.newPage();
      await p.goto(base, { waitUntil: "domcontentloaded" });
      await p.waitForSelector("[data-ready=yes]");
      await p.waitForTimeout(900);
      const box = await p.locator("[data-scene] canvas").boundingBox();
      ok(`Campus visible initially at ${width}`, box.y < height - 100);
      ok(
        `Hero CTA usable at ${width}`,
        await p
          .getByRole("link", { name: "Book a free demo", exact: true })
          .isVisible(),
      );
      if (width < 1024) {
        const menu = p.getByRole("button", {
          name: "Toggle navigation drawer",
        });
        const mb = await menu.boundingBox();
        ok(`Mobile menu fits at ${width}`, mb.x + mb.width <= width);
        await menu.click();
        ok(
          `Mobile drawer opens at ${width}`,
          await p
            .getByRole("link", { name: "Request Free Callback & Demo" })
            .isVisible(),
        );
        await menu.click();
      }
      await p.screenshot({ path: `${out}/home-${width}x${height}.png` });
      result.viewports.push({ width, height, canvas: box });
      await c.close();
    }
    const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
    let payload;
    await c.route("**/api/**", async (route) => {
      if (route.request().method() !== "GET") {
        ok(
          "Only expected form POST is intercepted",
          route.request().url().endsWith("/api/enquire"),
        );
        payload = route.request().postDataJSON();
        result.formPostIntercepted = true;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            mode: "direct_assisted",
            message: "Browser QA intercepted response",
            enquiryId: "QA-INTERCEPTED-NO-DATABASE-WRITE",
            counselorContact: {
              phone: "QA",
              whatsappUrl: "https://wa.me/918800505151",
            },
          }),
        });
      } else await route.continue();
    });
    const p = await c.newPage();
    await p.goto(base, { waitUntil: "domcontentloaded" });
    await p
      .getByRole("link", { name: "Request Callback", exact: true })
      .click();
    await p.waitForURL("**/enquire");
    ok("Callback navigates to enquiry", p.url().endsWith("/enquire"));
    ok(
      "Enquiry has no WebGL canvas",
      (await p.locator("canvas").count()) === 0,
    );
    const f = p
      .locator("form")
      .filter({
        has: p.getByRole("button", { name: "Reserve My Free Demo Seat" }),
      });
    await f.locator("input[type=text]").fill("Browser QA");
    await f.locator("input[type=tel]").fill("9999999999");
    await f.locator("input[type=email]").fill("qa@example.invalid");
    await f.locator("select").nth(0).selectOption("midm");
    await f.locator("select").nth(1).selectOption("dwarka");
    await f.getByRole("button", { name: "Reserve My Free Demo Seat" }).click();
    await p
      .getByRole("heading", { name: "Demo Request Registered, Browser!" })
      .waitFor();
    ok(
      "Enquiry preserves selected course and centre",
      payload.courseId === "midm" && payload.centreId === "dwarka",
    );
    ok("Enquiry sends consent", payload.consent === true);
    await p.screenshot({
      path: `out`.replace("out", out) + "/enquiry-intercepted.png",
    });
    for (const route of [
      "/privacy",
      "/terms",
      "/contact",
      "/admin/login",
      "/news-and-events/509",
    ]) {
      await p.goto(base + route, { waitUntil: "domcontentloaded" });
      ok(
        `${route} remains available`,
        !(await p.getByText("404", { exact: true }).count()),
      );
      ok(
        `${route} has no WebGL canvas`,
        (await p.locator("canvas").count()) === 0,
      );
    }
    await c.close();
    fs.writeFileSync(
      `${out}/usability-results.json`,
      JSON.stringify(result, null, 2),
    );
    console.log("PASS", result.checks.length, result);
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
