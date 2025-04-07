import puppeteer from 'puppeteer';
import fs, { writeFileSync} from 'node:fs';
import path from 'node:path';
import URL from 'node:url';

// SAVE A JSON FILE WITH THE TEXT AND ARRAY OF LINKS TO DISK
export default async (inputurl) => {
    const myURL = URL.parse(inputurl);
    console.log(`\rAccessing ${myURL.href} please wait...\r`);
    const __dirname = path.resolve();

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        args: [`--window-size=640,480`],
        defaultViewport: {
            width:640,
            height:480
      }
    });
    const page = (await browser.pages())[0];
    await page.goto(myURL.href);
    const hostname = myURL.hostname;
    page.once('load', () => console.log('Page loaded!'));
    await browser // acquire clipboard permissions
        .defaultBrowserContext()
        .overridePermissions(myURL.href, ['clipboard-read', 'clipboard-write']);
  
    // NORMALISE FILENAME FROM URL
    let filename = myURL.path.replace(/\//g, '-'); // convert slash / to - 
    filename = filename.replace(/ /g, '_'); // convert space to _




    // Optionally, querySelectorAll()/getElementsByClassName() would also work here  
    var x = page.body.getElementsByTagName("*"),  i = x.length;   
     
    while(i--) { console.log(x[i]); } 
    alert("did you see that shit?");

    const pageUrls = await page.evaluate(() => {
        const urlArray = Array.from(document.links).map((link) => link.href);
        const uniqueUrlArray = [...new Set(urlArray)];
        return uniqueUrlArray;
    });




    const extractedText = await page.$eval('*', (el) => el.innerText);
    const rawHTML = await page.content().then().catch();
    let element = await page.locator('h1');
    let auction_title = await page.evaluate(el => el.textContent, element)
    const pageTitle = await page.title();
    
    // console.log( extractedText  );
    // AUCTION TITLE EXTRACTION
    // 'tm-marketplace-buyer-options__listing_title' is thea CSS selector for auction titles on trademe
    // await page.locator('h1').click(); // meh simulate a human!
    // await page.waitForSelector('tm-marketplace-buyer-options__listing_title')
    // let element = await page.waitForSelector('tm-marketplace-buyer-options__listing_title')
    // const strongtags = await page.body.children;
    // Runs the `//h2` as the XPath expression.
    // const strongtags = await page.waitForSelector('::-p-xpath(//strong)');
    // const strongtags = await page.locator('pierce/div')
    // console.log(`<STRONG> tags: ${JSON.stringify(  strongtags.innerText )}`);
    // const start_price = await page.waitForSelector('tm-buy-now-box__price p-h1').innerText;// page.evaluate(el => el.textContent, element) page.strong();
    // marketplace-summary-image-lazy-loader__thumbnail contain ng-star-inserted

    const start_price = 1;
    const searchImages = await page.evaluate(() => {
        const srcArray = Array.from(document.images).map((image) => image.src);
        const uniqueUrlArray = [...new Set(srcArray)];
        return uniqueUrlArray;
    });
    console.log(`Storing page title: ${pageTitle} start_price ${start_price}, ${searchImages.length} images and saved ${pageUrls.length} URLs to JSON`)


    // Create an Object
    const pagejson = {};
    pagejson.hostname = hostname;
    pagejson.url = myURL.href;
    pagejson.filename = filename;
    pagejson.linksCount = pageUrls.length;
    pagejson.linksArray = pageUrls;
    pagejson.auction_title = auction_title;
    pagejson.title = pageTitle;
    pagejson.images = searchImages;
    pagejson.description = extractedText;
    // console.log(JSON.stringify(pagejson));

    let fullfilename = path.resolve(path.join(__dirname, "downloaded", hostname, filename))

    try {         fs.mkdirSync(path.join(__dirname, "downloaded"));   } catch (e) {
        if (e.toString().indexOf('EEXIST') === -1) {
            console.log(`Error creating directory ${e.toString().substring(0, 30)}`);
        }
    }
    try {       fs.mkdirSync(path.join(__dirname, "downloaded", hostname));    } catch (e) {
        if (e.toString().indexOf('EEXIST') === -1) {
            console.log(`Error creating directory ${e.toString().substring(0, 30)}`);
        }
    } 

    writeFileSync(fullfilename+".json", JSON.stringify(  pagejson ), 'utf8');
    writeFileSync(fullfilename+".html", rawHTML, 'utf8');
    console.log(`Done, saved to ${fullfilename}.json and raw .html file alongside`)
    await browser.close();
    // setTimeout(() => {         process.exit(0);     }, 500);
    return pagejson;
}