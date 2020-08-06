/*Form handler */
let submitList = document.querySelectorAll('.submit-js');
const SEND_URL = './static/application.php';
submitList.forEach(el => {
    el.addEventListener('click', function(evt) {
        evt.preventDefault();
        let status = checkRequiredFields(el.closest('form'));
        if (typeof status === 'object') {
            send(status, SEND_URL, el.closest('form'));
        }

        //console.log(el.closest('form'));
    });
});

function checkRequiredFields(form) {
    const inputs = form.querySelectorAll('input');
    let sendObject = {};
    sendObject.form_name = form.dataset.name || '';
    sendObject.metka = window.location.href || '';
    inputs.forEach(input => {
        let inputGroup = input.closest('.input-group');
        if (input.dataset.required === 'true' && input.value.length === 0) {
            inputGroup.classList.add('unfilled')
        } else {
            inputGroup.classList.remove('unfilled');
        }
        sendObject[input.name] = input.value;
    });
    if (form.querySelector('.unfilled') === null) {
        //console.log(sendObject);
        return sendObject;
    } else {
        return false;
    }
    // //console.log(form.querySelector('.unfilled'));

};

function send(object, url, form) {
    let data = new FormData();
    form.querySelector('button[type="submit"]').setAttribute('disabled', '');
    for (const key in object) {
        data.append(key, object[key]);
    }
    fetch(url, {
        method: 'POST',
        body: data,
    }).catch(res => {
        console.log(res);
        sendMessageStatus(form, 'Помилка відправки');
        //console.log(data);
    }).then(res => {
        return res.text();
    }).then(res => {
        if (res.match(/11/)) {
            sendMessageStatus(form, 'Ваше повідомлення відправлено');
        } else {
            sendMessageStatus(form, 'Помилка відправки');
        }
        setTimeout(() => {
            form.querySelector('button[type=submit]').removeAttribute('disabled');
        }, 2000);
    })
};

function sendMessageStatus(form, status) {
    // form.style.position = 'relative';
    // form.innerHTML += `
    // <span class="send-message" 
    // style="animation: fadeInLeft 1s 1 ease-in-out ; 
    //     color:#fff; position:absolute; 
    //     padding:10px 20px; 
    //     background:var(--blue);
    //     left:50%;
    //     font-size:24px; 
    //     transform:translateX(-50%)">
    // ${status}
    // </span>`;
    let element = document.createElement('span');
    element.style.cssText = `animation: fadeInLeft 1s 1 ease-in-out ; 
             color:#fff; position:absolute; 
             padding:10px 20px; 
             background:var(--blue);
             left:50%;
             font-size:24px; 
             transform:translateX(-50%) `;
    element.innerHTML = status;
    element.classList.add('send-message');
    form.append(element);
    setTimeout(() => {
        form.querySelector('.send-message').style.animation = 'fadeOutRight 1s 1 ease-in';
        form.querySelector('.send-message').addEventListener('animationend', function(evt) {
            form.querySelector('.send-message').remove();
            // form.querySelector('.send-message').style.opacity = `0`;
        });
    }, 2000);


}

/** Маска телефонного номера */
$.mask.definitions['#'] = '[0-9]';
$.mask.definitions['9'] = '';
$('input[name=tel]').mask("+(38) ### ###-##-##", {
    placeholder: "_"
});



$('.form-call-button-js').magnificPopup({
    items: {
        type: 'inline',
        src: putCallbackFormInPopup('.callback-form'),
    },
    callbacks: {
        open: function() {
            // document.querySelector('.mfp-content .callback-form').classList.add('s') = 1;
            setTimeout(() => {
                document.querySelector('.mfp-content .callback-form').style.opacity = 1;
            }, 100);
        },
        close: function() {
            document.querySelector('.callback-form').style.opacity = '0';

        }
    },
    mainClass: 'mfp-fade',
    removalDelay: 500,

});

// $('.callback-form').magnificPopup();


function putCallbackFormInPopup(selector) {
    return document.querySelector(selector);

}
/*Form handler END */


;
(function() {

    var cmn_script = 'https://callmenow.com.ua/client_site/call_query';
    var cmn_open_form_script = 'https://callmenow.com.ua/client_site/open_form_event';

    $('.btnRecall, #btnRecall').on('click', function(evt) {
        evt.preventDefault();
        console.log('efefefef');
        var phoneField = this.closest('form').querySelector('input[name=tel]');
        var userPhone = this.closest('form').querySelector('input[name=tel]').value;

        userPhone = "+" + userPhone.replace(/\D/g, '');
        // console.log(userPhone);
        console.log(userPhone);
        if (userPhone.length < 7) {
            phoneField.closest('.input-group').classList.add('unfilled');
            sendMessageStatus(this.closest('form'), 'введите номер телефона');
        } else {
            phoneField.closest('.input-group').classList.remove('unfilled');
            sendCallbackQuery(cmn_script, '597', userPhone, this.closest('form'));
        }

        // openFormEvent(cmn_open_form_script, '597');
    });

    /* функция для передачи запроса на звонок
    параметры: адрес скрипта, айди кабинета, телефон посетителя сайта */
    function sendCallbackQuery(cmn_script, u_id, phone, form1) { //u_id=605
        param = { 'u_id': u_id, 'client_phone': phone, 'clientid': getGAClientId() };
        jQuery.ajax({
            type: "GET",
            url: cmn_script,
            dataType: 'jsonp',
            data: param,
            success: function(data) {
                handleCallQueryResponse(data.msg_text, data.success, data.is_working_time, form1); //

            }
        });
    }

    /* функция для обарботки ответа на запрос звонка
    параметры: текст для посетителя, булевый флаг (true - если заявка принята) */
    function handleCallQueryResponse(msg_text, success, is_working_time, form) {
        // тут что-нибудь делаем (выводим сообщение посетителю например)
        sendMessageStatus(form, msg_text);
        form.querySelector('input[name=tel]').value = ``;
        form.querySelector('button').disabled = true;
        setTimeout(() => {
            form.querySelector('button').removeAttribute('disabled');
        }, 5000);
    }

    /* функция отправляет событие "посетитель открыл форму", событие появится в аналитиксе, если он настроен
    параметры: адрес скрипта, айди кабинета */
    function openFormEvent(cmn_open_form_script, u_id) {
        param = { 'u_id': u_id, 'clientid': getGAClientId() };
        jQuery.ajax({
            type: "GET",
            url: cmn_open_form_script,
            dataType: 'jsonp',
            data: param,
            success: function(data) {
                // do nothing
            }
        });
    }

    function getGAClientId() {
        var clientId = "";
        if (typeof(ga) != undefined && typeof(ga) != "undefined") {
            ga(function() {
                var tracker = ga.getAll()[0];
                clientId = tracker.get('clientId');
            });
        }
        return clientId;
    }
})();


document.querySelectorAll('.input-group').forEach(icon => {
    icon.addEventListener('click', function(evt) {
        icon.querySelector('input').focus();
    });
})