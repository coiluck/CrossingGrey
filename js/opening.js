const OpeningTextArray1 = [
  { text: "111"},
  { text: "222" },
  { text: "333" },
  { text: "444" },
  {
    text: "555" ,
    action: () => {
      document.getElementById("opening-character").classList.remove("no-display");
      document.getElementById("opening-character").classList.add("fast-fadein");
    } 
  },
  { text: "666" ,
    action: () => {
      document.getElementById("opening-letter").classList.remove("no-display");
      document.getElementById("opening-letter").classList.add("fast-fadein");
    } 
  },
  { text: "777" },
  { text: "888" ,
    action: () => {
      document.getElementById("opening-letter").classList.remove("fast-fadein");
      document.getElementById("opening-letter").classList.add("fast-fadeout");
    } 
  }
];

// バイクを作った後
const OpeningTextArray2 = [
  { text: "999"},
  { text: "000" },
  { text: "111" },
];

const modalOpening = document.getElementById('modal-opening');
const textArea = document.getElementById('opening-text');

const TextArrays = [
  OpeningTextArray1,
  OpeningTextArray2,
];

let currentArray = OpeningTextArray1;
let currentTextIndex = 0; // 現在のテキストが配列の何番目か
let currentArrayIndex = 0; // 配列の切り替えに使用
let isProcessing = false; // 連続クリック防止のフラグ

const openingClick = function () {
  // 処理中なら何もしない
  if (isProcessing) {
    console.log("処理中のためクリックを無視します");
    return;
  };
  // 処理中フラグをセット
  isProcessing = true;
  // 現在の配列内のテキストを進める
  if (typeof currentTextIndex === 'number' && currentTextIndex < currentArray.length) {
    const currentItem = currentArray[currentTextIndex];
    // テキストが空でない場合のみ表示
    if (currentItem.text !== "") {
      textArea.textContent = currentItem.text;
    }
    if (typeof currentItem.action === 'function') {
      currentItem.action();
    }
    currentTextIndex++;
    isProcessing = false; // テキスト表示完了
  // 現在の配列の最後まで到達した場合
  } else {
    console.log(`配列 ${currentArrayIndex} の最後に到達`);
    // フェードアウト開始
    modalOpening.classList.remove("fadein-modal");
    modalOpening.classList.add("fadeout-modal");
    
    // フェードアウト後に次の処理を実行
    setTimeout(() => {
      const nextArrayIndex = currentArrayIndex + 1;
      
      if (nextArrayIndex === 1) { 
        // OpeningTextArray1 -> OpeningTextArray2 へ
        console.log("オープニング2へ移行");
        currentArrayIndex = nextArrayIndex; // インデックスを更新
        currentArray = TextArrays[currentArrayIndex]; // 新しい配列を設定
        currentTextIndex = 0; // テキストインデックスをリセット
        
        if (currentArray && currentArray.length > 0) {
          // 背景画像を変更
          const backgroundImg = document.querySelector(".opening-background img");
          const newImageSrc = "./images/pittsburgh.avif";
          // 新しい画像を事前にロード
          const tempImage = new Image();
          // 最初のテキスト表示
          textArea.textContent = currentArray[currentTextIndex].text;
          currentTextIndex++;
          // 画像のロードが完了したら背景を変更してフェードイン
          tempImage.onload = function() {
            backgroundImg.src = newImageSrc;
            modalOpening.classList.remove("fadeout-modal");
            modalOpening.classList.add("fadein-modal");
          };
          // ロード開始 (onloadトリガー)
          tempImage.src = newImageSrc;
          isProcessing = false; // 処理完了
        } else {
          console.error("オープニング2の配列が無効です");
          isProcessing = false;
        }
      } else if (nextArrayIndex === 2) { 
        // OpeningTextArray2 -> ルート選択へ
      }
    }, 1000); // フェードアウトの時間を1秒に設定
  }
};


// 初期化処理 (ページの読み込み完了時)
window.addEventListener('DOMContentLoaded', () => {
  if (TextArrays && TextArrays.length > 0 && TextArrays[0] && Array.isArray(TextArrays[0]) && TextArrays[0].length > 0 && TextArrays[0][0]) {
    // 最初のテキストを表示
    textArea.textContent = currentArray[currentTextIndex].text;
    currentTextIndex++;
    // クリックリスナーを設定
    modalOpening.addEventListener('click', openingClick);
    console.log("完了 - 初期設定");
  }
});
