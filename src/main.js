const electron = require('electron');
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron');
const { create } = require('domain');
const {app, BrowserWindow, Menu} = electron;

const { autoUpdater } = require("electron-updater");

let land;
let home;
let splash;


function createSplash () {
    splash = new BrowserWindow({
        width: 900,
        height: 400,
        frame: false,
        resizable: false,
        transparent: true,
        alwaysOnTop: true,
        titleBarStyle: "hidden",
        show: true,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
           }
       })
       
       splash.loadFile('src/views/splash.html');
       //land.loadFile('src/views/land.html');
   }
function createLand () {
    land = new BrowserWindow({
        width: 900,
        height: 600,
        frame: false,
        resizable: false,
        titleBarStyle: "hidden",
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
           }
       })
   }

   function createHome () {
    home = new BrowserWindow({
        width: 1600,
        height: 800,
        frame: false,
        resizable: false,
        titleBarStyle: "hidden",
        show: true,
        webPreferences: {
            preload: path.join(__dirname, '/script/preload.js'),
            enableRemoteModule: true,
            nodeIntegration: true,
           }
       })
       
       
       
       home.loadFile('src/views/main.html');
       home.webContents.on('before-input-event', (event, input) => {
           if (input.control && input.key.toLowerCase() === 'r') {
            home.reload();
             event.preventDefault()
           }
         })
         home.webContents.on('before-input-event', (event, input) => {
           if (input.control && input.shift && input.key.toLowerCase() === 'i') {
            home.webContents.openDevTools();
             event.preventDefault()
           }
         })
   }

// listen for app to be ready
app.on('ready', function() {
    createSplash();
    autoUpdater.checkForUpdatesAndNotify();
});

function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
  }

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createSplash();
    }
});

ipcMain.on('open-home', function() {
    createHome();
    const newMenu = [
        {
          label: '',
        }
    ]
    
    const menu = Menu.buildFromTemplate(newMenu);
    Menu.setApplicationMenu(menu);
    home.show();
    land.destroy();
})

ipcMain.on('message-reload', function(){
    home.reload();
});
autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
});