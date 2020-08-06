/* beautify preserve:start */
@@include('../libs/slick/slick.min.js')
/* beautify preserve:end */

$('.slider').on('init', (e, t) => {
    // console.log(e, t);
    $('.slider-counter .all').html(t.slideCount);
    // console.log(t.listHeight);

    // document.querySelector('.slider').style.minHeight = getComputedStyle(document.querySelector('.build-progress-wrapper')).height;
    document.querySelector('.slider').style.minHeight = '150px';

})
$('.slider').on('afterChange', (e, t, f) => {
    // console.log(e);
    // console.log(t);
    // console.log(f);
    $('.slider-counter .current').html(f + 1);
});

$('.slider').on('reInit', (init, init1) => {
    $('.slider-counter .all').html(init1.slideCount);
    if (init1.slideCount === 0) {
        changePseudoProperties('.slider', 'transform:scaleY(1) !important;', 'after');
        document.querySelector(`.slider-counter`).style.opacity = '0';
    } else {
        changePseudoProperties('.slider', 'transform:scaleY(0) !important;', 'after');
        document.querySelector(`.slider-counter`).style.opacity = '1';

    }
    //console.log(init1.slideCount);
});
var buildSlider = $('.docs-slider').slick({
    prevArrow: '.arrow-prev',
    slide: '.doc',
    nextArrow: '.arrow-next',
    slidesToShow: 4,
    responsive: [{
            breakpoint: 1100,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
            }
        },
    ]
});