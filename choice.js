function selectCard(card,lengthNum){
    if(selectNum != 3){
    const selectedCardDiv = document.getElementById('selected-cards');
    const cloneCard = card.cloneNode(true);

    selectedCardDiv.appendChild(cloneCard);
    room[lengthNum] = null;
    card.remove();
    selectNum++;
    document.getElementById("dorw-button").disabled  = true;
    }else{
        alert("すでに３枚選ばれました。");
    }
}