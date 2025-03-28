// import  ipcRenderer  from '../node_modules/electron';
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const  ipcMain = require('electron');


const information = document.getElementById('status')
// information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`


window.addEventListener = function(func) {
      ipcRenderer.on("doThing", (event, ...args) => func(event, ...args));
}
window.addEventListener = function(pong) {
      ipcRenderer.on("ping", (event, ...args) => pong(event, ...args));
}

window.receiveFromD = function(func){
    ipcRenderer.on("updateConfig", (event, ...args) => func(event, ...args));
};

const pong = async() => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
  information.innerText = response;
  alert(response)
}

const func = async () => {
  const domains =   await window.versions.updateConfig()
  information.innerText = `configured to crawl ${domains.length} domains`; //JSON.stringify( domains );
  const queueTable = document.getElementById('queueTable')
  queueTable.removeChild(queueTable.firstChild); // const queuebody = document.getElementById('queuebody')

  const results = document.createElement('tbody');

  for (let i = 0; i < domains.length; i++) {
    const row  =  document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');

    cell1.textContent = i;
    cell2.textContent = domains[i].domain;
    row.appendChild(cell1);
    row.appendChild(cell2);
    results.appendChild(row);
  } 
  queueTable.appendChild(results)
}

// func()


const addURL = document.getElementById('addURL')
const urlInput = document.getElementById('urlInput')
const status = document.getElementById('status')
const start = document.getElementById('start')
const pause = document.getElementById('pause')

// ipcRenderer.invoke('start-clicked', urlInput).then((result) => {
//   alert(result)
// })

addURL.addEventListener('click', () => {
  const url = urlInput.value
  console.log(url);
  // window.versions.addURL(url)
})


urlInput.addEventListener('click', () => {
  const url = urlInput.value
  // window.versions.addURL(url)
})


document.getElementById('body').addEventListener('onload', async () => {
  alert("page has loaded DERKA!!!!!")
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

// window.electronAPI.configDomains((value) => {
//   console.log(value);
//   status.innerText = value.toString()
// })