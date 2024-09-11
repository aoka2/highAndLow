async function proses(){
    let loseflg = false;
    const selectcard = document.getElementById('selected-cards').querySelectorAll('img');
    console.log(selectcard);
    dispositing(selectcard);

    let posion = document.querySelector('#posion-card').querySelectorAll('img');
    let healNumber = 0;

    selectcard.forEach(element => { 
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
                if(HP < 1){
                    console.log("敵処理中止");
                    break;
                }
                loseflg = enemydamege(element);
                console.log(loseflg);
                break;
        }
    });
    console.log(loseflg);
    if(HP < 1){
        comment("負けてしまった・・・");
        alert("負けてしまった・・・");
        const tryflg = window.confirm('再挑戦しますか？');
        if(tryflg){
            window.location.reload();
        }else{

        }
    }else{

    }

    const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
    await sleep(3000);

    let eneyelement = document.querySelector('#enemy-card').querySelectorAll(`img`);
    eneyelement.forEach(removeelement => {
        console.log(removeelement);
        removeelement.remove();
    });
    let posionlement = document.querySelector('#posion-card').querySelectorAll(`img`);
    posionlement.forEach(removeelement => {
        console.log(removeelement);
        removeelement.remove();
    });
    document.getElementById("dorw-button").disabled  = false;
    console.log("処理終了");
    
}