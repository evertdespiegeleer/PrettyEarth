import setRandomWallPaper from './setRandomWallPaper';
import menubar from'menubar'
exports.setRandomWallPaper = setRandomWallPaper
import fs from 'fs'
//Create menubar GUI (./gui/index.html)
const mb = menubar({
    webPreferences:{
        nodeIntegration: true,
        webSecurity: false,
    },
    transparent: true,
    icon: './gui/icon.png',
    width: 300,
    height: 200,
    resizable: false,
    frame: false,
    preloadWindow: true, //Faster at click
    index: `file://${__dirname}/gui/index.html`,
})

const updateMapData = () => {
    fs.readFile('./images/imageData.json', (err, data) => {  
        if (err) 
        {console.log(err);
        }
        mb.window.webContents.executeJavaScript(`updateMapData('${data}')`)
    });
}

mb.on('ready', function ready () {
    //Up 'n running!
    updateMapData();
    mb.window.on('focus', () => { //Run some checks everytime the window is openend
        updateMapData()
        mb.window.webContents.executeJavaScript('checks()')
    })
    mb.window.webContents.on('new-window', function(e, url) { //Fix links to open in system browser
        e.preventDefault()
        require('electron').shell.openExternal(url)
        mb.window.hide()
      });
})
exports.updateMapData = updateMapData