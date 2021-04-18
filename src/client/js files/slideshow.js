var slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides1 = document.getElementsByClassName("doc_1");
  var slides2 = document.getElementsByClassName("doc_2");
  var slides3 = document.getElementsByClassName("doc_3");
  var slides4 = document.getElementsByClassName("doc_4"); 
  var dots = document.getElementsByClassName("dot");
  if (n > slides1.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides1.length}
  for (i = 0; i < slides1.length; i++) {
      slides1[i].style.display = "none";  
      slides2[i].style.display = "none";  
      slides3[i].style.display = "none";  
      slides4[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activedot", " ");
  }
  slides1[slideIndex-1].style.display = "block";  
  slides2[slideIndex-1].style.display = "block"; 
  slides3[slideIndex-1].style.display = "block"; 
  slides4[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " activedot";
}




var slideInd = 1;
showSlide(slideInd);

function changeSlide(n) {
  showSlide(slideInd = n);
}

function showSlide(n) {
  var i;
  var slide1 = document.getElementsByClassName("treat1");
  var slide2 = document.getElementsByClassName("treat2");
  var slide3 = document.getElementsByClassName("treat3");
  var slide4 = document.getElementsByClassName("treat4");
  var slide5 = document.getElementsByClassName("treat5");
  var slide6 = document.getElementsByClassName("treat6");

  var dots = document.getElementsByClassName("dot1");
  if (n > slide1.length) {slideInd = 1}    
  if (n < 1) {slideInd = slide1.length}
  for (i = 0; i < slide1.length; i++) {
      slide1[i].style.display = "none";  
      slide2[i].style.display = "none";  
      slide3[i].style.display = "none";  
      slide4[i].style.display = "none";  
      slide5[i].style.display = "none";  
      slide6[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activedot1", " ");
  }
  slide1[slideInd-1].style.display = "block";  
  slide2[slideInd-1].style.display = "block"; 
  slide3[slideInd-1].style.display = "block"; 
  slide4[slideInd-1].style.display = "block"; 
  slide5[slideInd-1].style.display = "block"; 
  slide6[slideInd-1].style.display = "block"; 
  dots[slideInd-1].className += " activedot1";
}
const figures = document.getElementsByClassName("figures1");
for(let i=0; i<figures.length; i++){
  if(i=0){
    figures[i].style.display = "block";
  }else{
    figures[i].style.display = "none";
  }
}
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("figures1");
  var y = document.getElementsByClassName("figures2");
  var z = document.getElementsByClassName("figures3");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
     y[i].style.display = "none";
     z[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
  y[slideIndex-1].style.display = "block";
  z[slideIndex-1].style.display = "block";
}

