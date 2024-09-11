function proses(){
    let loseflg;
    const selectcard = document.getElementById('selected-cards').querySelectorAll('img');
    console.log(selectcard);
    dispositing(selectcard);

    let posion = document.querySelector('#posion-card').querySelectorAll('img');
    let healNumber = 0;

    selectcard.forEach(element => { 
        const suit = element.dataset.suit;
        console.log(suit);
        switch(suit){
            case 'DIAMONDS':
                break;
            case 'HEARTS':
                console.log(`回復回数${healNumber}`);
                if(healNumber > 0){
                    posion.forEach(element => {
                        element.remove();
                    });
                }else{
                    heal(element);
                    healNumber++;
                }
                break;
            case 'SPADES':
            case 'CLUBS':
                loseflg = enemydamege(element);
                console.log(loseflg);
                if(loseflg){
                    return;
                }
                break;
        }
    });
    let eneyelement = document.querySelector('#enemy-card').querySelectorAll(`img`);
    eneyelement.forEach(removeelement => {
        console.log(removeelement);
        removeelement.remove();
    });
    document.getElementById("dorw-button").disabled  = false;
    console.log("処理終了");
    
}