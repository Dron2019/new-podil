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
    scrollTop > +getComputedStyle(header).height.replace(/px/, '') ?
        header.classList.remove('main-screen-position') :
        header.classList.add('main-screen-position');
}
checkHeader = throttle(checkHeader, 100);
window.addEventListener('scroll', function(evt) {
    checkHeader();
});





const FPS = 60;
const $body = $('body');
const $window = $(window);

let scroll = () => {
    let currentS = 0;
    let lastS = 0;
    let lastTime = 0;
    let liheight = 450;
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();

    let top = (windowHeight - liheight) / 2;
    let factor = windowHeight / liheight;
    let maxScroll = ($('.main-scroller1').height() - windowHeight) / factor;

    let isScrolling = false;
    // debugger
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        $body.css('position', 'fixed');


        let smoothScroll = function(event) {
            event.preventDefault();
            if (!isScrolling) isScrolling = true;
            let norm = normalizeWheel(event);
            currentS += norm.spinY * 50;
            if (currentS < 0) currentS = 0;
            if (currentS > maxScroll) currentS = maxScroll;
            // const ease_1 = BezierEasing(1, 1, 1, 1);
            const ease_1 = BezierEasing(.17, 1.04, .62, .96);
            TweenLite.to('.main-scroller1', 1.5, {
                ease: ease_1,
                y: -currentS * factor,
                overwrite: 3, // preexisting
                onComplete: function(e) {
                    // if (-currentS * factor < -400) gsap.to(document.querySelector(triggerSelectors[0]), { y: '0%', duration: 1.3, opacity: 1 })
                    // console.log(-currentS * factor);
                    isScrolling = false;
                },
                onUpdate: (ebb) => {
                    // let translateTop = getComputedStyle(document.querySelector('.main-scroller1')).transform.replace(/matrix\(|\)/g, '');
                    // translateTop = translateTop.split(',');
                    // console.log(-currentS * factor);
                    // animateOnCustomScrollByGsap(objectToAnim, +translateTop[5] - this.documentElement.clientHeight * 1.1)
                },
            });
        };
        smoothScroll = throttle(smoothScroll, 1000 / FPS);
        document.addEventListener('wheel', smoothScroll);
    }
};
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    // scroll();
}

const $sections = document.querySelectorAll('section');