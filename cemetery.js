function cemetery(element){
    const cemetery = document.getElementById('cemetery');
    const cloneCard = element.cloneNode(true);
    cemetery.innerHTML = "";
    cemetery.appendChild(cloneCard);
}