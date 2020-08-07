/**
 * Обводка svg елемента 
 */
function simulatePathDrawing(path, strokeWidth = '1') {
    if (path.done) return;
    // var path = document.querySelector('.squiggle-animated path');
    var length = path.getTotalLength();
    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition =
        'none';
    // Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset 1.5s ease-in-out';
    // Go!
    path.style.strokeDashoffset = '0';
    path.style.strokeWidth = strokeWidth;
    path.done = true;
}

// let blocksTimeline = gsap.timeline();

// blocksTimeline.from('.main-screen__block', {
//     opacity: 0,
//     stagger: 0.5,
//     y: -100,
// }, );
let tl = gsap.timeline();
tl.fromTo('.heart-vertical', 1.2, { scaleY: 0 }, { scaleY: 1 })
    .fromTo('.heart-horizontal', 1.2, { scaleX: 0 }, { scaleX: 1 })
    .fromTo('.fixed-background-heart path', 1.2, { opacity: 0 }, { opacity: 1 })
    .add(simulatePathDrawing.bind(null, document.querySelector('.fixed-background-heart path')), '<');

function throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }
        func.apply(this, arguments); // (1)
        isThrottled = true;
        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
    return wrapper;
}

function checkHeader() {
    let scrollTop = document.documentElement.scrollTop,
        header = document.querySelector('header');
    // scrollTop > +getComputedStyle(header).height.replace(/px/, '') ?
    scrollTop > +getComputedStyle(header).height.replace(/px/, '') ?
        header.classList.remove('main-screen-position') :
        header.classList.add('main-screen-position');
}
checkHeader = throttle(checkHeader, 100);
window.addEventListener('scroll', function(evt) {
    checkHeader();
});
checkHeader();



const $sections = document.querySelectorAll('section');
let scrollController = new ScrollMagic.Controller();
$sections.forEach(section => {
    let scene = new ScrollMagic.Scene({
            triggerElement: section,
            tweenChanges: true,
            duration: getHeight(section),
            triggerHook: 1, // the scene should last for a scroll distance of 100px
            offset: -200 // start this scene after scrolling for 50px
        })
        .addTo(scrollController);
    let anim1 = gsap.timeline();
    let paragraphAnim = TweenMax.staggerFromTo(section.querySelectorAll('.home-second-screen__text p'), 1, {
        skewX: 2,
        skewY: 20,
        scale: 1.2,
        opacity: 0,

    }, {
        skewX: 0,
        skewY: 0,
        scale: 1,
        opacity: 1,
        ease: Quart.easeOut
    }, .1, );
    paragraphAnim.pause();

    anim1.from(section.querySelectorAll('.home-block, .main-screen__block-pattern, .slogan'), { y: function(e, target) { return getHeight(target) }, }, );
    // anim1.from(section.querySelectorAll('.home-second-screen__text'), { skewX: 30, opacity: 0 })
    scene.addIndicators({});
    scene.setTween(anim1);

});




function getHeight(el) {
    return +getComputedStyle(el).height.replace(/px/, '');
};


const ease_1 = BezierEasing(.25, 1.84, .43, 1.02);

gsap.from('.home-second-screen__image path', 1.2, { x: 150, ease: ease_1, autoAlpha: 0, s