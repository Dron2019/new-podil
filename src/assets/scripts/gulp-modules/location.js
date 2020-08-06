gsap.fromTo('.location-first-section', { opacity: 0 }, {
    opacity: 1,
    duration: 1
});
// gsap.from('.location-first-section', { backgroundPosition: '100vw', delay: 1, duration: 1.2 });
gsap.from('.location-first-section>div', { y: '100%', opacity: 0, stagger: 0.5, delay: 0.2 });
var options = {
    threshold: 0.2,
    root: null,
}
var callback = function(entries, observer) {
    console.log(entries[0]);
    if (entries[0].isIntersecting) {
        gsap.from(`.${entries[0].target.classList[0]} div`, { y: '100%', opacity: 0 });
        observer.unobserve(entries[0].target);
    }
};
var observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.location-last-section'));



let start = function() {
    incrementor = 0;
    return function(incrementor) {

        setTimeout(() => {
            console.log('reg');
            window.requestAnimationFrame(start);



        }, 1000 / 25);
    }



};


start();