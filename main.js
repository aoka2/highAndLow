let deckId;
let totalHearts = 0;
let totalDiamonds = 0;
let totalClubs = 0;
let totalSpades = 0;
let selectedCardsCount = 0; // 選択されたカードの枚数
const maxCardsToSelect = 3; // 最大選べる枚数

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
        });
}

// カードを選択してリストに追加、場から削除
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
        alert("3枚選択されました。次のターンへ進みます。");
        // 次のターンの処理（例: 山札から再びカードを引く）
        drawCards();
    }
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
}

// 残りのカード枚数を更新
function updateRemainingCards() {
    const remainingCardsText = `あと${maxCardsToSelect - selectedCardsCount}枚選べます`;
    document.getElementById('remaining-cards').textContent = remainingCardsText;
}
