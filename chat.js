var database = firebase.database();

let roomc = "chat_room";
const btn = document.getElementById("btn");
const message = document.getElementById("message");
const output = document.getElementById("output");

//送信処理
btn.addEventListener('click', function() {
   var now = new Date();
   database.ref(roomc).push({
       message: message.value,
   });
   console.log(message);
   message.value="";
});

//受信処理
database.ref(roomc).on("child_added", function(data) {
   const v = data.val();
   const k = data.key;
   let str = "";
   str += '<div class="text">メッセージ：'+v.message+'</div><hr>';
   output.innerHTML += str;
});