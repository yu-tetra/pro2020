var db = firebase.firestore();

var place = db.collection("rooms").doc("roomID").collection("chatroom");

const btn = document.getElementById("btn");
var message = document.getElementById("message");
const disp = document.getElementById("tdisp");

//送信処理
btn.addEventListener('click', ()=> {
   console.log(message.value);
   place.add({
      chat: message.value,
      time: firebase.firestore.FieldValue.serverTimestamp()
   });
});

//受信処理
place.orderBy("time").onSnapshot((snapshot) => {
   snapshot.docChanges().forEach((change) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(change.doc.id, " => ", change.doc.data);
      
});
});

      var chat = change.doc.data();
      $("#tdisp").append('<td>'+chat.chat+'</td>');