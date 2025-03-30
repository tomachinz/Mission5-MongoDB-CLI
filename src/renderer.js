// import  ipcRenderer  from '/electron';
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const  ipcMain = require('electron');
// import rightClickMenu from './rightClickMenu.js'
// const rightClickMenu = require('rightClickMenu.js')

const information = document.getElementById('status')
// information.innerText = `This app is using Chrome (v${window.tomachibot.chrome()}), Node.js (v${window.tomachibot.node()}), and Electron (v${window.tomachibot.electron()})`


// var a = 10; //Invalid left-hand side in assignme
// ({a}) = 0;// Invalid left-hand side in assignme

window.addEventListener = function(func) {
    ipcRenderer.on("doThing", (event, ...args) => func(event, ...args));
}
window.addEventListener = function(pong) {
    ipcRenderer.on("ping", (event, ...args) => pong(event, ...args));
}

window.addEventListener = function(derkAlert){
    ipcRenderer.on("updateConfig", (event, ...args) => derkAlert(event, ...args));
};

const derkAlert = async() => {
  console.log(`derkAlert`) // prints out 'pong'
  alert(`derkAlert`)
}
const pong = async() => {
  const response = await window.tomachibot.ping()
  console.log(response) // prints out 'pong'
  information.innerText = response;
  alert(response)
}
const func = async () => {
  // const domains = await window.tomachibot.start()
  const domains = ["fuck", "you"]
  alert(domains.toString())

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

start.addEventListener('click', () => {
  func()
})
addURL.addEventListener('click', () => {
  const url = urlInput.value
  console.log(url);
  // window.tomachibot.addURL(url)
})


urlInput.addEventListener('click', () => {
  const url = urlInput.value
  // window.tomachibot.addURL(url)
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