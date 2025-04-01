// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer, ipcMain } from 'electron';
// const { contextBridge, ipcRenderer, ipcMain } = require('electron')
import ConfigModule from "./ConfigModule.js";
// const ConfigModule = require( "./ConfigModule.js");

let domains = ConfigModule.get('domains');
let mainBridge = {
  terminate: () => ipcRenderer.invoke('terminate'),
  addURL: (value) => value
}
contextBridge.exposeInIsolatedWorld('renderBridge',renderBridge)
let renderBridge= {
  addURL: (value) => value),
  node:           () => process.tomachibot.node,
  chrome:         () => process.tomachibot.chrome,
  electron:       () => process.tomachibot.electron,
  ping:           () => ipcRenderer.invoke('ping'),
  setTitle:  (title) => ipcRenderer.send('set-title', "fuck you " + title),
  updateConfig:   (cb) => ipcRenderer.on(`updateConfig`, (cb)),
  terminate:      () => ipcRenderer.invoke('terminate')
}
contextBridge.exposeInMainWorld( 'renderBridge', renderBridge)
console.log(`preload.js done.`)