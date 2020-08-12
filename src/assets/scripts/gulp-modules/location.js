/* beautify preserve:start */
@@include('gsap.js')
@@include('location-google-map.js')
/* beautify preserve:end */
    /**Imported GSAP END */
;;;;;;;;;
let legendButton = document.querySelector('.legend-button-js'),
    legend = document.querySelector('.legend-js');
legendButton.addEventListener('click', function(evt) {
    legend.classList.toggle('closed');
    if (!legend.classList.contains('closed')) animateLegendIcons();

});





function animateLegendIcons() {
    gsap.from(legend.querySelectorAll('li'), { clearProps: 'all', autoAlpha: 0, y: 15, stagger: 0.01 });
    // gsap.to(legend, { height: '500px' });
}