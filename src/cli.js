#!/usr/bin/env node

import { addAuctionItem, addCustomer, findCustomers, findAuctionItems, dbstring, itemCount, updateAuctionItem, deleteAuctionItem, listAuctionItems, exportAuctionItems, importAuctionItems, deleteAllAuctionItems } from './database.js';
import { Command } from 'commander';
import ConfigModule from './ConfigModule.js';
import text from './text.js';
import fs, { writeFileSync} from 'node:fs';
import path from 'node:path';

const program = new Command();
let config = ConfigModule();

function isText(t) {
    if (t.length > 4 && isNaN(t)) { return true; }; return false;
}

function isNumber(n) {
    if (n.length > 0 && n > 0 && !isNaN(n)) { return true; }; return false;
}

function printDebug(options, command) {
    if (options.debug) {
        console.error('Called %s with options ', command.name(), options, command.args);
    } 
}

program
    .version(config.get('version'))
    .description(config.get('productName'))

program
    .command('add') // <title> <description> <reserve-price> <start-price>
    .alias('a')
    .description('Add an Auction Item')
    .argument('<title>', 'Title of the auction item')
    .argument('<description>', 'Description of the auction item')
    .argument('<reserve_price>', 'Reserve price of the auction item')
    .argument('<start_price>', 'Start price of the auction item')
    .option('--debug', 'output extra debugging')
    .action((title, description, reserve_price, start_price, options, command) => {
        printDebug(options, command);
        let errors ="💩";
        
        if (!isText(title))  errors+= `Please enter a title ${title}`; 
        if (!isText(description))  errors+= `Please enter a title ${description}`; 
        if (!isNumber(reserve_price)) errors+= `Please enter a title ${reserve_price}`; 
        if (!isNumber(start_price)) errors+= `Please enter a title ${start_price}`; 
        if (reserve_price < start_price) errors+= `Reserve price must be greater than start price ${reserve_price} > ${start_price}`; 

        if (errors.length > 2) {
            console.error( `ERROR: ${errors}`);
            return;
        }
        addAuctionItem({title, description, reserve_price, start_price});
    });

program
    .command('addcust')
    .description('Add a customer')
    .argument('<firstname>', 'Title of the auction item')
    .argument('<lastame>', 'Description of the auction item')
    .argument('<phone>', 'Reserve price of the auction item')
    .argument('<email>', 'Start price of the auction item')
    .option('-v, --debug', 'output extra debugging')
    .action((firstname, lastname, phone, email, options, command) => {
        printDebug(options, command);
         const errors = () => {
            if (!isText(firstname)) { return 'Please enter a firstname'; }
            if (!isText(lastname)) { return 'Please enter a lastname'; }
            if (!isText(phone)) { return 'Please enter a phone'; }
            if (!isText(email)) { return 'Please enter an email'; }
        }
        if (errors.length > 0 ) {
            console.error("💩", errors);
            return;
        }
       addCustomer({firstname, lastname, phone, email});
    });
        
program
    .command('find')
    .alias('f')
    .description('Find auction by keyword search')
    .argument('<keyword>', 'Start price of the auction item')
    .action((keyword, options, command) => findAuctionItems(keyword));
    
program
    .command('findcust <keyword>')
    .description('Find a customer by keyword search')
    .action(keyword => findCustomers(keyword));

        // .command('update <_id> <title> <description> <description> <reserve_price> <start_price>')

program
    .command('update')
    .description('Update an auction item by id')
    .argument('<_id>', '_id of the auction item')
    .argument('<title>', 'Title of the auction item')
    .argument('<description>', 'Description of the auction item')
    .argument('<reserve_price>', 'Reserve price of the auction item')
    .argument('<start_price>', 'Start price of the auction item')
    .option('-v, --debug', 'output extra debugging')
    .action((_id, title, description, reserve_price, start_price, options, command) => {
        printDebug(options, command);
        const errors = () => {
            if (!isText(title)) { return `Please enter a title ${title}`; }
            if (!isText(description)) { return `Please enter a title ${description}`; }
            if (!isNumber(reserve_price)) { return `Please enter a title ${reserve_price}`; }
            if (!isNumber(start_price)) { return `Please enter a title ${start_price}`; }
            if (reserve_price > start_price) { return `Reserve price must be greater than start price ${reserve_price} > ${start_price}`; }
        }
        if (errors.length > 0 ) {
            console.error("💩", errors);
            return;
        }

        updateAuctionItem(_id, { title, description, reserve_price, start_price});
    });
program
    .command('delete')
    .description('Delete an auction item by id')
    .argument('<_id>', '_id of the auction item')
    .option('-v, --debug', 'output extra debugging')
    .option('--all', 'DANGER: delete entire collection immediately!')
    .action((_id, options) => {
        if (options.all) {
            deleteAllAuctionItems();
        } else {
            deleteAuctionItem(_id);
        }
    })
    

program
    .command('page')
    .alias('p')
    .description('Clone 1 page from a URL, use --save to save to database')
    .option('--save', "save to database after cloning")
    .option('--debug', 'output extra debugging')
    .argument('<address>', 'Address URL of the link to copy eg https://www.funk.co.nz/menu/about.php')
    .action(async (address, options) => {
        const scraped = await text(address);
        if (options.debug) {
            console.log(scraped);
        }
        if (options.save) {
            const title = scraped.title;
            const description = scraped.description;
            const reserve_price = 3;
            const start_price = 1.5;
            await addAuctionItem({ title, description, reserve_price, start_price});
            console.log(`Saved ${scraped.title} to database`);
        }
    })

program
    .command('list')
    .alias('l')
    .description('list all auction items')
    .action(async () => {
        await listAuctionItems();
    });

program
    .command('export')
    .alias('e')
    .description(`export file downloaded/database-export.json with all ${itemCount} auction items in collection`)
    .action(async () => {
        const filename = "database-export.json";
        let __dirname = path.resolve();
        let fullpath = path.resolve(path.join(__dirname,"downloaded", filename));
        let data = await exportAuctionItems();

        try { fs.mkdirSync(path.join(__dirname, "downloaded"));   } catch (e) {
            if (e.toString().indexOf('EEXIST') === -1) {
                    console.log(`Error creating directory 💩${e.toString().substring(0, 30)}`);
                }
            }
        writeFileSync(fullpath, JSON.stringify(data), 'utf8');
        console.log("Database export written to file: 💾", fullpath);

    });
        
program
    .command('import')
    .alias('i')
    .description('Import auction items from JSON file. default: downloaded/database-export.json')
    .option('--file', 'specify path to JSON file to import')
    .option('--debug', 'output extra debugging')
    .action((jsonfile, options, command) => {
        printDebug(options, command);
        const __dirname = path.resolve();
        if (options.file) {
            jsonfile = options.file;
        } else {
            jsonfile = path.resolve(path.join(__dirname,"downloaded", "database-export.json"));
        }
        if (fs.existsSync(jsonfile)) {
            const data = JSON.parse(fs.readFileSync(jsonfile, 'utf8'));
            console.log(`Imported data: ${ data.length}`);
            importAuctionItems(data);
        } else {
            console.error(`File ${jsonfile} does not exist`);
        }
    });

 const cli = (args) => {
    if (process.env.RUNNINGTEST === 'true') {
        console.log(`exitOverride ${process.env.RUNNINGTEST}`)
        program.exitOverride(args);
    } else {
        console.log();
        console.log(`Connected to ${dbstring} with ${itemCount} auction items`);
        program.parse(process.argv);
    }
 }
cli()
export default { cli, program } 