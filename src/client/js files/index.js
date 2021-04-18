

    
      // $("#treatments_sideMenu").mouseenter(function(){
      //   $("#side_menu_treatments").toggle();
      //   this.toggleClass("display_none");
      // });
      // $(".new1").click(function(){
      //   $("#side_menu_treatments1").toggle();
      //   this.toggleClass("display_none");
      // });
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
      $(".fa-bars").mouseenter(()=>{
          $(".mobile-tab-nav").show();
      })
      $(".cross_exit").click(()=>{
        $(".mobile-tab-nav").hide();
    })


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
  
  