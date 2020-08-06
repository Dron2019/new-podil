/**TABS */
let tabNavList = document.querySelectorAll('.forms .tab-head-item');
let tabContainer = document.querySelector('.tabs');
tabNavList.forEach(el => {
        el.addEventListener('click', function(evt) {
            let dataLink = el.dataset.link;
            tabContainer.querySelector('.tab-head-item.active').classList.remove('active');
            el.classList.add('active');
            tabContainer.querySelector(`.tab-body  .active`).classList.remove('active');
            tabContainer.querySelector(`${dataLink}`).classList.add('active');
        });
    })
    /**TABS END */