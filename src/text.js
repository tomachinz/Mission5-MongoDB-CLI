import  puppeteer from 'puppeteer';
import { writeFileSync} from 'node:fs';
import path from 'node:path';

export default async (url) =>  {
        console.log(`url is ${url}`);

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = (await browser.pages())[0];
    await page.goto(url);
    const extractedText = await page.$eval('*', (el) => el.innerText);
    const extractedLinks = await page.$eval('*', (anchor) => anchor.src);
    console.log(extractedText);
    console.log(extractedLinks);
    let file = path.resolve(path.join(__dirname, "websites", page.url.hostname))
    console.log(file)
    writeFileSync(file, extractedText + extractedLinks)
    await browser.close();
}