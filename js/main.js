import {renderAfterLoading} from './render.js';
import './validation.js';
import './upload-img.js';
import { getData } from './server-interaction.js';
import { getMessageAboutError } from './messages.js';

getData(renderAfterLoading, getMessageAboutError);
