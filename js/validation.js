import { isEscapeKey } from './util.js';
import { sendData, getMessageAboutSuccess, getMessageAboutError } from './server-interaction.js';
import { closeUploadOverlay } from './form.js';

/*Константы*/

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');

/*Отмена работы ESС при фокусе*/

const onInputEscKeydown = (evt) => {
  if ( isEscapeKey(evt) ) {
    evt.stopPropagation();
    evt.preventDefault();
  }
};

hashtagInput.addEventListener('keydown', onInputEscKeydown);

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

function checkHastagsСontent () {
  const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const arrHashtags = hashtagInput.value.split(' ');

  for (const hashtag of arrHashtags) {
    if (regularExpression.test(hashtag) === false) {
      return false;
    }
  }
  return true;
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  checkHastagsСontent,
  'Хэш-тег должен иметь определённый синтаксис'
);

/*Проверка хэш-тегов на неповторение*/

function areHashtagsUnique() {
  const arrHashtags = hashtagInput.value.split(' ').map((item) => item.toLowerCase());
  window.console.log(arrHashtags);
  return (new Set(arrHashtags)).size === arrHashtags.length;
}

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  areHashtagsUnique,
  'Хэш-теги не должны повторяться'
);

/*Обработчик на форму*/

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    sendData(
      () => {
        closeUploadOverlay();
        getMessageAboutSuccess('Ура, это успех!');
      },
      () => {
        getMessageAboutError('Упс...Ошибка в загрузке данных');
      },
      new FormData(evt.target),
    );
  }
  hashtagInput.value = '';
  commentInput.value = '';
};

imgUploadForm.addEventListener('submit', onFormSubmit);
