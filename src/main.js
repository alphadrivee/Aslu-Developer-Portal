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
    ipcMain.send('checking');
    console.log("checking...")
  })

autoUpdater.on('update-available', () => {
    ipcMain.send('update_available');
  });
  autoUpdater.on('update-downloaded', () => {
    ipcMain.send('update_downloaded');
  });

  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('update-not-available', () => {
    createLand();
  });

  autoUpdater.on('error', (err) => {
    console.log('Error in auto-updater. ' + err);
  })