/*Form handler */
let submitList = document.querySelectorAll('.submit-js');
const SEND_URL = './static/application.php';
const loadIcon = `
<svg class="load-indication" style="position:absolute; bottom:20px; right:20px; /*transform:translate(-100%,-100%);*/" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="20px" height="20px" viewBox="0 0 128 128" xml:space="preserve"><path fill="#000000" fill-opacity="1" id="ball1" class="cls-1" d="M67.712,108.82a10.121,10.121,0,1,1-1.26,14.258A10.121,10.121,0,0,1,67.712,108.82Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;4 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="800ms" repeatCount="indefinite"></animateTransform></path><path fill="#000000" fill-opacity="1" id="ball2" class="cls-1" d="M51.864,106.715a10.125,10.125,0,1,1-8.031,11.855A10.125,10.125,0,0,1,51.864,106.715Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;10 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;0 64 64;" dur="800ms" repeatCount="indefinite"></animateTransform></path><path fill="#000000" fill-opacity="1" id="ball3" class="cls-1" d="M33.649,97.646a10.121,10.121,0,1,1-11.872,8A10.121,10.121,0,0,1,33.649,97.646Z"><animateTransform attributeName="transform" type="rotate" values="0 64 64;20 64 64;40 64 64;65 64 64;85 64 64;100 64 64;120 64 64;140 64 64;160 64 64;185 64 64;215 64 64;255 64 64;300 64 64;" dur="800ms" repeatCount="indefinite"></animateTransform></path></svg>
`;
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
    loadIndication(form, loadIcon, 'on');


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
        loadIndication(form, loadIcon, 'off');
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


function loadIndication(form, icon, switchStatus) {

    if (form.querySelector('.load-indication') === undefined || form.querySelector('.load-indication') === null) {
        console.log('ЕСТЬ');
        form.insertAdjacentHTML('beforeEnd', icon);
    }
    switchStatus === 'on' ?
        form.querySelector('.load-indication').style.opacity = `1` :
        form.querySelector('.load-indication').style.opacity = `0`;

}

function resetForm(form) {
    form.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
    })
}

function sendMessageStatus(form, status) {
    let element = document.createElement('span');
    element.style.cssText = `animation: fadeIn 1s 1 ease-in-out ; 
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
        form.querySelector('.send-message').style.animation = 'fadeOut 1s 1 ease-in';
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