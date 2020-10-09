var db = firebase.firestore();

var place = db.collection("rooms").doc("roomID").collection("chatroom");

const btn = document.getElementById("btn");
var message = document.getElementById("message");
//送信処理
btn.addEventListener('click', ()=> {
   place.add({
      chat: message.value,
      time: firebase.firestore.FieldValue.serverTimestamp()
   });
});
document.addEventListener("submit", (e)=>{
   e.preventDefault();
 });

//受信処理


      