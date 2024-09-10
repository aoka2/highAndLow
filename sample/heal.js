function heal(element){
    let posion = document.querySelector('#posion-card').querySelectorAll('img');
    HP = HP + (element.dataset.value - 0);
    console.log(HP);
    if(HP > 20){
        HP = 20;
    }
    document.getElementById('hp').textContent = HP;
    console.log(`${element.dataset.value}ポイントの回復！`);
    cemetery(element);

    posion.forEach(element => {
        element.remove();
    });
}