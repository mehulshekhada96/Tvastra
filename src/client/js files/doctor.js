var docAll = document.querySelectorAll(".doc_pro");
// console.log(docAll);
var docArr = [];
for(var i = 0; i < docAll.length; i++ ){
// console.log(docAll[i].innerHTML);
 docName = docAll[i].querySelector("h2");
 docSpec =  docAll[i].querySelector("ul");
// console.log(docName.innerHTML);
   var docProObj = {
            name:  docName.innerHTML,
            specialist: docSpec.children[0].innerText,
            degree : docSpec.children[1].innerText,
            awards: docSpec.children[2].innerText,
            experience : docSpec.children[3].innerText,
            hospital : docSpec.children[4].innerText,
            Location: docSpec.children[5].innerText
    }
   docArr.push(JSON.stringify(docProObj).toUpperCase());
}
console.log(docArr);
module.exports = docArr;