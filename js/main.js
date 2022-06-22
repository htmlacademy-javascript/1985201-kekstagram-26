/*Функция поиска случайного числа*/

function randomNumbers (min, max) {
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

randomNumbers(2.7, 2.9);

/*Функция выбора случайного элемента массива*/

const getRandomArrayElement = (elements) => elements[randomNumbers(0, elements.length - 1)];

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

const DESCRIPTION = [
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

const createComment = () => ({
  id: randomNumbers(1, 1000000),
  avatar: `img/avatar-${  randomNumbers(1, 6)  }.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(USER_NAME),
});

const createComments = Array.from({length: SIMILAR_COMMENTS_COUNT}, createComment);

/*Формирование массива постов*/

const createPost = () => ({
  id: randomNumbers(1, 25),
  url: `photos/${  randomNumbers(1, 25)  }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: randomNumbers(15, 200),
  firstComment: getRandomArrayElement(createComments),
  secondComment: getRandomArrayElement(createComments),
  thirdComment: getRandomArrayElement(createComments),
});

const createPosts = Array.from({length: SIMILAR_POSTS_COUNT}, createPost);

/*Вызов случайного поста, чтобы линтер не ругался*/

getRandomArrayElement(createPosts);

