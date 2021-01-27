const { app } = require('electron');
const remote = require('electron').remote;

//VARIABLES

var imgName, imgURL;
var files = [];


function OpenDialog() {

    const remote = require('electron').remote;
    const dialog = remote.dialog;
    const os = require('os');

    if(os.platform() === 'linux' || os.platform() === 'win32'){
        dialog.showOpenDialog({
          properties: ['openFile']
        }).then((obj) => {
         console.log(obj.filePaths)
         files = obj.filePaths;
         document.getElementById('adImg').src = obj.filePaths[0];

        })
      }else{
        dialog.showOpenDialog({
          properties: ['openFile', 'openDirectory']
        }).then((obj) => {
            console.log(files[0])
            files = obj.filePaths;
            document.getElementById('adImg').src = obj.filePaths[0];
        })
    }
}

function Upload() {
    const nativeImage = require('electron').nativeImage
    imgName = document.getElementById('adName').value;
    const image = nativeImage.createFromPath(files[0]);
    console.log(image.toJPEG(100));
    var uploadTask = firebase.storage().ref('Images/Ad.jpg').put(image.toJPEG(100));

    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('UpProgress').innerHTML = "Upload " + progress + "%";
    },

    function(error){
        document.getElementById('adImg').src = '../../imgs/ErrorImg.jpg';
    },

    function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            imgURL = url;


            firebase.database().ref('Ads/Ad').set({
                Name: imgName,
                Link: imgURL
            });

        document.getElementById('adImg').src = '../../imgs/Complete.jpg';
        });
        
    }

    );
}




var cardName, cardURL;
var Bfiles = [];




function BrowseCard() {
    const remote = require('electron').remote;
    const dialog = remote.dialog;
    const os = require('os');

    if(os.platform() === 'linux' || os.platform() === 'win32'){
        dialog.showOpenDialog({
          properties: ['openFile']
        }).then((obj) => {
         Bfiles = obj.filePaths;
         document.getElementById('Status').src = obj.filePaths[0];

        })
      }else{
        dialog.showOpenDialog({
          properties: ['openFile', 'openDirectory']
        }).then((obj) => {
            Bfiles = obj.filePaths;
            document.getElementById('Status').src = obj.filePaths[0];
        })
    }
}

function UploadCard(){
    const nativeImage = require('electron').nativeImage
    const image = nativeImage.createFromPath(Bfiles[0]);
    var uploadTask = firebase.storage().ref('Images/Status.jpg').put(image.toJPEG(100));

    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('UpProgress').innerHTML = "Upload " + progress + "%";
    },

    function(error){
        document.getElementById('Status').src = '../../imgs/ErrorImg.jpg';
    },

    function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            cardURL = url;


            firebase.database().ref('Status/Card').set({
                Link: cardURL
            });

        document.getElementById('Status').src = '../../imgs/Complete.jpg';
        });
        
    }

    );
}
