import { renderBigPicture } from './render-big-pic.js';
import { initFilters } from './filter.js';

/*Отрисовка миниатюр постов пользователей с лайками и комментариями*/

const renderPictures = (similarPosts) => {
  const usersPosts = document.querySelector('.pictures');
  const similarPostTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const similarListFragment = document.createDocumentFragment();

  similarPosts.forEach(({url, comments, likes, description}) => {
    const postElement = similarPostTemplate.cloneNode(true);
    postElement.querySelector('.picture__img').src = url;
    postElement.querySelector('.picture__comments').textContent = comments.length;
    postElement.querySelector('.picture__likes').textContent = likes;
    similarListFragment.appendChild(postElement);
    postElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderBigPicture(url, comments, likes, description);
    });
  });

  usersPosts.appendChild(similarListFragment);
};

const renderAfterLoading = (posts) => {
  renderPictures(posts);
  initFilters(posts);
};

export { renderPictures, renderAfterLoading };
