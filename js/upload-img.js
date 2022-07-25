import {imgUploadPreviewImg} from './filters.js';

/*Константа*/

const imgUploadInput = document.querySelector('.img-upload__input');

const onInputChange = (evt) => {
  evt = evt.target;

  const fileReader = new FileReader();

  const onInputDownload = () => {
    imgUploadPreviewImg.src = fileReader.result;
  };

  fileReader.addEventListener('load', onInputDownload);

  fileReader.readAsDataURL(evt.files[0]);
};

imgUploadInput.addEventListener('change', onInputChange);
