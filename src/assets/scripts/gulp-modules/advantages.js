document.querySelectorAll('.sngl-adv').forEach(el => {
    el.style.opacity = 0;
})

var options = {
    threshold: 0.5,
    root: null,
    selectorToObserve: '.adv-grid',
    selectorToAnim: '.sngl-adv',
}
var callback = function(entries, observer) {
    if (entries[0].isIntersecting) {
        gsap.fromTo(entries[0].target.querySelectorAll(options.selectorToAnim), {
            opacity: 0,
            x: function(index, target) {
                if (target.classList.value.match(/vertical/)) {
                    return 0;
                } else {
                    return getComputedStyle(target).width;
                }
            },
            y: function(index, target) {
                if (target.classList.value.match(/vertical/)) {
                    return getComputedStyle(target).height;
                } else {
                    return '0';
                }
            }
        }, {
            opacity: 1,
            x: 0,
            y: function(index, target, targets) { //function-based value
                return 0;
            },
            duration: 0.5,

            stagger: 0.45,
        });
        observer.unobserve(entries[0].target);
    }
};
var observer = new IntersectionObserver(callback, options);
document.querySelectorAll(options.selectorToObserve).forEach(el => {
    observer.observe(el);
})