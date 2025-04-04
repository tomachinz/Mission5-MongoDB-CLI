import  puppeteer from 'puppeteer';
import fs from 'node:fs';
// const puppeteer = require('puppeteer');

export default (async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = (await browser.pages())[0];
    await page.goto('https://www.funk.co.nz/');
    const extractedText = await page.$eval('*', (el) => el.innerText);
    const extractedLinks = await page.$eval('*', (anchor) => anchor.src);
    console.log(extractedText);
    console.log(extractedLinks);
    
    let file = path.resolve(path.join(__dirname, "websites", page.url.hostname))
    fs.writeFileSync(file, extractedText + extractedLinks)
    await browser.close();
})();