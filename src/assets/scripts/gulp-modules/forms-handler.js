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
    const inputs = form.querySelectorAll('input,textarea');
    let sendObject = {};
    sendObject.form_name = form.dataset.name || '';
    sendObject.metka = window.location.href || '';
    inputs.forEach(input => {
        let inputGroup = input.closest('.input-group');
        console.log(inputGroup);
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
            resetForm(form)
        } else {
            sendMessageStatus(form, 'Помилка відправки');
        }
        setTimeout(() => {
            form.querySelector('button[type=submit]').removeAttribute('disabled');
        }, 2000);
    })
};

function resetForm(form) {
    form.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
    })
}

function sendMessageStatus(form, status) {
    let element = document.createElement('span');
    element.style.cssText = `animation: fadeInLeft 1s 1 ease-in-out ; 
             color:#fff; position:absolute; 
             padding:10px 20px; 
             background:var(--blue);
             left:50%;
             top:50%;
             font-size:24px; 
             transform:translateX(-50%) translateY(-50%) `;
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


document.querySelectorAll('.input-group').forEach(icon => {
    icon.addEventListener('click', function(evt) {
        icon.querySelector('input').focus();
    });
})