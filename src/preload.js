// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// import { contextBridge, ipcRenderer, ipcMain } from 'electron';
const { contextBridge, ipcRenderer, ipcMain } = require('electron')
// import ConfigModule from "./ConfigModule.js";
// const ConfigModule = require( "./ConfigModule.js");

// window.tomachibot = {
//   desktop: true
// }

contextBridge.exposeInMainWorld('tomachibot', {
  desktop: () => true,
  node: () => process.tomachibot.node,
  chrome: () => process.tomachibot.chrome,
  electron: () => process.tomachibot.electron,
  ping: () => ipcRenderer.invoke('ping'),
  setTitle: () => ipcRenderer.send('set-title', "fuck you " + title),
  addURL: () => ipcRenderer.invoke('updateConfig') ,
  updateConfig: () => ipcRenderer.invoke('updateConfig')

})

contextBridge.exposeInMainWorld('tomachibot', {
  addURL: () => ipcMain.send('set-title', "fuck you " + title),
})
const worldId = 0;
contextBridge.exposeInIsolatedWorld(worldId, 'tomachibot', {
    desktop: () => true,
    rightClick: () =>  ipcRenderer.invoke('pong'),
    doStart: () => ipcMain.send('do-start'),
    doThing: () => ipcMain.send('do-thing')
  })
contextBridge.exposeInMainWorld('tomachibot', {
  onUpdateConfig: (callback) => ipcRenderer.on('update-config', (_event, value) => callback(value)),
  configDomains: (value) => ipcRenderer.send('update-config', value)
})