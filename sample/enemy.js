async function enemydamege(element){
    let wepon = document.querySelector('#wepon-card').querySelectorAll('img');
    let weopnPoint = 0;
    let commentText;
    let loseflg = false;
    if(wepon.length > 0){
        weopnPoint = wepon["0"].dataset.value;
    }
    console.log(`武器の数値${weopnPoint}`);
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
        if(enemyPoint > weopnPoint){
            damege = enemyPoint - weopnPoint;
            commentText = `${element.dataset.code}カードからの${damege}ポイントのダメージ！！`;
        }else{
            damege = 0;
            commentText = 'ダメージを受けなかった！';
        }
    }else{
        damege = enemyPoint;
        commentText = `(素手ダメージ)${damege}ポイントのダメージ！！`;
    }
    const log = document.getElementById("log");
    const commnet = document.createElement("p");
    commnet.textContent = commentText;
    console.log(commentText);

    await log.appendChild(commnet);
    console.log(`ダメージ数:${damege}`);

    HP = HP - damege;
    console.log(`現在のHP:${HP}`);
    document.getElementById('hp').textContent = HP;
    cemetery(element);
    
    if(HP < 0){
        alert("負けてしまった・・・");
        loseflg = true;
    }

    return loseflg;
}