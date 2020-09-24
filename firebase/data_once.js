var admin = require("firebase-admin");

// 1. サービスアカウント鍵を生成しserviceAccountKey.jsonでリネームしてフォルダ直下に配置
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // 2. Realtime DatabaseのページでdatabaseURLを確認して反映
  databaseURL: "https://<databaseURL>.firebaseio.com"
});

var db = admin.database();
var refSensor = db.ref("protoout/studio/sensor");
refSensor.once('value')
  .then(function(dataSnapshot) {
    console.log('refSensor');
    console.log(dataSnapshot.toJSON());
  });
