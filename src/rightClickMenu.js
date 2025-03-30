
// renderer
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  // ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('context-menu-command', (e, command) => {
    console.log(`derkaIdunnoFuckNeedABreak`);
})

// main
ipcMain.on('show-context-menu', (event) => {
  const template = [
    {
      label: 'Menu Item 1',
      click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
    },
    { type: 'separator' },
    { label: 'Menu Item 2', type: 'checkbox', checked: true }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
})

const derkaIdunnoFuckNeedABreak = () => {
    console.log(`derkaIdunnoFuckNeedABreak`);
}

export default derkaIdunnoFuckNeedABreak