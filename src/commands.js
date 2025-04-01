import { program } from 'commander';
import { addCustomer, findCustomer } from './database.js';

program
    .version ('0.0.1')
    .description('CLI for managing customers')

program.parse(process.argv);
