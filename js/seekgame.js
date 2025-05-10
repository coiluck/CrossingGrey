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
    document.getElementById('seekgame-' + place + '-scrapyard').classList.remove('no-display');
    document.getElementById('seekgame-' + place + '-scrapyard').classList.add('fadein-modal');
    // その他の要素も表示
    document.getElementById('seekgame-description').classList.remove('no-display');
    document.getElementById('seekgame-description').classList.add('fadein-modal');
    document.getElementById('seekgame-inventory').classList.remove('no-display');
    document.getElementById('seekgame-inventory').classList.add('fadein-modal');
    // 当たり判定も活性化
    if (place === "western") {
      document.getElementById("western-tire-area").classList.remove("no-display");
      document.getElementById("western-saddle-area").classList.remove("no-display");
      document.getElementById("western-metal-area").classList.remove("no-display");
      document.getElementById("western-light-area").classList.remove("no-display");
    } else if (place === "eastern") {
    }
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


function resizeWesternMap() {
  const img = document.getElementById('western-background-img');
  if (!img || img.offsetParent === null) return; // 表示されていない場合は処理しない

  const containerWidth = img.clientWidth;
  const containerHeight = img.clientHeight;

  const imageAspectRatio = 16 / 9; // アイテム定義の基準となる画像のアスペクト比
  const containerAspectRatio = containerWidth / containerHeight;

  let visibleImageContentWidth;
  let visibleImageContentHeight;
  let imageContentOffsetX = 0;
  let imageContentOffsetY = 0;

  // object-fit: cover の挙動を計算
  if (containerAspectRatio >= imageAspectRatio) {
    // コンテナが画像よりも横長（または同じアスペクト比）の場合：画像はコンテナの高さにフィットし、横方向は中央揃え
    visibleImageContentHeight = containerHeight;
    visibleImageContentWidth = containerHeight * imageAspectRatio;
    imageContentOffsetX = (containerWidth - visibleImageContentWidth) / 2;
    imageContentOffsetY = 0;
  } else {
    // コンテナが画像よりも縦長の場合：画像はコンテナの幅にフィットし、縦方向は中央揃え
    visibleImageContentWidth = containerWidth;
    visibleImageContentHeight = containerWidth / imageAspectRatio;
    imageContentOffsetX = 0;
    imageContentOffsetY = (containerHeight - visibleImageContentHeight) / 2;
  }

  // 各アイテムを取得
  const tireItem = document.getElementById('western-tire-area');
  const saddleItem = document.getElementById('western-saddle-area');
  const metalItem = document.getElementById('western-metal-area');
  const lightItem = document.getElementById('western-light-area');

  // アイテムの基準位置とサイズ（16:9の画像に対するパーセンテージ）
  const itemDefinitions = {
    'western-tire-area': { x: 20, y: 80, w: 10, h: 5 },
    'western-saddle-area': { x: 50, y: 60, w: 15, h: 10 },
    'western-metal-area': { x: 70, y: 70, w: 8, h: 8 },
    'western-light-area': { x: 10, y: 30, w: 5, h: 12 }
  };

  const itemsToProcess = [
    { element: tireItem, id: 'western-tire-area' },
    { element: saddleItem, id: 'western-saddle-area' },
    { element: metalItem, id: 'western-metal-area' },
    { element: lightItem, id: 'western-light-area' },
  ];

  // 画像の実際の表示サイズに対するスケールを計算
  const scaleX = visibleImageContentWidth / 100;
  const scaleY = visibleImageContentHeight / 100;

  itemsToProcess.forEach(itemData => {
    const itemElement = itemData.element;
    const def = itemDefinitions[itemData.id];

    if (!itemElement || !def) return;

    // 新しい座標・サイズを計算（画像の実際の表示サイズに基づいて）
    const newLeft = imageContentOffsetX + (def.x * scaleX);
    const newTop = imageContentOffsetY + (def.y * scaleY);
    const newWidth = def.w * scaleX;
    const newHeight = def.h * scaleY;

    // スタイルを適用
    itemElement.style.left = `${newLeft}px`;
    itemElement.style.top = `${newTop}px`;
    itemElement.style.width = `${newWidth}px`;
    itemElement.style.height = `${newHeight}px`;
  });
}

// 東側スクラップ置き場のリサイズ処理
function resizeEasternMap() {

}
