/*При решении задачи использовался ресурс MDN*/

function randomNumbers (min, max) {
  minRoundCeil = Math.ceil(min);
  maxRoundCeil = Math.ceil(max);
  maxRoundFloor = Math.floor(max);
  let result = Math.floor(Math.random() * (maxRoundFloor - minRoundCeil + 1)) + minRoundCeil;

  if ((min >= max) || (result < 0) || (minRoundCeil === maxRoundCeil)) {
    console.log('Функция не может быть выполнена');
  } else {
    return result;
  }
}

console.log(randomNumbers(4, 10));

/*При решении задачи использовался ресурс MDN*/

let content = 'I Love JS';
let maxLength = 5;

function calculateMaxLength (content, maxLength) {
  let result = maxLength - content.length;
  if (result > 0) {
    console.log ('Длина строки соответствует заданному параметру');
  } else {
    console.log ('Длина строки не соответствует заданному параметру');
  }
}

calculateMaxLength (content, maxLength);
