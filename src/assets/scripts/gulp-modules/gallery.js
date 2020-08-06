// Select all your images
var spriteImages = document.querySelectorAll('.main-screen-layout .slide-item__image');
var spriteImagesSrc = [];
var texts = [];
var imgDIR = ``;
if (window.location.href.match(/\/dist\//)) imgDIR = `/dist/`;

let
    galleryHEaderWrapper = document.querySelector('.safari-wrap');
galleryHEaderWrapper.append($header);



for (var i = 0; i < spriteImages.length; i++) {
    var img = spriteImages[i];
    // Set the texts you want to display to each slide 
    // in a sibling element of your image and edit accordingly
    if (img.nextElementSibling) {
        texts.push(img.nextElementSibling.innerHTML);
    } else {
        texts.push('');
    }

    spriteImagesSrc.push(img.getAttribute('src').replace('./', imgDIR));
}


var moveSlider = new CanvasSlideshow({
    sprites: spriteImagesSrc,
    displacementImage: './assets/images/main-screen-filter.jpg',
    autoPlay: false,
    selector: '.main-screen',
    autoPlaySpeed: [0.3, 0.3],
    displaceScale: [800, 500],
    fullScreen: true,
    navSelector: '.main-screen',
    navElement: document.querySelectorAll('.main-screen .scene-nav'),
    displaceAutoFit: true,
    // stageWidth: document.documentElement.clientWidth,
    image: document.querySelectorAll('.main-screen-layout .slide-item__image'),
    // stageHeight: document.documentElement.clientHeight,
    displacementCenter: true,
    interactive: true,
    interactionEvent: 'click', // 'click', 'hover', 'both' 
});
moveSlider.init();

/**Всплывающая подсказка на первом экране */
const mousePopup = document.createElement('div');
mousePopup.classList.add('mouse-popup');
mousePopup.innerHTML = 'Натисніть та утримуйте на зображенні';
document.querySelector('.main-screen').append(mousePopup);
document.querySelector('.main-screen canvas').addEventListener('mousemove', function(evt) {
    console.log(evt);
    mousePopup.style.top = evt.clientY + 'px';
    mousePopup.style.left = evt.clientX + 30 + 'px';
});
document.querySelector('.main-screen canvas').addEventListener('mouseenter', function(evt) {
    document.querySelector('.main-screen').append(mousePopup);
    mousePopup.classList.add('visible');
});
document.querySelector('.main-screen canvas').addEventListener('mouseleave', function(evt) {
    mousePopup.remove();
    mousePopup.classList.remove('visible');
});
/**Всплывающая подсказка на первом экране END */