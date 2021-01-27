const { app } = require('electron');
const remote = require('electron').remote;

var fullname, email, password, phone, status;

function Ready(){
    document.getElementById('statusString').textContent = "Creating Account...";
    fullname = document.getElementById('name').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    phone = document.getElementById('phone').value;

    if(fullname, email, password, phone === ""){
        status = "empty_fields"
    }else if(phone.length < 7 || phone.length > 7) {
        status = "invalid_phone";
    }else if(password.length < 8) {
        status = "invalid_password";
    }else{
        firebase.database().ref('users/' + fullname).on('value', function(snapshot) {
            if(snapshot.val()){
                status = "username_invalid";
            }
        })
    }
}


function signup(){
    Ready();
    if(status === "empty_fields") {
        document.getElementById('statusString').textContent = "All The Fields Must Be Filled!";
        document.getElementById('statusString').className = "statusString error";
    }else if(status === "username_invalid") {
        setTimeout(function(){
            document.getElementById('statusString').textContent = "That User Already Exists!";
            document.getElementById('statusString').className = "statusString error";
        }, 3000);
    }else if(status === "invalid_phone") {
        document.getElementById('statusString').textContent = "Invalid Phone Number!";
        document.getElementById('statusString').className = "statusString error";
    }else if(status === "invalid_password") {
        document.getElementById('statusString').textContent = "Password Cannot Be Shorter Than 8 Characters!";
        document.getElementById('statusString').className = "statusString error";
    }else{

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


        var username = fullname.replace(/ .*/,'');

        firebase.database().ref('users/' + fullname).set({
            Fullname: fullname,
            Username: username ,
            Email: email,
            Password: password,
            PhoneNO: phone,
            isOnline: true,
            Pfp: "../../imgs/user.png"
        });
        setTimeout(function(){
            document.getElementById('statusString').textContent = "Your Account Was Created!"
        }, 4000);
        setTimeout(() => {
            document.getElementById('statusString2').textContent = "Logging In...";
         }, 3000);
         setTimeout(() => {
             ipcRenderer.send('open-home');
             var editJsonFile = require("edit-json-file");
             var settings = editJsonFile(`${__dirname}/../script/settings.json`);
             settings.set("Fullname", fullname);
             settings.save()
          }, 3000);
    }
}