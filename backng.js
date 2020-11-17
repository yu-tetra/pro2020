//戻るボタン無効化
window.scrollBy(0,0);

$(function(){
    history.pushState(null, null, null); //ブラウザバック無効化
    //ブラウザバックボタン押下時
    $(window).on("popstate", function (event) {
      history.pushState(null, null, null);
      window.alert('ブラウザバックは使用しないでください。');
    });
});