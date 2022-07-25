import {isEscapeKey} from './util.js';

/*Константы*/

/*Вспомогательные функции*/

/*Сообщение об успехе*/

const getMessageAboutSuccess = function (title) {

  const successMessageSample = document.querySelector('#success').content.querySelector('.success');
  const message = successMessageSample.cloneNode(true);

  message.querySelector('.success__title').textContent = title;

  const onButtonClick = (evt) => {
    evt.preventDefault();
    message.remove();
  };

  message.querySelector('.success__button').addEventListener('click', onButtonClick);

  const onDocumentEscKeydown = (evt) => {
    if ( isEscapeKey(evt) ) {
      evt.preventDefault();
      message.remove();
    }
  };

  document.addEventListener('keydown', onDocumentEscKeydown);

  const onEventTargetClick = (evt) => {
    if (evt.target === document.querySelector('.success') && evt.target !== document.querySelector('.success__inner')) {
      message.remove();
    }
  };

  document.addEventListener('click', onEventTargetClick);

  document.querySelector('body').appendChild(message);
};

/*Сообщение об ошибке*/

const getMessageAboutError = function (title) {

  const errorMessageSample = document.querySelector('#error').content.querySelector('.error');
  const message = errorMessageSample.cloneNode(true);

  message.querySelector('.error__title').textContent = title;
  message.querySelector('.error__button').textContent = 'Требуется перезагрузка страницы';

  const onButtonClick = (evt) => {
    evt.preventDefault();
    message.remove();
    location.reload();
  };

  message.querySelector('.error__button').addEventListener('click', onButtonClick);

  const onDocumentEscKeydown = (evt) => {
    if ( isEscapeKey(evt) ) {
      evt.preventDefault();
      message.remove();
    }
  };

  document.addEventListener('keydown', onDocumentEscKeydown);

  document.querySelector('body').appendChild(message);
};

/*Отправка данных*/

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

/*Получение данных*/

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      getMessageAboutError('Упс...Ошибка в загрузке данных');
    });
};

export {sendData, getData, getMessageAboutSuccess, getMessageAboutError};
