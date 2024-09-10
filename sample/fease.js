function proses(){
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
                if(healNumber > 0){
                    posion.forEach(element => {
                        element.remove();
                    });
                }else{
                    heal(element);
                }
                healNumber++;
                break;
            case 'SPADES':
            case 'CLUBS':
                enemydamege(element);
                break;
        }       
    });
    let enemyFeild = document.querySelector('#enemy-card').querySelectorAll('img');
    enemyFeild.forEach(element => {
        element.remove();
    });

    if(HP < 1){
        alert("負けてしまいました！");
    }
}