/**Menu hover Effect */
const openMenuSelector = '.js-menu-call',
    closeMenuSelector = '.js-menu-close',
    menu = document.querySelector('nav');

document.querySelectorAll(openMenuSelector).forEach(button => {
    button.addEventListener('click', function(evt) {
        menu.classList.add('opened');
        menu.classList.remove('closed');
        openingMenuAnimation(menu);
    });
});
document.querySelectorAll(closeMenuSelector).forEach(button => {
    button.addEventListener('click', function(evt) {
        closingMenuAnimation();
        setTimeout(() => {
            menu.classList.add('closed');
            menu.classList.remove('opened');
        }, 1000);
    });
});

function openingMenuAnimation(menu) {
    let tl = gsap.timeline({ delay: 0.25, ease: BezierEasing(.17, 1.04, .62, .96), });
    tl.from('.nav-menu__group', { skewX: 10, y: -100, opacity: 0, }, '<')
    tl.from('.nav-menu__group li, .nav-menu__group-title', { delay: 0.1, opacity: 0, y: -150, }, '<')
        .from(menu.querySelector('.menu__pattern-wheel'), { y: -500, rotate: 720, }, '<')
        .from(menu.querySelector('.menu__pattern-bicycle'), { duration: 2, x: '50vw', }, '<');
};

function closingMenuAnimation() {
    let tl = gsap.timeline({ delay: 0.25, ease: BezierEasing(.17, 1.04, .62, .96), });
    tl.reverse();
    tl.from('.nav-menu__group', { skewX: 10, y: -100, opacity: 0, }, '<')
    tl.from('.nav-menu__group li, .nav-menu__group-title', { delay: 0.1, opacity: 0, y: -150, }, '<')
        .from(menu.querySelector('.menu__pattern-wheel'), { y: -500, rotate: 720, }, '<')
        .from(menu.querySelector('.menu__pattern-bicycle'), { duration: 2, x: '50vw', }, '<');

}

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