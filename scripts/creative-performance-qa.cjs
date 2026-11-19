const {chromium}=require('./playwright-runtime.cjs');const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const results=[];
 for(const mobile of [false,true]){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000}});
  await context.addInitScript(()=>{
   window.__creativeMetrics={cls:0,lcp:0,longTasks:[]};
   new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__creativeMetrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
   new PerformanceObserver(list=>{for(const e of list.getEntries())window.__creativeMetrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
   new PerformanceObserver(list=>{for(const e of list.getEntries())window.__creativeMetrics.longTasks.push(e.duration);}).observe({type:'longtask',buffered:true});
  });
  const page=await context.newPage();await page.goto('http://localhost:3005',{waitUntil:'networkidle'});await page.waitForTimeout(3600);
  const load=await page.evaluate(()=>({...window.__creativeMetrics,fonts:document.fonts.status,navigation:performance.getEntriesByType('navigation').map(e=>({domContentLoaded:e.domContentLoadedEventEnd,load:e.loadEventEnd,response:e.responseEnd})),webglCanvases:document.querySelectorAll('canvas').length}));
  await page.locator('.journey-numbers button').nth(1).click();await page.waitForTimeout(800);
  const frames=await page.evaluate(()=>new Promise(resolve=>{const gaps=[];let last=performance.now();const begin=last;const root=document.querySelector('#campaign-journey');const start=root.getBoundingClientRect().top+scrollY;const distance=root.offsetHeight-innerHeight;function frame(now){gaps.push(now-last);last=now;scrollTo({top:start+distance*Math.min(1,(now-begin)/2500),behavior:'instant'});if(now-begin<2500)requestAnimationFrame(frame);else resolve(gaps);}requestAnimationFrame(frame);}));
  const sorted=frames.slice(1).sort((a,b)=>a-b);results.push({viewport:mobile?'390x844':'1440x1000',environment:'Local production preview; Chrome headless; no CPU/network throttling',load,scrollFrameMedianMs:sorted[Math.floor(sorted.length/2)],scrollFrameP95Ms:sorted[Math.floor(sorted.length*.95)]});
  // Capture settled mobile art and exercise the published student selector.
  if(mobile){await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:'docs/audit_screenshots/creative/after/mobile-hero-settled.png'});await page.locator('.hero-studio').screenshot({path:'docs/audit_screenshots/creative/after/mobile-studio-settled.png'});}
  const previous=await page.locator('.voice-quote blockquote').textContent();await page.getByRole('button',{name:'Next Testimonial'}).click();assert.notEqual(await page.locator('.voice-quote blockquote').textContent(),previous);
  await page.waitForTimeout(1400);await page.locator('.student-voices').screenshot({path:`docs/audit_screenshots/creative/after/voices-${mobile?'mobile':'desktop'}.png`});
  await page.goto('http://localhost:3005/programs/online-digital-marketing-course',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Practice',exact:true}).click();await page.waitForTimeout(800);assert(await page.getByText('Make room for practice.').isVisible());
  await page.locator('.signature-experience').screenshot({path:`docs/audit_screenshots/creative/after/online-workspace-${mobile?'mobile':'desktop'}.png`});
  await context.close();
 }
 // Progressive enhancement remains readable when scripts are unavailable.
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await nojs.newPage();await page.goto('http://localhost:3005',{waitUntil:'load'});assert(await page.locator('h1').isVisible());assert.equal(await page.locator('.creative-program h3 a').count(),6);assert(await page.locator('noscript').last().isVisible());await page.screenshot({path:'docs/audit_screenshots/creative/after/no-javascript.png'});await nojs.close();
 fs.writeFileSync('docs/audit_screenshots/creative/after/performance-results.json',JSON.stringify({results,noJavaScript:'Hero, six program links and narrative fallback visible'},null,2));console.log(JSON.stringify(results));
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
