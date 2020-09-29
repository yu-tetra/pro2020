// Create a root reference
var storage = firebase.storage();
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
var mountainsRef = storageRef.child('mountains.jpg');

// Create a reference to 'images/mountains.jpg'
var mountainImagesRef = storageRef.child('images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name            // true
mountainsRef.fullPath === mountainImagesRef.fullPath    // false

var dataUrl;
var objFile = document.getElementById("upimg");
objFile.addEventListener("change", function(evt) {
    var file = evt.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function() {
        dataUrl = reader.result;
    };
    console.log(file);
    var image = file[0];

    var ref = firebase.storage().ref().child(image.name);
    ref.put(image).then(function(snapshot) {
      alert('アップロードしました');
    });
}, false);