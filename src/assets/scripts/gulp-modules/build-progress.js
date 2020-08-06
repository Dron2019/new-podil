const now = new Date().getMonth();
console.log(now);
let monthes = document.querySelectorAll('.monthes li'),
    years = document.querySelectorAll('.years li ');
let currentMonthSpan = document.querySelector('.current-month');
let currentFilterData = {
    month: now,
    year: new Date().getFullYear(),
};
let aviableMonthes = new Set();
let aviableYears = new Set();

each(document.querySelectorAll('.slider img'), (img) => {
    aviableMonthes.add(+img.dataset.month);
    aviableYears.add(+img.dataset.year);
});
// for (let i = 0; i <= now; i++) {
//     monthes[i].classList.add('active');
//     if (i === now) {
//         monthes[i].classList.add('current');
//         currentMonthSpan.innerHTML = monthes[i].innerHTML + ' ' + new Date().getFullYear();
//     }
// }

each(monthes, (month) => {
    if (!aviableMonthes.has(+month.dataset.value)) {
        month.classList.remove('active');
    } else {
        month.classList.add('active');
    }
})
each(years, (year) => {
    if (!aviableYears.has(+year.dataset.value)) {
        year.remove();
    }
})

each(years, (el) => {
    if (+el.innerHTML === new Date().getFullYear()) el.classList.add('current');
    el.classList.add('active');
    el.addEventListener('click', function(evt) {
        each(years, el => el.classList.remove('current'));
        el.classList.add('current');
        changeFilterDate();

    });
})


monthes.forEach(month => {
    month.addEventListener('click', function(evt) {
        each(monthes, (el) => { el.classList.remove('current') });
        month.classList.add('current');
        changeFilterDate()
            // currentMonthSpan.innerHTML = month.innerHTML + ' ' + new Date().getUTCFullYear();

    });
})
each(document.querySelectorAll('.select-box'), (el) => {
    el.addEventListener('click', function(evt) {
        console.log(this.dataset.name);
        changeFilterDate(this.dataset.name);
    });

})

function changeFilterDate(name) {
    let month = document.querySelector('.monthes .current');
    let year = document.querySelector('.years .current');

    if (document.documentElement.clientWidth < 576) {
        if (name.match(/year/)) {
            currentFilterData.year = +document.querySelector(`.${name}  input:checked`).value;
        } else if (name.match(/month/)) {
            currentFilterData.month = +document.querySelector(`.${name}  input:checked`).value;
        }
        // currentFilterData.year = document.querySelector('.years input[name^="years"]:checked').value;
    } else {
        currentFilterData.month = +month.dataset.value;
        currentFilterData.year = +year.dataset.value;
        smoothTextChange(currentMonthSpan.innerHTML, month.innerHTML + ' ' + year.innerHTML, currentMonthSpan, true)
    }
    filterSlides($('.slider'), currentFilterData);

}

function filterSlides(slider, data) {
    slider.slick('slickUnfilter');
    if (data.month < 10) data.month = '0' + data.month;
    slider.slick('slickFilter', `[data-month=${data.month}][data-year=${data.year}]`);

    console.log(slider);
}






/* beautify preserve:start */
@@include('../libs/slick/slick.min.js')
/* beautify preserve:end */

$('.slider').on('init', (e, t) => {
    // console.log(e, t);
    $('.slider-counter .all').html(t.slideCount);
    // console.log(t.listHeight);

    // document.querySelector('.slider').style.minHeight = getComputedStyle(document.querySelector('.build-progress-wrapper')).height;
    document.querySelector('.slider').style.minHeight = '150px';

})
$('.slider').on('afterChange', (e, t, f) => {
    // console.log(e);
    // console.log(t);
    // console.log(f);
    $('.slider-counter .current').html(f + 1);
});

$('.slider').on('reInit', (init, init1) => {
    $('.slider-counter .all').html(init1.slideCount);
    if (init1.slideCount === 0) {
        changePseudoProperties('.slider', 'transform:scaleY(1) !important;', 'after');
        document.querySelector(`.slider-counter`).style.opacity = '0';
    } else {
        changePseudoProperties('.slider', 'transform:scaleY(0) !important;', 'after');
        document.querySelector(`.slider-counter`).style.opacity = '1';

    }
    //console.log(init1.slideCount);
});
var buildSlider = $('.slider').slick({
    prevArrow: '.arrow-prev',
    nextArrow: '.arrow-next',
});


/*functions */
function each(array, func) {
    array.forEach(el => {
        func(el);
    })
}

function smoothTextChange(startText, finishText, elem, firstStart) {
    if (firstStart) elem.style.minHeight = getComputedStyle(elem).height;
    if (firstStart) elem.style.minWidth = getComputedStyle(elem).width;
    // finishText = putFinishTextInSpan(finishText);

    function timeoutChange(text, element) {
        if (text.length === 0) {

            element.innerHTML = finishText;
            // fillText(finishText)
            return;
        }
        element.innerHTML = text;
        setTimeout(() => {
            timeoutChange(text.slice(0, text.length - 1), elem);
        }, 50);

        function fillText(toFill) {
            element.innerHTML = toFill;
            if (toFill.length === 0) return;
            setTimeout(() => {
                fillText(toFill.substring(0, toFill.length - 1));
            }, 50);
        }

    }

    function putFinishTextInSpan(finishText1) {
        finishText1 = finishText1.split('').map((el, i) => `<span style="animation-delay:${i/10}s" class="fadeIn">${el}</span>`);
        return finishText1.toString().replace(/,/g, '');
    }
    timeoutChange(startText, elem);
};

function changePseudoProperties(container, cssText, pseudoType) {
    let containerSelector = '';
    if (pseudoType === undefined) {
        console.warn(`Pseudo element is not defined, ${changePseudoProperties.name} is stopping`);
        return;
    }
    if (typeof container === 'string') {
        containerSelector = container;
        container = document.querySelector(container);
    } else {
        containerSelector = `.${container.classList[0]}`;
    }
    if (container.querySelector('style')) container.querySelector('style').remove();
    let style = document.createElement('style');
    style.innerHTML = `
    ${containerSelector}:${pseudoType}{
        ${cssText}
    } `;
    container.append(style);
}