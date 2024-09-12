let deckId;
let dungeonCards = [];
let usedCards = [];
const deckApiUrl = "https://deckofcardsapi.com/api/deck";
let hp = 20;
let weapon = null;
let progress = 0;
let totalCards = 52;
let remainingCard = null;
let actionsTaken = 0;
let gameOver = false; // ゲームが終了したかどうかを管理する変数

function initializeGame() {
    fetch(`${deckApiUrl}/new/shuffle/?deck_count=1`)
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            updateHp();
            updateProgress();
            updateRemainingCards();
            drawDungeon();
        })
        .catch(error => console.error('デッキの取得中にエラーが発生しました:', error));
}

function drawDungeon() {
    if (gameOver) return; // ゲーム終了時は新しいダンジョンを描画しない
    const count = remainingCard ? 3 : 4;
    fetch(`${deckApiUrl}/${deckId}/draw/?count=${count}`)
        .then(response => response.json())
        .then(data => {
            if (remainingCard) {
                dungeonCards = [remainingCard, ...data.cards];
                remainingCard = null;
            } else {
                dungeonCards = data.cards;
            }

            dungeonCards = dungeonCards.filter(card => !usedCards.includes(card.code));
            displayDungeonCards();
        })
        .catch(error => console.error('カードの取得中にエラーが発生しました:', error));
}

function displayDungeonCards() {
    const dungeonCardsDiv = document.getElementById('dungeon-cards');
    dungeonCardsDiv.innerHTML = '';

    dungeonCards.forEach((card, index) => {
        const cardImg = document.createElement('img');
        cardImg.src = card.image;
        cardImg.alt = `${card.value} of ${card.suit}`;
        cardImg.dataset.code = card.code;
        cardImg.dataset.index = index;

        cardImg.onclick = () => handleCardClick(card, index);

        dungeonCardsDiv.appendChild(cardImg);
    });

    setTimeout(() => {
        dungeonCardsDiv.classList.add('centered');
    }, 100);
}

function handleCardClick(card, index) {
    if (gameOver) return; // ゲーム終了時はクリック操作を無効にする
    if (dungeonCards.some(c => c.code === card.code)) {
        if (card.suit === 'SPADES' || card.suit === 'CLUBS') {
            if (confirm("この敵と戦いますか？")) {
                fight(card, index);
            }
        } else if (card.suit === 'DIAMONDS') {
            if (confirm("このカードを装備しますか？")) {
                equip(card, index);
            }
        } else if (card.suit === 'HEARTS') {
            if (confirm("このカードを使用してHPを回復しますか？")) {
                heal(card, index);
            }
        }
    }
}

function fight(enemy, index) {
    const enemyValue = cardValue(enemy);
    if (weapon) {
        const weaponValue = cardValue(weapon);
        if (weaponValue >= enemyValue) {
            moveCardToGraveyard(enemy);
        } else {
            moveCardToGraveyard(weapon);
            weapon = null;
            hp -= (enemyValue - weaponValue);
            if (hp < 0) hp = 0;
        }
    } else {
        hp -= enemyValue;
        if (hp < 0) hp = 0;
    }
    updateHp();
    checkGameOver(); // HPが減った後にゲームオーバーかどうかを確認
    dungeonCards.splice(index, 1);
    usedCards.push(enemy.code);
    actionsTaken++;
    checkTurnEnd();
}

function equip(card, index) {
    if (weapon) {
        moveCardToGraveyard(weapon);
    }
    weapon = card;
    document.getElementById('weapon-slot').innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
    dungeonCards.splice(index, 1);
    usedCards.push(card.code);
    actionsTaken++;
    checkTurnEnd();
}

function heal(card, index) {
    const healValue = cardValue(card);
    hp += healValue;
    if (hp > 20) hp = 20;
    updateHp();
    moveCardToGraveyard(card);
    dungeonCards.splice(index, 1);
    usedCards.push(card.code);
    actionsTaken++;
    checkTurnEnd();
}

function cardValue(card) {
    const value = card.value;
    if (['KING', 'QUEEN', 'JACK'].includes(value)) return 10;
    if (value === 'ACE') return 11;
    return parseInt(value, 10);
}

function updateHp() {
    document.getElementById('hp').textContent = hp;
}

function updateProgress() {
    document.getElementById('progress').textContent = `ダンジョン進行: ${progress}/10`;
}

function updateRemainingCards() {
    document.getElementById('remaining-count').textContent = totalCards - usedCards.length - dungeonCards.length;
}

function moveCardToGraveyard(card) {
    const graveyardDiv = document.getElementById('graveyard');
    const cardImg = document.createElement('img');
    cardImg.src = card.image;
    cardImg.alt = `${card.value} of ${card.suit}`;
    graveyardDiv.appendChild(cardImg);

    if (weapon && card.code === weapon.code) {
        document.getElementById('weapon-slot').innerHTML = '';
    }
}

function checkTurnEnd() {
    if (actionsTaken >= 3) {
        remainingCard = dungeonCards[0];
        dungeonCards = [];
        actionsTaken = 0;
        progress++;
        updateProgress();
        if (progress <= 10) {
            document.getElementById('game-message').textContent = `ダンジョンクリア！${progress}/10`;
            drawDungeon();
        } else {
            document.getElementById('game-message').textContent = 'ゲーム終了！お疲れさまでした。';
        }
    } else {
        displayDungeonCards();
    }
}

// HPが0になったときのゲーム終了処理
function checkGameOver() {
    if (hp <= 0) {
        gameOver = true; // ゲーム終了フラグを立てる
        document.getElementById('game-message').textContent = '攻略失敗！ゲームオーバー';
        document.getElementById('dungeon-cards').innerHTML = ''; // ダンジョンのカードをすべて消す
    }
}

// ゲーム開始
initializeGame();
