//マウスストーカー
const stalker = document.getElementById('mouse-stalker'); 
document.addEventListener('mousemove', function (e) {
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});
//END

//スクロール
	
$(function(){
    $('a[href^="#"]').click(function(){
      var speed = 500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({scrollTop:position}, speed, "swing");
      return false;
    });
  });

  //pagetop
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
	var scroll = $(window).scrollTop();
	if (scroll >= 200){//上から200pxスクロールしたら
		$('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
		$('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
	}else{
		if($('#page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
			$('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
			$('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
		}
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top a').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});

//END

//ツールチップ//

tippy('.cap', {//指定した要素にツールチップが出現
	placement: 'top-start',//ツールチップの表示位置⇒top、top-start、top-end、right、right-start、right-end、bottom、bottom-start、bottom-end、left、left-start、left-end。指定をしなくてもtopに表示
	animation: 'shift-toward-subtle',//ツールチップ出現の動き。動きを指定するにはhttps://unpkg.com/browse/tippy.js@5.0.3/animations/から任意の動きを選び<head>内に読み込むことが必要。使用できる動き⇒shift-away、shift-away-subtle、shift-away-extreme、shift-toward、shift-toward-subtle、shift-toward-extreme、scale、scale-subtle、scale-extreme、perspective、perspective-subtle、perspective-extreme。指定をしなくてもfadeで表示
	theme: 'light-border',//ツールチップのテーマの色。色を指定するにはhttps://unpkg.com/browse/tippy.js@5.0.3/themes/からテーマを選び<head>内に読み込んで指定する。テーマの種類⇒light、light-border、material、translucent。指定をしなくても黒色で表示
	duration: 200,//ツールチップの出現の速さをミリ秒単位で指定
}
)

//クリップボードにコピペしたらメッセージを表示//
function copyToClipboardAndShowMessage(text, message) {
    const input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert(message);
  }

  // 通知を送信する前に、ユーザーに通知の許可を求めます
if (Notification.permission !== 'granted') {
  Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      // 通知を送信します
      var notification = new Notification('Notification', {body: 'This is a notification.'});
    }
  });
} else {
  // 通知を送信します
  var notification = new Notification('Notification', {body: 'This is a notification.'});
}

/*------------------------------------------------*/

/*=============画像をホバーしたときにズームさせるためのコード=================*/



// 画像要素を取得する
const img = document.querySelector('img');

// 画像をホバーした時の処理
img.addEventListener('mouseenter', function() {
  // データ属性から拡大する画像のパスを取得する
  const zoomImg = this.getAttribute('data-zoom');

  // 新しい画像要素を作成する
  const zoomedImg = new Image();
  zoomedImg.src = zoomImg;

  // 画像を拡大する
  zoomedImg.style.transform = 'scale(1.5)';

  // 画像を表示する
  this.parentElement.appendChild(zoomedImg);
});

// 画像からマウスが離れた時の処理
img.addEventListener('mouseleave', function() {
  // 拡大した画像要素を削除する
  const zoomedImg = this.parentElement.querySelector('img');
  this.parentElement.removeChild(zoomedImg);
});