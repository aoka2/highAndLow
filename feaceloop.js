function feaceRoop(element){
    element.forEach(element => { 
        const suit = element.dataset.suit;
        switch(suit){
            case 'DIAMONDS':
                break;
            case 'HEARTS':
                console.log(`回復回数${healNumber}`);
                if(healNumber > 0){
                    element.remove();
                }else{
                    heal(element);
                    document.getElementById('posion-card').querySelector('img').remove();
                    healNumber++;
                }
                break;
            case 'SPADES':
            case 'CLUBS':
                if((document.getElementById('hp').dataset.value - 0) <= 0){
                    console.log("敵処理中止");
                    alert("負けてしまった");
                    break;
                }
                loseflg = enemydamege(element);
                console.log(loseflg);
                break;
        }
    });
}