// const hospital = require("./hospital");
// const doctor = require("./doctor");

var treatArr = [];

var button = document.getElementById("searchbtn");
button.addEventListener("click", myf);
function myf(){
    var str = document.getElementById("search").value;
    console.log(str);
    if(hospital.hosArr.indexOf(str)!= -1){
        location.assign("./hospital.html")
    }
    else if(doctor.docArr.indexOf(str)!=-1){
           location.assign("./doctor.html")
    }else if(treatArr.indexOf(str)!=-1){
           location.assign("./treatment.html")
    }else{
        alert("Data Not Found");
    }
}