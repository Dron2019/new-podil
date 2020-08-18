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
        menu.classList.remove('closed');
        menuAnimation(menu, false).play();
    });
});
document.querySelectorAll(closeMenuSelector).forEach(button => {
    button.addEventListener('click', function(evt) {
        // menuAnimation(menu, true).play();
        setTimeout(() => {

            menu.classList.add('closed');
            menu.classList.remove('opened');
        }, 300);

    });
});

function menuAnimation(menu, reversedStatus) {
    let tl = new TimelineMax({ delay: 0.25, ease: BezierEasing(.17, 1.04, .62, .96), paused: true, reverse: reversedStatus });
    tl.from('.nav-menu__group', { skewX: 10, y: -100, autoAlpha: 0, }, '<')
    tl.from('.nav-menu__group li, .nav-menu__group-title', { delay: 0.1, autoAlpha: 0, y: -150, }, '<')
        .from(menu.querySelector('.menu__pattern-wheel'), { y: -500, rotate: 720, }, '<')
        .from(menu.querySelector('.menu__pattern-bicycle'), { duration: 2, x: '50vw', }, '<');
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