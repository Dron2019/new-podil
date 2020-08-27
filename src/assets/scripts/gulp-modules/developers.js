$('.saga-slider-js').slick({
    slidesToShow: 5,
    nextArrow: $('.saga-slider-js')[0].closest('.developers-page-block__slider-wrapp').querySelector('.next'),
    prevArrow: $('.saga-slider-js')[0].closest('.developers-page-block__slider-wrapp').querySelector('.prev'),
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
            }
        },

    ],
});
$('.perfect-slider-js').slick({
    slidesToShow: 5,
    nextArrow: $('.perfect-slider-js')[0].closest('.developers-page-block__slider-wrapp').querySelector('.next'),
    prevArrow: $('.perfect-slider-js')[0].closest('.developers-page-block__slider-wrapp').querySelector('.prev'),
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
            }
        },

    ],
});



console.log($('.saga-slider-js')[0].closest('.developers-page-block__slider-wrapp').querySelector('.next'));