// modulePromise = import(specifier);
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// import rightClickMenu from './rightClickMenu.js'
// const  ipcMain = require('electron');
// const rightClickMenu = require('rightClickMenu.js')


const body    = document.getElementById('body');
let addURL  = document.getElementById('addURL')
let showConsole= document.getElementById('showConsole')
let urlInput= document.getElementById('urlInput')
const activateChronic = document.getElementById('activateChronic')
const pause   = document.getElementById('pause')

let ticker    = document.getElementById('ticker')

// window.renderBridge.updateConfig((event, domains) => {
//   console.log(domains[0]);
//   alert(domains[0]);
//   ticker.innerHTML ="test"; domains[0].toString()
// })





async function lert() {
  // alert(window.myAPI.doAThing());
  // console.log(body)
  const restart = document.getElementById('restart')

  restart.addEventListener('click', () => {
      alert("TERMINATE!!!!!")
    try {
      window.renderBridge.kill()
    } catch(e) {
     console.log("only a slight error")
    }

  })
  // const isDarkMode = await window.darkMode.toggle()
  // document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
  // window.tomachibot.updateConfig((event, value) => {
  //   let ticker = document.querySelector('#ticker');
  //   console.log(value);
  //   ticker.innerText = value.toString()
  // })

  // showConsole.addEventListener('click', () => {
  //   console.log("showConsole clicked")
  //   alert("page has loaded DERKA!!!!!")
  // })
}


document.addEventListener('DOMContentLoaded', lert);

// addURL.addEventListener('click', () => {
//   alert("page has loaded DERKA!!!!!")
//   urlInput= document.getElementById('urlInput')
//   const url = urlInput.value
//   console.log(url);
//   window.renderBridge.addURL(url)
// })



// urlInput.addEventListener('onblur', () => {
//   const url = urlInput.value
//   // window.tomachibot.addURL(url)
// })




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