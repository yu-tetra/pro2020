var db = firebase.firestore();
var place = db.collection("rooms").doc("roomID").collection("chatroom");

var btn = document.getElementById("btn");
var message = document.getElementById("message");
//送信処理
btn.addEventListener('click', ()=> {
   //console.log(escape(message.value));
   var chatm = message.value;
   //console.log(chatm);
   place.add({
      chat: chatm,
      time: firebase.firestore.FieldValue.serverTimestamp()
   });
});
document.addEventListener("submit", (e)=>{
   e.preventDefault();
 });