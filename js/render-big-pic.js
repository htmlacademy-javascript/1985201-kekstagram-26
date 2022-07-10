import {isEscapeKey, isEnterKey} from './util.js';

/*Список констант*/

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const socialComments = document.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector(':first-child');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

/*Открытие*/

const onDocumentEnterKeydown = (evt) => {
  if ( isEnterKey(evt) ) {
    evt.preventDefault();
    openBigPicture();
  }
};

document.addEventListener('keydown', onDocumentEnterKeydown);

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.removeEventListener('keydown', onDocumentEnterKeydown);
}

/*Закрытие*/

/*Закрытие с помощью нажатия ESC и ENTER и кликом по кнопке*/

const onDocumentEscKeydown = (evt) => {
  if ( isEscapeKey(evt) ) {
    evt.preventDefault();
    closeBigPicture();
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }
};

const onCloseButtonEnterKeydown = (evt) => {
  if ( isEnterKey(evt) ) {
    evt.preventDefault();
    closeBigPicture();
    closeButton.removeEventListener('keydown', onCloseButtonEnterKeydown);
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
  closeButton.removeEventListener('keydown', onCloseButtonClick);
};

document.addEventListener('keydown', onDocumentEscKeydown);
closeButton.addEventListener('keydown', onCloseButtonEnterKeydown);
closeButton.addEventListener('click', onCloseButtonClick);

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
}

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
