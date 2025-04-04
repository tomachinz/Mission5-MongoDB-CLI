import puppeteer from 'puppeteer';
import fs from 'node:fs';
import ConfigModule from "./ConfigModule.js";
import URL from 'node:url';
import  log  from './debug.js';
// import packageJson from  JSON.parse(fs.readFileSync('./package.json', 'utf8'));

let rolling;
// const puppeteer =  require('puppeteer');
// const fs =  require('node:fs');
// const ConfigModule =  require("./ConfigModule.cjs");
// const URL = require( 'node:url');

async function Tomachibot(myURL) {
    let config = ConfigModule();
    let windowSize =  config.get('windowSize');
    let domains = config.get('domains'); // array of 10 hits
    log(`domains: ${JSON.stringify(domains)}`);
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
        // url = URL(myURL); 
        startCrawl(myURL);
    }

    log(`config: ${JSON.stringify(  config)}`);
    // const configJson = JSON.parse(fs.readFileSync(config.path, 'utf8'));
    log(`domains: ${JSON.stringify(  domains)}`);


    async function startCrawl(url) {
        let domain = url.hostname;
        let hit = domains[1];
        log(`domain ${domain} has prefs?: ${domainHasPrefs(domain)} hit: ${hit}`);
        // const hit = {
        //     "hostname": domain,
        //     hits: [1737779206588, 1737779206589]
        // }
        // rolling = domains[];
        rolling = rolling.reduce(domainReduce, domain); // array of 10 hits
        domain = rolling.domain;
        rolling.push(url.hostname,ts);
        config.set('domains', domains);
        log(domainHasPrefs(domain));

        log(`domains.length: ${domains.length} at Unix Epoch ${ts}`);
        log(`domains: ${domains}`);
        log( domains[0], domains[1], domains[2]);
        log(`config is: ${config}`);
        log("defaultDelay: ", dd);
        log("windowSize: ", windowSize);

        const browser = await puppeteer.launch({
            headless: false,
            slowMo: dd, // slow down by 250ms
        });

        const page =  await browser.newPage();
        await page.goto(url.href);        
        log(`done: ${url.href}`);
    }
    return config;
}


export default Tomachibot;
// module.exports = Tomachibot;