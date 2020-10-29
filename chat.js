var db = firebase.firestore();
var cookies = document.cookie;
var cookieItem = cookies.split(";");
var elem = cookieItem[0].split("=");
var elem1 = cookieItem[1].split("=");
var id = "def";
var name = "user";

if(elem[0] == "id"){
   id = elem[1];
   name = elem1[1];
}else{
   id = elem1[1];
   name = elem[1];
}

var place = db.collection("rooms").doc(id).collection("chatroom");

var btn = document.getElementById("btn");
var message = document.getElementById("message");
//送信処理
btn.addEventListener('click', ()=> {
   //console.log(escape(message.value));
   var chatm = message.value;
   //console.log(chatm);
   place.add({
      chat: name+":"+chatm,
      time: firebase.firestore.FieldValue.serverTimestamp()
   });
});
document.addEventListener("submit", (e)=>{
   e.preventDefault();
 });