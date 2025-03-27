
import { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain  } from 'electron';
import path from 'node:path';
import Tomachibot from "./Tomachibot.js";
// import  main from './main.js';
const __dirname = path.resolve();

// const { app, Tray, Menu, nativeImage, BrowserWindow, ipcMain  } = require('electron');
// const path = require('node:path');
// const main = require('./main.js');
// const Tomachibot = require( "./Tomachibot.cjs");

// Tomachibot();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
//   app.quit();
// }

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: './assets/tcorp-flames-512px-icon.png',
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
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
  console.log('Hello from Electron 👋')
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      console.log('Hello from Electron 👋');
      api();
    }
  });
});


app.on('window-all-closed', () => {
  app.quit();
});


function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}