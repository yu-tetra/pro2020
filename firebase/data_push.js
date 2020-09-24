var admin = require("firebase-admin");

// 1. サービスアカウント鍵を生成しserviceAccountKey.jsonでリネームしてフォルダ直下に配置
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // 2. Realtime DatabaseのページでdatabaseURLを確認して反映
  databaseURL: "https://<databaseURL>.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("protoout/studio");

var usersRef = ref.child("sensorList");
usersRef.push({
    "temperature": 26,
    "humidity": 43
});

ref.on("value", function(snapshot) {
    console.log("value Changed!!!");
    console.log(snapshot.val());
}, 
function(errorObject) {
    console.log("failed: " + errorObject.code);
} );
