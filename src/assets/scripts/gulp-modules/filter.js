/* beautify preserve:start */
@@include('../libs/ion.rangeSlider/js/ion.rangeSlider.min.js')
@@include('filter-libs/filter-libs.js')
/* beautify preserve:end */

let checkboxesList = document.querySelectorAll('.filter-checkbox');

checkboxesList.forEach(checkbox => {
    checkbox.addEventListener('click', function(evt) {
        checkbox.classList.toggle('active');
    });
});





function emptyCheck(el) {
    //console.log(el);
    if (el === undefined) return false;
    if (el === null) return false;
    return true;
}

let filterSelect = document.querySelectorAll('.filter-select');
filterSelect.forEach(select => {
    select.querySelectorAll('li').forEach(link => {
        link.addEventListener('click', () => {

            if (emptyCheck(select.querySelector('.active'))) {
                select.querySelector('.active').classList.remove('active');
            }
            link.classList.add('active');

        })
    })
})
const $body = $('body');
/**********************************/
/*
 * edit table start
 */
let dbFlat = [{
        total_square: 12,
        life_square: 14,
        room: 16,
        // section: 1,
        floor: 49,
    },
    {
        total_square: 13,
        life_square: 514,
        room: 186,
        // section: 2,
        floor: 35,
    },
    {
        total_square: 26,
        life_square: 10,
        room: 3,
        // section: 3,
        floor: 11,
    },
    {
        total_square: 156,
        life_square: 266,
        room: 9,
        // section: 4,
        floor: 14,
    },
    {
        total_square: 765,
        life_square: 754,
        room: 67,
        // section: 2,
        floor: 21,
    },
    {
        total_square: 788,
        life_square: 884,
        room: 17,
        // section: 2,
        floor: 8,
    },
    {
        total_square: 333,
        life_square: 234,
        room: 6,
        // section: 4,
        floor: 3,
    },
]







// DOM elems wich need for filter
const elemsWichMakeFilter = {
    ranges: $('.js-range-init'),
    searchBtn: document.querySelector('.js-button_search'),
    resetBtn: document.querySelector('.js-reset_button'),
    numberFlats: document.querySelector(".js-number_flats"),
    rows: document.querySelectorAll('.js-flat-item'), // все карточки с квартирами
    selects: '.filter-select',
    emptyResultsBlock: document.querySelector('.empty-results-block-js'),
    searchMoreButton: document.querySelector('.search-more-button-js'),
    checkbox: [

        {
            labelKey: 'room',
            DOMElem: $('.js-room'),
            typeData: 'array'
        },
    ],
}

// Записывает все квартиры в отдельный массив
let appartments = [];
elemsWichMakeFilter.rows.forEach(function(row) {
    appartments.push(appartment(row))
});
// show total quantity
elemsWichMakeFilter.numberFlats.innerHTML = appartments.length;


// make DB all flats
function appartment(app) {
    return {
        flat: app,
        life_square: parseFloat(app.dataset.life_square),
        total_square: parseFloat(app.dataset.total_square),
        room: parseFloat(app.dataset.room),
        section: parseFloat(app.dataset.section),
        floor: parseFloat(app.dataset.floor),
        type: parseFloat(app.dataset.type),
        build: parseFloat(app.dataset.build),
        image: app.dataset.image,
        href: app.dataset.href,
        //this.test = parseInt(app.dataset.test); // new param filter

    }
}

// ref for update table latter
let tableStaticFlat = null;
// init table first time we init with all appartments
// then we will delete table and init again with new filtered data
function tableStaticFlatInit(tableDB = appartments) {
    function createCastomCell(item, value) {
        // //console.log(value);

        return $(`<td data-href='${value.href}' data-image='${value.image}'>`).addClass("js-hover-class").append(value[this.name]);
    }
    tableStaticFlat = $(".js-table-flat").jsGrid({
        // height: "500px",
        width: "100%",

        sorting: true,
        paging: true,

        data: tableDB,

        fields: [{
                title: 'Будинок',
                name: "section",
                type: "number",
                width: '20%',
                cellRenderer: createCastomCell
            },
            {
                title: 'Кімнати',
                name: "room",
                type: "number",
                width: '20%',
                cellRenderer: createCastomCell
            },
            {
                title: 'Поверх',
                name: "floor",
                type: "number",
                width: '20%',
                cellRenderer: createCastomCell
            },
            {
                title: 'Загальна площа м<sub>2</sub>',
                name: "total_square",
                type: "number",
                valueField: "Id",
                width: '20%',
                textField: "Name",
                cellRenderer: createCastomCell
            },
            {
                title: 'Житлолва площа м<sub>2</sub>',
                name: "life_square",
                type: "number",
                valueField: "Id",
                width: '20%',
                textField: "Name",
                cellRenderer: createCastomCell
            },

        ]
    });
}
tableStaticFlatInit();

let validDBTable = []

function updateSortTable() {
    tableStaticFlat.jsGrid("destroy");
    tableStaticFlatInit(validDBTable);
}


/*
 * edit table end
 */
/**********************************/





// current state filter
const filter = {
    total_square: {
        min: '',
        max: ''
    },
    life_square: {
        min: '',
        max: ''
    },
    // room: {
    //     min: '',
    //     max: ''
    // },
    floor: {
        min: '',
        max: ''
    },
    build: [],
    types: [],
    room: [], // new param filter
};

let filterFromLocalStorage = {};
/* Запись в локальное хранилище для сохранения настроек ползунков */
function setFilterDataToLocalStorage(filter) {
    localStorage.setItem('filterSearchData', JSON.stringify(filter));
}

function getFilterDataFromLocalStorage() {
    if (localStorage.getItem('filterSearchData') !== null) {
        filterFromLocalStorage = JSON.parse(localStorage.getItem('filterSearchData'));
        /**Добавление значений ползунков  */
        for (const key in filterFromLocalStorage) {
            if (filterFromLocalStorage.hasOwnProperty(key)) {
                const element = filterFromLocalStorage[key];
                const input = document.querySelector(`input#${key}`);
                if (input !== null) {
                    // //console.log(typeof element.min);
                    if (typeof element.min === 'number') input.dataset.from = element.min;
                    if (typeof element.max === 'number') input.dataset.to = element.max;
                }
            }
        }
        /**Добавление значений чекбоксов */
        for (const key in filterFromLocalStorage) {
            let checkBoxNodes = document.querySelectorAll(`input[data-key=${key}`);
            //console.log(filterFromLocalStorage[key]);
            checkBoxNodes.forEach(checkbox => {
                    //console.log(checkbox.value);
                    if (filterFromLocalStorage[key].includes(+checkbox.value)) {
                        checkbox.checked = true;
                        if (checkbox.closest('.filter-checkbox')) checkbox.closest('.filter-checkbox').classList.add('active');

                    }
                })
                //console.log(checkBoxNodes);
        }

    } else {
        filterFromLocalStorage = filter;
    }
}
getFilterDataFromLocalStorage();
// set state filter range
function setFilter(ionRange, range) {
    // //console.log(filter, range);
    filter[range.id].min = Number(ionRange.from);
    filter[range.id].max = Number(ionRange.to);
};
// set state filter checkbox
function setCheckboxFilter(input) {
    const key = $(input).data().key;
    const inx = elemsWichMakeFilter.checkbox.findIndex(el => el.labelKey === key);
    filter[key] = [];
    [...elemsWichMakeFilter.checkbox[inx].DOMElem].forEach(function(checkbox) {
        if (checkbox.checked) {
            filter[key].push(+checkbox.value);
        }
    });
};

document.querySelectorAll(elemsWichMakeFilter.selects).forEach(select => {
    select.querySelectorAll('li').forEach(link => {
        link.addEventListener('click', () => {
            if (emptyCheck(select.querySelector('.active'))) {
                select.querySelector('.active').classList.remove('active');
            }
            link.classList.add('active');
            if (link.dataset.value !== 0) {
                filter[select.dataset.key] = +link.dataset.value;
            } else {
                filter[select.dataset.key] = '';
            }

        })
    })
});
// handler for all chackbox
elemsWichMakeFilter.checkbox.forEach((el) => {
    el.DOMElem.on('change', function() {
        setCheckboxFilter(this);
    });
});

// get default val all checkbox in first load
elemsWichMakeFilter.checkbox.forEach((el) => {
    [...el.DOMElem].forEach((checkBox) => {
        setCheckboxFilter(checkBox);
    });
});




// Обработчик на кнопку поиска
elemsWichMakeFilter.searchBtn.addEventListener('click', filterAndRender);

let filtering = new Event('filter', {});
console.log(filtering);
/* Фильтрует значения */
function filterAndRender() {

    const totalAppartments = appartments.length;
    let i = 0;
    // Проход по массиву и сверка ключей и данных
    validDBTable = [];
    appartments.forEach(function(appartment) {
        appartment.flat.style.display = 'flex';
        for (var key in filter) {

            if (Array.isArray(filter[key]) && filter[key].length > 0) {
                // //console.log(filter[key], appartment);

                if (!filter[key].includes(appartment[key])) {
                    appartment.flat.style.display = 'none';
                    i++;
                    break;
                }
            }
            if (filter[key].min > appartment[key] || filter[key].max < appartment[key]) {
                appartment.flat.style.display = 'none';
                i++;
                break;
            }
            if (typeof filter[key] === 'string' || typeof filter[key] === 'number') {
                if (filter[key] !== appartment[key] && filter[key] !== 0) {
                    appartment.flat.style.display = 'none';
                    i++;
                    break;

                }
            }
        }
        if (appartment.flat.attributes.style.value === 'display: flex;') {
            validDBTable.push(appartment)
        }
    });
    //console.log(validDBTable);

    updateSortTable(validDBTable);
    setFilterDataToLocalStorage(filter);
    elemsWichMakeFilter.numberFlats.innerHTML = totalAppartments - i <= 0 ? 0 : totalAppartments - i;

    filtering.data = {
        cardsCount: totalAppartments - i,
    };
    filtering.filterConstructor = elemsWichMakeFilter;
    document.body.dispatchEvent(filtering);
}


// Обнуление данных методы плагина 
elemsWichMakeFilter.resetBtn.addEventListener('click', function(e) {
    const ch = $('.js-checkbox-project');
    ch.prop('checked', false);
    document.querySelectorAll(elemsWichMakeFilter.selects).forEach(select => {
        select.querySelectorAll('li').forEach(link => {
            if (emptyCheck(select.querySelector('.active'))) {
                select.querySelector('.active').classList.remove('active');
            }
            select.querySelector('li').classList.add('active');
            filter[select.dataset.key] = 0;
        })
    });
    elemsWichMakeFilter.checkbox.forEach((el) => {
        el.DOMElem.prop('checked', false);
        document.querySelectorAll('.filter-checkbox').forEach(chebox => { chebox.classList.remove('active') });
        //console.log(el);

        // el.DOMElem.closest('.filter-checkbox').classList.remove('active');
    })

    elemsWichMakeFilter.ranges.each(function(i, slider) {
        const range = $(slider).data("ionRangeSlider");

        range.update({
            from: range.options.min,
            to: range.options.max
        });

        setValue(range.input, range.options, ['from', 'to']);
    });

    appartments.forEach(function(appartment) {
        appartment.flat.style.display = 'flex';
        validDBTable = [];
        validDBTable.push(appartment);
    });
    elemsWichMakeFilter.numberFlats.innerHTML = appartments.length;
    document.body.dispatchEvent(filtering);
});

// handlers for manualy setting input val

function minMax(min, max, val) {
    return Math.max(min, Math.min(val, max));
}

function setMinMax(inputInit, val, input) {
    const inputData = inputInit.data("ionRangeSlider");
    const { max, min, from, to } = inputData.options;

    if (input.hasClass('js-current-min')) {
        const from = minMax(min, to, val);
        input.val(from)
        inputData.update({ from });
    }
    if (input.hasClass('js-current-max')) {
        const to = minMax(from, max, val);
        input.val(to)
        inputData.update({ to });
    }
}

// установка и обработка значений ввидённых с клавиатуру в поля инпутов минимальных и максимальных значений
const body = $('body');

function addHandlerMinMaxInput(event) {
    const inputInit = $(event.target).closest('.js-range-item').find('.js-range-init')[0];
    const val = event.target.value;
    setMinMax($(inputInit), val, $(event.target));
}

body.on('blur', '.js-current-min', addHandlerMinMaxInput);
body.on('blur', '.js-current-max', addHandlerMinMaxInput);


function setValue(el, val, setVal) {
    $('.js_' + el.id + '_min').val(val[setVal[0]]);
    $('.js_' + el.id + '_max').val(val[setVal[1]]);
}

// init range

function initBoxRange({ range, onChange, onFinish }) {
    const { max, min, from, to } = range.dataset
    $(range).ionRangeSlider({
        type: "double",
        values_separator: '-',
        min,
        max,
        from,
        to,
        hide_min_max: true,
        onChange: function(ionRange) {
            onChange();
            setValue(range, ionRange, ['from', 'to']);
            //console.log(filter);
        },

        onFinish: function(ionRange) {
            onFinish(ionRange);
        }
    });
    // after init set filter state
    const dataRange = $(range).data("ionRangeSlider");
    setFilter(dataRange.options, dataRange.input);
};



function initFilter() {
    elemsWichMakeFilter.ranges.each((i, el) => {
        initBoxRange({
            range: el,
            onChange: () => {},
            onStart: (ionRange) => {
                //console.log('Мы стартовали', ionRange);
                //console.log(getFilterDataFromLocalStorage());
            },
            onFinish: (ionRange) => {
                setFilter(ionRange, ionRange.input[0]);
            },
        });
    });
}
initFilter();
filterAndRender();
window.filterMoreCardsCounter = 12;
window.filteredCardsArray = [];
document.querySelectorAll('.card-filter[style*=flex]').forEach(el => {
    window.filteredCardsArray.push(el);
});
portionCardOutpup(window.filterMoreCardsCounter, elemsWichMakeFilter.rows);

// document.body.dispatchEvent(filtering);







function handleEmptyResultsBlock(cardsCount) {
    if (cardsCount === 0) {
        document.querySelector('.empty-results-block').style.display = 'flex';
    } else {
        document.querySelector('.empty-results-block').style.display = 'none';
    }
}

document.body.addEventListener('filter', (evt) => {
    window.filterMoreCardsCounter = 12;
    window.filteredCardsArray = [];
    document.querySelectorAll('.card-filter[style*=flex]').forEach(el => {
        window.filteredCardsArray.push(el);
    });
    portionCardOutpup(window.filterMoreCardsCounter, window.filteredCardsArray);
    handleEmptyResultsBlock(evt.data.cardsCount);
});


document.querySelector('.search-more-button-js').addEventListener('click', function(evt) {
    window.filterMoreCardsCounter += 12;
    portionCardOutpup(window.filterMoreCardsCounter, window.filteredCardsArray);
});

function portionCardOutpup(howManyShow, cardsArray) {
    for (i = 0; i < howManyShow; i++) {
        if (cardsArray[i] === undefined) break;
        cardsArray[i].style.display = `flex`;
    };
    for (k = howManyShow; k < cardsArray.length; k++) {
        if (cardsArray[k] === undefined) break;
        cardsArray[k].style.display = `none`;
    }
    let arrayForAnim = [];
    for (z = (howManyShow - 12); z < howManyShow; z++) {
        arrayForAnim.push(cardsArray[z]);
    }
    if (howManyShow >= cardsArray.length) {
        document.querySelector('.search-more-button-js').style.display = 'none';
    } else {
        document.querySelector('.search-more-button-js').style.display = 'flex';
    }
    gsap.fromTo(arrayForAnim, 1, { duration: 1, stagger: 0.05, opacity: 0 }, { opacity: 1 })
}