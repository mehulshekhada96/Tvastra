var hosAll = document.querySelectorAll(".hos_pro");
//  console.log(hosAll);
var hosArr = [];
for(var i = 0; i < hosAll.length; i++ ){
//  console.log(hosAll[i].innerHTML);
 hosName = hosAll[i].querySelector("h2");
 hosSpec =  hosAll[i].querySelector("ul");
//  console.log(hosName.innerHTML);
   var hosProObj = {
            name:  hosName.innerHTML,
            address: hosSpec.children[0].innerText,
            beds : hosSpec.children[1].innerText,
            treatments : hosSpec.children[2].innerText
           
    }
   hosArr.push(JSON.stringify(hosProObj).toUpperCase());
}
console.log(hosArr);
module.exports = hosArr;