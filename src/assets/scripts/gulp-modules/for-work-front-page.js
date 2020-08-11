/* beautify preserve:start */
@@include('gsap.js')
@@include('displacment-hover/imagesloaded.pkgd.min.js')
@@include('displacment-hover/three.min.js')
@@include('displacment-hover/hover.js')
/* beautify preserve:end */


imagesLoaded(document.querySelectorAll('img'), () => {
    document.body.classList.remove('loading');
});
let frontScreenEffect = undefined;
Array.from(document.querySelectorAll('.front-block')).forEach((el) => {
    const img = document.querySelector('.front-block__bg');
    frontScreenEffect = new hoverEffect({
        parent: el,
        intensity: el.dataset.intensity || undefined,
        speedIn: el.dataset.speedin || undefined,
        speedOut: el.dataset.speedout || undefined,
        easing: el.dataset.easing || undefined,
        hover: el.dataset.hover || undefined,
        image1: img.getAttribute('src'),
        image2: img.getAttribute('src'),
        displacementImage: el.dataset.displacement,
    });
});



frontScreenEffect.next();
const firstScreenAnimation = function() {
    let tl = new TimelineMax({ duration: 2.5, paused: true });

    tl.from('.front-block svg path', { autoAlpha: 0, y: 50 })
        .add(frontScreenEffect);

    return tl;

};



firstScreenAnimation().play();