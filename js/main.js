/*При решении задачи использовался ресурс MDN*/

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

/*При решении задачи использовался ресурс MDN*/

function calculateMaxLength (content, maxLength) {
  const result = maxLength - content.length;
  if (result > 0) {
    return true;
  } else {
    return false;
  }
}

calculateMaxLength ('I Love Js', 10);
