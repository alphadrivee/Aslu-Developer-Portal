var editJsonFile = require("edit-json-file");
var settings = editJsonFile(`${__dirname}/../script/settings.json`);
const remote = require('electron').remote;
const dialog = remote.dialog;
const os = require('os');

//VARIABLES

var pfpURL;
var files = [];


function showDialog() {

    if(os.platform() === 'linux' || os.platform() === 'win32'){
        dialog.showOpenDialog({
          properties: ['openFile']
        }).then((obj) => {
         console.log(obj.filePaths)
         files = obj.filePaths;
         if(obj.filePaths[0]){
            document.getElementById('pfp').src = obj.filePaths[0];
         }

        })
      }else{
        dialog.showOpenDialog({
          properties: ['openFile', 'openDirectory']
        }).then((obj) => {
            console.log(files[0])
            files = obj.filePaths;
            if(obj.filePaths[0]){
                document.getElementById('pfp').src = obj.filePaths[0];
             }
        })
    }
}

async function UpdateProfile() {
    const nativeImage = require('electron').nativeImage;
    const image = nativeImage.createFromPath(files[0]);
    var uploadTask = firebase.storage().ref('PfP/' + settings.get("Fullname")).put(image.toJPEG(100));

    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.querySelector('.status').textContent = "Upload " + progress + "%";
    },

    async function(error){
        document.getElementById('pfp').src = '../../imgs/user.png';
    },

    async function(){
        document.querySelector(".status").textContent = "Uploading Profile...";
        await uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            firebase.database().ref('users/' + settings.get("Fullname")).update({
                Pfp: url
            })
            document.querySelector(".status").textContent = "Profile Information Saved!";
        });
        
    }

    );
}
firebase.database().ref('users/' + settings.get("Fullname")).on('value', function(snapshot){

    var username = (snapshot.val().Username) ? snapshot.val().Username : "";
    var address = (snapshot.val().Address) ? snapshot.val().Address : "";
    var atoll = (snapshot.val().Island) ? snapshot.val().Island : "";
    var dob = (snapshot.val().DateofBirth) ? snapshot.val().DateofBirth : "";
    var id = (snapshot.val().DateofBirth) ? snapshot.val().DateofBirth : "";



    document.getElementById('pfp').src = snapshot.val().Pfp || "../../imgs/user.png";
    document.getElementById("fullname").value = snapshot.val().Fullname;
    document.getElementById("email").value = snapshot.val().Email;
    document.getElementById("phone").value = snapshot.val().PhoneNO;
    document.getElementById("password").value = snapshot.val().Password;
    document.getElementById("username").value = username;
    document.getElementById("address").value = address;
    document.getElementById("atoll").value = atoll;
    document.getElementById("id").value = id;
    document.getElementById("dob").value = dob;

    document.querySelector('.status').textContent = "Auto Fill Complete!";
});

function save(){

    var fullname = (document.getElementById("fullname").value !== "") ? document.getElementById("fullname").value : "";
    var username = (document.getElementById("username").value !== "") ? document.getElementById("username").value : "";
    var email = (document.getElementById("email").value !== "") ? document.getElementById("email").value : "";
    var password = (document.getElementById("password").value !== "") ? document.getElementById("password").value : "";
    var phone = (document.getElementById("phone").value !== "") ? document.getElementById("phone").value : "";
    var address = (document.getElementById("address").value !== "") ? document.getElementById("address").value : "";
    var atoll = (document.getElementById("atoll").value !== "") ? document.getElementById("atoll").value : "";
    var id = (document.getElementById("id").value !== "") ? document.getElementById("id").value : "";
    var dob = (document.getElementById("dob").value !== "") ? document.getElementById("dob").value : "";

    if(document.getElementById("pfp").src !== "../../imgs/user.png"){
        UpdateProfile()
    }

    firebase.database().ref('users/' + settings.get("Fullname")).update({
        Fullname: fullname,
        Username: username,
        Email: email,
        Password: password,
        PhoneNO: phone,
        Address: address,
        Island: atoll,
        DateofBirth: dob,
        ID: id,
        isOnline: true
    }).catch((error) => {
        document.querySelector(".status").textContent = "Something went wrong..."
    });

    document.querySelector('.status').textContent = "Profile Information Saved!"
}