let rulePushNum = 0;
function ruleDis(){
    if(rulePushNum % 2 == 0){
        rulePushNum++;
    document.getElementById("roleText").style.display = "block";
    }else{
        rulePushNum++;
    document.getElementById("roleText").style.display = "none";
    }
}