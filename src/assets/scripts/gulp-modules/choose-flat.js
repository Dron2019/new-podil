const cardsContainer = document.querySelector('.flat-container-js');
const ADRESS = './static/flat-ajax.php';
const ACTION_WP = 'flat-ajax.php';
/**TABS */
let tabNavList = document.querySelectorAll('.tab');
let tabContainer = document.querySelector('.documents-page-wrapper  .tabs');


/**Возвращает обьект с ГЕТ параметрами
 */
let GET = (function() {
    let array = window.location.search.replace('?', '').split('&').map(el => el.split('='));
    let obj = {};
    array.forEach(el => obj[el[0]] = el[1]);
    if (obj.rooms === undefined) obj.rooms = '1';
    return obj;
})();



tabNavList.forEach(el => {
        if (el.dataset.rooms === GET.rooms) {
            el.classList.add('active');
            switchTabAndReRender(el);
        }
        el.addEventListener('click', function(evt) {
            switchTabAndReRender(el)
        });
    })
    /**TABS END */

function switchTabAndReRender(el) {
    let dataLink = el.dataset.link;
    tabContainer.querySelector('.active').classList.remove('active');
    el.classList.add('active');
    clearContainer(cardsContainer);
    reRenderFlats(cardsContainer, ADRESS, el.dataset);
}

function reRenderFlats(container, adress, data, callback = () => {}) {
    let action = 'flat-ajax.php';
    let sendData = new FormData();
    sendData.append('action', action);
    Object.entries(data).forEach(el => {
        sendData.append(el[0], el[1]);
    })
    fetch(adress, {
            method: 'POST',
            body: sendData
        })
        .then(res => res.text())
        .then(res => {
            clearContainer(container);
            renderFetchedFlats(container, res);
            callback();

        })
}

function clearContainer(container) {
    container.style.minHeight = getComputedStyle(container).height;
    container.innerHTML = '';
}

function renderFetchedFlats(container, markup) {
    container.innerHTML = markup;
    container.style.minHeight = 'auto';
}