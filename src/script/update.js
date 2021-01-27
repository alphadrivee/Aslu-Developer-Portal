const { ipcRenderer } = require("electron");

const label = document.getElementById("label");
const progress = document.getElementById("progress");

ipcRenderer.on('message', function(event, text) {
    var container = document.getElementById('messages');
    var message = document.createElement('div');
    message.innerHTML = text;
    container.appendChild(message);
  });