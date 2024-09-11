let deckId;
let dungeonCards = [];
let usedCards = []; // 使用済みのカードを追跡
const deckApiUrl = "https://deckofcardsapi.com/api/deck";
let hp = 20;
let weapon = null;
let progress = 0;

function initializeGame() {
    fetch(`${deckApiUrl}/new/shuffle/?deck_count=1`)
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            updateHp();
            updateProgress();
            drawDungeon();
        })
        .catch(error => console.error('デッキの取得中にエラーが発生しました:', error));
}

function drawDungeon() {
    fetch(`${deckApiUrl}/${deckId}/draw/?count=4`)
        .then(response => response.json())
        .then(data => {
            dungeonCards = data.cards.filter(card => !usedCards.includes(card.code)); // 使用済みのカードを除外
            displayDungeonCards();
        })
        .catch(error => console.error('カードの取得中にエラーが発生しました:', error));
}

function displayDungeonCards() {
    const dungeonCardsDiv = document.getElementById('dungeon-cards');
    dungeonCardsDiv.innerHTML = ''; // 前のカードをクリア

    dungeonCards.forEach((card, index) => {
        const cardImg = document.createElement('img');
        cardImg.src = card.image;
        cardImg.alt = `${card.value} of ${card.suit}`;
        cardImg.dataset.index = index;

        cardImg.onclick = () => handleCardClick(card, index);

        dungeonCardsDiv.appendChild(cardImg);
    });
}

function handleCardClick(card, index) {
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

function fight(enemy, index) {
    const enemyValue = cardValue(enemy);
    if (weapon) {
        const weaponValue = cardValue(weapon);
        if (weaponValue >= enemyValue) {
            document.getElementById('enemy-slot').innerHTML += `<img src="${enemy.image}" alt="${enemy.value} of ${enemy.suit}">`;
        } else {
            hp -= (enemyValue - weaponValue);
            if (hp < 0) hp = 0;
        }
    } else {
        hp -= enemyValue;
        if (hp < 0) hp = 0;
    }
    usedCards.push(enemy.code); // 使用済みカードに追加
    dungeonCards.splice(index, 1); // 選ばれたカードを削除
    updateHp();
    checkTurnEnd();
}

function equip(card, index) {
    if (weapon) {
        moveCardToGraveyard(weapon);
    }
    weapon = card;
    document.getElementById('weapon-slot').innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
    usedCards.push(card.code); // 使用済みカードに追加
    dungeonCards.splice(index, 1); // 選ばれたカードを削除
    checkTurnEnd();
}

function heal(card, index) {
    const healValue = cardValue(card);
    hp += healValue;
    if (hp > 20) hp = 20;
    updateHp();
    usedCards.push(card.code); // 使用済みカードに追加
    dungeonCards.splice(index, 1); // 選ばれたカードを削除
    checkTurnEnd();
}

function moveCardToGraveyard(card) {
    const graveyardCardsDiv = document.getElementById('enemy-cards');
    const cardImg = document.createElement('img');
    cardImg.src = card.image;
    cardImg.alt = `${card.value} of ${card.suit}`;
    graveyardCardsDiv.appendChild(cardImg);
}

function updateHp() {
    document.getElementById('hp').textContent = hp;
    checkGameOver();
}

function updateProgress() {
    document.getElementById('progress').textContent = `${progress}/10`;
}

function checkTurnEnd() {
    if (dungeonCards.length === 0) {
        progress++;
        drawDungeon(); // 新しいターンを開始
    }
}

function checkGameOver() {
    if (hp <= 0) {
        alert('ゲームオーバー！');
        initializeGame();
    } else if (progress >= 10) {
        alert('ダンジョン攻略成功！');
    }
}

function cardValue(card) {
    switch(card.value) {
        case 'ACE': return 1;
        case 'JACK': return 11;
        case 'QUEEN': return 12;
        case 'KING': return 13;
        default: return parseInt(card.value);
    }
}

window.onload = function() {
    initializeGame();
};
