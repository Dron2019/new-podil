const menuOpenSelector = '.menu-button-js',
    $menu = document.querySelector('menu'),
    $header = document.querySelector('header'),
    $headerDefaultParent = $header.parentElement,
    menuImageLinks = document.querySelectorAll('.menu__content-image-link');
// console.log($headerDefaultParent);


document.querySelectorAll(menuOpenSelector).forEach(but => {
        but.addEventListener('click', () => {
            if (!but.classList.contains('opened')) {

                $menu.classList.add('opened');
                $menu.prepend($header);
                but.classList.add('opened');
            } else {
                $menu.classList.remove('opened');
                $headerDefaultParent.append($header);
                but.classList.remove('opened');
            }

        });
    })
    // console.log('menu.js');


window.menuMouseMoveStart = 0;
window.menuMouseMoveEnd = 0;
window.clicked = false;
// document.querySelector('.menu-content-image-links').addEventListener('mousedown', function(evt) {
//     evt.preventDefault();
//     evt.stopPropagation();
//     window.menuMouseMoveStart = evt.clientX;
//     // console.log(evt.clientX);
//     window.menuMouseMoveEnd = 0;
//     window.clicked = true;

// });
// document.querySelector('.menu-content-image-links').addEventListener('mouseup', function(evt) {
//     evt.stopPropagation();
//     evt.preventDefault();
//     window.clicked = false;
//     return false;
// });

document.querySelector('.menu-content-image-links').addEventListener('mousemove', function(evt) {
    if (!window.clicked) return;
    window.menuMouseMoveEnd = evt.clientX;
    let a = document.querySelector('.menu-content-image-links').scrollLeft - (window.menuMouseMoveEnd - window.menuMouseMoveStart);
    document.querySelector('.menu-content-image-links').scroll(a * 0.5, 0)
});
document.querySelector('.menu-content-image-links').addEventListener('mouseleave', function(evt) {
    window.clicked = false;
});

menuImageLinks.forEach(link => {
    link.addEventListener('click', function(evt) {
        if (window.menuMouseMoveEnd !== 0) evt.preventDefault();
    });
})



/**HORIZONTAL SCROLL MENU */
let horScroll = () => {
    let currentS = 0;
    let lastS = 0;
    let lastTime = 0;
    let liheight = 450;
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();
    let top2 = (windowHeight - liheight) / 2;
    let factor = windowHeight / liheight;
    // let maxScroll = ($('.menu__scroll').width() - windowHeight) / factor;
    let maxScroll = ($('.menu__scroll').width() - windowWidth) / factor;

    let isScrolling = false;

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelector('.menu__scroll').addEventListener('wheel', function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (!isScrolling) isScrolling = true;
            let norm = normalizeWheel(event);
            currentS += norm.spinY * 50;
            if (currentS < 0) currentS = 0;
            if (currentS > maxScroll) currentS = maxScroll;
            const ease_1 = BezierEasing(.17, 1.04, .62, .96);
            TweenLite.to('.menu__scroll', 1, {
                ease: ease_1,
                x: -currentS * factor,
                overwrite: 5, // preexisting
                onComplete: function() {
                    isScrolling = false;
                }
            });
        });
    }
};
horScroll();

let vertScroll = () => {
    let currentS = 0;
    let lastS = 0;
    let lastTime = 0;
    let liheight = 450;
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();
    let top2 = (windowHeight - liheight) / 2;
    let factor = windowHeight / liheight;
    // let maxScroll = ($('.menu__scroll').width() - windowHeight) / factor;
    let maxScroll = ($('body').height() - windowHeight) / factor;

    let isScrolling = false;

    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        document.body.addEventListener('wheel', function(event) {
            event.preventDefault();
            event.stopPropagation();
            if (!isScrolling) isScrolling = true;
            let norm = normalizeWheel(event);
            currentS += norm.spinY * 50;
            if (currentS < 0) currentS = 0;
            if (currentS > maxScroll) currentS = maxScroll;
            const ease_1 = BezierEasing(.17, 1.04, .62, .96);
            TweenLite.to('body', 1, {
                ease: ease_1,
                // y: -currentS * factor,
                overwrite: 5, // preexisting
                onComplete: function() {
                    isScrolling = false;
                }
            });
        });
    }
};
// vertScroll();
/**HORIZONTAL SCROLL MENU END */

// document.querySelector('.menu-content-image-links').addEventListener('wheel', function(evt) {
// document.querySelector('.menu__scroll').addEventListener('wheel', function(evt) {
//     evt.preventDefault();
//     let currentScrollCord = document.querySelector('.menu__scroll').scrollLeft,
//         deltaY = evt.deltaY;
//     document.querySelector('.menu__scroll').scroll((currentScrollCord + deltaY), 0)
// });