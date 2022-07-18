/*Изменение масштаба изображения*/

/*Константы*/

const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const startPhotoSize = 100;

/*Присвоение текущему значению шкалы масштаба начального значения в 100% без применения эффектов*/

let currentPhotoSize = startPhotoSize;

const catchStartPhotoSize = () => {
  imgUploadPreview.style.transform = '';
  scaleControlValue.value = `${startPhotoSize}%`;
};

/*Увеличение изображения*/

const onSmallerButtonClick = () => {
  if (currentPhotoSize > 25) {
    currentPhotoSize = currentPhotoSize - 25;
    scaleControlValue.value = `${currentPhotoSize}%`;
    imgUploadPreview.style.transform = `scale(${currentPhotoSize / 100})`;
  }
};

/*Уменьшение изображения*/

const onBiggerButtonClick = () => {
  if (currentPhotoSize < 100) {
    currentPhotoSize = currentPhotoSize + 25;
    scaleControlValue.value = `${currentPhotoSize}%`;
    imgUploadPreview.style.transform = `scale(${currentPhotoSize / 100})`;
  }
};

/*Добавления обработчиков события на кнопки увеличения и уменьшения изображения*/

scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
scaleControlBigger.addEventListener('click', onBiggerButtonClick);

export { catchStartPhotoSize };
