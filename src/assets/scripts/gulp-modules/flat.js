$('.flat-img').on('click', (evt) => {
    console.log(this);
    $('.flat-img').magnificPopup({
        type: 'image',
        items: {
            src: evt.target.src
        },
    });
})