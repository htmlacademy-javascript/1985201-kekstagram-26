/*Изменение масштаба изображения*/

const sliderElement = document.querySelector('.img-upload__scale');

noUiSlider.create(sliderElement, {
  range: {
    min: 25,
    max: 100,
  },
  start: 50,
  step: 25,
});
