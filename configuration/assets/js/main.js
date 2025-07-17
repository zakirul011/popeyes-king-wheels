(function ($) {
   "use strict";

   /*=========================
	PRELOADER JS
	===========================*/
   $(window).on("load", function (event) {
      $(".preloader").delay(500).fadeOut(500);
   });

   // boostrap modal animation easing
	$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});

      
   // responsive menu
   const mainMenu = document.querySelector(".mainmenu");
   const openMenu = document.querySelector(".open-menu");
   function resMenu() {
      if (window.innerWidth < 991) {
         mainMenu.classList.add("active");
         openMenu.classList.add("active");
         openMenu.addEventListener("click", () => {
            if (mainMenu.classList[2] == "show") {
               mainMenu.classList.remove("show");
               openMenu.classList.remove("show");
            } else {
               mainMenu.classList.add("show");
               openMenu.classList.add("show");
            }
         });
      } else {
         mainMenu.classList.remove("active");
         openMenu.classList.remove("active");
      }
   }
   window.addEventListener("load", () => {
      resMenu()
   });
   window.addEventListener("resize", () => {
      resMenu()
   });

   $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

})(jQuery);
