/* beautify preserve:start */
@@include('../libs/displacment-hover/imagesloaded.pkgd.min.js')
@@include('../libs/displacment-hover/three.min.js')
;;;;;;;;;;;;;;;;;;;
@@include('../libs/displacment-hover/hover.umd.js')
;;;
@@include('../libs/artem-scroll/scroll.js')
;;;;;;
@@include('../libs/scroll-magic/ScrollMagic.min.js')
@@include('../libs/scroll-magic/plugins/debug.addIndicators.min.js')
@@include('../libs/scroll-magic/plugins/animation.gsap.min.js')
/* beautify preserve:end */;;;;;;;;;;;;;;



/**Регулировка ширины SVG на первом экране */
document.querySelectorAll('.front-block__top-pattern,.front-block__bottom-pattern').forEach(el => {
    elviewBoxWidth = el.getAttribute('viewBox').split(' ')[2];
    if (document.documentElement.clientWidth > 1719) {
        elviewBoxWidth = +el.getAttribute('viewBox').split(' ')[2] * 1.35;
    }
    el.style.maxWidth = elviewBoxWidth + 'px';
});




const ease_1 = BezierEasing(.25, 1.84, .43, 1.02);
const iconsEasing = BezierEasing(.15, .95, .15, .94);
const ease_2 = BezierEasing(.25, .13, .2, 1.02);
imagesLoaded(document.querySelectorAll('img'), () => {
    document.body.classList.remove('loading');
});
let frontScreenEffect = undefined;


function setImagesRatio() {
    if (window.screen.width < 576) return (568 / 380);
    if (window.screen.width < 769) return (window.screen.width / window.screen.height);
    return (9 / 16);
}
console.log();

/**
 * Подбор картинки для первого єкрана страниц преимуществ
 * Берется датасет mobile-src, при отсутсвии просто src
 */
function getImgForFronBlock() {
    let desktopImage = document.querySelector('.front-block__bg').getAttribute('src');
    let mobImage = document.querySelector('.front-block__bg').dataset.mobileSrc;
    if (mobImage !== undefined && window.screen.width < 576) return mobImage;
    return desktopImage;

}
Array.from(document.querySelectorAll('.front-block')).forEach((el) => {
    const img = document.querySelector('.front-block__bg');
    frontScreenEffect = new hoverEffect({
        parent: el,
        intensity: 0.3,
        angle: Math.PI / 3,
        intensity: el.dataset.intensity || undefined,
        speedIn: el.dataset.speedin || undefined,
        speedOut: el.dataset.speedout || undefined,
        easing: el.dataset.easing || undefined,
        hover: el.dataset.hover || undefined,
        // imagesRatio: 9 / 16,
        imagesRatio: setImagesRatio(img),
        image1: getImgForFronBlock(),
        image2: getImgForFronBlock(),
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
});
const firstScreenAnimation = function() {
    let tl = new TimelineMax({ duration: 1, paused: true });
    tl.add(frontScreenEffect.next, )
        .from('.front-block svg path', {
            autoAlpha: 0,
            stagger: 0.05,
            y: function(e, target) {
                return -target.getBoundingClientRect().height;
            }
        }, '<')
    return tl;
};
firstScreenAnimation().play();


var controller = new ScrollMagic.Controller();
const advBlocks = document.querySelectorAll('.page-sngl-block');
let scenesArray = [];
advBlocks.forEach(e => {
    let tween = new TimelineMax({ ease: "power4.out" });
    let blockImg = e.querySelector('img');
    console.log(blockImg);
    let imgHeight = 0;
    if (blockImg !== null) {
        imgHeight = blockImg.getBoundingClientRect().height || null;
    }
    let fullScreenImg = imgHeight > document.documentElement.clientHeight * 0.6;
    tween.set(blockImg, { scale: 1.15 })
    tween.fromTo(blockImg, {
        skewX: '3deg',
        x: 50
            // y: function() {
            //     if (window.screen.width < 576) return 0;
            //     if (fullScreenImg) {

        //         return imgHeight * 0.1
        //             // return 0;
        //     };
        //     return 100 * Math.random();
        // }
    }, {
        skewX: 0,
        x: 0
            // y: function() {
            //     if (fullScreenImg) {
            //         return imgHeight * 0.1 * -1
            //             // return 0;
            //     };
            //     return 0;
            // }
    });

    let scene = new ScrollMagic.Scene({
        triggerElement: e,
        duration: e.getBoundingClientRect().height * 2.5,
        // offset: e.getBoundingClientRect().height * -0.1,

        triggerHook: 1,
    });
    scene.setTween(tween);
    scene /*. addIndicators()*/
        .addTo(controller); // assign the scene to the controller
    scenesArray.push(scene);

    let textBlock = e.querySelector('.page-sngl-block__text-block'),
        textBlockText = textBlock.querySelector('.page-sngl-block__text-block-text'),
        textBlockIcon = textBlock.querySelector('.page-sngl-block__text-block-icon');
    let textScene = new ScrollMagic.Scene({
        triggerElement: textBlock,
        duration: textBlock.getBoundingClientRect().height * 2,
        offset: -textBlock.getBoundingClientRect().height,
        triggerHook: 0.95,
    });


    let textTween = new TimelineMax({ ease: "power4.out" });
    textTween.fromTo(textBlockText, 2.5, { autoAlpha: 0, x: "-100%" }, { duration: 2.5, autoAlpha: 1, x: 0 });
    textTween.fromTo(textBlockIcon, 2.5, { autoAlpha: 0, x: -100 }, { duration: 2.5, autoAlpha: 1, x: 0 }, '<');
    textScene.setTween(textTween);
    textScene.addTo(controller);

    textScene.on('enter', function(e, target) {
        if (e.scrollDirection !== 'REVERSE') {
            // gsap.fromTo(textBlockIcon, { skewX: 0.1, x: -100 }, { skewX: 0, duration: 2, ease: iconsEasing, delay: 0.5, x: 0 })
        }
    })
});