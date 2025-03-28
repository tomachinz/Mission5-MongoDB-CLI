// import { ipcRenderer } from 'electron';

const information = document.getElementById('status')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`


window.receiveFromD = function(func){
    ipcRenderer.on("updateConfig", (event, ...args) => func(event, ...args));
};

const func = async () => {
  // const response = await window.versions.ping()
  // console.log(response) // prints out 'pong'
  // information.innerText = response;
  const domains =   await window.versions.updateConfig()
  information.innerText = domains.length; //JSON.stringify( domains );
  const queueTable = document.getElementById('queueTable')
  queueTable.removeChild(queueTable.firstChild);
  // const queuebody = document.getElementById('queuebody')
  const results = document.createElement('tbody');

  for (let i = 0; i < domains.length; i++) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');

    cell1.textContent = i;
    cell2.textContent = domains[i].domain;
    row.appendChild(cell1);
    row.appendChild(cell2);
    results.appendChild(row);
    // alert(i);
  }
  
  
  queueTable.appendChild(results)
  // alert(domains)

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


window.versions.updateConfig((value) => {
  console.log(value);
  status.innerText = value.toString()
})

window.electronAPI.configDomains((value) => {
  console.log(value);
  status.innerText = value.toString()
})