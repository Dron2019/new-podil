let popupRows = [{
        name: 'section',
        selectorWithInfo: '.genplan path',
        destinationShowSelector: '.section-js',
    },
    {
        name: 'build',
        selectorWithInfo: '.genplan path',
        destinationShowSelector: '.build-js',
    },
];
const popup = document.querySelector('.genplan-popup-js');

popup.style.cssText = `
    position:fixed;
    left:0;
    top:0;
    transition:.3s ease-out;
    opacity:0;
`;

popupRows.forEach(row => {
    document.querySelectorAll(row.selectorWithInfo).forEach(rowInfo => {
        rowInfo.addEventListener('mouseover', (evt) => {
            popup.querySelector(row.destinationShowSelector).innerHTML = rowInfo.dataset[row.name];
            positioningPopup(popup, evt, true);
        });
        rowInfo.closest('g').addEventListener('mouseleave', (evt) => {
            positioningPopup(popup, evt, false);
        });
    })
});


function positioningPopup(popup, cords, vieved) {


    if (vieved) {
        popup.style.opacity = `1`;
        popup.style.visibility = `visible`;
    } else {
        popup.style.opacity = `0`;
        popup.style.visibility = `hidden`;
    }
    let selfHeight = popup.getBoundingClientRect().height;
    let selfWidth = popup.getBoundingClientRect().width;
    // popup.style.transform = `translate(${cords.clientX - (selfWidth / 2)}px, ${cords.clientY - selfHeight - 10}px)`
    popup.style.transform = `translate(${cords.target.getBoundingClientRect().left + (cords.target.getBoundingClientRect().width / 2) - (selfWidth / 2)}px, ${cords.target.getBoundingClientRect().top - selfHeight - 10}px)`

};

var positioningPopup = throttle(positioningPopup, 500);

function throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}