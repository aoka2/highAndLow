let deckId;
let dungeonCards = [];
const deckApiUrl = "https://deckofcardsapi.com/api/deck";
let hp = 20;
let weapon = null;
let potion = null;
let enemies = [];

function initializeGame() {
    fetch(`${deckApiUrl}/new/shuffle/?deck_count=1`)
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            updateHp();
            drawDungeon();
        })
        .catch(error => console.error('デッキの取得中にエラーが発生しました:', error));
}

function drawDungeon() {
    fetch(`${deckApiUrl}/${deckId}/draw/?count=4`)
        .then(response => response.json())
        .then(data => {
            dungeonCards = data.cards;
            displayDungeonCards();
            updateRemainingCards();
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

        cardImg.onclick = () => handleCardClick(card);

        dungeonCardsDiv.appendChild(cardImg);
    });
}

function handleCardClick(card) {
    const action = confirm("このカードを選びますか？\nOK: 選択, キャンセル: 選びなおす");

    if (action) {
        if (card.suit === 'DIAMONDS') {
            if (!weapon || card.value > weapon.value) {
                if (weapon) {
                    moveCardToGraveyard(weapon);
                }
                weapon = card;
                document.getElementById('weapon-slot').innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
            } else {
                moveCardToGraveyard(card);
            }
        } else if (card.suit === 'HEARTS') {
            if (!potion) {
                potion = card;
                document.getElementById('potion-slot').innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
            } else {
                moveCardToGraveyard(card);
            }
        } else {
            if (enemies.length < 3) {
                enemies.push(card);
                const enemyCardsDiv = document.getElementById('enemy-slot');
                const cardImg = document.createElement('img');
                cardImg.src = card.image;
                cardImg.alt = `${card.value} of ${card.suit}`;
                enemyCardsDiv.appendChild(cardImg);
            } else {
                moveCardToGraveyard(card);
            }
        }
    } else {
        moveCardToGraveyard(card);
    }

    dungeonCards = dungeonCards.filter(d => d.code !== card.code);
    displayDungeonCards(); // 残りのカードを再表示
    updateRemainingCards();
}

function moveCardToGraveyard(card) {
    const graveyardCardsDiv = document.getElementById('graveyard-cards');
    const cardImg = document.createElement('img');
    cardImg.src = card.image;
    cardImg.alt = `${card.value} of ${card.suit}`;
    graveyardCardsDiv.appendChild(cardImg);
}

function updateRemainingCards() {
    const remainingCards = document.getElementById('remaining-cards');
    remainingCards.innerHTML = `残り枚数: ${dungeonCards.length}`;
}

function swapCards() {
    drawDungeon(); // 入れ替えボタンを押すと新しい4枚を引く
}

function fight() {
    if (weapon && enemies.length > 0) {
        const strongestEnemy = enemies.reduce((max, enemy) => enemy.value > max.value ? enemy : max, enemies[0]);
        if (weapon.value < strongestEnemy.value) {
            hp -= (strongestEnemy.value - weapon.value);
            if (hp < 0) hp = 0;
        }
        updateHp();
        enemies = [];
        document.getElementById('enemy-slot').innerHTML = ''; // 倒したモンスターのスロットをクリア
    }
}

function equip() {
    if (weapon) {
        document.getElementById('weapon-slot').innerHTML = `<img src="${weapon.image}" alt="${weapon.value} of ${weapon.suit}">`;
    }
}

function heal() {
    if (potion) {
        hp += potion.value;
        if (hp > 20) hp = 20;
        updateHp();
        potion = null;
        document.getElementById('potion-slot').innerHTML = ''; // 回復スロットをクリア
    }
}

function updateHp() {
    document.getElementById('hp').textContent = hp;
}

window.onload = function() {
    initializeGame();
    document.getElementById('draw-dungeon').onclick = drawDungeon;
    document.getElementById('swap-cards').onclick = swapCards;
    document.getElementById('equip').onclick = equip;
    document.getElementById('heal').onclick = heal;
};
