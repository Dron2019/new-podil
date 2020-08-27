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

imagesLoaded(document.querySelectorAll('img'), () => {
    document.body.classList.remove('loading');
});
let frontScreenEffect = undefined;


function setImagesRatio() {
    if (window.screen.width < 576) return (320 / 568);
    if (window.screen.width < 769) return (window.screen.width / window.screen.height);
    return (9 / 16);
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
        imagesRatio: setImagesRatio(),
        image1: img.getAttribute('src'),
        image2: img.getAttribute('src'),
        displacementImage: el.dataset.displacement,
    });
});

// frontScreenEffect.next();
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
// console.log(document.querySelectorAll('.page-sngl-block'));
let scenesArray = [];
advBlocks.forEach(e => {
    let tween = new TimelineMax({ ease: "power4.out" });
    let blockImg = e.querySelector('img');
    tween.set(blockImg, { scale: 1.2 })
    tween.fromTo(blockImg, { y: 100 * Math.random() }, { y: 0 });

    let scene = new ScrollMagic.Scene({
        triggerElement: e,
        duration: e.getBoundingClientRect().height * 2,
        // offset: e.getBoundingClientRect().height * -0.1,

        triggerHook: 1,
    });
    scene.setTween(tween);
    scene /*.addIndicators()*/
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


    let textTween = new TimelineMax({ /*ease: "power4.out"*/ });
    textTween.fromTo(textBlockText, { autoAlpha: 0, y: -150 }, { autoAlpha: 1, y: 0 });
    // textTween.fromTo(textBlockIcon, { scaleY: 0, y: -70 }, { scaleY: 1, y: 0 });
    textScene.setTween(textTween);
    textScene.addTo(controller);

    textScene.on('enter', function(e, target) {
        if (e.scrollDirection !== 'REVERSE') {
            gsap.fromTo(textBlockIcon, { scaleY: 0 }, { delay: 0.5, scaleY: 1 })
        }
    })
});