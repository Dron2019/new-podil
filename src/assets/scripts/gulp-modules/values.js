function getHeight(e, target) {
    return -target.getBoundingClientRect().height;
}
let timeline = gsap.timeline();

timeline.from('.front-block__bg', 2, { ease: "power4.in", scale: 1.2 }).
from('.fron-block__text', 2, { background: 'rgba(23, 152, 213, 0.0)' }, '<')
    .from('.fron-block__text svg path', 1, {
        autoAlpha: 0,
        y: getHeight,
    })
    .from('.fron-block__text div', 1, { autoAlpha: 0 })