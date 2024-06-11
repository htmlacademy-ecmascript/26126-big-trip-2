import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './api-service.js';

import {AUTHORIZATION, END_POINT} from './const.js';

const tripMainElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const addEventButtonElement = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel({
  pointApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();


const tripPresenter = new TripPresenter({
  main: siteMainElement,
  pointsModel,
  tripMain: tripMainElement,
  filterModel,
  newEventButton: addEventButtonElement,
  onAddEventDestroy: handleAddPointFormClose
});

addEventButtonElement.addEventListener('click', handleaddEventButtonClick);

function handleAddPointFormClose() {
  addEventButtonElement.disabled = false;
}

function handleaddEventButtonClick() {
  tripPresenter.createPoint();
  addEventButtonElement.disabled = true;
}

pointsModel.init();
tripPresenter.init();
