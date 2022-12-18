const electron= require('electron')
const {app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow
 
function createWindow () {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 800,
      webPreferences: {
        nodeIntegration: true, //enable to use node in web
        enableRemoteModule: true,
        contextIsolation: false,
        webSecurity: false,
        preload:path.join(__dirname,'preload.js')
      },
    })
    // mainWindow.loadURL('http://localhost:3000');
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)
 
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
   if (mainWindow === null) {
     createWindow()
   }
 })