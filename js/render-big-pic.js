/*Список констант*/

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const CloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector(':first-child');

/*Открытие*/

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}

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

const renderBigPicture = (url, comments, likes, description) => {

  openBigPicture();

  const writeComment = (comment) => {
    const newComment = socialCommentTemplate.cloneNode(true);
    const commentAvatar = newComment.querySelector('img');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    return newComment;
  };

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
  socialComments.replaceChildren(...comments.map(writeComment));
};

export {renderBigPicture};
