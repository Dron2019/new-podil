/* beautify preserve:start */
@@include('../libs/gsap/gsap.js')
/* beautify preserve:end */

/**Menu hover Effect */
const openMenuSelector = '.js-menu-call',
    closeMenuSelector = '.js-menu-close',
    menu = document.querySelector('nav');

document.querySelectorAll(openMenuSelector).forEach(button => {
    button.addEventListener('click', function(evt) {
        menu.classList.add('opened');
        document.body.classList.add('menu-opened');
        menu.classList.remove('closed');
        menuAnimation(menu, false).play();
    });
});
document.querySelectorAll(closeMenuSelector).forEach(button => {
    button.addEventListener('click', function(evt) {
        document.body.classList.remove('menu-opened');
        menuCloseAnimation(menu, true).play().add(function() {
            menu.classList.add('closed');
            menu.classList.remove('opened');
        });
        // setTimeout(() => {

        //     menu.classList.add('closed');
        //     menu.classList.remove('opened');
        // }, 300);

    });
});

function menuAnimation(menu, reversedStatus) {
    let tl = new TimelineMax({ delay: 0.25, ease: BezierEasing(.17, 1.04, .62, .96), paused: true });
    tl.fromTo('.nav-menu__group', { skewX: 10, y: -100, autoAlpha: 0, }, { skewX: 0, y: 0, autoAlpha: 1, }, '<')
    tl.fromTo('.nav-menu__group li, .nav-menu__group-title', { delay: 0.1, autoAlpha: 0, y: -150, }, { delay: 0.1, autoAlpha: 1, y: 0, }, '<')
        .fromTo(menu.querySelector('.menu__pattern-wheel'), { y: -500, rotate: 720, }, { y: 0, rotate: 0, }, '<')
        .fromTo(menu.querySelector('.menu__pattern-bicycle'), { duration: 2, x: '50vw', }, { duration: 2, x: 0, }, '<');

    return tl;
};

function menuCloseAnimation(menu) {
    let tl = new TimelineMax({ delay: 0.25, ease: BezierEasing(.17, 1.04, .62, .96), paused: true });
    tl.to('.nav-menu__group', { skewX: 10, y: -100, autoAlpha: 0, }, '<')
    tl.to('.nav-menu__group li, .nav-menu__group-title', { delay: 0.1, autoAlpha: 0, y: -150, }, '<')
        .to(menu.querySelector('.menu__pattern-wheel'), { y: -500, rotate: 720, }, '<')
        .to(menu.querySelector('.menu__pattern-bicycle'), { duration: 2, x: '50vw', }, '<');
    tl.timeScale(5);
    return tl;
};


/**popup form */
const formCallSelector = '.form-call-js';
let form = $('.form-js');
form[0].querySelector('.form-popup-close-js').addEventListener('click', function(evt) {
    $.magnificPopup.close();
});
$(formCallSelector).magnificPopup({
        items: {
            type: 'inline',
            src: form,
        },
        callbacks: {
            open: function(evt) {
                gsap.from(form, { ease: BezierEasing(.17, 1.04, .62, .96), y: -500 })
            },


        }
    })
    /**popup form END */