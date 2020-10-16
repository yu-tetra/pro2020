var setp = firebase.firestore().collection("rooms").doc("roomID");
var disp = firebase.firestore().collection("rooms")


disp.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        if (change.type === "modified") {
            //console.log("Document data:", change.doc.data());
            document.getElementById('imgSample').src = change.doc.data().key;  
        }
    //setp.onSnapshot((snapshot)=> {
    //setp.get().then(function(doc) {
    //console.log("Document data:", doc.data());
    //document.getElementById('imgSample').src = doc.data().key;
    })
});