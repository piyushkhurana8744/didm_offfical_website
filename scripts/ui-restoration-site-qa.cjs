const { chromium }=require('./playwright-runtime.cjs');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const out='docs/ui-restoration/final/pages';
const routes=['/','/programs','/programs/master-in-digital-marketing-course','/programs/advanced-digital-marketing-course','/programs/customized-digital-marketing-course','/programs/digital-marketing-artificial-intelligence','/programs/gen-ai-knowledge-camp','/programs/online-digital-marketing-course','/about','/centres','/centres/rajouri-garden','/centres/dwarka','/centres/noida','/centres/dehradun','/outcomes','/trainers','/stories','/media-coverage','/news-and-events','/contact','/enquire','/life-at-didm','/gallery','/certifications','/why-choose-didm','/upcoming-batches','/careers','/franchise','/organisations','/corporate-training-program','/colleges-and-university-session','/digital-marketing-course-journal','/faqs','/compare'];
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:out+'/recordings',size:{width:1440,height:1000}}});
 const page=await context.newPage();const results=(process.env.DIDM_QA_RESUME==='1'||process.argv.includes('--resume'))&&fs.existsSync(out+'/results.json')?JSON.parse(fs.readFileSync(out+'/results.json','utf8')):[];let routeErrors=[];
 page.on('pageerror',e=>routeErrors.push(e.message));
 let blockedPosts=0;const invalidPayloads=[];
 await context.route('**/api/enquire',route=>{blockedPosts++;const body=route.request().postDataJSON();if(!body.name||!body.phone||body.consent!==true||!body.sourceUrl)invalidPayloads.push(body);return route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({success:false,message:'QA intercepted: enquiry could not be saved.'})});});
 for(const route of routes){
  if(results.some(r=>r.route===route&&r.status===200&&r.h1.length===1&&!r.overflow&&!r.brokenImages.length&&!r.errors.length))continue;
  routeErrors=[];await page.setViewportSize({width:1440,height:1000});const response=await page.goto('http://localhost:3005'+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1100);
  const slug=route.replaceAll('/','_')||'home';await page.screenshot({path:out+'/'+slug+'-desktop.png'});
  // Load and inspect all images by walking through the actual page.
  const height=await page.evaluate(()=>document.body.scrollHeight);for(let y=800;y<height;y+=1100){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(180);}
  await page.evaluate(()=>Promise.race([Promise.all(Array.from(document.images).filter(e=>e.getClientRects().length&&!e.closest('details:not([open])')).map(e=>e.complete?Promise.resolve():new Promise(r=>{e.addEventListener('load',r,{once:true});e.addEventListener('error',r,{once:true});}))),new Promise(r=>setTimeout(r,15000))]));
  const images=await page.locator('img').evaluateAll(es=>es.filter(e=>e.getClientRects().length&&!e.closest('details:not([open])')).map(e=>({src:e.getAttribute('src'),alt:e.alt,loaded:e.complete&&e.naturalWidth>0})));
  const h1=await page.locator('h1').allTextContents();const title=await page.title();const canonical=await page.locator('link[rel=canonical]').evaluateAll(es=>es[0]?.getAttribute('href')||null);
  let signature=null;
  if(await page.locator('.signature-module-list').count()){
   const buttons=page.locator('.signature-module-list button');const count=await buttons.count();await buttons.nth(count-1).click();await page.waitForTimeout(650);const detail=await page.locator('.signature-module-copy h3').textContent();await page.locator('.signature-experience').screenshot({path:out+'/'+slug+'-signature.png'});signature={count,last:detail};if(route.includes('master-in-'))assert.equal(count,52);
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(400);await page.screenshot({path:out+'/'+slug+'-mobile.png'});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  const result={route,status:response.status(),h1,title,canonical,brokenImages:images.filter(i=>!i.loaded),imageCount:images.length,overflow,errors:[...routeErrors],signature};const existing=results.findIndex(r=>r.route===route);if(existing>=0)results.splice(existing,1);results.push(result);console.log(JSON.stringify(result));fs.writeFileSync(out+'/results.json',JSON.stringify(results,null,2));
 }
 if(process.argv.includes('--routes-only')){assert(results.every(r=>r.status===200&&r.h1.length===1&&!r.overflow&&!r.errors.length&&!r.brokenImages.length));await context.close();console.log(JSON.stringify({routes:results.length,brokenImages:0,pageErrors:0,mobileOverflows:0}));return;}
 // Every modified form's request is intercepted before it can reach MongoDB.
 const formRoutes=['/','/about','/contact','/media-coverage','/programs/advanced-digital-marketing-course','/programs/online-digital-marketing-course','/outcomes','/centres/rajouri-garden','/why-choose-didm','/corporate-training-program','/colleges-and-university-session'];
 const forms=[];
 for(const route of formRoutes){await page.goto('http://localhost:3005'+route,{waitUntil:'domcontentloaded'});for(const form of await page.locator('form').all()){
  if(!await form.isVisible())continue;
  const before=blockedPosts;
  for(const input of await form.locator('input').all()){const type=await input.getAttribute('type')||'text';if(type==='checkbox')await input.check();else if(type==='email')await input.fill('qa@example.invalid');else if(type==='tel')await input.fill('9999999999');else if(type==='text')if(await input.isEditable())await input.fill('QA local only');}
  for(const textarea of await form.locator('textarea').all())await textarea.fill('Local browser validation only.');
  for(const select of await form.locator('select').all()){const options=await select.locator('option').evaluateAll(es=>es.filter(e=>e.value&&!e.disabled).map(e=>e.value));if(options.length)await select.selectOption(options[0]);}
  await form.locator('button[type=submit]').click();await page.waitForTimeout(450);
  const alerts=await form.locator('[role=alert]').allTextContents();const error=alerts.length?alerts:[await form.textContent()];forms.push({route,intercepted:blockedPosts>before,error});assert(blockedPosts>before,'Form did not call API: '+route);assert(error.join(' ').includes('QA intercepted'),'Form must display failure: '+route);assert(await form.isVisible(),'Failed form must stay available');fs.writeFileSync(out+'/form-results.json',JSON.stringify({forms,blockedPosts,invalidPayloads,productionWrites:0},null,2));
 }}
 fs.writeFileSync(out+'/form-results.json',JSON.stringify({forms,blockedPosts,invalidPayloads,productionWrites:0},null,2));
 assert.deepEqual(invalidPayloads,[]);
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://localhost:3005',{waitUntil:'domcontentloaded'});await page.screenshot({path:out+'/reduced-hero.png'});
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Toggle navigation drawer'}).first().click();await page.screenshot({path:out+'/mobile-navigation.png'});await page.keyboard.press('Escape');
 await page.waitForTimeout(150);
 await context.close();
 assert(results.every(r=>r.status===200),'All routes should respond 200');assert(results.every(r=>r.h1.length===1),'Each route needs one H1');assert(results.every(r=>!r.overflow),'No mobile overflow');assert(results.every(r=>r.brokenImages.length===0),'All visible images should load');assert(results.every(r=>r.errors.length===0),'No page errors');
 console.log(JSON.stringify({routes:results.length,forms:forms.length,blockedPosts,productionWrites:0}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
