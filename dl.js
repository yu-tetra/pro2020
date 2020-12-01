    var imgscr;
    var cookies = document.cookie;
    var cookieItem = cookies.split(";");
    var elem = cookieItem[0].split("=");
    var elem1 = cookieItem[1].split("=");
    var id = "def";

    if(elem[0] == "id"){
    id = elem[1];
    }else{
    id = elem1[1];
    };

    var ref= firebase.firestore().collection("rooms").doc(id).collection("canvas").orderBy("time");

    ref.onSnapshot((snapshot)=> {
        snapshot.docChanges().forEach((change) => {
            if(change.type === "added"){
                imgscr = change.doc.data().canvas;
                document.getElementById('dlimg').href = imgscr;
                document.getElementById('dlimg').download = id+"png";
            }
        });
    });