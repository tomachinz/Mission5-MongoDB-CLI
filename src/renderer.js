// modulePromise = import(specifier);
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// import rightClickMenu from './rightClickMenu.js'
// const  ipcMain = require('electron');
// const rightClickMenu = require('rightClickMenu.js')

const body    = document.body;
let addURL  = document.getElementById('addURL')
let urlInput= document.getElementById('debug')
const restart = document.getElementById('restart')
const activateChronic = document.getElementById('activateChronic')
const pause   = document.getElementById('pause')

let ticker    = document.getElementById('ticker')

// window.renderBridge.updateConfig((event, domains) => {
//   console.log(domains[0]);
//   alert(domains[0]);
//   ticker.innerHTML ="test"; domains[0].toString()
// })

document.body.addEventListener('onload', async () => {
  console.log(body)
  // alert("page has loaded DERKA!!!!!")
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
  window.tomachibot.updateConfig((event, value) => {
    let ticker = document.querySelector('#ticker');
    console.log(value);
    ticker.innerText = value.toString()
  })
})
addURL.addEventListener('click', () => {
  urlInput= document.getElementById('debug')

  const url = urlInput.value
  console.log(url);
  // window.renderBridge.addURL(url)
})
activateChronic.addEventListener('click', () => {
  const url = urlInput.value
  console.log(url);
  window.tomachibot.pong()
  goChronic(url)
})
restart.addEventListener('click', () => {
  window.tomachibot.terminate()
  alert("page will terminate i hope DERKA!!!!!")

})
pause.addEventListener('click', () => {
  window.tomachibot.pause()
})
urlInput.addEventListener('onblur', () => {
  const url = urlInput.value
  // window.tomachibot.addURL(url)
})




// window.addEventListener = function(goChronic) {
// }
window.addEventListener = function(pong) {
}

window.addEventListener = function(getConfig){
};

const getConfig = async() => {
  const response = await window.tomachibot.getConfig()
  console.log(`response`) // prints out 'pong'
  alert(`response`)
}
const pong = async() => {
  const response = await window.tomachibot.ping()
  console.log(response) // prints out 'pong'
  ticker.innerText = response;
  alert(response)
}

const goChronic = async () => {
  const domains = window.tomachibot.getConfig()
  // const domains = ["fuck", "you", "derka", "chronic"]
  console.log(domains)
  // alert(domains.toString())

  ticker.innerText = `configured to crawl ${domains.length} domains`; //JSON.stringify( domains );
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
// goChronic()



  // alert(getConfig())


  
// window.electronAPI.configDomains((value) => {
//   console.log(value);
//   ticker.innerText = value.toString()
// })