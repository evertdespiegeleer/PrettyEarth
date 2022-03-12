import setRandomWallPaper from './setRandomWallPaper'
import * as m from 'menubar'
import fs from 'fs'
import path from 'path'
import { localDataLocation, applocation } from './localDataLocation'
import AutoLaunch from 'auto-launch'
import { app } from 'electron'

exports.setRandomWallPaper = setRandomWallPaper
const dataloc = localDataLocation()
const apploc = applocation()
// Create menubar GUI (./gui/index.html)
require('@electron/remote/main').initialize()
const mb = m.menubar({
  browserWindow: {
    width: 300,
    height: 200,
    transparent: true,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
  },
  showDockIcon: false,
  preloadWindow: true,
  icon: path.join(__dirname, '/gui/iconTemplate.png'),
  index: `file://${__dirname}/gui/index.html`
})

const updateMapData = () => {
  fs.readFile(`${dataloc}/imageData.json`, (err, data) => {
    if (err) {
      console.log(err)
      if (err.code === 'ENOENT') {
        mb.window.webContents.executeJavaScript(`updateMapData('null')`)
      }
    }
    mb.window.webContents.executeJavaScript(`updateMapData('${data}')`)
  })
}

const AutoLauncher = new AutoLaunch({
  name: 'PrettyEarth',
  path: apploc
})

const quit = () => {
  mb.window.close()
  process.exit()
}

mb.on('ready', function ready () {
  // Up 'n running!
  require('@electron/remote/main').enable(mb.window.webContents)
  mb.window.reload()
  app.dock.hide()
  updateMapData()
  mb.window.on('focus', () => { // Run some checks everytime the window is openend
    updateMapData()
    mb.window.webContents.executeJavaScript('checks()')
  })
  mb.window.webContents.on('new-window', function (e, url) { // Fix links to open in system browser
    e.preventDefault()
    require('electron').shell.openExternal(url)
    mb.window.hide()
  })
})
exports.updateMapData = updateMapData
exports.quit = quit
exports.AutoLauncher = AutoLauncher
