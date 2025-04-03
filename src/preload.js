// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// import { contextBridge, ipcRenderer, ipcMain } from 'electron';
const { contextBridge, ipcRenderer, ipcMain } = require ('electron');

// contextBridge.exposeInMainWorld('myAPI', {
//   doAThing: () => { 'this is a test' }
// })
let killer = () => {
  console.log("hillikng time")
  ipcRenderer.send('terminate');
}
// let mainBridge = {
//   terminate: () => ipcRenderer.invoke('terminate'),
//    addURL: (value) => value
// }
let renderBridge = {
  addURL:    (value) => value,
  node:           () => process.tomachibot.node,
  chrome:         () => process.tomachibot.chrome,
  electron:       () => process.tomachibot.electron,
  kill: () => ipcRenderer.invoke('terminate')
}


// contextBridge.exposeInMainWorld('electronAPI', {
//   kill: () => killer()
// })
contextBridge.exposeInIsolatedWorld('renderBridge',renderBridge)

contextBridge.exposeInMainWorld( 'renderBridge', renderBridge)
// console.log(`preload.js done.`)