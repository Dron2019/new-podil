$('.build-js').on('init', function(slick, slick2) {
    // console.log(slick2);
    slick2.$slideTrack[0].style.position = `relative`;
    slick2.$slideTrack[0].style.left = `${slick2.slideWidth*0.5}px`;

    if (window.screen.width < 769) {
        slick2.$slideTrack[0].style.left = `1px`;
    }
    slick2.$slideTrack[0].style.transition = `.7s`;
});
$('.build-js').slick({
    slide: '.slide',
    slidesToShow: 2,
    prevArrow: '.prev.arrow',
    nextArrow: '.next.arrow',
    // centerMode: false,
    infinite: false,
    responsive: [{
        breakpoint: 769,
        settings: {
            slidesToShow: 1,
        }
    }, ],
});
$('.build-js').on('beforeChange', function(slick, slick1, slick2, slick3) {
    // console.log(slick);
    // console.log(slick1);
    // console.log(slick2);
    // console.log(slick3);
    // console.log(document.querySelector('.slick-active').dataset.slickIndex);
});

function ajaxSend(url, data, callback) {
    // fetch
};

$('.construction__popup').html('').append(



);
$('.slide').on('click', async function() {
    //     let current = this.dataset.num - 1;
    //     let response = await `
    //     <a data-num="1" href = "./assets/images/build-progress/test1.jpg"></a>
    //     <a data-num="2" href = "./assets/images/build-progress/test1.jpg"></a>
    //     <a data-num="3" href = "./assets/images/build-progress/test1.jpg"></a>
    //     <a data-num="4" href = "./assets/images/build-progress/test1.jpg"></a>
    //     <a data-num="5" href = "./assets/images/build-progress/test1.jpg"></a>
    //     <a data-num="6" href = "./assets/images/build-progress/test1.jpg"></a>
    //     <a data-num="7" href = "./assets/images/build-progress/test1.jpg"></a>
    //     <a data-num="8" href = "./assets/images/build-progress/test1.jpg"></a>
    //    `;
    //     $('.build-progress-popup').html('').append(response);
    //     $('.build-progress-popup a').magnificPopup({
    //         type: 'image',
    //         gallery: {
    //             enabled: true
    //         },
    //     }).magnificPopup('open', current);

    let current = this.dataset.num - 1;
    $.ajax({
        url: '/wp-admin/admin-ajax.php',
        method: 'POST',
        data: { action: 'construction', id: $(this).data('id') },
        success: function(response) {
            $('.build-progress-popup').html('').append(response);
            $('.build-progress-popup a').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
            }).magnificPopup('open', current);
        }
    })
});



/**Всплывайка прогресс бара */
const progressPopup = document.querySelector('.progress-status-js'),
    progressBarBlock = document.querySelectorAll('.progress-bar');

progressBarBlock.forEach(bar => {
    bar.addEventListener('mousemove', function(evt) {
        progressPopup.classList.remove('hidden');
        // console.log(evt.clientX);
        let bounRect = progressPopup.getBoundingClientRect();
        progressPopup.style.left = evt.clientX - bounRect.width * 0.5 + 'px';
        if (window.screen.width < 576) progressPopup.style.left = bar.getBoundingClientRect().left + 'px';
        progressPopup.style.top = evt.clientY - bounRect.height * 1.2 + 'px';
    });
    bar.addEventListener('mouseout', function(evt) {

        progressPopup.classList.add('hidden');
    });
})


/**Всплывайка прогресс бара END */