// let elementsAnimFunctions = {
//     'about-text-block': {
//         func: function() { gsap.from(document.querySelector('.about-text-block'), { delay: 1, opacity: 0 }) },
//         defaultValues: {},
//     },
//     'about-separator-block__text': {
//         function() { gsap.from(document.querySelector('.about-separator-block__text'), { delay: 1, opacity: 0.5, y: '100%' }) },
//         defaultValues: {},
//     },
// };

// const ease_1 = BezierEasing(0, .7, 0, 1);
// gsap.defaults({
//     ease: "power2.in",
//     duration: 1,
//     ease: ease_1
// });

// var options = {
//     threshold: 0.1,
//     root: null,
//     selectorToObserve: '.about-text-block',
//     // selectorToAnim: '.about-text-block',
// }
// var callback = function(entries, observer) {
//     console.log(entries);
//     if (entries[0].isIntersecting) {
//         // console.log('sss');
//         // elementsAnimFunctions[entries[0].target.classList[0]]['func']();
//         gsap.from(entries[0].target, { scale: 1.1, opacity: 0.9 })
//         observer.unobserve(entries[0].target);
//     }
// };
// var observer = new IntersectionObserver(callback, options);
// document.querySelectorAll(options.selectorToObserve).forEach(el => {
//     console.log(elementsAnimFunctions[el.classList[0]].defaultValues);
//     gsap.set(el, elementsAnimFunctions[el.classList[0]].defaultValues);
//     observer.observe(el);
// })
// observer.observe(document.querySelector("#about > div.page__content > section:nth-child(3) > div"));

// gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.defaults({
//     markers: { startColor: "red", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20 },
//     onUpdate: self => {
//         console.log(self.progress.toFixed(3));
//         // if (+self.progress.toFixed(3) > 0.2) {
//         let tl = gsap.timeline();
//         tl.to(self.trigger, { y: '0%', duration: 1.3, opacity: 1 })
//             // .to(self.trigger, { y: '0%', suration: 0.2 })
//             .from(self.trigger.querySelector('.about-text-block__main-subtitle'), { y: '50%', duration: 0.5 }, '<.2')
//             .from(self.trigger.querySelector('.about-text-block .text'), { y: '50%', duration: 0.5 }, '<');
//         self.kill();
//         // }
//     },
//     onEnter: self => {
//         // gsap.from(self.trigger, {y:'50%'});


//         // tl.fromTo(title, { x:'50vw', skewX:20, duration:1}, { x:-100, skewX:-20, duration:2})
//         console.log(self.getVelocity);
//         // tl.from(self.trigger, { y: '100%', duration: 1, opacity: 0 })
//         //     .from(self.trigger.querySelector('.about-text-block__main-subtitle'), { y: '100%', duration: 0.4 }, '<.2')
//         //     .from(self.trigger.querySelector('.about-text-block .text'), { y: '100%', duration: 0.5 }, '<.2')
//         // self.kill();
//     }
// });




// const DEFAULT_SPEED;
let objectToAnim = [{
        selector: ".anim-bg1",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        childAnim: () => {},
        anim: function() {
            // const subtitle = `${this.selector} .about-text-block__main-subtitle`;
            // const text = `${this.selector} .text`;
            // gsap.set([subtitle, text], { y: 500, autoAlpha: 0 });

            // let tl = gsap.timeline();
            // tl.to(this.selector, { y: '0%', duration: 1.3, autoAlpha: 1 })
            //     .to(subtitle, 1.5, { y: 0, autoAlpha: 1 }, '<')
            //     .to(text, 1.75, { y: 0, autoAlpha: 1 }, '<')
            // gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });

        }
    },
    {
        selector: ".anim-bg2",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        beforeFunction: function() {
            // const parent = document.querySelector(this.selector).closest('section');
            // gsap.set(parent, { backgroundPositionY: '-150px' });
        },
        childAnim: function() {
            // console.log(document.querySelector(this.selector));
        },
        anim: function() {
            const subtitle = `${this.selector} .about-text-block__main-subtitle`;
            const text = `${this.selector} .text`;
            const parent = document.querySelector(this.selector).closest('section');

            gsap.set([subtitle, text], { y: 500, autoAlpha: 0 });

            let tl = gsap.timeline();
            tl.to(this.selector, { y: '0%', duration: 1, autoAlpha: 1 })
                .to(subtitle, 0.5, { y: 0, autoAlpha: 1 }, '<')
                .to(text, 0.5, { y: 0, autoAlpha: 1 }, '<')
                // gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });

        }
    },
    {
        selector: ".anim-bg3",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        childAnim: () => {},
        anim: function() {
            const subtitle = `${this.selector} .about-text-block__main-subtitle`;
            const text = `${this.selector} .text`;
            gsap.set([subtitle, text], { y: 500, autoAlpha: 0 });

            let tl = gsap.timeline();
            tl.to(this.selector, { y: '0%', duration: 1, autoAlpha: 1 })
                .to(subtitle, 0.5, { y: 0, autoAlpha: 1 }, '<')
                .to(text, 0.5, { y: 0, autoAlpha: 1 }, '<')
                // gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });

        }
    },
    {
        selector: ".anim-bg4",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        childAnim: () => {

        },
        anim: function() {
            const subtitle = `${this.selector} .about-text-block__main-subtitle`;
            const text = `${this.selector} .text`;
            gsap.set([subtitle, text], { y: 500, autoAlpha: 0 });
            let tl = gsap.timeline();
            tl.to(this.selector, { y: '0%', duration: 1, autoAlpha: 1 })
                .to(subtitle, 0.5, { y: 0, autoAlpha: 1 }, '<')
                .to(text, 0.5, { y: 0, autoAlpha: 1 }, '<')
        }
    },
    {
        selector: ".separator-anim1 .about-separator-block__text",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        anim: function() {
            gsap.set(`${this.selector} p`, { opacity: 0, y: 500 });

            let tl = gsap.timeline();
            tl.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 })
                .to(`${this.selector} p`, { y: 0, opacity: 1, duration: 1.5 }, '<');

        }
    },
    {
        selector: ".separator-anim2 .about-separator-block__text",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        anim: function() {
            gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });
        }
    },
    {
        selector: ".separator-anim3 .about-separator-block__text",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        anim: function() {
            gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });

        }
    },

];


/*Вычисление позииций елементиов и предварительная расстановка елементов */
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

    objectToAnim.forEach(el => {
        el.selfHeight = +getComputedStyle(document.querySelector(el.selector)).height.replace(/px/, '');
        el.selfScrollTop = -$(el.selector).offset().top;
        el.selfScrollTop = el.selfScrollTop - el.selfHeight;

        if (typeof el.beforeFunction === 'function') el.beforeFunction();
        gsap.set(el.selector, { y: '500px', opacity: 0 })
            // el.selfScrollTop = el.selfScrollTop + (document.documentElement.clientHeight * 0.5);
    });
}

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

function animateOnCustomScrollByGsap(array, currentScrollValue) {
    console.log('ВЫЗВАЛИ');
    console.log(array);
    array.forEach(el => {
        if (!el.played && currentScrollValue < el.selfScrollTop) {
            // let tl = gsap.timeline();

            if (typeof el.anim === 'function') el.anim();
            // .to(self.trigger, { y: '0%', suration: 0.2 })
            // .from(el.selector.querySelector('.about-text-block__main-subtitle'), { y: '50%', duration: 0.5 }, '<.2')
            // .from(el.selector.querySelector('.about-text-block .text'), { y: '50%', duration: 0.5 }, '<');
            el.played = true;
        }
    })
};
animateOnCustomScrollByGsap = throttle(animateOnCustomScrollByGsap, 120);

let triggerSelectors = [
    // ".about-section-with-bg.first .about-text-block",
    ".about-separator-block__text",
    ".about-text-block.about-text-block-right.scrollme.animateme",
    "#about > div.page__content > section:nth-child(5) > div",
    "#about > div.page__content > section:nth-child(6) > div",
    "#about > div.page__content > section:nth-child(7) > div",
    "#about > div.page__content > section:nth-child(8) > div",
];
let sections = document.querySelectorAll('.about-section-with-bg');
gsap.set('.about-section-with-bg.first .about-text-block', { y: '100%', duration: 1, opacity: 0 })
gsap.to('.about-section-with-bg.first .about-text-block', { y: '0%', duration: 1.3, opacity: 1, delay: 0.5 })
    // triggerSelectors.forEach(selector => {
    //     gsap.set(selector, { y: '100%', duration: 1, opacity: 0 });
    //     let elPosition = $(selector).offset().top - $(selector).height();
    //     console.log(elPosition);
    //     console.log($(selector));
    //     ScrollTrigger.create({
    //         trigger: selector,
    //         start: "top bottom",
    //         end: "bottom bottom",
    //     });
    // });

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
        $body.css('position', 'fixed')
        document.addEventListener('wheel', function(event) {
            event.preventDefault();
            if (!isScrolling) isScrolling = true;
            let norm = normalizeWheel(event);
            currentS += norm.spinY * 50;
            if (currentS < 0) currentS = 0;
            if (currentS > maxScroll) currentS = maxScroll;
            const ease_1 = BezierEasing(.17, 1.04, .62, .96);
            TweenLite.to('.main-scroller1', 1, {
                ease: ease_1,
                y: -currentS * factor,
                overwrite: 5, // preexisting
                onComplete: function(e) {
                    // if (-currentS * factor < -400) gsap.to(document.querySelector(triggerSelectors[0]), { y: '0%', duration: 1.3, opacity: 1 })
                    // console.log(-currentS * factor);
                    isScrolling = false;
                },
                onUpdate: () => {
                    let translateTop = getComputedStyle(document.querySelector('.main-scroller1')).transform.replace(/matrix\(|\)/g, '');
                    translateTop = translateTop.split(',');
                    // animateOnCustomScrollByGsap(objectToAnim, +translateTop[5] - this.documentElement.clientHeight)
                    animateOnCustomScrollByGsap(objectToAnim, +translateTop[5] - this.documentElement.clientHeight * 1.1)
                },
            });
        });
    }
};
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

    scroll();
}