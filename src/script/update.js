const { ipcRenderer } = require("electron");

const label = document.getElementById("label");
const progress = document.getElementById("progress");

ipcRenderer.on('message', function(event, text) {
    label.textContent = text;
  });