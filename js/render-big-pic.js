import {isEscapeKey, isEnterKey} from './util.js';

/*Классы из index.html*/

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
const commentListFragment = document.createDocumentFragment();

/*Открытие*/

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
};

/*Закрытие*/

/*Закрытие с помощью нажатия ESC и ENTER и кликом по кнопке*/

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

function onDocumentEscKeydown (evt) {
  if ( isEscapeKey(evt) ) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCloseButtonEnterKeydown = (evt) => {
  if ( isEnterKey(evt) ) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

closeButton.addEventListener('keydown', onCloseButtonEnterKeydown);
closeButton.addEventListener('click', onCloseButtonClick);

/*Отрисовка большой картинки*/

const renderBigPicture = (url, comments, likes, description) => {

  /*Открытие картинки*/

  openBigPicture();

  /*Сборка картинки*/

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  /*Переменные для начального кол-ва комментариев и кол-ва комментариев к показу*/

  let commentsQuantity = 0;
  const MAX_COMMENTS_QUANTITY_TO_SHOW = 5;

  /*Функция, показывающая по 5 комментариев*/

  const showMoreComments = () => {

    /*Отрисовка*/

    commentsQuantity += MAX_COMMENTS_QUANTITY_TO_SHOW;

    comments.slice(0, commentsQuantity).forEach((comment) => {

      const newComment = socialCommentTemplate.cloneNode(true);
      const commentAvatar = newComment.querySelector('.social__picture');
      commentAvatar.src = comment.avatar;
      commentAvatar.alt = comment.name;
      newComment.querySelector('.social__text').textContent = comment.message;

      commentListFragment.append(newComment);
    });

    /*Вставка*/

    socialComments.innerHTML = '';
    socialComments.append(commentListFragment);

    /*Условие проверки количества комментариев*/

    if (commentsQuantity >= comments.length) {
      commentsLoader.classList.add('hidden');
      socialCommentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    } else {
      commentsLoader.classList.remove('hidden');
      socialCommentCount.textContent = `${commentsQuantity} из ${comments.length} комментариев`;
    }
  };

  showMoreComments();

  /*Обработчик на кнопку "Загрузить ещё"*/

  const onButtonClick = () => {
    showMoreComments();
  };

  commentsLoader.addEventListener('click', onButtonClick);
};

export {renderBigPicture};
