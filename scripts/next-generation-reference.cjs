const fs=require('node:fs');
const {chromium}=require('./playwright-runtime.cjs');
const BASE='https://www.didm.in';
const out='docs/next-generation';
const clean=s=>s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
(async()=>{
 const seeds=['/','/upcoming-batches','/placement','/master-in-digital-marketing-course','/sitemap.xml','/robots.txt'];
 const pages=[], seen=new Set(), queue=[...seeds];
 while(queue.length&&seen.size<100){
   const chunk=queue.splice(0,4).filter(p=>!seen.has(p));chunk.forEach(p=>seen.add(p));
   const results=await Promise.all(chunk.map(async path=>{try{const response=await fetch(BASE+path,{signal:AbortSignal.timeout(18000)}),html=await response.text();const links=[...html.matchAll(/href=["']([^"']+)["']/gi)].map(m=>{try{return new URL(m[1],BASE+path)}catch{return null}}).filter(u=>u&&['www.didm.in','didm.in'].includes(u.hostname)&&!u.search&&!/\.(?:jpg|jpeg|png|pdf|webp|gif|css|js|zip|ico|svg)$/i.test(u.pathname)).map(u=>u.pathname.replace(/\/$/,'')||'/');const body=clean(html);return {path,url:response.url,status:response.status,title:clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||''),headings:[...html.matchAll(/<(h[1-3])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(m=>({level:m[1],text:clean(m[2])})),forms:(html.match(/<form\b/gi)||[]).length,links:[...new Set(links)],excerpt:body.slice(0,900),contentLength:body.length,soft404:/Page Not found/i.test(body),observedAt:new Date().toISOString()};}catch(e){return {path,error:e.message}}}));
   for(const r of results){pages.push(r);if(r.links)for(const p of r.links)if(!seen.has(p)&&!queue.includes(p))queue.push(p);}
   fs.writeFileSync(`${out}/reference-inventory.json`,JSON.stringify(pages,null,2));
 }
 console.log(JSON.stringify({fetched:pages.length,errors:pages.filter(p=>p.error).map(p=>p.path),soft404:pages.filter(p=>p.soft404).map(p=>p.path)}));
 const browser=await chromium.launch({headless:true});
 for(const width of [1440,768,390]){const page=await browser.newPage({viewport:{width,height:1000}});try{await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForTimeout(2000);await page.screenshot({path:`${out}/reference-home-${width}.png`});}catch(e){console.log(`Reference screenshot ${width}: ${e.message}`)}finally{await page.close()}}
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
