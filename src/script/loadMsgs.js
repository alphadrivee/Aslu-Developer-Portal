var editJsonFile = require("edit-json-file");
var settings = editJsonFile(`${__dirname}/../script/settings.json`);
var d = moment().format("dd");
var pfp, resume;

firebase.database().ref("messages").on('child_added', function (snapshot) {
    
    firebase.database().ref("users/" + snapshot.val().Fullname).on('value', function(snapshot){
        if(!snapshot.exists()){
            resume = false;
        } else{
            resume = true;
        }
    });

    if(!resume) return;

    firebase.database().ref('users/' + snapshot.val().Fullname).on('value', function(snapshot){
       pfp = snapshot.val().Pfp; 
    });

    var timestamp;

    var day = `${snapshot.val().Timestamp[0]}${snapshot.val().Timestamp[1]}`;
    if(d === day){

        timestamp = snapshot.val().Timestamp.replace(day, "Today ");

    }else{

        timestamp = snapshot.val().Timestamp;
        
    }
    var html = "";

    if(snapshot.val().isHighlighted == true){

        html += "<div id=\"user-" + snapshot.key + "\" class=\"user highlight\">";

    }else{

        html += "<div id=\"user-" + snapshot.key + "\" class=\"user\">";

    }
    
    html += "<div class=\"user-avatar\">"
    html += "<img src=\""+ pfp +"\" alt=\"User\" width=\"50px\" height=\"50px\" style=\"float: left; border-radius: 30px;\">"
    html += "</div>";

    if(snapshot.val().Fullname === settings.get("Fullname")){

        var name = snapshot.val().Username || snapshot.val().Fullname;

        html += "<p class=\"username\">" + name + "<span class=\"me\">  ●  " + timestamp + " </span> <buttom onclick=\"showDropdown()\" class=\"options\">●●●</buttom> </p>";
        
        html += "<div id=\"myDropdown\" class=\"dropdown-content\">";

        html += "<a data-id=\""+ snapshot.key +"\" onclick=\"Highlight(this)\">Highlight</a>";

        html += "<a data-id=\""+ snapshot.key +"\" onclick=\"Delete(this)\">Delete</a>";

        html += "</div>"


    }else{
        
        var name = snapshot.val().Username || snapshot.val().Fullname;

        html += "<p class=\"username\">" + name + "<span class=\"they\">  ●  " + timestamp + " </span></p>";
    
    }
    html += "<p class=\"message user-" + snapshot.val().Fullname + "\">"+snapshot.val().Message+"</p>";

    html += "</div>"
    
    html += "</div>"

    document.getElementById('messages').innerHTML += html;


    items = document.querySelectorAll(".user");
    last = items[items.length-1];
    last.scrollIntoView();
    
    
});

firebase.database().ref("messages").on('child_removed', function (snapshot) {
    
    document.querySelector(".user-" + snapshot.val().Fullname).innerText = "Message Deleted By User.";
    document.querySelector(".user-" + snapshot.val().Fullname).className = "message user-deleted";
    document.getElementById("user-" + snapshot.key).className = "user";

});

firebase.database().ref("messages").on('child_changed', function (snapshot) {
    
    if(document.getElementById("user-" + snapshot.key).className ==="user"){
        document.getElementById("user-" + snapshot.key).className = "user highlight";
    }else{
        document.getElementById("user-" + snapshot.key).className = "user";
    }
});


function Delete(self){

    document.getElementById("myDropdown").className = "dropdown-content";
    const { remote } = require('electron');
    const { BrowserWindow } = require('electron').remote;

    function openDialog(){
        let child = new BrowserWindow({
            parent: remote.getCurrentWindow(), 
            modal: true, 
            frame: false,
            resizable: false,
            width: 500, 
            height: 190,
            webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true
            }
        });
    child.loadFile(__dirname + "./error.html");
    }

    openDialog();

    /*var messageID = self.getAttribute("data-id");
 
    firebase.database().ref('messages').child(messageID).remove();
    document.getElementById("myDropdown").className = "dropdown-content";*/
 }
 
 function Highlight(self){
 
    document.getElementById("myDropdown").className = "dropdown-content";
    const { remote } = require('electron');
    const { BrowserWindow } = require('electron').remote;

    function openDialog(){
        let child = new BrowserWindow({
            parent: remote.getCurrentWindow(), 
            modal: true, 
            frame: false,
            resizable: false,
            width: 500, 
            height: 190,
            webPreferences: {
                enableRemoteModule: true,
                nodeIntegration: true
            }
        });
    child.loadFile(__dirname + "./error.html");
    }

    openDialog();

     /*var messageID = self.getAttribute("data-id");
 
     firebase.database().ref('messages').child(messageID).once('value', function(snapshot){

        if(snapshot.exists()){
            
            if(snapshot.val().isHighlighted === true){
                firebase.database().ref('messages').child(snapshot.key).update({
                    isHighlighted: false,
                });
                document.getElementById("myDropdown").className = "dropdown-content";
            }else{
                firebase.database().ref('messages').child(snapshot.key).update({
                    isHighlighted: true,
                });
                document.getElementById("myDropdown").className = "dropdown-content";
            }
        }else{

            document.querySelector(".user-deleted").innerText = "You can't highlight a deleted message!"
        
        }
    });*/
 }

