let deckId;
let totalHearts = 0;
let totalDiamonds = 0;
let totalClubs = 0;
let totalSpades = 0;

const deckApiUrl = "https://deckofcardsapi.com/api/deck";

// ゲーム開始時にデッキを取得
window.onload = () => {
    fetch(`${deckApiUrl}/new/shuffle/?deck_count=1`)
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
        });
};

// 山札からカードを引く
function drawCards() {
    fetch(`${deckApiUrl}/${deckId}/draw/?count=4`)
        .then(response => response.json())
        .then(data => {
            const drawnCardsDiv = document.getElementById('drawn-cards');
            drawnCardsDiv.innerHTML = ''; // 以前のカードをクリア

            data.cards.forEach(card => {
                const cardImg = document.createElement('img');
                cardImg.src = card.image;
                cardImg.alt = `${card.value} of ${card.suit}`;
                cardImg.dataset.value = card.value;
                cardImg.dataset.suit = card.suit;

                cardImg.onclick = () => selectCard(cardImg);

                drawnCardsDiv.appendChild(cardImg);
            });
        });
}

// カードを選択してリストに追加、場から削除
function selectCard(cardElement) {
    const selectedCardsDiv = document.getElementById('selected-cards');
    const clonedCard = cardElement.cloneNode(true); // カードを選択リストに追加
    selectedCardsDiv.appendChild(clonedCard);

    // カードの値をスートごとに合計値に追加
    updateTotals(cardElement.dataset.suit, cardElement.dataset.value);

    // 場から選択されたカードを削除
    cardElement.remove();
}

// カードの値を数値に変換する
function getCardValue(value) {
    if (value === 'ACE') return 1;
    if (value === 'JACK' || value === 'QUEEN' || value === 'KING') return 10;
    return parseInt(value);
}

// スートごとの合計値を更新
function updateTotals(suit, value) {
    const cardValue = getCardValue(value);

    switch (suit) {
        case 'HEARTS':
            totalHearts += cardValue;
            document.getElementById('hearts-total').textContent = totalHearts;
            break;
        case 'DIAMONDS':
            totalDiamonds += cardValue;
            document.getElementById('diamonds-total').textContent = totalDiamonds;
            break;
        case 'CLUBS':
            totalClubs += cardValue;
            document.getElementById('clubs-total').textContent = totalClubs;
            break;
        case 'SPADES':
            totalSpades += cardValue;
            document.getElementById('spades-total').textContent = totalSpades;
            break;
        default:
            break;
    }
    window.onload = () => {
        // 画像のURL
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
    };
}