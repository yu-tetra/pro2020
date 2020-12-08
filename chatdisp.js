var db = firebase.firestore();
var cookies = document.cookie;
var cookieItem = cookies.split(";");
var elem = cookieItem[0].split("=");
var elem1 = cookieItem[1].split("=");
var id = "def";
var name = "user";
var hc;

if(elem[0] == "id"){
   id = elem[1];
   name = elem1[1];
}else{
   id = elem1[1];
   name = elem[1];
}

var place = db.collection("rooms").doc(id).collection("chatroom").orderBy("time");

//console.log(place);

place.onSnapshot((snapshot)=> {
    snapshot.docChanges().forEach((change) => {
       if(change.type === "added"){
          // doc.data() is never undefined for query doc snapshots
          $('#tdisp').append('<tr><td><font color="'+change.doc.data().color+'">'+change.doc.data().chat+'</font></td></tr>');
      }
    });
   //document.getElementById("disp").scrollBy(0,hc);
   var objDiv = document.getElementById("disp");
   objDiv.scrollTop = objDiv.scrollHeight;
 });