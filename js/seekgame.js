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

// ゲームの初期化
document.addEventListener('DOMContentLoaded', function() {
    // 2つの別々のインベントリを初期化
    const westernInventory = {
        tire: 0,
        metal: 0,
        tool: 0
    };
    
    const easternInventory = {
        parts: 0,
        circuit: 0,
        battery: 0
    };
    
    // 西側スクラップ置き場のイメージマップリサイズ処理
    function resizeWesternMap() {
        const img = document.getElementById('western-background-img');
        if (!img || img.offsetParent === null) return; // 表示されていない場合は処理しない
        
        const areas = document.querySelectorAll('#western-scrapyard-map area');
        
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
    
    // モーダル表示状態に応じてリサイズ処理を呼び出す
    function resizeMaps() {
        const westernModal = document.getElementById('seekgame-western-scrapyard');
        const easternModal = document.getElementById('seekgame-eastern-scrapyard');
        
        // 表示されているモーダルのマップだけリサイズ
        if (westernModal && !westernModal.classList.contains('no-display')) {
            resizeWesternMap();
        }
        
        if (easternModal && !easternModal.classList.contains('no-display')) {
            resizeEasternMap();
        }
    }
    
    // 画面リサイズ時にマップを調整
    window.addEventListener('resize', resizeMaps);
    
    // モーダル表示時にマップを初期化
    function initWesternMap() {
        const img = document.getElementById('western-background-img');
        if (img) {
            if (img.complete) {
                resizeWesternMap();
            } else {
                img.addEventListener('load', resizeWesternMap);
            }
        }
        
        // 西側アイテムのクリックイベント設定
        attachWesternItemEvents();
    }
    
    function initEasternMap() {
        const img = document.getElementById('eastern-background-img');
        if (img) {
            if (img.complete) {
                resizeEasternMap();
            } else {
                img.addEventListener('load', resizeEasternMap);
            }
        }
        
        // 東側アイテムのクリックイベント設定
        attachEasternItemEvents();
    }
    
    // 西側アイテムのクリックイベント設定
    function attachWesternItemEvents() {
        // タイヤのクリックイベント
        const tireArea = document.getElementById('western-tire-area');
        if (tireArea) {
            tireArea.addEventListener('click', function(e) {
                e.preventDefault();
                westernInventory.tire++;
                updateWesternInventory();
            });
        }
        
        // 金属片のクリックイベント
        const metalArea = document.getElementById('western-metal-area');
        if (metalArea) {
            metalArea.addEventListener('click', function(e) {
                e.preventDefault();
                westernInventory.metal++;
                updateWesternInventory();
            });
        }
        
        // 工具のクリックイベント
        const toolArea = document.getElementById('western-tool-area');
        if (toolArea) {
            toolArea.addEventListener('click', function(e) {
                e.preventDefault();
                westernInventory.tool++;
                updateWesternInventory();
            });
        }
    }
    
    // 東側アイテムのクリックイベント設定
    function attachEasternItemEvents() {
        // 機械部品のクリックイベント
        const partsArea = document.getElementById('eastern-parts-area');
        if (partsArea) {
            partsArea.addEventListener('click', function(e) {
                e.preventDefault();
                easternInventory.parts++;
                updateEasternInventory();
            });
        }
        
        // 電子基板のクリックイベント
        const circuitArea = document.getElementById('eastern-circuit-area');
        if (circuitArea) {
            circuitArea.addEventListener('click', function(e) {
                e.preventDefault();
                easternInventory.circuit++;
                updateEasternInventory();
            });
        }
        
        // バッテリーのクリックイベント
        const batteryArea = document.getElementById('eastern-battery-area');
        if (batteryArea) {
            batteryArea.addEventListener('click', function(e) {
                e.preventDefault();
                easternInventory.battery++;
                updateEasternInventory();
            });
        }
    }
    
    // 西側インベントリ表示の更新
    function updateWesternInventory() {
        const inventoryEl = document.getElementById('western-inventory');
        if (inventoryEl) {
            inventoryEl.innerHTML = 
                `タイヤ: ${westernInventory.tire}個 | 金属片: ${westernInventory.metal}個 | 工具: ${westernInventory.tool}個`;
        }
    }
    
    // 東側インベントリ表示の更新
    function updateEasternInventory() {
        const inventoryEl = document.getElementById('eastern-inventory');
        if (inventoryEl) {
            inventoryEl.innerHTML = 
                `機械部品: ${easternInventory.parts}個 | 電子基板: ${easternInventory.circuit}個 | バッテリー: ${easternInventory.battery}個`;
        }
    }
    
    // モーダル表示切替関数（既存コードに統合する場合の例）
    function showWesternScrapyard() {
        const modal = document.getElementById('seekgame-western-scrapyard');
        if (modal) {
            modal.classList.remove('no-display');
            initWesternMap(); // マップを初期化
        }
        
        // 東側は非表示にする
        const otherModal = document.getElementById('seekgame-eastern-scrapyard');
        if (otherModal) {
            otherModal.classList.add('no-display');
        }
    }
    
    function showEasternScrapyard() {
        const modal = document.getElementById('seekgame-eastern-scrapyard');
        if (modal) {
            modal.classList.remove('no-display');
            initEasternMap(); // マップを初期化
        }
        
        // 西側は非表示にする
        const otherModal = document.getElementById('seekgame-western-scrapyard');
        if (otherModal) {
            otherModal.classList.add('no-display');
        }
    }
    
    // モーダルを表示するボタンなどのイベントリスナー設定例
    // 既存のコードに合わせて調整してください
    const westernBtn = document.getElementById('show-western-scrapyard-btn');
    if (westernBtn) {
        westernBtn.addEventListener('click', showWesternScrapyard);
    }
    
    const easternBtn = document.getElementById('show-eastern-scrapyard-btn');
    if (easternBtn) {
        easternBtn.addEventListener('click', showEasternScrapyard);
    }
    
    // DOM読み込み時に初期化処理
    initWesternMap();
    initEasternMap();
});
