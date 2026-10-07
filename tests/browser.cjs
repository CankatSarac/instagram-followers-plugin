const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url');
const {chromium}=require(process.env.INSTAGRAM_PLAYWRIGHT||'../../redline/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.REDLINE_CHROMIUM||chromium.executablePath()});
 try{
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve(__dirname,'../release/import.html')).href);
  const file=(name,data)=>({name,mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
  await page.locator('#followers').setInputFiles([file('followers_1.json',[{string_list_data:[{value:'Alice'}]}]),file('followers_2.json',[{string_list_data:[{value:'alice'},{value:'carol'}]}])]);
  await page.locator('#following').setInputFiles(file('following.json',{relationships_following:[{title:'alice'},{title:'bob'}]}));
  await page.locator('#compare').click();await page.waitForFunction(()=>!document.querySelector('#compare').disabled);
  assert.match(await page.locator('#status').textContent(),/2 unique followers · 2 following · 1 mutual/);
  assert.equal(await page.locator('#results li').textContent(),'bob');
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#export').click()]);
  const fs=require('node:fs');assert.equal(fs.readFileSync(await download.path(),'utf8'),'username\nbob\n');
  await page.locator('#following').setInputFiles(file('following.json',{relationships_following:Array.from({length:1002},(_,i)=>({title:'account'+i}))}));
  await page.locator('#compare').click();await page.waitForFunction(()=>!document.querySelector('#compare').disabled);
  assert.equal(await page.locator('#results li').count(),1000);assert.match(await page.locator('#status').textContent(),/Export CSV includes all results/);
  await page.locator('#followers').setInputFiles(file('followers.json',[null]));await page.locator('#compare').click();
  await page.waitForFunction(()=>!document.querySelector('#compare').disabled);assert.match(await page.locator('#status').textContent(),/unsupported format/);assert(await page.locator('#export').isDisabled());
  await page.locator('#followers').setInputFiles(file('followers.json',[{string_list_data:[{value:'alice'}]}]));
  await page.evaluate(()=>{const original=File.prototype.text;File.prototype.text=function(){return new Promise(resolve=>setTimeout(()=>original.call(this).then(resolve),150));};document.querySelector('#compare').click();document.querySelector('#clear').click();});
  await page.waitForTimeout(500);assert.equal(await page.locator('#results li').count(),0);assert.equal(await page.locator('#status').textContent(),'Imported data cleared from this tab.');assert(await page.locator('#export').isDisabled());
  assert.deepEqual(errors,[]);console.log('PASS multiple exports, CSV, result cap, malformed file and Clear during import.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
