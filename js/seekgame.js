// 地図上でピンをクリックするとその場所に遷移する関数
document.getElementById('seekgame-pin-western').addEventListener('click', function() {
  toScrap('western');
});
document.getElementById('seekgame-pin-eastern').addEventListener('click', function() {
  toScrap('eastern');
});
// 廃材置き場に遷移する関数
function toScrap(place) {
  // 今のマップをフェードアウト
  document.getElementById('seekgame-map-image').classList.remove('fadein-modal');
  document.getElementById('seekgame-map-image').classList.add('fadeout-modal');
  setTimeout(function() {
    // マップを非表示
    document.getElementById('seekgame-map-image').classList.add('no-display');
    // 新しいマップを表示
    document.getElementById('seekgame-' +place + '-scrapyard').classList.remove('no-display');
    document.getElementById('seekgame-' +place + '-scrapyard').classList.add('fadein-modal');
    // その他の要素も表示
    document.getElementById('seekgame-description').classList.remove('no-display');
    document.getElementById('seekgame-description').classList.add('fadein-modal');
    document.getElementById('seekgame-inventory').classList.remove('no-display');
    document.getElementById('seekgame-inventory').classList.add('fadein-modal');
    // 説明を更新
    document.getElementById('seekgame-description').innerHTML = '<p>部品を獲得しよう！</p>';
  }, 1000);
}


let seekgameInventory = {
  tire: 0,
  saddle: 0,
  muffler: 0,
  iron: 0,
  light: 0,
};

// リサイズ処理を呼び出す
function resizeMaps() {
  resizeWesternMap();
  resizeEasternMap();
}

// 最初にリサイズ
resizeMaps();
    
// 画面リサイズ時にマップを調整
window.addEventListener('resize', resizeMaps);


// 西側スクラップ置き場のリサイズ処理
function resizeWesternMap() {
  const img = document.getElementById('western-background-img');
  if (!img || img.offsetParent === null) return; // 表示されていない場合は処理しない
        
  // 元のサイズと現在のサイズの比率を計算
  const userWidth = img.clientWidth;
  const userHeight = img.cliecntHeight;

  // 縦横どちらにfitしているか
  let isFitVertical = false; // 縦にfitしている
  if (userWidth / userHeight < 16 / 9) {
    // 例えば20:9ならこれを満たさない
    // 20:9なら横が長いから縦にfitして横が切り取られている
    // 例えば10:9ならこれを満たす
    // 10:9なら横が短いから横にfitして縦が切り取られている
    isFitVertical = true; // 横にfitしている
  }
        
  // 各アイテムを取得
  const tireItem = document.getElementById('western-tire-area');
  const saddleItem = document.getElementById('western-saddle-area');
  const metalItem = document.getElementById('western-metal-area');
  const lightItem = document.getElementById('western-light-area');

  // 座標を調整
  // 通常時（開発）では16:9ちょうどで表示するべき
  // それと比べてどれだけずれるかを計算する（かなりいやだけど）
  if (isFitVertical = true) {
    // 横にfitしている
    tireItem.style.left = `${tireItem.offsetLeft * widthRatio}px`;
    tireItem.style.top = `${tireItem.offsetTop * heightRatio}px`;
  } else {
    
  }
  // 計算したずれを適用
  
}
    
    // 東側スクラップ置き場のイメージマップリサイズ処理
    function resizeEasternMap() {
        const img = document.getElementById('eastern-background-img');
        if (!img || img.offsetParent === null) return; // 表示されていない場合は処理しない
        
        const areas = document.querySelectorAll('#eastern-scrapyard-map area');
        
        // 元のサイズと現在のサイズの比率を計算
        const widthRatio = img.clientWidth / img.naturalWidth;
        const heightRatio = img.clientHeight / img.naturalHeight;
        
        // 各areaの座標を調整
        areas.forEach(area => {
            const originalCoords = area.getAttribute('data-original-coords');
            const coords = originalCoords ? originalCoords.split(',') : area.getAttribute('coords').split(',');
            
            // まだオリジナルの座標を保存していなければ保存
            if (!originalCoords) {
                area.setAttribute('data-original-coords', coords.join(','));
            }
            
            // 新しい座標を計算
            const newCoords = [];
            for (let i = 0; i < coords.length; i++) {
                if (i % 2 === 0) {
                    // X座標
                    newCoords.push(Math.round(parseInt(coords[i]) * widthRatio));
                } else {
                    // Y座標
                    newCoords.push(Math.round(parseInt(coords[i]) * heightRatio));
                }
            }
            
            // 調整した座標を設定
            area.setAttribute('coords', newCoords.join(','));
        });
    }
    

    
   