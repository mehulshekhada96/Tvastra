
// function toggle(element){
// element.classList.toggle("active");
// }
// const ele = document.querySelectorAll(".fixcons");
// for (i=0;i < ele.length; i++){
//     if(this==ele[i]){
//           toggle(this);
//     }
//     else {
//           ele[i].classList.remove("active")
//     }
// }; 
// const fixc = document.getElementsByClassName("fixc");
// const ele = document.getElementsByClassName("fixcons");
// console.log(fixc);
// for(i=0;i<ele.length; i++){
//     if(ele[i].classList.contains('active')){
//         fixc[i].classList.addClass("fixc_hid");
//     }
// }
$('.how_it_works').on('click', '.fixcons', function() {
    $(this).addClass('active').siblings().removeClass('active');
    
  })
const fixc1 = document.getElementById("fix_cons1");

const fixc2 = document.getElementById("fix_cons2");
const fixc3 = document.getElementById("fix_cons3");
const fixc4 = document.getElementById("fix_cons4");
const fixc5 = document.getElementById("fix_cons5");
const fixc6 = document.getElementById("fix_cons6");
const fixc7 = document.getElementById("fix_cons7");

const fixc = document.getElementsByClassName("fixc");
for(var j = 0; j < fixc.length; j++){
    if(j===0){

        fixc[j].style.display = "block";
        }else{
            fixc[j].style.display = "none";
        
    }
}
function switchFun(n){
    for(var i = 0; i < fixc.length; i++){
        if(i === n-1){
        fixc[i].style.display = "block";
        }else{
            fixc[i].style.display = "none";
        }
    }
}