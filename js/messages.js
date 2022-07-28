import { isEscapeKey } from './util.js';

/*Сообщение об успехе*/

const getMessageAboutSuccess = (title) => {

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
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  document.addEventListener('keydown', onDocumentEscKeydown);

  const onEventTargetClick = (evt) => {
    if (evt.target === document.querySelector('.success') && evt.target !== document.querySelector('.success__inner')) {
      message.remove();
      document.removeEventListener('click', onEventTargetClick);
    }
  };

  document.addEventListener('click', onEventTargetClick);

  document.querySelector('body').appendChild(message);
};

/*Сообщение об ошибке*/

const getMessageAboutError = (title) => {

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
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  document.addEventListener('keydown', onDocumentEscKeydown);

  document.querySelector('body').appendChild(message);
};

export { getMessageAboutSuccess, getMessageAboutError };
