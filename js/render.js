import {createPosts} from './data.js';

/*Отрисовка миниатюр постов пользователей с лайками и комментариями*/

const usersPosts = document.querySelector('.pictures');

const similarPostTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPosts = createPosts();

const similarListFragment = document.createDocumentFragment();

similarPosts.forEach(({url, comments, likes}) => {
  const postElement = similarPostTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').src = url;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  postElement.querySelector('.picture__likes').textContent = likes;
  similarListFragment.appendChild(postElement);
});

usersPosts.appendChild(similarListFragment);

export {similarPosts};
