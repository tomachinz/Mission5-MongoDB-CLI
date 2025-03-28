import puppeteer from 'puppeteer';
import fs from 'node:fs';
import ConfigModule from "./ConfigModule.js";
import URL from 'node:url';
// import packageJson from  JSON.parse(fs.readFileSync('./package.json', 'utf8'));



// const puppeteer =  require('puppeteer');
// const fs =  require('node:fs');
// const ConfigModule =  require("./ConfigModule.cjs");
// const URL = require( 'node:url');
// const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

async function Tomachibot(myURL) {
    let config = ConfigModule();
    let logdebug = true;; // much more detailed
    let verbose = true; // regular logs 
    let windowSize =  config.get('windowSize');
    let domains = config.get('domains'); // array of 10 hits
    let url = myURL;
    let dd =  config.get('defaultDelay');
    const ts =  Date.now();
    config.set('lastRun', Date.now());
    // config.set('domains', []); // wipe db 

    function domainReduce(all, host) {
        // if ( all.)
        return all[host].length;
    } 
    function domainHasPrefs(d) {
        // return (domains['domain'] == d);
        return (domains.domain == d);
    }


    
    /////////////// ENTRYPOINT
    if (myURL) {
        url = new URL(myURL); 
        startCrawl(url);
    }

    function oldestHit() {

    }
    function log(s){
        if (verbose) {
            console.log(s)
        }
    }
    function debug(s) {
        if (logdebug) {
            console.error(s)
            if (typeof s == "[object Object]") {
                console.log(Reflect.getPrototypeOf(s))
            }
        }
    }


    // log(`config: ${JSON.stringify(  config)}`);
    // const configJson = JSON.parse(fs.readFileSync(config.path, 'utf8'));
    // debug(`domains: ${JSON.stringify(  domains)}`);


    async function startCrawl(url) {
        let domain = url.hostname;
        let hit = domains[1];
        log(`domain ${domain} has prefs?: ${domainHasPrefs(domain)} hit: ${hit}`);
        // const hit = {
        //     "hostname": domain,
        //     hits: [1737779206588, 1737779206589]
        // }
        // rolling = rolling.reduce(domainReduce, domain); // array of 10 hits
        // const thisdomain = rolling.domain;
        // rolling.push(url.hostname,ts);
        config.set('domains', domains);
        debug(domainHasPrefs(domain));

        debug(`domains.length: ${domains.length} at Unix Epoch ${ts}`);
        debug(`domains: ${domains}`);
        debug( domains[0], domains[1], domains[2]);
        debug(`config is: ${config}`);
        debug("defaultDelay: ", dd);
        debug("windowSize: ", windowSize);

        const browser = await puppeteer.launch({
            headless: false,
            slowMo: dd, // slow down by 250ms
        });

        const page =  await browser.newPage();
        await page.goto(url.href);        
        debug(`done: ${url.href}`);
    }
    return config;
}


export default Tomachibot;
// module.exports = Tomachibot;