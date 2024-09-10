async function genarateDeck() {
    console.log("Starting get");
    const deckData = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?cards=2H,3H,4H,5H,6H,7H,8H,9H,0H,2D,3D,4D,5D,6D,7D,8D,9D,0D,AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC");
    const deckObj = await deckData.json();
    const id = deckObj.deck_id;
    return id;
}
