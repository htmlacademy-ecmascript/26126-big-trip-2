import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';


const tripMainElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const addEventButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

addEventButton.addEventListener('click', handleaddEventButtonClick);

const tripPresenter = new TripPresenter({
  main: siteMainElement,
  pointsModel,
  tripMain: tripMainElement,
  filterModel,
  onAddEventDestroy: handleAddPointkFormClose
});

function handleAddPointkFormClose() {
  addEventButton.disabled = false;
}

function handleaddEventButtonClick() {
  tripPresenter.createPoint();
  addEventButton.disabled = true;
}

tripPresenter.init();
