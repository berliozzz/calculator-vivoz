const body = document.querySelector('body');
const orderBtn = document.getElementById('order_btn');

let unlock = true;

const timeout = 500;

orderBtn.addEventListener('click', event => {
  const popup = document.getElementById('popup');
  popupOpen(popup);
  event.preventDefault();
});

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (const el of popupCloseIcon) {
    el.addEventListener('click', event => {
      popupClose(el.closest('.popup'));
      event.preventDefault();
    });
  }
}

const popupOpen = (currentPopup) => {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false)
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', event => {
      if (!event.target.closest('.popup__content')) {
        popupClose(event.target.closest('.popup'));
      }
    });
  }
}

const popupClose = (popupActive, doUnlock = true) => {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

const bodyLock = () => {
  body.classList.add('lock');
  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

const bodyUnLock = () => {
  setTimeout(() => body.classList.remove('lock'), timeout);
  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

//***********************************************
//********* валидация и маска телефона **********
//***********************************************
// inputMask
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);

// validate
function validateForms(selector, rules) {
  new window.JustValidate(selector, {
      rules: rules,
      messages: {
        tel: 'Введите номер телефона.',
        name: 'Введите имя.'
      },
      submitHandler: function (form, values, ajax) {
          const formData = new FormData(form);
          formData.append('description', document.getElementById('description_total').textContent);
          formData.append('sum', totalSum);
          
          fetch('calculyator/send.php', {
              method: "POST",
              body: formData
          })
          .then(function(data) {
              console.log(data);
              console.log('Отправлено');
              form.reset();
              const popup = document.getElementById('popup');
              popupClose(popup);
              setTimeout(() => alert('Письмо отправлено!'), 500);
          });
      }
  });
}

validateForms('.form', {tel: {required: true}, name: {required: true} });