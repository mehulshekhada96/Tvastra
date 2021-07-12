// var docAll = document.querySelectorAll(".doc_pro");
// // console.log(docAll);
// var docArr = [];
// for(var i = 0; i < docAll.length; i++ ){
// // console.log(docAll[i].innerHTML);
//  docName = docAll[i].querySelector("h2");
//  docSpec =  docAll[i].querySelector("ul");
// // console.log(docName.innerHTML);
//    var docProObj = {
//             name:  docName.innerHTML,
//             specialist: docSpec.children[0].innerText,
//             degree : docSpec.children[1].innerText,
//             awards: docSpec.children[2].innerText,
//             experience : docSpec.children[3].innerText,
//             hospital : docSpec.children[4].innerText,
//             Location: docSpec.children[5].innerText
//     }
//    docArr.push(JSON.stringify(docProObj).toUpperCase());
// }
// console.log(docArr);
// module.exports = docArr;



console.log("mehul");
const darkblueBtns = document.getElementsByClassName("doctor_list__container__col-2__card__book") //Array of Btns

let slotContainer = document.getElementsByClassName("slots_container")

    for(let i = 0;  i < darkblueBtns.length; i++ ){
          slotContainer[i].classList.add("display_none")
        darkblueBtns[i].addEventListener("click", _=>{
            slotContainer[i].classList.toggle("display_none")
        })
        const dates = slotContainer[i].children[0].children[2].children[0].getElementsByClassName("slide") // Array of slides (dates)
        const slots = slotContainer[i].children[1].getElementsByClassName("time-slot-slide") // Array of slots
        
        
        const left = slotContainer[i].getElementsByClassName("time-slots-header-left-tablet")
        console.log(left);
    

        for(let j = 0; j < dates.length; j++){
            slots[j].classList.add("display_none")
            dates[j].addEventListener("click", _=>{
                
                slots[j].classList.toggle("display_none")
                for(let k=0; k<slots.length; k++){
                    if(k!=j){
                        slots[k].classList.add("display_none")
                    }
                }
                
            })
        }

    }


    $('.time-slots-header-left-tablet').on('click', function () {
        var last = $('.slot-dates').last().css({opacity: '0', width: '0px'});
        last.prependTo('.current');
        last.animate({opacity: '1', width: '108px'});
    });
    $('.time-slots-header-right-tablet').on('click', function () {
        var first = $('.slot-dates').first();
        first.animate({opacity: '0', width: '0px'}, function() {
            first.appendTo('.current').css({opacity: '1', width: '108px'});
        });
    });