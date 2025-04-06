import fs from 'node:fs';
import Configstore from 'configstore';

export default function ConfigModule() {
    let packageJson;
    try {
        packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    } catch (e) {
        packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));
    }
    const config = new Configstore(packageJson.productName, {}, {}); // Create a Configstore instance.
    config.set({ // this will likely wipe defaults each time hmmm...
        name: packageJson.name,
        productName: packageJson.productName,
        description: packageJson.description,
        version:  packageJson.description,
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
    })
    return config;
}
