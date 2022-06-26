/*Функция поиска случайного числа*/

function getRandomNumbers (min, max) {
  const minRoundCeil = Math.ceil(min);
  const maxRoundCeil = Math.ceil(max);
  const maxRoundFloor = Math.floor(max);
  const result = Math.floor(Math.random() * (maxRoundFloor - minRoundCeil + 1)) + minRoundCeil;

  if ((min >= max) || (result < 0) || (minRoundCeil === maxRoundCeil)) {
    return false;
  } else {
    return result;
  }
}

getRandomNumbers(2.7, 2.9);

/*Функция выбора случайного элемента массива*/

const getRandomArrayElement = (elements) => elements[getRandomNumbers(0, elements.length - 1)];

/*Функция определения максимальной длины строки*/

function calculateMaxLength (content, maxLength) {
  const result = maxLength - content.length;
  if (result > 0) {
    return true;
  } else {
    return false;
  }
}

calculateMaxLength ('I Love Js', 10);

/*Выполнение задания "Больше деталей"*/

const PHOTO_DESCRIPTION = [
  'Самая лучшая фотография котика EVER!',
  'Зачем страдать, когда можно потискать котика!',
  'Разве можно не любить эти пушистые комки счастья?!',
  'За одно "мур" можно отдать и полцарства...',
  'Великий котисниматель стресса :)',
  'Звуки трактора вошли в чат :)',
  'Объявляется конкурс на лучшую подпись к фотографии!',
];

const USER_NAME = [
  'Лазарь',
  'Гнивевра',
  'Гэндальф',
  'Бенедикт',
  'Лиора',
  'Лолита',
  'Феофан',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_COMMENTS_COUNT = 10;

const SIMILAR_POSTS_COUNT = 25;

/*Формирование массива комментариев*/

const createComment = (index) => ({
  id: index + 1,
  avatar: `img/avatar-${  getRandomNumbers(1, 6)  }.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(USER_NAME),
});

const commentsArray = Array.from({length: SIMILAR_COMMENTS_COUNT},  (currentValue, index) => createComment(index));

/*Формирование массива постов*/

const createPost = (index) => ({
  id: index + 1,
  url: `photos/${  getRandomNumbers(1, 25)  }.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomNumbers(15, 200),
  firstComment: getRandomArrayElement(commentsArray),
  secondComment: getRandomArrayElement(commentsArray),
  thirdComment: getRandomArrayElement(commentsArray),
});

const postsArray = Array.from({length: SIMILAR_POSTS_COUNT}, (currentValue, index) => createPost(index));

/*Вызов случайного поста, чтобы линтер не ругался*/

getRandomArrayElement(postsArray);

