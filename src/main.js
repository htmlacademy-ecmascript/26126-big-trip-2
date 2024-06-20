import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './api-service.js';

import {render, remove} from './framework/render.js';
import EmptyListView from './view/empty-list-view.js';

import {AUTHORIZATION, END_POINT} from './const.js';

const tripMainElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const addEventButtonElement = document.querySelector('.trip-main__event-add-btn');
const tripEventsContainerElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const EmptyListComponent = new EmptyListView({
  filterType: filterModel.filter
});


const tripPresenter = new TripPresenter({
  pointsModel,
  tripMain: tripMainElement,
  tripEventsContainer: tripEventsContainerElement,
  filterModel,
  newEventButton: addEventButtonElement,
  onAddEventDestroy: handleAddPointFormClose
});

addEventButtonElement.addEventListener('click', handleAddEventButtonClick);

function handleAddPointFormClose() {
  addEventButtonElement.disabled = false;
  if(pointsModel.points.length === 0){
    render(EmptyListComponent, tripEventsContainerElement);
  }
}

function handleAddEventButtonClick() {
  if(EmptyListComponent){
    remove(EmptyListComponent);
  }
  tripPresenter.createPoint();
  addEventButtonElement.disabled = true;
}

pointsModel.init();
tripPresenter.init();
