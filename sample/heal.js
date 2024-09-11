async function heal(element){
    let posion = document.querySelector('#posion-card').querySelectorAll('img');
    HP = HP + (element.dataset.value - 0);
    console.log(HP);
    if(HP > 20){
        HP = 20;
    }
    document.getElementById('hp').textContent = "HP:" + HP;
    comment(`${element.dataset.value}ポイントの回復！`);
    console.log(`${element.dataset.value}ポイントの回復！`);
    const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
    //アニメーション
    const work_element = element.cloneNode(true);
    document.getElementById('posion-card').appendChild(work_element);
    await sleep(1300);
    work_element.animate({
        opacity:["1","0"],
    },{
      fill:"forwards",
      duration: 200
    });
    posion.forEach(element => {
        element.remove();
    });
}

async function time(times){
    const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
    await sleep(times);
}
