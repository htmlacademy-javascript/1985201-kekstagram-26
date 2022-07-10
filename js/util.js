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

/*Вызов функции определения максимальной длины строки, чтобы линтер не ругался*/

calculateMaxLength ('I Love Js', 10);

export {getRandomNumbers, getRandomArrayElement};


