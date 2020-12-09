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

var placem = firebase.firestore().collection("rooms").doc(id).collection("member");
var size;
placem.onSnapshot((snapshot)=> {
    snapshot.docChanges().forEach((changem) => {
        placem.get().then(function(snapm){
            size = snapm.size;
            document.getElementById('cnt').innerHTML = "参加人数:"+size;
        })
    });
 });