function enemydamege(element){
    let wepon = document.querySelector('#wepon-card').querySelectorAll('img');
    let weopnPoint = 0;
    if(wepon.length == 1){
        weponPint = wepon["0"].dataset.value;
    }

    let enemyPoint = 0;
    let damege = 0;
    switch(element.dataset.value){
        case 'ACE':
            enemyPoint = 14;
            break;
        case 'KING':
            enemyPoint = 13;
            break;
        case 'QUEEN':
            enemyPoint = 12;
            break;
        case 'JACK':
            enemyPoint = 11;
            break;
        default:
            enemyPoint = (element.dataset.value - 0);
    }
    if(weopnPoint > 0){
        damege = weponPint - enemyPoint;
    }else{
        damege = enemyPoint;
    }
    console.log(`${damege}ポイントのダメージ！！`);

    HP = HP - damege;
    console.log(`現在のHP:${HP}`);
    document.getElementById('hp').textContent = HP;
    cemetery(element);
}