// canvas
 var cnvs = document.getElementById('canvas');
 var ctx = cnvs.getContext('2d');

// 変数宣言
 var w = $('.dcanvas').width();
 //console.log(w);
 var h = $('.dcanvas').height()
 //console.log(h);
 const cnvWidth = w;
 const cnvHeight = h;

$('#canvas').attr('width', w);
$('#canvas').attr('height', h);
$('#canvas2').attr('width', w);
$('#canvas2').attr('height', h);

 var cnvColor = "255, 255, 255, 1";  // 線の色(赤、緑、青、透明度)初期値
 var cnvBold = 3;  // 線の太さ
 var clickFlg = 0;  // クリック中の判定 1:クリック開始 2:クリック中
 var bgColor = "rgb(0,70,67)";
 var color = '#ffffff';   //カラーコード保持変数
 var rgba_code = "255, 255, 255, 1"; //線の色

 var red = 255;   //カラーコード変換・波線の色変換用
 var green = 255;   //カラーコード変換・波線の色変換用
 var blue = 255;   //カラーコード変換・波線の色変換用

 var oldGCO = ctx.globalCompositeOperation;  //消しゴム

 canvasdraw();

function canvasdraw(){
   // canvas上でのイベント
  $(cnvs).mousedown(function(){
    clickFlg = 1; // マウス押下開始
  }).mouseup(function(){
    clickFlg = 0; // マウス押下終了
  }).mousemove(function(e){
    // マウス移動処理
    if(!clickFlg) return false;
    draw(e.offsetX, e.offsetY);
  });
}


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
 var p_flg = 0; //ペン使用フラグ(0:未使用 1:使用)
 $("#pen").click(function(){
   ctx.globalCompositeOperation = oldGCO;
   cnvBold = 3;    //線の太さ
   cnvColor = rgba_code;  //線の色
   p_flg = 1;

   $("#pen").css({
    'background-color': '#f9bc60'
  });
 })

 //消しゴム
 var e_flg = 0; //消しゴム使用フラグ(0:未使用 1:使用)
  $("#eraser").click(function(){
  ctx.globalCompositeOperation = 'destination-out';
  cnvBold = 30;    //線の太さ
  cnvColor = "0, 70, 67, 1";  //線の色
  e_flg = 1;

  $("#eraser").css({
    'background-color': '#f9bc60'
  });
 })

 // 描画クリア
 $("#clear").click(function(){
  ctx.globalCompositeOperation = oldGCO;
  ctx.clearRect(0,0,cnvWidth,cnvHeight);
 });

 
//カラーピッカーここから
//長押しを検知する閾値
var LONGPRESS = 500;
//長押し実行タイマーのID
var timerId;
 
/// 長押し・ロングタップを検知する
$('.pen').on("mousedown touchstart",function(){
  timerId = setTimeout(function(){
    ctx.globalCompositeOperation = oldGCO;
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
  color = event.detail[0];
  picker.value = color;
  cnvColor = getRgba(color);
}
picker.addEventListener('change',colorChanged);

//カラーコードのRGBA変換
function getRgba(color,alpha = 1){
  red= parseInt(color.substring(1,3), 16);
  green = parseInt(color.substring(3,5), 16);
  blue  = parseInt(color.substring(5,7), 16);
  rgba_code  = red + ',' + green + ',' + blue + ',' + alpha;

  return rgba_code;
}

//カラーピッカーの閉じボタン
document.getElementById("c_close").onclick = function(){
  var wObjballoon1	= document.getElementById("colorPicker");
  wObjballoon1.className = "palette1";
};
//カラーピッカーここまで


//メニューここから
//メニュー（クリック）
document.getElementById("menu").onclick = function(){
  $("#menu").css({
      'color': '#f9bc60'
    });
  showmenu();
};

//メニュー表示・非表示
function showmenu(){
  var menustatus = document.getElementById("menulist");
  if (menustatus.className == "menulist1"){
    menustatus.className = "menulist";
      $("#menu").css({
        'color': '#f9bc60'
      });
  }else{
    menustatus.className = "menulist1";
      $("#menu").css({
        'color': '#fffffe'
      });
  }
}

//退出確認
document.getElementById("exit").onclick = function(){
  var exitresult = confirm("部屋を退出しますか？");

  if(exitresult){
    location.href= "exit.html";
  }else{
    return;
  }
}

//メニューの閉じボタン
  document.getElementById("m_close").onclick = function(){
    var wObjballoon2	= document.getElementById("menulist");
    wObjballoon2.className = "menulist1";
    $("#menu").css({
      'color': '#fffffe'
    });
  };
//メニューここまで


//テキストツールここから
//文字挿入用の座標を保持する変数
var mouseX;
var mouseY;

//フォーム呼び出し
  document.getElementById("txt").onclick = function(){
    $("#txt").css({
      'color': '#f9bc60'
    });
    //処理をペンでの描画からテキストフォーム表示に切り替える・フォームの表示
    textform_positon();
  };

  //クリック位置にテキスト入力フォームを表示
  function textform_positon(){
    $(cnvs).on('click.text',function(e) {
      //クリックした際描画されないようペンを透明に
      cnvColor = "255, 255, 255, 0";

      //座標取得（canvasの左上を基準。-2ずつしているのはborderの分）
      var rect = e.target.getBoundingClientRect();
      mouseX = e.clientX - Math.floor(rect.left) - 2;
      mouseY = e.clientY - Math.floor(rect.top) - 2;

      //css書き換え（表示位置）
      var txtform = document.getElementById('txtform');
      txtform.style.left = mouseX;
      txtform.style.top = mouseY;

      //表示
      var formstatus = document.getElementById("txtform");
      formstatus.className = "txtform";
    });
  }

  //テキスト入力フォームの閉じボタン
  document.getElementById("t_close").onclick = function(){
    var wObjballoon3	= document.getElementById("txtform");
    wObjballoon3.className = "txtform1";
    //クリックした際にフォームを出さないようにする
    $(cnvs).off('click.text');

    $("#txt").css({
      'color': '#fffffe'
    });
    //描画に戻す
    cnvColor = rgba_code; //線の色
    cnvBold = 3;  // 線の太さ
  };

  //入力された文字列の受け取り
  document.getElementById("sendtxt").onclick = function gettxt(){
    var text = document.getElementById("inputtxt").value;
    drawtext(text);
  }

  //キャンバスに文字を書く
  function drawtext(text){
    //文字のスタイル
    ctx.font = '32px serif';
    ctx.fillStyle = color;

    //文字描画位置の指定・文字描画
    ctx.textAlign = 'left'; 
    ctx.fillText(text,mouseX,mouseY);
}
//テキストツールここまで


//直線ツール
let sX = null;  //始点
let sY = null;  //始点
let gX = null;  //終点
let gY = null;  //終点
let can_mouse_event = false;

document.getElementById("straight").onclick = function(){
  $("#straight").css({
    'color': '#f9bc60'
  });
  ctx.globalCompositeOperation = oldGCO;
  st_tool();
}

function st_tool(){

 //キャンパス・ツール以外がクリックされたら線を引かないようにする
  var flg = 1;
  $(document).on('click',function(e){
    if(!$(e.target).closest(cnvs).length &&  !$(e.target).closest('#straight').length){
      flg = 0;

      //「波線を引く」以外がクリックされたときは描画色を戻す
      if(!$(e.target).closest('#wave').length){
      //描画に戻す
      cnvColor = rgba_code; //線の色
      cnvBold = 3;  // 線の太さ
      }

      $("#straight").css({
        'color': '#fffffe'
      });
    }
  });

//クリックした際描画されないようペンを透明に
  cnvColor = "255, 255, 255, 0";

//始点を設定
  $(cnvs).on('mousedown.st',function(e){
    sX = e.offsetX;
    sY = e.offsetY;
    can_mouse_event = true;
  });

 //終点を設定/始点~終点までを線で結ぶ
  $(cnvs).on('mouseup.st',function(e){
    if(flg == 1){
      can_mouse_event = false;
      gX = e.offsetX;
      gY = e.offsetY;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineJoin  = "round";
      ctx.lineCap   = "round";
      ctx.beginPath();
      ctx.moveTo(sX,sY);
      ctx.lineTo(gX,gY);
      ctx.stroke();
    }
    $(cnvs).off('mousedown.st');
    $(cnvs).off('mouseup.st');
    $(cnvs).off('mouseout.st');
    flg = 0;

  //描画に戻す
    cnvColor = rgba_code; //線の色
    cnvBold = 3;  // 線の太さ

    $("#straight").css({
      'color': '#fffffe'
    });
  });
  
  $(cnvs).on('mouseout.st',function(e){
    can_mouse_event = false;
  });
}
//直線ツールここまで


//波線ツールここから
let w_sX = null;  //始点
let w_sY = null;  //始点
let w_gX = null;  //終点
let w_gY = null;  //終点
let w_can_mouse_event = false;
var distance; //座標の距離を格納
var img = new Image();  //画像
img.src = './Picture/波線1.png';  //画像

document.getElementById("wave").onclick = function(){
  $("#wave").css({
    'color': '#f9bc60'
  });
  ctx.globalCompositeOperation = oldGCO;
  wv_tool();
}

function wv_tool(){
 //キャンパス・ツール以外がクリックされたら線を引かないようにする
 var flg = 1;
 $(document).on('click',function(e){
   if(!$(e.target).closest(cnvs).length &&  !$(e.target).closest('#wave').length){
     flg = 0;
     $("#wave").css({
       'color': '#fffffe'
     });
   }
 });

//クリックした際描画されないようペンを透明に
  cnvColor = "255, 255, 255, 0";
//始点を設定
  $(cnvs).on('mousedown.wv',function(e){
    w_sX = e.offsetX;
    w_sY = e.offsetY;
    can_mouse_event = true;
  });

 //終点を設定/始点~終点までを線で結ぶ
  $(cnvs).on('mouseup.wv',function(e){
    
    if(flg == 1){
    can_mouse_event = false;
    w_gX = e.offsetX;
    w_gY = e.offsetY;

    w_distance();

    //波線の画像を挿入
    ctx.drawImage(img,w_sX,w_sY,distance,22);
    w_color();
    }

    $(cnvs).off('mousedown.wv');
    $(cnvs).off('mouseup.wv');
    $(cnvs).off('mouseout.wv');
    flg = 0;

    $("#wave").css({
      'color': '#fffffe'
    });

  //描画に戻す
    cnvColor = rgba_code; //線の色
    cnvBold = 3;  // 線の太さ
  });

  //座標間の距離
  function w_distance(){
    // x座標のみの差を求めて二乗する
    var distanceX = (w_sX - w_gX)*(w_sX - w_gX);
    // y座標も同じように処理
    var distanceY = (w_sY - w_gY)*(w_sY - w_gY);
    // 平方根を求める関数を使用して距離を出す
    distance = Math.sqrt(distanceX + distanceY);
  }

  //色変更
  function w_color(){
    var imageData = ctx.getImageData(w_sX,w_sY,distance,86);
    var data = imageData.data;

    // 変更したい色の範囲
    const minColor = { r: 255, g: 255, b: 255 };
    const maxColor = { r: 255, g: 255, b: 255 };

    // ここに現在のピクセル情報を入れていく
    var currentColor = {};

    // 1ピクセルずつ確認していく
    for(let i = 0, len = data.length; i < len; i += 4) {
      currentColor.r = data[i];
      currentColor.g = data[i + 1];
      currentColor.b = data[i + 2];
    
      // 指定したrgb内であれば変換する
      if(_checkTargetColor(currentColor, minColor, maxColor)) {
        data[i]     = red;
        data[i + 1] = green;
        data[i + 2] = blue;
        // data[i + 3] = 0; => アルファ値なので、0にすれば透明になる
      }
    }
    // ImageDataオブジェクトに、変更済みのRGBAデータ（変数data）を代入する
    imageData.data = data;

    // canvasに変更済みのImageDataオブジェクトを描画する
    ctx.putImageData(imageData,w_sX,w_sY);
  }

  // 色の判定用の関数（引数：現在のピクセルのrgb、指定色の最小値、指定色の最大値）
  // 指定したrgb内であれば true を返す
  function _checkTargetColor(current, min, max) {
    if(min.r > current.r || current.r > max.r) return;
    if(min.g > current.g || current.g > max.g) return;
    if(min.b > current.b || current.b > max.b) return;
    return true;
  };
  
  $(cnvs).on('mouseout.wv',function(e){
    w_can_mouse_event = false;
  });
}
//波線ツールここまで


//レイヤー
$("#la1").click(function(){
    $("#canvas").css({
      'z-index': '1'
    });

    $("#la1").css({
      'color': '#f9bc60'
    });

    $("#canvas2").css({
      'z-index': '0'
    });
    
    $("#la2").css({
      'color': '#fffffe'
    });

   cnvs = document.getElementById('canvas');
   ctx = cnvs.getContext('2d');
   canvasdraw();
});

$("#la2").click(function(){
  $("#canvas").css({
    'z-index': '0'
  });

  $("#la1").css({
    'color': '#fffffe'
  });

  $("#canvas2").css({
    'z-index': '1'
  });

  $("#la2").css({
    'color': '#f9bc60'
  });

  cnvs = document.getElementById('canvas2');
  ctx = cnvs.getContext('2d');
  canvasdraw();
});
//レイヤーここまで

//ペン・消しゴム背景色
$(document).on('click',function(e){
  if(!$(e.target).closest(cnvs).length &&  !$(e.target).closest('#pen').length
  && p_flg == 1){
    p_flg = 0;
    $("#pen").css({
      'background-color': 'transparent'
    });
  }
});

$(document).on('click',function(e){
  if(!$(e.target).closest(cnvs).length &&  !$(e.target).closest('#eraser').length
  && e_flg == 1){
    e_flg = 0;
    $("#eraser").css({
      'background-color': 'transparent'
    });
  }
});


//画像の貼り付け（ドラッグアンドドロップ）
//レイヤー2
var target2 = null;
document.addEventListener('DOMContentLoaded',function(){
  var imgSample = document.getElementById('imgSample');
  var cnvs2 = document.getElementById('canvas2');
  var ctx2 = cnvs2.getContext('2d');

  imgSample.addEventListener('dragstart',function(e){
    target2 = e.target;
  },false);

  cnvs2.addEventListener('dragover',function(e){
    e.preventDefault();
  },false);

  cnvs2.addEventListener('drop',function(e){
    e.preventDefault();
    var x = e.offsetX;
    var y = e.offsetY;

    //画像を貼る
    ctx2.drawImage(imgSample,x,y,imgSample.width,imgSample.height);
  });
});
//画像の貼り付け（ドラッグアンドドロップ）ここまで


//canvasを画像に変換
/* function save1(){
  var cnvs1 = document.getElementById('canvas');
  var src1 = cnvs1.toDataURL();
  var img1 = new Image();
  img1.src = src1;
  console.log(img1);
}

function save2(){
  var cnvs2 = document.getElementById('canvas2');
  var src2 = cnvs2.toDataURL();
  var img2 = new Image();
  img2.src = src2;
  console.log(img2);
}
*/

function save(){
  html2canvas(document.querySelector(".dcanvas")).then(canvas => {
    //ここにcanvas変換後の処理を記述する
    var imgcanvas = new Image();
    imgcanvas.crossOrigin = "anonymous";
    imgcanvas.href = canvas.toDataURL("image/png");
    var cimg = imgcanvas.href;

    console.log(cimg);
    });
};

setInterval(save,5000);