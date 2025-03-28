// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// import { contextBridge, ipcRenderer } from 'electron';
const { contextBridge, ipcRenderer } = require('electron')
// const ConfigModule = require( "./ConfigModule.js");

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  updateConfig: () => ipcRenderer.invoke('updateConfig')

})

contextBridge.exposeInMainWorld('electronAPI', {
  addURL: (title) => ipcRenderer.send('set-title', "fuck you " + title),
})

// contextBridge.exposeInMainWorld('electronAPI', {
//   onUpdateConfig: (callback) => ipcRenderer.on('update-config', (_event, value) => callback(value)),
//   configDomains: (value) => ipcRenderer.send('update-config', value)
// })