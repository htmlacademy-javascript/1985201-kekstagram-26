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

/*Массив хэш-тегов*/

const hashtagsArray = hashtagInput.value.split(' ');

/*Проверка хэш-тегов на кол-во не более 5*/

const matchHastagsAmount = () => {
  if (hashtagsArray.length > 5) {
    return false;
  }
};

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

const regularExpression = /^#[A-Za-zА-яа-яЁё0-9]{1,19}$/;
const checkHastagsСontent = () => {
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (!regularExpression.test(hashtagsArray[i])) {
      return false;
    }
  }
};

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  checkHastagsСontent,
  'Хэш-тег должен иметь определённый синтаксис'
);

/*Проверка хэш-тегов на неповторение*/

const areHashtagsUnique = () => {
  const hashtagsArrayDuplicate = [];
  hashtagsArray.forEach((hashtag) => {
    if (!hashtagsArrayDuplicate.includes(hashtag)) {
      hashtagsArrayDuplicate.push(hashtag);
    }
  });
  return hashtagsArrayDuplicate.length === hashtagsArray.length;
};

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  areHashtagsUnique,
  'Хэш-теги не должны повторяться'
);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
