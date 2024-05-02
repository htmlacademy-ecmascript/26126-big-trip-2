import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const pointsModel = new PointsModel();

const tripPresenter = new TripPresenter({main: siteMainElement, pointsModel, tripMain: tripMainElement});

tripPresenter.init();
