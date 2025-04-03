
import { app, Tray, nativeImage, BrowserWindow, ipcMain  } from 'electron';
import path from 'node:path';
import Tomachibot from "./Tomachibot.js";
import api from './api.js';
import derkaMenus from './derkaMenus.js';
// import { exit } from 'process';
import debug from './debug.js';

const __dirname = path.resolve();


// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const fs = require('fs')

// import  main from './main.js';
// HOW TO HANDLE REQUIRE AND IMPORT IN SAME PROJECT:
// https://stackoverflow.com/questions/69099763/referenceerror-require-is-not-defined-in-es-module-scope-you-can-use-import-in 
// const { app, Tray, Menu, nativeImage, BrowletserWindow, ipcMain  } = require('electron');
// const path = require('node:path');
// const main = require('./main.js');
// const Tomachibot =params.src
// }

let config = await Tomachibot();
let domains = config.get('domains');
var mainWindow, tray;
let icon = nativeImage.createFromPath('./assets/tcorp-flames-512px-icon.png')

const createWindow = async () => { 
  domains = config.get('domains');
    debug(domains)

    mainWindow = new BrowserWindow({
    // icon: './assets/tcorp-flames-512px-icon.png',
    icon: icon,
    width: 1080,
    height: 1080,
    webPreferences: {
      sandbox: false,
      // preload: path.resolve(path.join(__dirname, 'src',  'preload.js')),
      preload: path.join('src', './preload.js'),
      // preload: './src/preload.js',
      contextIsolation: true,
      nodeIntegration: false
    },
  });
  mainWindow.setMenu(null);
  mainWindow.loadFile(path.join(__dirname, "src", 'index.html'));
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.send(`updateConfig`, domains);  
  mainWindow.webContents.once('did-finish-load', (mainWindow) => {
    console.log('MainWindow loaded');
    return 'loaded';
  })
};


ipcMain.on('port', (event) => {
  const port = event.ports[0]
  port.on('message', (event) => {
    const data = event.data;
    process.exit(0);
  })
  port.start()
})

function handleTerminate (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
  process.exit(0);

}
  ipcMain.on('terminate', handleTerminate)


app.whenReady().then(async() => {

  domains = config.get('domains');
  // console.log(domains)
  setTimeout(() => {

    ipcMain.handle('ping', () => {
       'pong'
    })
  }, 5000)
  ipcMain.handle('start', () => domains)
  await createWindow();

  mainWindow.webContents.send('updateConfig', domains)
  // console.log(domains)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
    const contextMenu = derkaMenus(); // Assuming derkaMenus returns a menu
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Chronic Electronic WebSpider');
  });

  ipcMain.on('add-url', (event, newurl) => {
    handleAddURL(event, newurl);
  });
  ipcMain.on('set-title', (event, title) => {
    handleSetTitle(event, title);
  });
  ipcMain.handle('get-config', () => {
    return config.get('domains');
  });
  ipcMain.handle('get-config-raw', () => {
    return config.store;
  });

  api();

});

app.on('window-all-closed', () => {
  app.quit();
});
app.on('ready-to-show', () => {
 console.log('Chronic Electronic WebSpider 👋 is about to put it in the air...') 
  const icon = nativeImage.createFromPath('./assets/tcorp-flames-512px-icon.png')
  const tray = new Tray(icon)
  derkaMenus().catch();

  console.log('is about to put it in the air...👋 Ready to show')
});
function handleAddURL (event, newurl) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(newurl)
  api(newurl)
}
function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}


app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    debug(`will-attach-webview fired: src ${params.src} WILL DELETE WEB PREFS, CHECK NODE INTEGRATION AND PREVENT DEFAULT`)
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload

     debug(`// Disable Node.js integration`);
    webPreferences.nodeIntegration = false

    if (!params.src.startsWith('http://localhost')) {
      debug(`Fail // Verify URL being loaded params.src ${params.src} `)

      event.preventDefault()
    }
  })
})