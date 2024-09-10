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
    document.getElementById('draw-deck').disabled = true; // 初期化が完了するまで山札ボタンを無効化
}

// ゲームの初期化
function initializeGame() {
    fetch(`${deckApiUrl}/new/shuffle/?deck_count=1`)
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            console.log('デッキID:', deckId);
            document.getElementById('draw-deck').disabled = false; // デッキが初期化されたらボタンを有効化
        })
        .catch(error => console.error('デッキの取得中にエラーが発生しました:', error));
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

    // 3枚選択されたら確認ダイアログを表示
    if (selectedCardsCount === maxCardsToSelect) {
        setTimeout(() => { // 少し遅延を入れて選択状態を確認しやすくする
            const isConfirmed = confirm("3枚選択されました。これでよろしいですか？");

            if (isConfirmed) {
                // OKが押された場合、次のターンへ進む
                alert("次のターンへ進みます。");
                drawCards();
            } else {
                // キャンセルが押された場合、カードの選択を維持する
                alert("カード選択を維持しました。");
            }
        }, 100); // 100msの遅延を追加
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

// ゲーム開始時に startGame を実行
window.onload = startGame;
