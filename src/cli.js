#!/usr/bin/env node

import { addAuctionItem, addCustomer, findCustomers, findAuctionItems, dbstring } from './database.js';
import { Command } from 'commander';
import ConfigModule from './ConfigModule.js';
import text from './text.js';

const program = new Command();
let config = ConfigModule();

program
    .version(config.get('version'))
    .description(config.get('description'))
    // .option('-v, --debug', 'output extra debugging')
    // .action((options, command) => {
    //     printDebug(options, command);
    // })

function isText(t) {
    if (t.length > 4 && isNaN(t)) { return true; }; return false;
}

function isNumber(n) {
    if (n.length > 0 && n > 0 && !isNaN(n)) { return true; }; return false;
}

    
program
    .command('add') // <title> <description> <reserve-price> <start-price>
    .alias('a')
    .description('Add an Auction Item')
    .argument('<title>', 'Title of the auction item')
    .argument('<description>', 'Description of the auction item')
    .argument('<reserve_price>', 'Reserve price of the auction item')
    .argument('<start_price>', 'Start price of the auction item')
    .option('-d, --debug', 'output extra debugging')
    .action((title, description, reserve_price, start_price, options, command) => {
         if (options.debug) {
            console.error('Called %s with options %o', command.name(), options);
         }
        const errors = () => {
            if (!isText(title)) { return `Please enter a title ${title}`; }
            if (!isText(description)) { return `Please enter a title ${description}`; }
            if (!isNumber(reserve_price)) { return `Please enter a title ${reserve_price}`; }
            if (!isNumber(start_price)) { return `Please enter a title ${start_price}`; }
            if (reserve_price > start_price) { return `Reserve price must be greater than start price ${reserve_price} > ${start_price}`; }
        }
        if (errors.length > 0 ) {
            console.error(errors);
            return;
        }
        addAuctionItem({title, description, reserve_price, start_price});
    });
function printDebug(options, command) {
    if (options.debug) {
        console.error('Called %s with options ', command.name(), options, command.args);
    } 
}
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
        if (!isText(firstname)) { return 'Please enter a firstname'; }
        if (!isText(lastname)) { return 'Please enter a lastname'; }
        if (!isText(phone)) { return 'Please enter a phone'; }
        if (!isText(email)) { return 'Please enter an email'; }
       addCustomer({firstname, lastname, phone, email});
    });
        
program
    .command('find <keyword>')
    .alias('f')
    .description('Find auction by keyword search')
    .action(keyword => findAuctionItems(keyword));
    
program
    .command('findcust <keyword>')
    .description('Find a customer by keyword search')
    .action(keyword => findCustomers(keyword));

program
    .command('page <url>')
    .alias('p')
    .argument('<url>', 'Address of the link to copy eg https://www.')
    .description('Clone 1 page from a URL')
    .action(url  => text(url));

// program
//     .command('clone website from url <url> <depth>')
//     .alias('c')
//     .description('Clone entire website, default depth is 5')
//     .action(url  => text(url));
 

        program.parse(process.argv);
process.stdout.write(`Connecting to MongoDB...   ${dbstring}`);  // clear current text
console.log();
console.log(`Connected to ${dbstring}`);


function cli(args) {
    if (process.env.RUNNINGTEST === 'true') {
        console.log(`exitOverride ${process.env.RUNNINGTEST}`)
       return program.exitOverride(args);
    } else {
        return program.parse(process.argv);
    }
}
// cli()
export default cli;