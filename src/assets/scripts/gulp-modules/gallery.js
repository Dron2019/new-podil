$('.gallery-slider-js').slick({
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.gallery-nav-js',
    easing: 'ease-out',
    speed: 1500
        // nextArrow: '.gallery-nav-js .next',
        // prevArrow: '.gallery-nav-js .prev',
        // asNavFor: '.gallery-nav-js',


})
$('.gallery-nav-js').slick({
    slide: 'svg',
    arrows: true,
    asNavFor: '.gallery-slider-js',
    slidesToShow: 4.25,
    slidesToScroll: 1,
    nextArrow: '.gallery-nav-js .next',
    prevArrow: '.gallery-nav-js .prev',
    centerMode: true,
    focusOnSelect: true,

    // variableWidth: true,

})