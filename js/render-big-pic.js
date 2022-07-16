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

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

/*Закрытие*/

/*Закрытие с помощью нажатия ESC и ENTER и кликом по кнопке*/

const onDocumentEscKeydown = (evt) => {
  if ( isEscapeKey(evt) ) {
    evt.preventDefault();
    closeBigPicture();
  }
};

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

document.addEventListener('keydown', onDocumentEscKeydown);
closeButton.addEventListener('keydown', onCloseButtonEnterKeydown);
closeButton.addEventListener('click', onCloseButtonClick);

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('keydown', onCloseButtonEnterKeydown);
  closeButton.removeEventListener('keydown', onCloseButtonClick);
}

const renderBigPicture = (url, comments, likes, description) => {

  openBigPicture();

  const writeComment = (comment) => {
    const newComment = socialCommentTemplate.cloneNode(true);
    const commentAvatar = newComment.querySelector('img');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    socialComments.append(comment);

    return newComment;
  };

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  if (comments.length <= 5) {
    socialCommentCount.textContent = `${commentsCount.textContent} из ${commentsCount.textContent} комментариев`;
    commentsLoader.classList.add('hidden');
    socialComments.replaceChildren(...comments.map(writeComment));
  } else {
    socialCommentCount.textContent = `5 из ${commentsCount.textContent} комментариев`;
    commentsLoader.classList.remove('hidden');

    socialComments.replaceChildren(...comments.map(writeComment).slice(0, 5));

    const onButtonClick = () => {
      let i = 5;
      if ((comments.length - i) >= 5) {
        for (; ((comments.length - i)%5) === 0; i = i + 5) {
          socialComments.replaceChildren(...comments.map(writeComment).slice(0, (i)));
          socialCommentCount.textContent = `${i} из ${commentsCount.textContent} комментариев`;
        }
      } else if ((comments.length - i) < 5) {
        socialComments.replaceChildren(...comments.map(writeComment).slice(0, (commentsCount.textContent)));
        socialCommentCount.textContent = `${commentsCount.textContent} из ${commentsCount.textContent} комментариев`;
        commentsLoader.classList.add('hidden');
      }
    };
    commentsLoader.addEventListener('click', onButtonClick);
  }
};

/*Блок комментариев*/

export {renderBigPicture};
