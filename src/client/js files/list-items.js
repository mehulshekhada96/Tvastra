const up = document.getElementsByClassName("fa-angle-up");
console.log(up);
const down = document.getElementsByClassName("fa-angle-down");
console.log(down);
const para = document.getElementsByClassName("menu_para");
console.log(para);
const head =  document.getElementsByClassName("menu")
for(let i = 0; i < up.length; i++){
        if(i==0){
            down[i].style.display= "none";
            up[i].style.display= "block";
            para[i].style.display= "block";
        } else{
            up[i].style.display= "none";
            down[i].style.display= "block";
            para[i].style.display= "none";
    
        }
    up[i].addEventListener("click", ()=>{
        up[i].style.display= "none";
        down[i].style.display= "block";
        para[i].style.display= "none";
    })
    down[i].addEventListener("click", ()=>{
        down[i].style.display= "none";
        up[i].style.display= "block";
        para[i].style.display= "block";
    })
}

