function comment(text){
    const commnets = document.createElement("p");
    const log = document.getElementById("log");
    commnets.setAttribute("clss","comment");
    commnets.style.borderWidth = "0px 0px 1px 0px";
    commnets.style.borderStyle = "solid";
    commnets.style.borderColor = "black";
    commnets.textContent = text;
    log.appendChild(commnets);
    log.style.width = "50%";
}