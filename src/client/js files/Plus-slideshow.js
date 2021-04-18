var slideIndex = 1;
showSlides(slideIndex);

function changeDiv(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides1 = document.getElementsByClassName("test_div1");
  var slides2 = document.getElementsByClassName("test_div2");
  var slides3 = document.getElementsByClassName("test_div3");
  var slides4 = document.getElementsByClassName("test_div4");
  
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
      dots[i].className = dots[i].className.replace(" active_dot", " ");
  }
  slides1[slideIndex-1].style.display = "block";  
  slides2[slideIndex-1].style.display = "block"; 
  slides3[slideIndex-1].style.display = "block"; 
  slides4[slideIndex-1].style.display = "block"; 
   
  dots[slideIndex-1].className += " active_dot";
}
