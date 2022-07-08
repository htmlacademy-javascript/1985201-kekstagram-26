const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const CloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');

/*Открытие*/

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}

const renderBigPicture = (url, comments, likes, description) => {

  openBigPicture();

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;

  /*Закрытие (по клику и ESC)*/

  /*Закрытие с помощью ESC*/

  const pressEsc = document.addEventListener('keydown', (evt) => {
    if ( evt.key === 'Escape' ) {
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

  CloseButton.addEventListener('click', () => closeBigPicture());
};

export {renderBigPicture};
