function dispositing(card){
    card.forEach(element => {
        console.log(element);
        let suit = element.dataset.suit;
        let card_img;
        switch(suit){
            case 'DIAMONDS':
                //元あったカードを削除
                let wepon = document.querySelector('#wepon-card').querySelectorAll('img');
                if(wepon.length == 1){
                    wepon["0"].remove();
                }
                //カードを追加
                card_img = element.cloneNode(true);
                document.getElementById('wepon-card').appendChild(card_img);
                element.remove();
                break;
            case 'HEARTS':
                card_img = element.cloneNode(true);
                document.getElementById('posion-card').appendChild(card_img);
                element.remove();
                break;
            case 'SPADES':
            case 'CLUBS':
                card_img = element.cloneNode(true);
                // document.getElementById('enemy-card').appendChild(card_img);
                element.remove();
                break;
        }
    });
    
}