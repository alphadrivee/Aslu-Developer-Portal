const { remote } = require('electron');
const { BrowserWindow } = require('electron').remote;

function openAdPanel(){
    let child = new BrowserWindow({
        parent: remote.getCurrentWindow(), 
        modal: true, 
        frame: false,
        resizable: false,
        width:800, 
        height:600,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });
child.loadFile(__dirname + "./adPanel.html");
}