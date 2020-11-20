var db = firebase.firestore();
var cookies = document.cookie;
var cookieItem = cookies.split(";");
var elem = cookieItem[0].split("=");
var elem1 = cookieItem[1].split("=");
var rid = "def";

if (elem[0] == "id") {
  rid = elem[1];
} else {
  rid = elem1[1];
};

clist = ["canvas","member","chatroom"];
dnlist = ["canvas","name","chat"];
var cnt = 0;

cldelete(clist[cnt],dnlist[cnt]);

db.collection("rooms").doc(rid).delete().then(function() {
    //console.log("Document successfully deleted!");
});

var size;
var delref;

function cldelete(dcl,dod){
    var ref = db.collection("rooms").doc(id).collection(dcl);

    ref.get().then(function (query) {
        size = query.size // will return the collection size
        //console.log(size);

        ref.orderBy(dod).get()
        .then((querySnapshot) => {
            for(i=0;i<size;i++){
                console.log(i);
                console.log(querySnapshot["docs"][i].id);
                var did = querySnapshot["docs"][i].id;
      
                ref.doc(did).delete().then(function() {        
                })
          }
        });
        cnt += 1;

        if(cnt < 2){
            //console.log(cnt);
        }else{
            cldelete(clist[cnt],dnlist[cnt]);
            return;
        };
    });
};
