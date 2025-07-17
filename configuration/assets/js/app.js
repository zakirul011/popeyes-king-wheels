

// add wheel onther place
if (window.matchMedia("(max-width: 767px)").matches) {
   const configContentWrap = document.querySelector('.config-content-wrap')
   const configWheelWrap = document.querySelector('.config-wheel-wrap')
   const configContentTitle = document.querySelector('.config-content-title')
   configContentWrap.insertBefore(configWheelWrap, configContentTitle)
}





const configTitle = document.querySelector('.config-content-title')
const configCategoryWrap = document.querySelector('.config-category')
const configCategory = document.querySelectorAll('.config-category li')

const selectColorWrap = document.querySelectorAll('.select-color-category')
const selectColorTitle = document.querySelectorAll('.select-color-title h5')
const selectColor = document.querySelectorAll('.select-color-category li')
const seletedColor = document.querySelectorAll('.selected-color li')
const selectColorMain = document.querySelector('.select-color-main')
const colorCleaner = document.querySelectorAll('.clean-color')

const selectedColorWrap = document.querySelector('.selected-color-wrap')
const seletedColorExpand = document.querySelector('.selected-color')
const selectedColorBtn = document.querySelector('.selected-color-wrap h4 span')

const configPartPage = document.querySelectorAll('.config-part-page')
const configPointer = document.querySelectorAll('.config-pointer')
const configNavigation = document.querySelector('.config-navigation')
const configNavigationLink = configNavigation.querySelectorAll('.config-navigation li')

const chooseMovingArrow = document.querySelector('.choose-color-main > i.running-move')
const chooseColorMain = document.querySelector('.choose-color-main')
const chooseColorWrapper = document.querySelector('.choose-color-wrapper')
const chooseColorPage = document.querySelectorAll('.choose-color-page')
const chooseColor = document.querySelectorAll('.choose-color-category li')
const chooseColorTitle = document.querySelectorAll('.choose-color-title h5')

const formPage = document.querySelector('.contact-form-area')
const configContent = document.querySelector('.config-content')
const thankyouPage = document.querySelector('.thankyou-area')

const previewWrap = document.querySelector('.preview-wheel')
const invertBnt = document.querySelector('.invert-btn')
const nextBtn = document.querySelectorAll('.next-btn, .arrow-next')
const prevBtn = document.querySelectorAll('.prev-btn, .arrow-prev')
const getQouteBtn = document.querySelector('.get-qoute-btn')
const backBtn = document.querySelector('.back-btn')
const threeDBtn = document.querySelector('.threeD-btn')

const configPartMain = document.querySelector('.config-wheel-wrap')
const lastPreviewConfig = document.querySelectorAll('.last-preview-config')

let selectedColorArray = []
let pageCounter = -1;
let pageCounteAlt
let imgActive0 = [];
let imgActive1 = [];
let hint = 0

const configNavigationSlide = document.querySelector('.config-navigation ul')
const navigationSlider = document.querySelector('.navigation-slider')
let navigationShow = 4;
let navigationSlideCount = 0;

const error = document.querySelector('.error-wrap')
const errorText = error.querySelector('.error-text h4')

const previewLoader = document.querySelector('.preview-loader')

// final wheel selectors
const wheelAllImg = document.querySelectorAll('.config-part-wrap img')
const imgData = document.querySelector('.img_data')
let finalFormInput = document.querySelectorAll('.color_name_data')
let wheelImgs = document.querySelectorAll('.config-part-wrap img')
let final_wheel = []
let final_color_name = []


// next btn clicking actions
nextBtn.forEach(btn => {
   btn.addEventListener('click', ()=>{
      if (selectedColorArray.length < 2) {
         error.classList.add('active')
         errorText.innerText = "Please select two colors to go next step"
      }else{
         if (pageCounter == chooseColorPage.length - 1) {

            window.scrollTo(0, 0)
            lastPreviewConfig.forEach(preview => {
               preview.innerHTML = configPartMain.innerHTML;
               preview.querySelector('.config-pointer-wrap').style.display = 'none'
            });
            
            getData();
            finalWheelImg()

         }else{
            if (pageCounter < 0) {
               if (pageCounteAlt) {
                  pageCounter = pageCounteAlt
               }else{
                  pageCounter++;
               }

               carryLoadImg = [];
               colorBack(imgActive0, selectedColorArray[0])
               colorBack(imgActive1, selectedColorArray[1])               
               lazyLoadImg(carryLoadImg)
   
               previewWrap.classList.add('active');
               configTitle.classList.remove('active');
               removeAllActive(colorCleaner);
               
               selectedColorBtn.classList.remove('active')
               seletedColorExpand.classList.remove('active')
               seletedColorExpand.style.maxHeight = null;
               selectedColorBtn.innerText = 'CLICK TO TRY DIFFERENT COLORS';
               
            }else if (checkPageColorACtive(pageCounter)) {
               pageCounter++;
               if (pageCounter >= navigationShow) {
                  navigationSlideCount++;
                  configNavigationSlide.style.transform =  `translate(${- navigationWidth * navigationSlideCount}px)`
               }
            }else{
               error.classList.add('active')
               errorText.innerText = "Please choose color to go next step";
            }
   
            if (pageCounter >= 3 && checkPageColorACtive(pageCounter)) {
               invertBnt.classList.add('active')
            }

            if (pageCounter == chooseColorPage.length - 1 && checkPageColorACtive(pageCounter)) {
               threeDBtn.classList.add('active')
            }
            
            // remove acive
            removeAllActive(configPointer)
            removeAllActive(chooseColorPage)
            removeAllActive(chooseColorTitle)
            removeAllActive(configNavigationLink)
            configCategoryWrap.classList.remove('active')
            selectColorMain.classList.remove('active')
            btn.classList.remove('pulse-pop')
   
            // add acive
            configNavigation.classList.add('active')
            getNavigationWidth()
            prevBtn.forEach(btn => {
               btn.classList.add('active')
            });
            configPointer[pageCounter].classList.add('active')
            chooseColorPage[pageCounter].classList.add('active')
            chooseColorTitle[pageCounter].classList.add('active')
            configNavigationLink[pageCounter].classList.add('active')
            let counterNavImg = configNavigationLink[pageCounter].querySelector('img')
            addPreview(counterNavImg)
            chooseMovingArrow.classList.add('active')
            chooseColorMain.classList.add('active')
            selectedColorWrap.classList.add('active')


            // show next page color from selection
            nextColorSelection();
   
            seletedColor.forEach(color => {
               color.style.cursor = 'pointer'
            });

            if (window.matchMedia("(max-width: 767px)").matches && pageCounter <= 0) {
               if (hint == 0) {
                  window.scrollBy(0, - window.pageYOffset + 220);
                  hint = 1
               }
            }

         }
      }
   })
});

prevBtn.forEach(btn => {
   btn.addEventListener('click', ()=>{
         pageCounter--;
         getActiveImgs();
         threeDBtn.classList.remove('active')
         
         if (pageCounter < 3) {
            invertBnt.classList.remove('active')
         }

         threeDBtn.classList.remove('active')
   
         if (pageCounter < 0) {
            configCategoryWrap.classList.add('active')
            selectColorMain.classList.add('active')
            configTitle.classList.add('active')
            for (let i = 0; i < colorCleaner.length; i++) {
               colorCleaner[i].classList.add('active')
            }
            seletedColor.forEach(color => {
               color.style.cursor = ''
            });
            
            previewWrap.classList.remove('active');
            configNavigation.classList.remove('active')
            
            chooseColorMain.classList.remove('active')
            selectedColorWrap.classList.remove('active')
            
            removeAllActive(prevBtn)
            removeAllActive(configPointer)
            removeAllActive(chooseColorPage);
            removeAllActive(chooseColorTitle)
            
            chooseMovingArrow.classList.remove('active')
            
            selectedColorBtn.classList.add('active')
            seletedColorExpand.classList.add('active')
            seletedColorExpand.style.maxHeight = seletedColorExpand.scrollHeight + 'px';
            
            selectedColorBtn.innerText = 'selected color';


         }else{
            // remove acive
            removeAllActive(configPointer)
            removeAllActive(configPartPage)
            removeAllActive(chooseColorPage)
            removeAllActive(chooseColorTitle)
            removeAllActive(configNavigationLink)
      
            // add acive
            configPointer[pageCounter].classList.add('active')
            configPartPage[pageCounter].classList.add('active')
            chooseColorPage[pageCounter].classList.add('active')
            chooseColorTitle[pageCounter].classList.add('active')
            configNavigationLink[pageCounter].classList.add('active')
   
            let counterNavImg = configNavigationLink[pageCounter].querySelector('img')
            addPreview(counterNavImg)
   
            // show next page color from selection
            nextColorSelection();
            
            // navigation slider
            if (pageCounter >= navigationShow - 1) {
               navigationSlideCount--;
               configNavigationSlide.style.transform =  `translate(${- navigationWidth * navigationSlideCount}px)`
            }
         }
   })
});



// config-title click action
configTitle.addEventListener('click', ()=>{
   configCategoryWrap.classList.add('active')
   configCategoryWrap.classList.remove('boxed-blur')
   configTitle.classList.remove('bounce-pop')
   configTitle.querySelector('i').style.animation = 'none';
   
   if (window.matchMedia("(max-width: 767px)").matches) {
      let scrollingheght = - window.pageYOffset + configCategoryWrap.clientHeight + selectColorWrap[0].clientHeight + 70;
      window.scrollBy(0, scrollingheght)
   }
})

// select color actions
selectColor.forEach((color) => {
   color.addEventListener('click', ()=>{
      if (selectedColorArray.length >= 2) {
         if (color.classList.contains('active')) {
            color.classList.remove('active');
            collectselectColor(selectColor);
            addSelectedColor();
            selectCounter(color);
         }else{
            error.classList.add('active')
            errorText.innerText = "Choose Only 2 for A Nice wheel";
         }
      }else{
         color.classList.toggle('active');
         collectselectColor(selectColor);
         addSelectedColor();
         selectCounter(color);
         selectedColorWrap.classList.remove('boxed-blur')


         if (selectedColorArray.length > 1) {
            nextBtn.forEach(btn => {
               btn.classList.add('active')
            });

            if (window.matchMedia("(max-width: 767px)").matches) {
                setTimeout(()=>{
                  let scrollingheght = - window.pageYOffset + configCategoryWrap.clientHeight + selectColorWrap[0].clientHeight + 130;
                  window.scrollBy(0, scrollingheght)
               }, 200)
            }

            if (window.matchMedia("(max-width: 767px)").matches) {
               setTimeout(()=>{
                 let scrollingheght = - window.pageYOffset + configCategoryWrap.clientHeight + selectColorWrap[0].clientHeight + 80;
                 window.scrollBy(0, scrollingheght);
              }, 200)
           }
         }
      }
   })
});


// expard the color wrap
selectedColorBtn.addEventListener('click', ()=>{
   if (pageCounter >= 0) {
      configCategoryWrap.classList.add('active');
      selectColorMain.classList.add('active');
      configTitle.classList.add('active')
      
      invertBnt.classList.remove('active')
      threeDBtn.classList.remove('active')
      chooseMovingArrow.classList.remove('active')

      if (pageCounter >= 0) {
         for (let i = 0; i < colorCleaner.length; i++) {
            colorCleaner[i].classList.add('active')
         }
         pageCounteAlt = pageCounter
         getActiveImgs();
      }
      pageCounter = -1

      configNavigation.classList.remove('active')
      prevBtn.forEach(btn => {
         btn.classList.remove('active')
      });
      removeAllActive(configPointer);
      removeAllActive(chooseColorPage);
      removeAllActive(chooseColorTitle);
      chooseColorMain.classList.remove('active')
      selectedColorWrap.classList.remove('active')
      selectedColorBtn.classList.add('active')
      seletedColorExpand.classList.add('active')
      

      selectedColorBtn.innerText = 'selected color';

      configCategory.forEach(link => {
         let colorCounter = link.querySelector('span')
         if (link.contains(colorCounter)) {
            link.removeChild(colorCounter)
         }
      });

      // remove all color to selected wrap
      for (let i = 0; i < seletedColor.length; i++) {
         let colorHolder = seletedColor[i].querySelector('.color-holder');
         colorHolder.style.backgroundColor = "";
      }
      
      previewWrap.classList.remove('active');
      removeAllActive(colorCleaner);
      removeAllActive(selectColor);
      selectedColorArray = []
      
   }else{
      seletedColorExpand.classList.toggle('active')
      selectedColorBtn.classList.toggle('active')
      
   }

})


// choose color function
chooseColor.forEach(color => {
   color.addEventListener('click', ()=>{
      getImageChoose(color)
      removeAllActive(indexedImgParentWrap.querySelectorAll('img'))
      let AllPageColor = color.closest('.choose-color-page').querySelectorAll('li')
      for (let i = 0; i < AllPageColor.length; i++) {
         AllPageColor[i].classList.remove('checked')
      }
      color.classList.add('checked')
      indexedImg.classList.add('active')
      
      carryLoadImg = [];
      carryLoadImg.push(indexedImg)
      lazyLoadImg(carryLoadImg)

      if (pageCounter >= 4) {
         invertBnt.classList.add('active')
      }

      if (pageCounter == chooseColorPage.length - 1) {
         threeDBtn.classList.add('active')
      }
   })
});


// navigation clicking action
configNavigationLink.forEach((link, index) => {
   link.addEventListener('click', ()=>{
      if (index == 0) {
         pageCounter = index;
         removeAllActive(configNavigationLink)
         link.classList.add('active')

         let counterNavImg = link.querySelector('img')
         addPreview(counterNavImg)
      }else if (checkPageColorACtive(index - 1)) {
         pageCounter = index;
         removeAllActive(configNavigationLink)
         link.classList.add('active')
         let counterNavImg = link.querySelector('img')
         addPreview(counterNavImg)
      }else{
         error.classList.add('active')
         errorText.innerText = "Please choose color to go next pages";
      }

      if (pageCounter >= 3 && checkPageColorACtive(pageCounter)) {
         invertBnt.classList.add('active')
      }else{
         invertBnt.classList.remove('active')
      }
      if (pageCounter == chooseColorPage.length - 1 && checkPageColorACtive(pageCounter)) {
         threeDBtn.classList.add('active')
      }else{
         threeDBtn.classList.remove('active')
      }

      // remove acive
      removeAllActive(configPointer)
      removeAllActive(chooseColorPage)
      removeAllActive(chooseColorTitle)

      // add acive
      configPointer[pageCounter].classList.add('active')
      chooseColorPage[pageCounter].classList.add('active')
      chooseColorTitle[pageCounter].classList.add('active')
   })
});

// invert color button action
invertBnt.addEventListener('click', ()=>{
   carryLoadImg = [];
   chooseColorPage.forEach(page => {
      if (page.contains(page.querySelector('li.checked'))) {
         if (page.contains(page.querySelector('li.color-fixed.checked'))) {
            // no code
         }else{
            let activeColor = page.querySelectorAll('li.active')
      
            let colorPageIndex;
            let colorparentIndex;
            let colorIndex;
      
            activeColor.forEach(color => {
               if (color.classList.contains('checked')) {
                  color.classList.remove('checked')
      
                  findIndex(color.closest('.choose-color-page'), '.choose-color-wrapper')
                  colorPageIndex = childIndex;
               }else{
                  color.classList.add('checked')
      
                  findIndex(color.closest('.choose-color-category'), '.choose-color-page')
                  colorparentIndex = childIndex;
                  findIndex(color, '.choose-color-page ul')
                  colorIndex = childIndex;
               }
            });
      
            let indexedImgParentWrap = configPartPage[colorPageIndex];
            let indexedImgParent = indexedImgParentWrap.children[colorparentIndex];
            let indexedImg = indexedImgParent.children[colorIndex];
      
            removeAllActive(indexedImgParentWrap.querySelectorAll('img'))
            indexedImg.classList.add('active')
            carryLoadImg.push(indexedImg)
            invertBnt.classList.remove('pulse-pop')
         }
      }
   })
   lazyLoadImg(carryLoadImg)

})

// back btn clinking action
backBtn.addEventListener('click', (e)=>{
   e.preventDefault();
   configContent.classList.add('active')
   formPage.classList.remove('active')
})

// getQouteBtn
getQouteBtn.addEventListener('click', (e)=>{
   e.preventDefault();
   window.scrollTo(0,0)
   formPage.classList.remove('active');
   thankyouPage.classList.add('active');

   removeAllActive(configPointer)
})


// threeD btn remove pulse clicking
threeDBtn.addEventListener('click', ()=>{
   threeDBtn.classList.remove('pulse-pop')
})

// get reverse zindex
for (let i = 0; i < configPartPage.length; i++) {
   configPartPage[i].style.zIndex =  configPartPage.length - i
}

// error close
error.addEventListener('click', ()=>{
   error.classList.remove('active')
})


// tab
tabFunc(configCategory, selectColorWrap, selectColorTitle)



// FUNCTIONS

// check if page color has checked class
function checkPageColorACtive(counter) {
   let AllcolorPage = chooseColorPage[counter].querySelectorAll('li')
   let x;
   for (let i = 0; i < AllcolorPage.length; i++) {
      if (AllcolorPage[i].classList.contains('checked')) {
         x = AllcolorPage[i]
      }
   }
   if (x) {
      return true
   }else{
      return false
   }
}

// get images accourding to color
function getImageChoose(color) {
   findIndex(color.closest('.choose-color-page'), '.choose-color-wrapper')
   let colorParentWrapIndex = childIndex;
   findIndex(color.closest('.choose-color-category'), '.choose-color-page')
   let colorParentIndex = childIndex;
   findIndex(color, '.choose-color-page ul')
   let colorIndex = childIndex;
   
   indexedImgParentWrap = configPartPage[colorParentWrapIndex];
   indexedImgParent = indexedImgParentWrap.children[colorParentIndex];
   indexedImg = indexedImgParent.children[colorIndex];

   return indexedImgParentWrap, indexedImg;
}

function getImageSelect(color) {
   findIndex(color.closest('.select-color-category'), '.select-color-page')
   let colorParentIndex = childIndex;
   findIndex(color, '.select-color-page ul')
   let colorIndex = childIndex;

   allIndexedImg = document.querySelectorAll(`.config-part-category:nth-child(${colorParentIndex + 1}) img:nth-child(${colorIndex + 1})`)

   return allIndexedImg;
}

// show next page color from selection
function nextColorSelection() {
   removeAllActive(chooseColor)
   for (let i = 0; i < selectedColorArray.length; i++) {
      findIndex(selectedColorArray[i].closest('.select-color-category'), '.select-color-page')
      let colorParentIndex = childIndex;
      findIndex(selectedColorArray[i], '.select-color-page ul')
      let colorIndex = childIndex;
      let indexedcolorParent = document.querySelectorAll(`.choose-color-category:nth-child(${colorParentIndex + 1})`)

      indexedcolorParent.forEach(colorParent => {
         let indexedcolor = colorParent.querySelector(`li:nth-child(${colorIndex + 1})`)
         indexedcolor.classList.add('active')
      });
   }
}

// add img to preview
const previewImg = document.querySelector('.preview')
function addPreview(img) {
   previewImg.src = img.src
}


// apply width to navition
let navigationMargin;
let navigationWidth;

function getNavigationWidth() {
      navigationMargin = parseInt(window.getComputedStyle(configNavigationLink[0]).marginLeft) + parseInt(window.getComputedStyle(configNavigationLink[0]).marginRight) 
      navigationWidth = configNavigationLink[0].clientWidth + navigationMargin
      navigationSlider.style.width = (navigationWidth) * navigationShow + 'px';
}


// get active images in 2 arrar accourding 2 color
function getActiveImgs() {
   imgActive0 = [];
   imgActive1 = [];

   for (let i = 0; i < selectedColorArray.length; i++) {
      getImageSelect(selectedColorArray[i])
      allIndexedImg.forEach(img => {
         if (img.classList.contains('active')) {
            if (i == 0) {
               imgActive0.push(img)
            }else{
               imgActive1.push(img)
            }
         }
      });
   }

   return imgActive0, imgActive1;
}


// give color in part when go back and bring back
function colorBack(imgArray, color) {
   imgArray.forEach(img => {
      let imgParentPage = img.closest('.config-part-page')

      removeAllActive(imgParentPage.querySelectorAll('img'))
      let colorParentPage = document.querySelectorAll('.choose-color-page')

      findIndex(imgParentPage, '.config-part-wrap')
      let imgParentWrapIndex = childIndex;

      findIndex(color.closest('.select-color-category'), '.select-color-page')
      let colorParentIndex = childIndex;
      findIndex(color, '.select-color-page ul')
      let colorIndex = childIndex;

      let switchAbleImg = imgParentPage.children[colorParentIndex].children[colorIndex]
      switchAbleImg.classList.add('active');      
      carryLoadImg.push(switchAbleImg)
      
      let indexcolorparentPage = colorParentPage[imgParentWrapIndex]
      let AllPageColor = indexcolorparentPage.querySelectorAll('li')
      for (let i = 0; i < AllPageColor.length; i++) {
         AllPageColor[i].classList.remove('checked')
      }
      let swithAbleColor = indexcolorparentPage.children[colorParentIndex].querySelectorAll('li')[colorIndex]
      swithAbleColor.classList.add('checked');
   });
}

// get prent and child index
function findIndex(child, parentClass) {
   let parent = child.closest(parentClass);
   childIndex = Array.from(parent.children).indexOf(child);
   return childIndex;
}

// collect select Color
function collectselectColor(color) {
   selectedColorArray = []
   for (let i = 0; i < color.length; i++) {
      if (color[i].classList.contains('active')) {
         selectedColorArray.push(color[i])
      }
   }
}

// counter select color in category
function selectCounter(color) {
   findIndex(color.closest('.select-color-category'), '.select-color-page')
   let colorParentIndex = childIndex;

   if (configCategory[colorParentIndex].contains(configCategory[colorParentIndex].querySelector('span'))) {
      let colorCounter = configCategory[colorParentIndex].querySelector('span');

      if (color.classList.contains('active')) {
         colorCounter.innerText++;
      }else{
         colorCounter.innerText--;
         if (colorCounter.innerText == 0) {
            configCategory[colorParentIndex].removeChild(colorCounter)
         }
      }
   }else{
      let createSpan = document.createElement('SPAN')
      createSpan.innerText = '1';
      configCategory[colorParentIndex].appendChild(createSpan)
   }
}

// remove all ative class
function removeAllActive(victims) {
   for (let i = 0; i < victims.length; i++) {
      victims[i].classList.remove('active')
   }
}

// add color to selected wrap
function addSelectedColor() {
   // remove all color to selected wrap
   for (let i = 0; i < seletedColor.length; i++) {
      let colorHolder =  seletedColor[i].querySelector('.color-holder');
      colorHolder.style.backgroundColor = "";
   }
   removeAllActive(colorCleaner);
   // add selet color to selected wrap
   for (let i = 0; i < selectedColorArray.length; i++) {
      let colorHolder =  seletedColor[i].querySelector('.color-holder');
      let colorBackground =  selectedColorArray[i].querySelector('span').style.backgroundColor;
      colorHolder.style.backgroundColor = colorBackground;
      colorCleaner[i].classList.add('active');
   }
}

// collect select Color
function collectselectColor(color) {
   selectedColorArray = []
   for (let i = 0; i < color.length; i++) {
      if (color[i].classList.contains('active')) {
         selectedColorArray.push(color[i])
      }
   }
}

// change active class to parent child
function activeParentChild(child) {
   let childParent = child.parentElement
   child.addEventListener('click', ()=>{
      for (let i = 0; i < childParent.children.length; i++) {
         childParent.children[i].classList.remove('active')
      }
      child.classList.add('active')
   })
}

// change active class to parent child on link index
function activeParentIndex(victim, index) {
   let victimParent = victim.parentElement
   for (let i = 0; i < victimParent.children.length; i++) {
      victimParent.children[i].classList.remove('active')
   }
   victimParent.children[index].classList.add('active')
}

// tab
function tabFunc(tabLink, tabContents, tabContentTitle) {
   tabLink.forEach((link, index) => {
      // change active class 
      activeParentChild(link)
      link.addEventListener('click', ()=>{
         for (let i = 0; i < selectColorWrap.length; i++) {
            selectColorWrap[i].classList.remove('boxed-blur')
         }
         for (let i = 0; i < selectColorTitle.length; i++) {
            selectColorTitle[i].classList.remove('boxed-blur')
         }
         tabContents.forEach(content => {
            activeParentIndex(content, index)
            
         });
         tabContentTitle.forEach(title => {
            activeParentIndex(title, index)
         });
      })
   });
}

// lazy load img 
function lazyLoadImg(imgs) {
   previewLoader.classList.remove('active');
   let totalImg = imgs.length;   
   loadImgCount = 0;
   imgs.forEach(img => {
      if (!img.getAttribute('src') && img.getAttribute('data-src')) {
         previewLoader.classList.add('active')
         let newImg = new Image;
         newImg.src = img.getAttribute('data-src')
         newImg.addEventListener('load', ()=>{
             img.src = newImg.src;
             checkAllImgLoaded()
         }) 
     }else{
      checkAllImgLoaded()
     }
   });
   
   function checkAllImgLoaded() {
      loadImgCount++;
      if (loadImgCount == totalImg) {
         previewLoader.classList.remove('active')
      }
   }
}




// GET FINAL WHEEL DATA
function getData() {
   // imgs
   final_wheel = []
   wheelImgs.forEach(img => {
      if (img.classList.contains('active')) {
         final_wheel.push(img)
      }
   });
   // color names
   final_color_name = []
   chooseColor.forEach(color => {
      if (color.classList.contains('checked')) {
         let colorname = color.getAttribute('data-original-title')
         final_color_name.push(colorname)
      }
   });
   
   for (let i = 0; i < final_color_name.length; i++) {
      finalFormInput[i].value = final_color_name[i]
   }
}

// take screen shot of final wheel
document.querySelector('#capture .preview-loader').setAttribute('data-html2canvas-ignore', 'true')
function finalWheelImg() {
   $(".preloader").delay(500).fadeIn(500);
   window.scrollTo(0,0)
   wheelAllImg.forEach(img => {
      img.removeAttribute('data-html2canvas-ignore')
      if (img.classList.contains('active')) {
      }else{
         img.setAttribute('data-html2canvas-ignore', 'true')
      }
   });
   html2canvas(document.querySelector("#capture"),
      {
         imageTimeout: '0',
         removeContainer: false,
      }
   ).then(canvas => {
      configContent.classList.remove('active')
      formPage.classList.add('active')
      $(".preloader").delay(500).fadeOut(500);
      imgData.value = canvas.toDataURL('image/jpeg', 1);
   });
}
