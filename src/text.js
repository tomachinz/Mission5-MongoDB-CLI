import  puppeteer from 'puppeteer';
// const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = (await browser.pages())[0];
    await page.goto('https://www.funk.co.nz/');
    const extractedText = await page.$eval('*', (el) => el.innerText);
    console.log(extractedText);

    await browser.close();
})();