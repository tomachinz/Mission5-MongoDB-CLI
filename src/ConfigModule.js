import fs from 'node:fs';
import Configstore from 'configstore';


export default function ConfigModule() {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const config = new Configstore(packageJson.name, { // Create a Configstore instance.
        firstRun: Date.now(),
        lastRun: Date.now(),
        runs: 0,
        pagesPerMinute: 1, 
        pagesOdometer: 0, 
        windowSize: 10,
        defaultDelay: 1500,
        verbose: false,
        domains: [{
            domain: "funk.co.nz",
            hits: [1737779206588, 1737779206589]
        },{
            domain: "tomachi.co",
            hits: [1737779206588, 1737779206589]
        },{
            domain: "tomachi.tv",
            hits: [1737779206588, 1737779206589]
        },{
            domain: "awaken.guru",
            hits: [1737779206588, 1737779206589]
        },{
            domain: "damnative.com",
            hits: [1737779206588, 1737779206589]
        }]
    });


    // console.log(`config: ${JSON.stringify(config)}`);
    return config;
}
