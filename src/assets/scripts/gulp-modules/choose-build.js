const WINDOW_WIDTH = window.screen.width;
const popupRows = [{
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
var birdyLink = `
<svg class="tablet-birdy" style="
position:fixed;
transition:transform 0.7s;
top:0;
left:0;
width:30px; height:30px;
padding:5px 3px;
background-color:#FFDA05;
border-radius:50%;
pointer-events:none;
" width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.8535 7.6465L16.3535 0.146496C16.1582 -0.048832 15.8418 -0.048832 15.6465 0.146496C15.4512 0.341824 15.4512 0.658231 15.6465 0.853512L22.293 7.50001H0.500015C0.22364 7.50001 0 7.72365 0 8.00003C0 8.27641 0.22364 8.50005 0.500015 8.50005H22.293L15.6465 15.1465C15.4512 15.3418 15.4512 15.6582 15.6465 15.8535C15.7441 15.9512 15.8721 16 16 16C16.1279 16 16.2559 15.9512 16.3536 15.8535L23.8535 8.35351C24.0488 8.15823 24.0488 7.84183 23.8535 7.6465Z" fill="#40484E"/>
</svg>`;



popupRows.forEach(row => {
    document.querySelectorAll(row.selectorWithInfo).forEach(rowInfo => {
        if (WINDOW_WIDTH > 769) {
            rowInfo.addEventListener('mouseover', (evt) => {
                popup.querySelector(row.destinationShowSelector).innerHTML = rowInfo.dataset[row.name];
                positioningPopup(popup, evt, true);
            });
            rowInfo.closest('g').addEventListener('mouseleave', (evt) => {
                positioningPopup(popup, evt, false);
            });
        }
        if (WINDOW_WIDTH < 769) {
            window.lastClickedLink = undefined;
            if (!document.querySelector('.tablet-birdy')) {
                document.body.insertAdjacentHTML('beforeend', birdyLink);
            }
            rowInfo.closest('a').addEventListener('click', (evt) => {
                if (!rowInfo.closest('a').firstClicked) {
                    evt.preventDefault();
                }
                popup.querySelector(row.destinationShowSelector).innerHTML = rowInfo.dataset[row.name];
                positioningPopup(popup, evt, true);
                setTimeout(() => {
                    mobileLinkLogic({
                        itemToAlign: popup,
                        link: rowInfo.closest('a')
                    }, true);
                }, 1000);
                window.lastClickedLink = rowInfo.closest('a');
                rowInfo.closest('a').firstClicked = true;
            });
            rowInfo.closest('a').addEventListener('blur', (evt) => {
                positioningPopup(popup, evt, false);
                mobileLinkLogic({
                    itemToAlign: popup,
                    link: rowInfo.closest('a')
                });
                /**Записывает первый клик  */
                rowInfo.closest('a').firstClicked = false;
            });

        }


    })
});





function mobileLinkLogic(link, paint = false) {
    let lnk = document.querySelector('.tablet-birdy');
    lnkPos = link.itemToAlign.getBoundingClientRect();
    if (paint) {
        link.link.querySelector('path').style.fill = '#83529B';
        lnk.style.transform = `translate(${lnkPos.left + (lnkPos.width/2) - lnk.getBoundingClientRect().width / 2}px,${lnkPos.top + lnkPos.height}px)`
            // console.log(link.getBoundingClientRect());
        lnk.style.opacity = `1`;

        return;
    } else {

        link.link.querySelector('path').style.fill = '';
        lnk.style.opacity = `0`;
    }
}

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