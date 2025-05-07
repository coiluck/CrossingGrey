// 色相エフェクトを管理する関数
function setupHueRotationEffect(imageElement) {
  // hueの初期値
  let hue = 350;
  // 次に目指すhueの目標値 (最初は30)
  let targetHue = 30;
  // 1フレームあたりに変化させるhueの量
  const step = 0.2;
  // 停止用ID
  let animationFrameId;

  function shiftHue() {
    // 現在のhueと目標値(targetHue)の差を計算
    // 色相は円環なので、360度を考慮して最短距離の差を求める
    let diff = targetHue - hue;
    if (diff > 180) {
      diff -= 360;
    } else if (diff < -180) {
      diff += 360;
    }

    // 目標値との差がstepより小さいか？
    if (Math.abs(diff) < step) {
      // ほぼ目標値に到達したので、hueを目標値に正確に設定
      hue = targetHue;
      // 次の目標値を設定 (30 -> 350, 350 -> 30 のように切り替え)
      targetHue = (targetHue === 30) ? 350 : 30;
    } else {
      // 目標値に向かってhueをstep分だけ変化させる
      hue += (diff > 0) ? step : -step;
    }

    // hueの値を 0 <= hue < 360 の範囲に正規化
    hue = ((hue % 360) + 360) % 360;

    // 画像のfilterスタイルを更新
    imageElement.style.filter = `hue-rotate(${hue}deg)`;
    // 次のフレームで再びこの関数を呼び出す
    animationFrameId = requestAnimationFrame(shiftHue);
  }

  // アニメーションを停止する関数
  function stopEffect() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null; // IDをクリア
      console.log("停止します - 色相エフェクト");
    }
  }

  // アニメーションを開始し、最初のIDを保存
  animationFrameId = requestAnimationFrame(shiftHue);

  // 停止用の関数を返す
  return stopEffect;
}

// タイトルとスタートボタンの表示を管理する関数
function setupTitleAndButton() {
  const titleContainer = document.getElementById('title-container');
  const startButton = document.getElementById('start-button');

  // タイトルを表示
  titleContainer.style.display = "block";
  setTimeout(() => {
    titleContainer.classList.add('fadein-title');
  }, 200);
  console.log("表示します: タイトル");

  // スタートボタンを表示
  setTimeout(() => {
    startButton.style.display = "block";
    startButton.classList.add('fadein-title-button');
  }, 1000);

  // スタートボタンに下線を引く
  setTimeout(() => {
    startButton.classList.add('active');
  }, 3500);
  console.log("表示します: スタートボタン");
}

// 画面サイズのチェック
function checkScreenSize() {
  if (window.innerWidth >= 1981) {
    alert("画面幅が大きすぎます。FHD以上の幅はレイアウトが崩れる可能性があります。Windowの幅を変更して調整してください");
  }
}

// メイン処理の開始
document.addEventListener('DOMContentLoaded', () => {
  // タイトルとボタンの表示設定
  setupTitleAndButton();
  // 画面サイズをチェック
  checkScreenSize();
  // 背景画像に色相エフェクトを適用
  const backgroundImage = document.querySelector('img');
  let stopHueRotation = null; // 停止関数を保持する変数
  if (backgroundImage) {
    // setupHueRotationEffect を呼び出し、停止関数を受け取る
    stopHueRotation = setupHueRotationEffect(backgroundImage);
  }
  const stopTriggerElement = document.getElementById('start-button');
  if (stopTriggerElement) {
    stopTriggerElement.addEventListener('click', () => {
      console.log('ゲーム開始');
      // 色相エフェクトを停止
      stopHueRotation();
      // オープニングへ移行
      toOpening();
    });
  } 
});

function toOpening() {
  // タイトルモーダルを離脱
  document.getElementById('modal-title').classList.add('fadeout-modal');
  setTimeout(() => {
    document.getElementById('modal-title').classList.add('no-display');
    // オープニングへ移行
    document.getElementById('modal-opening').classList.remove('no-display');
    document.getElementById('modal-opening').classList.add('fadein-modal');
  }, 1000);
  setTimeout(() => {
    // オープニングのスキップボタンを表示
    const hasSeenOpeningStory = localStorage.getItem("hasSeenOpeningStory");
      if (hasSeenOpeningStory === "true") {
        // Skip表示
        console.log("感知しました: オープニング - 複数回目");
        document.getElementById("skip-window").classList.remove('no-display');
        document.getElementById("skip-window").classList.add('fadein-modal');
      } else {
        console.log("感知しました: オープニング - 初回");
      }
  }, 1500);
}

// Skipボタンの処理
const skipCansel = function(event){
  // イベントの伝播を防ぐ
  event.stopPropagation();
  // スキップをキャンセル
  console.log("選択しました: スキップしない");
  document.getElementById("skip-button").removeEventListener('click', skipExecute); // イベントリスナーを解除
  document.getElementById("skip-cancel").removeEventListener('click', skipCansel); // イベントリスナーを解除
  document.getElementById("skip-window").classList.add('fadeout-modal'); // フェードアウト開始
  setTimeout(function() { 
    document.getElementById("skip-window").style.display = "none"; 
  }, 1000);
}
const skipExecute = function(event){
  // イベントの伝播を防ぐ
  event.stopPropagation();
  // スキップする場合
  console.log("選択しました: スキップする");
  document.getElementById("skip-button").removeEventListener("click", skipExecute); // イベントリスナーを解除
  document.getElementById("skip-cancel").removeEventListener("click", skipCansel); // イベントリスナーを解除
  // 見えてるのはフェードアウト
  document.getElementById("modal-opening").classList.add("fadeout-modal"); // フェードアウト開始
  setTimeout(function(){ 
    document.getElementById("modal-opening").style.display = "none"; 
  }, 1000);
  // 次の画面を表示
  // 後で書く
}

document.getElementById("skip-cancel").addEventListener("click", skipCansel);
document.getElementById("skip-button").addEventListener("click", skipExecute);
