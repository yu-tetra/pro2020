// canvas
 var cnvs = document.getElementById('canvas');
 var ctx = cnvs.getContext('2d');

 // 変数宣言
 var w = $('.dcanvas').width();
 console.log(w);
 var h = $('.dcanvas').height()
 console.log(h);
 const cnvWidth = w;
 const cnvHeight = h;

$('#canvas').attr('width', w);
$('#canvas').attr('height', h);

 var cnvColor = "255, 255, 255, 1";  // 線の色(赤、緑、青、透明度)初期値
 var cnvBold = 3;  // 線の太さ
 var clickFlg = 0;  // クリック中の判定 1:クリック開始 2:クリック中
 var bgColor = "rgb(0,70,67)";
 var rgba_code = "255, 255, 255, 1"; //線の色

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
   cnvColor = rgba_code;  //線の色
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


/// 長押しを検知する閾値
var LONGPRESS = 500;
/// 長押し実行タイマーのID
var timerId;
 
/// 長押し・ロングタップを検知する
$('.pen').on("mousedown touchstart",function(){
  timerId = setTimeout(function(){
    /// 長押し時（Longpress）のコード
    showpallete();
  }, LONGPRESS);
}).on("mouseup mouseleave touchend",function(){
  clearTimeout(timerId);
});

//パレット表示
function showpallete(){
  var wObjballoon	= document.getElementById("colorPicker");
  if (wObjballoon.className == "palette1"){
  wObjballoon.className = "palette";
  }else{
  wObjballoon.className = "palette1";
  }
}

//jQueryから色コード取得
var picker = document.getElementById('colorPicker');
function colorChanged(event){
  var color = event.detail[0];
  console.log('color:' + color);
  picker.value = color;
  cnvColor = getRgba(color);
  console.log(cnvColor);
}
picker.addEventListener('change',colorChanged);

//カラーコードのRGBA変換
function getRgba(color,alpha = 1){

  var red= parseInt(color.substring(1,3), 16);
  var green = parseInt(color.substring(3,5), 16);
  var blue  = parseInt(color.substring(5,7), 16);
  rgba_code  = red + ',' + green + ',' + blue + ',' + alpha;

  return rgba_code;
}

//カラーピッカーの閉じボタン
document.getElementById("close").onclick = function(){
  var wObjballoon	= document.getElementById("colorPicker");
  wObjballoon.className = "palette1";
};