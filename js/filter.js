import { renderPictures } from './render.js';

/*Функция устранения дребезга*/

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

/*Константы (то, что есть в index.html)*/

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFilterButton = imgFiltersForm.querySelectorAll('.img-filters__button');

/*Виды фильтров*/

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

/*Показ фильтров*/

imgFilters.classList.remove('img-filters--inactive');
imgFilters.classList.add('img-filters--active');

/*Перетасовка*/

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/*Cлучайные посты*/

const randomFilter = ( posts ) => {
  const shuffledPosts = shuffle(posts);
  return shuffledPosts.slice(0, 10);
};

/*Обсуждаемые посты*/

const discussFilter = ( posts ) => posts.slice().sort((firstPost, secondPost) => secondPost.comments.length - firstPost.comments.length);

/*Функция удаления постов*/

const deletePosts = ( ) => {
  const postsItems = document.querySelector('.pictures').querySelectorAll('.picture');
  postsItems.forEach((postsItem) => {
    postsItem.remove();
  });
};

/*Переключение фильтров*/

const changeFilterFunction = (filterTitle) => {
  document.querySelectorAll('.img-filters__button').forEach((element) => element.classList.remove('img-filters__button--active'));
  document.querySelector(`#${filterTitle}`).classList.add('img-filters__button--active');
};

/*Показ постов согласно фильтрам*/

const changePostsAccordingFilters = (evt, posts) => {
  const filter = evt.target.id;
  deletePosts();
  if (filter === filterDefault) {
    debounce(() => {
      changeFilterFunction(filter);
      renderPictures(posts);
    }, 500)();
  } else if (filter === filterDiscussed) {
    debounce(() => {
      changeFilterFunction(filter);
      renderPictures(discussFilter(posts));
    }, 500)();
  } else if (filter === filterRandom) {
    debounce(() => {
      changeFilterFunction(filter);
      renderPictures(randomFilter(posts, 10));
    }, 500)();
  }
};

/*Активация фильтра*/

const enableFilter = () => {
  imgFilterButton.forEach((button) => {
    button.disabled = false;
  });
};

/*Слушатель события*/

const onFilterClick = ( evt, posts ) => {
  changePostsAccordingFilters(evt, posts);
};

imgFiltersForm.addEventListener('click', onFilterClick);

enableFilter();

export { changePostsAccordingFilters };
