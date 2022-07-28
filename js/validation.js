import { isEscapeKey } from './util.js';
import { sendData } from './server-interaction.js';
import { getMessageAboutSuccess, getMessageAboutError } from './messages.js';
import { closeUploadOverlay } from './form.js';

/*Класс из index.html*/

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');

/*Константы*/

const COMMENT_MAX_LENGTH = 140;
const HASTAGS_MAX_QUANTITY = 5;

/*Отмена работы ESС при фокусе*/

const onInputEscKeydown = (evt) => {
  if ( isEscapeKey(evt) ) {
    evt.stopPropagation();
    evt.preventDefault();
  }
};

hashtagInput.addEventListener('keydown', onInputEscKeydown);

/*Валидация всей формы*/

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper_invalid',
  successClass: 'img-upload__field-wrapper_valid',
  errorTextParent:'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'input__error'
});

/*Валидация комментариев*/

const matchCommentSymbolsAmount = () => commentInput.value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  imgUploadForm.querySelector('.text__description'),
  matchCommentSymbolsAmount,
  `Количество символов в комментарии не должно превышать ${COMMENT_MAX_LENGTH}`
);

/*Валидация хеш-тэгов*/

/*Проверка хэш-тегов на кол-во не более 5*/

const matchHastagsAmount = () => hashtagInput.value.split(' ').length <= HASTAGS_MAX_QUANTITY;

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  matchHastagsAmount,
  `Количество хэш-тегов не должно превышать ${HASTAGS_MAX_QUANTITY}`
);

/*Проверка хэш-тегов на соответствие заданным параметрам:
- хэш-тег начинается с символа # (решётка);
- строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.),
символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
- хеш-тег не может состоять только из одной решётки;
- максимальная длина одного хэш-тега 20 символов, включая решётку;*/

const checkHastagsСontent = (hashtag) => {
  const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return regularExpression.test(hashtag);
};

const validateHastagsСontent = (arrHashtags) => {
  if (hashtagInput.value.length === 0) {
    return true;
  } else if (!(arrHashtags.split(' ').every(checkHastagsСontent))) {
    return false;
  }
  return true;
};

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateHastagsСontent,
  'Хэш-тег должен иметь определённый синтаксис'
);

/*Проверка хэш-тегов на неповторение*/

const areHashtagsUnique = () => {
  const arrHashtags = hashtagInput.value.split(' ').map((item) => item.toLowerCase());
  return (new Set(arrHashtags)).size === arrHashtags.length;
};

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

export { hashtagInput, commentInput };
