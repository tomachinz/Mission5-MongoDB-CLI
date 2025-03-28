import express from "express";
import puppeteer from "puppeteer";
import urlmodule from 'node:url';

// const express = require("express");
// const puppeteer = require("puppeteer");
// const {urlmodule} = require('url');
const app = express();
const port = 3000;
const host = "localhost";

let pause = 5000;
let isRunning, isListening = false;
let queue = ["https://www.funk.co.nz/", "https://tomachi.co/"];  
let registry, url, html, error, browser;

const api = (u) =>  {
    if (typeof u !== undefined) {
        url = urlmodule.parse(u);
        pushQueue(url);
    }
}
export default  api     

if (!isListening) {
    console.log(`isListening: ${isListening}`);
    isListening = true;
    try {
        app.listen(port, () => {
            console.log(`listening on http://${host}:${port} to add to queue hit /crawl?url=https://funk.nz/`);
        });
    } catch(error) {
        isListening = false;
        console.error(error);
        process.exit(1);
    } finally {
            console.log(`finally isListening: ${isListening}`);
        if (!isListening) {
            app.listen(port+1, () => {
                console.log(`listening on http://${host}:${port+1} to add to queue hit /crawl?url=https://funk.nz/`);
            });
        }
    }
}


      
async function pushQueue(url) {
    queue.push(url); 

    if (!isRunning) {
        isRunning = true;
        console.log(`URL seems legit, starting crawler...`);
        setTimeout(() => {
            crawl();
        }, pause);
    } else {
        console.log(`Added URL to queue: ${url}`);   
    }

}
async function crawl(url) {

    try {
        browser = await puppeteer.launch();
        const registry = {};
        const page = await browser.newPage(); 
        await page.goto(url);
        html = await page.content();
        await page.close();
        res.status(200).send(html);
        registry[url] = await page.$eval("*", (el) => el.innerText);
        const hrefs = await page.$$eval("*", (anchorEls) => 
            anchorEls.map((a) => a.href));
        const filteredHrefs = hrefs.filter((href) => 
            href.startsWith(url && registry[href] === undefined));
        const uniqueHrefs = [...new Set(filteredHrefs)];
        console.log(`uniqueHrefs: ${uniqueHrefs}`);

        while (queue.length > 0) {
            url = queue.pop();
            console.log(uniqueHrefs);
            console.log(`pausing for ${pause}} milliseconds. registry: ${registry}`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return res.status(200).send(registry);
        }
        return res.status(200).send(html);

    } catch(error) {
        console.error(error);
        pause += 2000;
    } finally {
        browser.close();
    }
    return res.status(200).send(registry);

}




// add a URL to the queue, do not access yet
app.get("/crawl", async  (req, res, next) => {
    url = req.query.url;
    console.log(`Received URL: ${url}`);

    const domainregex = /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/;
    const urlregex1 = /^(http|https):\/\/[^ "]+$/;
    const urlregex2 = /^(http|https):\/\/(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/;

    if (!url) { 
        console.log(`Required query '?url=' missing, try "http://127.0.0.1:3000/crawl?url=https://funk.nz/"`);
        next(error);
        return res.status(404).send(registry);
    } else if (!url.match(urlregex1)) {
        console.log(`URL is malformed, try http://`);
        next(error);
        return res.status(404).send(registry);
    } else if (url.hostname) {// match(domainregex)) {
        console.log(`URL does not appear to have a properly formatted domain name?`, url.hostname);
        next(error);
        return res.status(400).send(registry);
    } 
    pushQueue(url);
   
    return res.status(200).send(registry);
});

 