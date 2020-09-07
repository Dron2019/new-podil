$('.gallery-slider-js').slick({
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    slide: '.slide',
    asNavFor: '.gallery-nav-js',
    easing: 'ease-out',
    speed: 1500,
    nextArrow: '.gallery-arrows-in-circle-js .next',
    prevArrow: '.gallery-arrows-in-circle-js .prev',
    // nextArrow: '.gallery-nav-js .next',
    // prevArrow: '.gallery-nav-js .prev',
    // asNavFor: '.gallery-nav-js',


})
$('.gallery-nav-js').slick({
    slide: 'svg',
    arrows: true,
    asNavFor: '.gallery-slider-js',
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: '.gallery-nav-js .next,.gallery-arrows-in-circle-js .next',
    prevArrow: '.gallery-nav-js .prev,.gallery-arrows-in-circle-js .prev',
    centerMode: true,
    focusOnSelect: true,
    responsive: [{
            breakpoint: 967,
            settings: {
                slidesToShow: 3.3,
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 3.4,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
            }
        },

    ],

    // variableWidth: true,

})