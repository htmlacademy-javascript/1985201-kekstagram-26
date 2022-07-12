import {isEscapeKey, isEnterKey} from './util.js';

/*Константы*/

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadLabelId = document.querySelector('#upload-file');
const imgUploadCloseButton = document.querySelector('.img-upload__cancel');
const commentInput = imgUploadForm.querySelector('.text__description');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');

/*Открытие окна загрузки*/

const onLabelChange = () => {
  openUploadOverlay();
};

imgUploadLabelId.addEventListener('change', onLabelChange);

function openUploadOverlay () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

/*Закрытие*/

/*Закрытие с помощью нажатия ESC и ENTER и кликом по кнопке*/

const onDocumentEscKeydown = (evt) => {
  if ( isEscapeKey(evt) ) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onCloseButtonEnterKeydown = (evt) => {
  if ( isEnterKey(evt) ) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadOverlay();
};

document.addEventListener('keydown', onDocumentEscKeydown);
imgUploadCloseButton.addEventListener('keydown', onCloseButtonEnterKeydown);
imgUploadCloseButton.addEventListener('click', onCloseButtonClick);

function closeUploadOverlay () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadLabelId.value = null;
  imgUploadCloseButton.removeEventListener('keydown', onCloseButtonClick);
  imgUploadCloseButton.removeEventListener('keydown', onCloseButtonEnterKeydown);
}

/*Валидация формы*/

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

function hashtagLength (value) {
  return value.length <= 20;

}

pristine.addValidator(
  orderForm.querySelector('#nickname'),
  validateNickname,
  'От 2 до 50 символов'
);
