/*Классы из index.html*/

const imgUploadPreviewImg = document.querySelector('.img-upload__preview  img');
const effectsLevelSlider = document.querySelector('.effect-level__slider');
const effectssLevel = document.querySelector('.effect-level');
const effectsLevelValue = document.querySelector('.effect-level__value');
const effectButtons = document.querySelectorAll('[name="effect"]');
const noEffect = document.getElementById('effect-none');

/*Сброс шкалы для изображения без фильтров*/

effectssLevel.classList.add('hidden');

/*Функция очистки стилей*/

const resetFilters = () => {
  effectssLevel.classList.add('hidden');
  imgUploadPreviewImg.removeAttribute('class');
  imgUploadPreviewImg.removeAttribute('style');
  effectsLevelValue.value = '0.00';
  noEffect.checked = true;
};

/*Базовые характеристики слайдера*/

const sliderBasicSettings = {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
};

/*Поключение библиотеки noUiSlider*/

noUiSlider.create(effectsLevelSlider, sliderBasicSettings);

/*Изменение интенсивности фильтров*/

effectsLevelSlider.noUiSlider.on('update', () => {

  const sliderValue = effectsLevelSlider.noUiSlider.get();
  effectsLevelValue.value = sliderValue;
  const selectedEffect = document.querySelector('input[name="effect"]:checked');

  if (selectedEffect.value === 'chrome') {
    imgUploadPreviewImg.style.filter = `grayscale(${sliderValue})`;
  }
  if (selectedEffect.value === 'sepia') {
    imgUploadPreviewImg.style.filter = `sepia(${sliderValue})`;
  }
  if (selectedEffect.value === 'marvin') {
    imgUploadPreviewImg.style.filter = `invert(${sliderValue}%)`;
  }
  if (selectedEffect.value === 'phobos') {
    imgUploadPreviewImg.style.filter = `blur(${sliderValue}px)`;
  }
  if (selectedEffect.value === 'heat') {
    imgUploadPreviewImg.style.filter = `brightness(${sliderValue})`;
  }
});

effectButtons.forEach((element) => {

  element.addEventListener('change', () => {
    const settings = {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    };

    imgUploadPreviewImg.removeAttribute('class');

    if (element.value === 'marvin') {
      settings.range.max = 100;
      settings.start = 100;
      settings.step = 1;
    }

    if (element.value === 'phobos') {
      settings.range.max = 3;
      settings.start = 3;
    }

    if (element.value === 'heat') {
      settings.range.min = 1;
      settings.range.max = 3;
      settings.start = 3;
    }

    if (element.value === 'none') {
      resetFilters();
    } else {
      imgUploadPreviewImg.classList.add(`effects__preview--${element.value}`);
      effectssLevel.classList.remove('hidden');
      effectsLevelSlider.noUiSlider.updateOptions(settings);
    }
  });
});

export {resetFilters, imgUploadPreviewImg};
