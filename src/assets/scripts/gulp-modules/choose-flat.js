let popupRows = [{
        name: 'flats',
        selectorWithInfo: '#floor a',
        destinationShowSelector: '.flats-js',
    },
    {
        name: 'square',
        selectorWithInfo: '#floor a',
        destinationShowSelector: '.tot-square-js',
    },
    {
        name: 'livsquare',
        selectorWithInfo: '#floor a',
        destinationShowSelector: '.live-square-js',
    },
    {
        name: 'floor',
        selectorWithInfo: '#floor a',
        destinationShowSelector: '.floor-js',
    },
];
const popup = document.querySelector('.choose-flat-popup-js');

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
        rowInfo.addEventListener('mouseout', (evt) => {
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
    popup.style.transform = `translate(${cords.clientX - (selfWidth / 2)}px, ${cords.clientY - selfHeight - 10}px)`

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


/**floor switche config */
const switcher = document.querySelector('.floor-switcher-js'),
    switcherPopup = switcher.querySelector('.floor-switcher__popup'),
    switcherArrows = switcher.querySelectorAll('.next, .prev');

switcherArrows.forEach(arrow => {
    arrow.addEventListener('mouseenter', function(evt) {
        console.log(arrow);
        switcherPopup.style.cssText = `
        visibility:visible;
        opacity:1;
        transform:${popupTransformValues[arrow.classList.value]}
    `;
    });

});
switcherPopup.addEventListener('mouseleave', function(evt) {
    evt.stopPropagation();

    switcherPopup.style.cssText = `
        visibility:hidden;
        opacity:0;
    `;
});

let popupTransformValues = {
    next: 'translateX(15%)',
    prev: 'translateX(-46%)',
}

/**floor switche config end */