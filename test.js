var db = firebase.firestore();

var place = db.collection("rooms").doc("roomID").collection("chatroom").orderBy("time");

place.onSnapshot((snapshot)=> {
    snapshot.docChanges().forEach((change) => {
       if(change.type === "added"){
          // doc.data() is never undefined for query doc snapshots
          $('#tdisp').append('<tr><td>'+change.doc.data().chat+'</td></tr>');
          console.log(change.doc.data())
       }
    });
 });

 $('#tdisp').empty();
