/*Константы*/

const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const filtersLevelSlider = document.querySelector('.effect-level__slider');
const filtersLevel = document.querySelector('.effect-level');
const filtersLevelValue = document.querySelector('.effect-level__value');
const filtersList = document.querySelector('.effects__list');

/*Сброс шкалы для изображения без фильтров*/

filtersLevel.classList.add('hidden');

/*Параметры слайдеров по каждому фильтру*/

const filters = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
};

/*Поключение библиотеки noUiSlider*/

noUiSlider.create(filtersLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

/*Функция сброса значений*/

const resetFilters = () => {
  filtersLevelSlider.setAttribute('disabled', true);
  filtersLevel.classList.add('hidden');
  filtersLevelValue.value = '';
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.style.filter = '';
};

/*Смена фильтров*/

const onFiltersListChange = (evt) => {

  const selectedFilter = evt.target.value;
  if (!(selectedFilter === 'none')) {
    filtersLevelSlider.removeAttribute('disabled');
    imgUploadEffectLevel.classList.remove('hidden');
    imgUploadPreview.className = 'img-upload__preview';
    imgUploadPreview.classList.add(`effects__preview--${selectedFilter}`);
    filtersLevelSlider.noUiSlider.updateOptions(filters[selectedFilter].options);
  } else {
    resetFilters();
  }
};

filtersList.addEventListener('change', onFiltersListChange);

/*Изменение интенсивности фильтров*/

