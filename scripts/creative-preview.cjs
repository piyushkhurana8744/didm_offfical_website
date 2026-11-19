const { chromium } = require('./playwright-runtime.cjs');
const fs = require('node:fs');
(async()=>{
  fs.mkdirSync('docs/audit_screenshots/creative/static',{recursive:true});
  const b=await chromium.launch({channel:'chrome',headless:true});
  const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await p.goto('http://localhost:3005',{waitUntil:'networkidle'});
  await p.screenshot({path:'docs/audit_screenshots/creative/static/hero-desktop.png'});
  console.log(await p.locator('h1').textContent());
  await p.setViewportSize({width:390,height:844});
  await p.screenshot({path:'docs/audit_screenshots/creative/static/hero-mobile.png'});
  await p.locator('.hero-studio').screenshot({path:'docs/audit_screenshots/creative/static/studio-mobile.png'});
  await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
