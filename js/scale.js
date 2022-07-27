/*Изменение масштаба изображения*/

/*Классы из index.html*/

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

/*Константы*/

const START_PHOTO_SIZE = 100;
const WHOLE_PERCENTAGE = 100;
const PERCENTAGE_STEP = 25;

/*Присвоение текущему значению шкалы масштаба начального значения в 100% без применения эффектов*/

let CURRENT_PHOTO_SIZE = START_PHOTO_SIZE;

/*Увеличение изображения*/

const onSmallerButtonClick = () => {
  if (CURRENT_PHOTO_SIZE > PERCENTAGE_STEP) {
    CURRENT_PHOTO_SIZE = CURRENT_PHOTO_SIZE - PERCENTAGE_STEP;
    scaleControlValue.value = `${CURRENT_PHOTO_SIZE}%`;
    imgUploadPreview.style.transform = `scale(${CURRENT_PHOTO_SIZE / WHOLE_PERCENTAGE})`;
  }
};

/*Уменьшение изображения*/

const onBiggerButtonClick = () => {
  if (CURRENT_PHOTO_SIZE < WHOLE_PERCENTAGE) {
    CURRENT_PHOTO_SIZE = CURRENT_PHOTO_SIZE + PERCENTAGE_STEP;
    scaleControlValue.value = `${CURRENT_PHOTO_SIZE}%`;
    imgUploadPreview.style.transform = `scale(${CURRENT_PHOTO_SIZE / WHOLE_PERCENTAGE})`;
  }
};

/*Добавления обработчиков события на кнопки увеличения и уменьшения изображения*/

scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
scaleControlBigger.addEventListener('click', onBiggerButtonClick);

const resetScale = () => {
  CURRENT_PHOTO_SIZE = START_PHOTO_SIZE;
  imgUploadPreview.style.transform = '';
  scaleControlValue.value = `${START_PHOTO_SIZE}%`;
};

export { scaleControlValue, resetScale };
