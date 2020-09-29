// canvas
 var cnvs = document.getElementById('canvas');
 var ctx = cnvs.getContext('2d');

 // 変数宣言
 const cnvWidth = 1100;
 const cnvHeight = 600;
 var cnvColor = "255, 255, 255, 1";  // 線の色(赤、緑、青、透明度)
 var cnvBold = 3;  // 線の太さ
 var clickFlg = 0;  // クリック中の判定 1:クリック開始 2:クリック中
 var bgColor = "rgb(0,70,67)";

 // canvas上でのイベント
 $("#canvas").mousedown(function(){
   clickFlg = 1; // マウス押下開始
 }).mouseup(function(){
   clickFlg = 0; // マウス押下終了
 }).mousemove(function(e){
   // マウス移動処理
   if(!clickFlg) return false;
   draw(e.offsetX, e.offsetY);
 });

 // 描画処理
 function draw(x, y) {
   ctx.lineWidth = cnvBold;
   ctx.strokeStyle = 'rgba('+cnvColor+')';
   // 初回処理の判定
   if (clickFlg == "1") {
     clickFlg = "2";
     ctx.beginPath();
     ctx.lineCap = "round";  //　線を角丸にする
     ctx.moveTo(x, y);
   } else {
     ctx.lineTo(x, y);
   }
   ctx.stroke();
 };

 //ペン
 $("#pen").click(function(){
   cnvBold = 3;    //線の太さ
   cnvColor = "255, 255, 255, 1";  //線の色
 })

 //消しゴム
  $("#eraser").click(function(){
   cnvBold = 20;    //線の太さ
   cnvColor = "0, 70, 67, 1";  //線の色
 })

 // 描画クリア
 $("#clear").click(function(){
   ctx.clearRect(0,0,cnvWidth,cnvHeight);
   setBgColor();
 });
