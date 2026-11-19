const { chromium } = require('./playwright-runtime.cjs');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const out='docs/audit_screenshots/creative/after';
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:out+'/recordings',size:{width:1440,height:1000}}});
 const page=await context.newPage(); const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3005',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Replay creative studio animation'}).click();
 await page.waitForTimeout(80);await page.screenshot({path:out+'/hero-entrance.png'});
 await page.waitForTimeout(1350);await page.screenshot({path:out+'/hero-creation.png'});
 await page.waitForTimeout(2300);await page.screenshot({path:out+'/hero-settled.png'});
 for(const label of ['Social post','Story','Brand canvas']){await page.getByRole('button',{name:label,exact:true}).click();assert.equal(await page.getByRole('button',{name:label,exact:true}).getAttribute('aria-pressed'),'true');}
 const journey=page.locator('#campaign-journey'); await page.waitForSelector('.journey-enhanced');
 const rect=await journey.evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight-innerHeight}));
 const states=[];
 for(const fraction of [0,.25,.5,.75,1,.5,0]){
  await page.evaluate(({top,height,fraction})=>window.scrollTo({top:top+height*fraction,behavior:'instant'}),{...rect,fraction});
  await page.waitForTimeout(950);
  states.push({fraction,scene:await journey.getAttribute('data-scene'),stage:await page.locator('.journey-stage').boundingBox(),layers:await page.locator('.journey-layer').evaluateAll(es=>es.map(e=>({class:e.className,opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform})))});
  await page.screenshot({path:out+`/journey-${states.length}-${fraction*100}.png`});
 }
 assert.deepEqual(states.map(s=>s.scene),['0','1','2','3','4','2','0']);
 assert(states.every(s=>s.stage.y>=0&&s.stage.y+s.stage.height<=1000),'Pinned stage must remain in the viewport');
 await page.evaluate(()=>document.querySelector('#courses').scrollIntoView({behavior:'instant'}));await page.waitForTimeout(900);await page.screenshot({path:out+'/programs.png'});
 const courses=await page.locator('.creative-program h3 a').evaluateAll(es=>es.map(e=>({label:e.textContent,href:e.getAttribute('href')})));assert.equal(courses.length,6);assert.equal(new Set(courses.map(c=>c.href)).size,6);
 await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:3005',{waitUntil:'networkidle'});await page.screenshot({path:out+'/mobile-hero.png'});
 const mobile=await journey.evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight-innerHeight}));const mobileStates=[];
 for(const fraction of [0,.25,.5,.75,1]){await page.evaluate(({top,height,fraction})=>scrollTo({top:top+height*fraction,behavior:'instant'}),{...mobile,fraction});await page.waitForTimeout(800);mobileStates.push({fraction,scene:await journey.getAttribute('data-scene'),stage:await page.locator('.journey-stage').boundingBox()});await page.screenshot({path:out+`/mobile-story-${fraction*100}.png`});}
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://localhost:3005',{waitUntil:'networkidle'});await page.locator('.journey-numbers button').nth(3).click();assert.equal(await journey.getAttribute('data-scene'),'3');assert.equal(await journey.evaluate(e=>e.classList.contains('journey-static')),true);await page.locator('.journey-stage').screenshot({path:out+'/reduced-motion.png'});
 fs.writeFileSync(out+'/story-results.json',JSON.stringify({states,mobileStates,courses,errors,overflow},null,2));assert.deepEqual(errors,[]);
 console.log(JSON.stringify({states:states.map(s=>[s.fraction,s.scene]),mobileStates:mobileStates.map(s=>[s.fraction,s.scene]),errors}));await context.close();await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
