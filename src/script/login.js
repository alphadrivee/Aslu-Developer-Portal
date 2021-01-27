const editJsonFile = require('edit-json-file');
const { ipcRenderer } = require('electron');
var username, password;
var no = 0;

function login(){
    document.getElementById('statusString2').textContent = "Attempting To Login To Portal...";
    document.getElementById('statusString2').className = "statusString";
    username = document.getElementById('username2').value;
    password = document.getElementById('password2').value;

    if(username, password === ""){
        document.getElementById('statusString2').textContent = "Fields cannot be empty!";
        document.getElementById('statusString2').className = "statusString error";
    }else{
        firebase.database().ref('users/' + username).on('value', function(snapshot) {
            if(!snapshot.exists()){
                document.getElementById('statusString2').textContent = "That user doesn't exist!";
                document.getElementById('statusString2').className = "statusString error";
            }else {
                password = password.toUpperCase();

                password = password.replace(/A/g, "c8");
                password = password.replace(/B/g, "j9");
                password = password.replace(/C/g, "ss");
                password = password.replace(/D/g, "o8");
                password = password.replace(/E/g, "12");
                password = password.replace(/F/g, "au");
                password = password.replace(/G/g, "hu");
                password = password.replace(/H/g, "iv");
                password = password.replace(/I/g, "1v");
                password = password.replace(/J/g, "f2");
                password = password.replace(/K/g, "k9");
                password = password.replace(/L/g, "7t");
                password = password.replace(/M/g, "4y");
                password = password.replace(/N/g, "15");
                password = password.replace(/O/g, "39");
                password = password.replace(/P/g, "e8");
                password = password.replace(/Q/g, "m5");
                password = password.replace(/R/g, "60");
                password = password.replace(/S/g, "30");
                password = password.replace(/T/g, "10");
                password = password.replace(/U/g, "d8");
                password = password.replace(/V/g, "nt");
                password = password.replace(/W/g, "g5");
                password = password.replace(/X/g, "px");
                password = password.replace(/Y/g, "3z");
                password = password.replace(/Z/g, "18");

                if(snapshot.val().Password !== password){
                    document.getElementById('statusString2').textContent = "Incorrect Password!";
                    document.getElementById('statusString2').className = "statusString error";
                }else{
                    setTimeout(() => {
                       document.getElementById('statusString2').textContent = "Logging In...";
                    }, 3000);
                    setTimeout(() => {
                        ipcRenderer.send('open-home');
                        var editJsonFile = require("edit-json-file");
                        var settings = editJsonFile(`${__dirname}/../script/settings.json`);
                        settings.set("Fullname", username);
                        settings.save()
                     }, 3000);
                }
            }
          });
    }
}

document.onkeypress = keyPress;

function keyPress(e){
    var x = e || window.event;
    var key = (x.keyCode || x.which);
    if(key == 13 || key == 3){
        login();
    }
}