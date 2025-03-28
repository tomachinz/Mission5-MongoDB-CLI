
import { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain  } from 'electron';
import path from 'path';
import Tomachibot from "./Tomachibot.js";
// import  main from './main.js';
const __dirname = path.resolve();
// HOW TO HANDLE REQUIRE AND IMPORT IN SAME PROJECT:
// https://stackoverflow.com/questions/69099763/referenceerror-require-is-not-defined-in-es-module-scope-you-can-use-import-in 


console.log(path.join( __dirname ,'src',  '/preload.js'))
// console.log(path.join( path.dirname() ,  '/preload.js'))

// const { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain  } = require('electron');
// const path = require('node:path');
// const main = require('./main.js');
// const Tomachibot = require( "./Tomachibot.cjs");

let config = await Tomachibot();
let domains = config.get('domains');
let mainWindow;
// console.log(config.get('domains'));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//   app.quit();
// }

const createWindow = () => {
  mainWindow = new BrowserWindow({
    icon: './assets/tcorp-flames-512px-icon.png',
    width: 1024,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
      // preload: path.join( path.dirname() ,  '/preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
  });

  mainWindow.loadFile(path.join(__dirname, "src", 'index.html'));
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  ipcMain.on('set-title', handleSetTitle)
  createWindow();
  const icon = nativeImage.createFromPath('./assets/tcorp-flames-512px-icon.png')
  const tray = new Tray(icon)
  domains = config.get('domains');
  console.log(domains)

  mainWindow.webContents.send('update-config', domains)
  console.log('Tomachibot is a 👋')

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  // api();

});


app.on('window-all-closed', () => {
  app.quit();
});


function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}