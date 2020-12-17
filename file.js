var db = firebase.firestore();
var cookies = document.cookie;
var cookieItem = cookies.split(";");
var elem = cookieItem[0].split("=");
var elem1 = cookieItem[1].split("=");
var id = "def";

if(elem[0] == "id"){
  id = elem[1];
}else{
  id = elem1[1];
}

var storage = firebase.storage();
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
var mountainsRef = storageRef.child('mountains.jpg');

// Create a reference to 'images/mountains.jpg'
var mountainImagesRef = storageRef.child('images/mountains.jpg');

//ref省略
var setp = firebase.firestore().collection("rooms").doc(id);
var disp = firebase.firestore().collection("rooms")

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
    //console.log(file);
    var image = file[0];

    var ref = firebase.storage().ref().child(image.name);
    ref.put(image).then(function(snapshot) {
    Swal.fire({
      title: '画像をアップロードしました',
      icon: 'success'
    });

    ref.getDownloadURL().then(function(url){
      setp.update({
        key:url,
      })
    
      //ズーム用
      var img = document.getElementById("imgSample");
      var src = img.getAttribute("src")
      img.setAttribute('data-zoom-image',src);

      //console.log(url);
      //document.getElementById('imgSample').src = url;
    })
  });

}, false);
