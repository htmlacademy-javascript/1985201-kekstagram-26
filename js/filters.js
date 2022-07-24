
/*Константы*/

// const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadPreviewImg = document.querySelector('.img-upload__preview  img');
const filtersLevelSlider = document.querySelector('.effect-level__slider');
const filtersLevel = document.querySelector('.effect-level');
const filtersLevelValue = document.querySelector('.effect-level__value');
const effectButtons = document.querySelectorAll('[name="effect"]');
const noEffect = document.getElementById('effect-none');

/*Сброс шкалы для изображения без фильтров*/

filtersLevel.classList.add('hidden');

/*Функция очистки стилей*/

const resetFilters = () => {
  filtersLevel.classList.add('hidden');
  imgUploadPreviewImg.removeAttribute('class');
  imgUploadPreviewImg.removeAttribute('style');
  noEffect.checked = true;
};

/*Базовые характеристики слайдера*/

const sliderBasic = {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
};

/*Поключение библиотеки noUiSlider*/

noUiSlider.create(filtersLevelSlider, sliderBasic);

/*Изменение интенсивности фильтров*/

filtersLevelSlider.noUiSlider.on('update', () => {

  const sliderValue = filtersLevelSlider.noUiSlider.get();
  filtersLevelValue.value = sliderValue;
  const selectedFilter = document.querySelector('input[name="effect"]:checked');

  if (selectedFilter.value === 'chrome') {
    imgUploadPreviewImg.style.filter = `grayscale(${sliderValue})`;
  }
  if (selectedFilter.value === 'sepia') {
    imgUploadPreviewImg.style.filter = `sepia(${sliderValue})`;
  }
  if (selectedFilter.value === 'marvin') {
    imgUploadPreviewImg.style.filter = `invert(${sliderValue}%)`;
  }
  if (selectedFilter.value === 'phobos') {
    imgUploadPreviewImg.style.filter = `blur(${sliderValue}px)`;
  }
  if (selectedFilter.value === 'heat') {
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
      filtersLevel.classList.remove('hidden');
      filtersLevelSlider.noUiSlider.updateOptions(settings);
    }
  });
});

export {resetFilters};
