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
checkHeader = throttle(checkHeader, 200);
window.addEventListener('scroll', function(evt) {
    checkHeader();
});
checkHeader();



const $sections = document.querySelectorAll('.home-block');
let scrollController = new ScrollMagic.Controller();
// $sections.forEach(section => {
//     let scene = new ScrollMagic.Scene({
//             triggerElement: section,
//             tweenChanges: true,
//             duration: getHeight(section),
//             triggerHook: 0.7, // the scene should last for a scroll distance of 100px
//             offset: 0 // start this scene after scrolling for 50px
//         })
//         .addTo(scrollController);
//     let anim1 = gsap.timeline();
//     // let paragraphAnim = TweenMax.staggerFromTo(section.querySelectorAll('.home-second-screen__text p'), 1.75, {
//     //     // skewX: 2,
//     //     stagger: 0.025,
//     //     // skewY: 20,
//     //     // scale: 1.2,
//     //     scale: 1.1,
//     //     opacity: 0,

//     // }, {
//     //     // skewX: 0,
//     //     // skewY: 0,
//     //     // scale: 1,
//     //     opacity: 1,
//     //     ease: Quart.easeOut
//     // }, .1, );

//     // anim1.from(section.querySelectorAll('.home-block, .main-screen__block-pattern, .slogan'), { y: function(e, target) { return getHeight(target) }, }, );
//     anim1.from(section.querySelectorAll('svg, div'), {
//             y: 100,
//         }, ).from(section, { backgroundPositionY: '-25px', scaleY: '1.05' }, '<')
//         // anim1.from(section.querySelectorAll('.home-second-screen__text'), { skewX: 30, opacity: 0 })
//     scene.addIndicators({});
//     scene.setTween(anim1);

// });




function getHeight(el) {
    return +getComputedStyle(el).height.replace(/px/, '');
};


const ease_1 = BezierEasing(.25, 1.84, .43, 1.02);
const ease_2 = BezierEasing(.25, .13, .2, 1.02);


const ex = Expo.easeInOut;
const exI = Expo.easeIn;
const exO = Expo.easeOut;
// const ease_1 = BezierEasing(0, 1.12, .94, 1);



function secondScreenAnim() {
    const tl = new TimelineMax({ repeat: 0, duration: 0.5, ease: ease_1, paused: true });
    tl.fromTo('.home-second-screen__image path,.home-second-screen__image circle', 1.75, {
        ease: ease_2,
        x: function(e, target) {
            // console.log(target);
            return target.getBoundingClientRect().width;
        },
        autoAlpha: 0,
        stagger: 0.05
    }, {
        autoAlpha: 1,
        x: 0,
        ease: ease_2,
    });
    tl.fromTo('.home-second-screen__text p ', { autoAlpha: 0, rotateX: 90, y: -50 }, { autoAlpha: 1, rotateX: 0, y: 0, stagger: 0.025 }, '<')
    return tl;
}
// secondScreenAnim().play().timeScale(1);

function firstScreenAnim() {
    const tl = new TimelineMax({ repeat: 0, duration: 0.5, ease: ease_1, paused: true });
    tl.from('.main-screen .main-screen__block:nth-child(1) .main-screen__block__bg-image', 0.8, { ease: ease_2, scale: 1.5 });
    tl.from('.main-screen .main-screen__block:nth-child(1) svg ,.main-screen .main-screen__block:nth-child(1) .home-block-title, .main-screen .main-screen__block:nth-child(1) .slogan', 1.8, { autoAlpha: 0, ease: exO, stagger: 0.1, transformOrigin: "top", y: -30 }, '<');
    tl.from('.main-screen .main-screen__block:nth-child(2) .main-screen__block__bg-image', 0.8, { ease: ease_2, scale: 1.5 }, '<0.05');
    tl.from('.main-screen .main-screen__block:nth-child(2) svg ,.main-screen .main-screen__block:nth-child(2) .home-block-title, .main-screen .main-screen__block:nth-child(2) .slogan', 1.8, { autoAlpha: 0, ease: exO, stagger: 0.1, transformOrigin: "top", y: -30 }, '<');
    tl.from('.main-screen .main-screen__block:nth-child(3) .main-screen__block__bg-image', 0.8, { ease: ease_2, scale: 1.5 }, '<0.05');
    tl.from('.main-screen .main-screen__block:nth-child(3) svg ,.main-screen .main-screen__block:nth-child(3) .home-block-title, .main-screen .main-screen__block:nth-child(3) .slogan', 1.8, { autoAlpha: 0, ease: exO, stagger: 0.1, transformOrigin: "top", y: -30 }, '<');
    tl.from('.main-screen .main-screen__block:nth-child(4) .main-screen__block__bg-image', 0.8, { ease: ease_2, scale: 1.5 }, '<0.05');
    tl.from('.main-screen .main-screen__block:nth-child(4) svg ,.main-screen .main-screen__block:nth-child(4) .home-block-title, .main-screen .main-screen__block:nth-child(4) .slogan', 1.8, { autoAlpha: 0, ease: exO, stagger: 0.1, transformOrigin: "top", y: -30 }, '<');
    tl.from('.main-screen  .hover-gradient', 1, { ease: ex, opacity: 1 });
    return tl;
}

firstScreenAnim().play().timeScale(0.6);




function thirdScreenAnim() {
    let tl = new TimelineMax({ duration: 0.25, repeat: 0, delay: 0, paused: true });
    let textEase = BezierEasing(.14, .97, .51, .96);
    tl.from('.home-third-screen .mask-pattern path', 2, {
            ease: BezierEasing(.14, .97, .25, .98),
            autoAlpha: 0,

            y: function(e, target, r) {
                if (target.closest('svg').classList.value.match(/bottom/)) {
                    return target.getBoundingClientRect().width;
                } else {
                    return -target.getBoundingClientRect().width;
                }
            },
            x: function(e, target) {
                if (target.closest('svg').classList.value.match(/bottom/)) {
                    return -target.getBoundingClientRect().width;
                } else {
                    return target.getBoundingClientRect().width;
                }
                // return target.getBoundingClientRect().width;
            },
        })
        .from('.home-third-screen-left .home-third-screen__part', 2, { ease: textEase, stagger: 0.1, autoAlpha: 0, x: -200 }, '<')
        .from('.home-third-screen-right .home-third-screen__part', 2, { ease: textEase, stagger: 0.1, autoAlpha: 0, x: 200 }, '<')
    return tl;



    // .from('.home-third-screen video', 1, { autoAlpha: 0 }, '<')
    //     .from('.digit-value', 1, { y: -50, x: -50, color: 'rgb(23, 152, 213)' })
    //     .from('.home-third-screen__part .text', 1, { y: -50, x: 50, color: 'rgb(23, 152, 213)', }, '<')
};
// thirdScreenAnim();









let homeScreenVideo = document.querySelector('video'),
    homeVideoPlayButton = document.querySelector('.video-play-button');

homeVideoPlayButton.addEventListener('click', function(evt) {
    console.log('ew');
    homeScreenVideo.play();
    homeVideoPlayButton.style.visibility = 'hidden';
});


homeScreenVideo.addEventListener('click', function(evt) {
    homeScreenVideo.pause();
    homeVideoPlayButton.style.visibility = `visible`;
});





const backgroundStagger = 0.05;
const scroll_speed = 1200;

let sections = [
    'section.main-screen',
    'section.screen.home-second-screen',
    'section.screem.home-third-screen',
    'section.screen4',
    'section.screen5',
    'section.screen6'
];




function gridScreensAnim(screenNum) {
    let tl = new TimelineMax({ duration: 0.5, repeat: 0, paused: true });
    tl.from(`.screen${screenNum}>div`, { stagger: backgroundStagger, scale: 1.1, y: '-10vh' }, '<')
    tl.from(`.screen${screenNum}>div svg,.screen${screenNum}>div>div`, { stagger: 0.05, y: 100, autoAlpha: 0 }, '+0.5')
    return tl;
}
let sectionsAnim = [
    { callback: firstScreenAnim },
    { callback: secondScreenAnim },
    { callback: thirdScreenAnim },
    { callback: gridScreensAnim.bind(null, 4) },
    { callback: gridScreensAnim.bind(null, 5) },
    { callback: gridScreensAnim.bind(null, 6) },
];
$.scrollify({
    section: 'section',
    scrollSpeed: scroll_speed,
    standardScrollElements: '.screen6',
    easing: "easeOutExpo",
    before: function(e, list) {
        sectionsAnim[e].callback().play();
    },
    after: function(e, next) {},
})