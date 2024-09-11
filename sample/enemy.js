async function enemydamege(element){
    let wepon = document.querySelector('#wepon-card').querySelectorAll('img');
    let enemyElement = document.querySelector('#enemy-card');
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
            commentText = `${element.dataset.code}カードからのダメージを受けなかった！`;
        }
    }else{
        damege = enemyPoint;
        commentText = `(素手ダメージ)${damege}ポイントのダメージ！！`;
    }
    const work_element = element.cloneNode(true);
    enemyElement.appendChild(work_element);
    const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
    await sleep(1300);
    work_element.animate({
        opacity:["1","0"],
    },{
        fill:"forwards",
        duration: 200
    });
    comment(commentText);
    console.log(commentText);
    
    HP = HP - damege;
    console.log(`現在のHP:${HP}`);
    document.getElementById('hp').textContent = "HP:" + HP;
    cemetery(element);
    if(HP < 1){
        console.log("負けフラグ設定");
        return true;
    }
    return false;
}