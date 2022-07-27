import { isEscapeKey, isEnterKey } from './util.js';
import { resetScale } from './scale.js';
import { resetFilters } from './effects.js';

/*Классы из index.html*/

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadLabelId = document.querySelector('#upload-file');
const imgUploadCloseButton = document.querySelector('.img-upload__cancel');

/*Открытие окна загрузки*/

const openUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onLabelChange = () => {
  openUploadOverlay();
};

imgUploadLabelId.addEventListener('change', onLabelChange);

/*Закрытие*/

/*Закрытие с помощью нажатия ESC и ENTER и кликом по кнопке*/

const closeUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadLabelId.value = null;
  resetScale();
  resetFilters();
};

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

export { closeUploadOverlay };
