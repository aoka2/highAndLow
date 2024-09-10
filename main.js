let deckId;
let totalHearts = 0;
let totalDiamonds = 0;
let totalClubs = 0;
let totalSpades = 0;
let selectedCardsCount = 0; // 選択されたカードの枚数
const maxCardsToSelect = 3; // 最大選べる枚数

const deckApiUrl = "https://deckofcardsapi.com/api/deck";

// ゲーム開始時にデッキを取得
function startGame() {
    initializeGame();
}

// ゲームの初期化
function initializeGame() {
    fetch(`${deckApiUrl}/new/shuffle/?deck_count=1`)
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            drawCards(); // ゲーム開始時に山札を引く
        })
        .catch(error => console.error('デッキの取得中にエラーが発生しました:', error));
}

// 画像の読み込みと表示
function loadDefaultImage() {
    const imageUrl = "https://deckofcardsapi.com/static/img/back.png";

    // 画像を取得
    fetch(imageUrl)
        .then(response => response.blob()) // 画像データをBlob形式で取得
        .then(blob => {
            // Blob URLを作成
            const imageObjectURL = URL.createObjectURL(blob);

            // <img>タグを作成
            const img = document.createElement("img");

            // imgタグのsrc属性にBlob URLを設定
            img.src = imageObjectURL;

            // class="image-container" を持つ要素を取得
            const container = document.querySelector(".image-container");

            // 取得した要素に画像を追加
            if (container) {
                container.appendChild(img);
            } else {
                console.error("画像を表示する要素が見つかりません。");
            }
        })
        .catch(error => console.error('画像の取得中にエラーが発生しました:', error));
}

// 山札からカードを引く
function drawCards() {
    if (!deckId) {
        console.error('デッキが初期化されていません。');
        return;
    }

    fetch(`${deckApiUrl}/${deckId}/draw/?count=4`)
        .then(response => response.json())
        .then(data => {
            const drawnCardsDiv = document.getElementById('drawn-cards');
            drawnCardsDiv.innerHTML = ''; // 以前のカードをクリア
            selectedCardsCount = 0; // カウントをリセット
            updateRemainingCards(); // 残り枚数を表示

            data.cards.forEach(card => {
                const cardImg = document.createElement('img');
                cardImg.src = card.image;
                cardImg.alt = `${card.value} of ${card.suit}`;
                cardImg.dataset.value = card.value;
                cardImg.dataset.suit = card.suit;

                cardImg.onclick = () => selectCard(cardImg);

                drawnCardsDiv.appendChild(cardImg);
            });
        })
        .catch(error => console.error('カードの取得中にエラーが発生しました:', error));
}

// カードを選択してリストに追加、場から削除（選んだカードを移動させる)
function selectCard(cardElement) {
    if (selectedCardsCount >= maxCardsToSelect) {
        alert("すでに3枚選択されています。");
        return;
    }

    const selectedCardsDiv = document.getElementById('selected-cards');
    const clonedCard = cardElement.cloneNode(true); // カードを選択リストに追加
    selectedCardsDiv.appendChild(clonedCard);

    // カードの値をスートごとに合計値に追加
    updateTotals(cardElement.dataset.suit, cardElement.dataset.value);

    // 場から選択されたカードを削除
    cardElement.remove();

    selectedCardsCount++;
    updateRemainingCards(); // 残り枚数を更新

    if (selectedCardsCount === maxCardsToSelect) {
        // 3枚選択されたら確認ダイアログを表示
        const isConfirmed = confirm("3枚選択されました。これでよろしいですか？");
        
        if (isConfirmed) {
            // OKが押された場合、次のターンへ進む
            alert("次のターンへ進みます。");
            drawCards();
        } else {
            // キャンセルが押された場合、カードの選択を維持する
            alert("カード選択を維持しました。");
        }
    }
}

// カードの値を数値に変換する
function getCardValue(value) {
    if (value === 'ACE') return 1;
    if (value === 'JACK' || value === 'QUEEN' || value === 'KING') return 10;
    return parseInt(value);
}

// スートごとの合計を更新する
function updateTotals(suit, value) {
    const cardValue = getCardValue(value);

    switch (suit) {
        case 'HEARTS':
            totalHearts += cardValue;
            break;
        case 'DIAMONDS':
            totalDiamonds += cardValue;
            break;
        case 'CLUBS':
            totalClubs += cardValue;
            break;
        case 'SPADES':
            totalSpades += cardValue;
            break;
        default:
            console.error("不明なスートです:", suit);
    }
}

// 残りのカード枚数を更新
function updateRemainingCards() {
    const remainingCardsText = `あと${maxCardsToSelect - selectedCardsCount}枚選択してください。`;
    const remainingCardsElement = document.getElementById('remaining-cards');

    if (remainingCardsElement) {
        remainingCardsElement.textContent = remainingCardsText;
    } else {
        console.error("要素 'remaining-cards' が見つかりません。");
    }
}
