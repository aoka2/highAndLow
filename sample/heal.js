function heal(element){
    let posion = document.querySelector('#posion-card').querySelectorAll('img');
    HP = HP + (element.dataset.value - 0);
    console.log(HP);
    if(HP > 20){
        HP = 20;
    }
    document.getElementById('hp').textContent = HP;
    
    const log = document.getElementById("log");
    const commnet = document.createElement("p");
    commnet.style.borderWidth = "2px 0px 2px 0px";
    commnet.style.borderStyle = "solid";
    commnet.style.borderColor = "black";
    commnet.textContent = `${element.dataset.value}ポイントの回復！`;

    log.appendChild(commnet);
    console.log(`${element.dataset.value}ポイントの回復！`);
    cemetery(element);

    posion.forEach(element => {
        element.remove();
    });
}