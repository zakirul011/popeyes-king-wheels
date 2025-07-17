(function ($) {
   "use strict";

   // CUSTOM-JS


   


   // account page-tab
   const accountTabLinks = document.querySelectorAll('.account-tab-link')
   const accountTabItems = document.querySelectorAll('.account-tab-item')

   accountTabLinks.forEach((link, index) =>{
      link.addEventListener('click', ()=> {
         for (let i = 0; i < accountTabLinks.length; i++) {
            accountTabLinks[i].classList.remove('active')
         }
         for (let i = 0; i < accountTabItems.length; i++) {
            accountTabItems[i].classList.remove('active')
         }
         link.classList.add('active')
         accountTabItems[index].classList.add('active')
      })
   })


   // pass show hide

   const accountPassIcons = document.querySelectorAll('.account-pass-input span')

   accountPassIcons.forEach(icon => {
      icon.addEventListener('click', ()=>{
         if (icon.parentElement.children[0].getAttribute("type") == 'password') {
            icon.parentElement.children[0].setAttribute("type", "text")
         }else{
            icon.parentElement.children[0].setAttribute("type", "password")
         }
         for (let i = 0; i < icon.parentElement.children.length; i++) {
            icon.parentElement.children[i].classList.remove('active')
         }
         icon.classList.add('active')
         
      })
   });


  	// change active class like menu
   changeActive(document.querySelectorAll('.shop-sidemenu-cate .shop-sidemenu-list ul li, .shop-sidemenu-brand .shop-sidemenu-list ul li,.shop-sidemenu-list ul li, .sizes ul li, .colors ul li'))
   
	function changeActive(items) {
		items.forEach(item =>{
			item.addEventListener('click', ()=>{
				for (let i = 0; i < item.parentElement.children.length; i++) {
					item.parentElement.children[i].classList.remove('active')
				}
				item.classList.add('active')
			})
		})
   }
   
   // when input focus get active 
   focusInput(document.querySelectorAll('.register-form-input input'))
   function focusInput(inputs) {
      inputs.forEach(input => {
         input.addEventListener('focus', ()=>{
            input.parentElement.classList.add('active')
         })
         input.addEventListener('focusout', ()=>{
            if (input.value == '') {
               input.parentElement.classList.remove('active')
            }
         })
         if (input.value != '') {
            input.parentElement.classList.add('active')
         }

      });
   }




   // add reverce border
   const workbox = document.querySelectorAll(".work-text-wrap");
   const workItem = document.querySelectorAll(".work-item-wrapper");
   const mainMenu = document.querySelector(".mainmenu");
   const openMenu = document.querySelector(".open-menu");
   for (let i = 0; i < workbox.length; i++) {
      if (i % 2 == 1) {
         workbox[i].classList.add("border-color-reverce");
         workItem[i].classList.add("border-color-reverce");
      }
	}
   
   
   // responsive menu
   window.addEventListener("load", () => {
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
   });
   window.addEventListener("resize", () => {
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
   });

	

	// smooth-scroll
	$('.shop-info-menu ul li a').bind('click', function(event){
		var $anchor = $(this);
		var headerH = '100';
		$('html, body').stop().animate({
			 scrollTop  : $($anchor.attr('href')).offset().top - headerH + "px"
		}, 700, 'easeInSine');
		event.preventDefault();
  });



  /*===================================*
	0. QUICKVIEW POPUP + ZOOM IMAGE + PRODUCT SLIDER JS
   *===================================*/
	
		var image = $('#product_img');
		//var zoomConfig = {};
		var zoomActive = false;
		
		zoomActive = !zoomActive;
		if(zoomActive) {
			if ($(image).length > 0){
				$(image).elevateZoom({
					cursor: "crosshair",
					easing : true, 
					gallery:'pr_item_gallery',
					zoomType: "inner",
					imageCrossfade: true,
					galleryActiveClass: "active"
				}); 
			}
		}
		else {
			$.removeData(image, 'elevateZoom');//remove zoom instance from image
			$('.zoomContainer:last-child').remove();// remove zoom container from DOM
		}
		
		$.magnificPopup.defaults.callbacks = {
		open: function() {
		  $('body').addClass('zoom_image');
		},
		close: function() {
		  // Wait until overflow:hidden has been removed from the html tag
		  setTimeout(function() {
			$('body').removeClass('zoom_image');
			$('body').removeClass('zoom_gallery_image');
			$('.zoomContainer').slice(1).remove();
			  }, 100);
		  }
		  };
		
		// Set up gallery on click
		var galleryZoom = $('#pr_item_gallery');
		galleryZoom.magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery:{
				enabled: true
			},
			callbacks: {
				elementParse: function(item) {
					item.src = item.el.attr('data-zoom-image');
				}
			}
		});
		
		// Zoom image when click on icon
		$('.product_img_zoom').on('click', function(){
			var atual = $('#pr_item_gallery a').attr('data-zoom-image');
			$('body').addClass('zoom_gallery_image');
			$('#pr_item_gallery .pro-zoom-single-item').each(function(){
				if( atual == $(this).find('.product_gallery_item').attr('data-zoom-image') ) {
					return galleryZoom.magnificPopup('open', $(this).index());
				}
			});
      });
      
	   $('.shop-detail-gallery').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		focusOnSelect: true,
			prevArrow:
				'<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
			nextArrow:
				'<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
	
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 3,
					}
				}
			]
		});




	  /*=========================
	MagnificPopup image JS
	===========================*/
   $(".review-img-popup").magnificPopup({
      type: "image",
      gallery: {
         enabled: true,
      },
	});
	
   $(".play-btn").magnificPopup({
      type: "iframe",
   });

   // shop-product-active-slider
   $(".shop-product-active-slider").slick({
      autoplay: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow:
         "<button type='button' class='slick-prev'><i class='fas fa-arrow-left'></i></button>",
      nextArrow:
         "<button type='button' class='slick-next'><i class='fas fa-arrow-right'></i></button>",
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
	});
	
   // REVIEW-SLIDER 1
   $(".review-img-slide-1").slick({
      autoplay: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow:
         "<button type='button' class='slick-prev'><i class='fas fa-arrow-left'></i></button>",
      nextArrow:
         "<button type='button' class='slick-next'><i class='fas fa-arrow-right'></i></button>",
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 3,
            },
         },
      ],
   });

 

   /*=========================
	PRELOADER JS
	===========================*/
   $(window).on("load", function (event) {
      $(".preloader").delay(500).fadeOut(500);
   });

   // One Page Nav
   var top_offset = $(".header-menu-area").height() - 170;
   $(".mainmenu ul, .menu-option").onePageNav({
      scrollOffset: top_offset,
   });

   /*=========================
	shop-detail-slider
	===========================*/
   $(".shop-detail-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".shop-detail-slider-nav",
   });

   $(".shop-detail-slider-nav").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: ".shop-detail-slider",
      dots: false,
      centerMode: true,
      centerPadding: "0px",
      focusOnSelect: true,
      arrows: true,
      prevArrow:
         '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
      nextArrow:
         '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
   });

   //=== brand-slider =====
   $(".brand-acive-slider").slick({
      slidesToShow: 5,
      slidesToScroll: 3,
      dots: false,
      arrows: true,
      prevArrow:
         '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
      nextArrow:
         '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',

      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 5,
            },
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 2,
            },
         },
      ],
   });
   //=== location-slider =====
   $(".location-active-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow:
         '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
      nextArrow:
         '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
   });
   //=== shop-slider =====
   $(".shop-active-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow:
         '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
      nextArrow:
         '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
   });

   //=== product-slider =====
   $(".product-active-slider").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow:
         '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
      nextArrow:
         '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',

      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   });

   //=== CLIENT-SLIDER =====
   $(".client-slider-active").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow:
         '<div class="slick-arrow-wrap"><button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button></div>',
      nextArrow:
         '<div class="slick-arrow-wrap"><button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button></div>',
   });

   /*=========================
	BRAND SLIDER
	===========================*/
   $(".service-slider-active").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      prevArrow:
         '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
      nextArrow:
         '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',

      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 1,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   });

   /*=========================
	magnificPopup image JS
	===========================*/
   $(".work-process-video a, .video-btn").magnificPopup({
      type: "iframe",
   });


   // niceSelect
   $('select').niceSelect();
   /*=========================
	SCROLL-UP JS
	===========================*/
   $.scrollUp({
      scrollName: "scrollUp", // Element ID
      topDistance: "300", // Distance from top before showing element (px)
      topSpeed: 300, // Speed back to top (ms)
      animation: "fade", // Fade, slide, none
      animationInSpeed: 200, // Animation in speed (ms)
      animationOutSpeed: 200, // Animation out speed (ms)
      scrollText: '<i class="fal fa-angle-up"></i>', // Text for element
      activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
   });

   /*=========================
	AOS JS
	===========================*/
   AOS.init({
      disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
   });

   // price-range
   $(".js-range-slider").ionRangeSlider({
      min: 0,
      max: 1900,
      from: 1020,
   });


     // quick view modal
     const quickViewLInk = document.querySelectorAll('.shop-product-view')
     const quickViewModal = document.querySelector('.quick-view-modal-wrapper')
     const modalOverlay = quickViewModal.querySelector('.modal-overlay')
     const modalClose = quickViewModal.querySelector('.modal-close-btn span')

     quickViewLInk.forEach(link => {
         link.addEventListener('click', (event)=>{
             quickViewModal.classList.add('active')
             event.preventDefault()
         })
     });
     
     modalOverlay.addEventListener('click', ()=>{
         quickViewModal.classList.remove('active')
     })
     modalClose.addEventListener('click', ()=>{
         quickViewModal.classList.remove('active')
     })


     //shop filter slide menu
     const shopSidemenuOvelay = document.querySelector('.shop-sidemenu-ovelay')
     const filterBtn = document.querySelector('.shop-product-wrapper .filter')
     const shopSideMenu = document.querySelector('.shop-sidemenu')
     const closeBtn = shopSideMenu.querySelector('.close-btn')
     filterBtn.addEventListener('click', ()=>{
         shopSideMenu.classList.add('active')
         shopSidemenuOvelay.classList.add('active')
     })
     closeBtn.addEventListener('click', ()=>{
         shopSideMenu.classList.remove('active')
         shopSidemenuOvelay.classList.remove('active')
     })
     shopSidemenuOvelay.addEventListener('click', ()=>{
         shopSideMenu.classList.remove('active')
         shopSidemenuOvelay.classList.remove('active')
     })

})(jQuery);
