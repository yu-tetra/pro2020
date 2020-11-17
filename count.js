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