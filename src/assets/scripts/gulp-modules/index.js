/**Menu hover Effect */
let menuButton = document.querySelector('.menu-button');
menuButton.querySelectorAll('rect').forEach(rect => {
    rect.dataset.startHeight = rect.getAttribute('width');
})
menuButton.addEventListener('mouseover', (evt) => {
    menuButton.querySelectorAll('rect').forEach(rect => {
        rect.setAttribute('width', '36');
    })
});
menuButton.addEventListener('mouseout', function(evt) {
    menuButton.querySelectorAll('rect').forEach(rect => {
        rect.setAttribute('width', rect.dataset.startHeight);
    })
});
/**Menu hover Effect  END*/



function moveToElement(selector) {
    document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
}