// import { ipcRenderer } from 'electron';

const information = document.getElementById('status')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`


window.receiveFromD = function(func){
    ipcRenderer.on("ping", (event, ...args) => func(event, ...args));
};

const func = async () => {
  // const response = await window.versions.ping()
  // console.log(response) // prints out 'pong'
  // information.innerText = response;
  const domains =  JSON.stringify(  await window.versions.updateConfig())
  information.innerText = domains;
  alert(domains)

}

func()


const setButton = document.getElementById('btn')
const urlInput = document.getElementById('url')
const status = document.getElementById('status')

setButton.addEventListener('click', () => {
  const url = urlInput.value
  console.log(url);
  window.electronAPI.addURL(url)
})


urlInput.addEventListener('click', () => {
  const url = urlInput.value
  window.electronAPI.addURL(url)
})

const counter = document.getElementById('queueTable')

window.versions.updateConfig((value) => {
  console.log(value);
  status.innerText = value.toString()
})

window.electronAPI.configDomains((value) => {
  console.log(value);
  status.innerText = value.toString()
})