#!/usr/bin/env node

import { addCustomer, findCustomer } from './database.js';
import { Command } from 'commander';
import ConfigModule from  './ConfigModule.js';
import Tomachibot from  './Tomachibot.js';
import text from './text.js';
let version = ConfigModule().get('version');
let name =  ConfigModule().get('name');

const program = new Command();

program
    .version (version)
    .description(`${name} ::: a CLI for managing customers`)

    const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Enter your first name: ',
        validate: (value) => {
            if (value.length) {
                return true;
            }
            return 'Please enter your first name';
        }
    },    {
        type: 'input',
        name: 'lastname',
        message: 'Enter your lastname name: ',
        validate: (value) => {
            if (value.length) {
                return true;
            }
            return 'Please enter your lastname name';
        }
    },    {
        type: 'input',
        name: 'phone',
        message: 'Enter your phone number: ',
        validate: (value) => {
            if (value.length) {
                return true;
            }
            return 'Please enter your phone number';
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address: ',
        validate: (value) => {
            if (value.length) {
                return true;
            }
            return 'Please enter your email address';
        }
    }
]
program
    .command('add <firstname> <lastname> <phone> <email>')
    .alias('a')
    .description('Add a customer')
    .action((firstname, lastname, phone, email) => {
        addCustomer({ firstname, lastname, phone, email });
    });
    
program
    .command('find <firstname>')
    .alias('f')
    .description('Find a customer')
    .action(firstname => findCustomer(firstname));

program
    .command('clone website <url>')
    .alias('c')
    .description('Clone a website')
    .action(addURL => text(url));
    
// program
//     .command('add')
//     .alias('a')
//     .description('Add a customer')
//     .action(() => {
//         prompt(questions).then(answers => addCustomer(answers));        
//     });
// inquirer
//   .prompt([
//   ])
//   .then((answers) => {
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//     } else {
//     }
//   });

if (process.env.RUNNINGTEST === 'true') {
    console.log(`program termination suppressed due to test.`)
    program.exitOverride(process.argv);
} else {
    console.log(`program running normally.`)

    program.parse(process.argv);
}

function cli() {
    program.exitOverride()
}
export default cli;