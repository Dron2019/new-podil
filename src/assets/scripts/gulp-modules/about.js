/**Imported GSAP END */ ;;;;;;;;;
let legendButton = document.querySelector('.legend-button-js'),
    legend = document.querySelector('.legend-js'),
    buttonTextEl = legendButton.querySelector('span');
let legendButtonTitles = (function() {
    if (!legendButton.dataset.opened || !legendButton.dataset.close) {
        return [buttonTextEl.innerText, buttonTextEl.innerText];
    }
    return [legendButton.dataset.opened, legendButton.dataset.close];
})();


legendButton.addEventListener('click', function(evt) {
    legend.classList.toggle('closed');
    if (!legend.classList.contains('closed')) animateLegendIcons();
    legend.classList.contains('closed') ?
        buttonTextEl.innerText = legendButtonTitles[0] :
        buttonTextEl.innerText = legendButtonTitles[1];

});

function animateLegendIcons() {
    gsap.from(legend.querySelectorAll('li'), { autoAlpha: 0, y: 15, stagger: 0.01 });
}


let popupIcon = createIcon();
document.body.append(popupIcon);

function createIcon() {
    let iconPopup = document.createElement('div');
    iconPopup.classList.add('legend-icon-popup');
    return iconPopup;

};

function addText(text, el) {
    el.innerText = text;
};

function changeElPosition(el, cords) {
    let selfHeight = +getComputedStyle(el).height.replace(/px/, '');
    el.style.transform = `translateX(-50%)`;
    el.style.opacity = 1;
    // console.log(cords);
    el.style.top = cords.top - (3 + selfHeight) + 'px';
    el.style.left = cords.left + (cords.width / 2) + 'px';
}

function offIcon(el) {
    el.style.opacity = 0;
}

let hearts = document.querySelectorAll('[data-popup-text]');
// console.log(hearts);
hearts.forEach(icon => {
    icon.addEventListener('mouseenter', (evt) => {
        evt.stopPropagation();
        changeElPosition(popupIcon, icon.getBoundingClientRect());
        addText(icon.dataset.popupText, popupIcon)
    });
    icon.addEventListener('mouseout', (evt) => {
        evt.stopPropagation();
        offIcon(popupIcon);
    });
})