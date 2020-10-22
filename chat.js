var db = firebase.firestore();
var place = db.collection("rooms").doc("roomID").collection("chatroom");

var btn = document.getElementById("btn");
var message = document.getElementById("message");
//送信処理
btn.addEventListener('click', ()=> {
   var mas = escape(message.value);
   place.add({
      chat: mes,
      time: firebase.firestore.FieldValue.serverTimestamp()
   });
});
document.addEventListener("submit", (e)=>{
   e.preventDefault();
 });