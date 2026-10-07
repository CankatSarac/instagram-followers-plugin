const path=require('node:path'),fs=require('node:fs'),{pathToFileURL}=require('node:url');
const {chromium}=require(process.env.INSTAGRAM_PLAYWRIGHT||'../../redline/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.REDLINE_CHROMIUM||chromium.executablePath()});
 try{
 const out=path.resolve(__dirname,'../store-assets');fs.mkdirSync(out,{recursive:true});
 const page=await browser.newPage({viewport:{width:1280,height:800}});
 await page.goto(pathToFileURL(path.resolve(__dirname,'../release/import.html')).href);
 await page.screenshot({path:path.join(out,'01-import.png')});
 const file=(name,data)=>({name,mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
 await page.locator('#followers').setInputFiles(file('followers_1.json',[{string_list_data:[{value:'alice'},{value:'carol'}]}]));
 await page.locator('#following').setInputFiles(file('following.json',{relationships_following:[{title:'alice'},{title:'bob'},{title:'example.creator'},{title:'daily.design'}]}));
 await page.locator('#compare').click();await page.waitForFunction(()=>!document.querySelector('#compare').disabled);
 await page.screenshot({path:path.join(out,'02-comparison.png')});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'mobile.png'),fullPage:true});
 console.log('Generated two 1280×800 store screenshots and mobile review image from synthetic exports.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
