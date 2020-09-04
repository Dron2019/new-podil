/* beautify preserve:start */
@@include('../libs/displacment-hover/imagesloaded.pkgd.min.js')
@@include('../libs/displacment-hover/three.min.js')
;;;;;;;;;;;;;;;;;;;
@@include('../libs/displacment-hover/hover.umd.js')
;;;
@@include('../libs/artem-scroll/scroll.js')
;;;;;;
@@include('../../../../node_modules/svg-path-parser/parser.js')

;;;
/* beautify preserve:end */
var d = `M3,7 5-6 L1,7 1e2-.4 m-10,10 l10,0  
  V27 89 H23           v10 h10             
  C33,43 38,47 43,47   c0,5 5,10 10,10     
  S63,67 63,67         s-10,10 10,10       
  Q50,50 73,57         q20,-5 0,-10        
  T70,40               t0,-15              
  A5,5 45 1,0 40,20    a5,5 20 0,1 -10-10  Z`;
console.log(parseSVG(d));
/**Imported GSAP END */

/**Displacment Hover */

function setImagesRatio() {
    if (window.screen.width < 576) return (375 / 406);
    if (window.screen.width < 769) return (window.screen.width / window.screen.height);
    return (9 / 16);
}
/**
 * Подбор картинки для первого єкрана страниц преимуществ
 * Берется датасет mobile-src, при отсутсвии просто сс
 */

function getImgForFronBlock(img) {
    let desktopImage = img.getAttribute('src');
    let mobImage = img.dataset.mobileSrc;
    if (mobImage !== undefined && window.screen.width < 576) return mobImage;
    return desktopImage;

}
var frontScreenEffect = undefined
Array.from(document.querySelectorAll('.front-bg')).forEach((el) => {
    const img = document.querySelector('.front-bg img');
    frontScreenEffect = new hoverEffect({
        parent: el,
        intensity: 0.1,
        angle: Math.PI / 5,
        intensity: el.dataset.intensity || undefined,
        speedIn: el.dataset.speedin || undefined,
        speedOut: el.dataset.speedout || undefined,
        easing: el.dataset.easing || undefined,
        hover: el.dataset.hover || undefined,
        // imagesRatio: 9 / 16,
        imagesRatio: setImagesRatio(img),
        image1: getImgForFronBlock(img),
        image2: getImgForFronBlock(img),
        displacementImage: el.dataset.displacement,
    });
});
frontScreenEffect.canvas = document.querySelector('canvas');
frontScreenEffect.value = 1;
frontScreenEffect.canvas.addEventListener('click', function(evt) {
    if (frontScreenEffect.value <= 0) {
        frontScreenEffect.next();
        frontScreenEffect.value = !frontScreenEffect.value;
    } else {
        frontScreenEffect.value = !frontScreenEffect.value;
        frontScreenEffect.previous();
    }
    // console.log(frontScreenEffect.value);
});
// console.log(frontScreenEffect);



/**Displacment HoverEnd */





;;;;;;;;;
let legendButton = document.querySelector('.legend-button-js'),
    legend = document.querySelector('.legend-js'),
    buttonTextEl = legendButton.querySelector('span');
let legendButtonTitles = (function() {
    if (!legendButton.dataset.opened || !legendButton.dataset.close) {
        return [buttonTextEl.innerText, buttonTextEl.innerText];
    }
    return [legendButton.dataset.opened, legendButton.dataset.close];
})();


legendButton.addEventListener('click', function(evt) {
    legend.classList.toggle('closed');
    if (!legend.classList.contains('closed')) animateLegendIcons();
    legend.classList.contains('closed') ?
        buttonTextEl.innerText = legendButtonTitles[0] :
        buttonTextEl.innerText = legendButtonTitles[1];

});

function animateLegendIcons() {
    gsap.from(legend.querySelectorAll('li'), { autoAlpha: 0, y: 15, stagger: 0.01 });
}


let popupIcon = createIcon();
document.body.append(popupIcon);

function createIcon() {
    let iconPopup = document.createElement('div');
    iconPopup.classList.add('legend-icon-popup');
    return iconPopup;

};

function addText(text, el) {
    el.innerText = text;
};

function changeElPosition(el, cords) {
    let selfHeight = +getComputedStyle(el).height.replace(/px/, '');
    el.style.transform = `translateX(-50%)`;
    el.style.opacity = 1;
    // console.log(cords);
    el.style.top = cords.top - (3 + selfHeight) + 'px';
    el.style.left = cords.left + (cords.width / 2) + 'px';
}

function offIcon(el) {
    el.style.opacity = 0;
}

let hearts = document.querySelectorAll('[data-popup-text]');
// console.log(hearts);
hearts.forEach(icon => {
    icon.addEventListener('mouseenter', (evt) => {
        evt.stopPropagation();
        changeElPosition(popupIcon, icon.getBoundingClientRect());
        addText(icon.dataset.popupText, popupIcon)
    });
    icon.addEventListener('mouseout', (evt) => {
        evt.stopPropagation();
        offIcon(popupIcon);
    });
})