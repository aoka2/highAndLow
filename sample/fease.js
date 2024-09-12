async function proses(){
    let loseflg = false;
    const selectcard = document.getElementById('selected-cards').querySelectorAll('img');
    console.log(selectcard);
    dispositing(selectcard);
    
    
    let posion = document.querySelector('#posion-card').querySelectorAll('img');
    console.log('初期loseflg' + loseflg);
    feaceRoop(selectcard);
    
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
    if((document.getElementById('hp').dataset.value - 0) <= 0){
        comment("負けてしまった！");
        if(window.confirm("負けてしまいました...再挑戦しますか？")){
            window.location.reload();
        }
    }
    document.getElementById("dorw-button").disabled  = false;
    console.log("処理終了");
    
}