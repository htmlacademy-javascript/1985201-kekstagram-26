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

/*Отмена работы ESС при фокусе (не получилось; долго по-разному пробовала и никак; это последний вариант)*/

/*const onEvtTargetEscKeydown = (evt) => {
  if (((isEscapeKey(evt)) && (evt.target === hashtagInput)) || ((isEscapeKey(evt)) && (evt.target === commentInput))) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

EventTarget.addEventListener('keydown', onEvtTargetEscKeydown);*/

/*Валидация формы*/

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper_invalid',
  successClass: 'img-upload__field-wrapper_valid',
  errorTextParent:'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'input__error'
});

/*Комментарии*/

function matchCommentSymbolsAmount() {
  return commentInput.value.length <= 140;
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__description'),
  matchCommentSymbolsAmount,
  'Количество символов в комментарии не должно превышать 140'
);

/*Хеш-тэги*/

/*Проверка хэш-тегов на кол-во не более 5*/

function matchHastagsAmount() {
  return hashtagInput.value.split(' ').length <= 5;
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  matchHastagsAmount,
  'Количество хэш-тегов не должно превышать 5'
);

/*Проверка хэш-тегов на соответствие заданным параметрам:
- хэш-тег начинается с символа # (решётка);
- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.),
символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
- хеш-тег не может состоять только из одной решётки;
- максимальная длина одного хэш-тега 20 символов, включая решётку;*/

const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
function checkHastagsСontent () {
  return hashtagInput.value.split(' ').some((hashtag) => regularExpression.test(hashtag));
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  checkHastagsСontent,
  'Хэш-тег должен иметь определённый синтаксис'
);

/*Проверка хэш-тегов на неповторение*/

function areHashtagsUnique() {
  return (new Set(hashtagInput.value.split(' '))).size === hashtagInput.value.split(' ').length;
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  areHashtagsUnique,
  'Хэш-теги не должны повторяться'
);

/*Обработчик на форму*/

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
