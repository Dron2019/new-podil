/* beautify preserve:start */
const lang = langDetect();
function langDetect() {
    if (window.location.href.match(/\/ru\//)) {
        return 'ru'
    } else {
        return 'ua';
    }
}
const langObject = {
    langForUrl: {ru: 'ru', ua:'',en:'en'}, /*Для учета языковой версии в строке адресса */
    name: {ru: 'Ваше имя:*', ua:'Ваше ім`я:',en:'Your name:*'},
    telephone: {ru: 'Ваш телефон:*', ua:'Ваш телефон:*',en:'Your telephone:*'},
    callNow: {ru: 'Перезвоните сейчас', ua:'Передзвоніть зараз',en:'Call now'},
    otherTime: {ru: 'Указать удобное время', ua:'Вказати зручний час',en:'Specify a convenient time'},
    message: {ru: 'Сообщение', ua:'Повідомлення',en:'Message'},
    email: {ru: 'E-mail', ua:'E-mail',en:'E-mail'},
    send: {ru: 'Отправить', ua:'Надіслати',en:'Send'},
    orderCall: {ru: 'Интересует проект', ua:'Цікавить проект?',en:'Interested in project?'},
    succesSend: {ru: 'Ваше сообщение отправлено', ua:'Ваше повідомлення відправлено',en:'Your message was sent'},
    formSubLegend: {ru: 'Оставьте заявку, и мы вас обязательно сообщим о старте продаж!', ua:'Залиште заявку, і ми Вас обов`язково повідомимо про старт продажів!',en:'Leave a request and we will inform you about the start of sales!'},
    requireField: {ru: 'обязательно для заполнения', ua:'обов`язкове для заповнення ',en:'is required'},
    totalSquare: {ru: 'Общая площадь м<sup>2</sup>:', ua:'Загальна площа м<sub>2</sub>:',en:'Total square m<sub>2</sub>:'},
    livingSquare: {ru: 'Жилая площадь м<sup>2</sup>:', ua:'Житлова площа м<sub>2</sub>:',en:'Living square m<sub>2</sub>:'},
    buildNo: {ru: 'Дом:', ua:'Будинок:',en:'Build:'},
    floor: {ru: 'Этаж:', ua:'Поверх:',en:'Floor:'},
    other: {ru: 'Другой', ua:'Інше',en:'Інше'},
    moreDetails: {ru: 'Детальнее', ua:'Детальніше',en:'More info'},
    whenToConnect: {ru: 'Когда с вами связатся', ua:'Коли з вами звязатися',en:'More info'},
    agreementText: {ru: 'Я согласен на обработку персональных данных и запись телефонного звонка в соответствии с Законом Украины "О защите персональных данных"', ua:'Я погоджуюся на обробку персональних даних і запис телефонного дзвінка відповідно до Закону України "Про захист персональних даних"',en:'More info'},
    loginOrPassword: {ru: 'Ваш номер или логин:', ua:'Ваш номер або логін:',en:'Ваш номер або логін'},
    howGetConsult:{ru: 'Как удобнее получить консультацию', ua:'Як зручно отримати консультацію:',en:'Як зручно отримати консультацію:'},
}
/* beautify preserve:end */
    /**Класс формы */

class FormCreater {
    constructor(container, config) {
        this.containerSelector = container;
        this.container = document.querySelector(container);
        this.config = config;
        this.fields = config.fields;
        this.url = config.url || 'Empty';
        this.legend = config.legend || null;
        this.subLegend = config.subLegend || null;
        this.this = this;
        this.sendObject = {};

        this.inputs = ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time",
            "url", "week"
        ];
        this.requiredReady = false;
        this.countIndex = 0;
        this.regExp = {
            tel: /([A-Z])\w+/gi,
            telephone: /^[\+]?\d{2,}?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im,
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

        };

        this.color = config.color || '';
    };
    styleSetup() {
        this.container.style.setProperty('--main-bg-color', this.color);
    }
    sendObject1() {}
    sendButtonConfig() {
        this.sendButton = document.createElement('button');
        this.sendButton.setAttribute('type', 'button');
        this.this.sendButton.classList.add(this.config.sendButton.customClass);
        if (this.config.sendButton.innerText == undefined) {
            this.sendButton.innerHTML = 'Default';
        } else {
            this.sendButton.innerHTML = this.config.sendButton.innerText;
        };
        let thisEl = this;
        this.sendButton.addEventListener('click', function(t, s, d) {
            // console.log(thisEl);
            thisEl.inputValidation();
            // thisEl.sendObject1();
            thisEl.sendData(thisEl.sendObject);
        });

    }
    inputConfig() {
        this.fields.forEach((input, index) => {
            let element, inputGroup;
            switch (input.type) {
                case 'checkbox':
                    this.checkboxConfig(input);
                    break;
                case 'radio':
                    this.labelAdd(input);
                    this.radioConfig(input);
                    break;
                case 'range':
                    this.rangeConfig(element, input);
                    break;
                case 'textarea':
                    element = document.createElement(input.type);
                    inputGroup = document.createElement('div');
                    this.labelAdd(input);
                    this.commonInputConfig(input, element);
                    this.container.append(element);
                    break;
                case 'hidden':
                    element = document.createElement('input');
                    inputGroup = document.createElement('div');
                    element.value = input.value;
                    this.labelAdd(element);
                    this.commonInputConfig(input, element);
                    this.container.append(element);
                    break;
                default:
                    element = document.createElement('input');
                    inputGroup = document.createElement('div');
                    this.labelAdd(input);
                    if (input.name === 'telephone' || input.name === 'phone') this.telephoneMask(element);
                    // if (input.name === 'email') 
                    this.commonInputConfig(input, element);
                    this.container.append(element);
                    break;
            }

        });
    }
    checkRequiredFields() {
        let requiredFields = this.container.querySelectorAll('[data-required=true]');
        let validCounter = 0;
        requiredFields.forEach(field => {
            if (this.sendObject[field.name] && this.sendObject[field.name].length > 5) {
                field.parentNode.querySelector('.error-span').innerText = '';
                field.classList.remove('unfilled');
                validCounter++;
                this.requiredReady = true;

            } else {

                /**Вывод сообщения об ошибке */
                field.parentNode.querySelector('.error-span').innerText = `${langObject.requireField[lang]}`;
                field.classList.add('unfilled');

                this.requiredReady = false;
            }
        });
        requiredFields.length == validCounter ? this.requiredReady = true : this.requiredReady = false;


    }
    checkboxConfig(input) {
            let element = document.createElement('input');
            element.type = input.type;
            this.labelAdd(input);
            this.commonInputConfig(input, element);
            element.checked = false;
            element.value = input.value || input.label;
            if (input.selectItems) {
                element.dataset.select = true;
                let select = document.createElement('select');
                select.onclick = () => {
                    select.dataset.value = select.value;
                }
                select.classList.add(`common-select`)
                input.selectItems.forEach(option => {
                    let optionEl = document.createElement('option');
                    optionEl.value = option;
                    optionEl.innerHTML = option;
                    select.append(optionEl);
                });
                this.container.append(select);
            }
            element.addEventListener('click', () => {
                // document.querySelector(`input[name=${element.name}`);
                document.querySelectorAll(`input[name=${element.name}`).forEach(el => {
                    el.checked = false;
                });
                element.checked = true;
            })
            this.container.append(element);
        }
        /**
         * Групировка инпута, подписи и елемента для выведения ошибки
         */
    createInputGroup() {
            let labels = this.container.querySelectorAll('label');
            let inputs = this.container.querySelectorAll('input,textarea');
            let errorSpans = this.container.querySelectorAll('.error-span');
            for (let i = 0; i < this.container.querySelectorAll('input,textarea').length; i++) {
                let element = document.createElement('div');
                if (inputs[i].type == 'checkbox') element = document.createElement('label');
                element.classList.add('input-group');
                element.classList.add(inputs[i].type);

                element.append(errorSpans[i]);
                element.append(labels[i]);
                if (inputs[i].dataset.required == 'true') element.classList.add('required-group');
                if (inputs[i].dataset.select == 'true') {
                    element.append(this.container.querySelector('select'));
                }
                element.append(inputs[i]);
                if (inputs[i].type == 'checkbox') {
                    element.insertAdjacentElement('afterBegin', inputs[i])
                }
                this.container.append(element);
                if (element.querySelector('input') !== null && element.querySelector('input').getAttribute('type') == 'hidden') {
                    element.style.display = `none`;
                }
            }
            // console.log(this.container.querySelectorAll('input,label,span,textarea'));
        }
        /**Добавление типичных аттрибутов */
    commonInputConfig(inputConfig, element) {
        let errorSpan = document.createElement('span');
        this.container.append(errorSpan);
        errorSpan.classList.add(`error-span`);
        errorSpan.classList.add(`${inputConfig.type}-error`);
        element.setAttribute('type', inputConfig.type);
        element.setAttribute('name', inputConfig.name);
        element.setAttribute('placeholder', inputConfig.label);
        element.setAttribute('autocomplete', 'off');
        element.id = inputConfig.id || '';
        element.classList.add(`${inputConfig.type}-input`);
        element.classList.add(`common-input`);
        inputConfig.customClass ? element.classList.add(inputConfig.customClass) : null;
        element.value = inputConfig.value || '';
        inputConfig.requried == true ? element.dataset.required = true : element.dataset.required = false;
        if (inputConfig.hidden && inputConfig.hidden == true) {
            element.setAttribute('hidden', null);
        }

    }
    rangeConfig(element, inputConfig) {
        element = document.createElement('input');
        this.commonInputConfig(inputConfig, element);
        this.labelAdd(inputConfig);
        console.log(inputConfig);
        let minSpan = document.createElement('span'),
            maxSpan = document.createElement('span'),
            currentValue = document.createElement('span'),
            rangeGroup = document.createElement('div');
        rangeGroup.classList.add('range-group');
        element.addEventListener('change', () => {
            currentValue.innerHTML = element.value;
        });
        minSpan.innerHTML = inputConfig.minMax[0] ? inputConfig.minMax[0] : 20;
        minSpan.classList.add('range-min-value');
        maxSpan.innerHTML = inputConfig.minMax[1] ? inputConfig.minMax[1] : 0;
        maxSpan.classList.add('range-max-value');
        rangeGroup.append(element);
        rangeGroup.insertAdjacentElement('afterBegin', minSpan);
        rangeGroup.insertAdjacentElement('beforeEnd', maxSpan);
        rangeGroup.insertAdjacentElement('beforeEnd', currentValue);
        element.setAttribute('min', inputConfig.minMax[0]);
        element.setAttribute('max', inputConfig.minMax[1]);
        this.container.append(rangeGroup);
        // console.log(element);
    };
    radioConfig(inputConfig) {
        let radioGroup = document.createElement('div');
        radioGroup.classList.add('radio-group');
        for (let i = 0; i < inputConfig.quantity; i++) {
            let radio = document.createElement('input'),
                radioLabel = document.createElement('span');
            radioLabel.innerHTML = `${inputConfig.type} ${i}`;
            radio.type = inputConfig.type;
            radio.name = inputConfig.name;
            radio.value = `${inputConfig.type} ${i}`;
            radio.dataset.number = i;
            radioGroup.append(radioLabel);
            radioGroup.append(radio);
        };
        this.container.append(radioGroup);
    }
    sendData(data) {
        let elWithCounter = this.container.querySelector('[data-count]');
        this.sendObject.count = parseInt(elWithCounter.dataset.count);
        if (this.sendObject.counter < 5 || this.requiredReady == false) {
            return;
        } else {
            this.sendButton.disabled = true;
            let dataToSend = new FormData();
            dataToSend.append('action', 'application');
            for (const key in this.sendObject) {
                dataToSend.append(key, this.sendObject[key]);
            }
            dataToSend.append('webad', window.location.href); /**Страница с которой был переход */
            fetch(this.url, {
                    method: 'POST',
                    // action: 'online-consultation-application',
                    body: dataToSend,
                })
                .then(res => {
                    // console.log('SENDED');
                    // console.log(this.sendObject);
                    this.succesMessage();
                    this.resetToDefaults()
                    return res.json();
                }).then(res => {
                    // console.log(data);
                });
        }
    }
    succesMessage() {
        let $message = document.createElement('span');
        $message.classList.add('succes-message');
        this.container.style.position = `relative`;
        $message.style.cssText = `
        position:absolute; 
        top:20%; 
        width:75%; 
        left:12.5%; 
        right:12.5%; 
        text-align:center; 
        padding:15px 10px; 
        background:#fff`;
        $message.innerHTML = langObject.succesSend[lang];
        $message.classList.add('fadeIn');
        this.container.insertAdjacentElement('beforeEnd', $message);

        setTimeout(() => {
            $message.remove();
        }, 5000);
    }
    resetToDefaults() {
        this.requiredReady = false;
        this.sendObject = {};
        this.counter = 0;
        this._inputWithCount.dataset.count = 0;
        this.sendButton.disabled = false;
        this.inputsList.forEach(e => {
            if (e.getAttribute('type') == 'hidden') {
                return;
            }
            e.value = '';
        })
    }
    labelAdd(configInput) {
        if (configInput.label) {
            let label = document.createElement('label');
            label.setAttribute('for', configInput.name);
            label.innerHTML = configInput.label;
            label.setAttribute('class', `${configInput.name}-label common-label`);
            this.container.append(label);
        } else {
            return;
        }
    }
    init() {
        if (this.container == undefined) {
            // console.error(`${this.containerSelector} is undefined`);
            return;
        }
        this.container.classList.add('form-container-js');
        this.styleSetup();
        this.legendAdd();
        this.inputConfig();
        this.sendButtonConfig();
        this.createInputGroup();
        this.container.append(this.sendButton);
        this.labelEffects();
        this._counter();
        this.inputsList = document.querySelectorAll(`${this.containerSelector} input`);

    }
    inputValidation() {
        // document.querySelectorAll('input:not([type=hidden]');
        let inputs = this.container.querySelectorAll('input:not([type=hidden]),textarea'),
            hideInputs = this.container.querySelectorAll('input[type=hidden]');
        hideInputs.forEach(hideInput => {
            this.sendObject[hideInput.name] = hideInput.value;
        })
        inputs.forEach(input => {
            if (input.type == 'checkbox' && input.name == 'time' && input.checked && input.parentNode.querySelector('select') != null) {
                // console.log(input.parentNode.querySelector('select'));
                // this.sendObject[input.parentNode.querySelector('label').innerText] = input.parentNode.querySelector('select').value;
                // this.sendObject.time = input.parentNode.querySelector('select').value;
                // this.sendObject.when = input.parentNode.querySelector('select').value;
                return false;
            } else if (input.type == 'checkbox' && input.checked == false) {
                return false;
            } else if (input.dataset.required === 'true' && input.type == 'text' && input.value.length < 1) {
                input.parentNode.querySelector('.error-span').style.animation = 'fadeIn 1s 1 linear';
                input.parentNode.querySelector('.error-span').innerText = `1${input.name} is required`;
                return false;
            } else if (input.dataset.required === 'true' && input.type == 'radio') {
                input.parentNode.querySelector('.error-span').innerText = `1${input.name} is required`;
                return false;
            } else if (input.dataset.required === 'true' && input.type == 'text' && input.name == 'email' && !input.value.match(this.regExp.email)) {
                input.parentNode.querySelector('.error-span').innerText = `1${input.name} is required`;
                return false;
            } else if (input.dataset.required === 'true' && input.type == 'text' && input.name == 'telephone' && !input.value.match(this.regExp.telephone)) {
                input.parentNode.querySelector('.error-span').innerText = `1${input.name} is required`;
                return false;
            } else {
                this.sendObject[input.name] = input.value;
                // console.log(this.sendObject, 'WORK');
                input.parentNode.querySelector('.error-span').innerText = '';
                return false;
            }
        });
        if (this.sendObject.when != undefined) {

            this.sendObject.when = this.sendObject.when.replace('on', 'Сейчас');
        }
        this.checkRequiredFields();

    }
    telephoneMask(input) {
        input.setAttribute('maxlength', 19);
        // console.log(input);
        // input.addEventListener('keydown', (e) => {

        //     input.value = input.value.replace(this.regExp.tel, '');
        // })
    }
    putHideClass(selector, className) {
        selector.classList.add(className);
        setTimeout(() => {
            selector.classList.remove(className);
        }, 1000);
    }
    labelEffects() {
        this.container.querySelectorAll('input,textarea').forEach(input => {
            // console.log(input.type);
            if (input.type == 'checkbox') {
                return;
            }
            input.addEventListener('focus', () => {
                this.container.querySelector(`label[for=${input.name}]`).style.opacity = 1;
                this.putHideClass(this.container.querySelector(`label[for=${input.name}]`), 'formLabelEntry');
            });
            input.addEventListener('blur', () => {
                this.container.querySelector(`label[for=${input.name}]`).style.opacity = 0;
                this.putHideClass(this.container.querySelector(`label[for=${input.name}]`), 'formLabelExit');
                this.putHideClass(input.parentNode, 'inputBorderEffectOut');
            });
        });
    }
    _counter() {
        let requiredList = this.container.querySelectorAll('input[data-required=true]');
        requiredList[0].dataset.count = 0;
        requiredList[0].addEventListener('keyup', (e) => {
            e.target.setAttribute('data-count', this.countIndex);
            this.countIndex++;
        });
        this._inputWithCount = requiredList[0];
    }
    legendAdd() {
        let legend = document.createElement('legend');
        if (this.legend) {
            legend.classList.add('form-legend');
            legend.innerHTML = this.legend;
            this.container.insertAdjacentElement('afterBegin', legend);
        }
        if (this.subLegend) {
            let subLegend = document.createElement('span');
            subLegend.classList.add('form-sub-legend');
            subLegend.innerHTML = this.subLegend;
            legend.insertAdjacentElement('afterEnd', subLegend);
        } else {
            return false;
        }

    }
    get formSelector() {
        return this.container;
    }
}