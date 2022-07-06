const bigPicture = document.querySelector('.big-picture');
const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');

/*Открытие*/

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}

openBigPicture();

/*Закрытие (по клику и ESC)*/

/*Закрытие с помощью ESC*/

const pressEsc = document.addEventListener('keydown', (evt) => {
  if ( evt.key === 27 ) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});

/*Закрытие по клику*/

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', pressEsc);
}

/*Закрытие при нажатии на кнопку*/

bigPictureCancelButton.addEventListener('click', () => closeBigPicture());
