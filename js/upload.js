import {isEscapeKey, isEnterKey} from './util.js';

/*Константы*/

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadLabel = document.querySelector('.img-upload__label');
const imgUploadCloseButton = document.querySelector('.img-upload__cancel');

/*Открытие*/

const onLabelEnterKeydown = (evt) => {
  if ( isEnterKey(evt) ) {
    evt.preventDefault();
    openUploadOverlay();
  }
};

const onLabelClick = (evt) => {
  evt.preventDefault();
  openUploadOverlay();
};

imgUploadLabel.addEventListener('keydown', onLabelEnterKeydown);
imgUploadLabel.addEventListener('click', onLabelClick);

function openUploadOverlay () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.removeEventListener('keydown', onLabelEnterKeydown);
  document.removeEventListener('click', onLabelClick);
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
  imgUploadCloseButton.removeEventListener('keydown', onCloseButtonClick);
  imgUploadCloseButton.removeEventListener('keydown', onCloseButtonEnterKeydown);
}
