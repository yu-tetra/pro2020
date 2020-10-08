var db = firebase.firestore();

var place = db.collection("rooms").doc("roomID").collection("chatroom");

const btn = document.getElementById("btn");
var message = document.getElementById("message");
const disp = document.getElementById("tdisp");
var time = firebase.firestore.FieldValue.serverTimestamp()

//送信処理
btn.addEventListener('click', ()=> {
   console.log(message.value);
   place.add({
      time: message.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
   });
});

//受信処理
place.get().then(function(querySnapshot) {
   querySnapshot.forEach(function(doc) {
       // doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data());
   });
});