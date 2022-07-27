/*Функция поиска случайного числа*/

const getRandomNumbers = (min, max) => {
  const minRoundCeil = Math.ceil(min);
  const maxRoundCeil = Math.ceil(max);
  const maxRoundFloor = Math.floor(max);
  const result = Math.floor(Math.random() * (maxRoundFloor - minRoundCeil + 1)) + minRoundCeil;

  if ((min >= max) || (result < 0) || (minRoundCeil === maxRoundCeil)) {
    return false;
  } else {
    return result;
  }
};

/*ESC*/

const isEscapeKey = (evt) => evt.key === 'Escape';

/*ENTER*/

const isEnterKey = (evt) => evt.key === 'Enter';

export {isEscapeKey, isEnterKey, getRandomNumbers};
