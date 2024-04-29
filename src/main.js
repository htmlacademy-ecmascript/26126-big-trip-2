import TripPresenter from './presenter/trip-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter({main: siteMainElement},{filterContainer: siteFiltersElement},{tripEventsContainer: tripEventsElement});

tripPresenter.init();
