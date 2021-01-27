const { ipcRenderer } = require("electron");

const label = document.getElementById("label");
const progress = document.getElementById("progress");

ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    label.textContent = 'Update Available!';
    setTimeout(() => {
        label.textContent = "Downloading Update..."
    }, 3000);
  });

  ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    label.textContent = 'Update Downloaded!';
    setTimeout(() => {
        label.textContent = "Restarting App..."
        setTimeout(() => {
            ipcRenderer.send('restart_app');
        }, 1000);
    }, 2000);
  });