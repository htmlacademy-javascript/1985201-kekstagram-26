import { renderPictures } from './render.js';
import { getRandomNumbers } from './util.js';

/*timeoutDelay для функции устранения дребезга и кол-во случайных постов*/

const TIMEOUT_DELAY = 500;
const RANDOM_POSTS_QUANTITY = 10;

/*Функция устранения дребезга*/

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

/*Классы из index.html*/

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

/*Виды фильтров*/

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

/*Перетасовка*/

const shuffle = (posts) => {
  const postsCopy = posts.slice();
  const randomPosts = [];

  for (let i = 0; i < posts.length; i++) {
    const randomIndex = getRandomNumbers(0, (postsCopy.length - 1));
    const picture = postsCopy.splice(randomIndex, 1)[0];
    randomPosts.push(picture);
  }

  return randomPosts;
};

/*Cлучайные посты*/

const useRandomFilter = ( posts ) => {
  const shuffledPosts = shuffle(posts);
  return shuffledPosts.slice(0, RANDOM_POSTS_QUANTITY);
};

/*Обсуждаемые посты*/

const useDiscussFilter = ( posts ) => posts.slice().sort((firstPost, secondPost) => secondPost.comments.length - firstPost.comments.length);

/*Функция удаления постов*/

const deletePosts = ( ) => {
  const postsItems = document.querySelector('.pictures').querySelectorAll('.picture');
  postsItems.forEach((postsItem) => {
    postsItem.remove();
  });
};

/*Переключение фильтров*/

const changeFilter = (filterTitle) => {
  document.querySelectorAll('.img-filters__button').forEach((element) => element.classList.remove('img-filters__button--active'));
  document.querySelector(`#${filterTitle}`).classList.add('img-filters__button--active');
};

/*Показ постов согласно фильтрам*/

const changePostsAccordingFilters = (evt, posts) => {
  const filter = evt.target.id;
  deletePosts();
  if (filter === filterDefault.getAttribute('id')) {
    debounce(() => {
      changeFilter(filter);
      renderPictures(posts);
    }, TIMEOUT_DELAY)();
  } else if (filter === filterDiscussed.getAttribute('id')) {
    debounce(() => {
      changeFilter(filter);
      renderPictures(useDiscussFilter(posts));
    }, TIMEOUT_DELAY)();
  } else if (filter === filterRandom.getAttribute('id')) {
    debounce(() => {
      changeFilter(filter);
      renderPictures(useRandomFilter(posts, 10));
    }, TIMEOUT_DELAY)();
  }
};

/*Показ постов согласно фильтру*/

const initFilters = (posts) => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', (evt) => changePostsAccordingFilters(evt, posts));
};

export { initFilters };
