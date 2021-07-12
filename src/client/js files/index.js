

    
      // $("#treatments_sideMenu").mouseenter(function(){
      //   $("#side_menu_treatments").toggle();
      //   this.toggleClass("display_none");
      // });
      $(".new1").click(function(){
        $("#side_menu_treatments1").toggle();
        this.toggleClass("display_none");
      });
      $(".profile_menu_container, .menuOnClick").mouseenter(function(){
        $(".profile_menu_container").show();
      });
      $(".profile_menu_container, .menuOnClick").mouseleave(function(){
        $(".profile_menu_container").hide();
      });
      $("#view_on_mouse_over").mouseenter(()=>{
        $("#side_menu_treatments").show();
      })
      $("#view_on_mouse_over").mouseleave(()=>{
        $("#side_menu_treatments").hide();
      })
      $(".fa-bars").click(()=>{
          $(".mobile-tab-nav").show();
      })
      $(".cross_exit").click(()=>{
        $(".mobile-tab-nav").hide();  
      });
    // $(".mobile-tab-nav").mouseleave(()=>{
    //   $(".mobile-tab-nav").hide();
    // });


  // const sideMenuTreatments = document.getElementById('side_menu_treatments');
  // const sideMenutreatmentChevron = document.querySelector('#treatments_sideMenu');
  
  // if(sideMenutreatmentChevron){
  //   sideMenutreatmentChevron.addEventListener('click', () => {
  //     sideMenuTreatments.classList.toggle('display_none')
  //   });
    
  // }
  
  

  // const profileChevron = document.querySelector('.navbar__profile');
  // const profile_menu = document.querySelector('.profile_menu_container');
  
  // if(profileChevron) profileChevron.addEventListener('click', () => {profile_menu.classList.toggle('display_none')});
  
  // const treatmentChevron = document.querySelector('#treatments');
  // const treatment_menu = document.querySelector('#treatment_menu_container');
  // if(treatmentChevron) {
  //   treatmentChevron.addEventListener('mouseover', () => {
  //     treatment_menu.classList.toggle('display_none')
  //   });
  
  
  //   treatmentChevron.addEventListener('mouseout', () => {
  //     treatment_menu.classList.toggle('display_none')
  //   });
  
  // }
  
//error container
const error = document.querySelector('.error_container');
const cross = document.querySelector('.col--3');
const hideError = () => {
	error.style.display = 'none';
	fetch('/disable-error', {
		method: 'put'
	});
}

if(error){
	fetch('/disable-error', {
		method: 'put'
	});
	setTimeout(() => {
		error.style.display = 'none';
	},5000);	
} 

cross.addEventListener('click', hideError);	

//showmore in doctor filters

function showMore(param){
	let showList = param.parentElement.querySelectorAll('.checkbox_container');
	showList.forEach(el => {
		if(el.classList.contains('display_none')){
			el.classList.remove('display_none');
		}
	});
  
	param.parentElement.querySelector('#show-less').classList.remove('display_none');
	param.classList.add('display_none');
  
}

function showLess(param){
	let showList = param.parentElement.querySelectorAll('.checkbox_container');
	showList.forEach((el, index) => {
		if(index > 11){
			if(el.classList.contains('display_none')){

			} else {
				el.classList.add('display_none');
			}
		}
	});
  
	param.parentElement.querySelector('#show-more').classList.remove('display_none');
	param.classList.add('display_none');

}

// function showMore(param){
//   let showList = param.parentElement.querySelectorAll(".checkbox_container");
//   console.log(showList);

// }


// For OTP
const otpField = document.querySelector('input[name="otp"]');
		const submit = document.querySelector('.form_container__form__submit');
		const timer = document.querySelector('.timer').children[0].children[0];
		const resendOTPBtn = document.querySelector('.resend-otp').children[0];

		resendOTPBtn.style.color = 'grey';


		function getCodeBoxElement(index) {
			return document.getElementById('codeBox' + index);
		}
		function onKeyUpEvent(index, event) {
			const eventCode = event.which || event.keyCode;
			if (getCodeBoxElement(index).value.length === 1) {
				if (index !== 4) {
					getCodeBoxElement(index + 1).focus();
				} else {
					getCodeBoxElement(index).blur();
					// Submit code
				}
			}
			if (eventCode === 8 && index !== 1) {
				getCodeBoxElement(index - 1).focus();
			}
		}
		function onFocusEvent(index) {
			for (item = 1; item < index; item++) {
				const currentElement = getCodeBoxElement(item);
				if (!currentElement.value) {
					currentElement.focus();
					break;
				}
			}
		}


		let timerCount = parseInt(timer.innerHTML.split(' ')[2]);

		const countDown = setInterval(() => {
			if (timerCount === 0) {
				timer.innerHTML = 'Resend';
				resendOTPBtn.style.color = '#0173b2';
				resendOTPBtn.addEventListener('click', (el) => {
					fetch('/resend-otp', {
						method: 'put'
					});
					event.preventDefault();
				});
				clearInterval(countDown);
			} else {
				timerCount--;
				timer.innerHTML = `Resend in ${timerCount}`;
			}

		}, 1000);

		function moveOnMax(field, nextField) {
			if (field.value.length >= field.maxLength) {
				document.querySelector(nextField).focus();
			}
		}