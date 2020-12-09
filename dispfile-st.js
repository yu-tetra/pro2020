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

var setp = db.collection("rooms").doc(id);
var disp = db.collection("rooms");

var dk;
var zoomflg = true;

disp.onSnapshot(function(snapshot) {
   /* snapshot.docChanges().forEach(function(change) {
        if (change.type === "modified") {
            //console.log("Document data:", change.doc.data());
            document.getElementById('imgSample').src = change.doc.data().key;  
        }
    })*/
    setp.onSnapshot((snapshot)=> {
    setp.get().then(function(doc) {
      if(doc.exists){
        console.log("tu")
      }else{
        location.href = "exit-st.html"
      }
    
      dk= doc.data().key;

      document.getElementById('imgSample').src = dk;

      var img = document.getElementById("imgSample");
      img.setAttribute('src',dk);

      zoom();
      
      $("#zoom_b").off('click');
      $("#zoom_b").on('click',function(){
        if(zoomflg){
          $.removeData(img,'elevateZoom');
          $('.zoomContainer').remove();
          zoomflg = false;
        }else{
          zoom();
          zoomflg = true;
        }
      });
    })
  });
});


//ズーム
function zoom(){
  $("#imgSample").elevateZoom({
    zoomType : "inner",
    cursor: "crosshair"
  });
}