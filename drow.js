async function drow(roomObject,deckID){
    for(let i = 0; i < 4;i++){
        if(roomObject[i] == null){
            const card_data = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
            const card = await card_data.json();
            roomObject[i] = card; 
        }
        const card_img = document.getElementById(`room${i}`);
        
        const imageUrl = await roomObject[i].cards[0]["image"]; 

        card_img.src = card_img.src = imageUrl;
    }

    return roomObject;
}