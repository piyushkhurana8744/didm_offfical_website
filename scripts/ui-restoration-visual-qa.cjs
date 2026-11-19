const {chromium}=require('./playwright-runtime.cjs');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
const out='docs/ui-restoration/final/visual';
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({channel:'chrome',headless:true});try{

 if(process.argv.includes('--entry-only')) {
  const context=await browser.newContext({viewport:{width:390,height:844},recordVideo:{dir:out+'/entry-recordings',size:{width:1440,height:1000}}});const page=await context.newPage();const checks=[];
  for(const viewport of [{width:390,height:700},{width:768,height:1024},{width:1440,height:1000}]) {
   await page.setViewportSize(viewport);await page.goto('http://localhost:3005',{waitUntil:'networkidle'});await page.waitForTimeout(3600);assert.equal(await page.locator('.creative-hero').getAttribute('data-hero-state'),'settled');await page.locator('.hero-studio').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('.creative-hero').dataset.heroState==='entrance',{},{timeout:2000});await page.waitForTimeout(500);await page.locator('.hero-studio').screenshot({path:out+`/entry-replay-${viewport.width}.png`});await page.waitForFunction(()=>document.querySelector('.creative-hero').dataset.heroState==='settled',{},{timeout:5000});checks.push({viewport,visibleEntrance:'passed'});
  }
  await context.close();fs.writeFileSync(out+'/entry-replay-results.json',JSON.stringify(checks,null,2));console.log(JSON.stringify({entryReplayChecks:checks.length}));return;
 }
 if(process.argv.includes('--links-only')) {
  const page=await browser.newPage({viewport:{width:390,height:844}});const checks=[];
  for(const route of ['/learn','/privacy','/terms','/refund','/media-coverage/noida-education-conclave-award-2026','/news-and-events/509','/program','/centre/dwarka','/contact-us','/digital-marketing-course','/reviews','/about-us']) {
   const response=await page.goto('http://localhost:3005'+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(100);assert.equal(response.status(),200,route);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false,route);checks.push({route,status:response.status(),destination:page.url(),overflow});
  }
  fs.writeFileSync(out+'/supporting-route-checks.json',JSON.stringify(checks,null,2));console.log(JSON.stringify({supportingChecks:checks.length}));return;
 }

 const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:out+'/recordings',size:{width:1440,height:1000}}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const results=[];
 for(const viewport of [{width:390,height:844},{width:320,height:700},{width:768,height:1024},{width:1440,height:1000},{width:1920,height:1080}]){
  await page.setViewportSize(viewport);await page.goto('http://localhost:3005',{waitUntil:'networkidle'});await page.waitForTimeout(3500);
  const restored=await page.evaluate(()=>({bodyFont:getComputedStyle(document.body).fontFamily,headingFont:getComputedStyle(document.querySelector('h1')).fontFamily,background:getComputedStyle(document.querySelector('.creative-hero')).backgroundColor,buttonRadius:getComputedStyle(document.querySelector('.creative-button')).borderRadius,banner:document.querySelector('.restored-home-billboard').getBoundingClientRect().toJSON(),overflow:document.documentElement.scrollWidth>innerWidth,loadedFonts:Array.from(document.fonts).filter(f=>f.status==='loaded').map(f=>f.family)}));
  assert(restored.bodyFont.includes('Open Sans'));assert(restored.headingFont.includes('Poppins'));assert.equal(restored.background,'rgb(255, 255, 255)');assert.equal(restored.buttonRadius,'12px');assert(Math.abs(restored.banner.x)<1);assert.equal(Math.round(restored.banner.width),viewport.width);assert(!restored.overflow);
  await page.screenshot({path:out+`/home-${viewport.width}.png`});
  // The same approved sequence must remain visible after the historical banner.
  await page.locator('.hero-studio').scrollIntoViewIfNeeded();await page.waitForTimeout(180);const entrance=await page.locator('.creative-hero').getAttribute('data-hero-state');await page.locator('.hero-studio').screenshot({path:out+`/studio-entry-${viewport.width}.png`});await page.waitForTimeout(3400);assert.equal(await page.locator('.creative-hero').getAttribute('data-hero-state'),'settled');
  await page.locator('.hero-studio').screenshot({path:out+`/studio-settled-${viewport.width}.png`});
  const programStyles=await page.locator('.creative-program').first().evaluate(e=>({background:getComputedStyle(e).backgroundColor,radius:getComputedStyle(e).borderRadius,hasArtwork:!!e.querySelector('.restored-program-art img')}));assert.equal(programStyles.background,'rgb(255, 255, 255)');assert.equal(programStyles.radius,'20px');assert(programStyles.hasArtwork);
  results.push({viewport,restored,studioStateOnEntry:entrance,programStyles});
 }
 const banners=[];await page.setViewportSize({width:1440,height:1000});
 for(const route of ['/about','/trainers','/outcomes','/media-coverage','/contact','/life-at-didm','/gallery','/certifications','/corporate-training-program','/colleges-and-university-session','/careers']){
  await page.goto('http://localhost:3005'+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1500);const frame=page.locator('.editorial-photo');const bounds=await frame.boundingBox();assert(Math.abs(bounds.x)<1,route+' banner left edge: '+bounds.x);assert.equal(Math.round(bounds.width),1440,route+' banner width');assert.equal(await frame.locator('img').evaluate(e=>getComputedStyle(e).objectFit),'contain');banners.push({route,bounds});
 }
 await page.goto('http://localhost:3005/about',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1200);await page.screenshot({path:out+'/about-restored.png'});
 await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:3005',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Toggle navigation drawer'}).click();await page.screenshot({path:out+'/navigation-mobile.png'});await page.keyboard.press('Escape');
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://localhost:3005',{waitUntil:'networkidle'});assert.equal(await page.locator('.creative-hero').getAttribute('data-hero-state'),'static');await page.locator('.journey-numbers button').nth(4).click();assert.equal(await page.locator('#campaign-journey').getAttribute('data-scene'),'4');assert(await page.locator('.journey-course a').first().isVisible());
 // Preserve existing route and enquiry preselection behaviour.
 await page.goto('http://localhost:3005/enquire?p=dmi',{waitUntil:'networkidle'});assert.equal(await page.locator('select').first().inputValue(),'dmi');
 const centres=[];for(const slug of ['dwarka','satya-niketan','noida','gurgaon','kalkaji','pitampura','preet-vihar','rajouri-garden','dehradun','meerut','jaipur','mumbai','haldwani-rudarpur','online']){const response=await page.goto('http://localhost:3005/centres/'+slug,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);centres.push(slug);}
 await context.close();fs.writeFileSync(out+'/results.json',JSON.stringify({results,banners,centres,errors,dmiPrefill:'dmi'},null,2));assert.deepEqual(errors,[]);
 // A/B/C uses project screenshots; no live didm.in recreation is substituted.
 const comparisons=[{label:'A — Recovered premium UI, November 12',src:'../../audit_screenshots/cinematic/01_homepage_hero.png'},{label:'B — Playground before restoration',src:'../before/hero-settled.png'},{label:'C — Restored UI with approved motion',src:'visual/home-1440.png'}];
 fs.writeFileSync('docs/ui-restoration/final/comparison.html',`<!doctype html><meta charset="utf-8"><title>DIDM UI restoration comparison</title><style>body{margin:0;padding:24px;background:#f3f4f6;font:14px Arial;color:#222}h1{font-size:24px;margin:0 0 20px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}figure{margin:0;background:white;border:1px solid #ddd;border-radius:12px;overflow:hidden}figcaption{font-weight:bold;padding:15px}img{width:100%;height:auto;display:block}</style><h1>DIDM — Previous UI + preserved current motion</h1><div class="grid">${comparisons.map(c=>`<figure><figcaption>${c.label}</figcaption><img src="${c.src}"></figure>`).join('')}</div>`);
 const comparison=await browser.newPage({viewport:{width:1920,height:1080}});await comparison.goto('file://'+path.resolve('docs/ui-restoration/final/comparison.html'));await comparison.screenshot({path:out+'/comparison.png',fullPage:true});
 console.log(JSON.stringify({viewports:results.length,fullBleedBanners:banners.length,centres:centres.length,errors}));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
